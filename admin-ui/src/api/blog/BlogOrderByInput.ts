import { SortOrder } from "../../util/SortOrder";

export type BlogOrderByInput = {
  createdAt?: SortOrder;
  description?: SortOrder;
  id?: SortOrder;
  likes?: SortOrder;
  title?: SortOrder;
  updatedAt?: SortOrder;
};
