import ResponsiveAppBar from "@/components/Navbar"
import { Container } from "@mui/material"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./utils/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
    if (!session) {
      return redirect("/login");
    } 
  return (
    <div>
      <ResponsiveAppBar/>
      <Container maxWidth="lg">
        <div className="mt-3">Home</div>
      </Container>
    </div>
  )
}
