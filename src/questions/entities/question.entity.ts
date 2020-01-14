import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Tag } from '../../tags/entities/tag.entity';
import { Answer } from '../../answers/entities/answer.entity';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
