import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function ProductForm() {
    const token = localStorage.getItem("token")
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        image: '',
        location: '',
        description: ''
    });

    const [formErrors, setFormErrors] = useState({
        nameError: ''
    });

    const [showToast, setShowToast] = useState(false);
    const [mainImage, setMainImage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        // Clearing errors if the input value is changed
        if (name === 'name') {
            setFormErrors({ ...formErrors, nameError: '' });
        }
    };
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            setFormErrors({ ...formErrors, nameError: 'Name is required' });
            setShowToast(true);
        }
        if (formData.name.trim()) {
            console.log(formData);
            // You can add further logic here, such as sending the form data to a server
            try {
                const newShop = await axios.post("https://admin-panel-hub.onrender.com/api/shop/create", {
                    name: formData.name,
                    image: mainImage,
                    location: formData.location,
                    description: formData.description
                }, {
                    headers: {
                        'x-access-token': token
                    }
                })
                console.log(newShop)
                if (newShop.data.status === "ok") {
                    navigate('/')
                }
            } catch (error) {
                console.log(error)
            }
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-90">
            <form style={{ width: '60%', marginTop: "40px" }} onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    {formErrors.nameError && <small className="text-danger">{formErrors.nameError}</small>}
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="form-control"
                        //value={formData.image}
                        onChange={uploadImage}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Location:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div
                className="toast align-items-center text-white bg-danger"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                style={{ position: 'absolute', bottom: '20px', right: '20px' }}
                hidden={!showToast}
            >
                <div className="toast-body">
                    Please fill in the required fields (Name and Image URL).
                </div>
            </div>
        </div>
    );
}

export default ProductForm;
