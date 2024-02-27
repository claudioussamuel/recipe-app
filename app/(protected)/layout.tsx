"use client";

import { useUser } from "../lib/auth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { cn } from "../lib/utils";
import { lusitana } from "../ui/fonts";
import { Nav } from "../ui/nav";

 


export default function Layout({ children }: { children: ReactNode }) {
  const user = useUser();

  if (user === false) return <></>;
  if (!user) return redirect('/login');



  return (
  
          <body
          className={cn(
            "relative flex min-h-screen flex-col bg-background antialiased",
            lusitana.className,
          )}
        >
  
          <Nav />
          <main className="mx-auto w-full max-w-7xl flex-1 p-4">
            {children}
          </main>

  </body>
  )
}
