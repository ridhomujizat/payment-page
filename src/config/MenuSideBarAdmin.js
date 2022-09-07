import LocalMallIcon from "@mui/icons-material/LocalMall";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
const Menu = [
  {
    title: "General",
    list: [
      { label: "Order", icon: LocalMallIcon, path: "/order-list" },
      { label: "Shipping", icon: LocalShippingIcon , path: "/shipping" },
      { label: "Payment", icon: AccountBalanceWalletIcon , path: "/payment-list" }
    ],
  },
  {
    title: "Report",
    list: [
      { label: "Payment History", icon: ReceiptIcon, path: "/payment-history" },
    ],
  },
];

export default Menu