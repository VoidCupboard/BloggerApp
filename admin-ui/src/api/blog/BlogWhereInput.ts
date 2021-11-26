import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { IntNullableFilter } from "../../util/IntNullableFilter";

export type BlogWhereInput = {
  author?: StringNullableFilter;
  description?: StringNullableFilter;
  id?: StringFilter;
  likes?: IntNullableFilter;
  title?: StringNullableFilter;
};
