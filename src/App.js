import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Filters from "./components/Filters";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = useMemo(() => {
    let updatedProducts = [...products];

    if (selectedCategories.length > 0) {
      updatedProducts = updatedProducts.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    if (searchTerm.trim() !== "") {
      updatedProducts = updatedProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === "lowToHigh") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    return updatedProducts;
  }, [products, selectedCategories, searchTerm, sortOrder]);

  return (
    <>
      <Header />

      <div className="app-layout">
        <aside className="sidebar">
          <Filters
            selectedCategories={selectedCategories}
            onChange={handleCategoryChange}
          />
        </aside>

        <main className="main-content">
          <h1 className="page-title">Product Listing</h1>

          <div className="top-controls">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="sort-select"
            >
              <option value="default">Sort By</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>

          {loading ? (
            <p className="status-text">Loading products...</p>
          ) : filteredProducts.length > 0 ? (
            <div className="grid">
              {filteredProducts.map((product) => (
                <div className="card" key={product.id}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="card-image"
                  />
                  <h3 className="card-title">
                    {product.title.length > 40
                      ? product.title.substring(0, 40) + "..."
                      : product.title}
                  </h3>
                  <p className="card-price">${product.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="status-text">No products found.</p>
          )}
        </main>
      </div>
    </>
  );
}

export default App;