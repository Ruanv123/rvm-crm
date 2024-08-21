import { ModeToggle } from "@/components/mode-toggle";
import Sidebar, { SidebarItem } from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { UserMenu } from "@/components/user-menu";
import {
  Analytics01Icon,
  WaterfallDown01Icon,
  UserGroupIcon,
  DeliveryBox01Icon,
  Settings01Icon,
} from "hugeicons-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar>
        <SidebarItem
          icon={<Analytics01Icon size={20} />}
          text="Dashboard"
          link="/"
          alert
          active
        />
        <SidebarItem
          icon={<WaterfallDown01Icon size={20} />}
          text="Statistics"
          link="/"
        />
        <SidebarItem icon={<UserGroupIcon size={20} />} text="Users" link="/" />
        <SidebarItem
          icon={<DeliveryBox01Icon size={20} />}
          text="Inventory"
          link="/"
        />
        {/* <SidebarItem icon={<Package size={20} />} text="Orders" />
        <SidebarItem icon={<Receipt size={20} />} text="Billing" /> */}
        <Separator className="my-3" />
        <SidebarItem
          icon={<Settings01Icon size={20} />}
          text="Settings"
          link="/"
        />
        {/* <SidebarItem icon={<LifeBuoy size={20} />} text="Help" /> */}
      </Sidebar>
      <div className="w-full flex-1 h-full">
        <header className="border-b w-full p-4 flex items-center justify-between">
          <Input type="search" placeholder="Search..." className="max-w-xs" />
          <div className="grid grid-cols-2 items-center gap-3">
            <ModeToggle />
            <UserMenu />
          </div>
        </header>
        <main className="p-10 h-full overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
