import { n as useAppearance, t as initializeTheme } from "./assets/use-appearance-BhoKbWiF.js";
import { n as toUrl, t as cn } from "./assets/utils-DAgvUY2L.js";
import { a as DropdownMenuLabel, i as DropdownMenuItem, n as DropdownMenuContent, o as DropdownMenuSeparator, r as DropdownMenuGroup, s as DropdownMenuTrigger, t as DropdownMenu } from "./assets/dropdown-menu-Dez2j4dN.js";
import { t as Button } from "./assets/button-DRdOZmfE.js";
import "./assets/input-BKaRA9ml.js";
import { t as Separator } from "./assets/separator-BjHZaLGc.js";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./assets/avatar-Bpm_lslG.js";
import { a as pariwisata, c as surveyAssignments, d as villages, i as logout, l as umkm, n as home, o as questions, t as dashboard, u as users } from "./assets/routes-Bnxj77BR.js";
import { n as profile, t as edit } from "./assets/profile-BK6Rd0fE.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./assets/select-DKL20tqQ.js";
import { a as show } from "./assets/villages-rJA_ttRN.js";
import { t as Heading } from "./assets/heading-BKCTPZtU.js";
import { t as edit$1 } from "./assets/appearance-C9XoGQxF.js";
import { t as edit$2 } from "./assets/security-C4aqlBsk.js";
import { Link, createInertiaApp, router, usePage } from "@inertiajs/react";
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { BarChart3, ChartColumnBig, ChevronDown, ClipboardCheck, ClipboardList, LayoutDashboard, Loader2, LogOut, Map as Map$1, MapPinned, Menu, Settings, Store, UserCog, Users, XIcon } from "lucide-react";
import "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import createServer from "@inertiajs/react/server";
import { renderToString } from "react-dom/server";
//#region resources/js/components/ui/sonner.tsx
function Toaster$1({ ...props }) {
	const { appearance } = useAppearance();
	return /* @__PURE__ */ jsx(Toaster, {
		theme: appearance,
		className: "toaster group",
		position: "top-right",
		style: {
			"--normal-bg": "var(--popover)",
			"--normal-text": "var(--popover-foreground)",
			"--normal-border": "var(--border)"
		},
		...props
	});
}
//#endregion
//#region resources/js/components/ui/tooltip.tsx
function TooltipProvider({ delayDuration = 0, ...props }) {
	return /* @__PURE__ */ jsx(TooltipPrimitive.Provider, {
		"data-slot": "tooltip-provider",
		delayDuration,
		...props
	});
}
//#endregion
//#region resources/js/hooks/use-flash-toast.ts
function normalizeFlash(flash) {
	if (flash?.toast) return flash.toast;
	if (flash?.success) return {
		type: "success",
		message: flash.success
	};
	if (flash?.error) return {
		type: "error",
		message: flash.error
	};
	if (flash?.warning) return {
		type: "warning",
		message: flash.warning
	};
	if (flash?.info) return {
		type: "info",
		message: flash.info
	};
	return null;
}
function useFlashToast() {
	const { flash } = usePage().props;
	const shownToast = useRef(null);
	function showToast(data) {
		if (!data) return;
		const toastKey = `${data.type}:${data.message}`;
		if (shownToast.current === toastKey) return;
		shownToast.current = toastKey;
		toast[data.type](data.message, {
			closeButton: true,
			duration: 1e3
		});
	}
	useEffect(() => {
		showToast(normalizeFlash(flash));
	}, [flash]);
	useEffect(() => {
		return router.on("flash", (event) => {
			const flash = event.detail?.flash;
			showToast(normalizeFlash(flash));
		});
	}, []);
}
//#endregion
//#region resources/js/components/app-content.tsx
function AppContent({ variant = "sidebar", children, ...props }) {
	if (variant === "sidebar") return /* @__PURE__ */ jsx("main", {
		className: "min-w-0 bg-[#f8f9fb] lg:min-h-[100dvh] lg:pl-[232px]",
		...props,
		children
	});
	return /* @__PURE__ */ jsx("main", {
		className: "mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl",
		...props,
		children
	});
}
//#endregion
//#region resources/js/components/app-shell.tsx
function AppShell({ children, variant = "sidebar" }) {
	if (variant === "header") return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen w-full flex-col overflow-x-hidden",
		children
	});
	return /* @__PURE__ */ jsx("div", {
		className: "min-h-[100dvh] bg-[#f7f8fb] font-sans text-[#111827]",
		children
	});
}
//#endregion
//#region resources/js/components/ui/sheet.tsx
function Sheet({ ...props }) {
	return /* @__PURE__ */ jsx(SheetPrimitive.Root, {
		"data-slot": "sheet",
		...props
	});
}
function SheetTrigger({ ...props }) {
	return /* @__PURE__ */ jsx(SheetPrimitive.Trigger, {
		"data-slot": "sheet-trigger",
		...props
	});
}
function SheetPortal({ ...props }) {
	return /* @__PURE__ */ jsx(SheetPrimitive.Portal, {
		"data-slot": "sheet-portal",
		...props
	});
}
function SheetOverlay({ className, ...props }) {
	return /* @__PURE__ */ jsx(SheetPrimitive.Overlay, {
		"data-slot": "sheet-overlay",
		className: cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80", className),
		...props
	});
}
function SheetContent({ className, children, side = "right", ...props }) {
	return /* @__PURE__ */ jsxs(SheetPortal, { children: [/* @__PURE__ */ jsx(SheetOverlay, {}), /* @__PURE__ */ jsxs(SheetPrimitive.Content, {
		"data-slot": "sheet-content",
		className: cn("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500", side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm", side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm", side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b", side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t", className),
		...props,
		children: [children, /* @__PURE__ */ jsxs(SheetPrimitive.Close, {
			className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none",
			children: [/* @__PURE__ */ jsx(XIcon, { className: "size-4" }), /* @__PURE__ */ jsx("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
typeof window === "undefined" || window.matchMedia(`(max-width: 767px)`);
//#endregion
//#region resources/js/components/ui/sidebar.tsx
var SIDEBAR_LOGO_SRC = "/logo/logo-desa-bakti.png";
React.createContext(null);
function SidebarLogo({ className, alt = "BCA", ...props }) {
	return /* @__PURE__ */ jsx("img", {
		src: SIDEBAR_LOGO_SRC,
		alt,
		className: cn("block h-auto w-full max-w-[168px] shrink-0 object-contain brightness-0 invert mix-blend-screen", className),
		...props
	});
}
cva("peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0", {
	variants: {
		variant: {
			default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
			outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
		},
		size: {
			default: "h-8 text-sm",
			sm: "h-7 text-xs",
			lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
//#endregion
//#region resources/js/hooks/use-initials.tsx
function useInitials() {
	return useCallback((fullName) => {
		const names = fullName.trim().split(" ");
		if (names.length === 0) return "";
		if (names.length === 1) return names[0].charAt(0).toUpperCase();
		return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
	}, []);
}
//#endregion
//#region resources/js/components/user-info.tsx
function UserInfo({ user, showEmail = false }) {
	const getInitials = useInitials();
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Avatar, {
		className: "h-8 w-8 overflow-hidden rounded-full",
		children: [/* @__PURE__ */ jsx(AvatarImage, {
			src: user.avatar,
			alt: user.name
		}), /* @__PURE__ */ jsx(AvatarFallback, {
			className: "rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white",
			children: getInitials(user.name)
		})]
	}), /* @__PURE__ */ jsxs("div", {
		className: "grid flex-1 text-left text-sm leading-tight",
		children: [/* @__PURE__ */ jsx("span", {
			className: "truncate font-medium",
			children: user.name
		}), showEmail && /* @__PURE__ */ jsx("span", {
			className: "truncate text-xs text-muted-foreground",
			children: user.email
		})]
	})] });
}
//#endregion
//#region resources/js/hooks/use-mobile-navigation.ts
function useMobileNavigation() {
	return useCallback(() => {
		document.body.style.removeProperty("pointer-events");
	}, []);
}
//#endregion
//#region resources/js/components/user-menu-content.tsx
function UserMenuContent({ user }) {
	const cleanup = useMobileNavigation();
	const handleLogout = () => {
		cleanup();
		router.flushAll();
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(DropdownMenuLabel, {
			className: "p-0 font-normal",
			children: /* @__PURE__ */ jsx("div", {
				className: "flex items-center gap-2 px-1 py-1.5 text-left text-sm",
				children: /* @__PURE__ */ jsx(UserInfo, {
					user,
					showEmail: true
				})
			})
		}),
		/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
		/* @__PURE__ */ jsx(DropdownMenuGroup, { children: /* @__PURE__ */ jsx(DropdownMenuItem, {
			asChild: true,
			children: /* @__PURE__ */ jsxs(Link, {
				className: "block w-full cursor-pointer",
				href: edit(),
				prefetch: true,
				onClick: cleanup,
				children: [/* @__PURE__ */ jsx(Settings, { className: "mr-2" }), "Settings"]
			})
		}) }),
		/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
		/* @__PURE__ */ jsx(DropdownMenuItem, {
			asChild: true,
			children: /* @__PURE__ */ jsxs(Link, {
				className: "block w-full cursor-pointer",
				href: logout(),
				as: "button",
				onClick: handleLogout,
				"data-test": "logout-button",
				children: [/* @__PURE__ */ jsx(LogOut, { className: "mr-2" }), "Log out"]
			})
		})
	] });
}
//#endregion
//#region resources/js/hooks/use-current-url.ts
function useCurrentUrl() {
	const page = usePage();
	const currentUrlPath = new URL(page.url, typeof window !== "undefined" ? window.location.origin : "http://localhost").pathname;
	const isCurrentUrl = (urlToCheck, currentUrl, startsWith = false) => {
		const urlToCompare = currentUrl ?? currentUrlPath;
		const urlString = toUrl(urlToCheck);
		const comparePath = (path) => startsWith ? urlToCompare.startsWith(path) : path === urlToCompare;
		if (!urlString.startsWith("http")) return comparePath(urlString);
		try {
			return comparePath(new URL(urlString).pathname);
		} catch {
			return false;
		}
	};
	const isCurrentOrParentUrl = (urlToCheck, currentUrl) => {
		return isCurrentUrl(urlToCheck, currentUrl, true);
	};
	const whenCurrentUrl = (urlToCheck, ifTrue, ifFalse = null) => {
		return isCurrentUrl(urlToCheck) ? ifTrue : ifFalse;
	};
	return {
		currentUrl: currentUrlPath,
		isCurrentUrl,
		isCurrentOrParentUrl,
		whenCurrentUrl
	};
}
//#endregion
//#region resources/js/components/app-sidebar.tsx
var navGroups = [
	{
		label: "Overview",
		items: [{
			title: "Dashboard",
			href: dashboard(),
			icon: LayoutDashboard
		}, {
			title: "Desa",
			href: villages(),
			icon: MapPinned,
			roles: ["admin", "viewer"]
		}]
	},
	{
		label: "Program",
		items: [
			{
				title: "Assessment",
				href: "#",
				icon: BarChart3,
				roles: ["admin", "viewer"],
				children: [
					{
						title: "KEMENPAR",
						href: surveyAssignments(),
						icon: ClipboardCheck
					},
					{
						title: "UMKM",
						href: umkm(),
						icon: Store
					},
					{
						title: "ISTC",
						href: pariwisata(),
						icon: ChartColumnBig
					}
				]
			},
			{
				title: "Template Survey",
				href: questions(),
				icon: ClipboardList,
				roles: ["admin"]
			},
			{
				title: "Survey Assignment",
				href: surveyAssignments(),
				icon: ClipboardCheck,
				roles: ["enumerator"]
			}
		]
	},
	{
		label: "Management",
		items: [{
			title: "User Management",
			href: users(),
			icon: Users,
			roles: ["admin"]
		}]
	},
	{
		label: "Pengaturan",
		items: [{
			title: "Profile",
			href: profile.edit(),
			icon: UserCog
		}]
	}
];
function AdminSidebarContent({ onNavigate }) {
	const { auth } = usePage().props;
	const { isCurrentOrParentUrl, isCurrentUrl } = useCurrentUrl();
	const [openMenus, setOpenMenus] = useState({});
	const userRole = auth.user?.role === "admin" ? "admin" : auth.user?.role === "viewer" ? "viewer" : "enumerator";
	const visibleNavGroups = navGroups.map((group) => ({
		...group,
		items: group.items.filter((item) => !item.roles || item.roles.includes(userRole))
	})).filter((group) => group.items.length > 0);
	return /* @__PURE__ */ jsxs("div", {
		className: "relative flex h-full flex-col overflow-hidden bg-[#093967] px-4 py-4 text-white shadow-[inset_-1px_0_0_rgba(255,255,255,0.12)]",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "pointer-events-none absolute inset-0 z-0 overflow-hidden",
				children: [
					/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[linear-gradient(180deg,rgba(9,57,103,0.24)_0%,rgba(9,57,103,0.32)_16%,rgba(9,57,103,0.48)_42%,rgba(9,57,103,0.68)_72%,rgba(9,57,103,0.86)_100%)]" }),
					/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,transparent_28%,rgba(255,255,255,0.04)_100%)]" }),
					/* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(9,57,103,0.82)_0%,rgba(9,57,103,0.36)_54%,rgba(9,57,103,0)_100%)]" })
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative z-10 pb-3",
				children: [/* @__PURE__ */ jsx(Link, {
					href: dashboard(),
					prefetch: true,
					onClick: onNavigate,
					className: "flex min-h-[112px] items-end justify-center px-2 pt-1 pb-0",
					"aria-label": "BCA",
					children: /* @__PURE__ */ jsx(SidebarLogo, { className: "h-[96px] w-[210px] max-w-none scale-[1.04] object-contain object-bottom" })
				}), /* @__PURE__ */ jsx("div", { className: "h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.24),transparent)]" })]
			}),
			/* @__PURE__ */ jsx("nav", {
				className: "relative z-10 flex-1 [scrollbar-width:none] overflow-y-auto py-2 [&::-webkit-scrollbar]:hidden",
				children: visibleNavGroups.map((group, groupIndex) => /* @__PURE__ */ jsxs("div", {
					className: groupIndex === 0 ? "mt-1" : "mt-4",
					children: [/* @__PURE__ */ jsx("div", {
						className: "mb-2 px-2.5 text-[10px] font-bold tracking-[0.08em] text-white/45 uppercase",
						children: group.label
					}), /* @__PURE__ */ jsx("div", {
						className: "space-y-1",
						children: group.items.map((item) => {
							const Icon = item.icon;
							const hasChildren = Boolean(item.children?.length);
							const isPlaceholder = item.href === "#" && !hasChildren;
							const href = !isPlaceholder && !hasChildren && typeof item.href !== "string" ? item.href : null;
							const childHrefs = item.children?.filter((child) => typeof child.href !== "string");
							const hasActiveChild = Boolean(childHrefs?.some((child) => isCurrentUrl(child.href)));
							const isOpen = Boolean(openMenus[item.title]);
							const isActive = hasActiveChild ? true : href && href.url === questions().url ? isCurrentOrParentUrl(href) : href ? isCurrentUrl(href) : false;
							const content = /* @__PURE__ */ jsxs(Fragment, { children: [
								isActive && /* @__PURE__ */ jsx(Fragment, {}),
								Icon && /* @__PURE__ */ jsx(Icon, {
									className: "relative size-[18px] shrink-0",
									strokeWidth: 1.9
								}),
								/* @__PURE__ */ jsx("span", {
									className: "relative min-w-0 flex-1 truncate",
									children: item.title
								}),
								item.badge && /* @__PURE__ */ jsx("span", {
									className: ["relative ml-auto inline-flex h-5 min-w-[22px] items-center justify-center rounded-full px-1.5 text-[11px] font-bold text-white", item.warning ? "bg-[#FF944C]" : "bg-white/16"].join(" "),
									children: item.badge
								}),
								hasChildren && /* @__PURE__ */ jsx(ChevronDown, {
									className: ["relative size-4 shrink-0 text-white/70 transition-transform duration-150", isOpen ? "rotate-180" : ""].join(" "),
									strokeWidth: 1.8
								})
							] });
							const className = ["group relative flex h-[42px] items-center gap-2.5 rounded-xl px-3 text-[13.5px] leading-5 transition-all duration-150", isActive || isOpen ? "bg-[#2FA6FC] font-semibold text-white shadow-sm" : isPlaceholder ? "cursor-default font-medium text-white/42" : "font-medium text-white/72 hover:translate-x-0.5 hover:bg-white/10 hover:text-white"].join(" ");
							if (hasChildren) return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								className,
								"aria-expanded": isOpen,
								onClick: () => setOpenMenus((current) => ({
									...current,
									[item.title]: !current[item.title]
								})),
								children: content
							}), isOpen && /* @__PURE__ */ jsx("div", {
								className: "mt-1 ml-5 space-y-1 border-l border-white/14 pl-3",
								children: item.children?.map((child) => {
									const ChildIcon = child.icon;
									return /* @__PURE__ */ jsxs(Link, {
										href: child.href,
										onClick: onNavigate,
										className: `flex h-9 items-center gap-2 rounded-lg px-3 text-[13px] font-medium transition ${isCurrentUrl(child.href) ? "bg-white/20 font-semibold text-white" : "text-white/68 hover:bg-white/10 hover:text-white"}`,
										children: [ChildIcon && /* @__PURE__ */ jsx(ChildIcon, {
											className: "size-4 shrink-0",
											strokeWidth: 1.8
										}), /* @__PURE__ */ jsx("span", {
											className: "truncate",
											children: child.title
										})]
									}, child.title);
								})
							})] }, item.title);
							return isPlaceholder ? /* @__PURE__ */ jsx("div", {
								className,
								"aria-disabled": "true",
								children: content
							}, item.title) : /* @__PURE__ */ jsx(Link, {
								href: item.href,
								prefetch: true,
								onClick: onNavigate,
								className,
								"aria-current": isActive ? "page" : void 0,
								children: content
							}, item.title);
						})
					})]
				}, group.label))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative z-10 mt-3 overflow-hidden rounded-[26px] bg-[linear-gradient(180deg,rgba(14,76,138,0.26)_0%,rgba(14,76,138,0.16)_100%)] px-2 pt-4 pb-2 shadow-[0_18px_32px_rgba(3,17,32,0.18)] backdrop-blur-md",
				children: [
					" ",
					/* @__PURE__ */ jsx("div", {
						className: "relative px-2 text-[10px] font-semibold tracking-[0.08em] text-white/72 uppercase",
						children: "CSR Dashboard"
					}),
					auth.user && /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
						asChild: true,
						children: /* @__PURE__ */ jsxs("button", {
							className: "relative flex w-full items-center gap-2.5 rounded-2xl border border-white/16 bg-[#0E4C8A]/58 p-2.5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-md transition duration-150 hover:bg-[#0E4C8A]/66",
							children: [
								/* @__PURE__ */ jsxs("span", {
									className: "relative flex size-[34px] shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white/35 bg-gradient-to-br from-white to-[#AAD2F8] text-[13px] font-bold text-[#0066AE] shadow-[0_6px_16px_rgba(3,17,32,0.16)]",
									children: [auth.user.avatar ? /* @__PURE__ */ jsx("img", {
										src: auth.user.avatar,
										alt: auth.user.name,
										className: "size-full object-cover"
									}) : auth.user.name.charAt(0).toUpperCase(), /* @__PURE__ */ jsx("span", { className: "absolute right-[-1px] bottom-[-1px] size-2 rounded-full border-2 border-[#093967] bg-[#22c55e]" })]
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ jsx("span", {
										className: "block truncate text-[13px] leading-4 font-bold text-white",
										children: auth.user.name
									}), /* @__PURE__ */ jsx("span", {
										className: "mt-0.5 block truncate text-[11px] leading-4 text-white/65",
										children: auth.user.email
									})]
								}),
								/* @__PURE__ */ jsx(ChevronDown, {
									className: "size-4 text-white/70",
									strokeWidth: 1.8
								})
							]
						})
					}), /* @__PURE__ */ jsx(DropdownMenuContent, {
						className: "w-56 rounded-xl",
						side: "top",
						align: "end",
						children: /* @__PURE__ */ jsx(UserMenuContent, { user: auth.user })
					})] })
				]
			})
		]
	});
}
function AppSidebar() {
	return /* @__PURE__ */ jsx("aside", {
		className: "fixed inset-y-0 left-0 z-20 hidden w-[232px] overflow-hidden lg:block",
		children: /* @__PURE__ */ jsx(AdminSidebarContent, {})
	});
}
//#endregion
//#region resources/js/components/global-survey-selector.tsx
function GlobalSurveySelector() {
	const { url } = usePage();
	const [desaList, setDesaList] = useState([]);
	const [selectedDesa, setSelectedDesa] = useState("");
	const [loadingDesa, setLoadingDesa] = useState(true);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	useEffect(() => {
		let isMounted = true;
		setLoadingDesa(true);
		fetch("/api/dashboard/desa").then(async (response) => {
			if (!response.ok) throw new Error(`Dashboard desa request failed: ${response.status}`);
			return response.json();
		}).then((payload) => {
			const rows = Array.isArray(payload) ? payload : payload && typeof payload === "object" && Array.isArray(payload.data) ? payload.data : [];
			const uniqueDesa = Array.from(new Map(rows.filter((row) => typeof row === "object" && row !== null && typeof row.id === "number" && typeof row.code === "string" && typeof row.name === "string").map((row) => [row.code, row])).values());
			if (isMounted) setDesaList(uniqueDesa);
		}).catch(() => {
			if (isMounted) setDesaList([]);
		}).finally(() => {
			if (isMounted) setLoadingDesa(false);
		});
		return () => {
			isMounted = false;
		};
	}, []);
	useEffect(() => {
		const path = url.split("?")[0].replace(/\/$/, "");
		if ([
			"",
			"/dashboard",
			"/villages",
			"/survey-assignments",
			"/pariwisata",
			"/umkm",
			"/users",
			"/profile"
		].includes(path)) {
			setSelectedDesa("");
			localStorage.removeItem("selected_desa_code");
			return;
		}
		const currentDesaCode = localStorage.getItem("selected_desa_code") || "";
		if (currentDesaCode && currentDesaCode !== selectedDesa) setSelectedDesa(currentDesaCode);
	}, [url]);
	const handleDesaChange = (code) => {
		if (code === "unselected") {
			setSelectedDesa("");
			localStorage.removeItem("selected_desa_code");
			router.visit(dashboard.url());
			return;
		}
		const desa = desaList.find((item) => item.code === code);
		if (!desa) return;
		setSelectedDesa(code);
		localStorage.setItem("selected_desa_code", code);
		router.visit(show.url({ village: desa.id }));
	};
	return /* @__PURE__ */ jsxs("header", {
		className: "flex h-14 w-full items-center justify-between gap-3 border-b border-[#E5E7EB] bg-white px-3 shadow-sm sm:px-6",
		children: [/* @__PURE__ */ jsxs(Sheet, {
			open: isSidebarOpen,
			onOpenChange: setIsSidebarOpen,
			children: [/* @__PURE__ */ jsx(SheetTrigger, {
				asChild: true,
				children: /* @__PURE__ */ jsx(Button, {
					variant: "ghost",
					size: "icon",
					className: "size-9 shrink-0 rounded-lg text-[#303030] lg:hidden",
					"aria-label": "Buka menu",
					children: /* @__PURE__ */ jsx(Menu, {
						className: "size-5",
						strokeWidth: 2
					})
				})
			}), /* @__PURE__ */ jsx(SheetContent, {
				side: "left",
				className: "w-[280px] max-w-[85vw] border-0 bg-transparent p-0",
				children: /* @__PURE__ */ jsx(AdminSidebarContent, { onNavigate: () => setIsSidebarOpen(false) })
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "relative ml-auto w-48 sm:w-56",
			children: /* @__PURE__ */ jsxs(Select, {
				value: selectedDesa,
				onValueChange: handleDesaChange,
				disabled: loadingDesa,
				children: [/* @__PURE__ */ jsx(SelectTrigger, {
					className: "w-full border-0 bg-[#093967] font-bold text-white hover:bg-[#072d54] focus:ring-1 focus:ring-[#0066AE] data-[placeholder]:text-white",
					"aria-label": "Desa Wisata",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 overflow-hidden",
						children: [/* @__PURE__ */ jsx(Map$1, { className: "h-4 w-4 shrink-0 text-white" }), loadingDesa ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin text-white" }) : /* @__PURE__ */ jsx(SelectValue, { placeholder: "Pilih desa..." })]
					})
				}), /* @__PURE__ */ jsxs(SelectContent, { children: [
					/* @__PURE__ */ jsx(SelectItem, {
						value: "unselected",
						children: "Pilih desa..."
					}),
					desaList.map((desa) => /* @__PURE__ */ jsx(SelectItem, {
						value: desa.code,
						children: desa.name
					}, desa.code)),
					desaList.length === 0 && !loadingDesa && /* @__PURE__ */ jsx("div", {
						className: "px-2 py-2 text-sm text-gray-500",
						children: "Tidak ada data"
					})
				] })]
			})
		})]
	});
}
//#endregion
//#region resources/js/layouts/app/app-sidebar-layout.tsx
function AppSidebarLayout({ children }) {
	const { component } = usePage();
	const hideSurveySelector = ["survey/take-survey", "survey-assignment/take-survey-pariwisata"].includes(component);
	return /* @__PURE__ */ jsxs(AppShell, {
		variant: "sidebar",
		children: [/* @__PURE__ */ jsx(AppSidebar, {}), /* @__PURE__ */ jsxs(AppContent, {
			variant: "sidebar",
			children: [!hideSurveySelector && /* @__PURE__ */ jsx("div", {
				className: "sticky top-0 z-[1050] flex flex-col",
				children: /* @__PURE__ */ jsx(GlobalSurveySelector, {})
			}), children]
		})]
	});
}
//#endregion
//#region resources/js/layouts/app-layout.tsx
function FlashToastListener() {
	useFlashToast();
	return null;
}
function AppLayout({ breadcrumbs = [], children }) {
	return /* @__PURE__ */ jsxs(AppSidebarLayout, {
		breadcrumbs,
		children: [/* @__PURE__ */ jsx(FlashToastListener, {}), children]
	});
}
//#endregion
//#region resources/js/components/app-logo-icon.tsx
function AppLogoIcon(props) {
	return /* @__PURE__ */ jsx("svg", {
		...props,
		viewBox: "0 0 40 42",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ jsx("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M17.2 5.63325L8.6 0.855469L0 5.63325V32.1434L16.2 41.1434L32.4 32.1434V23.699L40 19.4767V9.85547L31.4 5.07769L22.8 9.85547V18.2999L17.2 21.411V5.63325ZM38 18.2999L32.4 21.411V15.2545L38 12.1434V18.2999ZM36.9409 10.4439L31.4 13.5221L25.8591 10.4439L31.4 7.36561L36.9409 10.4439ZM24.8 18.2999V12.1434L30.4 15.2545V21.411L24.8 18.2999ZM23.8 20.0323L29.3409 23.1105L16.2 30.411L10.6591 27.3328L23.8 20.0323ZM7.6 27.9212L15.2 32.1434V38.2999L2 30.9666V7.92116L7.6 11.0323V27.9212ZM8.6 9.29991L3.05913 6.22165L8.6 3.14339L14.1409 6.22165L8.6 9.29991ZM30.4 24.8101L17.2 32.1434V38.2999L30.4 30.9666V24.8101ZM9.6 11.0323L15.2 7.92117V22.5221L9.6 25.6333V11.0323Z"
		})
	});
}
//#endregion
//#region resources/js/layouts/auth/auth-simple-layout.tsx
function AuthSimpleLayout({ children, title, description }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "relative flex min-h-svh flex-col items-center justify-center px-4 py-8 font-bca text-[#303030] sm:px-6",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "absolute inset-0 z-0 bg-cover bg-center bg-no-repeat",
				style: { backgroundImage: "url(\"/images/bg-login.webp\")" }
			}),
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-0 bg-[#093967]/40 mix-blend-multiply" }),
			/* @__PURE__ */ jsx("div", {
				className: "relative z-10 w-full max-w-[420px] rounded-3xl border border-white/20 bg-white/95 px-6 py-7 shadow-[0_18px_46px_rgba(9,57,103,0.15)] backdrop-blur-md sm:px-8",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col items-center gap-3",
						children: [/* @__PURE__ */ jsxs(Link, {
							href: home(),
							className: "flex flex-col items-center gap-2 font-medium",
							children: [/* @__PURE__ */ jsx("div", {
								className: "flex size-12 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#0066AE]",
								children: /* @__PURE__ */ jsx(AppLogoIcon, { className: "size-8 fill-current text-[#0066AE]" })
							}), /* @__PURE__ */ jsx("span", {
								className: "sr-only",
								children: title
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "space-y-1.5 text-center",
							children: [/* @__PURE__ */ jsx("h1", {
								className: "text-xl font-bold text-[#0F172A]",
								children: title
							}), /* @__PURE__ */ jsx("p", {
								className: "text-center text-sm leading-6 text-[#64748B]",
								children: description
							})]
						})]
					}), children]
				})
			})
		]
	});
}
//#endregion
//#region resources/js/layouts/auth-layout.tsx
function AuthLayout({ title = "", description = "", fullScreen = false, children }) {
	if (fullScreen) return /* @__PURE__ */ jsx(Fragment, { children });
	return /* @__PURE__ */ jsx(AuthSimpleLayout, {
		title,
		description,
		children
	});
}
//#endregion
//#region resources/js/layouts/settings/layout.tsx
var sidebarNavItems = [
	{
		title: "Profile",
		href: edit(),
		icon: null
	},
	{
		title: "Security",
		href: edit$2(),
		icon: null
	},
	{
		title: "Appearance",
		href: edit$1(),
		icon: null
	}
];
function SettingsLayout({ children }) {
	const { isCurrentOrParentUrl } = useCurrentUrl();
	return /* @__PURE__ */ jsxs("div", {
		className: "px-4 py-6",
		children: [/* @__PURE__ */ jsx(Heading, {
			title: "Settings",
			description: "Manage your profile and account settings"
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col lg:flex-row lg:space-x-12",
			children: [
				/* @__PURE__ */ jsx("aside", {
					className: "w-full max-w-xl lg:w-48",
					children: /* @__PURE__ */ jsx("nav", {
						className: "flex flex-col space-y-1 space-x-0",
						"aria-label": "Settings",
						children: sidebarNavItems.map((item, index) => /* @__PURE__ */ jsx(Button, {
							size: "sm",
							variant: "ghost",
							asChild: true,
							className: cn("w-full justify-start", { "bg-muted": isCurrentOrParentUrl(item.href) }),
							children: /* @__PURE__ */ jsxs(Link, {
								href: item.href,
								children: [item.icon && /* @__PURE__ */ jsx(item.icon, { className: "h-4 w-4" }), item.title]
							})
						}, `${toUrl(item.href)}-${index}`))
					})
				}),
				/* @__PURE__ */ jsx(Separator, { className: "my-6 lg:hidden" }),
				/* @__PURE__ */ jsx("div", {
					className: "flex-1 md:max-w-2xl",
					children: /* @__PURE__ */ jsx("section", {
						className: "max-w-xl space-y-12",
						children
					})
				})
			]
		})]
	});
}
//#endregion
//#region resources/js/app.tsx
var appName = "DesaBaktiBCA";
var render = await createInertiaApp({
	resolve: async (name, page) => {
		const pages = /* @__PURE__ */ Object.assign({
			"./pages/auth/confirm-password.tsx": () => import("./assets/confirm-password-B995hChi.js"),
			"./pages/auth/forgot-password.tsx": () => import("./assets/forgot-password-D0IG9Coq.js"),
			"./pages/auth/login.tsx": () => import("./assets/login-D6yydmHC.js"),
			"./pages/auth/register.tsx": () => import("./assets/register-CVQfh8O6.js"),
			"./pages/auth/reset-password.tsx": () => import("./assets/reset-password-BgqIaPp9.js"),
			"./pages/auth/two-factor-challenge.tsx": () => import("./assets/two-factor-challenge-BxxVfubO.js"),
			"./pages/auth/verify-email.tsx": () => import("./assets/verify-email-rVLrQw4D.js"),
			"./pages/chatbot/index.tsx": () => import("./assets/chatbot-CssvPmVl.js"),
			"./pages/dashboard.tsx": () => import("./assets/dashboard-DTKbeN8i.js"),
			"./pages/pariwisata/index.tsx": () => import("./assets/pariwisata-ZuGdFmWH.js"),
			"./pages/questions/index.tsx": () => import("./assets/questions-DWIDpnAd.js"),
			"./pages/questions/templates.tsx": () => import("./assets/templates-D8hWOPmE.js"),
			"./pages/settings/appearance.tsx": () => import("./assets/appearance-CG7ViFny.js"),
			"./pages/settings/profile.tsx": () => import("./assets/profile-rQDDJ1YF.js"),
			"./pages/settings/security.tsx": () => import("./assets/security-dVKZRdzX.js"),
			"./pages/survey/take-survey.tsx": () => import("./assets/take-survey-BRDdl1wm.js"),
			"./pages/survey-assignment/create-pariwisata.tsx": () => import("./assets/create-pariwisata-Dr344dD5.js"),
			"./pages/survey-assignment/create-umkm.tsx": () => import("./assets/create-umkm-BTqg3d_d.js"),
			"./pages/survey-assignment/index.tsx": () => import("./assets/survey-assignment-V9IgUJU1.js"),
			"./pages/survey-assignment/show-pariwisata.tsx": () => import("./assets/show-pariwisata-CbZs__8K.js"),
			"./pages/survey-assignment/show-umkm.tsx": () => import("./assets/show-umkm-BsFiWHb4.js"),
			"./pages/survey-assignment/show.tsx": () => import("./assets/show-zMcpaRjs.js"),
			"./pages/survey-assignment/take-survey-pariwisata.tsx": () => import("./assets/take-survey-pariwisata-QRdpLdWj.js"),
			"./pages/umkm/index.tsx": () => import("./assets/umkm-C7lDtEYN.js"),
			"./pages/users/index.tsx": () => import("./assets/users-8jAR4VeU.js"),
			"./pages/villages/detail.tsx": () => import("./assets/detail-DPYGgVj_.js"),
			"./pages/villages/edit.tsx": () => import("./assets/edit-DrsrBdV9.js"),
			"./pages/villages/index.tsx": () => import("./assets/villages-BCbHy78S.js"),
			"./pages/villages/show.tsx": () => import("./assets/show-CzHewrGK.js"),
			"./pages/welcome.tsx": () => import("./assets/welcome-BMFXin7I.js")
		});
		const module = await (pages[`./pages/${name}.tsx`] || pages[`./pages/${name}.jsx`] || pages[`./Pages/${name}.tsx`] || pages[`./Pages/${name}.jsx`])?.();
		if (!module) throw new Error(`Page not found: ${name}`);
		return module.default ?? module;
	},
	title: (title) => title ? `${title} - ${appName}` : appName,
	layout: (name) => {
		switch (true) {
			case name === "welcome": return null;
			case name === "villages/show": return null;
			case name === "villages/detail": return null;
			case name.startsWith("auth/"): return AuthLayout;
			case name.startsWith("settings/"): return [AppLayout, SettingsLayout];
			default: return AppLayout;
		}
	},
	strictMode: true,
	withApp(app) {
		return /* @__PURE__ */ jsxs(TooltipProvider, {
			delayDuration: 0,
			children: [app, /* @__PURE__ */ jsx(Toaster$1, {})]
		});
	},
	progress: { color: "#4B5563" }
});
var renderPage = (page) => render(page, renderToString);
createServer(renderPage);
initializeTheme();
//#endregion
export { renderPage as default };

//# sourceMappingURL=app.js.map