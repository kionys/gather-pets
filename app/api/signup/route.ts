import prisma from "@/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

interface RequestBody {
  name: string;
  username: string;
  email: string;
  image?: string | null;
  bio: string;
  website: string;
  gender: string;
  password: string;
}

export async function POST(request: Request) {
  // request.json() 형식으로 body 부분 추출
  const body: RequestBody = await request.json();

  // DB User 테이블에 데이터 넣기
  const user = await prisma.user.create({
    data: {
      name: body.name,
      username: body.username,
      email: body.email,
      image: body.image,
      bio: body.bio,
      website: body.website,
      gender: body.gender,
      password: await bcrypt.hash(body.password, 10), // bcrypt로 해싱 후 저장
    },
  });

  // user 객체에서 password 부분을 제외하고 나머지 부분만 최종적으로 response 해주기
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...result } = user; // password를 제외하고 나머지를 result에 담기
  return NextResponse.json(result); // result를 응답으로 반환
}
