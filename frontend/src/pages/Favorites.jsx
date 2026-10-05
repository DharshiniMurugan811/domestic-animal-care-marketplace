import { Heart } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useFavorites } from "../context/FavoritesContext";

export default function Favorites() {
  const { favorites, loading } = useFavorites();

  if (loading) {
    return (
      <div className="page-loader">
        Loading your wishlist...
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-head compact">
        <span className="eyebrow">Saved</span>

        <h1>My Wishlist</h1>

        <p>
          Products you save will appear here for quick
          access later.
        </p>
      </div>

      {favorites.length > 0 ? (
        <div className="grid products-grid">
          {favorites.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <Heart size={46} />

          <h2>No saved products yet</h2>

          <p>
            Open the Marketplace and click the ❤️ button
            on a product to save it here.
          </p>
        </div>
      )}
    </div>
  );
}