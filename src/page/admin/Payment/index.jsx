import React from "react";
import DashboardLayout from "../../../layout/Dashboard";
import Table from "../../../components/tabel";
import Layout from "../../../layout/Dashboard/TitleDashboard";

export default function Payment() {
  const headCells = [
    {
      id: "name",
      disablePadding: false,
      label: "Reason",
      align: "left",
      width: "70%",
    },
  ];
  return (
    <Layout title="Payment" >
      <Table data={[]} headCells={headCells} />
    </Layout>
  );
}
