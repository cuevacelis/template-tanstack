import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { SidebarCloseIcon, SidebarOpenIcon } from "lucide-react";
import logo from "@/assets/img/logo/sm.png";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSkeleton,
	useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils/class-utils";

export function SidebarSkeleton() {
	const { toggleSidebar, state: sidebarState } = useSidebar();

	return (
		<Sidebar
			className={cn("font-normal")}
			collapsible="icon"
			variant="floating"
		>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						{sidebarState === "expanded" ? (
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
										<span className="truncate font-semibold">UPCH</span>
										<span className="truncate text-xs">CEPU</span>
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
								<SidebarOpenIcon className="size-5! animate-pulse motion-reduce:animate-none hover:animate-none" />
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
						{[
							"dashboard",
							"notas",
							"asistencias",
							"reportes",
							"configuracion",
						].map((id) => (
							<SidebarMenuItem key={id}>
								<SidebarMenuSkeleton
									showIcon
									className="border border-primary/30 mb-2 bg-primary/10 animate-pulse"
								/>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
