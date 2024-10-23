import PostView from "@/components/templates/post-view";
import { fetchPostById } from "@/lib/data";
import { notFound } from "next/navigation";

const PostModal = async ({ params: { id } }: { params: { id: string } }) => {
  console.log("포스트 모달 : ", id);

  const post = await fetchPostById(id);
  console.log(post);
  if (!post) {
    return notFound();
  }
  return <PostView id={id} post={post} />;
};

export default PostModal;
