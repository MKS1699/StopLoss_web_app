"use client";
import { AdminTitleBar, PanelScreen, VerticalMenu } from "./components";

const AdminPanel = () => {
  return (
    <main className="w-full min-h-screen max-h-full overflow-auto scrollbar-none bg-white dark:bg-[#003831] relative flex flex-row justify-evenly p-0 m-0">
      {/* admin title bar will be replaced */}
      {/* <AdminTitleBar /> */}
      <VerticalMenu />
      <PanelScreen />
    </main>
  );
};

export default AdminPanel;
