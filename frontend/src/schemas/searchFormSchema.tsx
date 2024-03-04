import * as yup from "yup";

const searchFormSchema = yup.object().shape({
  destination: yup.string().max(30).required("Destination is required"),
  departureDate: yup.string().required("Month is required"),
  packageCategory: yup.string().max(30).required("Category is required"),
});

export default searchFormSchema;
