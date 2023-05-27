import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Cart, Products, Navbar, Checkout } from './components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  const [products, setProducts] = useState();
  const [cart, setCart] = useState();

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    const data = await commerce.cart.retrieve();

    setCart(data);
  };

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    console.log(cart);
    setCart(cart);
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });

    setCart(cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  if (!products || !cart) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Navbar totalItems={cart.total_items} />
      <Routes>
        <Route exact path="/" element={<Products products={products} onAddToCart={handleAddToCart} />} />

        <Route
          exact
          path="/cart"
          element={
            <Cart cart={cart} handleUpdateQuantity={handleUpdateQuantity} handleRemoveFromCart={handleRemoveFromCart} handleEmptyCart={handleEmptyCart} />
          }
        />
        <Route exact path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
};

export default App;