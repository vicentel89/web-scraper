import { Injectable } from '@nestjs/common';
import { CreateWebPageDto } from './dto/create-web-page.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WebPage } from './entities';
import { LinksService } from 'src/links/links.service';

@Injectable()
export class WebPagesService {
  constructor(
    @InjectRepository(WebPage)
    private readonly webPageRepository: Repository<WebPage>,
    private readonly linkService: LinksService,
  ) {}

  async create(createWebPageDto: CreateWebPageDto): Promise<WebPage> {
    const { name, links } = createWebPageDto;

    const webPage = new WebPage();
    webPage.name = name;

    const createdWebPage = await this.webPageRepository.save(webPage);

    const createdLinks = await Promise.all(
      links.map(async (linkDto) => {
        const createdLink = await this.linkService.create(
          linkDto,
          createdWebPage,
        );
        return createdLink;
      }),
    );

    createdWebPage.links = createdLinks;

    return createdWebPage;
  }
}
