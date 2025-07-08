import { withAuth } from 'next-auth/middleware';

export default withAuth(function middleware(req) {
    if (req.nextauth.token) {
        console.log('user exits');
    } else {
        console.log('there is no user');
    }
});

export const config = { matcher: ['/dashboard/:path*'] };
