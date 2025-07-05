import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

const PayrollDashboard = ({ payroll }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!payroll) return <Typography>No payroll data available.</Typography>;

  const pieData = [
    { name: "Present Days", value: Number(payroll["Present Days"]) },
    { name: "Absent Days", value: Number(payroll["Absent Days"]) },
    { name: "Weekoff", value: Number(payroll["Weekoff"]) },
    { name: "Half Days", value: Number(payroll["Half Days"]) },
  ];

  const barData = [
    { metric: "Present", value: Number(payroll["Present Days"]) },
    { metric: "Absent", value: Number(payroll["Absent Days"]) },
    { metric: "Weekoff", value: Number(payroll["Weekoff"]) },
    { metric: "Half Days", value: Number(payroll["Half Days"]) },
    { metric: "Deduction", value: Number(payroll["Total Deduction (₹)"]) },
  ];

  const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28"];

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: isMobile ? "auto" : "visible",
        WebkitOverflowScrolling: "touch",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          mb: 4,
          borderRadius: 2,
          boxShadow: "none",
          width: isMobile ? "700px" : "80%",
          minWidth: isMobile ? "700px" : "auto",
          "&:hover": { boxShadow: 3 },
        }}
      >
        <CardContent>
          {/* Cream Header Block */}
          <Box textAlign="center" width="100%" mb={3}>
            <Box
              sx={{
                bgcolor: "#D0B8A8",
                px: 2,
                py: 1,
                borderRadius: 1,
                width: "94%",
                mx: "auto",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontSize: "24px", fontWeight: "bold" }}
              >
                Payroll Dashboard
              </Typography>
            </Box>
          </Box>

          {/* Pie Chart Section */}
          <Typography variant="h6" mt={2} mb={2}>
            Attendance Distribution (Pie Chart)
          </Typography>
          <Box display="flex" justifyContent="center">
            <PieChart width={400} height={300}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    cursor="pointer"
                    style={{ transition: "transform 0.2s ease" }}
                    onMouseOver={(e) => {
                      e.target.style.transform = "scale(1.1)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = "scale(1)";
                    }}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Box>

          {/* Bar Chart Section */}
          <Typography variant="h6" mt={4} mb={2}>
            Payroll Metrics (Bar Chart)
          </Typography>
          <Box display="flex" justifyContent="center">
            <BarChart
              width={600}
              height={300}
              data={barData}
              margin={{ top: 20 }}
            >
              <XAxis dataKey="metric" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="value"
                fill="#82ca9d"
                cursor="pointer"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {barData.map((entry, index) => (
                  <Cell
                    key={`bar-${index}`}
                    fill={activeIndex === index ? "#4CAF50" : "#82ca9d"}
                  />
                ))}
              </Bar>
            </BarChart>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PayrollDashboard;
