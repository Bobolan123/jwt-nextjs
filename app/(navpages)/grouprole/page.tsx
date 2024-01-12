import * as React from "react";
import SelectGroupForm from "@/components/groupRole/selectGroup.form";

export default async function GroupRole() {
  const data = await fetch(`http://localhost:3001/api/group/read`, {
    method: "GET",
  });
  const groups = await data.json();
  
  const fetchRoles = async (groupId: number) => {
    "use server";
    let dataGroup = await fetch(
      `http://localhost:3001/api/group/read/${groupId}`
    );
    const group = await dataGroup.json();
    return group.roles;
  };

  return (
    <div>
      <SelectGroupForm groups={groups} fetchRoles={fetchRoles} />
    </div>
  );
}
