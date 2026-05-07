import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import CartPanel from "./components/CartPanel.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import Candles from "./pages/Candles.jsx";
import Macrame from "./pages/Macrame.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Contact from "./pages/Contact.jsx";
import Cart from "./pages/Cart.jsx";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      {/* CartPanel renders on top of every page */}
      <CartPanel />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/candles" element={<Candles />} />
          <Route path="/macrame" element={<Macrame />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
