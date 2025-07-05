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
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import EmployeeSelector from "../components/EmployeeSelector";
import SideMenu from "../components/SideMenu";
import EmployeeDetails from "../components/EmployeeDetails";
import AttendanceTableCard from "../components/AttendanceTableCard";
import PayrollSummary from "../components/PayrollSummary";
import PayrollDashboard from "../components/PayrollDashboard";
import PayrollApproval from "../components/PayrollApproval";

const Dashboard = ({ onLogout }) => {
  const [employees, setEmployees] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [payrollData, setPayrollData] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
      {/* HEADER */}
      <Box
        sx={{
          bgcolor: "#C5705D",
          color: "white",
          px: 2,
          py: 2,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <img
            src="https://i.postimg.cc/zfxrdDkJ/logo-1.png"
            alt="Company Logo"
            style={{ height: 60 }}
          />
          <Typography
            variant={isMobile ? "h6" : "h4"}
            fontFamily="'Merriweather', serif"
            fontWeight={800}
            textAlign="center"
          >
            Payroll Employees
          </Typography>
        </Box>
        <Button
          variant="outlined"
          color="inherit"
          onClick={onLogout}
          sx={{ mt: isMobile ? 1 : 0 }}
        >
          Logout
        </Button>
      </Box>

      {/* SUB HEADER */}
      <Box
        sx={{
          bgcolor: "#D0B8A8",
          px: 2,
          py: 3,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FormControl fullWidth sx={{ maxWidth: 300 }}>
          <InputLabel>Select Company</InputLabel>
          <Select
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

      {/* MAIN CONTENT */}
      <Box
        sx={{
          px: 2,
          pt: 3,
          pb: 6,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 3,
        }}
      >
        {selectedCompany && selectedEmployeeId ? (
          <Box
            width="100%"
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            gap={3}
          >
            <SideMenu
              activeTab={activeTab}
              onTabChange={setActiveTab}
              vertical={!isMobile}
            />
            <Box flexGrow={1}>
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
              {activeTab === "payroll" && employeePayroll && (
                <>
                  <PayrollSummary payroll={employeePayroll} />
                  <PayrollApproval
                    payroll={employeePayroll}
                    employee={selectedEmployee}
                  />
                </>
              )}
              {activeTab === "dashboard" &&
                (employeePayroll ? (
                  <PayrollDashboard payroll={employeePayroll} />
                ) : (
                  <Typography>No payroll dashboard available.</Typography>
                ))}
            </Box>
          </Box>
        ) : (
          <Typography
            sx={{ mt: 4, fontSize: 18, color: "#999", textAlign: "center" }}
          >
            Please select both Company and Employee to view the dashboard.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
