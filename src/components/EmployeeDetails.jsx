import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableRow,
  TableCell,
  TableBody,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Dummy images
const maleDummyImage = "https://avatar.iran.liara.run/public/boy";
const femaleDummyImage = "https://avatar.iran.liara.run/public/girl";

// Google Drive link cleanup
const getGoogleDriveDirectLink = (url) => {
  const match = url.match(/[-\w]{25,}/);
  return match ? `https://drive.google.com/uc?export=view&id=${match[0]}` : "";
};

const EmployeeDetails = ({ employee, activeTab }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showSalary, setShowSalary] = useState(false);

  const rawPhotoUrl = employee["Profile Picture"] || "";
  const cleanPhotoUrl = getGoogleDriveDirectLink(rawPhotoUrl);

  const profileImageUrl =
    cleanPhotoUrl ||
    (employee.Gender === "Male" ? maleDummyImage : femaleDummyImage);

  // 👇 Reset salary visibility when tab changes
  useEffect(() => {
    setShowSalary(false);
  }, [activeTab]);

  return (
    <Card
      sx={{
        mb: 4,
        borderRadius: 2,
        transition: "box-shadow 0.3s ease-in-out",
        boxShadow: "none",
        width: isMobile ? "100%" : "80%",
        mx: "auto",
        "&:hover": {
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        {/* Header */}
        <Box textAlign="center" width="100%" mb={3}>
          <Box
            sx={{
              bgcolor: "#D0B8A8",
              px: 2,
              py: 1,
              borderRadius: 1,
              width: "90%",
              mx: "auto",
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

        {/* Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column-reverse" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "center" : "flex-start",
            gap: 4,
            px: isMobile ? 0 : 4,
          }}
        >
          {/* Table Section */}
          <Box sx={{ width: isMobile ? "100%" : "50%" }}>
            <Table size="small">
              <TableBody>
                {[
                  ["Employee ID", employee["Employee ID"]],
                  ["Name", employee.Name],
                  ["Department", employee.Department],
                  ["Designation", employee.Designation],
                  ["Gender", employee.Gender],
                  ["Joining Date", employee.DOJ],
                  [
                    "Salary",
                    <Box
                      key="salary"
                      onClick={() => setShowSalary((prev) => !prev)}
                      sx={{
                        fontFamily: "monospace",
                        filter: showSalary ? "none" : "blur(6px)",
                        transition: "0.3s",
                        cursor: "pointer",
                        userSelect: "none",
                      }}
                    >
                      ₹{employee["Salary/Month"]}
                    </Box>,
                  ],
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
              width: 200,
              height: 200,
              borderRadius: "50%",
              objectFit: "cover",
              boxShadow: 10,
              mt: isMobile ? 2 : 4,
              mr: isMobile ? 0 : 7,
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default EmployeeDetails;
