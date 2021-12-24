import { ArgsType, Field } from "@nestjs/graphql";
import { BlogCreateInput } from "./BlogCreateInput";

@ArgsType()
class CreateBlogArgs {
  @Field(() => BlogCreateInput, { nullable: false })
  data!: BlogCreateInput;
}

export { CreateBlogArgs };
