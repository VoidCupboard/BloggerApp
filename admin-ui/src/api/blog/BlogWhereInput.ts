import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";

export type BlogWhereInput = {
  description?: StringNullableFilter;
  id?: StringFilter;
  likes?: StringNullableFilter;
  title?: StringNullableFilter;
};
