'use client'

import { Button, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";

export default function Roles(props: any) {
  const roles = props.roles? props.roles : [];
  return (
    <>
      <Typography component="h1" variant="h5">
        Assign Roles
      </Typography>
      <FormGroup>
        {roles.map((role:any) => {
            return <FormControlLabel control={<Checkbox defaultChecked />} label={role.url} />
        })}
        <Button>
            Save
        </Button>
      </FormGroup>
    </>
  );
}
