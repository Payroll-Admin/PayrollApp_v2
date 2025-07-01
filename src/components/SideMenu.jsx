import React, { useState } from "react";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const menuItems = [
  { id: "details", label: "Employee Details" },
  { id: "attendance", label: "Attendance" },
  { id: "payroll", label: "Payroll Summary" },
  { id: "dashboard", label: "Payroll Dashboard" },
];

const DrawerSideMenu = ({ activeTab, onTabChange, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", alignItems: "stretch", minHeight: "100%" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: sidebarOpen ? 220 : 48,
          bgcolor: sidebarOpen ? "#f9f9f9" : "transparent",
          boxShadow: sidebarOpen ? 2 : "none",
          borderRadius: 2,
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          transition: "all 0.3s ease",
          height: "auto",
          alignSelf: "stretch",
        }}
      >
        {/* Hamburger Icon */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            bgcolor: sidebarOpen ? "#D0B8A8" : "transparent",
            py: 1,
            px: 0,
            borderRadius: 1,
            transition: "all 0.3s ease",
            width: "100%",
          }}
        >
          <IconButton onClick={() => setSidebarOpen(!sidebarOpen)}>
            <MenuIcon />
          </IconButton>

          {sidebarOpen && (
            <Box
              component="span"
              sx={{
                ml: 2,
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              MENU
            </Box>
          )}
        </Box>

        {/* Menu Items with Hover Pop Effect */}
        {sidebarOpen && (
          <List sx={{ width: "100%" }}>
            {menuItems.map(({ id, label }) => (
              <ListItem key={id} disablePadding>
                <ListItemButton
                  selected={activeTab === id}
                  onClick={() => onTabChange(id)}
                  sx={{
                    borderRadius: 1,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#e0e0e0",
                      transform: "scale(1.05)",
                      boxShadow: 2,
                    },
                    "&.Mui-selected": {
                      backgroundColor: "#e2d2c6",
                      "&:hover": {
                        backgroundColor: "#e2d2c6",
                      },
                    },
                  }}
                >
                  <ListItemText
                    primary={label}
                    sx={{
                      textAlign: "left",
                      pl: 1,
                      fontWeight: "bold",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 2 }}>{children}</Box>
    </Box>
  );
};

export default DrawerSideMenu;
