
import "./globals.css";


export const metadata = {
  title: "Toonstop | Read Free Manhwa & Webtoons Online",
  description: "Read the latest free manhwa at Toonstop — your go-to destination for high-quality Korean webtoons. Enjoy action, romance, fantasy, and more with daily updates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta property="og:title" content="Toonstop" />
        <meta property="og:description" content="Read the latest free manhwa at Toonstop — your go-to destination for high-quality Korean webtoons. Enjoy action, romance, fantasy, and more with daily updates." />
        <meta name="keywords" content="Read the latest free manhwa at Toonstop — your go-to destination for high-quality Korean webtoons. Enjoy action, romance, fantasy, and more with daily updates." />
        <meta name="description" content="ead the latest free manhwa at Toonstop — your go-to destination for high-quality Korean webtoons. Enjoy action, romance, fantasy, and more with daily updates." />
        <link rel="icon" href="/assets/icon.png" />
        <title>Toonstop | Read Free Manhwa & Webtoons Online</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
