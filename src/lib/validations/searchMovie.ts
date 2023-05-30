import * as yup from "yup";

export const searchSchema = yup.object().shape({
  query: yup.string().required(),
  page: yup.number().optional(),
});
