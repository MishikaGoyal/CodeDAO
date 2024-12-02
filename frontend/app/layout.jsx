"use client";

import { Inter } from "next/font/google"
import "./globals.css"
import { GoogleOAuthProvider } from '@react-oauth/google';

const inter = Inter({ subsets: ["latin"] })
const GOOGLE_CLIENT_ID = "703051457969-h1b5nurk81mbisfrpea4teihoaoucpk8.apps.googleusercontent.com";

// export const metadata = {
//   title: "Crypto Contributor Dashboard",
//   description: "Track and engage with your DAO contributions and activities",
// }

export default function RootLayout({
  children
}) {
  return (
    (<html lang="en">
      {/* <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}> */}
        <body className={inter.className}>{children}</body>
      {/* </GoogleOAuthProvider> */}
    </html>)
  );
}

