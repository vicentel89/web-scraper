import { Injectable } from '@nestjs/common';
import * as axios from 'axios';
import * as cheerio from 'cheerio';
import { Link } from 'src/links/entities';
import { WebPagesService } from 'src/web-pages/web-pages.service';

type LinkType = Omit<Link, 'id' | 'webPage'>;

@Injectable()
export class ScrapeService {
  constructor(private readonly webPageService: WebPagesService) {}

  async scrapeUrl(
    url: string,
  ): Promise<{ pageName: string; links: LinkType[] }> {
    const html = await this.fetchHtml(url);

    const pageName = this.extractTitle(html);

    const links = this.extractLinks(html);
    const filteredLinks = this.filterUnwantedLinks(links);
    const normalizedLinks = this.normalizeLinks(url, filteredLinks);
    const uniqueLinks = this.removeDuplicateLinks(normalizedLinks);

    await this.webPageService.create({ name: pageName, links: uniqueLinks });

    return { pageName, links: uniqueLinks };
  }

  private async fetchHtml(url: string): Promise<string> {
    const response = await axios.default.get(url);
    return response.data;
  }

  private extractTitle(html: string): string {
    const $ = cheerio.load(html);
    const title = $('title').text();
    return title;
  }

  private extractLinks(html: string): LinkType[] {
    const $ = cheerio.load(html);
    const links: LinkType[] = [];

    $('a').each((index, element) => {
      const url = $(element).attr('href');
      const text = $(element).text();
      if (url) {
        links.push({ url, text });
      }
    });

    return this.filterUnwantedLinks(links);
  }

  private filterUnwantedLinks(links: LinkType[]): LinkType[] {
    return links.filter(
      (link) => link.url.startsWith('/') || link.url.startsWith('http'),
    );
  }

  private normalizeLinks(baseUrl: string, links: LinkType[]): LinkType[] {
    return links.map(({ url, text }) => {
      if (url.startsWith('/')) {
        return { url: new URL(url, baseUrl).toString(), text };
      }
      return { url, text };
    });
  }

  private removeDuplicateLinks(links: LinkType[]): LinkType[] {
    return [...new Set(links)];
  }
}
