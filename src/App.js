import './App.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header, Footer } from './Component/';
import { Home, Contact, Login, Register, Reset, Admin, Cart, CheckoutDetails } from './Pages/';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminOnlyRoute from './Component/adminOnlyRoute/AdminOnlyRoute';
import ProductDetail from './Component/Product/ProductDetail/ProductDetail';
import Checkout from './Pages/checkout/Checkout';
import CheckoutSuccess from './Pages/checkout/CheckoutSuccess';
import OrderHistory from './Pages/orderHistory/OrderHistory';
import OrderDetails from './Pages/orderDetails/OrderDetails';
import ReviewProducts from './Component/reviewProduct/ReviewProduct';
import Homme from "./Component/Admin/Home/Home"
import NotFound from './Pages/notFound/NotFound';


function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/product-details/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-details" element={<CheckoutDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />
          <Route path="/review-product/:id" element={<ReviewProducts />} />
          <Route path="/admin/*" element={<AdminOnlyRoute><Admin /></AdminOnlyRoute>} />
          <Route path="home" element={<Homme />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
