import React from "react";
import { Routes, Route, useLocation} from "react-router-dom";
// import {Switch} from 'react-router';
import ProductDetails from "../pages/ProductDetails";
import ProductListing from "../pages/ProductListing";
import HomePage from "../pages/HomePage";
// import AdminPage from "../Admin/AdminPage";
// import AdminNavbar from "../Admin/AdminNavbar";
// import AddCoupon from "../Admin/AddCoupon";
// import Banner from "../Admin/Banner";
import Checkout from "../pages/Checkout";
import ViewCart from "../pages/ViewCart";
import Authentication from "../Authentication/Auth";
import OrderCorfirmed from "../pages/OrderConfirmed";
import PaymentFailed from "../pages/PaymentFailed";
import WishlistPage from "../pages/Wishlist";
import ProfilePage from "../pages/Myprofile";
// import OrderPage from "../pages/previousOrders";
import ProductPage from "../pages/Product";
import Coupon from "../pages/Coupons";
import Contact from "../pages/contact";



const withLocation = Component => props => {
  const location = useLocation();

  return <Component {...props} location={location} />;
};

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        
        
        <Route path="/" element={<HomePage/>} forceRefresh={true} />
        <Route path="/" element={<Contact />} onEnter = {()=>window.scrollTo(0,100)}/>
       
        
        <Route path="/:id" element={<ProductDetails />}/>
        <Route path="allproducts" element={<ProductListing />}/>
        
        
        {/* <Route path="/login" element={<Login />} />    */}
        {/* <Route
          path="/admin"
          element={<AdminPage />
          }
        /> */}
        <Route path="/viewcart" element={<Authentication><ViewCart /></Authentication>}
        />
        {/* <Route
          path="/couponAdd"
          element={<><AdminNavbar />
              <AddCoupon /></>}
        /> */}
        {/* <Route path="/banner" element={<Banner/>}/>   */}
        <Route path="/checkout" element={<Checkout/>}/>   
        <Route path="/confirmed" element={<OrderCorfirmed/>}/>    
        <Route path="/failed" element={<PaymentFailed/>}/>  
        <Route path="/showProfile" element={<ProfilePage/>} />
        <Route path="/showWishlist" element={<WishlistPage/>}/>
        {/* <Route path="/showPreviousOrder" element={<OrderPage/>}/> */}
        <Route path="/showProducts" element={<ProductPage/>}/>  
        <Route path="/showCoupon" element={<Coupon/>}/>

 
  
      </Routes>
    </div>
  );
};

export default withLocation(AllRoutes);
