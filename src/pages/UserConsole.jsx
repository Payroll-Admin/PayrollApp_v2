import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import SideMenu from "../components/SideMenu";
import EmployeeDetails from "../components/EmployeeDetails";
import AttendanceTableCard from "../components/AttendanceTableCard";
import PayrollSummary from "../components/PayrollSummary";
import PayrollDashboard from "../components/PayrollDashboard";
import PayrollApproval from "../components/PayrollApproval";

function UserConsole({ user, onLogout }) {
  const [loading, setLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState([]);
  const [payrollData, setPayrollData] = useState([]);
  const [employeeData, setEmployeeData] = useState(null);
  const [activeTab, setActiveTab] = useState("details");

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

        const employee = empRes.data.find(
          (emp) => emp["Employee ID"] === user.id
        );

        const empAttendance = attRes.data.filter(
          (att) => att["Employee ID"] === user.id
        );

        const empPayroll = payRes.data.find(
          (pay) => pay["Employee ID"] === user.id
        );

        setEmployeeData({
          ...employee,
          attendance: empAttendance,
          payroll: empPayroll,
        });

        setAttendanceData(empAttendance);
        setPayrollData(empPayroll);
        setLoading(false);
      } catch (err) {
        console.error("Error loading user data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [user.id]);

  if (loading || !employeeData) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F8EDE3", width: "100%" }}>
      {/* HEADER */}
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
            style={{ height: 80, marginRight: 20 }}
          />
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Merriweather', serif",
              fontWeight: 800,
              fontSize: { xs: 20, md: 36 },
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
          sx={{ fontSize: { xs: 12, md: 16 }, whiteSpace: "nowrap" }}
        >
          Logout
        </Button>
      </Box>

      {/* SUB HEADER */}
      <Box
        sx={{
          bgcolor: "#D0B8A8",
          textAlign: "center",
          px: 2,
          py: 3,
        }}
      >
        <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold">
          Welcome, {employeeData["Name"]}
        </Typography>
      </Box>

      {/* MAIN */}
      <Box
        sx={{
          px: { xs: 2, md: 4 },
          py: 3,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 3,
        }}
      >
        <SideMenu
          activeTab={activeTab}
          onTabChange={setActiveTab}
          vertical={!isMobile}
        />

        <Box sx={{ flexGrow: 1 }}>
          {activeTab === "details" && (
            <EmployeeDetails
              employee={employeeData}
              attendance={attendanceData}
            />
          )}
          {activeTab === "attendance" && (
            <AttendanceTableCard attendance={attendanceData} />
          )}
          {activeTab === "payroll" && payrollData && (
            <>
              <PayrollSummary payroll={payrollData} />
              <PayrollApproval payroll={payrollData} employee={employeeData} />
            </>
          )}
          {activeTab === "dashboard" && payrollData && (
            <PayrollDashboard payroll={payrollData} />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default UserConsole;
