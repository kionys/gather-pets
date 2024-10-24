import PostView from "@/components/templates/post-view";
import { IPost } from "@/lib/types";
import axios from "axios";
import { notFound } from "next/navigation";

const PostModal = async ({ params: { id } }: { params: { id: string } }) => {
  console.log("포스트 모달 : ", id);

  const fetchPostById = async (id: string) => {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/post/detail?id=${id}`,
      });
      return res.data;
    } catch (e) {
      console.error("Failed to fetch post:", e);
      return null;
    }
  };

  const post = await fetchPostById(id);

  if (!post) {
    return notFound();
  }

  return <PostView id={id} post={post as unknown as IPost} />;
};

export default PostModal;
