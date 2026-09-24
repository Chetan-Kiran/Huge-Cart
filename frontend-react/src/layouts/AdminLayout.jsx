import { Outlet } from "react-router-dom";

import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";

export default function AdminLayout() {
  return (
    <div className="bg-background min-h-screen flex">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        <Topbar />

        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
