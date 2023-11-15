import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('survey')
export class SurveyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 50 })
  title: string;

  @Column({ nullable: false })
  isCompleted: Boolean = false;
}
