import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const PostForm = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      province: "",
      district: "",
      city: "",
      street: "",
      latitude: null,
      longitude: null,
      rent: null,
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      province: Yup.string().required("Province is required"),
      district: Yup.string().required("District is required"),
      city: Yup.string().required("City is required"),
      street: Yup.string(),
      latitude: Yup.number().required("Latitude is required"),
      longitude: Yup.number().required("Longitude is required"),
      rent: Yup.number()
        .required("Rent is required")
        .positive("Rent must be a positive number"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/post/create/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          console.log("Posted uploaded successfully");
        } else {
          console.log("Post upload error");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title && (
          <div>{formik.errors.title}</div>
        )}
      </div>

      <div>
        <div>
          <label htmlFor="province">Province:</label>
          <select
            id="province"
            name="province"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.province}
          >
            <option value="Province No. 1">Province No. 1</option>
            <option value="Province No. 2">Province No. 2</option>
            <option value="Bagmati Province">Bagmati Province</option>
            <option value="Gandaki Province">Gandaki Province</option>
            <option value="Lumbini Province">Lumbini Province</option>
            <option value="Karnali Province">Karnali Province</option>
            <option value="Sudurpaschim Province">Sudurpaschim Province</option>
          </select>
          {formik.touched.province && formik.errors.province && (
            <div>{formik.errors.province}</div>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="district">District:</label>
        <input
          type="text"
          id="district"
          name="district"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.district}
        />
        {formik.touched.district && formik.errors.district && (
          <div>{formik.errors.district}</div>
        )}
      </div>

      <div>
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.city}
        />
        {formik.touched.city && formik.errors.city && (
          <div>{formik.errors.city}</div>
        )}
      </div>

      <div>
        <label htmlFor="street">Street:</label>
        <input
          type="text"
          id="street"
          name="street"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.street}
        />
        {formik.touched.street && formik.errors.street && (
          <div>{formik.errors.street}</div>
        )}
      </div>

      <div>
        <label htmlFor="latitude">Latitude:</label>
        <input
          type="number"
          id="latitude"
          name="latitude"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.latitude}
        />
        {formik.touched.latitude && formik.errors.latitude && (
          <div>{formik.errors.latitude}</div>
        )}
      </div>

      <div>
        <label htmlFor="longitude">Longitude:</label>
        <input
          type="number"
          id="longitude"
          name="longitude"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.longitude}
        />
        {formik.touched.longitude && formik.errors.longitude && (
          <div>{formik.errors.longitude}</div>
        )}
      </div>

      <div>
        <label htmlFor="rent">Rent:</label>
        <input
          type="number"
          id="rent"
          name="rent"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.rent}
        />
        {formik.touched.rent && formik.errors.rent && (
          <div>{formik.errors.rent}</div>
        )}
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description && (
          <div>{formik.errors.description}</div>
        )}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
