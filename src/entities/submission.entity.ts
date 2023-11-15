import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ChoiceEntity } from './choice.entity';

@Entity()
export class submission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ChoiceEntity, (ChoiceEntity) => ChoiceEntity.id)
  answer: ChoiceEntity;
}
