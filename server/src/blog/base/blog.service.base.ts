import { PrismaService } from "nestjs-prisma";
import { Prisma, Blog } from "@prisma/client";

export class BlogServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.BlogFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.BlogFindManyArgs>
  ): Promise<number> {
    return this.prisma.blog.count(args);
  }

  async findMany<T extends Prisma.BlogFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.BlogFindManyArgs>
  ): Promise<Blog[]> {
    return this.prisma.blog.findMany(args);
  }
  async findOne<T extends Prisma.BlogFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.BlogFindUniqueArgs>
  ): Promise<Blog | null> {
    return this.prisma.blog.findUnique(args);
  }
  async create<T extends Prisma.BlogCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.BlogCreateArgs>
  ): Promise<Blog> {
    return this.prisma.blog.create<T>(args);
  }
  async update<T extends Prisma.BlogUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.BlogUpdateArgs>
  ): Promise<Blog> {
    return this.prisma.blog.update<T>(args);
  }
  async delete<T extends Prisma.BlogDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.BlogDeleteArgs>
  ): Promise<Blog> {
    return this.prisma.blog.delete(args);
  }
}
