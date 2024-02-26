"use client";

import { useUser } from "../lib/auth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

 

export default function Layout({ children }: { children: ReactNode }) {
  const user = useUser();

  if (user === false) return <></>;
  if (!user) return redirect('/login');
  return children;
}
