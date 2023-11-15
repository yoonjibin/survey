import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ChoiceEntity } from './choice.entity';

@Entity()
export class AnswerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ChoiceEntity, (ChoiceEntity) => ChoiceEntity.id)
  choice: ChoiceEntity;
}
