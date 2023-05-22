import { Test, TestingModule } from '@nestjs/testing';
import { WebPagesController } from './web-pages.controller';
import { WebPagesService } from './web-pages.service';
import { PaginationDto } from './dto/pagination.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WebPage } from './entities';
import { CurrentUserInterface } from 'src/users/interfaces/current-user.interface';
import { LinksService } from 'src/links/links.service';
import { UsersService } from 'src/users/users.service';
import { Link } from 'src/links/entities';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('WebPagesController', () => {
  let controller: WebPagesController;
  let service: WebPagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebPagesController],
      providers: [
        WebPagesService,
        {
          provide: getRepositoryToken(WebPage),
          useValue: {},
        },
        LinksService,
        {
          provide: getRepositoryToken(Link),
          useValue: {},
        },
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        JwtService,
        ConfigService,
      ],
    }).compile();

    controller = module.get<WebPagesController>(WebPagesController);
    service = module.get<WebPagesService>(WebPagesService);
  });

  describe('listWebPages', () => {
    it('should return a paginated list of web pages', async () => {
      const user = { sub: 'user-id' } as CurrentUserInterface;
      const paginationDto: PaginationDto = { page: 1, limit: 1 };

      const expectedWebPages: Pagination<WebPage> = {
        items: [
          {
            id: 1,
            name: 'Test 1',
            links: [],
            user: null,
          },
        ],
        meta: {
          totalItems: 10,
          itemCount: 2,
          itemsPerPage: 2,
          totalPages: 5,
          currentPage: 1,
        },
      };

      jest.spyOn(service, 'list').mockResolvedValue(expectedWebPages);

      const result = await controller.listWebPages(user, paginationDto);

      expect(result).toEqual(expectedWebPages);
    });
  });

  describe('getWebPageDetails', () => {
    it('should return the details of a web page', async () => {
      const id = 1;
      const expectedWebPage: WebPage = {
        id: 2,
        name: 'Test',
        links: [],
        user: new User(),
      };

      jest.spyOn(service, 'getById').mockResolvedValue(expectedWebPage);

      const result = await controller.getWebPageDetails(id);

      expect(result).toEqual(expectedWebPage);
    });
  });
});
