import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { QuestionService } from './question.service';

@Resolver()
export class QuestionResolver {
  constructor(private questionService: QuestionService) {}

  @Query('getAllQuestion')
  async getAllQuestion() {
    return await this.questionService.getAllQuestion();
  }

  @Query('getAllQuestionBySurveyId')
  async getAllQuestionBySurveyId(
    @Args('surveyId', { type: () => Int }) surveyId: number,
  ) {
    return await this.questionService.getAllQuestionBySurveyId(surveyId);
  }

  @Mutation('createQuestion')
  async createQuestion(
    @Args('question') question: string,
    @Args('surveyId', { type: () => Int }) surveyId: number,
  ) {
    return this.questionService.createQuestion(question, surveyId);
  }

  @Mutation('updateQuestion')
  async updateQuestion(
    @Args('question') question: string,
    @Args('questionId', { type: () => Int }) questionId: number,
  ) {
    return this.questionService.updateQuestion(question, questionId);
  }
}
