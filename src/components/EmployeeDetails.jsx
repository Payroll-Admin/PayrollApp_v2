import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

// Dummy images
const maleDummyImage = "https://avatar.iran.liara.run/public/boy";
const femaleDummyImage = "https://avatar.iran.liara.run/public/girl";

// For Google Drive links (if used later)
const getGoogleDriveDirectLink = (url) => {
  const match = url.match(/[-\w]{25,}/);
  return match ? `https://drive.google.com/uc?export=view&id=${match[0]}` : "";
};

const EmployeeDetails = ({ employee }) => {
  const rawPhotoUrl = employee["Profile Picture"] || "";
  const cleanPhotoUrl = getGoogleDriveDirectLink(rawPhotoUrl);

  // ✅ Fallback logic for dummy images based on gender
  const profileImageUrl =
    cleanPhotoUrl ||
    (employee.Gender === "Male" ? maleDummyImage : femaleDummyImage);

  return (
    <Card
      sx={{
        mb: 4,
        borderRadius: 2,
        transition: "box-shadow 0.3s ease-in-out",
        boxShadow: "none",
        maxWidth: "80%",
        ml: "left",
        "&:hover": {
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        {/* Employee Details Table Header */}
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
              Employee Details
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 4,
            flexWrap: "wrap",
          }}
        >
          {/* Table Section */}
          <Box textAlign="left" width="50%">
            <Table size="small">
              <TableBody>
                {[
                  ["Employee ID", employee["Employee ID"]],
                  ["Name", employee.Name],
                  ["Department", employee.Department],
                  ["Designation", employee.Designation],
                  ["Gender", employee.Gender],
                  ["Joining Date", employee.DOJ],
                  ["Salary", `₹${employee["Salary/Month"]}`],
                  ["Company", employee["Company Name"]],
                ].map(([label, value]) => (
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
                    <TableCell sx={{ py: 1, px: 2 }}>
                      <strong>{label}</strong>
                    </TableCell>
                    <TableCell sx={{ py: 0.5, px: 4 }}>{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

          {/* Profile Image */}
          <Box
            component="img"
            src={profileImageUrl}
            alt="Employee"
            onError={(e) => {
              e.target.src =
                employee.Gender === "Male" ? maleDummyImage : femaleDummyImage;
            }}
            sx={{
              mr: 7,
              mt: 4,
              width: 200,
              height: 200,
              borderRadius: "50%",
              objectFit: "cover",
              boxShadow: 10,
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default EmployeeDetails;
