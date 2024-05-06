// import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "./authOptions";




// export async function middleware(req: NextRequest){
//     const session = await getServerSession(authOptions)
//     if(!session){
//         return NextResponse.redirect(new URL("/login", req.url))
//     }
//     return NextResponse.next()
// }

// export { default } from "next-auth/middleware"

// export const config = {
//     matcher: ["/dashboard/:path*"]
// }

import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({ token }) => token ? true : false
    },
  },
)

export const config = { matcher: ["/admin"] }
