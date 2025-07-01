import React, { useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
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

  if (!payroll) {
    return <Typography>No payroll data available.</Typography>;
  }

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
    <Card
      sx={{
        mb: 4,
        borderRadius: 2,
        transition: "box-shadow 0.3s ease-in-out",
        boxShadow: "none",
        maxWidth: "90%",
        "&:hover": {
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        {/* Dashboard Header */}
        <Box textAlign="center" width="94%" mb={3}>
          <Box
            sx={{
              bgcolor: "#D0B8A8",
              px: 2,
              py: 1,
              borderRadius: 1,
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
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

        {/* Bar Chart Section */}
        <Typography variant="h6" mt={4} mb={2}>
          Payroll Metrics (Bar Chart)
        </Typography>
        <BarChart width={600} height={300} data={barData} margin={{ top: 20 }}>
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
      </CardContent>
    </Card>
  );
};

export default PayrollDashboard;
