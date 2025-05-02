import { withAuth } from "next-auth/middleware";

export default withAuth({
    callbacks: {
        authorized: ({ token }) => {
            return !!token?.isAdmin;
        },
    },
    pages: {
        signIn: '/login',
    },
});

export const config = {
    matcher: ['/admin'],
};