import { IsString } from 'class-validator';

export class CreateLinkDto {
  @IsString()
  url: string;

  @IsString()
  text: string;
}
