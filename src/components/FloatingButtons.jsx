import { useLocation } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import ShopNowButton from "./ShopNowButton"; 
import FloatingWhatsApp from "./FloatingWhatsApp";

const FloatingButtons = () => {
  const location = useLocation();
  const isProductPage = location.pathname === "/home";

  return (
    <>
      <ScrollToTop />
      {!isProductPage && <ShopNowButton />}
      {!isProductPage && <FloatingWhatsApp />}
    </>
  );
};

export default FloatingButtons;
