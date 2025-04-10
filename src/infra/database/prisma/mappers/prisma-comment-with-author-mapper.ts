import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Comment as PrismaComment, User as PrismaUser } from '@prisma/client'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'

type PrismaCommentWithAuthor = PrismaComment & {
  author: PrismaUser
}

export class PrismaCommentWithAuthorMapper {
  static toDomain(raw: PrismaCommentWithAuthor): CommentWithAuthor {
    return CommentWithAuthor.create({
      commentId: new UniqueEntityID(raw.id),
      author: {
        id: new UniqueEntityID(raw.authorId),
        name: raw.author.name,
      },
      content: raw.content,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    })
  }
}
