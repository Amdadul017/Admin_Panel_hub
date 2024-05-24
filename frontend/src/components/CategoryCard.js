import React from 'react'
import { useNavigate, Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
    // console.log(category)
    const navigate = useNavigate();

    const thirtyPercentMaxCapacity = category.max_capacity * 0.3;
    const quantityClass = category.quantity <= thirtyPercentMaxCapacity ? 'text-danger' : 'text-success';

    return (
        <div className="card mb-3" style={{ backgroundColor: "#6082B6", color: "white", margin: "20px", height: "330px" }}>
            <div className="image-container" style={{ height: '180px', position: 'relative' }}>
                <img src={category?.image} className="card-img-top" alt={category?.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover', position: 'absolute', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
            <div className="card-body">
                <h5 className="card-title">{category.name}</h5>
                <p className="card-text"><strong>Quantity:</strong> <span className={`${quantityClass}`} style={{ backgroundColor: "white", width: "50px", padding: "2px 5px", borderRadius: "3px" }}>{category.quantity}</span></p>
                <p className="card-text"><strong>Max Capacity:</strong> {category.max_capacity}</p>
                <Link to={`/categoryInfo/${category?._id}`}><button type="button" class="btn btn-outline-light">Manage</button></Link>
            </div>
        </div>
    )
}

export default CategoryCard