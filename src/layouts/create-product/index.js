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
        <Grid container spacing={3} justifyContent="center" >
          <Grid item xs={12} lg={10} >
              <MDBox p={2}>
                <MDTypography variant="h5">Create Product</MDTypography>
              </MDBox>
              <MDBox component="form" role="form"  style={{paddingRight: "200px"}} >
                <MDBox mb={2}>
                <MDInput type="text" label="Product Name" fullWidth />
                </MDBox>
                <MDBox mb={2}>
                <MDInput type="text" label="Product Category" fullWidth />
                </MDBox>
                <MDBox mb={2}>
                <MDInput type="text" label="SKU" fullWidth />
                </MDBox>
                <MDBox mb={2}>
                <MDInput type="text" label="Barcode" fullWidth />
                </MDBox>
                <MDBox mb={2}>
                <MDInput type="text" label="HSN/SAC Code" fullWidth />
                </MDBox>
                <MDBox mb={2}>
                <MDInput type="text" label="Tax Rate (%)" fullWidth />
                </MDBox>
                <MDBox mb={2}>
                <MDInput type="text" label="Unit as measure" fullWidth />
                </MDBox>
                <MDBox mb={2}>
                <MDInput type="text" label="MRP" fullWidth />
                </MDBox>
            <MDBox p={2} >
                <MDTypography variant="h5" style={{fontSize: "16px"}}>Do you sales this product ?</MDTypography>
            </MDBox>
            <MDBox mb={2} style={{width: "48%"}}>
                <MDInput type="text" label="Rate/Unit" fullWidth />
            </MDBox>
            <MDBox mb={2} style={{width: "48%"}}>
                <MDInput type="text" label="Product Description" fullWidth />
            </MDBox>
            <MDBox p={2} style={{marginRight:"5%"}}>
                <MDTypography variant="h5" style={{fontSize: "16px",marginLeft:"57%",marginTop:"-170px"}}>Do you purchase this product?</MDTypography>
            </MDBox>
            <MDBox mb={2} style={{width: "48%",marginLeft:"52%",marginTop:"-150px"}}>
                <MDInput type="text" label="Rate/Unit" fullWidth />
            </MDBox>
            <MDBox mb={2} style={{width: "48%",marginLeft:"52%"}}>
                <MDInput type="text" label="Product Description" fullWidth />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" style={{width: "15%",marginLeft:"34%"}} color="info" fullWidth>
                Submit
              </MDButton>
              <MDButton variant="gradient" style={{width: "15%",marginLeft:"51%",marginTop:"-72px"}} color="error" fullWidth>
                Cancel
              </MDButton>
            </MDBox>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;
