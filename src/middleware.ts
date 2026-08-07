import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.role;
    const path = req.nextUrl.pathname;

    // 拦截 1：如果不是 Admin，强闯 /admin 就重定向到首页
    if (path.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 拦截 2：如果是 Student，强闯 /manage-club 就重定向到首页
    if (path.startsWith("/manage-club") && role === "STUDENT") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      // 只要是受保护的路由，必须有 token (必须登录) 才能进入这一层逻辑
      authorized: ({ token }) => !!token, 
    },
  }
);

// 定义哪些路径受这套规则保护（不在里面的就是公开游客页面，比如 /directory）
export const config = {
  // 注意：此处已将 /my-dashboard 修正为 /home 以匹配测试用例
  matcher: ["/home", "/admin/:path*", "/manage-club/:path*"],
};