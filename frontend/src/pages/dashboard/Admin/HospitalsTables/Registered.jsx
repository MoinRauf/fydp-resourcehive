import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Row({ row }) {
  const [open, setOpen] = useState(false);

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
          <a href={row.contactDetails.website} target="_blank" rel="noopener noreferrer">
            {row.contactDetails.website}
          </a>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Additional Details
              </Typography>
              <Table size="small" aria-label="details">
                <TableHead>
                  <TableRow>
                    <TableCell>Registration Number</TableCell>
                    <TableCell>Departments</TableCell>
                    <TableCell align="right">Established Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row.registrationNumber || "N/A"}</TableCell>
                    <TableCell>
                      {row.departments.map((dept) => dept.name).join(", ") || "N/A"}
                    </TableCell>
                    <TableCell align="right">{new Date(row.establishedDate).toLocaleDateString() || "N/A"}</TableCell>
                  </TableRow>
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
    departments: PropTypes.array.isRequired,
    registrationNumber: PropTypes.string,
    establishedDate: PropTypes.string.isRequired,
  }).isRequired,
};

export default function CollapsibleTable() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    axios
      .get("https://resourcehive-backend.vercel.app/api/v1/hospitals/registered-hospitals", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzdhNTJhZTVkOWIzYzU1OGEzMGMzNiIsImlhdCI6MTc0MTIwMjU5OSwiZXhwIjoxNzQyMDY2NTk5fQ.yq8oRH1yQnO5KVa2oEeaoaLTOa-F85sGY8uwlnOMulE`,
        },
      })
      .then((response) => {
        console.log("API Response:", response.data);
        setHospitals(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching hospitals:", error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Hospital Name</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Contact</TableCell>
            <TableCell align="right">Website</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hospitals.length > 0 ? (
            hospitals.map((hospital) => <Row key={hospital._id} row={hospital} />)
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No hospitals found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
