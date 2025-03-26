import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'

@Injectable()
export class PrismaQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  constructor(private prisma: PrismaService) {}

  async findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]> {
    throw new Error('Method not implemented.')
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
