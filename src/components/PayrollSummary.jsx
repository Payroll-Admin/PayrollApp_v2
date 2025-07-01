import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";

const PayrollSummary = ({ payroll }) => {
  if (!payroll) {
    return <Typography>No payroll data available.</Typography>;
  }

  const rows = [
    ["Present Days", payroll["Present Days"]],
    ["Absent Days", payroll["Absent Days"]],
    ["Half Days", payroll["Half Days"]],
    ["Late Marks", payroll["Total Late Hours"]],
    ["Week Offs", payroll["Weekoff"]],
    ["Per Day Salary (₹)", `₹${payroll["PER DAY"]}`],
    ["Per Hour Salary (₹)", `₹${payroll["PER HOUR"]}`],
    ["Deduction (₹)", `₹${payroll["Total Deduction (₹)"]}`],
    ["Profession Tax (₹)", `₹${payroll["Profession Tax"]}`],
    ["Net Salary (₹)", `₹${payroll["Net Payable Salary After P.T"]}`],
  ];

  return (
    <Card
      sx={{
        mb: 4,
        borderRadius: 2,
        boxShadow: "none",
        maxWidth: "80%",
        ml: "left",
        "&:hover": { boxShadow: 3 },
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              backgroundColor: "#D0B8A8",
              px: 2,
              py: 1,
              borderRadius: 1,
              width: "100%",
              textAlign: "center",
            }}
          >
            Payroll Summary
          </Typography>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
                Metric
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
                Value
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(([label, value]) => (
              <TableRow
                key={label}
                sx={{
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    transform: "scale(1.02)",
                    boxShadow: 2,
                  },
                }}
              >
                <TableCell sx={{ py: 1.5, px: 2, fontWeight: "bold" }}>
                  {label}
                </TableCell>
                <TableCell
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontWeight: label === "Net Salary (₹)" ? "bold" : "normal",
                  }}
                >
                  {value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PayrollSummary;
