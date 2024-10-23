import SideNav from "@/components/templates/side-nav";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="dark:bg-neutral-950 flex h-full relative flex-col md:flex-row md:overflow-hidden">
        <div className="w-20 flex-none lg:w-64 md:border-r fixed top-0 left-0 z-50 h-screen">
          <SideNav />
        </div>
        <div className="flex-grow mt-12 md:mt-0 flex-1 w-full md:overflow-y-auto sm:p-6 md:p-12 max-w-7xl mx-auto">
          {children}
        </div>
        {/* <div className="w-20 flex-none lg:w-64 md:border-l fixed top-0 right-0 z-50 h-screen">test</div> */}
      </div>
    </>
  );
};
export default DashboardLayout;
