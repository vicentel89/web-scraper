import { Controller } from '@nestjs/common';
import { WebPagesService } from './web-pages.service';

@Controller('web-pages')
export class WebPagesController {
  constructor(private readonly webPagesService: WebPagesService) {}
}
