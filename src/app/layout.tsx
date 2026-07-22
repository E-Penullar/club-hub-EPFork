import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import NavBar from "../components/NavBar";

export const metadata: Metadata = {
  title: "Club Hub",
  description: "Discover and manage student organizations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* 导航栏组件会固定显示在所有页面的顶部 */}
        <NavBar />
        
        {/* children 就是你写的那些 page.tsx 的内容 */}
        {children}
      </body>
    </html>
  );
}