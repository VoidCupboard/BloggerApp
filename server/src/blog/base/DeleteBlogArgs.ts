import { ArgsType, Field } from "@nestjs/graphql";
import { BlogWhereUniqueInput } from "./BlogWhereUniqueInput";

@ArgsType()
class DeleteBlogArgs {
  @Field(() => BlogWhereUniqueInput, { nullable: false })
  where!: BlogWhereUniqueInput;
}

export { DeleteBlogArgs };
