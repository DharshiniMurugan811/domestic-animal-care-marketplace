import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  MessageCircle,
  Star,
  Heart,
} from "lucide-react";
import { useState } from "react";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";

export default function ProductCard({ product }) {
  const { add } = useCart();
  const { user, loading: authLoading } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();

  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);

  const price =
    product.price * (1 - product.discount / 100);

  const saved = isFavorite(product._id);

  const wa =
    import.meta.env.VITE_WHATSAPP_NUMBER ||
    "919876543210";

  const msg = encodeURIComponent(
    `Hi, I am interested in ${product.name}. Is it available?`
  );

  const handleFavorite = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setSaving(true);

      await toggleFavorite(product);
    } catch (error) {
      console.error("Wishlist error:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <article className="product-card">
      <div className="product-image">
        <Link to={`/products/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
          />
        </Link>

        {product.discount > 0 && (
          <span className="sale">
            -{product.discount}%
          </span>
        )}

        <button
          type="button"
          className={`heart ${saved ? "active" : ""}`}
          onClick={handleFavorite}
          disabled={authLoading || saving}
          aria-label={
            saved
              ? "Remove from wishlist"
              : "Save to wishlist"
          }
          title={
            saved
              ? "Remove from wishlist"
              : "Save to wishlist"
          }
        >
          <Heart
            size={19}
            fill={saved ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className="product-body">
        <span className="eyebrow">
          {product.category}
        </span>

        <Link to={`/products/${product._id}`}>
          <h3>{product.name}</h3>
        </Link>

        <div className="rating">
          <Star size={15} fill="currentColor" />
          {product.rating}
        </div>

        <div className="price">
          <strong>
            ₹{Math.round(price).toLocaleString("en-IN")}
          </strong>

          {product.discount > 0 && (
            <del>
              ₹{product.price.toLocaleString("en-IN")}
            </del>
          )}
        </div>

        <div className="stock-line">
          {product.stock <= 0 ? (
            <span className="out">
              Out of Stock
            </span>
          ) : product.stock <= 5 ? (
            <span className="low">
              Only {product.stock} left
            </span>
          ) : (
            <span className="in">
              In Stock
            </span>
          )}
        </div>

        <div className="product-actions">
          <button
            disabled={!product.stock}
            onClick={() => add(product)}
          >
            <ShoppingCart size={17} />
            Add to cart
          </button>

          <a
            className="wa"
            href={`https://wa.me/${wa}?text=${msg}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Ask about this product on WhatsApp"
          >
            <MessageCircle size={17} />
          </a>
        </div>
      </div>
    </article>
  );
}