import { Footer } from "./footer";
import { Header } from "./header";
import { SideBar } from "./sidebar";

const AppContainer = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className={"flex w-full overflow-hidden"}>
      <Header />
      <SideBar />
      {children}
      <Footer />
    </div>
  );
};

export default AppContainer;
