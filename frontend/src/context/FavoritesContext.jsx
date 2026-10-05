import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const { user } = useAuth();

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadFavorites = async () => {
    if (!user) {
      setFavorites([]);
      return;
    }

    try {
      setLoading(true);

      const response = await api.get("/auth/favorites");

      setFavorites(response.data || []);
    } catch (error) {
      console.error("Failed to load favorites:", error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, [user]);

  const isFavorite = (productId) => {
    return favorites.some(
      (product) => product._id === productId
    );
  };

  const toggleFavorite = async (product) => {
    if (!user) {
      throw new Error("LOGIN_REQUIRED");
    }

    if (isFavorite(product._id)) {
      await api.delete(`/auth/favorites/${product._id}`);

      setFavorites((current) =>
        current.filter((item) => item._id !== product._id)
      );

      return false;
    }

    await api.post(`/auth/favorites/${product._id}`);

    setFavorites((current) => {
      const exists = current.some(
        (item) => item._id === product._id
      );

      if (exists) {
        return current;
      }

      return [...current, product];
    });

    return true;
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        loading,
        isFavorite,
        toggleFavorite,
        loadFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}