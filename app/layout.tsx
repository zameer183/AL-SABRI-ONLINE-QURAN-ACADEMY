import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { pageData } from "../generated/page-data";

export const metadata: Metadata = {
  title: "Learn Quran with Us | Al Sabri Online Quran Academy",
  description:
    "Learn Quran online with Al Sabri Online Quran Academy. Expert tutors, flexible classes, and Quran learning for all ages worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en-US">
      <head>
        {pageData.head.links.map((href, index) => (
          <link key={`${href}-${index}`} rel="stylesheet" href={href} />
        ))}
        {pageData.head.inlineStyles.map((css, index) => (
          <style key={index} dangerouslySetInnerHTML={{ __html: css }} />
        ))}
      </head>
      <body
        className={pageData.body.className}
        suppressHydrationWarning
      >
        {children}
        <a
          className="floating-whatsapp"
          href="https://wa.me/923413839634"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M19.11 17.21c-.27-.14-1.58-.78-1.82-.87-.24-.09-.42-.14-.6.14-.18.27-.69.87-.85 1.05-.16.18-.31.2-.58.07-.27-.14-1.14-.42-2.17-1.35-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.56.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.14-.6-1.45-.82-1.99-.22-.52-.44-.45-.6-.46h-.51c-.18 0-.47.07-.71.34-.24.27-.93.91-.93 2.22s.96 2.58 1.09 2.76c.13.18 1.88 2.88 4.56 4.04.64.27 1.14.43 1.53.55.64.2 1.22.17 1.68.1.51-.08 1.58-.64 1.8-1.26.22-.62.22-1.14.16-1.26-.07-.11-.25-.18-.52-.31Z" />
            <path d="M16.01 3.2c-7.06 0-12.79 5.71-12.79 12.74 0 2.25.59 4.45 1.71 6.39L3.12 28.8l6.63-1.74a12.82 12.82 0 0 0 6.26 1.6h.01c7.05 0 12.78-5.71 12.78-12.74 0-3.4-1.33-6.59-3.76-9s-5.65-3.73-9.03-3.73Zm0 23.3h-.01a10.7 10.7 0 0 1-5.46-1.49l-.39-.23-3.93 1.03 1.05-3.82-.25-.39a10.56 10.56 0 0 1-1.62-5.64c0-5.86 4.8-10.63 10.69-10.63 2.85 0 5.52 1.1 7.54 3.11a10.54 10.54 0 0 1 3.13 7.52c0 5.86-4.8 10.63-10.68 10.63Z" />
          </svg>
          <span>WhatsApp</span>
        </a>
      </body>
    </html>
  );
}
