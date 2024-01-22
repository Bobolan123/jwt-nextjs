import * as React from "react";
import SelectGroupForm from "@/components/groupRole/selectGroup.form";
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { Skeleton } from "@/components/ui/skeleton";

export default async function GroupRole() {
  const access_token = getCookie('jwt', { cookies });

  const data = await fetch(`http://localhost:3001/api/group/read`, {
    method: "GET",
    headers: {
      'authorization': `Bearer ${access_token}`
    }
  });
  const groups = await data.json();
  // const fetchRoles = async (groupId: number) => {
  //   "use server";
  //   let dataGroup = await fetch(
  //     `http://localhost:3001/api/group/read/${groupId}`
  //   );
  //   const group = await dataGroup.json();
  //   return group.roles;
  // };

  return (
    <div>
      <SelectGroupForm groups={groups} />
      <Skeleton/>
    </div>
  );
}
