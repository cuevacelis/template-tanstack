import { Link, useLocation } from '@tanstack/react-router'
import { Image } from '@unpic/react'
import { ChevronRight, SidebarCloseIcon, SidebarOpenIcon } from 'lucide-react'
import { DynamicIcon } from 'lucide-react/dynamic'
import type { IconName } from 'lucide-react/dynamic'
import logo from '@/assets/img/logo/sm.png'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils/class-utils'

interface NavigationItem {
  title: string
  url: string
  icon: IconName
  items: Array<NavigationSubItem>
}

interface NavigationSubItem {
  title: string
  url: string
  icon: IconName
}

// Configuración de navegación basada en Header.tsx
const navigationItems: Array<NavigationItem> = [
  {
    title: 'Home',
    url: '/dashboard',
    icon: 'home',
    items: [],
  },
  {
    title: 'Start',
    url: '#',
    icon: 'play',
    items: [
      {
        title: 'Server Functions',
        url: '/dashboard/demo/start/server-funcs',
        icon: 'server',
      },
      {
        title: 'API Request',
        url: '/dashboard/demo/start/api-request',
        icon: 'globe',
      },
    ],
  },
  {
    title: 'Authentication',
    url: '/dashboard/demo/clerk',
    icon: 'users',
    items: [],
  },
  {
    title: 'Database',
    url: '/dashboard/demo/convex',
    icon: 'database',
    items: [],
  },
  {
    title: 'Forms',
    url: '#',
    icon: 'file-text',
    items: [
      {
        title: 'Simple Form',
        url: '/dashboard/demo/form/simple',
        icon: 'file',
      },
      {
        title: 'Address Form',
        url: '/dashboard/demo/form/address',
        icon: 'map-pin',
      },
    ],
  },
  {
    title: 'MCP',
    url: '/dashboard/demo/mcp-todos',
    icon: 'network',
    items: [],
  },
  {
    title: 'oRPC Todo',
    url: '/dashboard/demo/orpc-todo',
    icon: 'list',
    items: [],
  },
  {
    title: 'TanStack Query',
    url: '/dashboard/demo/tanstack-query',
    icon: 'activity',
    items: [],
  },
]

export function SidebarLoggedComponent() {
  const location = useLocation()
  const {
    toggleSidebar,
    state: sidebarState,
    isMobile: isMobileSidebar,
  } = useSidebar()

  return (
    <Sidebar
      className={cn('font-normal')}
      collapsible="icon"
      variant="floating"
      defaultValue={'open'}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            {isMobileSidebar ? (
              <section className="flex justify-between items-center mt-1 p-2">
                <Link
                  to="/"
                  className="flex items-center gap-2 transition-transform duration-200 hover:text-primary"
                >
                  <div className="flex aspect-square size-8 items-center justify-center">
                    <Image
                      src={logo}
                      alt="Logo"
                      className="h-full"
                      layout="fullWidth"
                    />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">TanStack</span>
                    <span className="truncate text-xs">Template</span>
                  </div>
                </Link>
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                  <SidebarCloseIcon />
                </Button>
              </section>
            ) : sidebarState === 'expanded' ? (
              <section className="flex justify-between items-center mt-1 p-2">
                <Link
                  to="/"
                  className="flex items-center gap-2 transition-transform duration-200 hover:text-primary"
                >
                  <div className="flex aspect-square size-8 items-center justify-center">
                    <Image
                      src={logo}
                      alt="Logo"
                      className="h-full"
                      layout="fullWidth"
                    />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">TanStack</span>
                    <span className="truncate text-xs">Template</span>
                  </div>
                </Link>
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                  <SidebarCloseIcon />
                </Button>
              </section>
            ) : (
              <SidebarMenuButton
                size="lg"
                className="flex justify-center items-center mt-1"
                onClick={toggleSidebar}
              >
                <SidebarOpenIcon className="size-5!" />
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
        <Separator
          orientation="horizontal"
          decorative={true}
          className="bg-gray-700"
        />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navigationItems.map((item) => (
              <Collapsible
                key={item.title}
                className="group/collapsible"
                asChild
              >
                {item.items.length > 0 ? (
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        isActive={false}
                        onClick={(e) => {
                          if (sidebarState === 'collapsed') {
                            toggleSidebar()
                            e.preventDefault()
                          }
                        }}
                        tooltip={{
                          children: (
                            <ul>
                              {item.items.map((subItem) => (
                                <li key={subItem.title}>
                                  <Link to={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ),
                        }}
                      >
                        <DynamicIcon className="size-5" name={item.icon} />
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link to={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                ) : (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => {
                        if (isMobileSidebar) toggleSidebar()
                      }}
                      isActive={location.pathname === item.url}
                      tooltip={item.title}
                      size="default"
                      asChild
                    >
                      <Link to={item.url}>
                        <DynamicIcon className="size-5" name={item.icon} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  )
}
