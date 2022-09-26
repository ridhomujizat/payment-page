import React, { useState, useEffect } from "react";
import { Box, Tooltip, IconButton } from "@mui/material";
import config from "@/config";
import Request from "@/utils/request";
import DashboardLayout from "@/layout/Dashboard/TitleDashboard";
import Table from "@/components/tabel";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
export default function Shipping() {
  const [data, setData] = useState([]);
  const [tables, setTables] = useState({
    totalItems: 0,
  });
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    items: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async (value = params) => {
    try {
      const respons = await Request.get("/orders", {
        auth: config.basic,
        params: value,
      });

      setData(respons.data.items);
      setTables(respons.data.meta);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = (e) => {
    const page = e + 1;
    const value = {
      ...params,
      page,
    };
    getData(value);
    setParams(value);
  };

  const headCells = [
    {
      id: "order_id",
      disablePadding: false,
      label: "Order Id",
      align: "left",
    },
    {
      id: "retailer_id",
      disablePadding: false,
      label: "Retailer Id",
      align: "left",
    },
    {
      id: "image_url",
      disablePadding: false,
      label: "image_url",
      align: "center",
      format: (val) => {
        return <img src={val.image_url} alt={val.name} height="60px" />;
      },
    },
    {
      id: "description",
      disablePadding: false,
      label: "description",
      align: "left",
    },
    {
      id: "total_price",
      disablePadding: false,
      label: "total_price",
      align: "left",
    },
    {
      id: "quantity",
      disablePadding: false,
      label: "quantity",
      align: "left",
    },
    // {
    //   id: "action",
    //   disablePadding: false,
    //   label: "ACTION",
    //   width: "100px",
    //   align: "center",
    //   disableSort: true,
    //   format: (val) => (
    //     <Box display="flex" justifyContent="center">
    //       <Tooltip title="Update shipping" placement="bottom-end" arrow>
    //         <IconButton onClick={() => {}}>
    //           <LocalShippingIcon />
    //         </IconButton>
    //       </Tooltip>
    //     </Box>
    //   ),
    // },
  ];
  return (
    <DashboardLayout
      title="Orders"
      breadcumbs={[{ title: "General" }, { title: "Order" }]}
    >
      <Table
        data={data}
        headCells={headCells}
        page={params.page}
        count={tables.totalItems}
        rowsPerPage={params.limit}
        handleChangePage={handleChangePage}
      />
    </DashboardLayout>
  );
}
