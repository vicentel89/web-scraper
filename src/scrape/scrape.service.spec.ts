import { WebPagesService } from 'src/web-pages/web-pages.service';
import { ScrapeService } from './scrape.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WebPage } from 'src/web-pages/entities';
import { Link } from 'src/links/entities';
import { LinksService } from 'src/links/links.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

const url = 'https://example.com';
const html =
  '<html><head><title>Example</title></head><body><a href="/link1">Link 1</a><a href="/link1">Link 1</a><a href="#link2">Link 2</a></body></html>';
const title = 'Example';
const links = [
  { url: '/link1', text: 'Link 1' },
  { url: '/link1', text: 'Link 1' },
];
const normalizedLinks = [
  { url: 'https://example.com/link1', text: 'Link 1' },
  { url: 'https://example.com/link1', text: 'Link 1' },
];

describe('ScrapeService', () => {
  let scrapeService: ScrapeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScrapeService,
        WebPagesService,
        {
          provide: getRepositoryToken(WebPage),
          useValue: {
            save: jest.fn().mockResolvedValue([]),
          },
        },
        LinksService,
        {
          provide: getRepositoryToken(Link),
          useValue: {
            save: jest.fn().mockResolvedValue([]),
          },
        },
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue([]),
          },
        },
        JwtService,
        ConfigService,
      ],
    }).compile();

    scrapeService = module.get<ScrapeService>(ScrapeService);
  });

  it('should extract the title', async () => {
    const extractedTitle = scrapeService['extractTitle'](html);
    expect(extractedTitle).toBe(title);
  });

  it('should extract links', async () => {
    const extractedLinks = scrapeService['extractLinks'](html);
    expect(extractedLinks).toEqual(links);
  });

  it('should normalize links', async () => {
    const testedNormalizedLinks = scrapeService['normalizeLinks'](url, links);
    expect(testedNormalizedLinks).toEqual(normalizedLinks);
  });
});
