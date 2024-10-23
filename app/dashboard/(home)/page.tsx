import Posts from "@/components/templates/posts";
import { getUserId } from "@/lib/utils";

const DashboardPage = async () => {
  const userId = await getUserId();
  return (
    <main className="flex w-full flex-grow">
      <div className="flex flex-col flex-1 gap-y-8 max-w-lg mx-auto pb-20">
        <Posts userId={userId} />
      </div>
    </main>
  );
};

export default DashboardPage;
