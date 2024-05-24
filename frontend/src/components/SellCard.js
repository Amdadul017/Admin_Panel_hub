import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../style/SellModal.css'
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios'
import { useAuth } from "../components/AuthProvider"

const SellCard = ({ show, handleClose, category, product }) => {
    const [quantity, setQuantity] = useState(0);
    const [newCategoryQuantity, setNewCategoryQuantity] = useState();
    const [newProductQuantity, setNewProductQuantity] = useState();
    const [price, setPrice] = useState('');
    const [customerId, setCustomerId] = useState("65d6078045145cceff0128b9");
    const [errorMessage, setErrorMessage] = useState('');
    //const existingQuantity = 20;
    const token = localStorage.getItem("token")
    const { shop } = useAuth();

    useEffect(() => {
        setNewCategoryQuantity(category.quantity - parseInt(quantity));
        setNewProductQuantity(product.quantity - parseInt(quantity));
    }, [quantity]);

    const handleSell = async () => {
        setErrorMessage('');
        if (!quantity || !price || !customerId) {
            setErrorMessage('Please fill in all fields');
            setTimeout(() => {
                setErrorMessage('');
            }, 2000);
            return;
        }

        if (parseInt(quantity) > product.quantity) {
            setErrorMessage('Insufficient product');
            setTimeout(() => {
                setErrorMessage('');
            }, 2000);
            return;
        } else {
            try {
                const result = await axios.post("https://admin-panel-hub.onrender.com/api/history/create",
                    {
                        category_id: category._id,
                        quantity: quantity,
                        price: price,
                        new_category_quantity: newCategoryQuantity,
                        new_product_quantity: newProductQuantity,
                        shop_id: shop._id,
                        product_id: product._id,
                        customer_id: customerId,
                    },
                    {
                        headers: {
                            'x-access-token': token
                        }
                    })
                if (result.data.status === "ok") {
                    handleClose();
                    window.location.reload()
                    //navigate("/categoryInfo")
    
                }
                console.log(result.data)
            } catch (error) {
                console.log(error)
            }
        }
    };
    return (
        <Modal show={show} onHide={handleClose} className="custom-modal" >
            <Modal.Header closeButton>
                <Modal.Title>Sell Product</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ width: '400px', height: '300px' }}> <Form>
                <Form.Group controlId="quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Enter quantity"
                    />
                </Form.Group>

                <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter price"
                    />
                </Form.Group>

                <Form.Group controlId="customerId">
                    <Form.Label>Customer ID</Form.Label>
                    <Form.Control
                        type="text"
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                        placeholder="Enter customer ID"
                    />
                </Form.Group>
            </Form></Modal.Body>
            {errorMessage && (
                <Modal.Footer>
                    <div className="error-message" style={{ color: "red" }}>{errorMessage}</div>
                </Modal.Footer>
            )}
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSell}>
                    Sell
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SellCard