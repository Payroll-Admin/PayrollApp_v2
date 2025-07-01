import React, { useState, useEffect } from "react";
import axios from "axios";
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

import EmployeeSelector from "../components/EmployeeSelector";
import SideMenu from "../components/SideMenu";
import EmployeeDetails from "../components/EmployeeDetails";
import AttendanceTableCard from "../components/AttendanceTableCard";
import PayrollSummary from "../components/PayrollSummary";
import PayrollDashboard from "../components/PayrollDashboard";

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
      const result = JSON.parse(text);

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
    <Box mt={4} maxWidth="80%">
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

const Dashboard = ({ onLogout }) => {
  const [employees, setEmployees] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [payrollData, setPayrollData] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empRes, attRes, payRes] = await Promise.all([
          axios.get(
            "https://opensheet.elk.sh/1kipKG3qgAUdKl6nUhYQdcMU_mfx45vdA7Zte_t_0Jvs/Employees"
          ),
          axios.get(
            "https://opensheet.elk.sh/1kipKG3qgAUdKl6nUhYQdcMU_mfx45vdA7Zte_t_0Jvs/AttendanceData"
          ),
          axios.get(
            "https://opensheet.elk.sh/1kipKG3qgAUdKl6nUhYQdcMU_mfx45vdA7Zte_t_0Jvs/Payroll"
          ),
        ]);

        setEmployees(empRes.data);
        setAttendanceData(attRes.data);
        setPayrollData(payRes.data);

        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const companyOptions = [
    ...new Set(employees.map((emp) => emp["Company Name"])),
  ].filter(Boolean);

  const filteredEmployees = selectedCompany
    ? employees.filter((emp) => emp["Company Name"] === selectedCompany)
    : [];

  const selectedEmployee = employees.find(
    (emp) => emp["Employee ID"] === selectedEmployeeId
  );
  const employeeAttendance = attendanceData.filter(
    (rec) => rec["Employee ID"] === selectedEmployeeId
  );
  const employeePayroll = payrollData.find(
    (rec) => rec["Employee ID"] === selectedEmployeeId
  );

  if (loading)
    return <Typography sx={{ m: 4 }}>Loading employee data...</Typography>;
  if (error)
    return <Typography sx={{ m: 4, color: "red" }}>{error}</Typography>;
  if (!employees.length)
    return (
      <Typography sx={{ m: 4, color: "red" }}>
        No employee data found.
      </Typography>
    );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F8EDE3", width: "100%" }}>
      <Box
        sx={{
          bgcolor: "#C5705D",
          color: "white",
          px: { xs: 2, md: 4 },
          py: { xs: 1, md: 2 },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          minHeight: "120px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <img
            src="https://i.postimg.cc/zfxrdDkJ/logo-1.png"
            alt="Company Logo"
            style={{
              height: "100px",
              marginRight: "20px",
              borderRadius: "0px",
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Merriweather', serif",
              fontWeight: 800,
              fontSize: { xs: "24px", md: "48px" },
              textAlign: "center",
            }}
          >
            Payroll Employees
          </Typography>
        </Box>

        <Button
          variant="outlined"
          color="inherit"
          onClick={onLogout}
          sx={{ fontSize: { xs: "12px", md: "16px" }, whiteSpace: "nowrap" }}
        >
          Logout
        </Button>
      </Box>

      <Box
        sx={{
          bgcolor: "#D0B8A8",
          px: { xs: 2, md: 4 },
          py: { xs: 2, md: 3 },
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        <FormControl
          variant="outlined"
          sx={{ minWidth: { xs: "100%", sm: 250 } }}
          required
        >
          <InputLabel id="company-select-label">Select Company</InputLabel>
          <Select
            labelId="company-select-label"
            id="company-select"
            value={selectedCompany}
            onChange={(e) => {
              setSelectedCompany(e.target.value);
              setSelectedEmployeeId("");
            }}
            label="Select Company"
          >
            {companyOptions.map((company) => (
              <MenuItem key={company} value={company}>
                {company}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <EmployeeSelector
          employees={filteredEmployees}
          selectedEmployeeId={selectedEmployeeId}
          onSelect={setSelectedEmployeeId}
          selectedCompany={selectedCompany}
        />
      </Box>

      <Box
        sx={{
          px: { xs: 2, md: 4 },
          pt: { xs: 2, md: 4 },
          pb: 8,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {selectedCompany && selectedEmployeeId ? (
          <Box
            width="100%"
            maxWidth="1200px"
            display="flex"
            flexWrap="nowrap"
            overflowX="auto"
          >
            <SideMenu activeTab={activeTab} onTabChange={setActiveTab} />
            <Box
              sx={{ flexGrow: 1, ml: { xs: 0, md: 3 }, mt: { xs: 2, md: 0 } }}
            >
              {activeTab === "details" && (
                <EmployeeDetails
                  employee={selectedEmployee}
                  attendance={employeeAttendance}
                />
              )}
              {activeTab === "attendance" &&
                (employeeAttendance.length > 0 ? (
                  <AttendanceTableCard attendance={employeeAttendance} />
                ) : (
                  <Typography>No attendance records found.</Typography>
                ))}
              {activeTab === "payroll" &&
                (employeePayroll ? (
                  <>
                    <PayrollSummary payroll={employeePayroll} />
                    <PayrollApproval payroll={employeePayroll} />
                  </>
                ) : (
                  <Typography>No payroll data available.</Typography>
                ))}
              {activeTab === "dashboard" &&
                (employeePayroll ? (
                  <PayrollDashboard payroll={employeePayroll} />
                ) : (
                  <Typography>No payroll dashboard available.</Typography>
                ))}
            </Box>
          </Box>
        ) : (
          <Typography sx={{ mt: 4, fontSize: 18, color: "#999" }}>
            Please select both Company and Employee to view the dashboard.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
