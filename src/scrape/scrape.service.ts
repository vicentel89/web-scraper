import { Injectable } from '@nestjs/common';
import * as axios from 'axios';
import * as cheerio from 'cheerio';

type Link = { url: string; text: string };

@Injectable()
export class ScrapeService {
  async scrapeUrl(url: string): Promise<Link[]> {
    const html = await this.fetchHtml(url);
    const links = this.extractLinks(html);
    const filteredLinks = this.filterUnwantedLinks(links);
    const normalizedLinks = this.normalizeLinks(url, filteredLinks);
    const uniqueLinks = this.removeDuplicateLinks(normalizedLinks);

    return uniqueLinks;
  }

  private async fetchHtml(url: string): Promise<string> {
    const response = await axios.default.get(url);
    return response.data;
  }

  private extractLinks(html: string): Link[] {
    const $ = cheerio.load(html);
    const links: Link[] = [];

    $('a').each((index, element) => {
      const url = $(element).attr('href');
      const text = $(element).text();
      if (url) {
        links.push({ url, text });
      }
    });

    return this.filterUnwantedLinks(links);
  }

  private filterUnwantedLinks(links: Link[]): Link[] {
    return links.filter(
      (link) => link.url.startsWith('/') || link.url.startsWith('http'),
    );
  }

  private normalizeLinks(baseUrl: string, links: Link[]): Link[] {
    return links.map(({ url, text }) => {
      if (url.startsWith('/')) {
        return { url: new URL(url, baseUrl).toString(), text };
      }
      return { url, text };
    });
  }

  private removeDuplicateLinks(links: Link[]): Link[] {
    return [...new Set(links)];
  }
}
