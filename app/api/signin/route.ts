import prisma from "@/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

interface RequestBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  // findFirst
  // where부분에 email을 넣으면 이메일에 해당하는 user 정보 중 첫 번째를 찾음
  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });

  // username과 password부분을 불러와 DB에 있는 username과 password와 비교
  // 맞으면 user 정보 리턴, 틀리면 null 리턴
  if (user && (await bcrypt.compare(body.password, user.password!))) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPass } = user;
    return NextResponse.json(userWithoutPass);
  } else return NextResponse.json(null);
}
