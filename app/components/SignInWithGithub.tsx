"use client";

import { Button } from "@mui/material";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";

export default function SignInWithGithub() {
  return (
    <Button
      onClick={() =>
        signIn("github", { callbackUrl: `${window.location.origin}` })
      }
    >
      <Github />
    </Button>
  );
}
