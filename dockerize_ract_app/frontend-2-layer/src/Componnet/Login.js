import * as Yup from "yup";
import React, { useState } from "react";
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel, Grid, Box, Divider, Button } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useFormik, Form, Formik, Field, FormikProvider, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import Demofile from "./Demofile";
import { Notification } from "./CustomizedSnackbar/Notification";
import axios from "axios";
import { APIBACKEND, APIAIOLD, APIAINEW } from "../E2E/axios.utils";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleAlert = () => {
    setAlert(false);
  };

  const initialValues = {
    email: "",
    password: "",
    showPassword: "false",
  };

  const handleSubmit = (values) => {
    const data = { user_id: values.email, password: values.password };
    APIBACKEND.post("login", data)
      .then((response) => {
        console.log("output", response.data.message);
        setAlert(true);
        setAlertContent(response.data.message);
        setAlertType("success");
        setTimeout(() => {
          navigate("/bot");
          // navigate("/demofile2");
        }, 1000);
      })
      .catch((error) => {
        console.error("API request failed:", error.message);
        setAlert(true);
        setAlertContent(error.message);
        setAlertType("error");
        // navigate("/demofile");
      });
  };

  const validationSchema = Yup.object().shape({
    // email: Yup.string().email("Please enter valid email").required("Email is required"),
    email: Yup.string().required("Username is required").max(35),
    password: Yup.string().required("Password is required").max(15),
  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Grid>
      <span style={{ fontSize: "25px", fontWeight: "600", marginLeft: 10, marginTop: 20 }}>Login Form</span>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({ values, setFieldValue, errors, touched, isSubmitting }) => (
          <Form style={{ paddingLeft: "35%", paddingRight: "35%", paddingTop: "8%" }}>
            <div style={{ border: "3px solid #f1f1f1", padding: "20px" }}>
              <Grid>
                <Grid>
                  <div>
                    <span style={{ fontSize: "20px", fontWeight: "600" }}>Username</span>
                    <Field
                      onChange={(evt) => {
                        setFieldValue("email", evt.target.value);
                        initialValues.email = evt.target.value;
                      }}
                      as={TextField}
                      autoComplete="off" // This will restrict autofill
                      name="email"
                      placeholder="Enter Username"
                      fullWidth
                      size="small"
                      style={{
                        marginTop: 7,
                      }}
                      id="input-with-sx"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton>
                              <PersonOutlineOutlinedIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div
                    style={{
                      color: "red",
                      fontsize: 10,
                      textAlign: "left",
                      lineHeight: 1.5,
                      fontFamily: "Noto Sans",
                      paddingLeft: 15,
                      fontSize: "11px",
                      height: "20px",
                      fontWeight: "600",
                    }}
                  >
                    {touched.email && errors.email && <ErrorMessage name="email" />}
                  </div>
                </Grid>
                <Grid>
                  <div>
                    <span style={{ fontSize: "20px", fontWeight: "600" }}>Password</span>
                    <Field
                      onChange={(evt) => {
                        setFieldValue("password", evt.target.value);
                        initialValues.password = evt.target.value;
                      }}
                      as={TextField}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter Password"
                      fullWidth
                      size="small"
                      style={{
                        marginTop: 7,
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton
                              aria-label="Toggle password visibility"
                              onClick={() => {
                                setFieldValue({
                                  ...initialValues,
                                  showPassword: !initialValues.showPassword,
                                });
                                setShowPassword(!showPassword);
                              }}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div
                    style={{
                      color: "red",
                      fontsize: 10,
                      textAlign: "left",
                      lineHeight: 1.5,
                      fontFamily: "Noto Sans",
                      paddingLeft: 15,
                      fontSize: "11px",
                      height: "20px",
                      fontWeight: "600",
                    }}
                  >
                    {touched.password && errors.password && <ErrorMessage name="password" />}
                  </div>
                </Grid>
              </Grid>

              <Grid
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "8px",
                  marginBottom: 10,
                }}
              >
                <Button
                  type="submit"
                  color="primary"
                  style={{
                    height: "52px",
                    width: "100%",
                    background: "linear-gradient(134deg, #1182E4 0%, #0C5CA1 100%, #0C5CA1 100%)",
                    borderRadius: "5px",
                    boxShadow: "0px 8px 21px 0px rgba(0, 0, 0, 0.16)",
                  }}
                  variant="contained"
                >
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "12px",
                      lineHeight: "normal",
                      // fontFamily: "Noto Sans",
                      color: "white",
                    }}
                  >
                    Login
                  </span>
                </Button>
              </Grid>
              <Grid style={{}}>
                <div
                  style={{
                    // padding: 10,
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <input type="checkbox" style={{ marginRight: 5 }} />
                  <span>Remember Me</span>
                </div>
              </Grid>
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 15,
                  marginBottom: 18,
                }}
              >
                <Button
                  color="primary"
                  style={{
                    height: "42px",
                    width: "20%",
                    background: "red",
                    borderRadius: "5px",
                    boxShadow: "0px 8px 21px 0px rgba(0, 0, 0, 0.16)",
                  }}
                  variant="contained"
                >
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "12px",
                      lineHeight: "normal",
                      // fontFamily: "Noto Sans",
                      color: "white",
                    }}
                  >
                    Cancel
                  </span>
                </Button>
                <div
                  container
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "center",
                  }}
                >
                  <Link
                    href="/forgotpassword"
                    style={{
                      fontWeight: 400,
                      fontSize: "20px",
                      lineHeight: "normal",
                      fontFamily: "Noto Sans",
                      color: "#1182E4",
                    }}
                  >
                    Forgot Password?
                  </Link>
                </div>
              </Grid>
            </div>
          </Form>
        )}
      </Formik>
      <Notification message={alertContent} open={alert} severity={alertType} onClose={handleAlert} />
    </Grid>
  );
};

export default Login;
