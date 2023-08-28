import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Cart from './components/Cart';
import Catalog from './components/Catalog';
import Footer from './components/Footer';
import Header from './components/Header';
import Likes from './components/Likes';
import Object from './components/Object';
import Search from 'components/Search';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/likes" element={<Likes />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/:id" element={<Object />} />
        <Route path="/search/:value" element={<Search />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
