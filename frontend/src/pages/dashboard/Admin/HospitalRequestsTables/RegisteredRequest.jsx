import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Skeleton,
  Collapse,
  Box,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Approve icon
import CancelIcon from "@mui/icons-material/Cancel"; // Reject icon
import PropTypes from "prop-types";
import RequestApproval from "./RequestApproval"; // Updated import
import RequestReject from "./RequestReject"; // Updated import

// Row Component to show hospital details and requests
function Row({ row }) {
  const [open, setOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);

  // Token constant to ensure consistency
  // const AUTH_TOKEN =
  //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzcyM2UxY2ZjZmFlODg2NWY2YmE0NyIsImlhdCI6MTc0MTEwNTI2NywiZXhwIjoxNzQxOTY5MjY3fQ.so24278sLpGglaVnHVt03l-ghfUs9gbPykwgQSU3W0w";

  // Fetch approval requests when the row is expanded
  useEffect(() => {
    if (open && requests.length === 0) {
      const fetchRequests = async () => {
        setLoadingRequests(true);
        try {
          // Fetch token from localStorage
          const token = localStorage.getItem("token");
          if (!token) {
            console.error("No token found in localStorage. Please log in.");
            setRequests([]);
            return;
          }
          const response = await axios.get(
            `https://resourcehive-backend.vercel.app/api/v1/hospitals/${row._id}/get-approval-requests`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("API Response:", response.data.data);
          setRequests(response.data.data || []);
        } catch (error) {
          console.error("Error fetching approval requests:", error);
          setRequests([]);
        } finally {
          setLoadingRequests(false);
        }
      };
      fetchRequests();
    }
  }, [open, row._id]);

  // Determine approval status for the "Approval" column
  // const getApprovalStatuss = (request) => {
  //   if (request.userId.role === request.userId.requestedRole) {
  //     return "Approved"; // Roles match, either from API or backend response
  //   } else {
  //     return "Pending";
  //   }
  // };
  const getApprovalStatus = (response) => {
    console.log("Full Response:", response);
  
    // Access the role and requestedRole properly (adjust based on actual structure)
    const role = response.userId?.role; // Access role from userId if it's nested
    const requestedRole = response.userId?.requestedRole; // Access requestedRole from userId if nested
  
    // Log values to verify
    console.log("Role:", role, "Requested Role:", requestedRole);
  
    if (role === requestedRole) {
      return "Approved"; // Roles match
    } else {
      return "Not Approved"; // Roles don't match
    }
  };
  
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">
          {row.location.address.city}, {row.location.address.state}
        </TableCell>
        <TableCell align="right">{row.contactDetails.phone}</TableCell>
        <TableCell align="right">
          <a
            href={row.contactDetails.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {row.contactDetails.website}
          </a>
        </TableCell>
        <TableCell align="right">
          {/* No actions for the hospital row itself */}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Approval Requests
              </Typography>
              <Table size="small" aria-label="requests">
                <TableHead>
                  <TableRow>
                    <TableCell>User Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Requested Role</TableCell>
                    <TableCell align="right">Current Role</TableCell>
                    <TableCell align="right">Approval</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loadingRequests ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        <Skeleton variant="text" width="80%" />
                      </TableCell>
                    </TableRow>
                  ) : requests.length > 0 ? (
                    requests.map((request) => (
                      <TableRow key={request._id}>
                        <TableCell>{request.userId.name}</TableCell>
                        <TableCell align="right">
                          {request.userId.email}
                        </TableCell>
                        <TableCell align="right">
                          {request.userId.requestedRole}
                        </TableCell>
                        <TableCell align="right">
                          {request.userId.role}
                        </TableCell>
                        <TableCell align="right">
                          {getApprovalStatus(request)}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={() =>
                              RequestApproval(
                                request.hospitalId,
                                request.userId._id,
                                setRequests
                              )
                            } // Updated function name
                            color="success"
                            sx={{ mr: 1 }} // Gap between buttons
                          >
                            <CheckCircleIcon />
                          </IconButton>
                          <IconButton
                            onClick={() =>
                              RequestReject(
                                request.hospitalId,
                                request.userId._id,
                                request.userId.approvalStatus,
                                setRequests
                              )
                            } // Updated function name
                            color="error"
                          >
                            <CancelIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No approval requests found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.shape({
      address: PropTypes.shape({
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    contactDetails: PropTypes.shape({
      phone: PropTypes.string.isRequired,
      website: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default function RegisteredRequest() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Token constant to ensure consistency
  // const AUTH_TOKEN =
  //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzcyM2UxY2ZjZmFlODg2NWY2YmE0NyIsImlhdCI6MTc0MTEwNTI2NywiZXhwIjoxNzQxOTY5MjY3fQ.so24278sLpGglaVnHVt03l-ghfUs9gbPykwgQSU3W0w";

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        // Fetch token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage. Please log in.");
          setHospitals([]);
          return;
        }
        const response = await axios.get(
          "https://resourcehive-backend.vercel.app/api/v1/hospitals/registered-hospitals",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setHospitals(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
        setLoading(false);
      }
    };

    fetchHospitals();
    const intervalId = setInterval(fetchHospitals, 30000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Hospital Name</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Contact</TableCell>
              <TableCell align="right">Website</TableCell>
              {/* <TableCell align="right">Action</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from(new Array(3)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton variant="circle" width={40} height={40} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width="80%" />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton variant="text" width="60%" />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton variant="text" width="40%" />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton variant="text" width="80%" />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton variant="text" width="80%" />
                  </TableCell>
                </TableRow>
              ))
            ) : hospitals.length > 0 ? (
              hospitals.map((hospital) => (
                <Row key={hospital._id} row={hospital} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No hospitals found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
