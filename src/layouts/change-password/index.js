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

function Notifications() {
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
            <MDBox mb={2}>
              <MDInput style={{width: "75%", marginLeft:"100px"}} type="password" name="oldpass" label="Current Password" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput style={{width: "75%", marginLeft:"100px"}} type="password" name="newpass" label="New Password" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput style={{width: "75%", marginLeft:"100px"}} type="password" name="conpass" label="Confirm Password" fullWidth />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" style={{width: "25%",marginLeft:"36%"}} color="info" fullWidth>
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
