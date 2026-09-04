import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Snackbar,
  Grid,
  InputAdornment,
  Tooltip,
  Chip,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Stack,
  Divider,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  FormControlLabel,
  Switch,
  Box as MuiBox
} from "@mui/material";
import {
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  writeBatch
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";
import { auth, db, storage } from "../Firebase/firebase";
import AdminLogin from "../components/AdminLogin";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import RefreshIcon from "@mui/icons-material/Refresh";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import WarningIcon from "@mui/icons-material/Warning";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import InventoryIcon from "@mui/icons-material/Inventory";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MenuIcon from "@mui/icons-material/Menu";
import PrintIcon from "@mui/icons-material/Print";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { colors } from "../colors";
import productData from "../components/productData"; // For initialization

const StatusChip = ({ status }) => {
  const statusConfig = {
    pending: { label: "Pending", color: "warning", icon: <HourglassEmptyIcon fontSize="small" /> },
    dispatched: { label: "Dispatched", color: "primary", icon: <LocalShippingIcon fontSize="small" /> },
    completed: { label: "Completed", color: "success", icon: <CheckCircleIcon fontSize="small" /> },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <Chip 
      size="small" 
      label={config.label} 
      color={config.color} 
      icon={config.icon} 
      sx={{ fontWeight: 'bold' }} 
    />
  );
};

const AdminPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Global Discount State
  const [globalDiscount, setGlobalDiscount] = useState("");
  const [applyingDiscount, setApplyingDiscount] = useState(false);

  // Orders State
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard"); // "dashboard", "inventory", or "orders"
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [fetchingOrders, setFetchingOrders] = useState(false);
  
  // Order Edit State
  const [editingOrderItems, setEditingOrderItems] = useState(false);
  const [editableItems, setEditableItems] = useState([]);

  // Category Management State
  const [categories, setCategories] = useState([]);
  const [managingCategories, setManagingCategories] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [draggedItemIdx, setDraggedItemIdx] = useState(null);
  const [editingCategoryIdx, setEditingCategoryIdx] = useState(null);
  const [editingCategoryName, setEditingCategoryName] = useState("");
  const [hasUnsavedCategories, setHasUnsavedCategories] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    netRate: "",
    discount: "",
    category: "",
    count: "",
    image: null,
    imageUrl: "",
    outOfStock: false
  });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const drawerWidth = 260;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // Helper to normalize strings for matching (strips common mojibake)
  const normalizeKey = (name, category) => {
    const rawMatch = `${category}_${name}`.toLowerCase();
    return rawMatch
      .replace(/Ã‚Â|Ã|Â/g, "") // Strip mojibake residuals
      .replace(/[^a-z0-9]/g, "_") // Standardize special chars
      .replace(/_+/g, "_") // Remove double underscores
      .trim();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        fetchCategories().then((cats) => {
          fetchProducts(cats);
          fetchOrders();
        });
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (activeTab === "categories" && categories.length === 0 && user) {
      fetchCategories();
    }
  }, [activeTab, categories.length, user]);

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

  const CATEGORY_SORT_ORDER = {
    "SOUND CRACKERS": 0, "FLOWER POTS": 1, "GROUND CHAKKAR'S": 2,
    "SPINNER CHAKKAR'S": 3, "PENCIL": 4, "TWINKLING STAR": 5,
    "BIJILI": 6,
    "ROCKET": 7, "BOMB": 8, "PAPER BOMB": 9,
    "GIANT CRACKERS": 10, "GARLAND CRACKERS": 11,
    "MEGA AERIAL SERIES": 12, "WHIZZLING SERIES": 13, "SPEED SERIES": 14,
    "KID'S SPECIAL": 15, "90'S KIDS SPECIAL": 16,
    "MEGA FOUNTAIN": 17, "COLOUR CRACKLING FOUNTAIN": 18,
    "SETOUT": 19, "COLOUR MATCHES": 20, "SPARKLERS": 21, "GIFT BOXES": 22,
    // Old Firebase fallback names
    "Single Shot Crackers": 0, "Continue Sound Crackers": 0,
    "Flower Pots Embossed": 1, "Ground Chacker Embossed": 2,
    "Pencil Novaties": 4, "Twinkling Star": 5,
    "Rocket Bomb": 7, "Bomb of Bomb": 8, "Paper Bomb": 9,
    "Night Aerial Attraction": 12, "Shots": 14,
    "Night Fountain": 17, "Novelty Fancies": 17,
    "Sparklers": 21, "M M Gift Box": 22,
  };


  const fetchCategories = async () => {
    try {
      const docRef = doc(db, "settings", "categories");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().list && docSnap.data().list.length > 0) {
        setCategories(docSnap.data().list);
        return docSnap.data().list;
      } else {
        const defaultCategories = Object.entries(CATEGORY_SORT_ORDER)
          .sort((a, b) => a[1] - b[1])
          .map(entry => entry[0]);
        const uniqueDefaults = [...new Set(defaultCategories)];
        setCategories(uniqueDefaults);
        try {
          await setDoc(docRef, { list: uniqueDefaults }, { merge: true });
        } catch (setErr) {
          console.error("Failed to save default categories to Firestore, continuing with local state", setErr);
        }
        return uniqueDefaults;
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      // Fallback to local defaults if Firestore fetch fails
      const defaultCategories = Object.entries(CATEGORY_SORT_ORDER)
        .sort((a, b) => a[1] - b[1])
        .map(entry => entry[0]);
      const uniqueDefaults = [...new Set(defaultCategories)];
      setCategories(uniqueDefaults);
      return uniqueDefaults;
    }
  };

  const fetchProducts = async (catList = categories) => {
    try {
      // Try ordering by orderIndex in the query first
      const q = query(collection(db, "crackers"), orderBy("orderIndex"));
      const querySnapshot = await getDocs(q);
      let items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      if (items.length === 0) {
        // Fallback to basic fetch if empty or index not ready
        const basicQ = query(collection(db, "crackers"), orderBy("category"));
        const basicSnapshot = await getDocs(basicQ);
        items = basicSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }

      // Apply display category rename + sort
      const remapped = items.map(item => ({
        ...item,
        displayCategory: getDisplayCategory(item),
      }));

      remapped.sort((a, b) => {
        // Primary sort: orderIndex
        if (a.orderIndex !== undefined && b.orderIndex !== undefined) {
          if (a.orderIndex !== b.orderIndex) return a.orderIndex - b.orderIndex;
        }
        
        // Secondary sort: Dynamic Category Order
        const orderA = catList.indexOf(a.displayCategory);
        const orderB = catList.indexOf(b.displayCategory);
        const sortA = orderA !== -1 ? orderA : 9999;
        const sortB = orderB !== -1 ? orderB : 9999;
        if (sortA !== sortB) return sortA - sortB;

        // Final sort: Name
        return (a.name || "").localeCompare(b.name || "");
      });

      setProducts(remapped);
    } catch (err) {
      console.error("Error fetching products:", err);
      // Final fallback to simple list if complex query fails
      try {
        const querySnapshot = await getDocs(collection(db, "crackers"));
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(items.map(i => ({...i, displayCategory: getDisplayCategory(i)})));
      } catch (e) {
        showSnackbar("Error fetching products", "error");
      }
    }
  };


  const fetchOrders = async () => {
    setFetchingOrders(true);
    try {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(items);
    } catch (err) {
      console.error("Error fetching orders:", err);
      showSnackbar("Error fetching orders", "error");
    } finally {
      setFetchingOrders(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await updateDoc(doc(db, "orders", orderId), { status: newStatus });
      showSnackbar(`Order status updated to ${newStatus}`);
      fetchOrders();
    } catch (err) {
      console.error("Error updating order status:", err);
      showSnackbar("Failed to update order status", "error");
    }
  };

  const saveOrderItems = async () => {
    if (!selectedOrder) return;
    try {
      const newGrandTotal = editableItems.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

      await updateDoc(doc(db, "orders", selectedOrder.id), { 
        items: editableItems,
        grandTotal: newGrandTotal, 
        overallTotal: newGrandTotal 
      });
      showSnackbar("Order items and total updated successfully!");
      
      const updatedOrder = { ...selectedOrder, items: editableItems, grandTotal: newGrandTotal, overallTotal: newGrandTotal };
      setSelectedOrder(updatedOrder);
      setEditingOrderItems(false);
      fetchOrders();
    } catch (err) {
      console.error("Error updating order items:", err);
      showSnackbar("Failed to update order items", "error");
    }
  };

  const handleItemQuantityChange = (idx, newQty) => {
    if (newQty < 1) return; // Prevent negative or zero quantity
    const updatedItems = [...editableItems];
    const item = updatedItems[idx];
    
    // Calculate unit price before changing quantity
    const unitPrice = Number(item.price) || (Number(item.amount) / item.quantity);
    
    item.quantity = newQty;
    item.amount = newQty * unitPrice;
    
    setEditableItems(updatedItems);
  };

  const printInvoice = (order) => {
    let rawSubtotal = 0;
    let finalTotal = 0;

    const itemsHtml = order.items?.map((item, idx) => {
      // Use netRate if available, otherwise fallback to price
      const netRate = Number(item.netRate) || Number(item.price) || (Number(item.amount) / Number(item.quantity));
      const qty = Number(item.quantity) || 1;
      const rawAmount = netRate * qty;
      const discountedAmount = Number(item.amount) || (Number(item.price) * qty);
      
      rawSubtotal += rawAmount;
      finalTotal += discountedAmount;

      return `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${idx + 1}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">${qty} x ₹${netRate}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">₹${rawAmount}</td>
      </tr>
      `;
    }).join('') || '';

    // Override with final totals if saved in order object
    if (order.overallTotal) {
      finalTotal = Number(order.overallTotal);
    } else if (order.grandTotal) {
      finalTotal = Number(order.grandTotal);
    }

    rawSubtotal = Math.round(rawSubtotal);
    finalTotal = Math.round(finalTotal);
    const discount = Math.round(rawSubtotal - finalTotal);

    const discountHtml = discount > 0 ? `
              <tr>
                <th>Discount / Adjusted:</th>
                <td style="color: #16a34a;">-₹${discount}</td>
              </tr>
    ` : '';

    const htmlContent = `
      <html>
        <head>
          <title>Invoice - ${order.orderId || order.id}</title>
          <style>
            body { font-family: Arial, sans-serif; color: #333; margin: 0; padding: 20px; }
            .header { text-align: center; border-bottom: 2px solid #ea580c; padding-bottom: 10px; margin-bottom: 20px; }
            .header h1 { margin: 0; color: #ea580c; font-size: 28px; }
            .header p { margin: 5px 0 0 0; font-size: 14px; color: #666; }
            .details { display: flex; justify-content: space-between; margin-bottom: 30px; }
            .details div { width: 48%; }
            .details h3 { border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 10px; font-size: 16px; color: #ea580c; }
            .details p { margin: 5px 0; font-size: 14px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th { text-align: left; background-color: #f9f9f9; padding: 10px 8px; border-bottom: 2px solid #ccc; font-size: 14px; }
            td { font-size: 14px; }
            .totals { width: 40%; float: right; }
            .totals table th { background: transparent; border: none; text-align: left; padding: 5px 0; }
            .totals table td { text-align: right; border: none; padding: 5px 0; font-weight: bold; }
            .totals .grand-total th, .totals .grand-total td { font-size: 18px; color: #ea580c; border-top: 2px solid #ea580c; padding-top: 10px; }
            .footer { clear: both; text-align: center; margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #888; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Sri Padmavathi Crackers</h1>
            <p>Sivakasi, Tamil Nadu | Phone: 99525 61300 | Web: www.sripadmavathicrackers.com</p>
          </div>
          
          <div class="details">
            <div>
              <h3>Customer Details</h3>
              <p><strong>Name:</strong> ${order.clientInfo?.name || "N/A"}</p>
              <p><strong>Phone:</strong> ${order.clientInfo?.phone || "N/A"}</p>
              <p><strong>Email:</strong> ${order.clientInfo?.email || "N/A"}</p>
              <p><strong>Address:</strong> ${order.clientInfo?.address || "N/A"}</p>
            </div>
            <div>
              <h3>Order Details</h3>
              <p><strong>Order ID:</strong> ${order.orderId || order.id}</p>
              <p><strong>Date:</strong> ${order.createdAt?.toDate ? order.createdAt.toDate().toLocaleString() : "N/A"}</p>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>SL.</th>
                <th>Item Description</th>
                <th style="text-align: right;">Qty</th>
                <th style="text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div class="totals">
            <table>
              <tr>
                <th>Subtotal:</th>
                <td>₹${rawSubtotal}</td>
              </tr>
              ${discountHtml}
              <tr class="grand-total">
                <th>Grand Total:</th>
                <td>₹${finalTotal}</td>
              </tr>
            </table>
          </div>

          <div class="footer">
            <p>Thank you for your business! Have a safe and happy celebration.</p>
          </div>
          
          <script>
            window.onload = function() { window.print(); window.onafterprint = function(){ window.close(); } };
          </script>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Popup blocked! Please allow popups for this website to print invoices.");
      return;
    }
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteDoc(doc(db, "orders", orderId));
        showSnackbar("Order deleted successfully");
        fetchOrders();
      } catch (err) {
        console.error("Error deleting order:", err);
        showSnackbar("Failed to delete order", "error");
      }
    }
  };

  const updatePricesFromPDF = async () => {
    if (!window.confirm("Update all product prices from the 2025 PDF list with 80% discount?")) return;
    try {
      const pdfPrices = {
        "3 1/2\" Lakshmi Crackers": 350, "4\"Lakshmi Crackers": 450, "4\"Lakshmi Deluxe Crackers": 800,
        "4\" Gold Lakshmi Crackers": 800, "5\"Bahubali Crackers": 1000, "6\"Jallikattu Crackers": 1550,
        "2 3/4\"Kuruvi Crackers": 1300, "Flower Pots Big": 180, "Flower Pots special": 360,
        "Flower Pots Ashoka": 275, "Flower Pots Super Deluxe (5pcs)": 700, "Colour koti": 800,
        "Colour Koti Deluxe": 240, "Tricolour (5pcs)": 410, "Ground Chakkar Big": 700,
        "Ground Chakkar Special": 780, "Ground Chakkar Ashoka": 780, "Ground Chakkar Deluxe": 780,
        "Wire Chakkar": 780, "Spinner Big": 125, "Spinner Special": 340, "Spinner Deluxe": 180,
        "Fire Light (3pcs)": 200, "Baby Rocket": 180, "Rocket Bomb": 260, "Musical Rocket (5pcs)": 700,
        "Whizzling Rocket": 850, "Bullet Bomb": 200, "Hydro Bomb": 330, "King of King": 450,
        "Classic Bomb": 500, "Digital Bomb": 1100, "1/4 kg Paper Bomb": 270, "1/2 Kg Paper Bomb": 530,
        "1 kg Paper bomb": 1040, "0.28 Runner Crackers": 80, "0.024 Go Go Crackers": 240,
        "0.050 Go Go Crackers": 600, "100 Go Go Crackers": 1200, "100 US": 250, "200 US": 500,
        "1K HF": 800, "2K HF": 1600, "5K HF": 4000, "10K HF": 8000, "1K ABM": 1560, "2K ABM": 3120,
        "5K ABM": 7500, "10K ABM": 15000, "Chotta Fancy": 200, "2\"Single Fancy": 500,
        "2\"Fancy (3pcs)": 1300, "3 1/2\" Single Fancy": 1400, "3 1/2\" Sizzling Fancy": 1650,
        "3 1/2\"Crackling Fancy": 1650, "3 1/2\"Nayagara Falls Fancy": 1650, "3 1/2\" Double Ball Fancy": 2100,
        "4\" Tower fancy (2pcs)": 3700, "5\"Turbo fancy (2pcs)": 4400, "6\" Mega Turbo": 3300,
        "Music Rip": 2000, "25 Whizzling Shots": 3180, "12 Shot Rider& Crackling": 950,
        "12 Shot Multicolour": 1150, "25 Shot Rider &Crackling": 1300, "30 shot Multicolour I": 2080,
        "60 Shot Multicolour II": 4180, "30 shot Multicolour": 2300, "60 Shot Multicolour": 4600,
        "120 Shot Multicolour": 9200, "240 Shot Multicolour": 18400, "520 Shot Multicolour": 36800,
        "10*10 Celebration Moments": 18000, "Dora Singer (5pcs)": 800, "Water Queen": 1000,
        "Lollii Pop (5pcs)": 1400, "Tim Tom": 350, "Bambaram": 530, "Helicopter (5pcs)": 450,
        "Peacock Feather": 530, "Dancing Butterfly": 470, "Photo Flash (5pcs)": 350,
        "Mega Siren (3pcs)": 900, "7 Shots (5pcs)": 490, "Mega Peacock": 900, "Bada Peacock": 2250,
        "Penta Park (5-in-1)": 650, "4x4 Wheel (5pcs)": 900, "Old is Gold (25pcs)": 1000,
        "Money in Bank (3pcs)": 1000, "King of Hitler": 820, "Top Gun (5pcs)": 1050,
        "90'S Watts (3pcs)": 800, "Smoke (3pcs)": 800, "Tin": 460, "Toy Kimi Shower (2pcs)": 700,
        "2 1/4\" Mini Fountain (5pcs)": 780, "4\" Tango Fountain (5pcs)": 1400, "Easter (3pcs)": 800,
        "Santa Claus (3pcs)": 800, "Snow Balls (3pcs)": 800, "X-Mas (3pcs)": 800, "Ice Balls (3pcs)": 800,
        "Red Apple (5pcs)": 900, "Cornial FunFair (5pcs)": 900, "Mr.Big (5pcs)": 900,
        "Tooty frooty (5pcs)": 900, "Bingo Music (5pcs)": 900, "Party time (5pcs)": 900,
        "Cock Fight (2pcs)": 900, "Ultra Voltage (2pcs)": 900, "Mojito (2pcs)": 900,
        "Pride Popcorn (2pcs)": 900, "Peacock (2pcs)": 900, "Lollii Pops (2pcs)": 900,
        "Mr.Bean (3 Step Fountain)": 1100, "Sizzling Lego (3 Step Fountain)": 1100,
        "Hello Kitty Bus": 1240, "Paris Tower": 600, "Twins Tone (2 step fountain)": 900,
        "Gold Feast (2 step fountain)": 900, "Trolls (2 step fountain)": 900, "King Fish (2 step fountain)": 900,
        "Angel Time (2 step fountain)": 900, "Croods (2 step fountain)": 900, "Gold Fish (2 step fountain)": 900,
        "Violet Matrix (Fountain with 2 step)": 1800, "Jumbo Crackling Fountain (3pcs)": 1500,
        "2\" 36 Shot": 18200, "2 1/2\" Bharath Rathana 20 Shot": 12700, "Special Deluxe": 310,
        "Omega Laptop (10 in 1)": 1000, "10 Cm Electric Sparklers": 75, "10 CM Colour Sparklers": 85,
        "10 Cm Green Sparklers": 90, "10 Cm Red Sparklers": 100, "15 Cm Electric Sparklers": 185,
        "15 Cm Colour Sparklers": 200, "15 Cm Green Sparklers": 230, "15 Cm Red Sparklers": 245,
        "30 CM Electric Sparklers (5pcs)": 185, "30 Cm Colour Sparklers (5pcs)": 200,
        "30 Cm Green Sparklers (5pcs)": 230, "30 Cm Red Sparklers (5pcs)": 245,
        "50 Cm Electric Sparklers (5pcs)": 800, "50 Cm Colour Sparklers (5pcs)": 900,
        "Rotating Sparklers": 1050, "20 Items": 400, "25 Items": 500, "30 Items": 600,
        "35 Items": 750, "40 Items": 900, "45 Items": 1100, "50 Items": 1300
      };

      const q = query(collection(db, "crackers"));
      const snapshot = await getDocs(q);
      const batch = writeBatch(db);
      let count = 0;

      snapshot.docs.forEach((d) => {
        const data = d.data();
        const name = data.name.trim();
        let newNetRate = null;
        let discount = 80;

        if (pdfPrices[name]) {
          newNetRate = pdfPrices[name];
        } else {
          const normalized = name.toLowerCase().replace(/\s+/g, '');
          for (const [pName, rate] of Object.entries(pdfPrices)) {
            if (pName.toLowerCase().replace(/\s+/g, '') === normalized) {
              newNetRate = rate;
              break;
            }
          }
        }

        if (data.category === "GIFT BOXES" || data.category === "M M Gift Box" || name.includes("Items")) {
          discount = 0;
          if (!newNetRate && name.includes("Items")) {
             newNetRate = pdfPrices[name] || pdfPrices[name.split(' ')[0] + ' Items'];
          }
        }

        if (newNetRate) {
          batch.update(d.ref, {
            netRate: Number(newNetRate),
            discount: Number(discount),
            price: Math.round(Number(newNetRate) * (1 - discount / 100)),
            updatedAt: new Date()
          });
          count++;
        }
      });

      await batch.commit();
      showSnackbar(`Updated ${count} product prices successfully!`);
      fetchProducts();
    } catch (e) {
      console.error(e);
      showSnackbar("Error updating prices: " + e.message, "error");
    }
  };



  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleLogout = () => signOut(auth);

  const handleOpenDialog = (product = null) => {
    if (product) {
      setEditingProduct(product);
      // Calculate discount from existing netRate and price if not stored
      let discount = product.discount || "";
      if (!discount && product.netRate && product.price && product.netRate > 0) {
        const calculatedDiscount = Math.round(((product.netRate - product.price) / product.netRate) * 100);
        discount = calculatedDiscount > 0 ? String(calculatedDiscount) : "";
      }
      setFormData({
        name: product.name,
        price: product.price,
        netRate: product.netRate || "",
        discount,
        category: product.category,
        count: product.count || "",
        imageUrl: product.image,
        image: null,
        outOfStock: product.outOfStock || false
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        price: "",
        netRate: "",
        discount: "",
        category: "",
        count: "",
        imageUrl: "",
        image: null,
        outOfStock: false
      });
    }
    setImagePreview(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      // Auto-calculate price when netRate or discount changes
      if (name === "netRate" || name === "discount") {
        const netRate = parseFloat(name === "netRate" ? value : prev.netRate);
        const discount = parseFloat(name === "discount" ? value : prev.discount);
        if (!isNaN(netRate) && !isNaN(discount) && discount >= 0 && discount <= 100) {
          updated.price = parseFloat((netRate * (1 - discount / 100)).toFixed(2));
        } else if (!isNaN(netRate) && (isNaN(discount) || value === "")) {
          // No discount entered, price = netRate
          if (name === "discount" && value === "") {
            updated.price = netRate;
          }
        }
      }
      return updated;
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit for speed
        showSnackbar("Image size too large! Please use images under 2MB for faster uploads.", "warning");
      }
      setFormData(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category) {
      showSnackbar("Please select a category", "error");
      return;
    }

    setUploading(true);
    setUploadProgress(10); // Start progress

    try {
      let imageUrl = formData.imageUrl;

      // Handle Image Upload if new image selected
      if (formData.image) {
        try {
          const storageRef = ref(storage, `crackers/${Date.now()}_${formData.image.name}`);
          setUploadProgress(30);
          const snapshot = await uploadBytes(storageRef, formData.image);
          setUploadProgress(70);
          imageUrl = await getDownloadURL(snapshot.ref);
          setUploadProgress(90);
        } catch (storageErr) {
          console.error("Storage Error:", storageErr);
          throw new Error("Failed to upload image. Please ensure Firebase Storage is enabled in your console.");
        }
      }

      const productDataToSave = {
        name: formData.name,
        price: Number(formData.price),
        netRate: Number(formData.netRate) || 0,
        discount: Number(formData.discount) || 0,
        category: formData.category,
        count: formData.count || "",
        image: imageUrl || "",
        outOfStock: formData.outOfStock || false,
        updatedAt: new Date()
      };

      if (editingProduct) {
        await updateDoc(doc(db, "crackers", editingProduct.id), productDataToSave);
        showSnackbar("Product updated successfully");
      } else {
        // Use normalized stable ID to prevent duplicates
        const stableId = normalizeKey(formData.name, formData.category);
        await setDoc(doc(db, "crackers", stableId), {
          ...productDataToSave,
          createdAt: new Date()
        }, { merge: true });
        showSnackbar("Product added successfully");
      }

      handleCloseDialog();
      fetchProducts();
    } catch (err) {
      console.error("Save Error:", err);
      showSnackbar(err.message || "Failed to save product. Check console for details.", "error");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  // Apply global discount to ALL products based on their netRate
  const applyGlobalDiscount = async () => {
    const discountVal = parseFloat(globalDiscount);
    if (isNaN(discountVal) || discountVal < 0 || discountVal > 100) {
      showSnackbar("Please enter a valid discount between 0 and 100", "error");
      return;
    }
    const eligible = products.filter(p => p.netRate && p.netRate > 0);
    if (eligible.length === 0) {
      showSnackbar("No products with Net Rate found to apply discount", "warning");
      return;
    }
    if (!window.confirm(`Apply ${discountVal}% discount to all ${eligible.length} products? This will update their selling prices in Firestore.`)) return;

    setApplyingDiscount(true);
    try {
      const BATCH_SIZE = 400;
      for (let i = 0; i < eligible.length; i += BATCH_SIZE) {
        const batch = writeBatch(db);
        const chunk = eligible.slice(i, i + BATCH_SIZE);
        chunk.forEach(p => {
          const newPrice = parseFloat((p.netRate * (1 - discountVal / 100)).toFixed(2));
          batch.update(doc(db, "crackers", p.id), {
            price: newPrice,
            discount: discountVal,
            updatedAt: new Date()
          });
        });
        await batch.commit();
      }
      showSnackbar(`${discountVal}% discount applied to ${eligible.length} products!`);
      fetchProducts();
    } catch (err) {
      console.error("Global Discount Error:", err);
      showSnackbar("Failed to apply global discount", "error");
    } finally {
      setApplyingDiscount(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this cracker?")) {
      try {
        await deleteDoc(doc(db, "crackers", id));
        showSnackbar("Product deleted successfully");
        fetchProducts();
      } catch (err) {
        console.error(err);
        showSnackbar("Failed to delete product", "error");
      }
    }
  };

  // One-time utility to wipe the entire crackers collection
  const clearDatabase = async () => {
    if (!window.confirm("CRITICAL WARNING: This will DELETE ALL products from the database. This cannot be undone. Are you sure you want to proceed?")) return;
    if (!window.confirm("Confirming second time: ARE YOU ABSOLUTELY SURE? This will remove all items.")) return;

    setLoading(true);
    try {
      const q = query(collection(db, "crackers"));
      const snapshot = await getDocs(q);
      const docsArr = snapshot.docs;

      console.log(`Deleting ${docsArr.length} documents...`);

      const BATCH_SIZE = 400;
      for (let i = 0; i < docsArr.length; i += BATCH_SIZE) {
        const batch = writeBatch(db);
        const chunk = docsArr.slice(i, i + BATCH_SIZE);
        chunk.forEach(d => {
          batch.delete(doc(db, "crackers", d.id));
        });
        await batch.commit();
      }

      showSnackbar(`Successfully deleted ${docsArr.length} items. Database is now clean.`);
      fetchProducts();
    } catch (err) {
      console.error("Clear Database Error:", err);
      showSnackbar("Failed to clear database: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Utility to remove duplicates (same name and category) while keeping one of each
  const deduplicateDatabase = async () => {
    if (!window.confirm("This will find products with identical Name and Category and keep only ONE copy of each. This is recommended to fix your 1954 items. Proceed?")) return;

    setLoading(true);
    try {
      const q = query(collection(db, "crackers"));
      const snapshot = await getDocs(q);
      const docsArr = snapshot.docs;
      
      const seenKeys = new Map();
      const duplicateIds = [];

      docsArr.forEach(d => {
        const data = d.data();
        const key = normalizeKey(data.name, data.category);
        
        // If we've seen this name+category (normalized) before, mark for deletion
        if (seenKeys.has(key)) {
          duplicateIds.push(d.id);
        } else {
          seenKeys.set(key, d.id);
        }
      });

      console.log(`Found ${duplicateIds.length} duplicates to remove.`);

      if (duplicateIds.length === 0) {
        showSnackbar("No duplicates found. Your database is already clean!");
        setLoading(false);
        return;
      }

      const BATCH_SIZE = 400;
      for (let i = 0; i < duplicateIds.length; i += BATCH_SIZE) {
        const batch = writeBatch(db);
        const chunk = duplicateIds.slice(i, i + BATCH_SIZE);
        chunk.forEach(id => {
          batch.delete(doc(db, "crackers", id));
        });
        await batch.commit();
      }

      showSnackbar(`Successfully deleted ${duplicateIds.length} duplicates. ${seenKeys.size} unique products remain.`);
      fetchProducts();
    } catch (err) {
      console.error("Deduplication Error:", err);
      showSnackbar("Failed to deduplicate: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // One-time utility to sync local productData.js to Firestore (Idempotent)
  const initializeDatabase = async () => {
    const msg = "This will sync all items from local productData.js to Firestore.\n\n" +
      "NOTE: This version is 'Idempotent', meaning it uses fixed IDs. It will update existing items and add new ones without creating duplicates.";
    if (!window.confirm(msg)) return;

    setLoading(true);
    try {
      const allProducts = [];
      productData.forEach(cat => {
        cat.products.forEach(p => {
          allProducts.push({ ...p, category: cat.category });
        });
      });

      console.log(`Total products to sync: ${allProducts.length}`);

      // Create a map of existing products using normalized keys
      const existingProductMap = new Map();
      products.forEach(p => {
        const key = normalizeKey(p.name, p.category);
        existingProductMap.set(key, p.id);
      });

      const BATCH_SIZE = 400;
      for (let i = 0; i < allProducts.length; i += BATCH_SIZE) {
        const batch = writeBatch(db);
        const chunk = allProducts.slice(i, i + BATCH_SIZE);

        chunk.forEach((p) => {
          const key = normalizeKey(p.name, p.category);
          const existingId = existingProductMap.get(key);
          
          const docId = existingId || key;
          const docRef = doc(db, "crackers", docId);

          batch.set(docRef, {
            name: p.name,
            price: Number(p.price) || 0,
            netRate: Number(p.netRate) || 0,
            category: p.category,
            count: p.count || "",
            image: p.image || "",
            updatedAt: new Date(),
          }, { merge: true });
        });

        await batch.commit();
      }

      showSnackbar("Database synchronized successfully!");
      fetchProducts();
    } catch (err) {
      console.error("Initialization Error:", err);
      showSnackbar(`Error: ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
        <CircularProgress color="error" />
      </Box>
    );
  }

  if (!user) {
    return <AdminLogin onLogin={() => setLoading(false)} />;
  }

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar sx={{ bgcolor: colors.primaryRed, color: colors.white }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Admin Panel
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        <ListItem disablePadding>
          <ListItemButton 
            selected={activeTab === "dashboard"}
            onClick={() => { setActiveTab("dashboard"); setMobileOpen(false); }}
            sx={{
              "&.Mui-selected": { bgcolor: "rgba(221, 18, 18, 0.08)" },
              "&:hover": { bgcolor: "rgba(221, 18, 18, 0.04)" }
            }}
          >
            <ListItemIcon>
              <DashboardIcon sx={{ color: activeTab === "dashboard" ? colors.primaryRed : "inherit" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" sx={{ color: activeTab === "dashboard" ? colors.primaryRed : "inherit", fontWeight: activeTab === "dashboard" ? 'bold' : 'normal' }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton 
            selected={activeTab === "categories"}
            onClick={() => { setActiveTab("categories"); setMobileOpen(false); }}
            sx={{
              "&.Mui-selected": { bgcolor: "rgba(221, 18, 18, 0.08)" },
              "&:hover": { bgcolor: "rgba(221, 18, 18, 0.04)" }
            }}
          >
            <ListItemIcon>
              <FormatListNumberedIcon sx={{ color: activeTab === "categories" ? colors.primaryRed : "inherit" }} />
            </ListItemIcon>
            <ListItemText primary="Categories" sx={{ color: activeTab === "categories" ? colors.primaryRed : "inherit", fontWeight: activeTab === "categories" ? 'bold' : 'normal' }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton 
            selected={activeTab === "inventory"}
            onClick={() => { setActiveTab("inventory"); setMobileOpen(false); }}
            sx={{
              "&.Mui-selected": { bgcolor: "rgba(221, 18, 18, 0.08)" },
              "&:hover": { bgcolor: "rgba(221, 18, 18, 0.04)" }
            }}
          >
            <ListItemIcon>
              <InventoryIcon sx={{ color: activeTab === "inventory" ? colors.primaryRed : "inherit" }} />
            </ListItemIcon>
            <ListItemText primary="Products" sx={{ color: activeTab === "inventory" ? colors.primaryRed : "inherit", fontWeight: activeTab === "inventory" ? 'bold' : 'normal' }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton 
            selected={activeTab === "orders"}
            onClick={() => { setActiveTab("orders"); setMobileOpen(false); }}
            sx={{
              "&.Mui-selected": { bgcolor: "rgba(221, 18, 18, 0.08)" },
              "&:hover": { bgcolor: "rgba(221, 18, 18, 0.04)" }
            }}
          >
            <ListItemIcon>
              <ShoppingBagIcon sx={{ color: activeTab === "orders" ? colors.primaryRed : "inherit" }} />
            </ListItemIcon>
            <ListItemText primary="Orders" sx={{ color: activeTab === "orders" ? colors.primaryRed : "inherit", fontWeight: activeTab === "orders" ? 'bold' : 'normal' }} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon color="error" />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: colors.primaryRed }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f4f6f8' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: colors.white,
          color: colors.darkGray,
          boxShadow: 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            {activeTab === "inventory" ? "Products Management" : "Orders Management"}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="admin folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: `1px solid ${colors.gray70}` },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: { xs: 2, sm: 3 }, width: { md: `calc(100% - ${drawerWidth}px)` }, mt: 8, overflowX: "hidden" }}
      >
        {activeTab === "dashboard" ? (
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
              Dashboard Overview
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ bgcolor: '#fff', borderLeft: `6px solid ${colors.primaryRed}`, boxShadow: 3 }}>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>Total Orders</Typography>
                    <Typography variant="h4" fontWeight="bold">{orders.length}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ bgcolor: '#fff', borderLeft: `6px solid #f59e0b`, boxShadow: 3 }}>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>Pending Orders</Typography>
                    <Typography variant="h4" fontWeight="bold">{orders.filter(o => o.status === 'pending').length}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ bgcolor: '#fff', borderLeft: `6px solid #10b981`, boxShadow: 3 }}>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>Completed Orders</Typography>
                    <Typography variant="h4" fontWeight="bold">{orders.filter(o => o.status === 'completed').length}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Card sx={{ bgcolor: '#fff', borderLeft: `6px solid #8b5cf6`, boxShadow: 3 }}>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>Total Revenue (All Orders)</Typography>
                    <Typography variant="h4" fontWeight="bold">
                      ₹{orders.reduce((sum, order) => {
                        let orderTotal = 0;
                        if (order.overallTotal) {
                          orderTotal = Number(order.overallTotal);
                        } else if (order.grandTotal) {
                          orderTotal = Number(order.grandTotal);
                        } else {
                          orderTotal = order.items?.reduce((s, item) => s + (Number(item.amount) || 0), 0) || 0;
                        }
                        return sum + orderTotal;
                      }, 0).toLocaleString('en-IN')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Card sx={{ bgcolor: '#fff', borderLeft: `6px solid #3b82f6`, boxShadow: 3 }}>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>Total Products</Typography>
                    <Typography variant="h4" fontWeight="bold">{products.length}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        ) : activeTab === "categories" ? (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Manage Categories
              </Typography>
              <Button 
                variant="contained" 
                color="success" 
                disabled={!hasUnsavedCategories}
                onClick={async () => {
                  await setDoc(doc(db, "settings", "categories"), { list: categories });
                  setHasUnsavedCategories(false);
                  showSnackbar("Category order saved successfully!");
                }}
              >
                Save Changes
              </Button>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
              <TextField 
                fullWidth 
                size="small" 
                label="New Category Name" 
                value={newCategoryName} 
                onChange={(e) => setNewCategoryName(e.target.value)} 
              />
              <Button variant="contained" color="primary" onClick={async () => {
                if (!newCategoryName.trim()) return;
                const upperName = newCategoryName.trim().toUpperCase();
                if (categories.includes(upperName)) {
                  showSnackbar("Category already exists", "error");
                  return;
                }
                const newCats = [...categories, upperName];
                setCategories(newCats);
                setNewCategoryName("");
                setHasUnsavedCategories(true);
                showSnackbar("Category added. Don't forget to save!");
              }}>Add Category</Button>
            </Box>
            
            <List>
              {categories.map((cat, idx) => (
                <ListItem 
                  key={cat} 
                  draggable
                  onDragStart={(e) => {
                    setDraggedItemIdx(idx);
                    e.dataTransfer.effectAllowed = "move";
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = "move";
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (draggedItemIdx === null || draggedItemIdx === idx) return;
                    const newCats = [...categories];
                    const item = newCats.splice(draggedItemIdx, 1)[0];
                    newCats.splice(idx, 0, item);
                    setCategories(newCats);
                    setDraggedItemIdx(null);
                    setHasUnsavedCategories(true);
                  }}
                  sx={{ 
                    border: '1px solid #ddd', 
                    mb: 1, 
                    borderRadius: 1, 
                    bgcolor: '#fff',
                    cursor: 'grab',
                    '&:active': { cursor: 'grabbing' },
                    opacity: draggedItemIdx === idx ? 0.5 : 1
                  }}
                >
                  <DragIndicatorIcon sx={{ color: '#aaa', mr: 2 }} />
                  {editingCategoryIdx === idx ? (
                    <TextField
                      size="small"
                      autoFocus
                      value={editingCategoryName}
                      onChange={(e) => setEditingCategoryName(e.target.value)}
                      onKeyDown={async (e) => {
                        if (e.key === "Enter") {
                          const newName = editingCategoryName.trim().toUpperCase();
                          if (!newName || newName === cat) {
                            setEditingCategoryIdx(null);
                            return;
                          }
                          if (categories.includes(newName)) {
                            showSnackbar("Category already exists", "error");
                            return;
                          }
                          
                          setEditingCategoryIdx(null);
                          
                          // Update array
                          const newCats = [...categories];
                          newCats[idx] = newName;
                          setCategories(newCats);
                          // We always save immediately on a rename because it affects products
                          await setDoc(doc(db, "settings", "categories"), { list: newCats });

                          // Batch update products
                          const q = query(collection(db, "crackers"));
                          const snapshot = await getDocs(q);
                          const batch = writeBatch(db);
                          let updatedCount = 0;
                          snapshot.docs.forEach((docSnap) => {
                            const data = docSnap.data();
                            if (data.category === cat || getDisplayCategory(data) === cat) {
                              batch.update(docSnap.ref, { category: newName });
                              updatedCount++;
                            }
                          });
                          if (updatedCount > 0) {
                            await batch.commit();
                            fetchProducts(newCats);
                            showSnackbar(`Renamed category and updated ${updatedCount} products!`);
                          } else {
                            showSnackbar("Category renamed!");
                          }
                        }
                        if (e.key === "Escape") {
                          setEditingCategoryIdx(null);
                        }
                      }}
                      onBlur={() => setEditingCategoryIdx(null)}
                      sx={{ flexGrow: 1, mr: 2 }}
                    />
                  ) : (
                    <ListItemText primary={<Typography fontWeight="bold">{idx + 1}. {cat}</Typography>} />
                  )}
                  <Stack direction="row">
                    <IconButton 
                      size="small"
                      color="primary"
                      onClick={() => {
                        setEditingCategoryIdx(idx);
                        setEditingCategoryName(cat);
                      }}
                    ><EditIcon /></IconButton>
                    <IconButton 
                      size="small"
                      color="error"
                      onClick={() => {
                        if (!window.confirm(`Delete category "${cat}"? Products in this category will not be deleted, but may show under "Other".`)) return;
                        const newCats = categories.filter((_, i) => i !== idx);
                        setCategories(newCats);
                        setHasUnsavedCategories(true);
                      }}
                    ><DeleteIcon /></IconButton>
                    <IconButton 
                      disabled={idx === 0} 
                      onClick={() => {
                        const newCats = [...categories];
                        [newCats[idx - 1], newCats[idx]] = [newCats[idx], newCats[idx - 1]];
                        setCategories(newCats);
                        setHasUnsavedCategories(true);
                      }}
                    ><ArrowUpwardIcon /></IconButton>
                    <IconButton 
                      disabled={idx === categories.length - 1} 
                      onClick={() => {
                        const newCats = [...categories];
                        [newCats[idx + 1], newCats[idx]] = [newCats[idx], newCats[idx + 1]];
                        setCategories(newCats);
                        setHasUnsavedCategories(true);
                      }}
                    ><ArrowDownwardIcon /></IconButton>
                  </Stack>
                </ListItem>
              ))}
            </List>
          </Box>
        ) : activeTab === "inventory" ? (
          <>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
              <Button variant="contained" color="secondary" onClick={updatePricesFromPDF} size="small">
                Update Prices from PDF
              </Button>
              <Button variant="outlined" color="error" size="small" startIcon={<DeleteSweepIcon />} onClick={clearDatabase}>
                Clear All
              </Button>
              <Button variant="outlined" color="info" size="small" startIcon={<DeleteSweepIcon />} onClick={deduplicateDatabase}>
                {isMobile ? "Clean" : "Deduplicate"}
              </Button>
              <Button variant="outlined" color="warning" size="small" startIcon={<RefreshIcon />} onClick={initializeDatabase}>
                Sync
              </Button>
              <Button variant="outlined" color="primary" size="small" startIcon={<FormatListNumberedIcon />} onClick={() => setActiveTab("categories")}>
                Categories
              </Button>
              <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={() => handleOpenDialog()} sx={{ bgcolor: colors.primaryRed, "&:hover": { bgcolor: colors.darkRed }, ml: "auto" }}>
                Add Product
              </Button>
            </Box>
          {/* Global Discount Panel */}
          <Paper
            elevation={2}
            sx={{
              mb: 3,
              p: 2,
              borderRadius: 2,
              border: `2px solid ${colors.primaryRed}`,
              background: "linear-gradient(135deg, #fff5f5 0%, #fff 100%)",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2
            }}
          >
            <LocalOfferIcon sx={{ color: colors.primaryRed, fontSize: "2rem" }} />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: colors.primaryRed, lineHeight: 1 }}>
                Global Discount
              </Typography>
              <Typography variant="caption" sx={{ color: "#666" }}>
                Apply one discount % to all products (recalculates price from Net Rate)
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, ml: "auto", flexWrap: "wrap" }}>
              <TextField
                label="Discount %"
                type="number"
                size="small"
                value={globalDiscount}
                onChange={e => setGlobalDiscount(e.target.value)}
                InputProps={{
                  inputProps: { min: 0, max: 100 },
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  sx: { bgcolor: "white" }
                }}
                sx={{ width: 140 }}
                placeholder="e.g. 90"
              />
              {globalDiscount && !isNaN(parseFloat(globalDiscount)) && (
                <Chip
                  label={`Price = Net Rate × ${(100 - parseFloat(globalDiscount)).toFixed(0)}%`}
                  size="small"
                  sx={{ bgcolor: "#e8f5e9", color: "#2e7d32", fontWeight: "bold" }}
                />
              )}
              <Tooltip title={`Apply ${globalDiscount || "??"}% discount to ALL ${products.length} products`}>
                <span>
                  <Button
                    variant="contained"
                    onClick={applyGlobalDiscount}
                    disabled={applyingDiscount || !globalDiscount}
                    startIcon={applyingDiscount ? <CircularProgress size={16} color="inherit" /> : <LocalOfferIcon />}
                    sx={{
                      bgcolor: colors.primaryRed,
                      "&:hover": { bgcolor: colors.darkRed },
                      fontWeight: "bold",
                      minWidth: 130
                    }}
                  >
                    {applyingDiscount ? "Applying..." : "Apply to All"}
                  </Button>
                </span>
              </Tooltip>
            </Box>
          </Paper>

          {isTablet ? (
            /* Mobile Card View */
            <Grid container spacing={2}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} key={product.id}>
                  <Card sx={{ 
                    borderRadius: 3, 
                    overflow: 'hidden', 
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    border: "1px solid #eee",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "translateY(-4px)" }
                  }}>
                    <Box sx={{ position: 'relative', pt: '60%', bgcolor: '#f5f5f5' }}>
                      <Box
                        component="img"
                        src={product.image}
                        sx={{ 
                          position: 'absolute', 
                          top: 0, 
                          left: 0, 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'contain',
                          p: 1
                        }}
                      />
                      <Chip 
                        label={product.displayCategory || product.category} 
                        size="small" 
                        sx={{ 
                          position: 'absolute', 
                          top: 10, 
                          left: 10, 
                          bgcolor: 'rgba(255,255,255,0.9)',
                          backdropFilter: 'blur(4px)',
                          fontWeight: 'bold',
                          color: colors.primaryRed,
                          border: `1px solid ${colors.primaryRed}`
                        }} 
                      />
                    </Box>
                    <CardContent sx={{ pb: '16px !important' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, height: '2.4em', overflow: 'hidden' }}>
                        {product.name}
                      </Typography>
                      
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary">Net Rate</Typography>
                          <Typography sx={{ fontWeight: 'bold' }}>₹{product.netRate || "—"}</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="caption" color="text.secondary">Selling Price</Typography>
                          <Typography sx={{ fontWeight: 'bold', color: colors.primaryRed, fontSize: '1.1rem' }}>₹{product.price}</Typography>
                        </Box>
                      </Stack>

                      <Divider sx={{ mb: 2 }} />
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {product.discount ? (
                          <Chip 
                            label={`${product.discount}% OFF`} 
                            color="success" 
                            size="small" 
                            sx={{ fontWeight: 'bold', borderRadius: 1 }} 
                          />
                        ) : <Box />}
                        
                        <Box>
                          <IconButton size="small" color="primary" onClick={() => handleOpenDialog(product)} sx={{ mr: 1, bgcolor: '#e3f2fd' }}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="error" onClick={() => handleDelete(product.id)} sx={{ bgcolor: '#ffebee' }}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              {products.length === 0 && (
                <Grid item xs={12}>
                  <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3, border: '2px dashed #ccc' }}>
                    <Typography color="text.secondary">No products found. Start by adding one!</Typography>
                  </Paper>
                </Grid>
              )}
            </Grid>
          ) : (
            /* Desktop Table View */
            <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
              <Table>
                <TableHead sx={{ bgcolor: colors.warningYellow }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Image</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Net Rate</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Discount %</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id} hover>
                      <TableCell>
                        <Box
                          component="img"
                          src={product.image}
                          sx={{ width: 50, height: 50, objectFit: "contain", borderRadius: 1 }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'medium' }}>{product.name}</TableCell>
                      <TableCell>
                        <Chip label={product.displayCategory || product.category} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell>₹{product.netRate || "—"}</TableCell>
                      <TableCell>
                        {product.discount ? (
                          <Box
                            sx={{
                              display: "inline-block",
                              bgcolor: "#e8f5e9",
                              color: "#2e7d32",
                              fontWeight: "bold",
                              px: 1,
                              py: 0.3,
                              borderRadius: 1,
                              fontSize: "0.85rem"
                            }}
                          >
                            {product.discount}% OFF
                          </Box>
                        ) : "—"}
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: colors.primaryRed }}>₹{product.price}</TableCell>
                      <TableCell>
                        <Tooltip title="Edit Product">
                          <IconButton color="primary" onClick={() => handleOpenDialog(product)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Product">
                          <IconButton color="error" onClick={() => handleDelete(product.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      ) : (
        /* Orders View */
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Recent Orders
            </Typography>
            <Button startIcon={<RefreshIcon />} onClick={fetchOrders} disabled={fetchingOrders}>
              Refresh
            </Button>
          </Box>
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2, borderLeft: '5px solid #3b82f6', borderRadius: 2, bgcolor: '#f8fafc', boxShadow: 1 }}>
                <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">Total Orders</Typography>
                <Typography variant="h5" fontWeight="bold">{orders.length}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2, borderLeft: '5px solid #f59e0b', borderRadius: 2, bgcolor: '#fffbeb', boxShadow: 1 }}>
                <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">Total Billed Amount</Typography>
                <Typography variant="h5" fontWeight="bold">
                  ₹{orders.reduce((sum, o) => {
                    let orderTotal = 0;
                    if (o.overallTotal) {
                      orderTotal = Number(o.overallTotal);
                    } else if (o.grandTotal) {
                      orderTotal = Number(o.grandTotal);
                    } else {
                      orderTotal = o.items?.reduce((s, item) => s + (Number(item.amount) || 0), 0) || 0;
                    }
                    return sum + orderTotal;
                  }, 0).toLocaleString('en-IN')}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2, borderLeft: '5px solid #22c55e', borderRadius: 2, bgcolor: '#f0fdf4', boxShadow: 1 }}>
                <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">Total Amount Received</Typography>
                <Typography variant="h5" fontWeight="bold" sx={{ color: '#15803d' }}>
                  ₹{orders.reduce((sum, o) => sum + (Number(o.amountReceived) || 0), 0).toLocaleString('en-IN')}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          
          {fetchingOrders ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}>
              <CircularProgress color="error" />
            </Box>
          ) : orders.length === 0 ? (
            <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 3, border: '1px dashed #ccc' }}>
              <Typography color="text.secondary">No orders received yet.</Typography>
            </Paper>
          ) : (
            <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 3 }}>
              <Table>
                <TableHead sx={{ bgcolor: '#ffffff', borderBottom: '2px solid #444' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', color: '#334155', borderRight: '1px solid #ccc', py: 2 }}>SL.</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#334155', borderRight: '1px solid #ccc' }}>Customer Details</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#334155', borderRight: '1px solid #ccc' }}>Product Details</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#334155', borderRight: '1px solid #ccc' }}>Paid Amount</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#334155', borderRight: '1px solid #ccc' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#334155', textAlign: 'center' }}>Action</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#334155', textAlign: 'center' }}>Select</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order, index) => {
                    const orderNo = orders.length - index; 
                    const orderId = order.orderId || order.id?.slice(-6).toUpperCase() || "N/A";
                    const orderDate = order.createdAt?.toDate ? order.createdAt.toDate().toLocaleString() : "N/A";
                    const customerName = order.clientInfo?.name || "N/A";
                    const customerEmail = order.clientInfo?.email || "N/A";
                    const customerPhone = order.clientInfo?.phone || "N/A";
                    const customerAddress = order.clientInfo?.address || "N/A";
                    const paidAmount = order.overallTotal || order.grandTotal || 0;
                    
                    const handlePrint = () => {
                      printInvoice(order);
                    };

                    const handleSendMessage = () => {
                       const phone = (customerPhone || "").replace(/\D/g, "");
                       const message = encodeURIComponent(`Hi ${customerName}, this is regarding your order on Sri Padmavathi Crackers.`);
                       window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
                    };
                    
                    return (
                    <TableRow key={order.id} sx={{ bgcolor: '#e6edd8', '&:nth-of-type(odd)': { bgcolor: '#e6edd8' } }}>
                      <TableCell sx={{ borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc', verticalAlign: 'top', color: '#1e293b' }}>
                        {index + 1}
                      </TableCell>
                      <TableCell sx={{ borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc', verticalAlign: 'top', minWidth: 260, color: '#1e293b' }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '0.8rem', mb: 0.5 }}>Order No: <Box component="span" sx={{ fontWeight: 'normal' }}>{orderNo}</Box></Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '0.8rem', mb: 0.5 }}>Order Id: <Box component="span" sx={{ fontWeight: 'normal' }}>{orderId}</Box></Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '0.8rem', mb: 0.5 }}>Date: <Box component="span" sx={{ fontWeight: 'normal' }}>{orderDate}</Box></Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '0.8rem', mb: 0.5 }}>Name: <Box component="span" sx={{ fontWeight: 'normal' }}>{customerName}</Box></Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '0.8rem', mb: 0.5 }}>Email: <Box component="span" sx={{ fontWeight: 'normal' }}>{customerEmail}</Box></Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '0.8rem', mb: 0.5 }}>Phone: <Box component="span" sx={{ fontWeight: 'normal' }}>{customerPhone}</Box></Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '0.8rem' }}>Address:</Typography>
                        <Typography variant="body2" sx={{ fontSize: '0.8rem', mb: 1 }}>{customerAddress}</Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                          <Button 
                            variant="contained" 
                            fullWidth
                            size="small" 
                            sx={{ bgcolor: '#f97316', '&:hover': { bgcolor: '#ea580c' }, textTransform: 'none', fontWeight: 'bold', borderRadius: 1 }}
                            onClick={handleSendMessage}
                          >
                            WhatsApp
                          </Button>
                        </Box>
                        <TextField 
                          size="small" 
                          fullWidth 
                          label="Amount Received (₹)"
                          type="number"
                          defaultValue={order.amountReceived || ""}
                          onBlur={async (e) => {
                            const val = e.target.value;
                            if (val !== String(order.amountReceived || "")) {
                              try {
                                await updateDoc(doc(db, "orders", order.id), { amountReceived: Number(val) });
                                setOrders(prev => prev.map(o => o.id === order.id ? {...o, amountReceived: Number(val)} : o));
                              } catch (err) {
                                console.error(err);
                                alert("Failed to save received amount");
                              }
                            }
                          }}
                          sx={{ mt: 1, bgcolor: '#fff' }}
                        />
                      </TableCell>
                      <TableCell sx={{ borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc', verticalAlign: 'top', textAlign: 'center' }}>
                        <Button 
                          variant="contained" 
                          size="small" 
                          sx={{ bgcolor: '#f97316', '&:hover': { bgcolor: '#ea580c' }, textTransform: 'none', fontWeight: 'bold', borderRadius: 1, minWidth: 60, lineHeight: 1.2, py: 1 }}
                          onClick={() => setSelectedOrder(order)}
                        >
                          Full<br/>View
                        </Button>
                      </TableCell>
                      <TableCell sx={{ borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc', verticalAlign: 'top', color: '#1e293b' }}>
                        ₹{paidAmount}
                      </TableCell>
                      <TableCell sx={{ borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc', verticalAlign: 'top' }}>
                        <Typography sx={{ color: order.status === 'completed' ? '#22c55e' : '#ef4444', fontWeight: 'bold', fontSize: '0.9rem', mb: 1 }}>
                          {order.status === 'completed' ? 'Completed' : 'Pending'}
                        </Typography>
                        <Stack spacing={1}>
                        {order.status !== 'completed' ? (
                          <Button 
                            variant="contained" 
                            size="small" 
                            sx={{ bgcolor: '#22c55e', '&:hover': { bgcolor: '#16a34a' }, textTransform: 'none', fontSize: '0.75rem', fontWeight: 'bold', borderRadius: 1, px: 1, py: 0.2 }}
                            onClick={() => updateOrderStatus(order.id, 'completed')}
                          >
                            Mark Paid
                          </Button>
                        ) : (
                          <Button 
                            variant="contained" 
                            size="small" 
                            sx={{ bgcolor: '#f97316', '&:hover': { bgcolor: '#ea580c' }, textTransform: 'none', fontSize: '0.75rem', fontWeight: 'bold', borderRadius: 1, px: 1, py: 0.2 }}
                            onClick={() => updateOrderStatus(order.id, 'pending')}
                          >
                            Mark Unpaid
                          </Button>
                        )}
                        </Stack>
                      </TableCell>

                      <TableCell sx={{ borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc', verticalAlign: 'top', textAlign: 'center' }}>
                        <Stack spacing={1} alignItems="center">
                          <Button 
                            variant="contained" 
                            size="small" 
                            sx={{ bgcolor: '#3b82f6', '&:hover': { bgcolor: '#2563eb' }, textTransform: 'none', fontWeight: 'bold', borderRadius: 1, minWidth: 80 }}
                            startIcon={<PrintIcon fontSize="small" />}
                            onClick={handlePrint}
                          >
                            Print
                          </Button>
                          <Button 
                            variant="contained" 
                            color="error" 
                            size="small" 
                            sx={{ textTransform: 'none', fontWeight: 'bold', borderRadius: 1, minWidth: 80, bgcolor: '#ef4444', '&:hover': { bgcolor: '#dc2626' } }}
                            startIcon={<DeleteIcon fontSize="small" />}
                            onClick={() => handleDeleteOrder(order.id)}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #ccc', verticalAlign: 'top', textAlign: 'center' }}>
                        <input type="checkbox" style={{ transform: 'scale(1.3)', cursor: 'pointer', accentColor: '#22c55e' }} />
                      </TableCell>
                    </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}
      </Box>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold" }}>
          {editingProduct ? "Edit Cracker" : "Add New Cracker"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Product Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Net Rate / MRP (₹)"
                  name="netRate"
                  type="number"
                  value={formData.netRate}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Discount (%)"
                  name="discount"
                  type="number"
                  value={formData.discount}
                  onChange={handleInputChange}
                  InputProps={{ inputProps: { min: 0, max: 100 } }}
                  helperText={formData.netRate && formData.discount ? `Selling price: ₹${parseFloat((Number(formData.netRate) * (1 - Number(formData.discount) / 100)).toFixed(2))}` : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Selling Price (₹)"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  helperText="Auto-calculated from Net Rate & Discount. You can also set it manually."
                  InputProps={{
                    sx: { bgcolor: formData.discount ? "#f0fff4" : "transparent" }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    label="Category"
                    onChange={handleInputChange}
                  >
                    {categories.map(cat => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Count (e.g. 1 box (10 pcs))"
                  name="count"
                  value={formData.count}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.outOfStock}
                      onChange={(e) => setFormData(prev => ({ ...prev, outOfStock: e.target.checked }))}
                      color="error"
                    />
                  }
                  label="Out of Stock (Hide from customers)"
                  sx={{ mt: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Product Image
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    size="small"
                    sx={{ color: colors.primaryRed, borderColor: colors.primaryRed }}
                  >
                    Choose Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Button>
                  {(imagePreview || formData.imageUrl) && (
                    <Box sx={{ position: 'relative' }}>
                      <img
                        src={imagePreview || formData.imageUrl}
                        alt="preview"
                        style={{ height: 60, width: 60, objectFit: 'cover', borderRadius: 4, border: `1px solid ${colors.gray70}` }}
                      />
                      <Typography variant="caption" sx={{ display: 'block', textAlign: 'center' }}>
                        {imagePreview ? 'New' : 'Current'}
                      </Typography>
                    </Box>
                  )}
                </Box>
                {uploading && (
                  <Box sx={{ width: '100%', mt: 1 }}>
                    <CircularProgress variant="determinate" value={uploadProgress} size={24} sx={{ color: colors.primaryRed }} />
                    <Typography variant="caption" sx={{ ml: 1 }}>Uploading image... {uploadProgress}%</Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={uploading}
              sx={{ bgcolor: colors.primaryRed, "&:hover": { bgcolor: colors.darkRed } }}
            >
              {uploading ? <CircularProgress size={24} color="inherit" /> : "Save Product"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onClose={() => setSelectedOrder(null)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ 
          bgcolor: colors.primaryRed, 
          color: 'white', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <Typography variant="h6">Order Details</Typography>
          <IconButton onClick={() => setSelectedOrder(null)} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          {selectedOrder && (
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom color="primary">Customer Information</Typography>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: '#fcfcfc' }}>
                  <Typography variant="body1"><strong>Order ID:</strong> {selectedOrder.orderId || selectedOrder.id}</Typography>
                  <Typography variant="body1"><strong>Name:</strong> {selectedOrder.clientInfo?.name}</Typography>
                  <Typography variant="body1"><strong>Phone:</strong> {selectedOrder.clientInfo?.phone}</Typography>
                  <Typography variant="body1"><strong>Email:</strong> {selectedOrder.clientInfo?.email}</Typography>
                  <Typography variant="body1"><strong>Address:</strong> {selectedOrder.clientInfo?.address}</Typography>
                  <Typography variant="body1"><strong>State:</strong> {selectedOrder.state}</Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                    <strong>Ordered On:</strong> {selectedOrder.createdAt?.toDate ? selectedOrder.createdAt.toDate().toLocaleString() : "N/A"}
                  </Typography>
                </Paper>

                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom color="primary">Update Status</Typography>
                  <Stack direction="row" spacing={2}>
                    <Button 
                      variant={selectedOrder.status === "pending" ? "contained" : "outlined"} 
                      color="warning"
                      onClick={() => updateOrderStatus(selectedOrder.id, "pending")}
                      size="small"
                    >
                      Pending
                    </Button>
                    <Button 
                      variant={selectedOrder.status === "completed" ? "contained" : "outlined"} 
                      color="success"
                      onClick={() => updateOrderStatus(selectedOrder.id, "completed")}
                      size="small"
                    >
                      Completed
                    </Button>
                  </Stack>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6" color="primary">Order Items</Typography>
                  {!editingOrderItems ? (
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      size="small" 
                      onClick={() => {
                        setEditableItems(JSON.parse(JSON.stringify(selectedOrder.items || [])));
                        setEditingOrderItems(true);
                      }}
                    >
                      Edit Order Items
                    </Button>
                  ) : (
                    <Stack direction="row" spacing={1}>
                      <Button variant="contained" color="success" size="small" onClick={saveOrderItems}>
                        Save Changes
                      </Button>
                      <Button variant="text" color="error" size="small" onClick={() => setEditingOrderItems(false)}>
                        Cancel
                      </Button>
                    </Stack>
                  )}
                </Box>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead sx={{ bgcolor: '#eee' }}>
                      <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell align="center">Qty</TableCell>
                        <TableCell align="right">Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(editingOrderItems ? editableItems : selectedOrder.items)?.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell align="center">
                            {editingOrderItems ? (
                              <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                                <IconButton 
                                  size="small" 
                                  color="error" 
                                  onClick={() => handleItemQuantityChange(idx, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  sx={{ p: 0.5 }}
                                >
                                  <Box component="span" sx={{ fontSize: '1.2rem', lineHeight: 1 }}>-</Box>
                                </IconButton>
                                <Typography sx={{ minWidth: 20, textAlign: 'center', fontWeight: 'bold' }}>
                                  {item.quantity}
                                </Typography>
                                <IconButton 
                                  size="small" 
                                  color="success" 
                                  onClick={() => handleItemQuantityChange(idx, item.quantity + 1)}
                                  sx={{ p: 0.5 }}
                                >
                                  <Box component="span" sx={{ fontSize: '1.2rem', lineHeight: 1 }}>+</Box>
                                </IconButton>
                              </Stack>
                            ) : (
                              item.quantity
                            )}
                          </TableCell>
                          <TableCell align="right">₹{item.amount}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow sx={{ bgcolor: '#fffde7' }}>
                        <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>Grand Total</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: colors.primaryRed, fontSize: '1.1rem' }}>
                          ₹{editingOrderItems 
                              ? editableItems.reduce((sum, item) => sum + (Number(item.amount) || 0), 0)
                              : selectedOrder.grandTotal}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedOrder(null)}>Close</Button>
          <Button 
            variant="contained" 
            startIcon={<WhatsAppIcon />}
            sx={{ bgcolor: '#25D366', "&:hover": { bgcolor: '#128C7E' } }}
            onClick={() => {
              const customerName = selectedOrder.clientInfo?.name || "Customer";
              const customerPhone = (selectedOrder.clientInfo?.phone || "").replace(/\D/g, "");
              const message = encodeURIComponent(`Hi ${customerName}, this is regarding your order on Sri Padmavathi Crackers. Status: ${selectedOrder.status.toUpperCase()}`);
              window.open(`https://wa.me/${customerPhone}?text=${message}`, "_blank");
            }}
          >
            WhatsApp Customer
          </Button>
        </DialogActions>
      </Dialog>



      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminPage;
