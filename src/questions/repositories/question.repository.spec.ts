import { QuestionRepository } from './question.repository';

describe('QuestionRepository', () => {
  it('should be defined', () => {
    expect(new QuestionRepository()).toBeDefined();
  });
});
