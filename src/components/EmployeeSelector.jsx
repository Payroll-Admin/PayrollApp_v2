import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const EmployeeSelector = ({
  employees,
  selectedEmployeeId,
  onSelect,
  selectedCompany,
}) => {
  return (
    <FormControl
      variant="outlined"
      sx={{ minWidth: { xs: "100%", sm: 250 } }}
      required
    >
      <InputLabel id="employee-select-label">Select Employee</InputLabel>
      <Select
        labelId="employee-select-label"
        id="employee-select"
        value={selectedEmployeeId}
        onChange={(e) => onSelect(e.target.value)}
        label="Select Employee"
        disabled={!selectedCompany} // Block employee selection until company is selected
      >
        {employees.map((emp) => (
          <MenuItem key={emp["Employee ID"]} value={emp["Employee ID"]}>
            {emp.Name} ({emp.Department})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default EmployeeSelector;
