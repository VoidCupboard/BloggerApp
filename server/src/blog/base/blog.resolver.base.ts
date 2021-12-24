import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateBlogArgs } from "./CreateBlogArgs";
import { UpdateBlogArgs } from "./UpdateBlogArgs";
import { DeleteBlogArgs } from "./DeleteBlogArgs";
import { BlogFindManyArgs } from "./BlogFindManyArgs";
import { BlogFindUniqueArgs } from "./BlogFindUniqueArgs";
import { Blog } from "./Blog";
import { BlogService } from "../blog.service";

@graphql.Resolver(() => Blog)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class BlogResolverBase {
  constructor(
    protected readonly service: BlogService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Blog",
    action: "read",
    possession: "any",
  })
  async _blogsMeta(
    @graphql.Args() args: BlogFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [Blog])
  @nestAccessControl.UseRoles({
    resource: "Blog",
    action: "read",
    possession: "any",
  })
  async blogs(
    @graphql.Args() args: BlogFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Blog[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Blog",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Blog, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Blog",
    action: "read",
    possession: "own",
  })
  async blog(
    @graphql.Args() args: BlogFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Blog | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Blog",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Blog)
  @nestAccessControl.UseRoles({
    resource: "Blog",
    action: "create",
    possession: "any",
  })
  async createBlog(
    @graphql.Args() args: CreateBlogArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Blog> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Blog",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Blog"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Blog)
  @nestAccessControl.UseRoles({
    resource: "Blog",
    action: "update",
    possession: "any",
  })
  async updateBlog(
    @graphql.Args() args: UpdateBlogArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Blog | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Blog",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Blog"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Blog)
  @nestAccessControl.UseRoles({
    resource: "Blog",
    action: "delete",
    possession: "any",
  })
  async deleteBlog(@graphql.Args() args: DeleteBlogArgs): Promise<Blog | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
