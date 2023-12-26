// PostForm.js

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import LeafletMap from "./LeafletMap";

const PostForm = () => {
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [images, setImages] = useState([]); // Store selected images
  const [isManualEntry, setIsManualEntry] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      province: "",
      district: "Null",
      city: "Null",
      street: "",
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      rent: 0,
      description: "",
      availability: true,
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
        const response = await fetch("http://127.0.0.1:800/post/create/", {
          method: "POST",
          body: images,
          headers: {
            "Content-Type": "application/json",
            // Add any other headers as needed
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

  const handleGenerateCoordinates = () => {
    // Implement logic to fetch user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting user location:", error.message);
      }
    );
  };
  console.log(coordinates);

  const handleManualEntry = () => {
    // Toggle the manual entry state
    setIsManualEntry(!isManualEntry);
  };

  const handleImageChange = (event) => {
    // Update the images state with the selected files
    setImages([...event.target.files]);
  };

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

      {/* Input for multiple images */}
      <div>
        <label htmlFor="images">Images:</label>
        <input
          type="file"
          id="images"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
        {/* Display selected image names (optional) */}
        {images.map((image, index) => (
          <div key={index}>{image.name}</div>
        ))}
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

      <div>
        <label htmlFor="latitude">Latitude:</label>
        <input
          type="number"
          id="latitude"
          name="latitude"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={coordinates.latitude}
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
          value={coordinates.longitude}
        />
        {formik.touched.longitude && formik.errors.longitude && (
          <div>{formik.errors.longitude}</div>
        )}
      </div>

      <button type="button" onClick={handleGenerateCoordinates}>
        Generate Coordinates
      </button>

      <button type="button" onClick={handleManualEntry}>
        {isManualEntry ? "Exit Manual Entry" : "Enter Manually"}
      </button>

      {/* Render the LeafletMap conditionally based on manual entry */}
      {isManualEntry && (
        <LeafletMap onMapClick={(coords) => setCoordinates(coords)} />
      )}

      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
