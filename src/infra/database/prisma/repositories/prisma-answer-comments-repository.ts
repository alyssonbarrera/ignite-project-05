import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'

@Injectable()
export class PrismaAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<AnswerComment | null> {
    throw new Error('Method not implemented.')
  }

  async findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]> {
    throw new Error('Method not implemented.')
  }

  async create(answerComment: AnswerComment): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
