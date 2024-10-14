import { FeedList } from "@/components/templates/feed-list";
import { StoryList } from "@/components/templates/story-list";
import { SubHeader } from "@/components/templates/sub-header";
import { avatars, dogPosts } from "@/core/mock/mock-data";
import useScroll from "@/core/use-scroll";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <>
      <Wrapper>
        {/* 상단 서브 헤더 */}
        <SubHeader />

        {/* 스토리 리스트 */}
        <StoryList avatars={avatars} />

        {/* 피드 그리드 */}
        <FeedList post={dogPosts} />
      </Wrapper>
      {/* <div className="w-[300px]">친구 추천</div> */}
    </>
  );
}

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { isScrollingUp } = useScroll();
  return (
    <div
      className={`${geistSans.variable} ${
        geistMono.variable
      } w-full h-full sm:h-[100vh] sm:overflow-auto sm:pt-0 sm:pb-0 pb-16 overscroll-contain ${
        isScrollingUp ? "pt-16" : "pt-4"
      }`}
    >
      {children}
    </div>
  );
};
