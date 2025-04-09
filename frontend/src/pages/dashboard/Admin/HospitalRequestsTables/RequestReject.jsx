import axios from "axios";
import toast from "react-hot-toast";

// Token constant to ensure consistency
// const AUTH_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzcyM2UxY2ZjZmFlODg2NWY2YmE0NyIsImlhdCI6MTc0MTEwNTI2NywiZXhwIjoxNzQxOTY5MjY3fQ.so24278sLpGglaVnHVt03l-ghfUs9gbPykwgQSU3W0w";

// Reject/Disapprove action: Set role to "user" if approved, otherwise just mark as rejected
const RequestReject = async (hospitalId, userId, currentStatus, setRequests) => {
  try {
    // Fetch token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage. Please log in.");
      toast.error("Authentication required. Please log in.");
      return;
    }
    if (currentStatus === "approved") {
      // Disapprove: Change role from "manager" to "user"
      console.log(hospitalId, userId ,"wao")
      await axios.patch(
        `https://resourcehive-backend.vercel.app/api/v1/hospitals/hospital-manager-request-rejected-by-admin/${hospitalId}/${userId}`,
        { role: "user" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Update local state to reflect disapproval
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.userId._id === userId
            ? { ...req, userId: { ...req.userId, approvalStatus: "rejected", role: "user" } }
            : req
        )
      );
    } else {
      // Initial rejection: Just mark as rejected without changing role
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.userId._id === userId
            ? { ...req, userId: { ...req.userId, approvalStatus: "rejected" } }
            : req
        )
      );
    }
  } catch (error) {
    console.error("Error rejecting/disapproving request:", error);
  }
};

export default RequestReject;

// Reject/Disapprove action: Handle rejection entirely on the frontend


// const RequestReject = async (hospitalId, userId, currentStatus, setRequests) => {
//   try {
//     if (currentStatus === "approved") {
//       // Disapprove: Change role from "manager" to "user" locally
//       setRequests((prevRequests) =>
//         prevRequests.map((req) =>
//           req.userId._id === userId
//             ? { ...req, userId: { ...req.userId, approvalStatus: "rejected", role: "user" } }
//             : req
//         )
//       );
//     } else {
//       // Initial rejection: Just mark as rejected without changing role
//       setRequests((prevRequests) =>
//         prevRequests.map((req) =>
//           req.userId._id === userId
//             ? { ...req, userId: { ...req.userId, approvalStatus: "rejected" } }
//             : req
//         )
//       );
//     }
//   } catch (error) {
//     console.error("Error rejecting/disapproving request:", error);
//   }
// };

// export default RequestReject;