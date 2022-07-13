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
import Switch from "@mui/material/Switch";


import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Edituserdetails() {

    const [gst_composite, setFollowsMe] = useState(true);
   

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={20} lg={12}>
            <Card style={{paddingTop:"5%", paddingBottom:"5%"}}>
              <MDBox p={2}>
                <MDTypography variant="h5">Edit Profile</MDTypography>
              </MDBox>
              <MDBox component="form" role="form">
               
            <MDBox mb={2}>
            
              <MDInput style={{width: "75%", marginLeft:"100px"}} type="text" name="gst_no" label="GSTIN" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput style={{width: "75%", marginLeft:"100px"}} type="text" name="company_name" label="Company Name" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput style={{width: "75%", marginLeft:"100px"}} type="text" name="address" label="Address" fullWidth />
            </MDBox>
            <MDBox mb={1}>
              <MDInput style={{width: "75%", marginLeft:"100px"}} type="text" name="pincode" label="Pincode" fullWidth />
            </MDBox>
            <MDBox mb={1}>
            <lable style={{width: "75%", marginLeft:"100px", fontSize:"14px" , color:"gray"}}>GST Composite Scheme</lable>
            <MDBox mt={0.5}  style={{width: "75%", marginLeft:"100px"}} >
            <Switch checked={gst_composite} onChange={() => setFollowsMe(!gst_composite)} />
            </MDBox>
            </MDBox>
            <MDBox mb={2}>
              <MDInput style={{width: "75%", marginLeft:"100px"}} type="number" name="mobile" label="Mobile" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDBox>
                <select  style={{marginLeft:"100px" , width:"75%"}} className="class">
                    <option>Nature of Business</option>
                    <option>Manufacture</option>
                    <option>Wholeseller </option>
                    <option >Trader / Retailer </option>
                    <option >Pharma / Chemist </option>
                    <option>Travelling Agency </option>
                    <option >Service Provider </option>
                    <option >Others </option>
                </select>
             </MDBox>  
            </MDBox>
            <MDBox mb={2}>
              <MDBox>
                <select  style={{marginLeft:"100px" , width:"75%"}} className="class">
                    <option>Private Limited Company</option>
                    <option>Type of Entity</option>
                    <option>Sole Proprietor </option>
                    <option>Partnership Firm </option>
                    <option>LLP</option>
                    <option>OPC </option>
                    <option>Private Limited Company</option>
                    <option>Others </option>
                </select>
             </MDBox>  
            </MDBox>
            <MDBox mb={2}>
              <MDInput style={{width: "75%", marginLeft:"100px"}} type="text" name="cin_no" label="CIN" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput style={{width: "75%", marginLeft:"100px"}} type="text" name="pan_no" label="PAN" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput style={{width: "75%", marginLeft:"100px"}} type="text" name="website" label="Website" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput style={{width: "35%", marginLeft:"100px"}} type="text" name="licence_title" label="License Title" fullWidth />
              <MDInput style={{width: "35%",  marginLeft:"5%"}} type="text" name="licence_number" label="License Number" fullWidth />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" style={{width: "25%",marginLeft:"36%"}} color="success" fullWidth>
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

export default Edituserdetails;
