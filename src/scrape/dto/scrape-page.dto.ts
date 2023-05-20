import { IsString } from 'class-validator';

export class ScrapePageDto {
  @IsString()
  url: string;
}
