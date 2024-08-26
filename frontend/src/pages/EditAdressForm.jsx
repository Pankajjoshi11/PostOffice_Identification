import React, { useState } from "react";

const AddressForm = () => {
  const [formData, setFormData] = useState({
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    state: "",
    district: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Address saved successfully!");
        setFormData({
          addressLine1: "",
          addressLine2: "",
          addressLine3: "",
          state: "",
          district: "",
          pincode: "",
        });
      } else {
        alert("Failed to save address.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Address Line 1:
        <input
          type="text"
          name="addressLine1"
          value={formData.addressLine1}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Address Line 2:
        <input
          type="text"
          name="addressLine2"
          value={formData.addressLine2}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Address Line 3:
        <input
          type="text"
          name="addressLine3"
          value={formData.addressLine3}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        State:
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        District:
        <input
          type="text"
          name="district"
          value={formData.district}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Pincode:
        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddressForm;
