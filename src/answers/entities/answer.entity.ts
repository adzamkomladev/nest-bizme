import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Question } from '../../questions/entities/question.entity';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Answer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @Column({ default: 0 })
  votes: number;

  @ManyToOne(
    type => Question,
    question => question.answers,
  )
  question: Question;

  @ManyToOne(
    type => User,
    user => user.answers,
  )
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  questionId: number;

  @Column()
  userId: number;
}
