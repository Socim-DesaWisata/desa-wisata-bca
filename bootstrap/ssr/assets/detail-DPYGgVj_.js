import { Head } from "@inertiajs/react";
import { useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, BedDouble, ChevronDown, Facebook, Image, Instagram, Mail, MapPin, Mountain, Phone, Search, ShoppingBag, Star, Store, Users } from "lucide-react";
//#region resources/js/pages/villages/detail.tsx
var fallbackImages = {
	hero: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=80",
	gallery1: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=900&q=80",
	gallery2: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=700&q=80",
	gallery3: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=700&q=80",
	gallery4: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=700&q=80",
	gallery5: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=700&q=80",
	article1: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=700&q=80",
	article2: "https://images.unsplash.com/photo-1459666644539-a9755287d6b0?auto=format&fit=crop&w=700&q=80",
	article3: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=700&q=80",
	avatar1: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=180&q=80",
	avatar2: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=180&q=80"
};
var galleryFallbacks = [
	fallbackImages.gallery1,
	fallbackImages.gallery2,
	fallbackImages.gallery3,
	fallbackImages.gallery4,
	fallbackImages.gallery5
];
var whyChooseUs = [
	{
		icon: Users,
		title: "Berbasis Komunitas",
		description: "Program desa, UMKM, dan layanan wisata terhubung dalam satu halaman."
	},
	{
		icon: Store,
		title: "UMKM Lokal",
		description: "Produk warga dan kategori usaha tampil dari data UMKM aktual."
	},
	{
		icon: Mountain,
		title: "Destinasi Nyata",
		description: "ISTC/pariwisata aktif ditampilkan langsung dari backend."
	},
	{
		icon: BedDouble,
		title: "Akomodasi Desa",
		description: "Homestay dan fasilitas inap mengikuti data profil item."
	},
	{
		icon: Search,
		title: "Informasi Ringkas",
		description: "Pengunjung bisa melihat paket, atraksi, galeri, dan kontak tanpa data dummy utama."
	}
];
var testimonials = [{
	name: "Rina K.",
	role: "Pengalaman desa terasa hangat, informatif, dan mudah direncanakan sejak awal.",
	avatar: fallbackImages.avatar1
}, {
	name: "Budi S.",
	role: "Informasi paket, atraksi, dan kontak pengelola membantu saat menyusun kunjungan rombongan.",
	avatar: fallbackImages.avatar2
}];
var faqs = [
	"Bagaimana cara menuju lokasi desa wisata?",
	"Apakah tersedia homestay atau akomodasi lokal?",
	"Apakah wisata cocok untuk keluarga dan rombongan?",
	"Siapa yang bisa dihubungi untuk reservasi dan informasi lanjutan?"
];
var articles = [
	{
		title: "Mengembangkan potensi desa lewat atraksi dan paket wisata",
		image: fallbackImages.article1,
		date: "10 Mei 2024"
	},
	{
		title: "Peran UMKM dalam ekosistem desa wisata yang berkelanjutan",
		image: fallbackImages.article2,
		date: "15 Mei 2024"
	},
	{
		title: "Kolaborasi pengelola, masyarakat, dan wisatawan untuk pengalaman otentik",
		image: fallbackImages.article3,
		date: "20 Mei 2024"
	}
];
function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
function normalize(value) {
	return value.toLowerCase().replace(/\s+/g, "-");
}
function textOrFallback(value, fallback = "-") {
	return value && value.trim() !== "" ? value : fallback;
}
function truncate(value, length = 140) {
	return !value ? "-" : value.length > length ? `${value.slice(0, length).trim()}...` : value;
}
function mediaUrl(item) {
	return item?.url || fallbackImages.gallery1;
}
function findGroup(groups, matcher) {
	return groups.find((group) => matcher(normalize(group.category)))?.items ?? [];
}
function SectionHeading({ title, action, href }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "mb-5 flex items-end justify-between gap-4",
		children: [/* @__PURE__ */ jsx("h2", {
			className: "text-[30px] leading-[1.12] font-bold text-[#26311f] md:text-[36px]",
			children: title
		}), action ? /* @__PURE__ */ jsxs("a", {
			href: href ?? "#",
			className: "inline-flex items-center gap-1.5 text-sm font-semibold text-[#0066AE] transition hover:text-[#093967]",
			children: [action, /* @__PURE__ */ jsx(ArrowRight, { className: "size-4" })]
		}) : null]
	});
}
function NavLink({ href, children, active }) {
	return /* @__PURE__ */ jsxs("a", {
		href,
		className: classNames("relative text-[13px] font-semibold text-[#26311f] transition hover:text-[#0066AE]", active && "text-[#0066AE]"),
		children: [children, active ? /* @__PURE__ */ jsx("span", { className: "absolute -bottom-2 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-[#0066AE]" }) : null]
	});
}
function LinkButton({ href, children, primary = true }) {
	return /* @__PURE__ */ jsx("a", {
		href,
		target: href.startsWith("http") ? "_blank" : void 0,
		rel: href.startsWith("http") ? "noreferrer" : void 0,
		className: classNames("inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-[13px] font-bold transition", primary ? "bg-[#0066AE] text-white shadow-[0_12px_24px_rgba(0,102,174,0.22)] hover:bg-[#093967]" : "border border-[#DCE3EA] bg-white text-[#26311f] hover:bg-[#F8FBFE]"),
		children
	});
}
function StatCard({ icon: Icon, value, label }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-3 rounded-[16px] border border-[#DCE3EA] bg-white px-5 py-4 shadow-[0_10px_28px_rgba(0,102,174,0.07)]",
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex size-11 items-center justify-center rounded-[12px] bg-[#F1F5F8] text-[#0066AE]",
			children: /* @__PURE__ */ jsx(Icon, { className: "size-5" })
		}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
			className: "text-[24px] leading-none font-extrabold text-[#0066AE]",
			children: value
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-1 text-[12px] font-medium text-[#8a8577]",
			children: label
		})] })]
	});
}
function WhyItem({ icon: Icon, title, description }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-start gap-3",
		children: [/* @__PURE__ */ jsx("div", {
			className: "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-[#EAF3FF] text-[#2FA6FC]",
			children: /* @__PURE__ */ jsx(Icon, { className: "size-4.5" })
		}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
			className: "text-[14px] font-bold text-[#26311f]",
			children: title
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-1 text-[12px] leading-5 text-[#59564c]",
			children: description
		})] })]
	});
}
function Badge({ label }) {
	return /* @__PURE__ */ jsx("span", {
		className: "inline-flex rounded-full bg-[#EAF3FF] px-3 py-1 text-[11px] font-semibold text-[#0066AE]",
		children: label
	});
}
function UmkmCard({ item, index }) {
	return /* @__PURE__ */ jsxs("article", {
		className: "overflow-hidden rounded-[16px] border border-[#DCE3EA] bg-white shadow-[0_12px_30px_rgba(0,102,174,0.05)]",
		children: [/* @__PURE__ */ jsx("div", {
			className: "aspect-[4/3] overflow-hidden bg-[#F1F5F8]",
			children: /* @__PURE__ */ jsx("img", {
				src: item.product_photo_url || galleryFallbacks[index % galleryFallbacks.length],
				alt: item.name,
				className: "h-full w-full object-cover"
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "space-y-3 p-4",
			children: [
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-[11px] font-semibold tracking-[0.08em] text-[#2FA6FC] uppercase",
						children: "UMKM"
					}),
					/* @__PURE__ */ jsx("h3", {
						className: "mt-1 text-[14px] font-bold text-[#26311f]",
						children: item.name
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1 text-[12px] text-[#59564c]",
						children: textOrFallback(item.brand_name)
					})
				] }),
				/* @__PURE__ */ jsx("div", {
					className: "flex flex-wrap gap-2",
					children: item.categories.length > 0 ? item.categories.map((category) => /* @__PURE__ */ jsx(Badge, { label: category.label }, category.id)) : /* @__PURE__ */ jsx(Badge, { label: textOrFallback(item.product_category, "Produk Lokal") })
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-1.5 text-[12px] leading-6 text-[#59564c]",
					children: [
						/* @__PURE__ */ jsxs("p", { children: [
							/* @__PURE__ */ jsx("span", {
								className: "font-semibold text-[#26311f]",
								children: "Pemilik:"
							}),
							" ",
							textOrFallback(item.business_owner_name)
						] }),
						/* @__PURE__ */ jsxs("p", { children: [
							/* @__PURE__ */ jsx("span", {
								className: "font-semibold text-[#26311f]",
								children: "Alamat produksi:"
							}),
							" ",
							textOrFallback(item.production_address)
						] }),
						/* @__PURE__ */ jsxs("p", { children: [
							/* @__PURE__ */ jsx("span", {
								className: "font-semibold text-[#26311f]",
								children: "Omzet/tahun:"
							}),
							" ",
							textOrFallback(item.annual_revenue)
						] }),
						/* @__PURE__ */ jsxs("p", { children: [
							/* @__PURE__ */ jsx("span", {
								className: "font-semibold text-[#26311f]",
								children: "Ekspor:"
							}),
							" ",
							item.has_exported ? `Ya${item.export_destination_countries ? ` • ${item.export_destination_countries}` : ""}` : "Belum"
						] })
					]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-[12px] leading-6 text-[#59564c]",
					children: truncate(item.current_obstacles || item.certifications || "Belum ada catatan tambahan.", 120)
				})
			]
		})]
	});
}
function PariwisataCard({ item }) {
	return /* @__PURE__ */ jsxs("article", {
		className: "rounded-[16px] border border-[#DCE3EA] bg-white p-5 shadow-[0_12px_30px_rgba(0,102,174,0.05)]",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "text-[11px] font-semibold tracking-[0.08em] text-[#2FA6FC] uppercase",
					children: "ISTC / Pariwisata"
				}), /* @__PURE__ */ jsx("h3", {
					className: "mt-1 text-[16px] font-bold text-[#26311f]",
					children: item.name
				})] }), /* @__PURE__ */ jsx(Badge, { label: item.status_label })]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: item.categories.map((category) => /* @__PURE__ */ jsx(Badge, { label: category.label }, category.id))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-4 grid gap-3 text-[12px] leading-6 text-[#59564c] md:grid-cols-2",
				children: [
					/* @__PURE__ */ jsxs("p", { children: [
						/* @__PURE__ */ jsx("span", {
							className: "font-semibold text-[#26311f]",
							children: "Hari operasional:"
						}),
						" ",
						textOrFallback(item.operational_days)
					] }),
					/* @__PURE__ */ jsxs("p", { children: [
						/* @__PURE__ */ jsx("span", {
							className: "font-semibold text-[#26311f]",
							children: "Jam operasional:"
						}),
						" ",
						textOrFallback(item.operational_hours)
					] }),
					/* @__PURE__ */ jsxs("p", { children: [
						/* @__PURE__ */ jsx("span", {
							className: "font-semibold text-[#26311f]",
							children: "Tiket masuk:"
						}),
						" ",
						textOrFallback(item.entrance_ticket_price)
					] }),
					/* @__PURE__ */ jsxs("p", { children: [
						/* @__PURE__ */ jsx("span", {
							className: "font-semibold text-[#26311f]",
							children: "PIC:"
						}),
						" ",
						textOrFallback(item.person_in_charge_name)
					] }),
					/* @__PURE__ */ jsxs("p", { children: [
						/* @__PURE__ */ jsx("span", {
							className: "font-semibold text-[#26311f]",
							children: "Telepon PIC:"
						}),
						" ",
						textOrFallback(item.person_in_charge_phone)
					] }),
					/* @__PURE__ */ jsxs("p", { children: [
						/* @__PURE__ */ jsx("span", {
							className: "font-semibold text-[#26311f]",
							children: "Alamat:"
						}),
						" ",
						textOrFallback(item.address)
					] })
				]
			}),
			item.entrance_ticket_description ? /* @__PURE__ */ jsx("p", {
				className: "mt-3 text-[12px] leading-6 text-[#59564c]",
				children: item.entrance_ticket_description
			}) : null
		]
	});
}
function TestimonialCard({ item }) {
	return /* @__PURE__ */ jsx("article", {
		className: "rounded-[16px] border border-[#DCE3EA] bg-white p-4 shadow-[0_10px_24px_rgba(0,102,174,0.04)]",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ jsx("img", {
				src: item.avatar,
				alt: item.name,
				className: "size-11 rounded-full object-cover"
			}), /* @__PURE__ */ jsxs("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-[14px] font-bold text-[#26311f]",
						children: item.name
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1 text-[12px] leading-5 text-[#59564c]",
						children: item.role
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-2 flex items-center gap-0.5 text-[#f4b44f]",
						children: Array.from({ length: 5 }).map((_, idx) => /* @__PURE__ */ jsx(Star, { className: "size-3.5 fill-current" }, idx))
					})
				]
			})]
		})
	});
}
function FaqItem({ question, open, onClick }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "overflow-hidden rounded-[12px] border border-[#DCE3EA] bg-white",
		children: [/* @__PURE__ */ jsxs("button", {
			type: "button",
			onClick,
			className: "flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left",
			children: [/* @__PURE__ */ jsx("span", {
				className: "text-[13px] font-semibold text-[#26311f]",
				children: question
			}), /* @__PURE__ */ jsx(ChevronDown, { className: classNames("size-4 shrink-0 text-[#8a8577] transition", open && "rotate-180") })]
		}), open ? /* @__PURE__ */ jsx("div", {
			className: "border-t border-[#DCE3EA] px-4 py-3 text-[12px] leading-6 text-[#59564c]",
			children: "Silakan hubungi pengelola desa untuk reservasi, jadwal kegiatan, detail akomodasi, dan kebutuhan kunjungan lainnya."
		}) : null]
	});
}
function ArticleCard({ item }) {
	return /* @__PURE__ */ jsxs("article", {
		className: "overflow-hidden rounded-[14px] border border-[#DCE3EA] bg-white shadow-[0_8px_22px_rgba(0,102,174,0.04)]",
		children: [/* @__PURE__ */ jsx("div", {
			className: "aspect-[4/3] overflow-hidden",
			children: /* @__PURE__ */ jsx("img", {
				src: item.image,
				alt: item.title,
				className: "h-full w-full object-cover"
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "p-3.5",
			children: [/* @__PURE__ */ jsx("p", {
				className: "text-[11px] text-[#8a8577]",
				children: item.date
			}), /* @__PURE__ */ jsx("h3", {
				className: "mt-2 text-[13px] leading-5 font-semibold text-[#26311f]",
				children: item.title
			})]
		})]
	});
}
function VillageShow({ village }) {
	const [openFaq, setOpenFaq] = useState(0);
	const packages = useMemo(() => findGroup(village.profile_items, (category) => category.includes("paket")), [village.profile_items]);
	const attractions = useMemo(() => findGroup(village.profile_items, (category) => category.includes("atraksi")), [village.profile_items]);
	useMemo(() => findGroup(village.profile_items, (category) => category.includes("homestay")), [village.profile_items]);
	const gallery = useMemo(() => {
		const profileMedia = village.profile_items.flatMap((group) => group.items.flatMap((item) => item.media));
		return [...village.media, ...profileMedia].filter((item) => item.url).filter((item, index, array) => index === array.findIndex((candidate) => candidate.url === item.url)).slice(0, 6);
	}, [village.media, village.profile_items]);
	const stats = [{
		icon: ShoppingBag,
		value: String(village.umkms.length),
		label: "UMKM Desa"
	}, {
		icon: Mountain,
		value: String(village.pariwisata.length),
		label: "ISTC / Pariwisata"
	}];
	const heroImage = village.cover?.url || gallery[0]?.url || fallbackImages.hero;
	gallery[1]?.url;
	const mapsHref = village.maps_url || "#kontak";
	const phoneHref = village.manager_phone && village.manager_phone !== "-" ? `tel:${village.manager_phone}` : "#kontak";
	const mailHref = village.manager_email && village.manager_email !== "-" ? `mailto:${village.manager_email}` : "#kontak";
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `${village.name || "Desa Wisata"} - Desa Wisata BCA` }), /* @__PURE__ */ jsxs("main", {
		className: "min-h-screen bg-[#F8FBFE] text-[#26311f]",
		children: [
			/* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsxs("div", {
				className: "w-full bg-white",
				children: [/* @__PURE__ */ jsx("header", {
					className: "border-b border-[#DCE3EA] bg-[#F8FBFE]",
					children: /* @__PURE__ */ jsxs("div", {
						className: "mx-auto flex max-w-[1180px] items-center gap-4 px-4 py-4 md:px-6 lg:px-8",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex min-w-0 items-center gap-3",
							children: [/* @__PURE__ */ jsx("div", {
								className: "flex size-11 items-center justify-center rounded-full bg-[#EAF3FF] text-[#0066AE]",
								children: /* @__PURE__ */ jsx(Mountain, { className: "size-5" })
							}), /* @__PURE__ */ jsxs("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ jsx("p", {
									className: "truncate text-[15px] font-bold text-[#0066AE]",
									children: "Desa Wisata"
								}), /* @__PURE__ */ jsx("p", {
									className: "truncate text-[11px] text-[#8a8577]",
									children: village.name
								})]
							})]
						}), /* @__PURE__ */ jsxs("nav", {
							className: "hidden flex-1 items-center justify-center gap-7 lg:flex",
							children: [
								/* @__PURE__ */ jsx(NavLink, {
									href: "#hero",
									active: true,
									children: "Beranda"
								}),
								/* @__PURE__ */ jsx(NavLink, {
									href: "#tentang",
									children: "Tentang Desa"
								}),
								/* @__PURE__ */ jsx(NavLink, {
									href: "#paket",
									children: "Paket Wisata"
								}),
								/* @__PURE__ */ jsx(NavLink, {
									href: "#atraksi",
									children: "Atraksi"
								}),
								/* @__PURE__ */ jsx(NavLink, {
									href: "#galeri",
									children: "Galeri"
								}),
								/* @__PURE__ */ jsx(NavLink, {
									href: "#umkm",
									children: "UMKM"
								}),
								/* @__PURE__ */ jsx(NavLink, {
									href: "#kontak",
									children: "Kontak"
								})
							]
						})]
					})
				}), /* @__PURE__ */ jsxs("section", {
					id: "hero",
					className: "relative isolate overflow-hidden bg-[#F8FBFE] px-4 pt-6 pb-0 md:px-6 md:pt-8 lg:px-8 lg:pt-10",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "relative z-10 max-w-[520px] pb-8 lg:pb-24",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "text-[11px] font-semibold tracking-[0.12em] text-[#2FA6FC] uppercase",
									children: textOrFallback(village.location, "Desa Wisata")
								}),
								/* @__PURE__ */ jsx("h1", {
									className: "mt-4 text-[38px] leading-[1.05] font-bold text-[#26311f] sm:text-[46px] lg:text-[54px]",
									children: village.name
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-4 max-w-[460px] text-[14px] leading-7 text-[#59564c]",
									children: textOrFallback(village.description, "Profil desa belum memiliki deskripsi detail.")
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-6 flex flex-col gap-3 sm:flex-row",
									children: [/* @__PURE__ */ jsxs(LinkButton, {
										href: mapsHref,
										children: [/* @__PURE__ */ jsx(MapPin, { className: "size-4" }), "Lihat Lokasi"]
									}), /* @__PURE__ */ jsxs(LinkButton, {
										href: phoneHref,
										primary: false,
										children: [/* @__PURE__ */ jsx(Phone, { className: "size-4" }), "Hubungi Kami"]
									})]
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "relative min-h-[320px] self-stretch overflow-hidden rounded-[24px] lg:min-h-[430px]",
							children: [/* @__PURE__ */ jsx("img", {
								src: heroImage,
								alt: village.name,
								className: "h-full w-full object-cover"
							}), /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-[#0066AE]/20 via-transparent to-[#093967]/18" })]
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "relative z-20 mx-auto max-w-[1180px] translate-y-8 pb-8",
						children: /* @__PURE__ */ jsx("div", {
							className: "grid gap-3 p-3 md:grid-cols-2 lg:grid-cols-4 lg:p-4",
							children: stats.map((item) => /* @__PURE__ */ jsx(StatCard, { ...item }, item.label))
						})
					})]
				})]
			}) }),
			/* @__PURE__ */ jsx("section", {
				className: "px-4 py-6 md:px-6 lg:px-8",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-[1180px]",
					children: [/* @__PURE__ */ jsx(SectionHeading, { title: "Mengapa Memilih Desa Wisata Kami" }), /* @__PURE__ */ jsx("div", {
						className: "grid gap-5 md:grid-cols-2 xl:grid-cols-5",
						children: whyChooseUs.map((item) => /* @__PURE__ */ jsx(WhyItem, { ...item }, item.title))
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				id: "galeri",
				className: "px-4 py-6 md:px-6 lg:px-8",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-[1180px]",
					children: [
						/* @__PURE__ */ jsx(SectionHeading, {
							title: "Galeri",
							action: "Lihat Semua Galeri",
							href: "#galeri"
						}),
						/* @__PURE__ */ jsx("div", {
							className: "grid gap-4 rounded-[20px] border border-[#DCE3EA] bg-white p-4 shadow-[0_10px_24px_rgba(0,102,174,0.04)] sm:grid-cols-2 lg:grid-cols-3",
							children: (gallery.length > 0 ? gallery : galleryFallbacks.map((url, index) => ({
								id: index,
								title: null,
								caption: null,
								url,
								is_cover: index === 0
							}))).map((image, index) => /* @__PURE__ */ jsx("div", {
								className: "aspect-[16/10] overflow-hidden rounded-[16px] bg-[#F1F5F8]",
								children: /* @__PURE__ */ jsx("img", {
									src: mediaUrl(image),
									alt: image.title || `Galeri ${index + 1}`,
									className: "h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
								})
							}, `${image.id}-${index}`))
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-6",
							children: [/* @__PURE__ */ jsx(SectionHeading, { title: "Pengalaman Pengunjung" }), /* @__PURE__ */ jsx("div", {
								className: "grid gap-4 md:grid-cols-2",
								children: testimonials.map((item) => /* @__PURE__ */ jsx(TestimonialCard, { item }, item.name))
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				id: "umkm",
				className: "px-4 py-6 md:px-6 lg:px-8",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-[1180px]",
					children: [/* @__PURE__ */ jsx(SectionHeading, {
						title: "UMKM Desa",
						action: "Lihat Semua UMKM",
						href: "#umkm"
					}), /* @__PURE__ */ jsx("div", {
						className: "grid gap-5 md:grid-cols-2 xl:grid-cols-3",
						children: village.umkms.length > 0 ? village.umkms.map((item, index) => /* @__PURE__ */ jsx(UmkmCard, {
							item,
							index
						}, item.id)) : /* @__PURE__ */ jsx("div", {
							className: "rounded-[16px] border border-dashed border-[#BFD6EA] bg-[#F8FBFE] p-5 text-[13px] text-[#59564c]",
							children: "Belum ada data UMKM dari backend."
						})
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				id: "istc",
				className: "px-4 py-6 md:px-6 lg:px-8",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-[1180px]",
					children: [/* @__PURE__ */ jsx(SectionHeading, {
						title: "ISTC / Pariwisata",
						action: "Lihat Semua Destinasi",
						href: "#istc"
					}), /* @__PURE__ */ jsx("div", {
						className: "grid gap-5 lg:grid-cols-2",
						children: village.pariwisata.length > 0 ? village.pariwisata.map((item) => /* @__PURE__ */ jsx(PariwisataCard, { item }, item.id)) : /* @__PURE__ */ jsx("div", {
							className: "rounded-[16px] border border-dashed border-[#BFD6EA] bg-[#F8FBFE] p-5 text-[13px] text-[#59564c]",
							children: "Belum ada data ISTC/pariwisata aktif dari backend."
						})
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "px-4 py-6 md:px-6 lg:px-8",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto grid max-w-[1180px] gap-7 lg:grid-cols-[0.95fr_1.05fr]",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(SectionHeading, { title: "FAQ" }), /* @__PURE__ */ jsx("div", {
						className: "space-y-3",
						children: faqs.map((question, index) => /* @__PURE__ */ jsx(FaqItem, {
							question,
							open: openFaq === index,
							onClick: () => setOpenFaq(openFaq === index ? -1 : index)
						}, question))
					})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(SectionHeading, {
						title: "Artikel & Cerita Desa",
						action: "Lihat Semua Artikel",
						href: "#artikel"
					}), /* @__PURE__ */ jsx("div", {
						className: "grid gap-4 md:grid-cols-3",
						children: articles.map((item) => /* @__PURE__ */ jsx(ArticleCard, { item }, item.title))
					})] })]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				id: "kontak",
				className: "px-4 py-8 md:px-6 lg:px-8",
				children: /* @__PURE__ */ jsx("div", {
					className: "mx-auto max-w-[1180px] overflow-hidden rounded-[24px] border border-[#BFD6EA] bg-[#F8FBFE]",
					children: /* @__PURE__ */ jsxs("div", {
						className: "grid gap-6 px-6 py-8 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-10",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-[11px] font-semibold tracking-[0.12em] text-[#2FA6FC] uppercase",
								children: "Kontak & Informasi"
							}),
							/* @__PURE__ */ jsxs("h2", {
								className: "mt-3 text-[30px] leading-[1.12] font-bold text-[#26311f] md:text-[36px]",
								children: ["Rencanakan kunjungan ke ", village.name]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-3 max-w-[620px] text-[14px] leading-7 text-[#59564c]",
								children: "Hubungi pengelola desa untuk reservasi, koordinasi rombongan, dan informasi aktivitas yang tersedia."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-6 flex flex-col gap-3 sm:flex-row",
								children: [/* @__PURE__ */ jsxs(LinkButton, {
									href: phoneHref,
									children: [/* @__PURE__ */ jsx(Phone, { className: "size-4" }), "Hubungi Pengelola"]
								}), /* @__PURE__ */ jsxs(LinkButton, {
									href: mapsHref,
									primary: false,
									children: [/* @__PURE__ */ jsx(MapPin, { className: "size-4" }), "Buka Peta"]
								})]
							})
						] }), /* @__PURE__ */ jsx("div", {
							className: "rounded-[20px] border border-[#DCE3EA] bg-white p-5 shadow-[0_10px_24px_rgba(0,102,174,0.04)]",
							children: /* @__PURE__ */ jsxs("div", {
								className: "space-y-4 text-[13px] leading-6 text-[#59564c]",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex gap-3",
										children: [/* @__PURE__ */ jsx(MapPin, { className: "mt-0.5 size-4 shrink-0 text-[#0066AE]" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
											className: "font-semibold text-[#26311f]",
											children: "Alamat"
										}), /* @__PURE__ */ jsx("p", { children: textOrFallback(village.address) })] })]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex gap-3",
										children: [/* @__PURE__ */ jsx(Users, { className: "mt-0.5 size-4 shrink-0 text-[#0066AE]" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
											className: "font-semibold text-[#26311f]",
											children: "Pengelola"
										}), /* @__PURE__ */ jsx("p", { children: textOrFallback(village.manager_name) })] })]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex gap-3",
										children: [/* @__PURE__ */ jsx(Phone, { className: "mt-0.5 size-4 shrink-0 text-[#0066AE]" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
											className: "font-semibold text-[#26311f]",
											children: "Telepon"
										}), /* @__PURE__ */ jsx("a", {
											href: phoneHref,
											className: "hover:text-[#0066AE]",
											children: textOrFallback(village.manager_phone)
										})] })]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex gap-3",
										children: [/* @__PURE__ */ jsx(Mail, { className: "mt-0.5 size-4 shrink-0 text-[#0066AE]" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
											className: "font-semibold text-[#26311f]",
											children: "Email"
										}), /* @__PURE__ */ jsx("a", {
											href: mailHref,
											className: "hover:text-[#0066AE]",
											children: textOrFallback(village.manager_email)
										})] })]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex gap-3",
										children: [/* @__PURE__ */ jsx(Image, { className: "mt-0.5 size-4 shrink-0 text-[#0066AE]" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
											className: "font-semibold text-[#26311f]",
											children: "Media"
										}), /* @__PURE__ */ jsxs("p", { children: [village.media.length, " file media desa"] })] })]
									})
								]
							})
						})]
					})
				})
			}),
			/* @__PURE__ */ jsx("footer", {
				className: "mt-2 border-t border-[#DCE3EA] bg-[#F8FBFE] px-4 py-10 md:px-6 lg:px-8",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-[1180px]",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "grid gap-8 lg:grid-cols-[1.2fr_0.7fr_0.8fr_1fr]",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ jsx("div", {
										className: "flex size-11 items-center justify-center rounded-full bg-[#0066AE] text-white",
										children: /* @__PURE__ */ jsx(Mountain, { className: "size-5" })
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
										className: "text-[18px] font-bold text-[#0066AE]",
										children: "Desa Wisata"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-[12px] text-[#8a8577]",
										children: village.name
									})] })]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-4 max-w-[280px] text-[12px] leading-6 text-[#59564c]",
									children: "Halaman desa memakai data backend untuk profil, galeri, paket, atraksi, UMKM, dan ISTC/pariwisata."
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-4 flex items-center gap-2.5 text-[#0066AE]",
									children: [/* @__PURE__ */ jsx("span", {
										className: "flex size-9 items-center justify-center rounded-full border border-[#BFD6EA] bg-white",
										children: /* @__PURE__ */ jsx(Instagram, { className: "size-4" })
									}), /* @__PURE__ */ jsx("span", {
										className: "flex size-9 items-center justify-center rounded-full border border-[#BFD6EA] bg-white",
										children: /* @__PURE__ */ jsx(Facebook, { className: "size-4" })
									})]
								})
							] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
								className: "text-[13px] font-bold text-[#26311f]",
								children: "Tautan Cepat"
							}), /* @__PURE__ */ jsxs("div", {
								className: "mt-4 space-y-2.5 text-[12px] text-[#59564c]",
								children: [
									/* @__PURE__ */ jsx("p", { children: "Beranda" }),
									/* @__PURE__ */ jsx("p", { children: "Tentang Desa" }),
									/* @__PURE__ */ jsx("p", { children: "Paket Wisata" }),
									/* @__PURE__ */ jsx("p", { children: "Galeri" })
								]
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
								className: "text-[13px] font-bold text-[#26311f]",
								children: "Informasi"
							}), /* @__PURE__ */ jsxs("div", {
								className: "mt-4 space-y-3 text-[12px] text-[#59564c]",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ jsx(MapPin, { className: "mt-0.5 size-3.5 shrink-0 text-[#093967]" }), /* @__PURE__ */ jsx("span", { children: textOrFallback(village.location) })]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ jsx(Phone, { className: "mt-0.5 size-3.5 shrink-0 text-[#093967]" }), /* @__PURE__ */ jsx("span", { children: textOrFallback(village.manager_phone) })]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ jsx(Mail, { className: "mt-0.5 size-3.5 shrink-0 text-[#093967]" }), /* @__PURE__ */ jsx("span", { children: textOrFallback(village.manager_email) })]
									})
								]
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
								className: "text-[13px] font-bold text-[#26311f]",
								children: "Ringkasan"
							}), /* @__PURE__ */ jsxs("div", {
								className: "mt-4 space-y-2.5 text-[12px] text-[#59564c]",
								children: [
									/* @__PURE__ */ jsxs("p", { children: [packages.length, " paket wisata"] }),
									/* @__PURE__ */ jsxs("p", { children: [attractions.length, " atraksi"] }),
									/* @__PURE__ */ jsxs("p", { children: [village.umkms.length, " UMKM"] }),
									/* @__PURE__ */ jsxs("p", { children: [village.pariwisata.length, " data ISTC/pariwisata"] })
								]
							})] })
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "mt-8 flex flex-col gap-3 border-t border-[#DCE3EA] pt-5 text-[11px] text-[#8a8577] md:flex-row md:items-center md:justify-between",
						children: [/* @__PURE__ */ jsxs("p", { children: [
							"© 2024 ",
							village.name,
							". Semua Hak Dilindungi."
						] }), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ jsx("span", { children: "Kebijakan Privasi" }), /* @__PURE__ */ jsx("span", { children: "Syarat & Ketentuan" })]
						})]
					})]
				})
			})
		]
	})] });
}
VillageShow.layout = null;
//#endregion
export { VillageShow as default };

//# sourceMappingURL=detail-DPYGgVj_.js.map