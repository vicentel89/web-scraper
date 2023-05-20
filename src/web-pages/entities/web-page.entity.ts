import { Link } from 'src/links/entities';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class WebPage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Link, (link) => link.webPage)
  links: Link[];
}
