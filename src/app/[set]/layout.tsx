import { IconMenu } from "../ui/icons";
import MenuDrawer from "@/app/_components/menuDrawer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-blue-100 via-85% to-blue-200 bg-fixed">
        <div className="min-w-100 shadow-xl">
          <div className="relative mx-auto max-w-7xl p-8">
            <h1 className="text-center text-2xl font-bold">My Cards</h1>
            <MenuDrawer />
          </div>
        </div>
        {children}
      </main>
    </>
  );
}
