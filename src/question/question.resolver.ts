import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { QuestionService } from './question.service';

@Resolver()
export class QuestionResolver {
  constructor(private questionService: QuestionService) {}

  @Mutation('createQuestion')
  async createQuestion(
    @Args('question') question: string,
    @Args('surveyId', { type: () => Int }) surveyId: number,
  ) {
    return this.questionService.createQuestion(question, surveyId);
  }
}
