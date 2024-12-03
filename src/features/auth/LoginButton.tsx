"use client";

import { buttonVariants } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";

export const LoginButton = () => {
  return (
    <Link
      className={buttonVariants({ size: "sm", variant: "outline" })}
      href="/api/auth/signin"
    >
      <LogIn className="mr-2" size={12} />
      Login
    </Link>
  );
};
