// // middleware.ts
// import { NextRequest, NextResponse } from "next/server";

// export function middleware(request: NextRequest) {
//   console.log("running middleware.....");
//   const token = request.cookies.get("accessToken")?.value;

//   if (!token && !request.nextUrl.pathname.startsWith("/login")) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/profile/:path*"],
// };
