import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
} from "@mui/material";

const PayrollApproval = ({ payroll, employee }) => {
  const [approvalStatus, setApprovalStatus] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!approvalStatus) {
      alert("Please select approval status.");
      return;
    }

    if (approvalStatus === "Rejected" && reason.trim() === "") {
      alert("Please provide a reason for rejection.");
      return;
    }

    const payload = {
      employeeId: employee?.["Employee ID"] || "N/A",
      employeeName: employee?.Name || "N/A",
      status: approvalStatus,
      reason: approvalStatus === "Rejected" ? reason : "",
      // month: removed as per your request
    };

    console.log("🟢 Submitting payload:", payload);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyZrRHvoGJ-xTIEBlgt4C-JHDYJVQJRNCsfZ4UC5h3BkTwhHTbb25ixoTUw_sGJrmXr2Q/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (result.success) {
        alert(`✅ ${approvalStatus} submitted successfully!`);
        setApprovalStatus("");
        setReason("");
        setSubmitted(true);
      } else {
        alert(result.message || "⚠️ Submission failed.");
      }
    } catch (error) {
      console.error("❌ Error during submission:", error);
      alert("❌ Something went wrong. Check console for details.");
    }
  };

  return (
    <Box
      mt={4}
      sx={{
        width: { xs: "100%", sm: "90%", md: "60%" },
        mx: "auto", // center horizontally
        px: { xs: 1, sm: 2 }, // horizontal padding for mobile
      }}
    >
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Approval Status</InputLabel>
        <Select
          value={approvalStatus}
          label="Approval Status"
          onChange={(e) => setApprovalStatus(e.target.value)}
          disabled={submitted}
        >
          <MenuItem value="Approved">Approved</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
        </Select>
      </FormControl>

      {approvalStatus === "Rejected" && (
        <TextField
          label="Reason for Rejection"
          variant="outlined"
          fullWidth
          multiline
          minRows={2}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          sx={{ mb: 2 }}
          disabled={submitted}
        />
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={submitted}
      >
        Submit
      </Button>

      {message && (
        <Typography mt={2} fontWeight="bold" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default PayrollApproval;
