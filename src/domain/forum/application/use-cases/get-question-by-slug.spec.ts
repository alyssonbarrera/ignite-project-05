import { makeQuestion } from '@test/factories/make-question'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { InMemoryQuestionsRepository } from '@test/repositories/in-memory-questions-repository'
import { InMemoryStudentsRepository } from '@test/repositories/in-memory-students-repository'
import { InMemoryAttachmentsRepository } from '@test/repositories/in-memory-attachments-repository'
import { InMemoryQuestionAttachmentsRepository } from '@test/repositories/in-memory-question-attachments-repository'
import { makeStudent } from '@test/factories/make-student'
import { makeQuestionAttachment } from '@test/factories/make-question-attachment'
import { makeAttachment } from '@test/factories/make-attachment'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug Use Case', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
      inMemoryAttachmentsRepository,
      inMemoryStudentsRepository,
    )
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const student = makeStudent({ name: 'John Doe' })

    await inMemoryStudentsRepository.create(student)

    const newQuestion = makeQuestion({
      authorId: student.id,
      slug: Slug.create('example-question'),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const attachment = makeAttachment({
      title: 'Some attachment',
    })

    inMemoryAttachmentsRepository.items.push(attachment)

    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        attachmentId: attachment.id,
        questionId: newQuestion.id,
      }),
    )

    const result = await sut.execute({
      slug: 'example-question',
    })

    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: newQuestion.title,
        slug: newQuestion.slug,
        author: 'John Doe',
        attachments: [
          expect.objectContaining({
            title: attachment.title,
          }),
        ],
      }),
    })
  })

  it('should not be able to get a question by slug if it does not exist', async () => {
    const result = await sut.execute({
      slug: 'question-title',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
