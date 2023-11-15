import { Resolver } from '@nestjs/graphql';
import { AnswerService } from './answer.service';

@Resolver()
export class AnswerResolver {
  constructor(private answerService: AnswerService) {}
}
