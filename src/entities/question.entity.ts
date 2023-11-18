import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SurveyEntity } from './survey.entity';
import { ChoiceEntity } from './choice.entity';

@Entity('question')
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 100 })
  question: string;

  @OneToMany(() => ChoiceEntity, (choice) => choice.question)
  choice: ChoiceEntity[]; // 여기 수정

  @ManyToOne(() => SurveyEntity, (survey) => survey.question, {
    onDelete: 'CASCADE',
  })
  survey: SurveyEntity;
}
