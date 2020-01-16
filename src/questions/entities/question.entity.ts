import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Tag } from '../../tags/entities/tag.entity';
import { Answer } from '../../answers/entities/answer.entity';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ default: 0 })
  views: number;

  @OneToMany(
    type => Answer,
    answer => answer.question,
  )
  answers: Answer[];

  @ManyToMany(
    type => Tag,
    tag => tag.questions,
  )
  @JoinTable()
  tags: Tag[];

  @ManyToOne(
    type => User,
    user => user.questions,
  )
  user: User;

  @Column({ nullable: true })
  bestAnswerId: number;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
