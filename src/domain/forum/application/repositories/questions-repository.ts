import { Question } from '@/domain/forum/enterprise/entities/question'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionDetails } from '../../enterprise/entities/value-objects/question-details'

export abstract class QuestionsRepository {
  abstract findById(id: string): Promise<Question | null>
  abstract create(question: Question): Promise<void>
  abstract save(question: Question): Promise<void>
  abstract findBySlug(slug: string): Promise<Question | null>
  abstract findDetailsBySlug(slug: string): Promise<QuestionDetails | null>
  abstract findManyRecent(params: PaginationParams): Promise<Question[]>
  abstract delete(question: Question): Promise<void>
}
