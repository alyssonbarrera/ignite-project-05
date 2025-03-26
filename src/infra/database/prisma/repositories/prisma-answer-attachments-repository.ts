import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'

@Injectable()
export class PrismaAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  constructor(private prisma: PrismaService) {}

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    throw new Error('Method not implemented.')
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
