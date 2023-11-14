import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('survey')
export class SurveyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  isCompleted: Boolean = false;
}
