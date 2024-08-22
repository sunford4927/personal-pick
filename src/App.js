// npm i -s react-router-dom
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

import Home from './page/home/Home';
import Search from './page/search/Search';
import Mypage from './page/mypage/Mypage';
import Detailinfo from './page/detailinfo/Detailinfo';
import Login from './page/login/Login';
import Join from './page/join/Join';
import Order from './page/order/Order'
import Point from './page/backendtest/Point'
import BeforePayment from './page/beforepayment/BeforePayment';

import { useDispatch } from 'react-redux';
import Footer from './components/footerPage/FooterPage';


import './App.css'
import './index.scss'
import TotalRanking from './page/totalitem/TotalRanking';
import Subscription from './page/subscription/Subscription';
import { setMenuView } from './redux/type/typefunc';
import HeaderView from './components/header/HeaderView';
import SubscriptionManagement from './page/subscriptionmanagement/SubscriptionManagement';
import ShoppingCart from './page/shoppingcart/ShoppingCart';



function App() {
    const dispatch = useDispatch();
    function funcList(){
        dispatch(setMenuView(false))
    }
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div className="App" onClick={()=>funcList()}>
                <HeaderView/>
                <Routes>
                    {/*<Route path='/' element={<Loading/>}></Route>*/}
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/join' element={<Join />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/mypage' element={<Mypage />}></Route>
                    <Route path='/order' element={<Order />}></Route>
                    <Route path='/point' element={<Point />}></Route>
                    <Route path='/search/:value' element={<Search />}></Route>
                    <Route path='/search' element={<Search />}></Route>
                    <Route path='/totalitem/:category' element={<TotalRanking />}></Route>
                    <Route path='/detailinfo/:idx' element={<Detailinfo />}></Route>
                    <Route path='/beforepayment' element={<BeforePayment />}></Route>
                    <Route path='/subscription' element={<Subscription />}></Route>
                    <Route path='/subscriptionmanagement' element={<SubscriptionManagement />}></Route>
                    <Route path='/cartlist' element={<ShoppingCart />}></Route>
                </Routes>
                <Footer></Footer>
            </div>
        </BrowserRouter>
    );
}



export default App;
