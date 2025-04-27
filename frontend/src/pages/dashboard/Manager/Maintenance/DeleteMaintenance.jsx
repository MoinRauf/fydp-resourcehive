import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";

const DeleteMaintenance = ({
  openDeleteDialog,
  setOpenDeleteDialog,
  selectedMaintenance,
  hospitalId,
  equipmentId,
  setMaintenances,
}) => {
  const handleDelete = async () => {
    try {
      // Fetch token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage. Please log in.");
        alert("Authentication required. Please log in.");
        return;
      }

      const url = `https://resourcehive-backend.vercel.app/api/v1/${hospitalId}/${equipmentId}/maintenance/${selectedMaintenance._id}`;
      console.log("Request URL:", url);
      console.log("Maintenance ID:", selectedMaintenance._id);

      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("API Response:", response.data);

      setMaintenances((prevMaintenances) =>
        prevMaintenances.filter((maintenance) => maintenance._id !== selectedMaintenance._id)
      );

      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting maintenance:", error);
      if (error.response) {
        console.log("Response Status:", error.response.status);
        console.log("Response Data:", error.response.data);
      }
    }
  };

  return (
    <Dialog
      open={openDeleteDialog}
      onClose={() => setOpenDeleteDialog(false)}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#051221",
          color: "#FFFFFF",
        },
      }}
    >
      <DialogTitle sx={{ color: "#FFFFFF" }}>Delete Maintenance</DialogTitle>
      <DialogContent>
        <Typography sx={{ color: "#FFFFFF" }}>
          Are you sure you want to delete this maintenance record?
        </Typography>
        {selectedMaintenance && (
          <Typography sx={{ color: "#FFFFFF", mt: 1 }}>
            Timestamp: {new Date(selectedMaintenance.timestamp).toLocaleString()}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteMaintenance;