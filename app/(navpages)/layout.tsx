import ResponsiveAppBar from "@/components/Navbar";
import { Container } from "@mui/material";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <ResponsiveAppBar />
      <Container>
        <main>{children}</main>
      </Container>
    </>
  );
}
