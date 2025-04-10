import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { InMemoryStudentsRepository } from '@test/repositories/in-memory-students-repository'
import { makeStudent } from '@test/factories/make-student'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments Use Case', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository(
      inMemoryStudentsRepository,
    )
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to fetch answer comments', async () => {
    const student = makeStudent({ name: 'John Doe' })
    inMemoryStudentsRepository.items.push(student)

    let index = 0

    while (index < 20) {
      const newAnswerComment = makeAnswerComment({
        answerId: new UniqueEntityID('answer-1'),
        authorId: student.id,
      })

      await inMemoryAnswerCommentsRepository.create(newAnswerComment)

      index++
    }

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.comments).toHaveLength(20)
    expect(result.value?.comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          author: {
            id: student.id,
            name: 'John Doe',
          },
        }),
        expect.objectContaining({
          author: {
            id: student.id,
            name: 'John Doe',
          },
        }),
        expect.objectContaining({
          author: {
            id: student.id,
            name: 'John Doe',
          },
        }),
      ]),
    )
  })

  it('should be able to fetch paginated answer comments', async () => {
    const student = makeStudent({ name: 'John Doe' })
    inMemoryStudentsRepository.items.push(student)

    let index = 0

    while (index < 22) {
      const newAnswerComment = makeAnswerComment({
        answerId: new UniqueEntityID('answer-1'),
        authorId: student.id,
      })

      await inMemoryAnswerCommentsRepository.create(newAnswerComment)

      index++
    }

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.comments).toHaveLength(2)
  })
})
