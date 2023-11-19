import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionEntity } from './question.entity';
import { AnswerEntity } from './answer.entity';

@Entity('choice')
export class ChoiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 30 })
  text: string;

  @Column({ nullable: false })
  score: number;

  @ManyToOne(() => QuestionEntity, (question) => question.choice, {
    onDelete: 'CASCADE',
  })
  question: QuestionEntity;

  @OneToMany(() => AnswerEntity, (answer) => answer.choice)
  answer: AnswerEntity;
}
