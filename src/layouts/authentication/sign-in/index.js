/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import axios from "axios";

const api = process.env.REACT_APP_API_URI;

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoginFaild, setLoginFaild] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const alertContent = (name) => (
    <MDTypography variant="body2" color="white">
      <MDTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
        {errorMsg}
      </MDTypography>
    </MDTypography>
  );
  const handleSubmit = async () =>{
    setLoginFaild(false);
        const obj = {
          "email": email,
          "password": password
        }
     try {
        const getData = await axios.post(`${api}login`, obj).then((response) => {
           console.log('response', response);
           return response.data;
         });
         console.log("getData", getData);
          if (getData.status === 'success') {
            localStorage.setItem('user_id', getData.data.id);
            window.location = "/dashboard";
            // Extract json
          } else {
            const msg = getData.message;
            setErrorMsg(msg);
            setLoginFaild(true);
          }
          
      } catch (error) {
        console.error(`Error ${error}`);
      }
  }

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            {isLoginFaild && (
            <MDBox mb={2}>
                <MDAlert color="error" dismissible>
                  {alertContent("error")}
                </MDAlert>
            </MDBox>
            )}
            <MDBox mb={2}>
              <MDInput type="email" onChange={(e)=>setEmail(e.target.value)} label="Email" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" onChange={(e)=>setPassword(e.target.value)} fullWidth />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton onClick={handleSubmit} variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
			<MDTypography
                  component={Link}
                  to="/authentication/reset-password"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Forgot Password
                </MDTypography>
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
