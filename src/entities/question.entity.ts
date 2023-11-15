import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SurveyEntity } from './survey.entity';

@Entity('question')
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 100 })
  question: string;

  @ManyToOne(() => SurveyEntity, (SurveyEntity) => SurveyEntity.id, {
    onDelete: 'CASCADE',
  })
  survey: SurveyEntity;
}
