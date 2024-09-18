"use client"
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_componet/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { usePathname } from "next/navigation";
import { UpdateCartContext } from "./_context/UpdateCartContext";
import { useState } from "react";
const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathName = usePathname();
  const [updateCart, setUpdateCart] = useState(null);
  return (
    <html lang="en">
      <body className={outfit.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <UpdateCartContext.Provider value={{updateCart, setUpdateCart}}>
            {
              pathName != "/create-account" && pathName != "/sign-in" ?
                <Header /> : null
            }
            {children}
          </UpdateCartContext.Provider>
        </ThemeProvider>
      </body>
    </html >
  );
}
