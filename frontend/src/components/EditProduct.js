import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from "../components/AuthProvider";

const EditProduct = ({ showModal, handleCloseModal, product, category }) => {
    // State variables to hold form data
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: '',
        description: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [newCategoryQuantity, setNewCategoryQuantity] = useState();
    const [newProductQuantity, setNewProductQuantity] = useState(product.quantity);
    const token = localStorage.getItem("token")


    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                price: product.price.toString(),
                quantity: product.quantity.toString(),
                description: product.description
            });
        }
    }, [product]);

    useEffect(() => {
        if (formData.quantity > product.quantity) {
            // const newCategoryQuantity = product.quantity + parseInt(formData.quantity)
            // console.log(newCategoryQuantity)
            //setNewCategoryQuantity(category.quantity + parseInt(formData.quantity))
            const extraQuantity = parseInt(formData.quantity) - product.quantity;
            setNewProductQuantity(product.quantity + extraQuantity);
            setNewCategoryQuantity(category.quantity + extraQuantity);
        }
        else if (formData.quantity < product.quantity) {
            const deductQuantity = product.quantity - parseInt(formData.quantity);
            setNewProductQuantity(product.quantity - deductQuantity);
            setNewCategoryQuantity(category.quantity - deductQuantity);
        }
    }, [formData.quantity])
    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you can handle form submission, e.g., send data to server
        console.log(newCategoryQuantity, newProductQuantity);

        if (newCategoryQuantity > category.max_capacity) {
            setErrorMessage(`Can not add ${formData.quantity} items. Catagory exceeded`)
        }
        else {
            try {
                const result = await axios.put(`https://admin-panel-hub.onrender.com/api/product/update/${product._id}`, {
                    name: formData.name,
                    price: formData.price,
                    quantity: newProductQuantity,
                    description: formData.description,
                    new_category_quantity: newCategoryQuantity,
                    category_id: category._id,
                },
                    {
                        headers: {
                            'x-access-token': token
                        }
                    })
                console.log(result.data)
                if(result.data.status==="ok"){
                    handleCloseModal();
                    window.location.reload();
                    setFormData({
                        name: '',
                        price: '',
                        quantity: '',
                        description: ''
                    });
                }
                //setCategory(categoryInfo.data.categoryInfo)
            } catch (error) {
                console.log(error)
            }
            
        }



        // Reset form fields after submission

        // Close modal after submission
       
        setTimeout(() => {
            setErrorMessage('');
        }, 2000);
    };

    return (
        <Modal show={showModal} onHide={handleCloseModal} className="custom-modal">
            <Modal.Header closeButton>
                <Modal.Title>Update Product</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ width: '400px' }}>
                <Form >
                    <Form.Group controlId="formProductName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter product price"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductQuantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter product quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter product description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            {errorMessage && (
                <Modal.Footer>
                    <div className="error-message" style={{ color: "red" }}>{errorMessage}</div>
                </Modal.Footer>
            )}
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditProduct;
