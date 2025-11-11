import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './controllers/CartController';
import { AuthProvider } from './controllers/AuthController';
import Navbar from './views/components/Navbar';
import Footer from './views/components/Footer';
import Home from './views/pages/Home';
import Products from './views/pages/Products';
import ProductDetail from './views/pages/ProductDetail';
import Cart from './views/pages/Cart';
import Checkout from './views/pages/Checkout';
import Login from './views/pages/Login';
import Register from './views/pages/Register';
import Orders from './views/pages/Orders';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

