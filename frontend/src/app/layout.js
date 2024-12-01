import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Fonts and metadata */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=ABeeZee:ital@0;1&family=Caveat:wght@400..700&family=Edu+AU+VIC+WA+NT+Arrows:wght@400..700&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Quicksand:wght@300..700&family=Satisfy&family=Ubuntu:ital,wght@1,700&family=Yuji+Mai&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=ABeeZee:ital@0;1&family=Caveat:wght@400..700&family=Edu+AU+VIC+WA+NT+Arrows:wght@400..700&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Quicksand:wght@300..700&family=Satisfy&family=Ubuntu:ital,wght@1,700&family=Yuji+Mai&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=ABeeZee:ital@0;1&family=Bokor&family=Caveat:wght@400..700&family=Edu+AU+VIC+WA+NT+Arrows:wght@400..700&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Quicksand:wght@300..700&family=Satisfy&family=Ubuntu:ital,wght@1,700&family=Yuji+Mai&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=ABeeZee:ital@0;1&family=Bokor&family=Caveat:wght@400..700&family=Edu+AU+VIC+WA+NT+Arrows:wght@400..700&family=Ga+Maamli&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Quicksand:wght@300..700&family=Satisfy&family=Ubuntu:ital,wght@1,700&family=Yuji+Mai&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=ABeeZee:ital@0;1&family=Bokor&family=Caveat:wght@400..700&family=Edu+AU+VIC+WA+NT+Arrows:wght@400..700&family=Ga+Maamli&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Quicksand:wght@300..700&family=Satisfy&family=Ubuntu:ital,wght@1,700&family=Yuji+Mai&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body>{children}</body>
    </html>
  );
}
