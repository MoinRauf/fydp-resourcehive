import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  Box,
} from "@mui/material";
import axios from "axios";

const EditMaintenance = ({
  openEditDialog,
  setOpenEditDialog,
  selectedMaintenance,
  setSelectedMaintenance,
  hospitalId,
  equipmentId,
  setMaintenances,
}) => {
  const handleEditSubmit = async () => {
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
      console.log("Data being sent to API:", { timestamp: selectedMaintenance.timestamp });

      const response = await axios.patch(
        url,
        { timestamp: selectedMaintenance.timestamp },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("API Response:", response.data);

      setMaintenances((prevMaintenances) =>
        prevMaintenances.map((maintenance) =>
          maintenance._id === selectedMaintenance._id
            ? { ...maintenance, timestamp: selectedMaintenance.timestamp }
            : maintenance
        )
      );

      setOpenEditDialog(false);
      setSelectedMaintenance(null);
    } catch (error) {
      console.error("Error updating maintenance:", error);
      if (error.response) {
        console.log("Response Status:", error.response.status);
        console.log("Response Data:", error.response.data);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedMaintenance((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog
      open={openEditDialog}
      onClose={() => setOpenEditDialog(false)}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#051221",
          color: "#FFFFFF",
        },
      }}
    >
      <DialogTitle sx={{ color: "#FFFFFF" }}>Edit Maintenance</DialogTitle>
      <DialogContent>
        {selectedMaintenance && (
          <Box sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <TextField
                name="timestamp"
                label="Maintenance Timestamp"
                type="datetime-local"
                value={
                  selectedMaintenance.timestamp
                    ? new Date(selectedMaintenance.timestamp).toISOString().slice(0, 16)
                    : ""
                }
                onChange={handleInputChange}
                sx={{ padding: "7px", backgroundColor: "#FFFFFF", borderRadius: "4px" }}
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenEditDialog(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleEditSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditMaintenance;