import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");

  const load = async () => {
    try {
      const response = await api.get(
        `/products?q=${encodeURIComponent(q)}&category=${encodeURIComponent(cat)}`
      );

      setProducts(response.data);
    } catch (error) {
      console.error("Failed to load products:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    load();
  }, [cat]);

  return (
    <div className="page">
      <div className="page-head">
        <span className="eyebrow">Marketplace</span>

        <h1>Everyday essentials for animal care.</h1>

        <p>
          Browse feed, care products and practical supplies. Availability is
          controlled by live admin inventory.
        </p>
      </div>

      <div className="toolbar">
        <input
          placeholder="Search products..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              load();
            }
          }}
        />

        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
        >
          <option value="">All categories</option>
          <option>Animal Feed</option>
          <option>Care & Grooming</option>
          <option>Accessories</option>
          <option>Farm Supplies</option>
        </select>

        <button className="btn primary" onClick={load}>
          Search
        </button>
      </div>

      <div className="grid products-grid">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}