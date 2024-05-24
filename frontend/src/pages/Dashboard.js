import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import axios from 'axios'
import SellGraph from '../graphs/Graph';
import CategoryCard from '../components/CategoryCard';
import SellGraphOneMonth from '../graphs/SellGraphOneMonth';
import SellGraphOneWeek from '../graphs/SellGraphOneWeek';

const Dashboard = () => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate();
    const [shopInfo, setShopInfo] = useState()
    const { user, setShop, shop } = useAuth();
    const [categories, setAllCategories] = useState()
    const [allHistory, setAllHistory] = useState()
    //console.log(shop)
    const [selectedPeriod, setSelectedPeriod] = useState('twoMonths');

    const handleChange = (e) => {
        setSelectedPeriod(e.target.value);
    };
    const getShop = async () => {
        try {
            const userShop = await axios.get("https://admin-panel-hub.onrender.com/api/shop/getShop", {
                headers: {
                    'x-access-token': token
                }
            })

            //console.log(userShop.data.shopInfo)
            setShopInfo(userShop.data.shopInfo)
            setShop(userShop.data.shopInfo)
        } catch (error) {
            console.log(error)
        }
    }
    const getAllCategory = async () => {
        try {
            const categories = await axios.get(`https://admin-panel-hub.onrender.com/api/category/getAll/${shop?._id}`, {
                headers: {
                    'x-access-token': token
                }
            })
            //console.log(categories.data.allCategory)
            setAllCategories(categories.data.allCategory)
        } catch (error) {
            console.log(error)
        }
    }
    const getShopHistory = async () => {
        try {
            const shopHistoty = await axios.get(`https://admin-panel-hub.onrender.com/api/history/byShopId/${shop?._id}`, {
                headers: {
                    'x-access-token': token
                }
            })
            console.log(shopHistoty.data.shopHistory)
            setAllHistory(shopHistoty.data.shopHistory)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
        getShop()

        //getAllCategory()
    }, [])

    useEffect(() => {
        getAllCategory()
        getShopHistory()
    }, [shop])

    console.log(allHistory)
    return (
        <div>
            {shop ? <div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card" style={{ marginTop: "20px", height: "350px" }}>
                                <div className="image-container" style={{ height: '200px', position: 'relative' }}>
                                    <img src={shop?.image} className="card-img-top" alt={shop?.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover', position: 'absolute', top: '50%', transform: 'translateY(-50%)' }} />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{shop?.name}</h5>
                                    <p className="card-text"><strong>Location:</strong> {shop?.location}</p>
                                    <p className="card-text"><strong>Description:</strong> {shop?.description}</p>
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
                                    {selectedPeriod === 'twoMonths' && <SellGraph sellHistory={allHistory} />}
                                    {selectedPeriod === 'oneMonth' && <SellGraphOneMonth sellHistory={allHistory} />}
                                    {selectedPeriod === 'oneWeek' && <SellGraphOneWeek sellHistory={allHistory} />}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Second row with a single column */}
                    <div className="row" style={{ marginTop: "20px" }}>
                        <div className="col-12" >
                            <div className="card mb-3" style={{backgroundColor: "#E1EBEE"}}>
                                <div style={{ margin: "20px" }}>
                                    <Link to="/createCategory"><button type="button" class="btn btn-primary">Create Category</button></Link>
                                </div>
                                <div className="row">
                                    {categories?.map(category => (
                                        <div className="col-lg-4" key={category._id}>
                                            <CategoryCard category={category} />
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

    );
}

export default Dashboard