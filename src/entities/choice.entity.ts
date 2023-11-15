import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionEntity } from './question.entity';

@Entity('choice')
export class ChoiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 30 })
  text: string;

  @Column({ nullable: false })
  score: number;

  @ManyToOne(() => QuestionEntity, (QuestionEntity) => QuestionEntity.id, {
    onDelete: 'CASCADE',
  })
  question: QuestionEntity;
}
