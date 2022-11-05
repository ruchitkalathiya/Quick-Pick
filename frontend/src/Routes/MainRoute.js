import React, { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Components/Login";
import Navbar from '../Components/partials/Navbar'
import Footer from "../Components/partials/Footer"
import SignUp from "../Components/SignUp";
import Home from "../Components/Home";
import AddProduct from "../Components/Shop/AddProduct";
import Shopproduct from "../Components/Shop/ShopProducts"
import DisplayProducts from "../Components/Customer/DisplayProducts";
import ShowProduct2 from "../Components/Customer/ShowProduct2"
import DisplayShops from "../Components/Customer/DisplayShops"
import DisplayCart from "../Components/Customer/DisplayCart"
import Cart_With_shop from "../Components/Customer/Cart_With_shop";
import DisplayCartProduct from "../Components/Customer/DisplayCartProduct";
import Logout from "../Components/Logout"
import { Box } from "@chakra-ui/react";
import ShopOrder from "../Components/Shop/ShopOrder";
import Order_History from "../Components/Customer/Order_History";
// import Alert from "../Components/partials/ShowToast"

export const userContext = createContext([])


// const New2 = () => {
//     Alert({
//         title: 'Account Created',
//         description: "You are registed successfully now you can loggin",
//         status: 'success',
//         variant: localStorage.getItem('chakra-ui-color-mode') === 'light' ? 'subtle' : 'solid',
//         position: 'bottom-right'
//     })
//     // return <Alert status={"this is my new status"}/>
// }
export const MainRoute = () => {
    const [isuser, setisuser] = useState('')
    return (
        <>
            <userContext.Provider value={{ isuser, setisuser }}>
                <Navbar />
                <Box minH={'50vh'}>
                    <Routes>
                        <Route exact path="/" element={<Home />}></Route>
                        <Route exact path="/addproduct" element={<AddProduct />}></Route>
                        <Route exact path="/shopproduct" element={<Shopproduct />}></Route>
                        <Route exact path="/product/:shopId/:productId" element={<ShowProduct2 />}></Route>
                        <Route exact path="/displayshops" element={<DisplayShops />}></Route>
                        <Route exact path="/cart" element={<Cart_With_shop />}></Route>
                        <Route exact path="/cartproducts/:shop_id" element={<DisplayCartProduct />}></Route>
                        <Route exact path="/shopproducts/:shop_id" element={<DisplayProducts />}></Route>
                        <Route exact path="/shoporders" element={<ShopOrder />}></Route>
                        <Route exact path="/shopproducts" element={<DisplayProducts />}></Route>
                        <Route exact path="/orders" element={<Order_History />}> </Route>
                        {/* <Route exact path="/temp" element={<Alert />}></Route>
                    <Route exact path="/temp2" element={<New2 />}></Route> */}

                        <Route exact path="/login" element={<Login />}></Route>
                        <Route exact path="/signup" element={<SignUp />}></Route>
                        <Route exact path='/logout' element={<Logout />}></Route>
                        {/* <Route exact path="/displayProducts" element={<DisplayProducts />}></Route> */}
                        {/* <Route exact path="/cart" element={<DisplayCart />}></Route> */}

                    </Routes>
                </Box>
                <Footer />
            </userContext.Provider>
        </>
    )
}
