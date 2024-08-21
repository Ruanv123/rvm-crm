import { ModeToggle } from "@/components/mode-toggle";
import Sidebar, { SidebarItem } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserNav } from "@/components/user-menu";
import { auth } from "@/lib/auth";
import {
  Analytics01Icon,
  DeliveryBox01Icon,
  Notification02Icon,
  UserGroupIcon,
  WaterfallDown01Icon
} from "hugeicons-react";
import { BellDotIcon } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    return
  }

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
          text="Calendar"
          link="/calendar"
        />
        <SidebarItem
          icon={<UserGroupIcon size={20} />}
          text="Sales Pipeline"
          link="/"
        />
        <SidebarItem
          icon={<DeliveryBox01Icon size={20} />}
          text="Companies"
          link="/companies"
        />
        {/* <SidebarItem
          icon={<Settings01Icon size={20} />}
          text="Contacts"
          link="/contacts"
        />
        <Separator className="my-3" />
        <SidebarItem
          icon={<Settings01Icon size={20} />}
          text="Contacts"
          link="/contacts"
        /> */}
        {/* <SidebarItem icon={<LifeBuoy size={20} />} text="Help" /> */}
      </Sidebar>
      <div className="w-full flex-1 h-full">
        <header className="border-b w-full p-4 flex items-center justify-between">
          <Input type="search" placeholder="Search..." className="max-w-xs" />
          <div className="grid grid-cols-3 items-center gap-3">
            <Button size={"icon"} variant="outline" className="w-8 h-8">
              <Notification02Icon size={18} />
            </Button>
            <ModeToggle />
            <UserNav user={session.user!} />
          </div>
        </header>
        <main className="p-10 h-full overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
