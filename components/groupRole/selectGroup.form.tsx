"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

export default function SelectGroupForm(props: any) {
  const [selectGroup, setSelectGroup] = React.useState("");
  const groups = props.groups;
  const [roles, setRoles] = React.useState([{ url: "adsf" }]);

  function handleChange(groupId: any): void {
    setSelectGroup(groupId);
  }

  React.useEffect(() => { 
    const fetchData = async () => {
      //read all the role related to groups
      const tempRoles = await props.fetchRoles(selectGroup);
      setRoles(tempRoles);

      //read all roles
      const response = await fetch(`http://localhost:3001/api/role/read`, {
        method: "GET",
      });
      const roles = await response.json();
      setRoles(roles);
      console.log(roles);
    };

    fetchData();
  }, [selectGroup]);

  return (
    <div>
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          flexWrap: "nowrap",
        }}
      >
        <Typography component="h1" variant="h5">
          Group Role
        </Typography>
      </Box>

      <Box component="form" noValidate sx={{ mt: 1 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Group</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectGroup}
            label="Group"
            className="w-70"
            onChange={(event) => handleChange(event.target.value)}
          >
            {groups.map((group: any) => {
              return (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <hr></hr>
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          flexWrap: "nowrap",
        }}
      >
        <Typography component="h1" variant="h5">
          Assign Roles
        </Typography>
        <FormGroup>
          {Array.isArray(roles) ? (
            roles.map((role: any) => (
              <FormControlLabel
                key={role.url}
                control={
                  <Checkbox
                    checked={
                      selectGroup &&
                      role.groups &&
                      role.groups.some((group: any) => group.id === selectGroup)
                    }
                  />
                }
                label={role.url}
              />
            ))
          ) : (
            <Typography>No roles available</Typography>
          )}
          <Button>Save</Button>
        </FormGroup>
      </Box>
    </div>
  );
}
