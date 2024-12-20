import { Controller, Get, Param } from "@nestjs/common";
import { AttachmentService } from "@shopstack/cc-core-lib/core";

@Controller("private")
export class StoragePrivateController {
  constructor(private readonly attachment: AttachmentService) {}

  @Get("/*")
  getMedia(@Param() params: any): any {
    const filename = params["*"]
      .split("/")
      .slice(-1)
      .toString();
    const path = params["*"].replace(`/${filename}`, "");

    return this.attachment.download(path, filename);
  }
}
