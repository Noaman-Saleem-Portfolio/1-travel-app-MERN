import { useFormik } from "formik";
import searchFormSchema from "../schemas/searchFormSchema";

const SearchForm = () => {
  // How to use useFormik in typescript ... Solution in below link
  // https://stackoverflow.com/questions/68397581/how-to-use-useformik-in-typescript
  const { values, touched, handleBlur, handleChange, errors } = useFormik<{
    destination: string;
    departureDate: string;
    packageCategory: string;
  }>({
    initialValues: {
      destination: "",
      departureDate: "",
      packageCategory: "",
    },

    validationSchema: searchFormSchema,

    //This ie required in formik docs
    onSubmit: (): void => {},
  });

  return (
    <div className="search-form">
      <div className="for-element">
        <label htmlFor="">Where To?</label>
        <input
          type="text"
          placeholder="Where To?"
          name="destination"
          value={values.destination}
          onChange={handleChange}
          onBlur={handleBlur}
          className="form-input"
        />
      </div>

      <div className="for-element">
        <label htmlFor="">Month</label>
        <input
          type="month"
          //   placeholder="Where To?"
          name="departureDate"
          value={values.departureDate}
          onChange={handleChange}
          onBlur={handleBlur}
          className="form-input"
        />
      </div>

      <div className="for-element">
        <label htmlFor="">Travel type</label>
        <select
          name="packageCategory"
          onChange={handleChange}
          onBlur={handleBlur}
          className="form-input"
        >
          <option value={values.packageCategory}>Select category</option>
          <option value={values.packageCategory}>Adventure</option>
          <option value={values.packageCategory}>Couple</option>
          <option value={values.packageCategory}>Family</option>
        </select>
      </div>
      <button>Find Now</button>
    </div>
    // search-form
  );
};

export default SearchForm;
