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
// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";

import axios from "axios";

import { Link } from "react-router-dom";

const api = process.env.REACT_APP_API_URI;

function Cover() {
	
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoginFaild, setLoginFaild] = useState(false);
  const [isLoginSuccess, setLoginSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const alertContent = (name) => (
    <MDTypography variant="body2" color="white">
      <MDTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
        {errorMsg}
      </MDTypography>
    </MDTypography>
  );
	
   const handleSubmit = async () =>{
	   setLoginFaild(false);
	   setLoginSuccess(false);
        const obj = {
          "email": email
        }
     try {
        const getData = await axios.post(`${api}forget_password`, obj).then((response) => {
           console.log('response', response);
           return response.data;
         });
         console.log("getData", getData);
          if (getData.status === 'success') {
           const msg = getData.message;
           setErrorMsg(msg);
		   setLoginSuccess(true);
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
    <BasicLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            Reset Password
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            You will receive an e-mail in maximum 60 seconds
          </MDTypography>
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
				{isLoginSuccess && (
				<MDBox mb={2}>
					<MDAlert color="success" dismissible>
					  {alertContent("success")}
					</MDAlert>
				</MDBox>
				)}
            <MDBox mb={4}>
              <MDInput type="email" onChange={(e)=>setEmail(e.target.value)} label="Email" variant="standard" fullWidth />
            </MDBox>
            <MDBox mt={6} mb={1}>
              <MDButton onClick={handleSubmit} variant="gradient" color="info" fullWidth>
                reset
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
		   <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                Sign in again?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Click here
                </MDTypography>
              </MDTypography>
            </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Cover;
