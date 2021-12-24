import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { BlogWhereInput } from "./BlogWhereInput";
import { Type } from "class-transformer";
import { BlogOrderByInput } from "./BlogOrderByInput";

@ArgsType()
class BlogFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => BlogWhereInput,
  })
  @Field(() => BlogWhereInput, { nullable: true })
  @Type(() => BlogWhereInput)
  where?: BlogWhereInput;

  @ApiProperty({
    required: false,
    type: BlogOrderByInput,
  })
  @Field(() => BlogOrderByInput, { nullable: true })
  @Type(() => BlogOrderByInput)
  orderBy?: BlogOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { BlogFindManyArgs };
