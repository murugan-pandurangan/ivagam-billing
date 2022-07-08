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

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import projectsTableData from "layouts/tables/data/projectsTableData";

import { userID } from "../../auth";

const api = process.env.REACT_APP_API_URI;

function Customers() {
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
  const [license_no, setLicenseNO] = useState(''); 
  const [license_title, setLicenseTitle] = useState('');
  const handleSubmit = async () =>{

    /*   const obj = {
        user_id: user_id,
        gst_no: gst,
        name: name,
        email: email,
        address: address,
        mobile: mobile,
        entity_type: entity,
        licence_title: license_no,
        licence_number: license_title
      } */
  }
  const [ column, setColumn ] = useState(
    [
      { Header: "s.no", accessor: "s_no", width: "10%", align: "left" },
      { Header: "gstin", accessor: "gstin", align: "left" },
      { Header: "customer name", accessor: "customer_name", align: "center" },
      { Header: "address", accessor: "address", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ]
  )
  const [ rows, setRows ] = useState([]);

  const alertContent = () => (
    <MDTypography variant="body2" color="white">
      <MDTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
        {errorMsg}
      </MDTypography>
    </MDTypography>
  );

  const generateRow = async (getData) =>{
    const row = [];
    if(getData && getData.length > 0)
    {
      getData.array.forEach((element, index) => {
        row.push({
          s_no: index+1,
          gstin: element.gstin__c,
          customer_name: element.name__c,
          address: element.address__c,
          action: (
            <MDTypography component="a" href="#" color="text">
              <Icon>more_vert</Icon>
            </MDTypography>
          ),
        })
      })
      setRows(row);
    }
  }

  
  const getCustomers = async (user) =>{
      const obj = {
        "user_id": user
      }
    try {
      const getData = await axios.post(`${api}customers`, obj).then((response) => {
         console.log('response', response);
         return response.data;
       });
       console.log("getData", getData);
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
  })

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {!isAddEnable?(
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
            <MDBox pt={2} px={2} sx={{ ml: 5 }} display="flex" justifyContent="space-between" alignItems="center">
              <MDButton onClick={()=>setAddEnable(true)} mt={10} variant="gradient" color="dark">
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp;add Customer
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
                Customer List
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: column, rows: pRows }}
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
            Create Customer
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
                  <MDInput type="text" onChange={(e)=>setGst(e.target.value)} label="Customer GSTIN" fullWidth />
                </MDBox>
                <MDBox mb={2}  mx={4}>
                  <MDInput type="text" label="Customer Name" onChange={(e)=>setName(e.target.value)} fullWidth required />
                </MDBox>
                <MDBox mb={2} mx={4}>
                  <MDInput type="text" onChange={(e)=>setAddress(e.target.value)} label="Customer Address" fullWidth />
                </MDBox>
                <MDBox mb={2}  mx={4}>
                  <MDInput type="text" label="Mobile" onChange={(e)=>setMobile(e.target.value)} fullWidth />
                </MDBox>
                <MDBox mb={2} mx={4}>
                  <MDInput type="text" onChange={(e)=>setEmail(e.target.value)} label="Email Address" fullWidth />
                </MDBox>
                <MDBox mx={4}>
                  <Grid item xs={12} pb={3}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6} xl={6}>
                        <MDInput type="text" label="Details" onChange={(e)=>setLicenseNO(e.target.value)} fullWidth />
                      </Grid>
                      <Grid item xs={12} md={6} xl={6}>
                        <MDInput type="text" label="Title" onChange={(e)=>setLicenseTitle(e.target.value)} fullWidth />
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
                        {name && (
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

export default Customers;
