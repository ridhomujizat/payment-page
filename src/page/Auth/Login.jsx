
import React from "react";
import { Box, Typography, Container, TextField, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as yup from "yup";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default function Login() {
  const history = useHistory()
  const handleSubmit = (value) => {
    console.log(value);
  };
  return (
    <Container>
      <AddShoppingCartIcon
        sx={{ marginTop: "20px", fontSize: "30px", color: "#03b6fc" }}
      />

      <Box sx={style.wrapper}>
        <Typography variant="h1" sx={style.title}>
          Sign in to B-ONX
        </Typography>
        <Typography sx={{ marginTop: "10px" }}>
          Enter your details below
        </Typography>
        <Box sx={style.fromWrappe}>
          <Formik
            initialValues={initialValues}
            // validationSchema={Schema}
            onSubmit={(values) => {
              handleSubmitData(values);
            }}
          >
            {({
              errors,
              touched,
              values,
              handleChange,
              handleBlur,
              isValid,
              // isSubmitting,
              setFieldValue,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                <TextField
                  type="text"
                  name="email"
                  placeholder="Input email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ marginTop: "30px" }}
                  label="Email"
                  size="lg"
                  fullWidth
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email && `${errors.email}`}
                />
                <TextField
                  type="password"
                  name="password"
                  placeholder="Input password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ marginTop: "20px" }}
                  label="Password"
                  size="lg"
                  fullWidth
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password && `${errors.password}`}
                />

                <Button
                  fullWidth
                  type="Submit"
                  sx={{ marginTop: "20px" }}
                  size="lg"
                  onClick={() => {
                    history.push('/order-list')
                  }}
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Container>
  );
}

const initialValues = {
  email: "",
  password: "",
};

const Schema = yup.object().shape({
  email: yup.string().email().required("Please enter Category Image"),
  password: yup.string().required("Please enter Category Image"),
});

const style = {
  wrapper: {
    marginTop: "20px",
  },
  title: {
    fontSize: "24px",
  },
  fromWrappe: {
    width: "100%",
    maxWidth: "600px",
  },
};
