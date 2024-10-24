import prisma from "@/db";
import { NextResponse } from "next/server";

// Handle GET request to fetch post data by ID
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }

  try {
    const data = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        likes: {
          include: {
            user: true,
          },
        },
        savedBy: true,
        user: true,
      },
    });

    if (!data) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}
