import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AnswerEntity } from './answer.entity';

@Entity()
export class submission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AnswerEntity, (AnswerEntity) => AnswerEntity.id)
  answer: AnswerEntity;
}
