import { BlogWhereUniqueInput } from "./BlogWhereUniqueInput";
import { BlogUpdateInput } from "./BlogUpdateInput";

export type UpdateBlogArgs = {
  where: BlogWhereUniqueInput;
  data: BlogUpdateInput;
};
