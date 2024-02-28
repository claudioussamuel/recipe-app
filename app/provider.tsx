'use client'

import { ThemeProvider } from "next-theme"
import React from "react"

export function Providers({children}:{children: React.ReactNode}){
    return <ThemeProvider attribute="class" defaultTheme="light">
            {children}
    </ThemeProvider>
}