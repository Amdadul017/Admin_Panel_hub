import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';

import { useAuth } from '../components/AuthProvider';

const CreateCategory = () => {
    const { shop } = useAuth();
    const [mainImage, setMainImage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const token = localStorage.getItem("token")
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        image: '',
        max_capacity: '',
        quantity: 0,
        shop_id: shop?._id
    });
    const [formErrors, setFormErrors] = useState({
        nameError: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        setFormErrors({
            ...formErrors,
            nameError: ''
        });
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
        if (formData.name === '') {
            setFormErrors({
                ...formErrors,
                nameError: 'Please enter a name.'
            });
            return;
        }
        // Handle form submission here
        else {
            try {
                const newCategory = await axios.post("https://admin-panel-hub.onrender.com/api/category/create", {
                    name: formData.name,
                    shop_id: formData.shop_id,
                    image: mainImage,
                    quantity: formData.quantity,
                    max_capacity: formData.max_capacity
                }, {
                    headers: {
                        'x-access-token': token
                    }
                })
                //console.log(newCategory.data)
                if(newCategory.data.status==="ok"){
                    navigate('/')
                }
            } catch (error) {
                console.log(error)
            }
        }
        //console.log(formData);
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {formErrors.nameError && <small className="text-danger">{formErrors.nameError}</small>}

                        </div>

                        <div className="form-group">
                            <label>Image</label>
                            <input
                                type="file"
                                className="form-control"
                                placeholder="Enter image URL"
                                name="image"
                                //value={formData.image}
                                onChange={uploadImage}
                            />
                        </div>

                        <div className="form-group">
                            <label>Max Capacity</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter max capacity"
                                name="max_capacity"
                                value={formData.max_capacity}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateCategory