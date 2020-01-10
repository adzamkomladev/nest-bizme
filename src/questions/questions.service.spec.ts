import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { QuestionsService } from './questions.service';

import { QuestionRepository } from './repositories/question.repository';

import { QuestionsFilterDto } from './dtos/questions-filter.dto';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { UpdateQuestionDto } from './dtos/update-question.dto';

describe('QuestionsService', () => {
  const mockRepository = () => ({
    filterQuestions: jest.fn(),
    findOneOrFail: jest.fn(),
    createQuestion: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  });

  let service: QuestionsService;
  let repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionsService,
        { provide: QuestionRepository, useFactory: mockRepository },
      ],
    }).compile();

    service = module.get<QuestionsService>(QuestionsService);
    repository = module.get<QuestionRepository>(QuestionRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should get all questions from repository', async () => {
      repository.filterQuestions.mockResolvedValue('Some question');

      expect(repository.filterQuestions).not.toHaveBeenCalled();

      const questionsFilterDto: QuestionsFilterDto = { search: 'Title' };
      const result = await service.findAll(questionsFilterDto);

      expect(repository.filterQuestions).toHaveBeenCalled();
      expect(result).toEqual('Some question');
    });
  });

  describe('findById', () => {
    it('should call repository.findOneOrFail and return the result', async () => {
      repository.findOneOrFail.mockResolvedValue('Some question');

      expect(repository.findOneOrFail).not.toHaveBeenCalled();

      const result = await service.findById(1, {});

      expect(repository.findOneOrFail).toHaveBeenCalledWith(1);
      expect(result).toEqual('Some question');
    });

    it('should throw not found exception when repository.findOneOrFail fails', () => {
      repository.findOneOrFail.mockRejectedValue(null);

      expect(service.findById(1, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should call repository.createQuestion and return the result', async () => {
      const mockCreateQuestionDto: CreateQuestionDto = {
        title: 'Title 1',
        body: 'Body 1',
      };
      repository.createQuestion.mockResolvedValue('Some question');

      expect(repository.createQuestion).not.toHaveBeenCalled();

      const result = await service.create(mockCreateQuestionDto);

      expect(repository.createQuestion).toHaveBeenCalledWith(
        mockCreateQuestionDto,
      );
      expect(result).toEqual('Some question');
    });
  });

  describe('update', () => {
    it('should call repository.update and return the result', async () => {
      const mockUpdateQuestionDto: UpdateQuestionDto = {
        title: 'Title 1',
      };
      repository.update.mockResolvedValue({ affected: 1 });

      expect(repository.update).not.toHaveBeenCalled();

      await service.update(1, mockUpdateQuestionDto);

      expect(repository.update).toHaveBeenCalledWith(1, mockUpdateQuestionDto);
    });

    it('should throw not found exception when question not found', () => {
      const mockUpdateQuestionDto: UpdateQuestionDto = {
        title: 'Title 1',
      };
      repository.update.mockResolvedValue({ affected: 0 });

      expect(service.update(1, mockUpdateQuestionDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('delete', () => {
    it('should call repository.delete and return the result', async () => {
      repository.delete.mockResolvedValue({ affected: 1 });

      expect(repository.delete).not.toHaveBeenCalled();

      await service.delete(1);

      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw not found exception when question not found', () => {
      repository.delete.mockResolvedValue({ affected: 0 });

      expect(service.delete(1)).rejects.toThrow(NotFoundException);
    });
  });
});
