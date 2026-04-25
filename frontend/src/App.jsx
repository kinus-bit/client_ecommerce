// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductCatalog from './pages/ProductCatalog';
import ProductDescription from './pages/ProductDescription';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import WishlistProvider from './context/WishlistContext';
import ScrollToTop from '@/components/ScrollToTop';
import NextStagePage from './pages/NextStagePage';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ProtectedRoute from './utils/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/auth/ForgotPassword';
import VerifyEmail from './pages/auth/VerifyEmail';
import EmailVerifiedSuccess from './pages/auth/EmailVerifiedSuccess';
import ResetPassword from './pages/auth/ResetPassword';
import { ProfileForm } from './components/user';
import ProductCatalogtest from './pages/ProductCatalogtest';
import ProductDescriptiontest from './pages/ProductDescriptiontest';
import AdminRoutes from './routes/AdminRoutes';
import RoleDashboard from './pages/RoleDashboard';

function App() {
  return (
    
      <CartProvider>
        <WishlistProvider>
          <Router>
           
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
              <ScrollToTop/>
              <Navbar />
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/products" element={<ProductCatalog />} />
                  <Route path="/producttest" element={
                    <ProtectedRoute>
                      <ProductCatalogtest />
                    </ProtectedRoute>
                  } />
                  <Route path="/product/:id" element={<ProductDescription />} />
                  <Route path="/producttest/:id" element={
                    <ProtectedRoute>
                      <ProductDescriptiontest />
                    </ProtectedRoute>
                  } />
                  <Route path="/cart" element={
                    <ProtectedRoute>
                      <Cart/>
                    </ProtectedRoute>
                  } />
                  <Route path="/checkout" element={
                    <ProtectedRoute>
                      <Checkout/>
                    </ProtectedRoute>
                  } />
                  <Route path="/nextstage" element={<NextStagePage/>}/>
                  <Route path="/login" element={<Login/>} />
                  <Route path="/signup" element={<Signup/>} />
                  <Route path="/forgotpassword" element={<ForgotPassword/>} />
                  
                  <Route path="/verifyemail/" element={<VerifyEmail/>} />
                  <Route path="/verifyemail/:token" element={<VerifyEmail/>} />
                  <Route path="/verifysuccess" element={<EmailVerifiedSuccess/>} />
                  <Route path="/resetpassword/:token" element={<ResetPassword/>} />
                  <Route path="/dashboard/*" element={
                    <ProtectedRoute>
                      <RoleDashboard/>
                    </ProtectedRoute>
                  }/>

                </Routes>
              </AnimatePresence>
              <Footer/>
            </div>
            
          </Router>
        </WishlistProvider>
      </CartProvider>
  
  
  );
}

export default App;