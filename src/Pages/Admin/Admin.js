import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProduct from "../../Component/Admin/addProduct/AddProduct";
import Home from "../../Component/Admin/Home/Home"
import Navbar from "../../Component/Admin/Navbar/Navbar";
import OrderDetails from "../../Component/Admin/OrderDetails/OrderDetails"
import Orders from "../../Component/Admin/Order/Order";
import ViewProducts from "../../Component/Admin/ViewProduct/ViewProduct";

import styles from "./Admin.module.scss";

const Admin = () => {
    return (
        <div className={styles.admin}>
            <div className={styles.navbar}>
                <Navbar />
            </div>
            <div className={styles.content}>
                <Routes>
                    <Route path="home" element={<Home />} />
                    <Route path="all-products" element={<ViewProducts />} />
                    <Route path="add-product/:id" element={<AddProduct />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="order-details/:id" element={<OrderDetails />} />
                </Routes>
            </div>
        </div>
    );
};

export default Admin;