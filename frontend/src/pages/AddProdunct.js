import React, { useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios'

const AddProdunct = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = queryString.parse(location.search);

    const { id } = useParams();
    const maxCapacity = parseInt(queryParams.maxCapacity);
    const quantity = parseInt(queryParams.quantity);
    const [errorMessage, setErrorMessage] = useState()
    const [mainImage, setMainImage] = useState('');
    const token = localStorage.getItem("token")

    const [formData, setFormData] = useState({
        name: '',
        quantity: 0,
        description: '',
        price: 0,
        image: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setErrorMessage('')
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
            //console.log(response.data.secure_url)
        } catch (error) {
            console.log("Error occurred during user registration:", error);
            console.log("upload error");
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCategoryQuantity = quantity + parseInt(formData.quantity)
        console.log(newCategoryQuantity)
        if (newCategoryQuantity > maxCapacity) {
            // console.log(`Can not add ${formData.quantity} items. Catagory exceeded`)
            setErrorMessage(`Can not add ${formData.quantity} items. Catagory exceeded`)
        }
        else {
            console.log(formData);
            try {
                const newProduct = await axios.post("https://admin-panel-hub.onrender.com/api/product/addProduct", {
                    name: formData.name,
                    image: mainImage,
                    category_id: id,
                    quantity: formData.quantity,
                    price: formData.price,
                    description: formData.description,
                    new_category_quantity: newCategoryQuantity
                }, {
                    headers: {
                        'x-access-token': token
                    }
                })
                //console.log(newProduct.data)
                if(newProduct.data.status === "ok"){
                    navigate('/')
                }
            } catch (error) {
                console.log(error)
            }
        }
        // Reset form after submission if needed
        setFormData({
            name: '',
            quantity: 0,
            description: '',
            price: 0,
            image: ''
        });
    };
    return (
        <div className="container">
            <h2>Add Product</h2>
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
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        //value={formData.image}
                        onChange={uploadImage}
                    />
                </div>
                <p style={{ color: 'red' }}>{errorMessage}</p>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddProdunct