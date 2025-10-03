import { useState } from "react";
import { AdminSidebar } from "../AdminSidebar";

export default function AdminSidebarExample() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="h-screen">
      <AdminSidebar currentPage={page} onNavigate={setPage} />
    </div>
  );
}
