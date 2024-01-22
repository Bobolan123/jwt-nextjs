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
import { getCookie } from 'cookies-next';

export default function SelectGroupForm(props: any) {
  const [selectGroup, setSelectGroup] = React.useState("");
  const groups = props.groups;
  const [roles, setRoles] = React.useState([]);
  const access_token = getCookie('jwt')

  function handleChange(groupId: any): void {
    setSelectGroup(groupId);
  }
  const fetchData = async () => {
    //read all roles
    const response = await fetch(`http://localhost:3001/api/role/read`, {
      method: "GET",
      headers: {
        'authorization': `Bearer ${access_token}`
      }
    });
    const roles = await response.json();
    setRoles(roles);
  };
  React.useEffect(() => {
    fetchData();
  }, [selectGroup]);

  const handleCheckBox = async (groupId: any, role: any) => {
    role.groups = [{ id: groupId }];
    const updateGroupInRole = await fetch(
      `http://localhost:3001/api/role/update/${role.id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          url: role.url,
          description: role.description,
          groupIds: [{ id: groupId }],
        }),
        headers: {
          "Content-Type": "application/json",
            'authorization': `Bearer ${access_token}`
        },
      }
    );
    if (updateGroupInRole) {
      fetchData();
    }
  };

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
                    onClick={() => handleCheckBox(selectGroup, role)}
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
          <Button className="w-20 bg-cyan-600 text-neutral-50">Save</Button>
        </FormGroup>
      </Box>
    </div>
  );
}
