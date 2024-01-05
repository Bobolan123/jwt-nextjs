import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/utils/auth";
import UsersTable from "@/components/TableUsers";

export default async function Users() {
  const session = await getServerSession(authOptions);
    if (!session) {
      return redirect("/login");
    } 

  return (
    <div>
      <h1>Table Users</h1>
      <UsersTable/>
    </div>
  );
}
