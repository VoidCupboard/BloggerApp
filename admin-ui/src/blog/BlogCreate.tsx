import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  TextInput,
  NumberInput,
} from "react-admin";

export const BlogCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="author" source="author" />
        <TextInput label="description" multiline source="description" />
        <NumberInput step={1} label="likes" source="likes" />
        <TextInput label="title" source="title" />
      </SimpleForm>
    </Create>
  );
};
