export { default } from "next-auth/middleware";

export const config = {
  // 只有匹配这里路径的页面，才会触发拦截并强制跳转到登录页
  matcher: [
    "/home",
    "/manage-club",
    "/admin"
  ],
};