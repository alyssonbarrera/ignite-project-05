import { makeQuestion } from '@test/factories/make-question'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'
import { InMemoryQuestionsRepository } from '@test/repositories/in-memory-questions-repository'
import { InMemoryStudentsRepository } from '@test/repositories/in-memory-students-repository'
import { InMemoryAttachmentsRepository } from '@test/repositories/in-memory-attachments-repository'
import { InMemoryQuestionAttachmentsRepository } from '@test/repositories/in-memory-question-attachments-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions Use Case', () => {
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
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    let index = 0

    while (index < 20) {
      const newQuestion = makeQuestion({
        createdAt: new Date(2023, 3, index + 1),
      })

      await inMemoryQuestionsRepository.create(newQuestion)

      index++
    }

    const result = await sut.execute({
      page: 1,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.questions).toHaveLength(20)
    expect(result.value?.questions[0]).toEqual(
      expect.objectContaining({
        createdAt: new Date(2023, 3, 20),
      }),
    )
  })

  it('should be able to fetch paginated recent questions', async () => {
    let index = 0

    while (index < 22) {
      const newQuestion = makeQuestion()

      await inMemoryQuestionsRepository.create(newQuestion)

      index++
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.questions).toHaveLength(2)
  })
})
