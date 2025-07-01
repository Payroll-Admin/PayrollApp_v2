import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
  Chip,
} from "@mui/material";

const PayrollApproval = ({ payroll }) => {
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
      employeeId: payroll["Employee ID"],
      employeeName: payroll["Full Name"] || "",
      employeeEmail: payroll["Email"] || "",
      month: new Date().toLocaleString("default", {
        month: "long",
        year: "numeric",
      }),
      status: approvalStatus,
      reason: approvalStatus === "Rejected" ? reason : "",
    };

    console.log("🚀 Sending Payload:", payload);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbznaZIQ-JCtZOUoG_JIJl2tEknFi0A-BVEe0KcEGEqZevp1XMGfbN3BseESalHs9QQ9vA/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const text = await response.text();
      console.log("📩 Raw response:", text);
      const result = JSON.parse(text);

      if (result.success) {
        setMessage(`✅ ${approvalStatus} submitted successfully!`);
        setSubmitted(true);
      } else {
        alert(result.message || "⚠️ Submission failed.");
      }
    } catch (error) {
      console.error("❌ Submission error:", error);
      alert("❌ Something went wrong. Check console.");
    }
  };

  return (
    <Box
      mt={4}
      sx={{
        bgcolor: "#FFF",
        p: 3,
        borderRadius: 2,
        boxShadow: 2,
        maxWidth: "80%",
        mx: "auto",
      }}
    >
      <Typography variant="h6" mb={2}>
        Payroll Approval
      </Typography>

      {submitted && (
        <Chip
          label={`Submitted: ${approvalStatus}`}
          color={approvalStatus === "Approved" ? "success" : "error"}
          variant="outlined"
          sx={{ mb: 2 }}
        />
      )}

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
