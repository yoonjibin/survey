import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SurveyModule } from './survey/survey.module';
import { QuestionModule } from './question/question.module';
import { ChoiceController } from './choice/choice.controller';
import { ChoiceModule } from './choice/choice.module';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: true,
      entities: ['dist/**/**.entity{.ts,.js}'],
    }),
    SurveyModule,
    QuestionModule,
    ChoiceModule,
    AnswerModule,
  ],
  controllers: [ChoiceController],
})
export class AppModule {}
