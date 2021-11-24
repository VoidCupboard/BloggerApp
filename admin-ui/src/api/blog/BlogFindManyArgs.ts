import { BlogWhereInput } from "./BlogWhereInput";
import { BlogOrderByInput } from "./BlogOrderByInput";

export type BlogFindManyArgs = {
  where?: BlogWhereInput;
  orderBy?: BlogOrderByInput;
  skip?: number;
  take?: number;
};
