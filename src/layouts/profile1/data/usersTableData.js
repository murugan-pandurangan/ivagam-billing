/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

import React, { useEffect , useState} from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

import axios from "axios";
import { userID } from "../../../auth";

const api = process.env.REACT_APP_API_URI;

export default function data() {

  const [companyname, setCompanyname] = useState('');
  const [gstNumber, setgstNumber] = useState('');
  const [address, setAddress] = useState('');

  const getUser = async () =>{
    const user = await userID();
    console.log(user);
    const obj = {
      "user_id": user
    }
    try {
      const getData = await axios.post(`${api}get_profile`, obj).then((response) => {
         console.log('response', response);
         return response.data;
       });
       console.log("getData", getData);
        if (getData.status === 'success') {
          
          setCompanyname(getData.data.compant_name__c);
          setgstNumber(getData.data.gstin_cc);
          setAddress(getData.data.address__c);
        }
        
    } catch (error) {
      console.error(`Error ${error}`);
    }
  }

  useEffect(()=>{
    getUser();
  })

  const user_id = localStorage.getItem('user_id');

  const Author = ({ name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "S.no", accessor: "author", align: "left" },
      { Header: "Company Name", accessor: "function", align: "left" },
      { Header: "GSTIN", accessor: "status", align: "center" , width: "25%"},
      { Header: "Address", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        author: <Author name={user_id} />,
        function: <Job title={companyname}  />,
        status: (
          <Job title={gstNumber} />
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
             {address}
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="./editUserdetails" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
    ],
  };
}
