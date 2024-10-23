import { z } from "zod";

export const PostSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  content: z.string().min(1, "내용을 입력해 주세요."),
  fileUrl: z.union([z.string(), z.instanceof(File)]).optional(),
});
export const CreatePost = PostSchema.omit({ id: true });
export const UpdatePost = PostSchema;
export const DeletePost = PostSchema.omit({ id: true });
