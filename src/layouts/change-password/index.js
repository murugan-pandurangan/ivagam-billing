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
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDAlert from "components/MDAlert";

import axios from "axios";

const api = process.env.REACT_APP_API_URI;

function Notifications() {
  const [isLoginFaild, setLoginFaild] = useState(false);
  const [isLoginSuccess, setLoginSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [cPassword, setConfirmPassword] = useState('');
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
              "current_password": currentPassword,
              "password": newPassword,
              "cpassword": cPassword,
              "user_id": localStorage.getItem('user_id')
            }
         try {
            const getData = await axios.post(`${api}change_pass`, obj).then((response) => {
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
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card style={{paddingTop: "20px",paddingBottom: "20px"}}>
              <MDBox p={2}>
                <MDTypography variant="h5">Change Password</MDTypography>
              </MDBox>
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
            <MDBox mb={2}>
              <MDInput style={{width: "75%", marginLeft:"100px"}} onChange={(e)=>setCurrentPassword(e.target.value)} type="password" label="CurrentPassword" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput style={{width: "75%", marginLeft:"100px"}} onChange={(e)=>setNewPassword(e.target.value)} type="password" label="NewPassword" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput style={{width: "75%", marginLeft:"100px"}} onChange={(e)=>setConfirmPassword(e.target.value)} type="password" label="ConfirmPassword" fullWidth />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" onClick={handleSubmit} style={{width: "25%",marginLeft:"36%"}} color="info" fullWidth>
                Submit
              </MDButton>
            </MDBox>
            </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;
