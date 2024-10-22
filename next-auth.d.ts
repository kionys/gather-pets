// import NextAuth from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: number;
//       name?: string;
//       email: string;
//       image?: string;
//     };
//   }
// }
import "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username?: string | null;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      username?: string | null;
    };
  }

  interface User {
    username?: string | null;
  }
}
