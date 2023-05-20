import { WebPage } from 'src/web-pages/entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  text: string;

  @ManyToOne(() => WebPage)
  @JoinColumn({ name: 'webPageId' })
  webPage: WebPage;
}
