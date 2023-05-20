import { ArrayNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateLinkDto } from 'src/links/dto/create-link.dto';

export class CreateWebPageDto {
  @IsString()
  name: string;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateLinkDto)
  links: CreateLinkDto[];
}
