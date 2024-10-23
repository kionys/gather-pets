"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreatePost } from "@/lib/schemas";
import { supabase } from "@/lib/supabase-client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const CreatePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isCreatePage = pathname === "/dashboard/create";

  const form = useForm<z.infer<typeof CreatePost>>({
    resolver: zodResolver(CreatePost),
    defaultValues: {
      title: "",
      content: "",
      fileUrl: undefined,
    },
  });

  const fileUrl = form.watch("fileUrl");

  // 파일 이름을 전달받아 timestamp + random 조합으로 바꿔주는 함수
  const generateFilePath = (fileName: string) => {
    const timestamp = Date.now();
    const extension = fileName.split(".").pop();
    const randomSuffix = Math.random().toString(36).substring(2, 8);

    const path = `${timestamp}_${randomSuffix}.${extension}`;
    return path;
  };

  // 파일을 supabase storage에 업로드하고, 그 파일 경로를 반환하는 함수
  const uploadImage = async (file: File) => {
    const path = generateFilePath(file.name);
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
    const supabaseBucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET as string;

    if (!path || !supabaseUrl || !supabaseBucket) return;

    try {
      const { data, error } = await supabase.storage.from(supabaseBucket).upload(`public/${path}`, file);
      if (error) throw error;

      const fileUrl = `${supabaseUrl}/storage/v1/object/public/${supabaseBucket}/${data.path}`;
      return fileUrl;
    } catch (e) {
      console.log(e);
      toast.error("업로드에 실패하였습니다.");
      return null;
    }
  };

  return (
    // <div>
    <Dialog open={isCreatePage} onOpenChange={open => !open && router.back()}>
      <DialogContent className="w-screen h-[90%]">
        <DialogHeader>
          <DialogTitle>새 게시글 생성</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(async values => {
              if (values.fileUrl instanceof File) {
                // 파일을 먼저 supabase storage 업로드한다.
                const uploadedUrl = await uploadImage(values.fileUrl);

                // 리턴 받은 supabase storage 파일 경로가 있다면 게시글 API 호출
                if (uploadedUrl) {
                  try {
                    await axios({
                      method: "POST",
                      url: "/api/post",
                      data: {
                        fileUrl: uploadedUrl,
                        title: values.title,
                        content: values.content,
                      },
                    });

                    toast.success("게시글 생성 성공!");
                    router.back();
                  } catch (e) {
                    console.log(e);
                    toast.error("게시글 생성 실패!");
                  }
                }
              }
              // console.log(values);
            })}
          >
            {fileUrl ? (
              <div className="flex flex-col space-y-4">
                {/* 이미지 미리보기: 높이 제한 및 스크롤 가능 */}
                <div className="max-h-[400px] overflow-auto rounded-md">
                  <AspectRatio ratio={1 / 1} className="relative h-full">
                    <Image
                      src={typeof fileUrl === "string" ? fileUrl : URL.createObjectURL(fileUrl)}
                      alt="Post preview"
                      fill
                      className="rounded-md object-cover"
                    />
                  </AspectRatio>
                </div>

                {/* 제목 필드 */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="title">제목</FormLabel>
                      <FormControl>
                        <Input type="title" id="title" placeholder="제목을 입력해 주세요." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 내용 필드 */}
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="content">내용</FormLabel>
                      <FormControl>
                        <Input type="content" id="content" placeholder="내용을 입력해 주세요." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 게시글 생성 버튼 */}
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  게시글 생성
                </Button>
              </div>
            ) : (
              <FormField
                control={form.control}
                name="fileUrl"
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel htmlFor="picture">이미지 업로드</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) {
                            form.setValue("fileUrl", file);
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription>게더펫에 게시할 사진을 올려주세요.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
    // </div>
  );
};

export default CreatePage;
