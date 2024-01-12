"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { PlusCircle } from "lucide-react";

// TODO remove, this demo shouldn't need to reset the theme.

export default function AddUrlForm(props:any) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userAcc = {
      url: data.get("url"),
      description: data.get("description"),
      groupIds: []
    };
    const res = await fetch(`http://localhost:3001/api/role/create`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(userAcc),
    });
    const dt = await res.json();
    props.handleRerende()
  };

  return (
    <div>
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          width: 1000,
          flexWrap: "nowrap",
        }}
      >
        <Typography component="h1" variant="h5">
          Add new Role
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            id="url"
            label="URL"
            name="url"
            autoComplete="url"
            autoFocus
            className="w-5/12 mr-6"
          />
          <TextField
            margin="normal"
            required
            name="description"
            label="Description"
            type="description"
            id="description"
            autoComplete="description"
            className="w-5/12"
          />
          <Button type="submit" sx={{ mt: 3, mb: 2 }}>
            <PlusCircle color="green" />
          </Button>
          <Button
            type="submit"
            variant="contained"
            style={{
              borderRadius: 20,
              padding: "10px 20px",
              backgroundColor: "yellow",
              color: "black",
            }}
            sx={{ mt: 3, mb: 2 }}
            className="block "
          >
            ADD
          </Button>
        </Box>
      </Box>
    </div>
  );
}
