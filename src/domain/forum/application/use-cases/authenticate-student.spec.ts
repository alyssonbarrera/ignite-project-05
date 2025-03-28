import { FakeHasher } from '@test/cryptography/fake-hasher'
import { AuthenticateStudentUseCase } from './authenticate-student'
import { InMemoryStudentsRepository } from '@test/repositories/in-memory-students-repository'
import { FakeEncrypter } from '@test/cryptography/fake-encrypter'
import { makeStudent } from '@test/factories/make-student'
import { WrongCredentialsError } from './errors/wrong-credentials-errors'

let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let inMemoryStudentsRepository: InMemoryStudentsRepository
let sut: AuthenticateStudentUseCase

describe('Authenticate Student Use Case', () => {
  beforeEach(() => {
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    sut = new AuthenticateStudentUseCase(
      inMemoryStudentsRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate a student', async () => {
    const student = makeStudent({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryStudentsRepository.items.push(student)

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })

  it('should be not be able to authenticate a student with invalid credentials', async () => {
    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })
})
