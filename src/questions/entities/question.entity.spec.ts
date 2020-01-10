import { Question } from './question.entity';

describe('QuestionEntity', () => {
  it('should be defined', () => {
    expect(new Question()).toBeDefined();
  });
});
