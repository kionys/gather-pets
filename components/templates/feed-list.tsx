import Image from "next/image";
import { memo } from "react";

export const FeedList = memo(({ post }: { post: any[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-4 auto-rows-[minmax(300px,auto)] sm:p-5">
      {post.map((post, i) => (
        <div key={i} className="flex-1">
          <div className="p-5 sm:p-0 w-full h-[500px] sm:h-[400px] sm:w-[100%] flex flex-col">
            <div className="relative h-[100%] w-full mb-2 rounded-lg overflow-hidden">
              <Image
                src={post.image}
                alt="image"
                fill
                loading="lazy"
                style={{ objectFit: "cover", objectPosition: "center" }}
                quality={75}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,"
              />
            </div>

            {/* 좋아요, 댓글 부분 */}
            <div className="flex w-full justify-between">
              <div>kionys</div>
              <div className="flex gap-2">
                <button>❤️</button>
                <button>💬</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});
