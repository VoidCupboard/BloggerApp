import { ArgsType, Field } from "@nestjs/graphql";
import { BlogWhereUniqueInput } from "./BlogWhereUniqueInput";

@ArgsType()
class BlogFindUniqueArgs {
  @Field(() => BlogWhereUniqueInput, { nullable: false })
  where!: BlogWhereUniqueInput;
}

export { BlogFindUniqueArgs };
