import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  useMediaQuery,
  useTheme,
  Breadcrumbs,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Alert,
  Badge,
  Fade,
  CircularProgress,
  alpha,
  Tooltip
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { colors } from "../colors";
import bannerImage from "../assets/banner/quickOrder.jpg";
import mainVideo from "../assets/logo/0303.mp4";
import BrandsLogo from "../components/BrandsLogo";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { collection, getDocs, query, orderBy, addDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import localProductData from "../components/productData";

// --- Memoized Sub-components for Performance ---

const CategoryHeader = React.memo(({ category, discount }) => (
  <TableRow sx={{ bgcolor: colors.primaryRed, position: "sticky", top: 0, zIndex: 110 }}>
    <TableCell
      colSpan={6}
      sx={{
        color: colors.white,
        fontWeight: "800",
        py: { xs: 1.2, sm: 1.5 },
        fontSize: { xs: "1rem", sm: "1.1rem" },
        textAlign: "center",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        border: `1px solid ${colors.darkRed}`,
      }}
    >
      {category}
      {discount > 0 && (
        <Box component="span" sx={{ color: colors.warningYellow, ml: 1.5, fontSize: '0.8em', border: `1px solid ${colors.warningYellow}`, px: 1, borderRadius: 1 }}>
          FLAT {discount}% OFF
        </Box>
      )}
    </TableCell>
  </TableRow>
));const MobileCategoryHeader = React.memo(({ category, discount }) => (
  <TableRow sx={{ bgcolor: colors.primaryRed }}>
    <TableCell colSpan={5} sx={{ py: 1, px: 1.5, color: "white", fontWeight: "bold", textAlign: "left", border: "none" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography sx={{ fontWeight: "800", fontSize: "0.9rem", textTransform: "uppercase" }}>
          {category}
        </Typography>
        {discount > 0 && (
          <Box sx={{ bgcolor: "#fde047", color: "black", px: 1, borderRadius: 0.5, fontSize: "0.7rem", fontWeight: "900" }}>
            {discount}% OFF
          </Box>
        )}
      </Box>
    </TableCell>
  </TableRow>
));

const MobileProductRow = React.memo(({ product, qty, onQtyChange, onPreview, index }) => {
  const amount = qty * product.price;

  return (
    <TableRow
      sx={{
        bgcolor: index % 2 !== 0 ? "#fffcf5" : "white",
        "& .MuiTableCell-root": {
          px: 0.5,
          py: 1,
          border: `1px solid ${colors.gray70}`,
          verticalAlign: "middle"
        }
      }}
    >
      {/* 1. Image */}
      <TableCell align="center" sx={{ width: "15%" }}>
        <Box
          component="img"
          src={product.image}
          alt={product.name}
          sx={{
            width: 45,
            height: 45,
            objectFit: "contain",
            borderRadius: 1,
            bgcolor: "white"
          }}
          onClick={() => onPreview(product)}
        />
      </TableCell>

      {/* 2. Name & Info */}
      <TableCell sx={{ width: "35%", textAlign: "left" }}>
        <Box
          fontWeight="800"
          sx={{ fontSize: "0.75rem", lineHeight: 1.2, mb: 0.3, color: colors.darkGray2 }}
          dangerouslySetInnerHTML={{ __html: product.name }}
        />
        {product.count && (
          <Box
            sx={{ color: "#880e4f", fontSize: "0.65rem", fontWeight: 500 }}
          >
            {product.count}
          </Box>
        )}
      </TableCell>

      {/* 3. Price */}
      <TableCell align="center" sx={{ width: "20%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {product.netRate && product.netRate > product.price && (
            <Typography sx={{ textDecoration: "line-through", color: colors.primaryRed, fontSize: "0.7rem", lineHeight: 1 }}>
              ₹{product.netRate}
            </Typography>
          )}
          <Typography sx={{ color: colors.deepGreen, fontWeight: "900", fontSize: "0.9rem" }}>
            ₹{product.price}
          </Typography>
        </Box>
      </TableCell>

      {/* 4. Qty Input */}
      <TableCell align="center" sx={{ width: "15%" }}>
        <TextField
          size="small"
          type="number"
          value={qty || ""}
          onChange={(e) => onQtyChange(product.id, e.target.value)}
          inputProps={{
            style: { textAlign: "center", fontSize: "0.9rem", padding: "4px 0", fontWeight: "900" }
          }}
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              borderRadius: 0,
              bgcolor: "white",
              "& fieldset": { borderColor: colors.gray70 }
            }
          }}
        />
      </TableCell>

      {/* 5. Total */}
      <TableCell align="center" sx={{ width: "15%" }}>
        <Typography fontWeight="900" sx={{ color: "black", fontSize: "0.85rem" }}>
          ₹{amount}
        </Typography>
      </TableCell>
    </TableRow>
  );
});const ProductRow = React.memo(({ product, index, qty, onQtyChange, onPreview }) => {
  const amount = qty * product.price;

  return (
    <TableRow
      hover
      sx={{
        bgcolor: index % 2 !== 0 ? "#fffcf5" : "white",
        "&:hover": { bgcolor: "#fde04722" }
      }}
    >
      <TableCell
        sx={{
          p: 1.2,
          fontSize: "0.95rem",
          textAlign: "center",
          border: `1px solid ${colors.gray70}`,
          color: colors.gray50,
          fontWeight: 700
        }}
      >
        {index + 1}
      </TableCell>

      <TableCell sx={{ p: 1, border: `1px solid ${colors.gray70}`, textAlign: "center" }}>
        <Box
          component="img"
          src={product.image}
          alt={product.name}
          sx={{
            width: 70,
            height: 70,
            objectFit: "contain",
            borderRadius: 2,
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            border: `1px solid ${colors.gray70}`,
            "&:hover": { transform: "scale(1.3)", zIndex: 10, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" },
          }}
          onClick={() => onPreview(product)}
        />
      </TableCell>

      <TableCell
        sx={{
          p: 1.5,
          fontSize: "0.95rem",
          border: `1px solid ${colors.gray70}`,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Box
            dangerouslySetInnerHTML={{ __html: product.name }}
            sx={{ lineHeight: 1.2, fontWeight: 800, color: colors.darkGray2 }}
          />
          {product.count && (
            <Typography
              variant="caption"
              sx={{
                color: "#880e4f",
                fontWeight: 700,
                bgcolor: "#fce4ec",
                px: 1,
                borderRadius: 0.5,
                width: "fit-content"
              }}
            >
              {product.count}
            </Typography>
          )}
        </Box>
      </TableCell>

      <TableCell align="right" sx={{ p: 1.5, border: `1px solid ${colors.gray70}` }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          {product.netRate && product.netRate > product.price && (
            <Typography
              variant="caption"
              sx={{
                textDecoration: "line-through",
                color: colors.primaryRed,
                fontSize: "0.8rem",
                opacity: 0.6
              }}
            >
              ₹{product.netRate}
            </Typography>
          )}
          <Typography
            color={colors.deepGreen}
            fontWeight="900"
            fontSize="1.15rem"
          >
            ₹{product.price}
          </Typography>
        </Box>
      </TableCell>

      <TableCell align="center" sx={{ p: 1.5, border: `1px solid ${colors.gray70}` }}>
        <TextField
          size="small"
          type="number"
          value={qty}
          onChange={(e) => onQtyChange(product.id, e.target.value)}
          inputProps={{
            min: 0,
            style: {
              textAlign: "center",
              width: 100,
              fontSize: "1.3rem",
              fontWeight: "900"
            },
          }}
          sx={{
            width: 120,
            "& .MuiOutlinedInput-root": {
              borderRadius: 1,
              "& fieldset": { borderColor: colors.gray60 },
              "&:hover fieldset": { borderColor: colors.primaryRed },
            },
          }}
        />
      </TableCell>

      <TableCell
        align="center"
        sx={{
          fontWeight: 900,
          p: 1.5,
          fontSize: "1.2rem",
          color: colors.black,
          border: `1px solid ${colors.gray70}`,
          bgcolor: alpha(colors.lightBlueGray, 0.4)
        }}
      >
        ₹{amount.toLocaleString()}
      </TableCell>
    </TableRow>
  );
});

// --- Main Page Component ---

export default function QuickOrderPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const [productData, setProductData] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [connectionNotice, setConnectionNotice] = useState(null);

  const [quantities, setQuantities] = useState({});

  const handleQtyChange = useCallback((id, value) => {
    const num = typeof value === "string" ? parseInt(value, 10) : value;
    const finalNum = isNaN(num) ? 0 : Math.max(0, num);
    setQuantities((prev) => ({ ...prev, [id]: finalNum }));
  }, []);

  const handleRemoveItem = useCallback((id) => {
    setQuantities((prev) => ({ ...prev, [id]: 0 }));
  }, []);
  const [state, setState] = useState("TamilNadu");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Client information state
  const [clientInfo, setClientInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Validation errors state
  const [errors, setErrors] = useState({});

  // Scroll effect and fetch products
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);

    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        setLoadError(null);
        let items = [];

        try {
          // Try ordered query first - now using orderIndex
          const q = query(collection(db, "crackers"), orderBy("orderIndex"));
          const querySnapshot = await getDocs(q);
          items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          console.log(`Fetched ${items.length} items from Firestore (ordered by orderIndex).`);
        } catch (orderErr) {
          // Fallback: fetch without ordering if index not created
          console.warn("Ordered fetch failed, falling back to simple fetch:", orderErr.message);
          try {
            const querySnapshot = await getDocs(collection(db, "crackers"));
            items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log(`Fetched ${items.length} items from Firestore (fallback).`);
            // Sort client-side
            items.sort((a, b) => (a.category || "").localeCompare(b.category || ""));
          } catch (fallbackErr) {
            console.error("Firestore fetch entirely failed:", fallbackErr);
            throw fallbackErr; // Bubble up to outer catch for local fallback
          }
        }

        if (items.length === 0) {
          console.warn("Firestore collection 'crackers' is empty. Using local data fallback.");
          loadLocalFallback();
          return;
        }

        // Map old Firebase category names → new display names
        const getDisplayCategory = (item) => {
          const cat = item.category || 'Other';
          const name = (item.name || '').toLowerCase();
          if (cat === "Ground Chacker Embossed") {
            if (name.includes('spinner') || name.includes('4x4')) return "SPINNER CHAKKAR'S";
            return "GROUND CHAKKAR'S";
          }
          if (cat === "Shots") {
            if (name.includes('whizzl') || name.includes('wizzl')) return "WHIZZLING SERIES";
            return "SPEED SERIES";
          }
          const nameMap = {
            "Single Shot Crackers":    "SOUND CRACKERS",
            "Continue Sound Crackers": "SOUND CRACKERS",
            "Flower Pots Embossed":    "FLOWER POTS",
            "Pencil Novaties":         "PENCIL",
            "Twinkling Star":          "TWINKLING STAR",
            "Rocket Bomb":             "ROCKET",
            "Bomb of Bomb":            "BOMB",
            "Paper Bomb":              "PAPER BOMB",
            "Night Aerial Attraction": "MEGA AERIAL SERIES",
            "Night Fountain":          "MEGA FOUNTAIN",
            "Novelty Fancies":         "MEGA FOUNTAIN",
            "Sparklers":               "SPARKLERS",
            "M M Gift Box":            "GIFT BOXES",
          };
          return nameMap[cat] || cat;
        };

        // Hardcoded sort order
        const categoryOrder = {
          "SOUND CRACKERS": 0, "FLOWER POTS": 1, "GROUND CHAKKAR'S": 2,
          "SPINNER CHAKKAR'S": 3, "PENCIL": 4, "TWINKLING STAR": 5,
          "BIJILI": 6,
          "ROCKET": 7, "BOMB": 8, "PAPER BOMB": 9,
          "GIANT CRACKERS": 10, "GARLAND CRACKERS": 11,
          "MEGA AERIAL SERIES": 12, "WHIZZLING SERIES": 13, "SPEED SERIES": 14,
          "KID'S SPECIAL": 15, "90'S KIDS SPECIAL": 16,
          "MEGA FOUNTAIN": 17, "COLOUR CRACKLING FOUNTAIN": 18,
          "SETOUT": 19, "COLOUR MATCHES": 20, "SPARKLERS": 21, "GIFT BOXES": 22,
          // Old Firebase names fallback
          "Single Shot Crackers": 0, "Continue Sound Crackers": 0,
          "Flower Pots Embossed": 1, "Ground Chacker Embossed": 2,
          "Pencil Novaties": 4, "Twinkling Star": 5,
          "Rocket Bomb": 7, "Bomb of Bomb": 8, "Paper Bomb": 9,
          "Night Aerial Attraction": 12, "Shots": 14,
          "Night Fountain": 17, "Novelty Fancies": 17,
          "Sparklers": 21, "M M Gift Box": 22,
        };

        // Group by DISPLAY category
        const grouped = items.reduce((acc, current) => {
          const cat = getDisplayCategory(current);
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(current);
          return acc;
        }, {});

        const formattedData = Object.keys(grouped)
          .map(category => ({ 
            category, 
            products: grouped[category].sort((a, b) => {
              // Primary sort: orderIndex from DB
              if (a.orderIndex !== undefined && b.orderIndex !== undefined) {
                if (a.orderIndex !== b.orderIndex) return a.orderIndex - b.orderIndex;
              }
              // Secondary sort: alphabetical
              return (a.name || "").localeCompare(b.name || "");
            }) 
          }))
          .sort((a, b) => {
            // Sort categories by the minimum orderIndex found in their products
            const minOrderA = Math.min(...a.products.map(p => p.orderIndex ?? 999999));
            const minOrderB = Math.min(...b.products.map(p => p.orderIndex ?? 999999));
            if (minOrderA !== minOrderB) return minOrderA - minOrderB;
            
            const orderA = categoryOrder[a.category] ?? 9999;
            const orderB = categoryOrder[b.category] ?? 9999;
            return orderA - orderB;
          });

        setProductData(formattedData);
        setLoadingProducts(false);
        setLoadError(null);
        setConnectionNotice(null);
      } catch (err) {
        console.error("Error fetching products from Firestore:", err);
        const errorMessage = err.code === "permission-denied"
          ? "Permission Denied: Firestore rules are blocking access."
          : err.message || "Failed to connect to database.";

        console.warn(`Redirecting to local fallback data due to: ${errorMessage}`);
        loadLocalFallback(errorMessage);
      }
    };

    const loadLocalFallback = (reason = "") => {
      console.log("Loading local fallback data...");
      setProductData(localProductData);
      setLoadingProducts(false);
      if (reason) {
        // We show a note that we are in offline/local mode, but NOT as a fatal error
        setConnectionNotice(`Using Local Catalog. (Firestore Offline: ${reason})`);
      }
    };

    fetchProducts();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Removed local handlers, now using global ones from useCart

  // Handle client info changes
  const handleClientInfoChange = useCallback((field) => (event) => {
    setClientInfo((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
    setErrors((prev) => {
      if (prev[field]) {
        const next = { ...prev };
        delete next[field];
        return next;
      }
      return prev;
    });
  }, []);

  // Validate client information
  const validateClientInfo = () => {
    const newErrors = {};

    if (!clientInfo.name.trim()) {
      newErrors.name = "Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!clientInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(clientInfo.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!clientInfo.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(clientInfo.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit Indian phone number";
    }

    if (!clientInfo.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Memoized Filtered Products - prevents hang on keystrokes
  const filteredProducts = useMemo(() => {
    return productData
      .map((cat) => ({
        ...cat,
        products: cat.products.filter((p) => {
          const matchesSearch = p.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const matchesCat =
            selectedCategory === "all" || cat.category === selectedCategory;
          return matchesSearch && matchesCat;
        }),
      }))
      .filter((cat) => cat.products.length > 0);
  }, [productData, searchTerm, selectedCategory]);

  // Memoized Order Items - prevents unnecessary calculations
  const orderItems = useMemo(() => {
    const items = [];
    productData.forEach((cat) => {
      cat.products.forEach((p) => {
        const qty = quantities[p.id] || 0;
        if (qty > 0) {
          items.push({
            ...p,
            quantity: qty,
            amount: qty * p.price,
          });
        }
      });
    });
    return items;
  }, [productData, quantities]);

  // Combined totals calculation
  const { totalQty, grandTotal } = useMemo(() => {
    return orderItems.reduce(
      (acc, item) => ({
        totalQty: acc.totalQty + item.quantity,
        grandTotal: acc.grandTotal + item.amount,
      }),
      { totalQty: 0, grandTotal: 0 }
    );
  }, [orderItems]);

  const discount = 0; // You can calculate actual discount based on your logic
  const overallTotal = grandTotal - discount;
  const minOrder = state === "TamilNadu" ? 3000 : 5000;
  const canSubmit = grandTotal >= minOrder && grandTotal > 0;

  const handleOpenDialog = () => {
    if (canSubmit) {
      setCartOpen(false);
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setClientInfo({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    setErrors({});
  };

  const generatePDF = () => {
    if (!validateClientInfo()) {
      return;
    }

    const doc = new jsPDF();

    // Company Header
    doc.setFontSize(20);
    doc.setTextColor(220, 18, 18);
    doc.text("Sri Padmavathi CRACKERS", 105, 15, { align: "center" });

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Order Invoice", 105, 25, { align: "center" });

    // Client Information Section
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Client Details:", 20, 40);

    doc.setFontSize(10);
    doc.text(`Name: ${clientInfo.name}`, 20, 48);
    doc.text(`Email: ${clientInfo.email}`, 20, 56);
    doc.text(`Phone: ${clientInfo.phone}`, 20, 64);

    const addressLines = doc.splitTextToSize(
      `Address: ${clientInfo.address}`,
      170,
    );
    doc.text(addressLines, 20, 72);

    // Order Details
    doc.setFontSize(12);
    doc.text("Order Details:", 20, 92);

    doc.setFontSize(10);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 100);
    doc.text(
      `State: ${state === "TamilNadu" ? "TamilNadu & PY" : "Other States"}`,
      20,
      108,
    );

    const tableColumn = ["Product", "Qty", "Price", "Amount"];
    const tableRows = orderItems.map((item) => [
      item.name.replace(/<br>/g, " "),
      item.quantity,
      `₹${item.price}`,
      `₹${item.amount}`,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 115,
      theme: "grid",
      headStyles: { fillColor: [220, 18, 18], textColor: 255 },
      styles: { fontSize: 10, cellPadding: 3 },
    });

    const finalY = doc.lastAutoTable?.finalY || 115;

    // Summary
    doc.setFontSize(12);
    doc.text(`Total Products: ${totalQty}`, 20, finalY + 15);
    doc.text(`Discount: ₹${discount}`, 20, finalY + 23);
    doc.text(`Grand Total: ₹${grandTotal}`, 150, finalY + 15, {
      align: "right",
    });
    doc.text(`Minimum Order: ₹${minOrder}`, 150, finalY + 23, {
      align: "right",
    });

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text("Thank you for choosing Sri Padmavathi CRACKERS!", 105, finalY + 35, {
      align: "center",
    });
    doc.text("For any queries, contact: +91 96551 21440", 105, finalY + 42, {
      align: "center",
    });

    doc.save(
      `Sri_Padmavathi_CRACKERS_Invoice_${clientInfo.name.replace(/\s+/g, "_")}.pdf`,
    );
  };

  const handleSendWhatsApp = async () => {
    if (!validateClientInfo()) {
      return;
    }

    const items = orderItems;

    // Create order object for Firestore
    const orderData = {
      clientInfo: {
        name: clientInfo.name,
        email: clientInfo.email,
        phone: clientInfo.phone,
        address: clientInfo.address,
      },
      items: items.map(item => ({
        name: item.name.replace(/<br>/g, " "),
        quantity: item.quantity,
        price: item.price,
        amount: item.amount,
      })),
      totalQty,
      grandTotal,
      discount,
      overallTotal,
      state: state === "TamilNadu" ? "TamilNadu & PY" : "Other States",
      status: "pending", // Default status
      createdAt: new Date(),
    };

    try {
      // Save to Firestore
      await addDoc(collection(db, "orders"), orderData);
      console.log("Order saved to Firestore successfully");
    } catch (error) {
      console.error("Error saving order to Firestore:", error);
      // We still proceed to WhatsApp even if Firestore fails, to not block the user
    }

    let message = "*Sri Padmavathi CRACKERS - Order Invoice*\n\n";

    // Client Details
    message += "*CLIENT DETAILS*\n";
    message += `Name: ${clientInfo.name}\n`;
    message += `Email: ${clientInfo.email}\n`;
    message += `Phone: ${clientInfo.phone}\n`;
    message += `Address: ${clientInfo.address}\n\n`;

    // Order Details
    message += "*ORDER DETAILS*\n";
    message += `Date: ${new Date().toLocaleDateString()}\n`;
    message += `State: ${state === "TamilNadu" ? "TamilNadu & PY" : "Other States"}\n`;
    message += `Total Products: ${totalQty}\n`;
    message += `Discount: ₹${discount}\n`;
    message += `Overall Total: ₹${overallTotal}\n\n`;

    // Order Items
    message += "*ITEMS*\n";
    items.forEach((item) => {
      message += `${item.name.replace(/<br>/g, " ")} - ${item.quantity} × ₹${item.price} = ₹${item.amount}\n`;
    });

    message += `\n*Grand Total: ₹${grandTotal}*\n`;
    message += `*Minimum Order: ₹${minOrder}*\n\n`;
    message += "Thank you for choosing Sri Padmavathi CRACKERS!";

    const waNumber = "919655121440";
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    handleCloseDialog();
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
  };

  return (
    <Box sx={{ width: "100%", bgcolor: colors.white, pb: { xs: 15, sm: 12 } }}>
      {/* Banner */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "220px", md: "400px" },
          overflow: "hidden", // Ensure video doesn't spill out
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: colors.white,
          textAlign: "center",
        }}
      >
        {/* Video Background */}
        <Box
          component="video"
          autoPlay
          loop
          muted
          playsInline
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        >
          <source src={mainVideo} type="video/mp4" />
        </Box>

        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.5)",
            zIndex: 1,
          }}
        />

        {/* Content */}
        <Box sx={{ position: "relative", zIndex: 2 }}>
          <Typography
            variant={isMobile ? "h4" : "h2"}
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Quick Order
          </Typography>
          <Breadcrumbs
            separator="›"
            sx={{
              color: colors.white,
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Typography color="inherit">Quick Order</Typography>
          </Breadcrumbs>
        </Box>
      </Box>
      <Container
        maxWidth="lg"
        disableGutters={isMobile}
        sx={{ px: { xs: 0, sm: 2 }, py: { xs: 2, md: 4 } }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{
            fontWeight: 800,
            mb: 2,
            color: colors.primaryRed,
            fontSize: { xs: "1.8rem", md: "2.5rem" },
            textTransform: "uppercase"
          }}
        >
          Product Catalog
        </Typography>
        {/* Header */}
        <Typography
          variant="h5"
          align="center"
          sx={{
            color: colors.primaryRed,
            fontWeight: "bold",
            mb: 1,
            fontSize: { xs: "1.5rem", sm: "1.8rem" },
          }}
        >
          Sri Padmavathi CRACKERS is the best Crackers Shop in Sivakasi.
        </Typography>
        <Typography
          align="center"
          sx={{
            mb: 3,
            color: colors.darkGray,
            fontSize: { xs: "1rem", sm: "1.1rem" },
          }}
        >
          Get the best deals on crackers with our Sivakasi Crackers Online Price
          List 2026.
        </Typography>

        {/* Minimum Order */}
        <Box
          sx={{
            bgcolor: colors.warningYellow,
            p: { xs: 1.5, sm: 2 },
            mb: 3,
            textAlign: "center",
            fontWeight: "bold",
            color: colors.darkRed,
            fontSize: { xs: "1rem", sm: "1.1rem" },
          }}
        >
          Minimum Order TamilNadu & PY Rs: 3000 and Other States Rs: 5000
        </Box>

        {/* State Selector */}
        <Box sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          gap: { xs: 1, sm: 2 },
          mb: 3,
          px: { xs: 2, sm: 0 }
        }}>
          <Button
            variant={state === "TamilNadu" ? "contained" : "outlined"}
            onClick={() => setState("TamilNadu")}
            size={isMobile ? "medium" : "large"}
            fullWidth={isMobile}
            sx={{
              bgcolor: state === "TamilNadu" ? colors.primaryRed : "transparent",
              color: state === "TamilNadu" ? colors.white : colors.primaryRed,
              borderColor: colors.primaryRed,
              fontSize: { xs: "1.1rem", sm: "1.1rem" },
              fontWeight: "bold",
              minWidth: { sm: 200 },
            }}
          >
            TAMILNADU & PY
          </Button>
          <Button
            variant={state === "Other" ? "contained" : "outlined"}
            onClick={() => setState("Other")}
            size={isMobile ? "medium" : "large"}
            fullWidth={isMobile}
            sx={{
              bgcolor: state === "Other" ? colors.primaryRed : "transparent",
              color: state === "Other" ? colors.white : colors.primaryRed,
              borderColor: colors.primaryRed,
              fontSize: { xs: "1.1rem", sm: "1.1rem" },
              fontWeight: "bold",
              minWidth: { sm: 200 },
            }}
          >
            OTHER STATES
          </Button>
        </Box>

        <BrandsLogo />

        {/* Connection Notice for Fallback Mode */}
        {connectionNotice && (
          <Alert
            severity="info"
            sx={{
              mb: 3,
              borderRadius: 2,
              bgcolor: "rgba(2, 136, 209, 0.1)",
              border: "1px solid #0288d1",
              "& .MuiAlert-icon": { color: "#0288d1" }
            }}
          >
            {connectionNotice}
          </Alert>
        )}

        {/* Simple Filter */}
        <Box sx={{ mb: 3, display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
          <TextField
            fullWidth
            placeholder="Search crackers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
          />
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="all">All Products</MenuItem>
              {productData.map((cat) => (
                <MenuItem key={cat.category} value={cat.category}>{cat.category}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Product List Area */}
        {isMobile ? (
          <Box sx={{ pb: 10 }}>
            {loadingProducts && (
              <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
                <CircularProgress color="error" />
              </Box>
            )}
            <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #ddd", borderRadius: 0, overflow: "hidden" }}>
              <Table size="small" padding="none">
                <TableBody>
                  {!loadingProducts && filteredProducts.map((cat) => (
                    <React.Fragment key={cat.category}>
                      <MobileCategoryHeader
                        category={cat.category}
                        discount={cat.products[0]?.discount || 0}
                      />
                      {cat.products.map((product, idx) => (
                        <MobileProductRow
                          key={product.id}
                          product={product}
                          index={idx}
                          qty={quantities[product.id] || 0}
                          onQtyChange={handleQtyChange}
                          onPreview={setPreviewImage}
                        />
                      ))}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              mb: { xs: 15, sm: 8 },
              borderRadius: 0,
              overflowX: "auto",
              width: "100%",
              boxShadow: "none",
              border: `1px solid ${colors.gray70}`,
            }}
          >
            <Table
              stickyHeader
              size="medium"
              sx={{
                tableLayout: "fixed",
                width: "100%",
                minWidth: 900
              }}
            >
              <TableHead>
                <TableRow sx={{
                  "& .MuiTableCell-head": {
                    bgcolor: "#fde047",
                    fontWeight: 900,
                    color: "black",
                    borderBottom: `1px solid black`,
                    py: 1.5,
                    zIndex: 120
                  }
                }}>
                  <TableCell align="center" sx={{ width: "6%", border: "1px solid #ddd" }}>S.No</TableCell>
                  <TableCell align="center" sx={{ width: "12%", border: "1px solid #ddd" }}>Image</TableCell>
                  <TableCell sx={{ width: "37%", border: "1px solid #ddd" }}>Products</TableCell>
                  <TableCell align="right" sx={{ width: "15%", border: "1px solid #ddd" }}>Price</TableCell>
                  <TableCell align="center" sx={{ width: "15%", border: "1px solid #ddd" }}>Qty</TableCell>
                  <TableCell align="center" sx={{ width: "15%", border: "1px solid #ddd" }}>Amount</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {/* Products render */}
                {!loadingProducts && filteredProducts.map((cat) => (
                  <React.Fragment key={cat.category}>
                    <CategoryHeader
                      category={cat.category}
                      discount={cat.products[0]?.discount || 0}
                    />

                    {cat.products.map((product, index) => (
                      <ProductRow
                        key={product.id}
                        product={product}
                        index={index}
                        qty={quantities[product.id] || 0}
                        onQtyChange={handleQtyChange}
                        onPreview={setPreviewImage}
                      />
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Typography
          variant="body2"
          align="center"
          sx={{
            mt: 4,
            mb: 2,
            color: colors.primaryRed,
            fontWeight: "bold",
            fontSize: { xs: "0.9rem", sm: "1.1rem" },
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Transportation charges to be paid by the customer
        </Typography>
      </Container>

      {/* Minimized Footer with Cart Icon */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: colors.white,
          borderTop: `2px solid ${colors.primaryRed}`,
          boxShadow: "0 -4px 12px rgba(0,0,0,0.15)",
          zIndex: 1300,
        }}
      >
        <Container maxWidth="lg" disableGutters={isMobile}>
          <Box
            sx={{
              p: { xs: 1, sm: 1.5 },
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "stretch", sm: "center" },
              gap: 1,
            }}
          >
            <Box sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              gap: { xs: 2, sm: 3 }
            }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 2.5, sm: 3 } }}>
                {/* Cart Icon in Footer */}
                <IconButton
                  onClick={() => setCartOpen(true)}
                  sx={{
                    bgcolor: colors.primaryRed,
                    color: colors.white,
                    "&:hover": { bgcolor: colors.darkRed },
                    width: { xs: 40, sm: 48 },
                    height: { xs: 40, sm: 48 },
                    boxShadow: "0 2px 8px rgba(221, 18, 18, 0.3)"
                  }}
                >
                  <Badge
                    badgeContent={totalQty > 99 ? "99+" : totalQty}
                    color="error"
                    sx={{
                      "& .MuiBadge-badge": {
                        bgcolor: "#b90000",
                        fontSize: { xs: "0.65rem", sm: "0.75rem" },
                        height: { xs: 18, sm: 20 },
                        minWidth: { xs: 18, sm: 20 },
                        fontWeight: "bold",
                        border: `2px solid ${colors.white}`
                      },
                    }}
                  >
                    <ShoppingCartIcon
                      sx={{ fontSize: { xs: "1.3rem", sm: "1.6rem" } }}
                    />
                  </Badge>
                </IconButton>

                {/* Totals Section */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.2, pl: { xs: 0.5, sm: 0 } }}>
                  <Typography
                    sx={{
                      fontSize: { xs: "0.8rem", sm: "0.95rem" },
                      color: colors.darkGray,
                      lineHeight: 1.2,
                      fontWeight: 500
                    }}
                  >
                    Items: <strong>{totalQty}</strong> | Discount: <strong>₹{discount}</strong>
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "1.2rem", sm: "1.4rem" },
                      fontWeight: 800,
                      color: colors.primaryRed,
                      lineHeight: 1,
                      letterSpacing: "-0.02em"
                    }}
                  >
                    Total: ₹{overallTotal}
                  </Typography>
                </Box>
              </Box>

              {/* Min Order Notice next to totals on desktop */}
              {!isMobile && (
                <Typography
                  sx={{
                    fontSize: { xs: "0.7rem", sm: "0.85rem" },
                    color: colors.deepGreen,
                    bgcolor: "rgba(4, 119, 8, 0.05)",
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    border: "1px dashed rgba(4, 119, 8, 0.2)"
                  }}
                >
                  Min Order:{" "}
                  {state === "TamilNadu" ? "TN & PY" : "Other States"} - ₹
                  {minOrder}
                </Typography>
              )}
            </Box>

            {/* Right side - Submit Button */}
            <Button
              variant="contained"
              size="small"
              disabled={!canSubmit}
              onClick={handleOpenDialog}
              fullWidth={isMobile}
              sx={{
                bgcolor: colors.primaryRed,
                color: colors.white,
                fontSize: { xs: "0.8rem", sm: "1rem" },
                py: { xs: 0.5, sm: 1 },
                px: { xs: 1.5, sm: 3 },
                minWidth: { xs: "80px", sm: 120 },
                "&:hover": { bgcolor: colors.darkRed },
                "&:disabled": { bgcolor: colors.gray70 },
                borderRadius: 2,
              }}
            >
              SUBMIT
            </Button>
          </Box>
        </Container>
      </Box>
      {/* Scroll to Top Button */}
      <Fade in={showScrollTop}>
        <Box
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            bottom: { xs: 70, sm: 80 },
            right: { xs: 10, sm: 20 },
            zIndex: 1300,
            cursor: "pointer",
            bgcolor: colors.primaryRed,
            color: colors.white,
            width: { xs: 40, sm: 45 },
            height: { xs: 40, sm: 45 },
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            transition: "all 0.2s",
            "&:hover": {
              bgcolor: colors.darkRed,
              transform: "scale(1.1)",
            },
          }}
        >
          <ArrowUpwardIcon sx={{ fontSize: { xs: "1.5rem", sm: "1.8rem" } }} />
        </Box>
      </Fade>
      {/* Shopping Cart Dialog */}
      <Dialog
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle
          sx={{
            bgcolor: colors.primaryRed,
            color: colors.white,
            py: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ShoppingCartIcon />
            <Typography variant="h6" sx={{ fontSize: "1.4rem" }}>
              Shopping Cart ({totalQty} items)
            </Typography>
          </Box>
          <IconButton
            onClick={() => setCartOpen(false)}
            sx={{ color: colors.white }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ p: { xs: 2, sm: 3 } }}>
          {orderItems.length > 0 ? (
            <>
              {/* Cart Items */}
              {isMobile ? (
                <Box sx={{ mb: 3 }}>
                  {orderItems.map((item) => (
                    <Paper
                      key={item.id}
                      elevation={0}
                      sx={{
                        p: 1.5,
                        mb: 1.5,
                        border: `1px solid ${colors.gray70}`,
                        borderRadius: 2,
                        bgcolor: colors.white
                      }}
                    >
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography fontWeight="bold" sx={{ fontSize: "0.95rem" }}>
                          {item.name.replace(/<br>/g, " ")}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveItem(item.id)}
                          sx={{ color: colors.dangerRed, mt: -0.5, mr: -0.5 }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>

                      <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        bgcolor: colors.lightBlueGray,
                        p: 1,
                        borderRadius: 1
                      }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleQtyChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            sx={{ bgcolor: colors.gray70, color: colors.white, width: 28, height: 28 }}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography sx={{ minWidth: 25, textAlign: "center", fontWeight: "bold" }}>
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleQtyChange(item.id, item.quantity + 1)}
                            sx={{ bgcolor: colors.primaryRed, color: colors.white, width: 28, height: 28 }}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>

                        <Box sx={{ textAlign: "right" }}>
                          <Typography variant="caption" sx={{ color: colors.gray50, display: "block" }}>
                            ₹{item.price} each
                          </Typography>
                          <Typography fontWeight="bold" sx={{ color: colors.black }}>
                            ₹{item.amount}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              ) : (
                <TableContainer
                  component={Paper}
                  elevation={0}
                  sx={{
                    border: `1px solid ${colors.gray70}`,
                    mb: 3,
                    overflowX: "auto"
                  }}
                >
                  <Table
                    size="small"
                    sx={{
                      tableLayout: isMobile ? "auto" : "fixed",
                      width: "100%",
                      minWidth: isMobile ? 550 : "auto"
                    }}
                  >
                    <TableHead>
                      <TableRow sx={{ bgcolor: colors.lightBlueGray }}>
                        <TableCell sx={{ fontSize: "1rem", width: "40%" }}>
                          Product
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontSize: "1rem", width: "15%" }}
                        >
                          Qty
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontSize: "1rem", width: "15%" }}
                        >
                          Price
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontSize: "1rem", width: "15%" }}
                        >
                          Amount
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontSize: "1rem", width: "15%" }}
                        >
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orderItems.map((item) => (
                        <TableRow key={item.id} hover>
                          <TableCell
                            sx={{ fontSize: "0.95rem", wordBreak: "break-word" }}
                          >
                            {item.name.replace(/<br>/g, " ")}
                            {item.count && (
                              <Typography
                                variant="caption"
                                display="block"
                                sx={{ color: colors.dangerRed }}
                              >
                                {item.count}
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell align="center">
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 0.5,
                              }}
                            >
                              <IconButton
                                size="small"
                                onClick={() =>
                                  handleQtyChange(item.id, item.quantity - 1)
                                }
                                disabled={item.quantity <= 1}
                                sx={{
                                  bgcolor: colors.gray70,
                                  color: colors.white,
                                  width: 24,
                                  height: 24,
                                  "&:hover": { bgcolor: colors.darkRed },
                                }}
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>
                              <Typography
                                sx={{
                                  minWidth: 30,
                                  textAlign: "center",
                                  fontWeight: 500,
                                }}
                              >
                                {item.quantity}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() =>
                                  handleQtyChange(item.id, item.quantity + 1)
                                }
                                sx={{
                                  bgcolor: colors.primaryRed,
                                  color: colors.white,
                                  width: 24,
                                  height: 24,
                                  "&:hover": { bgcolor: colors.darkRed },
                                }}
                              >
                                <AddIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </TableCell>
                          <TableCell align="right" sx={{ fontSize: "0.95rem" }}>
                            ₹{item.price}
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{ fontWeight: "bold", fontSize: "0.95rem" }}
                          >
                            ₹{item.amount}
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              size="small"
                              onClick={() => handleRemoveItem(item.id)}
                              sx={{
                                color: colors.dangerRed,
                                "&:hover": { bgcolor: colors.lightRed },
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              {/* Cart Summary */}
              <Paper sx={{ p: 2, bgcolor: colors.lightBlueGray }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" sx={{ fontSize: "1.1rem" }}>
                      Total Products: <strong>{totalQty}</strong>
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontSize: "1.1rem" }}>
                      Discount: <strong>₹{discount}</strong>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{ textAlign: { xs: "left", sm: "right" } }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: colors.primaryRed, fontSize: "1.3rem" }}
                    >
                      Overall Total: ₹{overallTotal}
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.deepGreen }}>
                      Min Order: ₹{minOrder}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>

              {!canSubmit && grandTotal > 0 && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                  Add ₹{minOrder - grandTotal} more to meet minimum order
                </Alert>
              )}
            </>
          ) : (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <ShoppingCartIcon
                sx={{ fontSize: "4rem", color: colors.gray60, mb: 2 }}
              />
              <Typography variant="h6" sx={{ color: colors.gray60 }}>
                Your cart is empty
              </Typography>
              <Button
                variant="contained"
                onClick={() => setCartOpen(false)}
                sx={{ mt: 2, bgcolor: colors.primaryRed }}
              >
                Continue Shopping
              </Button>
            </Box>
          )}
        </DialogContent>

        {orderItems.length > 0 && (
          <DialogActions
            sx={{
              p: 2,
              bgcolor: colors.lightBlueGray,
              flexDirection: { xs: "column", sm: "row" },
              gap: 1,
            }}
          >
            <Button
              variant="outlined"
              onClick={() => setCartOpen(false)}
              fullWidth={isMobile}
              sx={{ borderColor: colors.gray60, color: colors.darkGray }}
            >
              Continue Shopping
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setCartOpen(false);
                setOpenDialog(true);
              }}
              disabled={!canSubmit}
              fullWidth={isMobile}
              sx={{
                bgcolor: colors.primaryRed,
                "&:hover": { bgcolor: colors.darkRed },
              }}
            >
              Proceed to Checkout
            </Button>
          </DialogActions>
        )}
      </Dialog>
      {/* Order Summary Dialog with Client Information */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle
          sx={{
            bgcolor: colors.primaryRed,
            color: colors.white,
            py: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontSize: "1.4rem" }}>
            Order Summary
          </Typography>
          <IconButton onClick={handleCloseDialog} sx={{ color: colors.white }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ p: { xs: 2, sm: 3 } }}>
          {/* Client Information Section */}
          <Typography variant="h6" sx={{ mb: 2, color: colors.primaryRed }}>
            Client Information
          </Typography>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name *"
                value={clientInfo.name}
                onChange={handleClientInfoChange("name")}
                error={!!errors.name}
                helperText={errors.name}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address *"
                type="email"
                value={clientInfo.email}
                onChange={handleClientInfoChange("email")}
                error={!!errors.email}
                helperText={errors.email}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number *"
                value={clientInfo.phone}
                onChange={handleClientInfoChange("phone")}
                error={!!errors.phone}
                helperText={errors.phone}
                size="small"
                placeholder="10-digit mobile number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State *"
                value={
                  state === "TamilNadu" ? "TamilNadu & PY" : "Other States"
                }
                disabled
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Delivery Address *"
                value={clientInfo.address}
                onChange={handleClientInfoChange("address")}
                error={!!errors.address}
                helperText={errors.address}
                multiline
                rows={2}
                size="small"
              />
            </Grid>
          </Grid>

          {/* Order Summary Section */}
          <Typography variant="h6" sx={{ mb: 2, color: colors.primaryRed }}>
            Order Details
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ fontSize: "1.1rem" }}>
                Total Products: <strong>{totalQty}</strong>
              </Typography>
              <Typography variant="subtitle1" sx={{ fontSize: "1.1rem" }}>
                Discount: <strong>₹{discount}</strong>
              </Typography>
              <Typography variant="subtitle1" sx={{ fontSize: "1.1rem" }}>
                Minimum Order: <strong>₹{minOrder}</strong>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ textAlign: { xs: "left", sm: "right" } }}
            >
              <Typography
                variant="h6"
                sx={{ color: colors.primaryRed, fontSize: "1.4rem" }}
              >
                Overall Total: ₹{overallTotal}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontSize: "1.1rem" }}>
                Order Date: <strong>{new Date().toLocaleDateString()}</strong>
              </Typography>
            </Grid>
          </Grid>

          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ border: `1px solid ${colors.gray70}`, overflowX: "hidden" }}
          >
            <Table size="small" sx={{ tableLayout: "fixed", width: "100%" }}>
              <TableHead>
                <TableRow sx={{ bgcolor: colors.lightBlueGray }}>
                  <TableCell sx={{ fontSize: "1.05rem", width: "40%" }}>
                    Product
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "1.05rem", width: "20%" }}
                  >
                    Qty
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontSize: "1.05rem", width: "20%" }}
                  >
                    Price
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontSize: "1.05rem", width: "20%" }}
                  >
                    Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell
                      sx={{ fontSize: "1rem", wordBreak: "break-word" }}
                    >
                      {item.name.replace(/<br>/g, " ")}
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQtyChange(item.id, e.target.value)
                        }
                        inputProps={{
                          min: 0,
                          style: {
                            textAlign: "center",
                            width: isMobile ? 50 : 60,
                            fontSize: "1.1rem",
                          },
                        }}
                        sx={{ width: isMobile ? 70 : 90 }}
                      />
                    </TableCell>
                    <TableCell align="right" sx={{ fontSize: "1.1rem" }}>
                      ₹{item.price}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                    >
                      ₹{item.amount}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow sx={{ bgcolor: colors.lightBlueGray }}>
                  <TableCell
                    colSpan={3}
                    align="right"
                    sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
                  >
                    Grand Total:
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: "bold",
                      color: colors.primaryRed,
                      fontSize: "1.3rem",
                    }}
                  >
                    ₹{grandTotal}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {!canSubmit && grandTotal > 0 && (
            <Alert severity="warning" sx={{ mt: 3 }}>
              Add ₹{minOrder - grandTotal} more to meet minimum order
            </Alert>
          )}

          {Object.keys(errors).length > 0 && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Please fill in all required fields correctly
            </Alert>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            p: 3,
            bgcolor: colors.lightBlueGray,
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={generatePDF}
            fullWidth={isMobile}
            sx={{
              borderColor: colors.primaryRed,
              color: colors.primaryRed,
              fontSize: { xs: "1.1rem", sm: "1.2rem" },
              "&:hover": {
                borderColor: colors.darkRed,
                backgroundColor: "rgba(220, 18, 18, 0.04)",
              },
            }}
          >
            Download Bill
          </Button>
          <Button
            variant="contained"
            startIcon={<WhatsAppIcon />}
            onClick={handleSendWhatsApp}
            disabled={!canSubmit}
            fullWidth={isMobile}
            sx={{
              bgcolor: colors.successGreen,
              fontSize: { xs: "1.1rem", sm: "1.2rem" },
              py: 1.8,
              "&:hover": { bgcolor: "#388E3C" },
            }}
          >
            Send to WhatsApp
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Preview Dialog */}
      <Dialog
        open={Boolean(previewImage)}
        onClose={() => setPreviewImage(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "rgba(0,0,0,0.9)",
            boxShadow: "none",
            overflow: "visible",
            position: "relative",
            maxWidth: "90vw",
            maxHeight: "90vh",
            m: 2,
            borderRadius: 2,
          },
        }}
      >
        <IconButton
          onClick={() => setPreviewImage(null)}
          sx={{
            position: "absolute",
            right: -12,
            top: -12,
            bgcolor: colors.primaryRed,
            color: colors.white,
            "&:hover": { bgcolor: colors.darkRed },
            zIndex: 10,
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ p: 0, display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
          {previewImage && (
            <Box
              component="img"
              src={previewImage.image}
              alt={previewImage.name}
              sx={{
                maxWidth: "100%",
                maxHeight: "85vh",
                objectFit: "contain",
                p: 1,
              }}
            />
          )}
        </DialogContent>
        {previewImage && (
          <Box sx={{ p: 2, textAlign: "center", color: colors.white, bgcolor: "rgba(0,0,0,0.5)" }}>
            <Typography variant="h6">{previewImage.name.replace(/<br>/g, " ")}</Typography>
          </Box>
        )}
      </Dialog>

    </Box>
  );
}
