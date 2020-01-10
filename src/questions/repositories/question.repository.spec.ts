import { QuestionRepository } from './question.repository';
import { Test } from '@nestjs/testing';
import { CreateQuestionDto } from '../dtos/create-question.dto';

describe('QuestionRepository', () => {
  let repository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [QuestionRepository],
    }).compile();

    repository = await module.get<QuestionRepository>(QuestionRepository);
  });

  it('should be defined', () => {
    expect(new QuestionRepository()).toBeDefined();
  });

  describe('createQuestion', () => {
    it('should create and return question when called', async () => {
      const mockCreateQuestionDto: CreateQuestionDto = {
        title: 'Title',
        body: 'Body',
      };
      const save = jest.fn().mockResolvedValue('Some question');
      repository.create = jest.fn().mockReturnValue({ save });

      const result = await repository.createQuestion(mockCreateQuestionDto);

      expect(result).toEqual('Some question');
    });
  });
});
