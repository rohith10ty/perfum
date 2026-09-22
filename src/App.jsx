import { useEffect, useMemo, useState } from "react";

import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import BrandMarquee from "./components/sections/BrandMarquee";
import FeaturedPerfumes from "./components/sections/FeaturedPerfumes";
import Collections from "./components/sections/Collections";
import BestSellers from "./components/sections/BestSellers";
import FragranceExperience from "./components/sections/FragranceExperience";
import AboutBrand from "./components/sections/AboutBrand";
import OfferSection from "./components/sections/OfferSection";
import Testimonials from "./components/sections/Testimonials";
import Newsletter from "./components/sections/NewsLetter";
import Footer from "./components/layout/Footer";

import SearchOverlay from "./components/shop/SearchOverlay";
import QuickView from "./components/shop/QuickView";
import CartDrawer from "./components/shop/CartDrawer";

import useLenis from "./hooks/useLenis";

const readCart = () => {
  try {
    return JSON.parse(localStorage.getItem("perfum-cart") || "[]");
  } catch {
    return [];
  }
};

const readWishlist = () => {
  try {
    return JSON.parse(localStorage.getItem("perfum-wishlist") || "[]");
  } catch {
    return [];
  }
};

function App() {
  useLenis();

  const [cart, setCart] = useState(readCart);

  const [wishlist, setWishlist] = useState(readWishlist);

  const [searchOpen, setSearchOpen] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);

  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    localStorage.setItem("perfum-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("perfum-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...current,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    setCartOpen(true);
  };

  const toggleWishlist = (product) => {
    setWishlist((current) => {
      if (current.includes(product.id)) {
        return current.filter((id) => id !== product.id);
      }

      return [...current, product.id];
    });
  };

  const increaseQuantity = (id) => {
    setCart((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  const decreaseQuantity = (id) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (id) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  return (
    <main
      className="
        paper-background
        min-h-screen
        pt-[60px]
        sm:pt-[65px]
      "
    >
      <Navbar
        cartCount={cartCount}
        onSearch={() => setSearchOpen(true)}
        onCart={() => setCartOpen(true)}
      />

      <Hero />

      <BrandMarquee />

      <Collections />

      <FeaturedPerfumes
        onAddToCart={addToCart}
        onQuickView={setQuickViewProduct}
        onToggleWishlist={toggleWishlist}
        wishlist={wishlist}
      />

      <BestSellers onQuickView={setQuickViewProduct} />

      <FragranceExperience />

      <AboutBrand />

      <OfferSection />

      <Testimonials />

      <Newsletter />

      <Footer />

      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={setQuickViewProduct}
      />

      <QuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={addToCart}
      />

      <CartDrawer
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onRemove={removeFromCart}
      />
    </main>
  );
}

export default App;
