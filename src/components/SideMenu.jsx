import React, { useState } from "react";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";

const menuItems = [
  { id: "details", label: "Employee Details" },
  { id: "attendance", label: "Attendance" },
  { id: "payroll", label: "Payroll Summary" },
  { id: "dashboard", label: "Payroll Dashboard" },
];

const DrawerSideMenu = ({ activeTab, onTabChange, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Mobile Drawer Menu
  const mobileMenu = (
    <>
      {/* Floating Hamburger Icon (hidden when drawer is open) */}
      {!sidebarOpen && (
        <IconButton
          onClick={() => setSidebarOpen(true)}
          sx={{
            position: "absolute",
            top: 0,
            left: 12,
            zIndex: 1300,
            backgroundColor: "#fff",
            borderRadius: "50%",
            boxShadow: 2,
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Drawer Panel */}
      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        ModalProps={{
          keepMounted: true, // better open performance on mobile
        }}
      >
        <Box
          sx={{
            width: 200,
            bgcolor: "#f9f9f9",
            height: "100%",
            p: 2,
          }}
          onClick={() => setSidebarOpen(false)} // close on outside content click
        >
          <Box
            component="span"
            sx={{
              fontSize: 24,
              fontWeight: "bold",
              display: "block",
              mb: 2,
            }}
          >
            MENU
          </Box>
          <List>
            {menuItems.map(({ id, label }) => (
              <ListItem key={id} disablePadding>
                <ListItemButton
                  selected={activeTab === id}
                  onClick={() => {
                    onTabChange(id);
                    setSidebarOpen(false);
                  }}
                  sx={{
                    borderRadius: 1,
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
                    sx={{ textAlign: "left", pl: 1, fontWeight: "bold" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );

  // Desktop Sidebar
  const desktopMenu = (
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
            sx={{ ml: 2, fontSize: 24, fontWeight: "bold" }}
          >
            MENU
          </Box>
        )}
      </Box>

      {sidebarOpen && (
        <List sx={{ width: "100%" }}>
          {menuItems.map(({ id, label }) => (
            <ListItem key={id} disablePadding>
              <ListItemButton
                selected={activeTab === id}
                onClick={() => onTabChange(id)}
                sx={{
                  borderRadius: 1,
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
                  sx={{ textAlign: "left", pl: 1, fontWeight: "bold" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "stretch",
        flexDirection: isMobile ? "column" : "row",
        position: "relative", // necessary for absolute hamburger icon
      }}
    >
      {isMobile ? mobileMenu : desktopMenu}
      <Box sx={{ flexGrow: 1, p: 2 }}>{children}</Box>
    </Box>
  );
};

export default DrawerSideMenu;
