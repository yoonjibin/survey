# 프로젝트 개요

마음연구소 백엔드 과제인 설문지 서비스입니다.

# 설계

### ERD

![Alt text](image.png)

https://dbdiagram.io/d/655330177d8bbd646523b42e

### GraphQlModel

설문지

```graphql
type Survey {
  id: ID!
  title: String!
  isCompleted: Boolean
  question: [Question]
}

type SurveyWithTotalScore {
  survey: Survey
  totalScore: Int
}
```

문항

```graphql
type Question {
  id: ID!
  question: String!
  choice: [Choice]
}
```

선택지

```graphql
type Choice {
  id: ID!
  text: String!
  score: Int!
  answer: [Answer]
}
```

답변

```graphql
type Answer {
  id: ID!
  choice: Choice
}
```

# 기능들

### Query

```graphql
type Query {
  getAnswerByQuestionId(questionId: ID!): Answer
  getAllAnswer: [Answer]
  getAllChoice: [Choice]
  getAllChoiceByQuestionId(questionId: ID!): [Choice]
  getChoiceByChoiceId(choiceId: ID!): Choice
  getAllQuestion: [Question]
  getAllQuestionBySurveyId(surveyId: ID): [Question]
  getQuestionByQuestionId(questionId: ID): Question
  getAllSurvey: [Survey]
  getSurveyById(surveyId: ID!): Survey
  getCompletedSurvey(surveyId: ID!): SurveyWithTotalScore
  getTotalScoreBySurveyId(surveyId: ID!): SurveyWithTotalScore
}
```

### Mutation

```graphql
type Mutation {
  createAnswer(choiceId: ID!): Answer
  updateAnswer(answerId: ID!, choiceId: ID!): Answer
  deleteAnswer(answerId: ID!): Answer
  createChoice(text: String!, score: Int!, questionId: ID!): Choice
  updateChoice(text: String!, score: Int!, choiceId: ID!): Choice
  deleteChoice(choiceId: ID!): Choice
  createQuestion(question: String!, surveyId: ID!): Question
  updateQuestion(question: String!, questionId: ID!): Question
  deleteQuestion(questionId: ID!): Question
  createSurvey(title: String!): Survey
  updateSurvey(surveyId: ID!, title: String!): Survey
  updateSurveyCompleted(surveyId: ID!): Survey
  deleteSurvey(surveyId: ID!): Survey
}
```

# 실행방법

### 1. 프로젝트를 클론합니다.

```bash
git clone https://github.com/yoonjibin/survey.git
```

### 2. 프로젝트 폴더로 이동합니다.

```bash
cd your-repo
```

### 3. .env.example파일을 복사하여 새 .env파일을 만듭니다.

```bash
cp .env.example .env
```

### 4. .env파일을 열어 필요한 환경 변수를 설정합니다.

```
# Database
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE= {your_database}
DB_USERNAME= {your_username}
DB_PASSWORD= {your_password}
```

### 5. 필요한 종속성을 설치합니다.

```bash
yanr install
```

or

```bash
npm install
```

### 6. 애플리케이션을 실행합니다.

```bash
yarn start
```

or

```bash
npm start
```
