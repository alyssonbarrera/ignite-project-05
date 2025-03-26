import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'

@Injectable()
export class PrismaQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<QuestionComment | null> {
    throw new Error('Method not implemented.')
  }

  async findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]> {
    throw new Error('Method not implemented.')
  }

  async create(questionComment: QuestionComment): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
