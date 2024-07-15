import {
  LayoutDashboard,
  ShoppingBasket,
  ShoppingCart,
  Truck,
} from "lucide-react";

export const navLinksData = [
  {
    name: "dashboard",
    url: "/",
    icon: <LayoutDashboard size={16} />,
  },
  {
    name: "products",
    url: "/product",
    icon: <ShoppingBasket size={16} />,
  },
  {
    name: "orders",
    url: "/order",
    icon: <ShoppingCart size={16} />,
  },
  {
    name: "suppliers",
    url: "/supplier",
    icon: <Truck size={16} />,
  },
];

export const categoryData = [
  {
    name: "all",
    icon: "👗",
    url: "/product",
  },
  {
    name: "clothing",
    icon: "👚",
    url: "/product/clothing",
  },
  {
    name: "accessories",
    icon: "💍",
    url: "/product/accessories",
  },
  {
    name: "footwear",
    icon: "👠",
    url: "/product/footwear",
  },
  {
    name: "jewelry",
    icon: "💎",
    url: "/product/jewelry",
  },
];
