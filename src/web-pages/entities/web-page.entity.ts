import { Link } from 'src/links/entities';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class WebPage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Link, (link) => link.webPage)
  links: Link[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
