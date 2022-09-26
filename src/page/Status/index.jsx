import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Breadcrumbs,
  Grid,
  TextField,
  Autocomplete,
  CircularProgress,
  Button,
  Badge,
} from "@mui/material";
import moment from "moment"
import { useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import * as yup from "yup";
import axios from "axios";
import config from "@/config";


import StatusOrder from "./Status";
import numberSuperator from "@/utils/numbersperator";

export default function Status() {
  const { id } = useParams();
  const [country, setCountry] = useState([]);
  const [allProv, setAllProv] = useState([]);
  const [prov, setProv] = useState([]);

  const [order, setOrder] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  const [userData, setUserData] = useState(initialValues);
  const [statusPayment, setStatusPayment] = useState("");
  const [status, setStatus] = useState(null);

  useEffect(() => {
    getCountry();
    getProv();
    getOrder();
    getUserDetails();
    getStatusOrder();
  }, []);

  const getCountry = async () => {
    // const url = "https://restcountries.com/v3.1/all";
    const url =
      "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json";

    const respons = await axios.get(url);
    const data = respons.data.map((val) => ({
      label: val.name,
      value: val.iso2,
      id: val.iso3,
    }));
    setCountry(data);
  };

  const getProv = async () => {
    const url =
      "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json";
    const respons = await axios.get(url);
    const data = respons.data;
    setAllProv(data);
  };

  const getOrder = async () => {
    try {
      const respons = await axios.get(`${config.baseURL}/orders/${id}`);
      if (respons.data.length > 0) {
        let subPrice = 0;
        const data = respons.data.map((val) => {
          subPrice += val.CommerceOrder_price * val.CommerceOrder_quantity;
          return { ...val };
        });
        setOrder(data);
        setSubTotal(subPrice);
        setTotal(subPrice);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserDetails = async () => {
    try {
      const url = `${config.baseURL}/pengiriman/${id}`;
      const respons = await axios.get(url, {
        auth: config.basic,
      });
      const { data } = respons;

      setUserData({
        email: data[0].customer_email,
        phone: data[0].phone,
        first_name: data[0].customer_name.split(" ")[0],
        last_name: data[0].customer_name.split(" ")[1],
        city: data[0].city,
        postal_code: data[0].postal_code,
        country_code: data[0].country,
        address: data[0].address,
      });
    } catch (error) {
      console.log(err);
    }
  };

  const getStatusOrder = async () => {
    try {
      const url = `${config.baseURL}/pembayaran/${id}`;
      const respons = await axios.get(url, {
        auth: config.basic,
      });
      const { data } = respons;
      if (data.length > 0) {
        setStatus(data[0]);
        switch (data[0]?.pembayaran_transaction_status) {
          case "settlement":
            setStatusPayment("Pembayaran Berhasil");
            break;
          default:
            setStatusPayment("Sedang menunggu pembayaran");
            break;
        }
      } else {
        setStatusPayment("Sedang menunggu pembayaran");
      }

      console.log(data);
    } catch (error) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Box>
        {/* <Typography sx={style.title}>Status Pembayaran</Typography> */}
        <StatusOrder status={statusPayment} price={numberSuperator(total)} />
        {status && statusPayment === "Pembayaran Berhasil" && (
          <Box sx={{ paddingY: "20px", borderBottom: "1px solid #c4c4c4" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Box>
                <Typography sx={{ fontSize: "16px", color: "#848587" }}>
                  Metode Pembayaran
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#000",
                    textTransform: "capitalize",
                  }}
                >
                  {status.pembayaran_payment_type.replaceAll("_", " ")}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Box>
                <Typography sx={{ fontSize: "16px", color: "#848587" }}>
                  No. Order
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#000",
                    textTransform: "capitalize",
                  }}
                >
                  {id}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Box>
                <Typography sx={{ fontSize: "16px", color: "#848587" }}>
                  Waktu Pembayaran
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#000",
                    textTransform: "capitalize",
                  }}
                >
                  {moment(status.pembayaran_transaction_time).format("HH MMM YYYY hh:mm")}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      <Box sx={style.wrapper} as="main">
        <Box sx={style.pricing}>
          <Box sx={{ marginTop: "50px" }} />
          {order.map((val, i) => (
            <Box sx={style.itemProduct} key={i}>
              <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Badge
                  badgeContent={val.CommerceOrder_quantity}
                  color="primary"
                >
                  <Box
                    sx={style.imgProduct}
                    as="img"
                    src={val.CommerceOrder_image_url}
                  />
                </Badge>

                {/* <SellIcon sx={{ color: "#fff", fontSize: "30px" }} /> */}
                <Typography sx={{ fontSize: "15px", maxWidth: "200px" }}>
                  {val.CommerceOrder_name}
                </Typography>
              </Box>

              <Typography>
                Rp.
                {numberSuperator(
                  val.CommerceOrder_price * val.CommerceOrder_quantity
                )}
              </Typography>
            </Box>
          ))}
          <Box sx={style.price}>
            <Box sx={style.linePrice}>
              <Typography>Subtotal</Typography>
              <Typography>Rp.{numberSuperator(subTotal)}</Typography>
            </Box>
            <Box sx={style.linePrice}>
              <Typography>Shipping</Typography>
              <Typography>0</Typography>
            </Box>
          </Box>
          <Box sx={{ ...style.linePrice, mt: "10px" }}>
            <Typography>Total</Typography>
            <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
              Rp. {numberSuperator(total)}
            </Typography>
          </Box>
        </Box>
        <Formik
          initialValues={userData}
          onSubmit={(values) => {
            // handleSubmitData(values);
          }}
          validator={() => ({})}
          enableReinitialize
        >
          {({
            errors,
            touched,
            values,
            handleChange,
            handleBlur,
            isValid,
            isSubmitting,
            setFieldValue,
            handleSubmit,
          }) => (
            <Box sx={style.formWrapper}>
              <Form onSubmit={handleSubmit}>
                <Typography sx={style.subTitle}>Contact information</Typography>
                <Grid container spacing="15px">
                  <Grid item xs={12}>
                    <TextField
                      disabled
                      type="text"
                      name="email"
                      placeholder="Input email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Email"
                      variant="filled"
                      fullWidth
                      error={touched.email && Boolean(errors.email)}
                      helperText={
                        touched.email && errors.email && `${errors.email}`
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      disabled
                      type="number"
                      name="phone"
                      placeholder="Input phone"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Phone"
                      variant="filled"
                      fullWidth
                      error={touched.phone && Boolean(errors.phone)}
                      helperText={
                        touched.phone && errors.phone && `${errors.phone}`
                      }
                    />
                  </Grid>
                </Grid>

                <Typography sx={style.subTitle}>Shipping address</Typography>
                <Grid container spacing="15px">
                  <Grid item xs={12}>
                    <TextField
                      disabled
                      type="text"
                      name="country"
                      placeholder="Input Country"
                      value={values.country_code}
                      // defaultValue={}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Country"
                      variant="filled"
                      fullWidth
                      error={
                        touched.country_code && Boolean(errors.country_code)
                      }
                      helperText={
                        touched.country_code &&
                        errors.country_code &&
                        `${errors.country_code}`
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      disabled
                      id="outlined-basic"
                      variant="filled"
                      fullWidth
                      type="text"
                      name="first_name"
                      placeholder="Input first name"
                      value={values.first_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="First name"
                      error={touched.first_name && Boolean(errors.first_name)}
                      helperText={
                        touched.first_name &&
                        errors.first_name &&
                        `${errors.first_name}`
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      disabled
                      id="outlined-basic"
                      variant="filled"
                      fullWidth
                      type="text"
                      name="last_name"
                      placeholder="Input last lame"
                      value={values.last_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Last name"
                      error={touched.last_name && Boolean(errors.last_name)}
                      helperText={
                        touched.last_name &&
                        errors.last_name &&
                        `${errors.last_name}`
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      disabled
                      id="outlined-basic"
                      variant="filled"
                      fullWidth
                      type="text"
                      name="city"
                      placeholder="Input city"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="City"
                      error={touched.city && Boolean(errors.city)}
                      helperText={
                        touched.city && errors.city && `${errors.city}`
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      disabled
                      id="outlined-basic"
                      variant="filled"
                      fullWidth
                      type="text"
                      name="postal_code"
                      placeholder="Input last mName"
                      value={values.postal_code}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Postal Code"
                      error={touched.postal_code && Boolean(errors.postal_code)}
                      helperText={
                        touched.postal_code &&
                        errors.postal_code &&
                        `${errors.postal_code}`
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      disabled
                      id="outlined-basic"
                      variant="filled"
                      fullWidth
                      type="text"
                      name="address"
                      placeholder="Input address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Address"
                      error={touched.address && Boolean(errors.address)}
                      helperText={
                        touched.address && errors.address && `${errors.address}`
                      }
                    />
                  </Grid>
                </Grid>
              </Form>
            </Box>
          )}
        </Formik>
      </Box>
    </Container>
  );
}

const initialValues = {
  email: "",
  phone: "",
  first_name: "",
  last_name: "",
  city: "",
  postal_code: "",
  country_code: "",
};

const style = {
  TextField: {},
  wrapper: {
    width: "100%",
    paddingBottom: "20px",
    gap: "20px",
    justifyContent: "space-between",
    flexDirection: { xs: "column-reverse", md: "row" },
  },
  formWrapper: {
    width: "100%",
  },
  pricing: {
    width: "100%",
  },
  title: {
    fontSize: "25px",
    textAlign: "center",
  },
  subTitle: {
    fontSize: "18px",
    marginTop: "20px",
    marginBottom: "15px",
  },
  itemProduct: {
    marginBottom: "20px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imgProduct: {
    border: "1px rgba(0,0,0,0.05) solid",
    height: "50px",
    width: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",
    backgroundColor: "#b1dee6",
  },
  price: {
    paddingY: "10px",
    marginY: "10px",
    borderTop: "1px solid #c4c4c4",
    borderBottom: "1px solid #c4c4c4",
  },
  linePrice: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};
