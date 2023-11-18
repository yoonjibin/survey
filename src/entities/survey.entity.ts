import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionEntity } from './question.entity';

@Entity('survey')
export class SurveyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 50 })
  title: string;

  @Column({ nullable: false })
  isCompleted: boolean = false;

  @OneToMany(() => QuestionEntity, (question) => question.survey)
  question: QuestionEntity[];
}
