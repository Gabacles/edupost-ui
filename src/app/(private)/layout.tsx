import { PropsWithChildren } from "react";
import { Header } from "./_components/header";

const PrivateLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <div className="flex flex-col w-full h-full">{children}</div>
    </div>
  );
};

export default PrivateLayout;
