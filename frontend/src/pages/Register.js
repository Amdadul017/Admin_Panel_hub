import React, { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

import axios from 'axios'

const Register = () => {
  const [mainImage, setMainImage] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    reEnterPassword: '',
    image: ''
  });

  const [errors, setErrors] = useState({
    nameError: '',
    emailError: '',
    passwordError: '',
    reEnterPasswordError: ''
  });

  async function uploadImage(event) {
    event.preventDefault();
    const formData = new FormData();
    const file = event.target.files?.[0];
    if (file) {
      formData.append('file', file);
    }
    formData.append("upload_preset", "ade40fld");
    //console.log("I am here");
    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dv4j8hjqf/image/upload", formData);
      if (response) {
        setMainImage(response.data.secure_url);
        //setFormData({...formData, image: response.data.secure_url})
      }
      console.log(response.data.secure_url)
    } catch (error) {
      console.log("Error occurred during user registration:", error);
      console.log("upload error");
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    const newErrors = {
      nameError: '',
      emailError: '',
      passwordError: '',
      reEnterPasswordError: ''
    };

    if (!formData.name) {
      newErrors.nameError = 'Name is required';
      valid = false;
    }
    if (!formData.email) {
      newErrors.emailError = 'Email is required';
      valid = false;
    }
    if (!formData.password) {
      newErrors.passwordError = 'Password is required';
      valid = false;
    }
    if (formData.password !== formData.reEnterPassword) {
      newErrors.reEnterPasswordError = 'Passwords do not match';
      valid = false;
    }

    if (valid) {
      // You can handle registration logic here
      console.log(formData);
      try {
        const newProduct = await axios.post("https://admin-panel-hub.onrender.com/api/user/register", {
          name: formData.name,
          image: mainImage,
          email: formData.email,
          password: formData.password

        })
        //console.log(newProduct.data)
        if (newProduct.data.status === "ok") {
          navigate('/login')
        }
      } catch (error) {
        console.log(error)
      }
      setFormData({
        name: '',
        email: '',
        password: '',
        reEnterPassword: '',
        image: ''
      });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.nameError && <p className="text-danger">{errors.nameError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.emailError && <p className="text-danger">{errors.emailError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.passwordError && <p className="text-danger">{errors.passwordError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="reEnterPassword">Re-enter Password:</label>
          <input
            type="password"
            className="form-control"
            id="reEnterPassword"
            name="reEnterPassword"
            value={formData.reEnterPassword}
            onChange={handleChange}
          />
          {errors.reEnterPasswordError && <p className="text-danger">{errors.reEnterPasswordError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            value={formData.image}
            onChange={uploadImage}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Register;
