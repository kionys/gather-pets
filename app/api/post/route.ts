import prisma from "@/db";
import { getUserId } from "@/lib/utils";
import { NextResponse } from "next/server";

interface RequestBody {
  title: string;
  content: string;
  fileUrl: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const userId = await getUserId();

  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        fileUrl: body.fileUrl,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (e) {
    return NextResponse.json(e);
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") as string;
  const limit = searchParams.get("limit") as string;
  // const id = searchParams.get("id") as string;
  // const userId = await getUserId();

  if (page) {
    const count = await prisma.post.count();
    const skipPage = parseInt(page) - 1;
    try {
      const posts = await prisma.post.findMany({
        orderBy: { id: "desc" },
        take: parseInt(limit),
        skip: skipPage * parseInt(limit),
        // where: userId ? { user: { id: userId } } : {},
        select: {
          id: true,
          userId: true,
          title: true,
          content: true,
          fileUrl: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              image: true,
              name: true,
              email: true,
              authType: true,
            },
          },
        },
      });

      return NextResponse.json(
        {
          page: parseInt(page),
          data: posts,
          totalCount: count,
          totalPage: Math.ceil(count / 10),
        },
        {
          status: 200,
        },
      );
    } catch (error) {
      console.error("Error fetching posts:", error);
      return NextResponse.error();
    }
  }
}
