import { usePathname } from "next/navigation";
import { IconMenu } from "../ui/icons";
import MenuDrawer from "@/app/_components/menuDrawer";

const SetLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-blue-100 via-85% to-blue-200 bg-fixed">
        {children}
      </main>
    </>
  );
};

export default SetLayout;
