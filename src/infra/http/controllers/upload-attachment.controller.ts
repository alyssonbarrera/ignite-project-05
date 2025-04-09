import {
  Post,
  Controller,
  UploadedFile,
  ParseFilePipe,
  UseInterceptors,
  FileTypeValidator,
  MaxFileSizeValidator,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('/attachments')
@UseInterceptors(FileInterceptor('file'))
export class UploadAttachmentController {
  constructor() {}

  @Post()
  async handle(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 2, // 2 MB
          }),
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg|pdf)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file)
  }
}
