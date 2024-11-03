//  =============================== ADMIN ROUTE ============================== //
import AdminMasterLayout from "../components/admin/layouts/AdminMasterLayout";
import AdminHome from "../components/admin/pages/home/AdminHome";
import LogIndex from "../components/admin/pages/log/Index";
import SubscriptionIndex from "../components/admin/pages/subscription/Index";
import OrderIndex from "../components/admin/pages/order/Index";
import OrderEdit from "../components/admin/pages/order/Edit";
import OrderDetail from "../components/admin/pages/order/Detail";
import OrderDetails from "../components/admin/pages/order/Details";

import CategoryIndex from "../components/admin/pages/category/Index";
import CategoryCreate from "../components/admin/pages/category/Create";
import CategoryEdit from "../components/admin/pages/category/Edit";

import BannerIndex from "../components/admin/pages/banner/Index";
import BannerCreate from "../components/admin/pages/banner/Create";
import BannerEdit from "../components/admin/pages/banner/Edit";

import NotifyIndex from "../components/admin/pages/notify/Index";
import NotifyCreate from "../components/admin/pages/notify/Create";
import NotifyEdit from "../components/admin/pages/notify/Edit";

import BlogIndex from "../components/admin/pages/blog/Index";
import BlogCreate from "../components/admin/pages/blog/Create";
import BlogEdit from "../components/admin/pages/blog/Edit";
import BlogComment from "../components/admin/pages/blog/BlogComment";

import ProductIndex from "../components/admin/pages/product/Index";
import ProductCreate from "../components/admin/pages/product/Create";
import ProductEdit from "../components/admin/pages/product/Edit";
import ProductComment from "../components/admin/pages/product/Comments";

import ProductImageIndex from "../components/admin/pages/productImage/Index";
import ProductImageCreate from "../components/admin/pages/productImage/Create";
import ProductImageEdit from "../components/admin/pages/productImage/Edit";

import ProductAttributeIndex from "../components/admin/pages/productAttribute/Index";
import ProductAttributeCreate from "../components/admin/pages/productAttribute/Create";
import ProductAttributeEdit from "../components/admin/pages/productAttribute/Edit";

import AccountIndex from "../components/admin/pages/account/Index";
import AccountCreate from "../components/admin/pages/account/Create";
import AccountEdit from "../components/admin/pages/account/Edit";

import RoleIndex from "../components/admin/pages/role/Index";
import RoleCreate from "../components/admin/pages/role/Create";
import RoleEdit from "../components/admin/pages/role/Edit";

import UserRoleIndex from "../components/admin/pages/userRole/Index";
import UserRoleCreate from "../components/admin/pages/userRole/Create";
import UserRoleEdit from "../components/admin/pages/userRole/Edit";

//  =============================== USER ROUTE ============================== //
import Login from "../components/user/pages/auth/Login";
import Register from "../components/user/pages/auth/Register";
import Forgot from "../components/user/pages/auth/ForgotPassword";
import Profile from "../components/user/pages/auth/Profile";
import ChangePass from "../components/user/pages/auth/ChangePassword";

import UserMasterLayout from "../components/user/layouts/UserMasterLayout";
import Home from "../components/user/pages/home/Home";
import Shop from "../components/user/pages/shop/Shop";
import Contact from "../components/user/pages/contact/Contact";
import Faq from "../components/user/pages/faq/Faq";
import Blog from "../components/user/pages/blog/Blog";
import Detail from "../components/user/pages/detail/Detail";
import Cart from "../components/user/pages/cart/Cart";
import Checkout from "../components/user/pages/checkout/Checkout";
import OrderSuccess from "../components/user/pages/utils/OrderSuccess";

export const adminRoutes = [
  {
    path: "/admin/*",
    element: <AdminMasterLayout child={<AdminHome />} />,
  },
  {
    path: "/admin",
    element: <AdminMasterLayout child={<AdminHome />} />,
  },
  {
    path: "admin/log",
    element: <AdminMasterLayout child={<LogIndex />} />,
  },
  {
    path: "admin/subscription",
    element: <AdminMasterLayout child={<SubscriptionIndex />} />,
  },
  {
    path: "admin/order",
    element: <AdminMasterLayout child={<OrderIndex />} />,
  },
  {
    path: "admin/order/detail/:id",
    element: <AdminMasterLayout child={<OrderDetail />} />,
  },
  {
    path: "admin/order/list-detail/:id",
    element: <AdminMasterLayout child={<OrderDetails />} />,
  },
  {
    path: "admin/order/edit/:id",
    element: <AdminMasterLayout child={<OrderEdit />} />,
  },
  {
    path: "admin/category",
    element: <AdminMasterLayout child={<CategoryIndex />} />,
  },
  {
    path: "admin/category/create",
    element: <AdminMasterLayout child={<CategoryCreate />} />,
  },
  {
    path: "admin/category/edit/:id",
    element: <AdminMasterLayout child={<CategoryEdit />} />,
  },
  {
    path: "admin/banner",
    element: <AdminMasterLayout child={<BannerIndex />} />,
  },
  {
    path: "admin/banner/create",
    element: <AdminMasterLayout child={<BannerCreate />} />,
  },
  {
    path: "admin/banner/edit/:id",
    element: <AdminMasterLayout child={<BannerEdit />} />,
  },
  {
    path: "admin/notify",
    element: <AdminMasterLayout child={<NotifyIndex />} />,
  },
  {
    path: "admin/notify/create",
    element: <AdminMasterLayout child={<NotifyCreate />} />,
  },
  {
    path: "admin/notify/edit/:id",
    element: <AdminMasterLayout child={<NotifyEdit />} />,
  },
  {
    path: "admin/blog",
    element: <AdminMasterLayout child={<BlogIndex />} />,
  },
  {
    path: "admin/blog/create",
    element: <AdminMasterLayout child={<BlogCreate />} />,
  },
  {
    path: "admin/blog/edit/:id",
    element: <AdminMasterLayout child={<BlogEdit />} />,
  },
  {
    path: "admin/blog/comment/:id",
    element: <AdminMasterLayout child={<BlogComment />} />,
  },
  {
    path: "admin/product",
    element: <AdminMasterLayout child={<ProductIndex />} />,
  },
  {
    path: "admin/product/create",
    element: <AdminMasterLayout child={<ProductCreate />} />,
  },
  {
    path: "admin/product/edit/:id",
    element: <AdminMasterLayout child={<ProductEdit />} />,
  },
  {
    path: "admin/product/comment/:id",
    element: <AdminMasterLayout child={<ProductComment />} />,
  },
  {
    path: "admin/product/image/:id",
    element: <AdminMasterLayout child={<ProductImageIndex />} />,
  },
  {
    path: "admin/product/image/create/:id",
    element: <AdminMasterLayout child={<ProductImageCreate />} />,
  },
  {
    path: "admin/product/image/edit/:productId/:imageId",
    element: <AdminMasterLayout child={<ProductImageEdit />} />,
  },
  {
    path: "admin/product/attribute/:id",
    element: <AdminMasterLayout child={<ProductAttributeIndex />} />,
  },
  {
    path: "admin/product/attribute/create/:id",
    element: <AdminMasterLayout child={<ProductAttributeCreate />} />,
  },
  {
    path: "admin/product/attribute/edit/:productId/:attributeId",
    element: <AdminMasterLayout child={<ProductAttributeEdit />} />,
  },
  {
    path: "admin/account",
    element: <AdminMasterLayout child={<AccountIndex />} />,
  },
  {
    path: "admin/account/create",
    element: <AdminMasterLayout child={<AccountCreate />} />,
  },
  {
    path: "admin/account/edit/:id",
    element: <AdminMasterLayout child={<AccountEdit />} />,
  },
  {
    path: "admin/role",
    element: <AdminMasterLayout child={<RoleIndex />} />,
  },
  {
    path: "admin/role/create",
    element: <AdminMasterLayout child={<RoleCreate />} />,
  },
  {
    path: "admin/role/edit/:id",
    element: <AdminMasterLayout child={<RoleEdit />} />,
  },
  {
    path: "admin/user-role",
    element: <AdminMasterLayout child={<UserRoleIndex />} />,
  },
  {
    path: "admin/user-role/create",
    element: <AdminMasterLayout child={<UserRoleCreate />} />,
  },
  {
    path: "admin/user-role/edit/:id",
    element: <AdminMasterLayout child={<UserRoleEdit />} />,
  },
];

export const clientRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <Forgot />,
  },
  {
    path: "/profile",
    element: <UserMasterLayout child={<Profile />} />,
  },
  {
    path: "/change-password",
    element: <UserMasterLayout child={<ChangePass />} />,
  },
  {
    path: "/*",
    element: <UserMasterLayout child={<Home />} />,
  },
  {
    path: "",
    element: <UserMasterLayout child={<Home />} />,
  },
  {
    path: "/",
    element: <UserMasterLayout child={<Home />} />,
  },
  {
    path: "/shop",
    element: <UserMasterLayout child={<Shop />} />,
  },
  {
    path: "/contact",
    element: <UserMasterLayout child={<Contact />} />,
  },
  {
    path: "/faq",
    element: <UserMasterLayout child={<Faq />} />,
  },
  {
    path: "/blog",
    element: <UserMasterLayout child={<Blog />} />,
  },
  {
    path: "/detail/:id",
    element: <UserMasterLayout child={<Detail />} />,
  },
  {
    path: "/cart",
    element: <UserMasterLayout child={<Cart />} />,
  },
  {
    path: "/checkout",
    element: <UserMasterLayout child={<Checkout />} />,
  },
  {
    path: "/order-success",
    element: <OrderSuccess />,
  },
];
