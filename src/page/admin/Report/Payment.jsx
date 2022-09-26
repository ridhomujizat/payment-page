import React from "react";
import DashboardLayout from "@/layout/Dashboard/TitleDashboard";

export default function Payment() {
  return (
    <DashboardLayout
      title="Report Payment"
      breadcumbs={[{ title: "Report" }, { title: "Payment" }]}
    >
    </DashboardLayout>
  );
}
