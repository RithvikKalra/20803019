import React, { useState, useEffect } from 'react';
import './App.css';

const ProductCard = ({ product }) => (
  <div className="product-card">
    <img src={product.image} alt={product.name} />
    <h3>{product.name}</h3>
    <p>Price: ${product.price}</p>
    <p>Company: {product.company}</p>
  </div>
);

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch('https://api.company1.com/products'),
          fetch('https://api.company2.com/products'),
          fetch('https://api.company3.com/products'),
          fetch('https://api.company4.com/products'),
          fetch('https://api.company5.com/products'),
        ]);
        const data = await Promise.all(responses.map(res => res.json()));
        const combinedProducts = data.reduce((acc, curr) => acc.concat(curr), []);
        const sortedProducts = combinedProducts.sort((a, b) => b.sales - a.sales);
        setProducts(sortedProducts.slice(0, 10));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <h1>Top Products</h1>
      <div className="product-list">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default App;
