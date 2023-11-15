import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionEntity } from './question.entity';

@Entity('choice')
export class ChoiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  test: string;

  @Column()
  score: number;

  @ManyToOne(() => QuestionEntity, (QuestionEntity) => QuestionEntity.id)
  question: QuestionEntity;
}
