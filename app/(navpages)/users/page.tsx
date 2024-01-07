import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/utils/auth";
import UsersTable from "@/components/user.table";

export default async function Users(props:any) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }
  //Original pagination
  const LIMIT = 2
  const page = props?.searchParams?.page ?? 1
  
  const res = await fetch(`http://localhost:3001/api/user?page=_${page}&_limit=${LIMIT}`, {
    method: "GET"
  });
  const userList: [] = await res.json();

  return (
    <div>
      <UsersTable users={userList? userList : []} />
    </div>
  );
}
