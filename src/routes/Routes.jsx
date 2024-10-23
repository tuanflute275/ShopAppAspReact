//  =============================== ADMIN ROUTE ============================== //
import AdminMasterLayout from "../components/admin/layouts/AdminMasterLayout";
import AdminHome from "../components/admin/pages/home/AdminHome";
import LogIndex from "../components/admin/pages/log/Index";

import CategoryIndex from "../components/admin/pages/category/Index";
import CategoryCreate from "../components/admin/pages/category/Create";
import CategoryEdit from "../components/admin/pages/category/Edit";

import BannerIndex from "../components/admin/pages/banner/Index";
import BannerCreate from "../components/admin/pages/banner/Create";
import BannerEdit from "../components/admin/pages/banner/Edit";

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
    path: "admin/log",
    element: <AdminMasterLayout child={<LogIndex />} />,
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
