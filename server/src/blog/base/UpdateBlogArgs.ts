import { ArgsType, Field } from "@nestjs/graphql";
import { BlogWhereUniqueInput } from "./BlogWhereUniqueInput";
import { BlogUpdateInput } from "./BlogUpdateInput";

@ArgsType()
class UpdateBlogArgs {
  @Field(() => BlogWhereUniqueInput, { nullable: false })
  where!: BlogWhereUniqueInput;
  @Field(() => BlogUpdateInput, { nullable: false })
  data!: BlogUpdateInput;
}

export { UpdateBlogArgs };
