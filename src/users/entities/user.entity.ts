import { WebPage } from 'src/web-pages/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  username: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @OneToMany(() => WebPage, (webPage) => webPage.user)
  webPages: WebPage[];
}
