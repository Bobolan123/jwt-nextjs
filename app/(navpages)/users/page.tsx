import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/utils/auth";
import UsersTable from "@/components/users/user.table";

export default async function Users(props:any) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }

  const res = await fetch(`${process.env.API_URL}/user/read`, {
    method: "GET"
  });
  const userList: [] = await res.json();

  return (
    <div>
      <UsersTable users={userList? userList : []} />
    </div>
  );
}
