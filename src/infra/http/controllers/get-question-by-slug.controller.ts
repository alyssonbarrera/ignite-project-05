import { Get, Param, Controller, BadRequestException } from '@nestjs/common'

import { QuestionDetailsPresenter } from '../presenters/question-details-presenter'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'

@Controller('/questions/:slug')
export class GetQuestionBySlugController {
  constructor(private getQuestionBySlug: GetQuestionBySlugUseCase) {}

  @Get()
  async handle(@Param('slug') slug: string) {
    const result = await this.getQuestionBySlug.execute({
      slug,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return { question: QuestionDetailsPresenter.toHTTP(result.value.question) }
  }
}
