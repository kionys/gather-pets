import Header from "@/components/templates/header";

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default HomePageLayout;
