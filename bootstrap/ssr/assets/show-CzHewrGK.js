import { t as dashboard } from "./routes-Bnxj77BR.js";
import { a as show } from "./villages-rJA_ttRN.js";
import { c as DialogTrigger, i as DialogDescription, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-UyX6Ddfj.js";
import { i as show$1 } from "./survey-assignments-CVUcelPC.js";
import { Head, Link } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Buildings, Camera, Car, ChatsCircle, Clock, EnvelopeSimple, FacebookLogo, ForkKnife, Gift, House, Info, InstagramLogo, Leaf, MapPin, MapTrifold, Package, Park, Phone, ShoppingBagOpen, SquaresFour, Star, Storefront, TiktokLogo, Toilet, Trophy, User, UsersThree, WifiHigh, YoutubeLogo } from "@phosphor-icons/react";
//#region resources/js/pages/villages/show.tsx
var cx = (...c) => c.filter(Boolean).join(" ");
var textOrFallback = (value, fallback) => value && value !== "-" && value.trim() !== "" ? value : fallback;
var truncateText = (value, maxLength = 96) => value.length > maxLength ? `${value.slice(0, maxLength).trim()}....` : value;
var profileDescriptionLimit = 320;
var stripHtml = (html) => {
	return new DOMParser().parseFromString(html, "text/html").body.textContent || "";
};
var normalize = (value) => value.toLowerCase().replace(/\s+/g, "-");
var firstMediaUrl = (media) => media?.find((item) => item.is_cover)?.url || media?.[0]?.url || null;
var groupItems = (groups, matcher) => groups?.find((group) => matcher(normalize(group.category)))?.items ?? [];
var profileProducts = (items, badge, tone) => items.map((item) => ({
	title: item.name,
	image: firstMediaUrl(item.media),
	desc: item.description ?? item.address ?? void 0,
	price: item.price_text ?? void 0,
	meta: item.opening_hours ?? void 0,
	badge,
	tone
}));
var nav = [
	[
		House,
		"Home",
		"#home"
	],
	[
		User,
		"Profil",
		"#profil"
	],
	[
		Star,
		"Pariwisata",
		"#pariwisata"
	],
	[
		Gift,
		"UMKM",
		"#umkm"
	]
];
var footerCols = [
	["Explore", "Why Rural Tourism, Tourism Villages, Attraction Packages, Activities, Travel Inspiration, Partner Villages"],
	["Categories", "Nature & Adventure, Culture & Heritage, Culinary & Gastronomy, Creative Economy, Wellness & Relaxation, Educational Tourism"],
	["Information", "News & Articles, Event Calendar, Village Awards, Download Center, Gallery, FAQ"],
	["Help & Support", "Help Center, Contact Us, Privacy Policy, Terms of Use"]
];
function Logo() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-3",
		children: [/* @__PURE__ */ jsx("img", {
			src: "/logo/desa-logo-trans.webp",
			alt: "Desa Bakti BCA",
			className: "size-14 shrink-0 object-contain"
		}), /* @__PURE__ */ jsxs("div", {
			className: "leading-tight",
			children: [/* @__PURE__ */ jsx("p", {
				className: "text-[18px] font-extrabold text-[#0f172a]",
				children: "Desa Bakti BCA"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-[12px] font-semibold text-[#7C7C7C]",
				children: "Explore Authentic Villages"
			})]
		})]
	});
}
function TopNav({ villages }) {
	return /* @__PURE__ */ jsx("header", {
		className: "border-b border-[#dde7e7] bg-white",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto flex h-20 max-w-[1360px] items-center justify-between gap-8 px-8",
			children: [
				/* @__PURE__ */ jsx(Logo, {}),
				/* @__PURE__ */ jsx("nav", {
					className: "hidden items-center gap-7 lg:flex",
					children: nav.map(([Icon, label, href]) => /* @__PURE__ */ jsxs("a", {
						href,
						className: "group inline-flex h-11 items-center gap-2 text-[13px] font-bold text-[#303030] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-[#0066AE] active:scale-[0.98]",
						children: [/* @__PURE__ */ jsx(Icon, { className: "size-5" }), label]
					}, label))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ jsxs(Link, {
						href: dashboard.url(),
						className: "inline-flex h-10 items-center gap-2 rounded-lg border border-[#D5E3F1] bg-white px-4 text-[13px] font-extrabold text-[#093967] shadow-[0_8px_18px_rgba(15,23,42,0.08)] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-[#F1F7FD] active:scale-[0.98]",
						children: [/* @__PURE__ */ jsx(SquaresFour, { className: "size-5" }), "Dashboard"]
					}), /* @__PURE__ */ jsxs("details", {
						className: "group relative",
						children: [/* @__PURE__ */ jsxs("summary", {
							className: "inline-flex h-10 cursor-pointer list-none items-center gap-2 rounded-lg bg-[#093967] px-5 text-[13px] font-extrabold text-white shadow-[0_12px_24px_rgba(0,102,174,0.18)] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:scale-[0.98] [&::-webkit-details-marker]:hidden",
							children: [
								/* @__PURE__ */ jsx(MapTrifold, { className: "size-5" }),
								"List Desa",
								/* @__PURE__ */ jsx("span", {
									className: "text-[11px] transition group-open:rotate-180",
									children: "v"
								})
							]
						}), /* @__PURE__ */ jsx("div", {
							className: "absolute right-0 z-30 mt-3 w-72 overflow-hidden rounded-2xl border border-[#DDE7E7] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.16)]",
							children: /* @__PURE__ */ jsx("div", {
								className: "max-h-80 overflow-y-auto p-2",
								children: villages.map((item) => /* @__PURE__ */ jsxs("a", {
									href: show.url(item.id),
									className: "block rounded-xl px-3 py-2.5 text-left transition hover:bg-[#EAF3FF]",
									children: [/* @__PURE__ */ jsx("span", {
										className: "block text-[13px] font-extrabold text-[#093967]",
										children: item.name
									}), /* @__PURE__ */ jsx("span", {
										className: "mt-0.5 block text-[11px] font-semibold text-[#64748B]",
										children: item.location
									})]
								}, item.id))
							})
						})]
					})]
				})
			]
		})
	});
}
function Hero({ village, heroImage }) {
	const location = textOrFallback(village.address !== "-" ? village.address : village.location, "Banjarbanggi, Pitu, Ngawi Regency, East Java");
	return /* @__PURE__ */ jsxs("section", {
		className: "relative h-[420px] overflow-hidden bg-[#093967] md:h-[560px]",
		children: [
			heroImage ? /* @__PURE__ */ jsx("img", {
				src: heroImage,
				alt: `${village.name} landscape`,
				className: "absolute inset-0 h-full w-full object-cover"
			}) : /* @__PURE__ */ jsx(ImagePlaceholder, {
				label: "hero desa",
				className: "absolute inset-0 bg-[#EAF3FF]"
			}),
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[linear-gradient(90deg,rgba(0,34,68,0.78)_0%,rgba(0,68,120,0.58)_42%,rgba(0,102,174,0.16)_100%)]" }),
			/* @__PURE__ */ jsx("div", {
				className: "relative mx-auto flex h-full max-w-[1360px] items-center px-8",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-[860px] translate-y-1 text-white",
					children: [/* @__PURE__ */ jsx("h1", {
						className: "text-[34px] leading-[1.1] font-extrabold tracking-[-0.01em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] md:text-[40px]",
						children: textOrFallback(village.name, "Tidak ada data")
					}), /* @__PURE__ */ jsxs("div", {
						className: "mt-5 flex items-center gap-2 text-[15px] font-bold drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]",
						children: [/* @__PURE__ */ jsx(MapPin, {
							className: "size-5",
							weight: "fill"
						}), location]
					})]
				})
			})
		]
	});
}
function Heading({ icon: Icon, children }) {
	return /* @__PURE__ */ jsxs("h2", {
		className: "mb-4 flex items-center gap-2 text-[18px] font-extrabold text-[#0066AE]",
		children: [/* @__PURE__ */ jsx(Icon, {
			className: "size-5",
			weight: "fill"
		}), /* @__PURE__ */ jsx("span", {
			className: "text-[#093967]",
			children
		})]
	});
}
function Panel({ children }) {
	return /* @__PURE__ */ jsx("section", {
		className: "rounded-[18px] p-5",
		children
	});
}
function VillageProfileSummary({ workers, stakeholders, institutionals }) {
	const totalWorkers = workers.reduce((total, item) => total + item.amount, 0);
	const partTimeWorkers = workers.filter((item) => item.type === "part-time").reduce((total, item) => total + item.amount, 0);
	const fullTimeWorkers = workers.filter((item) => item.type === "full-time").reduce((total, item) => total + item.amount, 0);
	const summaryStats = [
		{
			value: totalWorkers,
			unit: "Orang",
			label: "Total Tenaga Kerja",
			icon: UsersThree,
			iconClass: "bg-[#EAF3FF] text-[#0066AE]"
		},
		{
			value: partTimeWorkers,
			unit: "Orang",
			label: "Pekerja Paruh Waktu",
			icon: Clock,
			iconClass: "bg-[#EAFBF4] text-[#18A66A]"
		},
		{
			value: fullTimeWorkers,
			unit: "Orang",
			label: "Pekerja Penuh Waktu",
			icon: Package,
			iconClass: "bg-[#F1EDFF] text-[#6D4AFF]"
		},
		{
			value: institutionals.length,
			unit: "Lembaga",
			label: "Kelembagaan Terlibat",
			icon: Buildings,
			iconClass: "bg-[#FFF4E5] text-[#E79A20]"
		}
	];
	return /* @__PURE__ */ jsxs("section", {
		className: "md:p-6",
		children: [
			/* @__PURE__ */ jsx(Heading, {
				icon: UsersThree,
				children: "Ringkasan Profil Desa"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
				children: summaryStats.map((stat) => {
					const Icon = stat.icon;
					return /* @__PURE__ */ jsxs("article", {
						className: "rounded-[14px] border border-[#EDF0F4] bg-white px-3 py-4 text-center shadow-[0_4px_14px_rgba(15,23,42,0.035)]",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-center gap-2",
							children: [/* @__PURE__ */ jsx("span", {
								className: cx("grid size-9 place-items-center rounded-full", stat.iconClass),
								children: /* @__PURE__ */ jsx(Icon, {
									className: "size-5",
									weight: "fill"
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "text-left leading-none",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-[22px] font-black tracking-[-0.03em] text-[#0066AE]",
									children: stat.value
								}), /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-[10px] font-extrabold text-[#303030]",
									children: stat.unit
								})]
							})]
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-3 text-[10px] leading-4 font-extrabold text-[#303030]",
							children: stat.label
						})]
					}, stat.label);
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-6",
				children: [/* @__PURE__ */ jsxs("h3", {
					className: "mb-3 flex items-center gap-2 text-[12px] font-extrabold text-[#093967]",
					children: [/* @__PURE__ */ jsx(Buildings, {
						className: "size-4 text-[#0066AE]",
						weight: "fill"
					}), "Kelembagaan yang Terlibat dalam Pengelolaan Desa"]
				}), institutionals.length ? /* @__PURE__ */ jsx("div", {
					className: "grid gap-3 md:grid-cols-3",
					children: institutionals.map((institution) => /* @__PURE__ */ jsxs("article", {
						className: "flex gap-3 rounded-[14px] border border-[#EDF0F4] bg-white p-4 shadow-[0_4px_14px_rgba(15,23,42,0.03)]",
						children: [/* @__PURE__ */ jsx("span", {
							className: "grid size-11 shrink-0 place-items-center rounded-full bg-[#EAF3FF] text-[#0066AE]",
							children: /* @__PURE__ */ jsx(Buildings, {
								className: "size-6",
								weight: "fill"
							})
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
							className: "text-[12px] font-black text-[#303030]",
							children: institution.title
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-1 text-[9px] leading-[1.55] font-semibold text-[#5F6B76]",
							children: institution.description
						})] })]
					}, institution.title))
				}) : /* @__PURE__ */ jsx(EmptyState, { title: "Tidak ada data kelembagaan" })]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "bg- mt-5 rounded-[15px] border border-[#E4E8ED] p-4 shadow-[0_7px_20px_rgba(15,23,42,0.08)] md:p-5",
				children: [/* @__PURE__ */ jsx("h3", {
					className: "text-[13px] font-black text-[#0066AE]",
					children: "Stakeholder Kunci"
				}), stakeholders.length ? /* @__PURE__ */ jsx("div", {
					className: "mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
					children: stakeholders.map((stakeholder, index) => /* @__PURE__ */ jsx("article", {
						className: "text-center",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col items-center",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "relative grid size-12 shrink-0 place-items-center rounded-full border-[3px] border-[#13AAB5] bg-[#EAF3FF] shadow-[0_4px_12px_rgba(0,102,174,0.18)]",
								children: [/* @__PURE__ */ jsx(User, {
									className: "size-7 text-[#093967]",
									weight: "fill"
								}), /* @__PURE__ */ jsx("span", {
									className: "absolute -right-1 -bottom-1 grid size-4 place-items-center rounded-full bg-[#0066AE] text-[8px] font-black text-white ring-2 ring-white",
									children: index + 1
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "mt-2",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-[10px] font-black text-[#303030]",
									children: stakeholder.position
								}), /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-[9px] font-semibold text-[#66717C]",
									children: stakeholder.name
								})]
							})]
						})
					}, stakeholder.id))
				}) : /* @__PURE__ */ jsx("div", {
					className: "mt-4",
					children: /* @__PURE__ */ jsx(EmptyState, { title: "Tidak ada data stakeholder" })
				})]
			})
		]
	});
}
function EmptyState({ title }) {
	return /* @__PURE__ */ jsx("div", {
		className: "grid min-h-[140px] place-items-center rounded-[16px] border border-dashed border-[#C8D8E8] bg-[#F8FBFE] px-5 text-center text-[13px] font-extrabold text-[#7C7C7C]",
		children: title
	});
}
function ImagePlaceholder({ label, className }) {
	return /* @__PURE__ */ jsxs("div", {
		className: cx("grid h-full w-full place-items-center bg-[#EAF3FF] p-4 text-center text-[12px] font-extrabold text-[#7C7C7C]", className),
		children: ["Tidak ada gambar ", label]
	});
}
function ProductCard({ p, centered = false, size = "default" }) {
	const isLarge = size === "large";
	const card = /* @__PURE__ */ jsxs("article", {
		className: cx("overflow-hidden border border-[#EFEFEF] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)]", isLarge ? "rounded-[16px]" : "rounded-[14px]"),
		children: [/* @__PURE__ */ jsxs("div", {
			className: cx("relative overflow-hidden bg-[#F1F5F8]", isLarge ? "aspect-[4/3]" : "aspect-[16/9]"),
			children: [p.image ? /* @__PURE__ */ jsx("img", {
				src: p.image,
				alt: p.title,
				className: "h-full w-full object-cover transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04]"
			}) : /* @__PURE__ */ jsx(ImagePlaceholder, { label: p.title }), p.badge ? /* @__PURE__ */ jsx("span", {
				className: cx("absolute top-2 left-2 rounded-md px-2.5 py-1 text-[10px] font-extrabold text-white", p.tone),
				children: p.badge
			}) : null]
		}), /* @__PURE__ */ jsxs("div", {
			className: cx(isLarge ? "p-5" : "p-4", centered && "text-center"),
			children: [
				/* @__PURE__ */ jsx("h3", {
					className: cx("font-extrabold text-[#303030]", isLarge ? "text-[15px] leading-snug" : "text-[13px] leading-snug"),
					children: p.title
				}),
				p.desc ? /* @__PURE__ */ jsx("p", {
					className: cx("mt-2 line-clamp-2 font-semibold text-[#303030]", isLarge ? "min-h-[38px] text-[12px] leading-[1.55]" : "min-h-[34px] text-[11px] leading-[1.55]"),
					children: truncateText(p.desc, isLarge ? 86 : 96)
				}) : null,
				p.meta && !p.price ? /* @__PURE__ */ jsxs("p", {
					className: cx("mt-3 inline-flex items-center gap-1 font-bold text-[#303030]", isLarge ? "text-[12px]" : "text-[11px]"),
					children: [/* @__PURE__ */ jsx(MapPin, {
						className: isLarge ? "size-4 text-[#0066AE]" : "size-3.5 text-[#0066AE]",
						weight: "fill"
					}), p.meta]
				}) : null,
				p.price ? /* @__PURE__ */ jsxs("p", {
					className: cx("mt-3 font-extrabold text-[#0066AE]", isLarge ? "text-[14px]" : "text-[13px]"),
					children: [
						p.price,
						" ",
						p.meta ? /* @__PURE__ */ jsx("span", {
							className: "font-bold text-[#7C7C7C]",
							children: p.meta
						}) : null
					]
				}) : null
			]
		})]
	});
	return p.href ? /* @__PURE__ */ jsx("a", {
		href: p.href,
		className: "block",
		children: card
	}) : card;
}
function ShowcaseProductCard({ p, variant }) {
	const isUmkm = variant === "umkm";
	const accent = isUmkm ? "#0066AE" : "#0066AE";
	const soft = isUmkm ? "#EAF3FF" : "#EAF3FF";
	const Icon = isUmkm ? Storefront : Leaf;
	return /* @__PURE__ */ jsxs("article", {
		className: "group overflow-hidden rounded-[20px] border border-[#EFEFEF] bg-white shadow-[0_10px_28px_rgba(15,23,42,0.07)] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,0.10)]",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative aspect-[16/9] overflow-hidden bg-[#F1F5F8]",
			children: [
				p.image ? /* @__PURE__ */ jsx("img", {
					src: p.image,
					alt: p.title,
					className: "h-full w-full object-cover transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
				}) : /* @__PURE__ */ jsx(ImagePlaceholder, { label: p.title }),
				/* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/45 to-transparent" }),
				p.badge ? /* @__PURE__ */ jsxs("span", {
					className: "absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-extrabold text-white shadow-[0_10px_24px_rgba(0,0,0,0.18)]",
					style: { backgroundColor: accent },
					children: [/* @__PURE__ */ jsx(Icon, {
						className: "size-3.5",
						weight: "fill"
					}), p.badge]
				}) : null
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "space-y-2.5 p-4",
			children: [
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
					className: "text-[13px] leading-tight font-extrabold text-[#303030]",
					children: p.title
				}), p.desc ? /* @__PURE__ */ jsx("p", {
					className: "mt-1 line-clamp-2 text-[11px] leading-[1.65] font-semibold text-[#506169]",
					children: p.desc
				}) : null] }),
				/* @__PURE__ */ jsx("div", {
					className: "rounded-[14px] p-3",
					style: { backgroundColor: soft },
					children: /* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "truncate text-[9px] font-extrabold tracking-[0.06em] whitespace-nowrap text-[#7C7C7C] uppercase",
							children: isUmkm ? "Omset Tahunan" : "Harga Tiket"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-0.5 truncate text-[11px] leading-tight font-extrabold whitespace-nowrap",
							style: { color: accent },
							children: p.price || "Tidak ada data"
						})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "truncate text-[9px] font-extrabold tracking-[0.06em] whitespace-nowrap text-[#7C7C7C] uppercase",
							children: isUmkm ? "Kategori" : "Jam Operasional"
						}), /* @__PURE__ */ jsxs("p", {
							className: "mt-0.5 inline-flex max-w-full items-center gap-1 overflow-hidden text-[10px] leading-tight font-extrabold text-[#303030]",
							children: [isUmkm ? /* @__PURE__ */ jsx(ShoppingBagOpen, {
								className: "size-4",
								weight: "fill",
								style: { color: accent }
							}) : /* @__PURE__ */ jsx(Clock, {
								className: "size-4",
								weight: "fill",
								style: { color: accent }
							}), /* @__PURE__ */ jsx("span", {
								className: "truncate",
								children: isUmkm ? p.desc || p.badge || "Tidak ada data" : p.meta || "Tidak ada data"
							})]
						})] })]
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between gap-2 border-t border-[#EFEFEF] pt-2.5",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "inline-flex min-w-0 items-center gap-1.5 truncate text-[11px] font-extrabold text-[#506169]",
						children: [isUmkm ? /* @__PURE__ */ jsx(Storefront, {
							className: "size-3.5 shrink-0",
							weight: "fill"
						}) : /* @__PURE__ */ jsx(MapPin, {
							className: "size-3.5 shrink-0",
							weight: "fill"
						}), /* @__PURE__ */ jsx("span", {
							className: "truncate",
							children: isUmkm ? p.desc || "Tidak ada data" : p.desc || "Tidak ada data"
						})]
					}), /* @__PURE__ */ jsx("span", {
						className: "grid size-7 shrink-0 place-items-center rounded-full text-white",
						style: { backgroundColor: accent },
						children: /* @__PURE__ */ jsx(Star, {
							className: "size-3",
							weight: "fill"
						})
					})]
				})
			]
		})]
	});
}
function SidebarCard({ title, icon: Icon, children }) {
	return /* @__PURE__ */ jsxs("aside", {
		className: "rounded-[18px] border border-[#EFEFEF] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]",
		children: [/* @__PURE__ */ jsxs("h3", {
			className: "mb-4 flex items-center gap-2 text-[15px] font-extrabold text-[#303030]",
			children: [/* @__PURE__ */ jsx(Icon, {
				className: "size-5 text-[#0066AE]",
				weight: "fill"
			}), title]
		}), children]
	});
}
function WorkforceInsight({ children, tone = "blue" }) {
	return /* @__PURE__ */ jsxs("div", {
		className: cx("mt-4 flex items-start gap-2 rounded-[10px] border px-3 py-2.5 text-[9px] leading-4 font-semibold", {
			blue: "border-[#D9EAF8] bg-[#F0F8FF] text-[#426075]",
			green: "border-[#DDF2E5] bg-[#F1FBF5] text-[#3E7656]",
			yellow: "border-[#F6EAC5] bg-[#FFF9E9] text-[#7D6A35]"
		}[tone]),
		children: [/* @__PURE__ */ jsx(Info, {
			className: "mt-0.5 size-3.5 shrink-0",
			weight: "fill"
		}), /* @__PURE__ */ jsx("p", { children })]
	});
}
function WorkforceProgress({ label, value, percentage, color, icon: Icon }) {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-2 text-[10px] font-extrabold text-[#303030]",
		children: [
			/* @__PURE__ */ jsx(Icon, {
				className: "size-4 shrink-0",
				weight: "fill",
				style: { color }
			}),
			/* @__PURE__ */ jsx("span", {
				className: "min-w-0 flex-1 truncate",
				children: label
			}),
			/* @__PURE__ */ jsxs("span", {
				className: "shrink-0 text-[9px] font-black tabular-nums",
				children: [
					value,
					" (",
					percentage,
					"%)"
				]
			})
		]
	}), /* @__PURE__ */ jsx("div", {
		className: "mt-2 h-1.5 overflow-hidden rounded-full bg-[#E8EDF2]",
		children: /* @__PURE__ */ jsx("div", {
			className: "h-full rounded-full",
			style: {
				width: `${percentage}%`,
				backgroundColor: color
			}
		})
	})] });
}
function WorkforceSidebarSummary({ workers, administrators, administratorLanguages }) {
	const totalWorkers = workers.reduce((total, item) => total + item.amount, 0);
	const percentageOf = (value, total) => total > 0 ? Math.round(value / total * 100) : 0;
	const genderRows = [
		{
			value: "male",
			label: "Laki-laki",
			color: "#1688CC"
		},
		{
			value: "female",
			label: "Perempuan",
			color: "#E95B85"
		},
		{
			value: "unspecified",
			label: "Tidak Diketahui",
			color: "#94A3B8"
		}
	].map((gender) => ({
		...gender,
		amount: workers.filter((item) => item.gender === gender.value).reduce((total, item) => total + item.amount, 0)
	}));
	const malePercent = percentageOf(genderRows[0].amount, totalWorkers);
	const femalePercent = percentageOf(genderRows[1].amount, totalWorkers);
	const genderGradient = `conic-gradient(#1688CC 0 ${malePercent}%, #E95B85 ${malePercent}% ${malePercent + femalePercent}%, #94A3B8 ${malePercent + femalePercent}% 100%)`;
	const dominantGender = [...genderRows].sort((a, b) => b.amount - a.amount)[0];
	const ageRows = Array.from(workers.reduce((groups, worker) => {
		const hasCompleteRange = worker.age_min !== null && worker.age_max !== null;
		const key = hasCompleteRange ? `${worker.age_min}-${worker.age_max}` : "unknown";
		const current = groups.get(key) ?? {
			key,
			ageMin: hasCompleteRange ? worker.age_min : null,
			ageMax: hasCompleteRange ? worker.age_max : null,
			amount: 0,
			notes: []
		};
		current.amount += worker.amount;
		if (worker.notes && !current.notes.includes(worker.notes)) current.notes.push(worker.notes);
		groups.set(key, current);
		return groups;
	}, /* @__PURE__ */ new Map()).values()).sort((a, b) => {
		if (a.ageMin === null) return 1;
		if (b.ageMin === null) return -1;
		return a.ageMin - b.ageMin || (a.ageMax ?? 0) - (b.ageMax ?? 0);
	});
	const totalAdministrators = administrators.reduce((total, item) => total + item.amount, 0);
	const totalAdministratorLanguages = administratorLanguages.reduce((total, item) => total + item.amount, 0);
	const educationColors = [
		"#1688CC",
		"#16A765",
		"#F2A900",
		"#6D4AFF"
	];
	const proficiencyLabels = {
		basic: "Dasar",
		intermediate: "Menengah",
		advanced: "Mahir",
		fluent: "Fasih"
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ jsx(SidebarCard, {
				title: "Komposisi Tenaga Kerja (Gender)",
				icon: UsersThree,
				children: totalWorkers > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-[112px_1fr] items-center gap-4",
					children: [/* @__PURE__ */ jsx("div", {
						className: "relative mx-auto grid size-24 place-items-center rounded-full",
						style: { background: genderGradient },
						children: /* @__PURE__ */ jsx("div", {
							className: "grid size-[62px] place-items-center rounded-full bg-white text-center shadow-[inset_0_0_0_1px_#EEF1F4]",
							children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-[17px] leading-none font-black text-[#303030]",
								children: totalWorkers
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-[9px] font-extrabold text-[#4B5560]",
								children: "Orang"
							})] })
						})
					}), /* @__PURE__ */ jsx("div", {
						className: "space-y-3",
						children: genderRows.map((gender) => /* @__PURE__ */ jsxs("div", {
							className: "flex items-start gap-2",
							children: [/* @__PURE__ */ jsx("span", {
								className: "mt-1 size-2.5 rounded-full",
								style: { backgroundColor: gender.color }
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-[10px] font-black text-[#303030]",
								children: gender.label
							}), /* @__PURE__ */ jsxs("p", {
								className: "mt-0.5 text-[9px] font-semibold text-[#596773]",
								children: [
									gender.amount,
									" Orang (",
									percentageOf(gender.amount, totalWorkers),
									"%)"
								]
							})] })]
						}, gender.value))
					})]
				}), /* @__PURE__ */ jsxs(WorkforceInsight, { children: [
					"Komposisi terbesar: ",
					dominantGender.label,
					" (",
					percentageOf(dominantGender.amount, totalWorkers),
					"%)."
				] })] }) : /* @__PURE__ */ jsx(EmptyState, { title: "Tidak ada data tenaga kerja" })
			}),
			/* @__PURE__ */ jsx(SidebarCard, {
				title: "Rentang Umur Tenaga Kerja",
				icon: Clock,
				children: ageRows.length ? /* @__PURE__ */ jsx("div", {
					className: "space-y-4",
					children: ageRows.map((row, index) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(WorkforceProgress, {
						label: row.ageMin === null ? "Umur Tidak Diketahui" : `${row.ageMin}–${row.ageMax} Tahun`,
						value: `${row.amount} Orang`,
						percentage: percentageOf(row.amount, totalWorkers),
						color: educationColors[index % educationColors.length],
						icon: Clock
					}), row.notes.length > 0 && /* @__PURE__ */ jsxs("p", {
						className: "mt-1 text-[9px] leading-4 font-semibold text-[#596773]",
						children: ["Catatan: ", row.notes.join("; ")]
					})] }, row.key))
				}) : /* @__PURE__ */ jsx(EmptyState, { title: "Tidak ada data rentang umur tenaga kerja" })
			}),
			/* @__PURE__ */ jsx(SidebarCard, {
				title: "Status Pengurus menurut Pendidikan",
				icon: Trophy,
				children: administrators.length ? /* @__PURE__ */ jsx("div", {
					className: "grid gap-4",
					children: /* @__PURE__ */ jsx("div", {
						className: "space-y-4",
						children: administrators.map((administrator, index) => /* @__PURE__ */ jsx(WorkforceProgress, {
							label: administrator.education.toUpperCase(),
							value: `${administrator.amount} Orang`,
							percentage: percentageOf(administrator.amount, totalAdministrators),
							color: educationColors[index % educationColors.length],
							icon: Trophy
						}, administrator.id))
					})
				}) : /* @__PURE__ */ jsx(EmptyState, { title: "Tidak ada data pendidikan pengurus" })
			}),
			/* @__PURE__ */ jsx(SidebarCard, {
				title: "Bahasa Asing Pengurus",
				icon: ChatsCircle,
				children: administratorLanguages.length ? /* @__PURE__ */ jsx("div", {
					className: "space-y-4",
					children: administratorLanguages.map((language, index) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(WorkforceProgress, {
						label: `${language.language_name} (${proficiencyLabels[language.proficiency_level]})`,
						value: `${language.amount} Orang`,
						percentage: percentageOf(language.amount, totalAdministratorLanguages),
						color: educationColors[index % educationColors.length],
						icon: ChatsCircle
					}), language.notes && /* @__PURE__ */ jsxs("p", {
						className: "mt-1 text-[9px] leading-4 font-semibold text-[#596773]",
						children: ["Catatan: ", language.notes]
					})] }, language.id))
				}) : /* @__PURE__ */ jsx(EmptyState, { title: "Tidak ada data bahasa asing pengurus" })
			})
		]
	});
}
var clampPercent = (value) => Math.min(Math.max(value, 0), 100);
function AspectScoreIcon({ className }) {
	return /* @__PURE__ */ jsx("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		className,
		children: /* @__PURE__ */ jsx("path", {
			d: "M4 19V5M4 19H20M8 16V11M12 16V8M16 16V6",
			stroke: "currentColor",
			strokeWidth: "2.4",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function AspectScoreCard({ title, emptyLabel, aspects = [], detailHref }) {
	return /* @__PURE__ */ jsxs(SidebarCard, {
		title,
		icon: AspectScoreIcon,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-4 flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ jsx("p", {
				className: "text-[12px] leading-5 font-semibold text-[#7C7C7C]",
				children: "Total skor aktual / skor maksimal per aspek."
			}), detailHref ? /* @__PURE__ */ jsx(Link, {
				href: detailHref,
				className: "shrink-0 text-[11px] font-extrabold text-[#0066AE] hover:text-[#093967]",
				children: "Lihat Detail"
			}) : null]
		}), aspects.length === 0 ? /* @__PURE__ */ jsx("div", {
			className: "flex h-40 items-center justify-center rounded-[14px] bg-[#F8FBFE] text-center text-[12px] font-bold text-[#7C7C7C]",
			children: emptyLabel
		}) : /* @__PURE__ */ jsx("div", {
			className: "space-y-2.5",
			children: aspects.map((aspect) => /* @__PURE__ */ jsxs("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ jsx("p", {
						className: "truncate text-[12px] font-extrabold text-[#303030]",
						children: aspect.name
					}), /* @__PURE__ */ jsxs("p", {
						className: "shrink-0 text-[11px] font-black text-[#303030] tabular-nums",
						children: [
							aspect.score,
							"/",
							aspect.max_score
						]
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "h-1.5 overflow-hidden rounded-full bg-[#EAF3FF]",
					children: /* @__PURE__ */ jsx("div", {
						className: "h-full rounded-full bg-[#0066AE]",
						style: { width: `${clampPercent(aspect.score_percent)}%` }
					})
				})]
			}, aspect.name))
		})]
	});
}
function GoogleMapPreview({ villageName, location, latitude, longitude }) {
	const query = (latitude && longitude ? `${latitude},${longitude}` : null) || [villageName, location].filter(Boolean).join(", ");
	const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
	return /* @__PURE__ */ jsx("div", {
		className: "mt-4 overflow-hidden rounded-[12px] border border-[#E5EAF1] bg-[#F8FBFE]",
		children: /* @__PURE__ */ jsx("iframe", {
			title: `Google Maps ${villageName}`,
			src: mapSrc,
			loading: "lazy",
			referrerPolicy: "no-referrer-when-downgrade",
			className: "h-56 w-full border-0",
			allowFullScreen: true
		})
	});
}
function Social({ children, label, className }) {
	return /* @__PURE__ */ jsx("a", {
		href: "#",
		"aria-label": label,
		className: cx("grid size-10 place-items-center rounded-full bg-white shadow-[0_8px_18px_rgba(15,23,42,0.08)] ring-1 ring-[#E5EAF1] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:scale-[0.98]", className),
		children
	});
}
function Footer() {
	return /* @__PURE__ */ jsxs("footer", {
		className: "mx-auto mt-8 max-w-[1360px] overflow-hidden rounded-t-[24px] bg-[#F1F5F8]",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "grid gap-9 px-10 py-10 lg:grid-cols-[1.35fr_repeat(5,1fr)]",
			children: [
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx(Logo, {}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-4 max-w-[260px] text-[12px] leading-6 font-semibold text-[#303030]",
						children: "Explore authentic villages, empower local communities, and preserve Indonesia's cultural heritage."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-6 flex gap-3",
						children: [
							/* @__PURE__ */ jsx(Social, {
								label: "Facebook",
								className: "text-[#1877F2]",
								children: /* @__PURE__ */ jsx(FacebookLogo, {
									className: "size-5",
									weight: "fill"
								})
							}),
							/* @__PURE__ */ jsx(Social, {
								label: "Instagram",
								className: "text-[#E4405F]",
								children: /* @__PURE__ */ jsx(InstagramLogo, {
									className: "size-5",
									weight: "fill"
								})
							}),
							/* @__PURE__ */ jsx(Social, {
								label: "YouTube",
								className: "text-[#FF0000]",
								children: /* @__PURE__ */ jsx(YoutubeLogo, {
									className: "size-5",
									weight: "fill"
								})
							}),
							/* @__PURE__ */ jsx(Social, {
								label: "TikTok",
								className: "text-[#111827]",
								children: /* @__PURE__ */ jsx(TiktokLogo, {
									className: "size-5",
									weight: "fill"
								})
							})
						]
					})
				] }),
				footerCols.map(([title, links]) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
					className: "text-[13px] font-extrabold text-[#093967]",
					children: title
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-4 space-y-2.5",
					children: links.split(", ").map((link) => /* @__PURE__ */ jsx("a", {
						href: "#",
						className: "block text-[11px] font-semibold text-[#303030] hover:text-[#0066AE]",
						children: link
					}, link))
				})] }, title)),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
					className: "text-[13px] font-extrabold text-[#093967]",
					children: "Contact Us"
				}), /* @__PURE__ */ jsxs("div", {
					className: "mt-4 space-y-4 text-[12px] leading-5 font-semibold text-[#303030]",
					children: [
						/* @__PURE__ */ jsxs("p", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ jsx(MapPin, {
								className: "mt-0.5 size-4 shrink-0 text-[#0066AE]",
								weight: "fill"
							}), "Jl. Nusantara No. 66 Jakarta, Indonesia"]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ jsx(Phone, {
								className: "mt-0.5 size-4 shrink-0 text-[#0066AE]",
								weight: "fill"
							}), "+62 21 1234 5678"]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ jsx(EnvelopeSimple, {
								className: "mt-0.5 size-4 shrink-0 text-[#0066AE]",
								weight: "fill"
							}), "info@villagetourism.id"]
						})
					]
				})] })
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid gap-3 bg-[#093967] px-10 py-4 text-[11px] font-bold text-white md:grid-cols-3",
			children: [
				/* @__PURE__ */ jsx("p", { children: "© 2024 Desa Bakti BCA. All rights reserved." }),
				/* @__PURE__ */ jsx("p", {
					className: "text-center",
					children: "Promoting Village Tourism, Empowering Local Communities"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-right",
					children: "Made with care in Indonesia"
				})
			]
		})]
	});
}
function VillageDetail({ village, village_options, nearby_villages }) {
	const villageName = textOrFallback(village.name, "Tidak ada data");
	const locationText = textOrFallback(village.address !== "-" ? village.address : village.location, "Tidak ada data");
	const heroImage = village.cover?.url || village.media[0]?.url || null;
	const profileImage = village.media[1]?.url || heroImage;
	const facilityProfiles = groupItems(village.profile_items, (category) => category.includes("fasilitas"));
	const attractionProfiles = groupItems(village.profile_items, (category) => category.includes("atraksi"));
	groupItems(village.profile_items, (category) => category.includes("homestay"));
	groupItems(village.profile_items, (category) => category.includes("paket"));
	const souvenirProfiles = groupItems(village.profile_items, (category) => category.includes("suvenir") || category.includes("souvenir"));
	const facilityIconPool = [
		Car,
		UsersThree,
		Toilet,
		ForkKnife,
		Camera,
		WifiHigh,
		Storefront,
		Park
	];
	const facilityColors = [
		"text-[#0066AE]",
		"text-[#f57914]",
		"text-[#0066AE]",
		"text-[#6d4aff]",
		"text-[#ff3366]",
		"text-[#007da7]",
		"text-[#B96B1C]",
		"text-[#0066AE]"
	];
	facilityProfiles.map((item, index) => [
		facilityIconPool[index % facilityIconPool.length],
		item.name,
		facilityColors[index % facilityColors.length]
	]);
	const attractionItems = village.pariwisata.length ? village.pariwisata.map((item) => ({
		title: item.name,
		image: item.image_url,
		desc: item.address || item.entrance_ticket_description || void 0,
		price: item.entrance_ticket_price || void 0,
		meta: item.operational_hours || item.operational_days || void 0,
		badge: item.categories[0]?.label || item.status_label,
		tone: "bg-[#0066AE]"
	})) : profileProducts(attractionProfiles, void 0, "bg-[#0066AE]");
	const souvenirItems = village.umkms.length ? village.umkms.map((item) => ({
		title: item.brand_name || item.name,
		image: item.product_photo_url,
		desc: item.product_category || item.business_owner_name || void 0,
		price: item.annual_revenue || void 0,
		badge: item.categories[0]?.label,
		tone: "bg-[#0066AE]"
	})) : profileProducts(souvenirProfiles, void 0, "bg-[#0066AE]");
	const nearbyItems = nearby_villages.map((item) => ({
		title: item.name,
		image: item.cover_url,
		desc: item.description || void 0,
		meta: item.location,
		href: show.url(item.id)
	}));
	village.code, village.status_label;
	`${village.media.length}`, `${village.umkms.length}`, `${village.pariwisata.length}`, village.category_label;
	const managerName = textOrFallback(village.manager_name, "Tidak ada data");
	const managerPhone = textOrFallback(village.manager_phone, "Tidak ada data");
	const managerEmail = textOrFallback(village.manager_email, "Tidak ada data");
	const villageDescription = village.description ?? "";
	const hasLongDescription = stripHtml(villageDescription).length > profileDescriptionLimit;
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: villageName }), /* @__PURE__ */ jsxs("main", {
		className: "min-h-[100dvh] bg-[#F7F7F7] font-sans text-[#303030]",
		children: [
			/* @__PURE__ */ jsx(TopNav, { villages: village_options }),
			/* @__PURE__ */ jsx("div", {
				id: "home",
				children: /* @__PURE__ */ jsx(Hero, {
					village,
					heroImage
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mx-auto grid max-w-[1360px] gap-8 px-8 py-8 lg:grid-cols-[minmax(0,8fr)_minmax(320px,4fr)]",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "space-y-8",
					children: [
						/* @__PURE__ */ jsx("section", {
							id: "profil",
							children: /* @__PURE__ */ jsxs(Panel, { children: [/* @__PURE__ */ jsx(Heading, {
								icon: User,
								children: "Profile"
							}), /* @__PURE__ */ jsxs("div", {
								className: "grid gap-6 md:grid-cols-[340px_1fr]",
								children: [profileImage ? /* @__PURE__ */ jsx("img", {
									src: profileImage,
									alt: `${villageName} profile`,
									className: "aspect-[16/9] w-full rounded-[12px] object-cover shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
								}) : /* @__PURE__ */ jsx(ImagePlaceholder, {
									label: "profil desa",
									className: "aspect-[16/9] rounded-[12px] shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
								}), /* @__PURE__ */ jsx("div", {
									className: "space-y-5 text-[14px] leading-[1.65] font-semibold text-[#303030]",
									children: villageDescription ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
										className: "line-clamp-6 rich-text-content",
										dangerouslySetInnerHTML: { __html: villageDescription }
									}), hasLongDescription ? /* @__PURE__ */ jsxs(Dialog, { children: [/* @__PURE__ */ jsx(DialogTrigger, {
										asChild: true,
										children: /* @__PURE__ */ jsx("button", {
											type: "button",
											className: "mt-3 inline-flex items-center rounded-lg text-[13px] font-extrabold text-[#0066AE] transition hover:text-[#093967] focus-visible:ring-2 focus-visible:ring-[#0066AE] focus-visible:ring-offset-2 focus-visible:outline-none",
											children: "Lihat Selengkapnya"
										})
									}), /* @__PURE__ */ jsxs(DialogContent, {
										className: "max-h-[85dvh] overflow-hidden rounded-2xl border-[#DDE7E7] bg-white p-0 sm:max-w-2xl",
										children: [/* @__PURE__ */ jsxs(DialogHeader, {
											className: "border-b border-[#E5EAF1] px-6 py-5",
											children: [/* @__PURE__ */ jsx(DialogTitle, {
												className: "text-xl font-extrabold text-[#093967]",
												children: "Deskripsi Profil Desa"
											}), /* @__PURE__ */ jsx(DialogDescription, {
												className: "text-sm font-semibold text-[#64748B]",
												children: villageName
											})]
										}), /* @__PURE__ */ jsx("div", {
											className: "max-h-[70dvh] overflow-y-auto px-6 py-5",
											children: /* @__PURE__ */ jsx("div", {
												className: "text-[14px] leading-7 font-semibold text-[#303030] rich-text-content",
												dangerouslySetInnerHTML: { __html: villageDescription }
											})
										})]
									})] }) : null] }) }) : /* @__PURE__ */ jsx(EmptyState, { title: "Tidak ada data profil" })
								})]
							})] })
						}),
						/* @__PURE__ */ jsx(VillageProfileSummary, {
							workers: village.workers,
							stakeholders: village.stakeholders,
							institutionals: village.institutionals
						}),
						/* @__PURE__ */ jsxs("section", {
							id: "pariwisata",
							children: [/* @__PURE__ */ jsx(Heading, {
								icon: Star,
								children: "Pariwisata"
							}), attractionItems.length ? /* @__PURE__ */ jsx("div", {
								className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
								children: attractionItems.map((p) => /* @__PURE__ */ jsx(ShowcaseProductCard, {
									p,
									variant: "pariwisata"
								}, p.title))
							}) : /* @__PURE__ */ jsx(EmptyState, { title: "Tidak ada data pariwisata" })]
						}),
						/* @__PURE__ */ jsxs("section", {
							id: "umkm",
							children: [/* @__PURE__ */ jsx(Heading, {
								icon: Gift,
								children: "UMKM"
							}), souvenirItems.length ? /* @__PURE__ */ jsx("div", {
								className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
								children: souvenirItems.map((p) => /* @__PURE__ */ jsx(ShowcaseProductCard, {
									p,
									variant: "umkm"
								}, p.title))
							}) : /* @__PURE__ */ jsx(EmptyState, { title: "Tidak ada data UMKM" })]
						}),
						/* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx(Heading, {
							icon: MapPin,
							children: "Desa Wisata Lainnya"
						}), nearbyItems.length ? /* @__PURE__ */ jsx("div", {
							className: "grid gap-5 sm:grid-cols-2 xl:grid-cols-3",
							children: nearbyItems.slice(0, 6).map((p) => /* @__PURE__ */ jsx(ProductCard, {
								p,
								size: "large"
							}, p.title))
						}) : /* @__PURE__ */ jsx(EmptyState, { title: "Tidak ada data desa lainnya" })] })
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "space-y-8 lg:sticky lg:top-6 lg:self-start",
					children: [
						/* @__PURE__ */ jsx(WorkforceSidebarSummary, {
							workers: village.workers,
							administrators: village.administrators,
							administratorLanguages: village.administrator_languages
						}),
						/* @__PURE__ */ jsx(AspectScoreCard, {
							title: "Skor Per Aspek (Kemenpar)",
							emptyLabel: "Belum ada data skor Kemenpar",
							aspects: village.kemenpar_aspect_scores,
							detailHref: village.survey_assignment ? show$1.url(village.survey_assignment.code) : void 0
						}),
						/* @__PURE__ */ jsx(AspectScoreCard, {
							title: "Skor Per Aspek (ISTC)",
							emptyLabel: "Belum ada data skor ISTC",
							aspects: village.istc_aspect_scores,
							detailHref: village.survey_assignment ? show$1.url(village.survey_assignment.code, { query: { tab: "pariwisata" } }) : void 0
						}),
						/* @__PURE__ */ jsxs(SidebarCard, {
							title: "Location Address",
							icon: MapPin,
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "text-[12px] leading-6 font-semibold text-[#303030]",
									children: locationText
								}),
								village.maps_url ? /* @__PURE__ */ jsx("a", {
									href: village.maps_url,
									target: "_blank",
									rel: "noreferrer",
									className: "mt-3 inline-flex text-[12px] font-extrabold text-[#0066AE]",
									children: "Buka Google Maps"
								}) : null,
								/* @__PURE__ */ jsx(GoogleMapPreview, {
									villageName,
									location: locationText,
									latitude: village.latitude,
									longitude: village.longitude
								})
							]
						}),
						/* @__PURE__ */ jsxs(SidebarCard, {
							title: "Contact Person",
							icon: User,
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-4",
								children: [/* @__PURE__ */ jsx("div", {
									className: "grid size-16 shrink-0 place-items-center rounded-full bg-[#F8FBFE] ring-1 ring-[#EFEFEF]",
									children: /* @__PURE__ */ jsx(User, { className: "size-10 text-[#7C7C7C]" })
								}), /* @__PURE__ */ jsx("p", {
									className: "text-[15px] leading-5 font-extrabold text-[#303030]",
									children: managerName
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "mt-5 space-y-3 text-[12px] font-bold text-[#303030]",
								children: [/* @__PURE__ */ jsxs("p", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ jsx(Phone, {
										className: "size-4.5 text-[#0066AE]",
										weight: "fill"
									}), managerPhone]
								}), /* @__PURE__ */ jsxs("p", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ jsx(EnvelopeSimple, {
										className: "size-4.5 text-[#0066AE]",
										weight: "fill"
									}), managerEmail]
								})]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ jsx(Footer, {})
		]
	})] });
}
VillageDetail.layout = null;
//#endregion
export { VillageDetail as default };

//# sourceMappingURL=show-CzHewrGK.js.map