import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
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
  useMediaQuery,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DownloadIcon from "@mui/icons-material/Download";

const PayrollSummary = ({ payroll }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openDialog, setOpenDialog] = React.useState(false);

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

  const handlePayslipDownload = () => {
    const doc = new jsPDF();

    // Document Title
    doc.setFontSize(18);
    doc.text("Monthly Payslip", 105, 20, { align: "center" });

    // Basic Info
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    // Table Content
    const tableRows = rows.map(([label, value]) => [label, String(value)]);

    doc.autoTable({
      startY: 40,
      head: [["Metric", "Value"]],
      body: tableRows,
      theme: "grid",
      headStyles: {
        fillColor: [208, 184, 168],
        textColor: 0,
        fontStyle: "bold",
      },
      styles: {
        cellPadding: 4,
        fontSize: 11,
      },
    });

    doc.save("Payslip.pdf");
    setOpenDialog(false);
  };

  return (
    <Card
      sx={{
        mb: 4,
        borderRadius: 2,
        boxShadow: "none",
        width: isMobile ? "100%" : "80%",
        mx: "auto",
        "&:hover": { boxShadow: 3 },
      }}
    >
      <CardContent>
        {/* Cream Header with Center Title and Right Button */}
        <Box
          sx={{
            mb: 3,
            px: isMobile ? 2 : 4,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              bgcolor: "#D0B8A8",
              px: 3,
              py: 1.5,
              borderRadius: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
                flexGrow: 1,
                textAlign: "center",
              }}
            >
              Payroll Summary
            </Typography>

            <Button
              variant="text"
              startIcon={<DownloadIcon />}
              onClick={() => setOpenDialog(true)}
              sx={{
                color: "#5C3D2E",
                textTransform: "none",
                border: "1px solid transparent",
                ml: "auto",
                mr: 1,
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "underline",
                },
              }}
            >
              Payslip
            </Button>
          </Box>
        </Box>

        {/* Table */}
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
                    transform: "scale(1.01)",
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
                    fontWeight: label.includes("Net Salary") ? "bold" : "normal",
                  }}
                >
                  {value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Confirmation Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Download Payslip</DialogTitle>
          <DialogContent>
            Are you sure you want to download this month's payslip?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>No</Button>
            <Button variant="contained" onClick={handlePayslipDownload}>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default PayrollSummary;
