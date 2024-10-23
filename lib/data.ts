import prisma from "@/db";
import { unstable_noStore as noStore } from "next/cache";

export const fetchPostById = async (id: string) => {
  noStore();

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

    return data;
  } catch {
    throw new Error("게시글 조회에 실패하였습니다.");
  }
};
