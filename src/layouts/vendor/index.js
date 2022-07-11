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
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./customer.css";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import MDInput from "components/MDInput";
import { MenuItem } from "@mui/material";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import projectsTableData from "layouts/tables/data/projectsTableData";

import { userID } from "../../auth";

const api = process.env.REACT_APP_API_URI;

function Vendors() {
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const [ isAddEnable, setAddEnable ] = useState(false);
  const [isLoginFaild, setLoginFaild] = useState(false);
  const [user_id, setUserID] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [gst, setGst] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [entity, setEntity] = useState('');
  const [vendorId, setVendorId] = useState(''); 
  const [license_no, setLicenseNO] = useState('');
  const [license_title, setLicenseTitle] = useState('');

  const handleUpdate = async () =>{
    const obj = {
      "vendor_id": vendorId,
      "gst_no": gst,
      "name": name,
      "email": email,
      "address": address,
      "mobile": mobile,
      "entity_type": entity,
      "licence_title": license_no,
      "licence_number": license_title
    }
    const getData = await axios.post(`${api}update_vendor`, obj).then((response) => {
      console.log();
      return response.data;
    });
    console.log();
     if (getData.status === 'success') {
       setVendorId('');
       setAddEnable(false);
       setLoginFaild(false);
       setGst('');
       setName('');
       setMobile('');
       setLicenseNO('');
       setLicenseTitle('');
       setAddress('');
       setErrorMsg('');
       setEntity('');
     } else {
       const msg = getData.message;
       setLoginFaild(true);
       setErrorMsg(msg);
     }
  }
  const handleSubmit = async () =>{

      const obj = {
        "user_id": user_id,
        "gst_no": gst,
        "name": name,
        "email": email,
        "address": address,
        "mobile": mobile,
        "entity_type": entity,
        "licence_title": license_no,
        "licence_number": license_title,
      }
      const getData = await axios.post(`${api}add_vendor`, obj).then((response) => {
        console.log();
        return response.data;
      });
      console.log();
       if (getData.status === 'success') {
         setAddEnable(false);
         setLoginFaild(false);
         setGst('');
         setName('');
         setMobile('');
         setLicenseNO('');
         setLicenseTitle('');
         setAddress('');
         setErrorMsg('');
         setEntity('');
       } else {
         const msg = getData.message;
         setLoginFaild(true);
         setErrorMsg(msg);
       }
  }
  const [ column, setColumn ] = useState(
    [
      { Header: "s.no", accessor: "s_no", width: "10%", align: "left" },
	  { Header: "vendor company name", accessor: "customer_name", align: "center" },
      { Header: "gstin", accessor: "gstin", align: "left" },
      { Header: "address", accessor: "address", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ]
  )
  const [ customers, setCustomers ] = useState([]);

  const alertContent = () => (
    <MDTypography variant="body2" color="white">
      <MDTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
        {errorMsg}
      </MDTypography>
    </MDTypography>
  );

  const editUser = async (id) =>{
      setVendorId(id);
      const obj = {
        "vendor_id": id
      }
      const getData = await axios.post(`${api}get_vendor_by_id`, obj).then((response) => {
        console.log()
        return response.data;
      });
       if (getData.status === 'success') {
          const getRows = getData.data;
          setAddEnable(true);
          setGst(getRows && getRows.gstin__c?getRows.gstin__c:'');
          setName(getRows && getRows.name__c?getRows.name__c:'');
          setLicenseNO(getRows && getRows.license_number__c?getRows.license_number__c:'');
          setLicenseTitle(getRows && getRows.license_title__c?getRows.license_title__c:'');
          setAddress(getRows && getRows.address__c?getRows.address__c:'');
          setEmail(getRows && getRows.email__c?getRows.email__c:'');
          setMobile(getRows && getRows.phone__c?getRows.phone__c:'');
          setEntity(getRows && getRows.entity_type__c?getRows.entity_type__c:'');
       } else {
         const msg = getData.message;
       }
  }


  const generateRow = async (getData) =>{
    const row = [];
    if(getData && getData.length > 0)
    {
      getData.forEach((element, index) => {
        row.push({
          s_no: index+1,
          gstin: element.gstin__c,
          customer_name: element.name__c,
          address: element.address__c,
          action: (
            <MDTypography style={{cursor:'pointer'}} onClick={()=>editUser(element.id)} component="a" color="text">
              <Icon >more_vert</Icon>
            </MDTypography>
          ),
        })
      })
      setCustomers(row);
    }
  }
  
  const getCustomers = async (user) =>{
      const obj = {
        "user_id": user
      }
    try {
      const getData = await axios.post(`${api}vendors`, obj).then((response) => {
        console.log()
         return response.data;
       });
        if (getData.status === 'success') {
           const getRows = getData.data;
           generateRow(getRows);
        } else {
          const msg = getData.message;
        }
        
    } catch (error) {
      console.error(`Error ${error}`);
    }
  }
  useEffect(async ()=>{
    const user = await userID();
    if(user)
    {
      setUserID(user);
      getCustomers(user);
    }else{
      window.location = "/sign-in"
    }
  },[isAddEnable])
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {!isAddEnable?(
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
            <MDBox pt={2} px={2} sx={{ ml: 5 }} display="flex" justifyContent="space-between" alignItems="center">
              <MDButton onClick={()=>setAddEnable(true)} mt={10} variant="gradient" color="dark">
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp;Add Vendor
              </MDButton>
            </MDBox>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                Vendor List
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: column, rows: customers }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      ):(
        <Grid item xs={8} pt={6} pb={3}>
        <Card>
          <MDBox
            mx={2}
            mt={-3}
            py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              {vendorId?"Edit Vendor":"Create Vendor"}
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
              <MDBox component="form" role="form">
                {isLoginFaild && (
                <MDBox mb={2}>
                    <MDAlert color="error" dismissible>
                      {alertContent("error")}
                    </MDAlert>
                </MDBox>
                )}
                <MDBox mb={2} mx={4}>
                  <MDInput type="text" onChange={(e)=>setGst(e.target.value)} label="Vendor GSTIN" value={gst} fullWidth />
                </MDBox>
                <MDBox mb={2}  mx={4}>
                  <MDInput type="text" label="Vendor Name" onChange={(e)=>setName(e.target.value)} value={name} fullWidth required />
                </MDBox>
                <MDBox mb={2} mx={4}>
                  <MDInput type="text" onChange={(e)=>setAddress(e.target.value)} value={address} label="Vendor Address" fullWidth />
                </MDBox>
                <MDBox mb={2}  mx={4}>
                  <MDInput type="text" label="Mobile" onChange={(e)=>setMobile(e.target.value)} value={mobile} fullWidth />
                </MDBox>
                <MDBox mb={2} mx={4}>
                  <MDInput type="text" onChange={(e)=>setEmail(e.target.value)} label="Email Address" value={email} fullWidth />
                </MDBox>
                <MDBox mb={2} mx={4}>
                  <MDInput
                    size="large"
                    select
                    id="demo-simple-select"
                    label="Type of Entity"
                    InputProps={{
                      classes: { root: "select-input-styles" },
                    }}
                    value={entity}
                    onChange={(e)=>setEntity(e.target.value)}
                    fullWidth
                  >
                    <MenuItem value="Sole Proprietor">Sole Proprietor</MenuItem>
                    <MenuItem value="Partnership Firm">Partnership Firm</MenuItem>
                    <MenuItem value="LLP">LLP</MenuItem>
                    <MenuItem value="OPC">OPC</MenuItem>
                    <MenuItem value="Private Limited Company">Private Limited Company</MenuItem>
                    <MenuItem value="Public Limited Company">Public Limited Company</MenuItem>
                    <MenuItem value="Society/Trust/NGO">Society/Trust/NGO</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </MDInput>
                </MDBox>
                <MDBox mx={4}>
                  <Grid item xs={12} pb={3}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6} xl={6}>
                        <MDInput type="text" label="Details" value={license_no} onChange={(e)=>setLicenseNO(e.target.value)} fullWidth />
                      </Grid>
                      <Grid item xs={12} md={6} xl={6}>
                        <MDInput type="text" label="Title" value={license_title} onChange={(e)=>setLicenseTitle(e.target.value)} fullWidth />
                      </Grid>
                    </Grid>
                  </Grid>
                </MDBox>
                 
                <MDBox mt={4} mb={1}  mx={4}>
                  <Grid item xs={12} pb={3}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6} xl={6}>
                        <MDButton onClick={()=>setAddEnable(false)} color="white" fullWidth>
                          Cancel
                        </MDButton>
                      </Grid>
                      <Grid item xs={12} md={6} xl={6}>
                        {name && vendorId ?(
                        <MDButton onClick={handleUpdate} variant="gradient" color="info" fullWidth>
                          Update
                        </MDButton>
                        ):name && (
                          <MDButton onClick={handleSubmit} variant="gradient" color="info" fullWidth>
                            Create
                          </MDButton>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </MDBox>
              </MDBox>
            </MDBox>
        </Card>
      </Grid>
      )}
      <Footer />
    </DashboardLayout>
  );
}

export default Vendors;
