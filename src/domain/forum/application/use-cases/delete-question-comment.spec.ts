import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { makeQuestionComment } from '@test/factories/make-question-comment'
import { InMemoryStudentsRepository } from '@test/repositories/in-memory-students-repository'
import { InMemoryQuestionCommentsRepository } from '@test/repositories/in-memory-question-comments-repository'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete Question Comment Use Case', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository(
      inMemoryStudentsRepository,
    )
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to delete a question comment', async () => {
    const newQuestionComment = makeQuestionComment()

    await inMemoryQuestionCommentsRepository.create(newQuestionComment)

    const result = await sut.execute({
      questionCommentId: newQuestionComment.id.toString(),
      authorId: newQuestionComment.authorId.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete another user question comment', async () => {
    const newQuestionComment = makeQuestionComment()

    await inMemoryQuestionCommentsRepository.create(newQuestionComment)

    const result = await sut.execute({
      questionCommentId: newQuestionComment.id.toString(),
      authorId: 'author-1',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
