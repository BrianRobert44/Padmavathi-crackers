import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from "react";
import productData from "../components/productData";

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

export const CartProvider = ({ children }) => {
    // Load initial quantities from localStorage if available
    const [quantities, setQuantities] = useState(() => {
        try {
            const saved = localStorage.getItem("cart_quantities");
            return saved ? JSON.parse(saved) : {};
        } catch (e) {
            console.error("Error loading cart from storage:", e);
            return {};
        }
    });

    // Save to localStorage whenever quantities change
    useEffect(() => {
        localStorage.setItem("cart_quantities", JSON.stringify(quantities));
    }, [quantities]);

    const handleQtyChange = useCallback((id, value) => {
        const num = typeof value === "string" ? parseInt(value, 10) : value;
        const finalNum = isNaN(num) ? 0 : Math.max(0, num);
        setQuantities(prev => ({ ...prev, [id]: finalNum }));
    }, []);

    const handleRemoveItem = useCallback((id) => {
        setQuantities(prev => ({ ...prev, [id]: 0 }));
    }, []);

    const clearCart = useCallback(() => {
        setQuantities({});
    }, []);

    // Memoize cart items and totals
    const cartItems = useMemo(() => {
        const items = [];
        productData.forEach(cat => {
            cat.products.forEach(p => {
                const qty = quantities[p.id] || 0;
                if (qty > 0) {
                    items.push({
                        ...p,
                        quantity: qty,
                        amount: qty * p.price
                    });
                }
            });
        });
        return items;
    }, [quantities]);

    const { totalQty, grandTotal } = useMemo(() => {
        return cartItems.reduce((acc, item) => ({
            totalQty: acc.totalQty + item.quantity,
            grandTotal: acc.grandTotal + item.amount
        }), { totalQty: 0, grandTotal: 0 });
    }, [cartItems]);

    const value = {
        quantities,
        cartItems,
        totalQty,
        grandTotal,
        handleQtyChange,
        handleRemoveItem,
        clearCart
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
