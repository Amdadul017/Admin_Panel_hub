import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
//import { Button } from 'react-bootstrap';
import SellCard from './SellCard';
import EditProduct from './EditProduct';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios'

const DeleteModal = ({ showDelete, handleCloseDelete, category, product }) => {
    const token = localStorage.getItem("token")

    const submitdelete = async () => {
        const newCategoryQuantity = category.quantity - product.quantity;
        parseInt(newCategoryQuantity);
        console.log(token)
        console.log(newCategoryQuantity)
        try {
            const result = await axios.delete(`https://admin-panel-hub.onrender.com/api/product/delete/${product._id}`, {
                headers: {
                    'x-access-token': token
                },
                params: {
                    category_id: category._id,
                    new_category_quantity: newCategoryQuantity
                }
            });
            if (result.data.status === "ok") {
                handleCloseDelete();
                window.location.reload()
                //navigate("/categoryInfo")

            }
            console.log(result.data)
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <Modal show={showDelete} onHide={handleCloseDelete} className="custom-modal" >
            <Modal.Body style={{ width: '400px', height: '300px' }}>
                <h1>Do you really want to delete the product?</h1>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDelete}>
                    Close
                </Button>
                <button type="button" class="btn btn-danger" onClick={submitdelete}>
                    Yes, Delete
                </button>
            </Modal.Footer>
        </Modal>
    )
}

const ProductCard = ({ product, category }) => {
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };
    const handleOpenEditModal = () => {
        setShowEditModal(true);
    };
    const handleOpenDeleteModal = () => {
        setShowDeleteModal(true);
    };
    //console.log(category._id)

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };
    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };


    return (
        <div className="card mb-3" style={{ backgroundColor: "#6082B6", color: "white", margin: "20px", height: "330px" }}>
            <div className="image-container" style={{ height: '180px', position: 'relative' }}>
                <img src={product?.image} className="card-img-top" alt={product?.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover', position: 'absolute', top: '50%', transform: 'translateY(-50%)' }} />
            </div>            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text"><strong>Quantity:</strong> <span >{product.quantity}</span></p>
                <p className="card-text"><strong>Price:</strong> {product.price}</p>
                <p className="card-text"> {product.description}</p>
                <div style={{ display: "flex", gap: "10px" }}>
                    <button type="button" class="btn btn-outline-light" onClick={handleOpenModal}>Sell</button>
                    <button type="button" class="btn btn-outline-light" onClick={handleOpenEditModal}>Edit</button>
                    <button type="button" class="btn btn-danger" onClick={handleOpenDeleteModal}>Delete</button>
                    <DeleteModal showDelete={showDeleteModal} handleCloseDelete={handleCloseDeleteModal} category={category} product={product} />
                    <SellCard show={showModal} handleClose={handleCloseModal} category={category} product={product} />
                    <EditProduct showModal={showEditModal} handleCloseModal={handleCloseEditModal} product={product} category={category} />
                </div>
            </div>
        </div>
    )
}

export default ProductCard