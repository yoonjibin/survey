import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ChoiceEntity } from './choice.entity';

@Entity('answer')
export class AnswerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ChoiceEntity, (choice) => choice.answer, {
    onDelete: 'CASCADE',
  })
  choice: ChoiceEntity;
}
