import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { BlogService } from "./blog.service";
import { BlogControllerBase } from "./base/blog.controller.base";

@swagger.ApiTags("blogs")
@common.Controller("blogs")
export class BlogController extends BlogControllerBase {
  constructor(
    protected readonly service: BlogService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
