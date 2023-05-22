import { Injectable } from '@nestjs/common';
import { CreateWebPageDto } from './dto/create-web-page.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WebPage } from './entities';
import { LinksService } from 'src/links/links.service';
import { CurrentUserInterface } from 'src/users/interfaces/current-user.interface';
import { UsersService } from 'src/users/users.service';
import {
  IPaginationOptions,
  Pagination,
  paginateRaw,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class WebPagesService {
  constructor(
    @InjectRepository(WebPage)
    private readonly webPageRepository: Repository<WebPage>,
    private readonly linkService: LinksService,
    private readonly usersService: UsersService,
  ) {}

  async create(createWebPageDto: CreateWebPageDto): Promise<WebPage> {
    const { user: currentUser, name, links } = createWebPageDto;

    const user = await this.usersService.findById(currentUser.sub);

    const webPage = new WebPage();
    webPage.name = name;
    webPage.user = user;

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

  async list(
    user: CurrentUserInterface,
    paginationOptions: IPaginationOptions,
  ): Promise<Pagination<WebPage>> {
    const webPagesWithTotalLinks = this.webPageRepository
      .createQueryBuilder('webPage')
      .leftJoinAndSelect('webPage.links', 'link')
      .select('webPage.id', 'id')
      .where('webPage.userId = :userId', { userId: user.sub })
      .addSelect('webPage.name', 'name')
      .addSelect('COUNT(link.id)', 'totalLinks')
      .groupBy('webPage.id');

    return paginateRaw<WebPage>(webPagesWithTotalLinks, paginationOptions);
  }

  async getById(id: number): Promise<WebPage> {
    return this.webPageRepository.findOne({
      where: {
        id,
      },
      relations: ['links'],
    });
  }
}
