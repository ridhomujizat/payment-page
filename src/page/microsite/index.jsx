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
import { useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import * as yup from "yup";
import styled from "@emotion/styled";
import axios from "axios";
import config from "@/config";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HelpIcon from "@mui/icons-material/Help";
import SellIcon from "@mui/icons-material/Sell";

import numberSuperator from "@/utils/numbersperator";

export default function Microsite() {
  const { id } = useParams();
  const [country, setCountry] = useState([]);
  const [allProv, setAllProv] = useState([]);
  const [prov, setProv] = useState([]);

  const [order, setOrder] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getCountry();
    getProv();
    getOrder();
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

  const handleSubmitData = async (value) => {
    try {
      const url = `${config.baseURL}/midtrans/create`;
      const payload = {
        transaction_details: {
          order_id: id,
          gross_amount: total,
        },
        credit_card: {
          secure: true,
        },
        item_details: order.map((val) => ({
          id: val.CommerceOrder_item_id,
          price: val.CommerceOrder_price,
          quantity: val.CommerceOrder_quantity,
          name: val.CommerceOrder_name,
        })),
        customer_details: {
          first_name: value.first_name,
          last_name: value.last_name,
          email: value.email,
          phone: value.phone,
          shipping_address: {
            first_name: value.first_name,
            last_name: value.last_name,
            email: value.email,
            phone: value.phone,
            address: value.address,
            city: value.city,
            postal_code: value.postal_code,
            country_code: value.country_code.id,
          },
        },
        callbacks: {
          finish: `${window.location.origin}/status-payment/${id}`,
        },
      };

      const respons = await axios.post(url, payload, {
        headers: {
          "x-midtrans-auth":
            "Basic U0ItTWlkLXNlcnZlci1vbXdGNnRwcnRzenBPbC0zc0Utcko1bmM6",
          Authorization: "Basic dXd1OnV3dWJvdDEyMw==",
          "Content-Type": "application/json",
        },
      });
      await handlePengiriman(value);
      window.location.href = respons.data.redirect_url;
    } catch (error) {
      console.log(error);
    }
  };

  const handlePengiriman = async (value) => {
    const url = `${config.baseURL}/pengiriman`;
    const payload = {
      order_id: id,
      customer_email: value.email,
      country: value.country_code.label,
      customer_name: `${value.first_name} ${value.last_name}`,
      address: value.address,
      city: value.city,
      postal_code: value.postal_code,
      phone: `${value.phone}`,
    };

    const respons = await axios.post(url, payload, {
      auth: config.basic,
    });
  };
  return (
    <Box sx={style.wrapper} as="main">
      <Box sx={style.formWrapper}>
        <Box sx={style.from}>
          <Box sx={style.hideInMobile}>
            <Typography sx={style.title}>Informasi Pemesanan</Typography>
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<NavigateNextIcon fontSize="small" />}
            >
              <span>Information</span>
              {/* <span>Shipping</span> */}
              <span>Payment</span>
            </Breadcrumbs>
          </Box>
          <Formik
            initialValues={initialValues}
            validationSchema={Schema}
            onSubmit={(values) => {
              handleSubmitData(values);
            }}
            validator={() => ({})}
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
              <Form onSubmit={handleSubmit}>
                <Typography sx={style.subTitle}>Contact information</Typography>
                <Grid container spacing="15px">
                  <Grid item xs={12}>
                    <TextField
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
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={country}
                      onChange={(e, value) => {
                        const provState = allProv.filter(
                          (val) => val.country_code == value.value
                        );
                        setProv(provState);
                        setFieldValue("country_code", value);
                      }}
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          id="outlined-basic"
                          label="Country/Region"
                          variant="filled"
                          name="country_code"
                          fullWidth
                          onBlur={handleBlur}
                          error={
                            touched.country_code && Boolean(errors.country_code)
                          }
                          helperText={
                            touched.country_code &&
                            errors.country_code &&
                            `${errors.country_code}`
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
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
                      id="outlined-basic"
                      variant="filled"
                      fullWidth
                      type="text"
                      name="last_name"
                      placeholder="Input last mName"
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
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
                      <Button
                        size="large"
                        type="submit"
                        loading
                        disabled={!isValid}
                        sx={{ width: "200px" }}
                      >
                        {isSubmitting ? (
                          <CircularProgress color="inherit" size={25} />
                        ) : (
                          "Continue to Payment"
                        )}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>

      <Box sx={style.pricingWrapper}>
        <Box sx={style.hideInDesktop}>
          <Typography sx={style.title}>Informasi Pemesanan</Typography>
          <Breadcrumbs
            aria-label="breadcrumb"
            separator={<NavigateNextIcon fontSize="small" />}
          >
            <span>Information</span>
            {/* <span>Shipping</span> */}
            <span>Payment</span>
          </Breadcrumbs>
        </Box>
        <Box sx={style.pricing}>
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
      </Box>
    </Box>
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

const Schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Please enter your email"),
  phone: yup.number().required("Please enter your phone"),
  first_name: yup.string().required("Please enter your first name"),
  last_name: yup.string().required("Please enter your last name"),
  city: yup.string().required("Please enter your provincy"),
  address: yup.string().required("Please enter your address"),
  postal_code: yup.string().required("Please enter your postal code"),
  country_code: yup.object().required("Please enter your Country"),
});

const style = {
  hideInMobile: { display: { xs: "none", md: "block" } },
  hideInDesktop: { display: { xs: "block", md: "none" } },
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    width: "100%",
    gap: "20px",
    justifyContent: "center",
    flexDirection: { xs: "column-reverse", md: "row" },
  },
  formWrapper: {
    width: { xs: "unset", md: "57%" },
    p: "30px",
  },
  from: {
    maxWidth: { xs: "unset", md: "650px" },
    marginLeft: { xs: "unset", md: "auto" },
  },
  pricingWrapper: {
    bgcolor: { xs: "#fff", md: "#fafafa" },
    width: { xs: "unset", md: "43%" },
    p: "30px",
  },
  pricing: { marginTop: "50px", maxWidth: { xs: "unset", md: "400px" } },
  title: {
    fontSize: "25px",
    mt: "20px",
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
