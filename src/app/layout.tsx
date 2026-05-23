import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Internship Search | Clone",
  description: "Find your dream internship",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="bg-gray-50/30 text-gray-900 dark:bg-gray-950 dark:text-gray-100 min-h-screen transition-colors duration-350">
        {children}
      </body>
    </html>
  );
}
