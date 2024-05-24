import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios'
import ProductCard from '../components/ProductCard';
import { useAuth } from '../components/AuthProvider';
import SellGraph from '../graphs/Graph';
import SellGraphOneMonth from '../graphs/SellGraphOneMonth';
import SellGraphOneWeek from '../graphs/SellGraphOneWeek';

const CategoryInfo = () => {
    const { id } = useParams();
    const token = localStorage.getItem("token")
    const [category, setCategory] = useState()
    const [products, setProducts] = useState()
    const [categoryHistory, setCategoryHistory] = useState()
    const [selectedPeriod, setSelectedPeriod] = useState('twoMonths');
    const { setShop } = useAuth();

    const handleChange = (e) => {
        setSelectedPeriod(e.target.value);
    };

    const getCategoryHistory = async () =>{
        try {
            const shopHistoty = await axios.get(`https://admin-panel-hub.onrender.com/api/history/byCategoryId/${id}`, {
                headers: {
                    'x-access-token': token
                }
            })
            //console.log(shopHistoty.data.categoryHistory)
            setCategoryHistory(shopHistoty.data.categoryHistory) 
        } catch (error) {
            console.log(error)
        }
    }

    const getCategoryInfo = async () => {
        try {
            const categoryInfo = await axios.get(`https://admin-panel-hub.onrender.com/api/category/${id}`, {
                headers: {
                    'x-access-token': token
                }
            })
            //console.log(categoryInfo.data)
            setCategory(categoryInfo.data.categoryInfo)
        } catch (error) {
            console.log(error)
        }  
    }

    const getProducts = async () => {
        try {
            const allProducts = await axios.get(`https://admin-panel-hub.onrender.com/api/product/getAll/${id}`, {
                headers: {
                    'x-access-token': token
                }
            })
            //console.log(allProducts.data)
            setProducts(allProducts.data.allProduct)
        } catch (error) {
            console.log(error)
        }
    }
    const getShop = async () => {
        try {
            const userShop = await axios.get("https://admin-panel-hub.onrender.com/api/shop/getShop", {
                headers: {
                    'x-access-token': token
                }
            })

            //console.log(userShop.data.shopInfo)
            //setShopInfo(userShop.data.shopInfo)
            setShop(userShop.data.shopInfo)
        } catch (error) {
            console.log(error)
        }
    }

    
    useEffect(() => {
        getCategoryInfo()
        getProducts()
        getShop()
        getCategoryHistory()
    }, [])

    //console.log(category)
    return (
        <div>
            {category ? <div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card" style={{ marginTop: "20px", height: "350px" }}>
                                <div className="image-container" style={{ height: '200px', position: 'relative' }}>
                                    <img src={category?.image} className="card-img-top" alt={category?.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover', position: 'absolute', top: '50%', transform: 'translateY(-50%)' }} />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{category?.name}</h5>
                                    <p className="card-text"><strong>Qauntity:</strong> {category?.quantity}</p>
                                    <p className="card-text"><strong>Max capacity:</strong> {category?.max_capacity}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                        <div className="card mb-3" style={{ marginTop: "20px", height: "350px" }}>
                                <div className="card-body">
                                    <select value={selectedPeriod} onChange={handleChange}>
                                        <option value="twoMonths">Last 2 months</option>
                                        <option value="oneMonth">Last 1 month</option>
                                        <option value="oneWeek">Last 1 week</option>
                                    </select>
                                    {selectedPeriod === 'twoMonths' && <SellGraph sellHistory={categoryHistory} />}
                                    {selectedPeriod === 'oneMonth' && <SellGraphOneMonth sellHistory={categoryHistory} />}
                                    {selectedPeriod === 'oneWeek' && <SellGraphOneWeek sellHistory={categoryHistory} />}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: "20px" }}>
                        <div className="col-12">
                            <div className="card mb-3" style={{backgroundColor: "#E1EBEE"}}>
                                <div style={{ margin: "20px" }}>
                                    <Link to={`/addProduct/${id}?maxCapacity=${category?.max_capacity}&quantity=${category?.quantity}`}>
                                        <button type="button" class="btn btn-primary">Add product</button>
                                    </Link>
                                </div>
                                <div className="row">
                                    {products?.map(product => (
                                        <div className="col-lg-4" key={product._id}>
                                            <ProductCard product={product} category={category}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <div className='App'>
                <h1>You don't have any shop. Create first</h1>
                <Link to="/createShop"><h4>Create</h4></Link>
            </div>}
        </div>
    )
}

export default CategoryInfo