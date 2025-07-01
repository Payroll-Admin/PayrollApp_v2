import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const AttendanceTableCard = ({ attendance }) => {
  // Calculate raw total deduction
  const rawTotalDeduction = attendance.reduce((sum, record) => {
    const deduction = record["DAY WISE DEDUCTION"];
    // Only add if it's a valid number and not "N/A" or "➖"
    if (deduction && !isNaN(parseFloat(deduction))) {
      return sum + parseFloat(deduction);
    }
    return sum;
  }, 0);

  // Apply rounding logic
  let roundedTotalDeduction;
  const decimalPart = rawTotalDeduction % 1; // Get the decimal part (e.g., 10.75 -> 0.75)

  // This handles positive and negative numbers correctly for the decimal part
  // Ensure decimalPart is always positive for the rounding rule
  const absoluteDecimalPart = Math.abs(decimalPart);

  if (absoluteDecimalPart >= 0 && absoluteDecimalPart <= 0.5) {
    roundedTotalDeduction = Math.floor(rawTotalDeduction); // Round down
  } else {
    roundedTotalDeduction = Math.ceil(rawTotalDeduction); // Round up
  }

  // Calculate the round-off difference
  const roundOffValue = roundedTotalDeduction - rawTotalDeduction;

  return (
    <Card
      sx={{
        borderRadius: 2,
        transition: "box-shadow 0.3s ease-in-out",
        boxShadow: "none",
        "&:hover": {
          boxShadow: 3,
        },
        width: "100%",
      }}
    >
      <CardContent>
        {/* Styled Header inside the Card */}
        <Box
          sx={{
            bgcolor: "#D0B8A8",
            px: 2,
            py: 1,
            borderRadius: 1,
            width: "94%",
            mb: 3,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontSize: "24px", fontWeight: "bold" }}
          >
            Attendance Records
          </Typography>
        </Box>

        {/* --- Color-coding Note --- */}
        <Box
          sx={{
            mb: 2,
            p: 1,
            border: "1px solid #eee",
            borderRadius: 1,
            bgcolor: "#fbfbfb",
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: "bold", mb: 0.5 }}>
            Note on Row Colors:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  bgcolor: "#a9cc9c",
                  borderRadius: "50%",
                  mr: 1,
                }}
              ></Box>
              <Typography variant="body2">Late</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  bgcolor: "#ea9999",
                  borderRadius: "50%",
                  mr: 1,
                }}
              ></Box>
              <Typography variant="body2">Half Day</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  bgcolor: "#b4a7d6",
                  borderRadius: "50%",
                  mr: 1,
                }}
              ></Box>
              <Typography variant="body2">Absent</Typography>
            </Box>
          </Box>
        </Box>
        {/* --- End Color-coding Note --- */}

        <Table>
          <TableHead>
            <TableRow>
              {[
                "Date",
                "In Time",
                "Out Time",
                "Status",
                "Day Wise Deduction",
              ].map((head) => (
                <TableCell
                  key={head}
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "15px",
                    whiteSpace: "nowrap",
                    padding: "12px 8px",
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance.map((record, i) => {
              let bgColor = i % 2 === 0 ? "#f9f9f9" : "#ffffff"; // Default zebra striping
              let isHighlighted = false;

              // Conditional row color based on status
              if (record.Status?.toLowerCase() === "late") {
                bgColor = "#a9cc9c";
                isHighlighted = true;
              }
              if (record.Status?.toLowerCase() === "half day") {
                bgColor = "#ea9999";
                isHighlighted = true;
              }
              if (record.Status?.toLowerCase() === "absent") {
                bgColor = "#b4a7d6";
                isHighlighted = true;
              }

              return (
                <TableRow
                  key={i}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    backgroundColor: bgColor,
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: isHighlighted ? bgColor : "#e0e0e0", // Grey only if not highlighted
                      transform: "scale(1.02)",
                      boxShadow: 2,
                    },
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{ fontSize: "14px", padding: "14px 8px" }}
                  >
                    {record.Date}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "14px", padding: "14px 8px" }}
                  >
                    {record["In Time"]}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "14px", padding: "14px 8px" }}
                  >
                    {record["Out Time"]}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "14px", padding: "14px 8px" }}
                  >
                    {record.Status}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "14px", padding: "14px 8px" }}
                  >
                    {record["DAY WISE DEDUCTION"] || "➖"}
                  </TableCell>
                </TableRow>
              );
            })}
            {/* Total Row */}
            <TableRow>
              <TableCell
                colSpan={4}
                align="right"
                sx={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  padding: "14px 8px",
                  borderTop: "2px solid #ccc",
                }}
              >
                Total :
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  padding: "14px 8px",
                  borderTop: "2px solid #ccc",
                }}
              >
                {rawTotalDeduction.toFixed(2)}
              </TableCell>
            </TableRow>
            {/* Round off Row */}
            <TableRow>
              <TableCell
                colSpan={4}
                align="right"
                sx={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  padding: "14px 8px",
                }}
              >
                Round off :
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  padding: "14px 8px",
                }}
              >
                {roundOffValue.toFixed(2)}
              </TableCell>
            </TableRow>
            {/* Total Deduction Row (Rounded) */}
            <TableRow>
              <TableCell
                colSpan={4}
                align="right"
                sx={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  padding: "14px 8px",
                  borderBottom: "2px solid #ccc", // Bottom border for final total
                }}
              >
                Total Deduction :
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  padding: "14px 8px",
                  borderBottom: "2px solid #ccc", // Bottom border for final total
                }}
              >
                {roundedTotalDeduction.toFixed(0)}{" "}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AttendanceTableCard;
