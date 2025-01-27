export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Roman numeral converter</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
