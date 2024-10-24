//  =============================== ADMIN ROUTE ============================== //
import AdminMasterLayout from "../components/admin/layouts/AdminMasterLayout";
import AdminHome from "../components/admin/pages/home/AdminHome";
import LogIndex from "../components/admin/pages/log/Index";
import SubscriptionIndex from "../components/admin/pages/subscription/Index";

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
import BlogComment from "../components/admin/pages/blog/Comment";

import ProductIndex from "../components/admin/pages/product/Index";
import ProductCreate from "../components/admin/pages/product/Create";
import ProductEdit from "../components/admin/pages/product/Edit";

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
import UserMasterLayout from "../components/user/layouts/UserMasterLayout";
import Home from "../components/user/pages/home/Home";
import Shop from "../components/user/pages/shop/Shop";

export const adminRoutes = [
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
];
