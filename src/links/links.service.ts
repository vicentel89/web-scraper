import { Injectable } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WebPage } from 'src/web-pages/entities';
import { Link } from './entities';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
  ) {}

  async create(createLinkDto: CreateLinkDto, webPage: WebPage): Promise<Link> {
    const { url, text } = createLinkDto;

    const link = new Link();
    link.url = url;
    link.text = text;
    link.webPage = webPage;

    const createdLink = await this.linkRepository.save(link);

    return createdLink;
  }
}
