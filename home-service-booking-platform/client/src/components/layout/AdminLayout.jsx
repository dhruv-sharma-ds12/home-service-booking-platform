import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <>
      <h2>Admin Panel</h2>
      <Outlet />
    </>
  );
}

export default AdminLayout;