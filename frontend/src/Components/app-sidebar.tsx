// import { useSettings } from "@/hooks/useSettings"
// import { iconMap } from "@/utils/iconMap"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarSeparator } from "./sidebar"
import { NavUser } from "./nav-user"
import { NavMain } from "./nav-main"
import { TeamSwitcher } from "./team-switcher"
import { useSettings } from "@/pages/app/useSettings"
import { iconMap } from "./common/icon-map"

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const settings = useSettings()
  if (!settings) return null

  const navMain = settings.sidemenu.main.map((item: any) => ({
    ...item,
    icon: iconMap[item.icon] || undefined,
    items: item.items?.map((sub: any) => ({ ...sub })),
  }))

  const teams = settings.teams.map((team: any) => ({
    ...team,
    logo: iconMap[team.logo] || undefined,
  }))

  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarSeparator className="p-0 m-0"/>
      <SidebarFooter>
        <NavUser user={settings.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
