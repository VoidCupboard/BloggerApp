import { Module } from "@nestjs/common";
import { BlogModuleBase } from "./base/blog.module.base";
import { BlogService } from "./blog.service";
import { BlogController } from "./blog.controller";
import { BlogResolver } from "./blog.resolver";

@Module({
  imports: [BlogModuleBase],
  controllers: [BlogController],
  providers: [BlogService, BlogResolver],
  exports: [BlogService],
})
export class BlogModule {}
