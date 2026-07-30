import { withAuth } from "next-auth/middleware";

// 显式地导出一个中间件函数，满足 Next.js 的严格检查
export default withAuth;

export const config = {
  matcher: [
    "/home",
    "/manage-club",
    "/admin"
  ],
};