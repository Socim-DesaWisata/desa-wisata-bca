import { t as Button } from "./button-DRdOZmfE.js";
import { t as Input } from "./input-BKaRA9ml.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-Bpm_lslG.js";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-CPYcJEaV.js";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, BarChart3, Bot, MoreVertical, PieChart, Send, Table, User } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart as PieChart$1, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
//#region resources/js/pages/chatbot/index.tsx
var MOCK_BAR_DATA = [
	{
		name: "Jan",
		omset: 4e7
	},
	{
		name: "Feb",
		omset: 3e7
	},
	{
		name: "Mar",
		omset: 2e7
	},
	{
		name: "Apr",
		omset: 278e5
	},
	{
		name: "Mei",
		omset: 189e5
	},
	{
		name: "Jun",
		omset: 239e5
	}
];
var MOCK_PIE_DATA = [
	{
		name: "Selesai",
		value: 45,
		color: "#00893D"
	},
	{
		name: "Proses",
		value: 25,
		color: "#0066AE"
	},
	{
		name: "Belum Dimulai",
		value: 30,
		color: "#7C7C7C"
	}
];
var MOCK_TABLE_DATA = [
	{
		id: 1,
		desa: "Desa Lontar",
		provinsi: "Jawa Timur",
		status: "Aktif",
		score: 85
	},
	{
		id: 2,
		desa: "Desa Mulyosari",
		provinsi: "Jawa Tengah",
		status: "Draft",
		score: "-"
	},
	{
		id: 3,
		desa: "Desa Sukamaju",
		provinsi: "Jawa Barat",
		status: "Aktif",
		score: 92
	},
	{
		id: 4,
		desa: "Desa Wisata Taro",
		provinsi: "Bali",
		status: "Aktif",
		score: 78
	}
];
function Chatbot() {
	const [messages, setMessages] = useState([{
		id: "1",
		role: "bot",
		type: "text",
		content: "Halo! Saya asisten virtual SocialImpact BCA. Ada yang bisa saya bantu terkait data desa wisata, UMKM, atau pariwisata hari ini?",
		timestamp: /* @__PURE__ */ new Date()
	}]);
	const [input, setInput] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const scrollAreaRef = useRef(null);
	useEffect(() => {
		if (scrollAreaRef.current) scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
	}, [messages, isTyping]);
	const handleSend = (e) => {
		e?.preventDefault();
		if (!input.trim()) return;
		const userMessage = {
			id: Date.now().toString(),
			role: "user",
			type: "text",
			content: input.trim(),
			timestamp: /* @__PURE__ */ new Date()
		};
		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		setIsTyping(true);
		setTimeout(() => {
			const userInput = userMessage.content.toLowerCase();
			let botResponse = {
				id: (Date.now() + 1).toString(),
				role: "bot",
				type: "text",
				content: "Maaf, saya tidak mengerti. Coba tanyakan tentang \"grafik omset\", \"persentase status survey\", atau \"tabel desa wisata\".",
				timestamp: /* @__PURE__ */ new Date()
			};
			if (userInput.match(/grafik|bar|chart|omset/)) botResponse = {
				...botResponse,
				type: "bar-chart",
				content: "Berikut adalah grafik tren omset UMKM dalam 6 bulan terakhir:",
				payload: MOCK_BAR_DATA
			};
			else if (userInput.match(/pie|persentase|status/)) botResponse = {
				...botResponse,
				type: "pie-chart",
				content: "Ini adalah persentase status penyelesaian survey saat ini:",
				payload: MOCK_PIE_DATA
			};
			else if (userInput.match(/tabel|data|daftar|desa/)) botResponse = {
				...botResponse,
				type: "table",
				content: "Berikut adalah daftar sebagian desa wisata beserta status dan skornya:",
				payload: MOCK_TABLE_DATA
			};
			else if (userInput.match(/halo|hai|pagi|siang|sore|malam/)) botResponse = {
				...botResponse,
				content: "Halo! Ada yang ingin Anda ketahui tentang data SocialImpact hari ini?"
			};
			setMessages((prev) => [...prev, botResponse]);
			setIsTyping(false);
		}, 1e3 + Math.random() * 1e3);
	};
	const renderChart = (message) => {
		if (message.type === "bar-chart") return /* @__PURE__ */ jsxs(Card, {
			className: "mt-3 overflow-hidden border-[#EFEFEF] shadow-sm",
			children: [/* @__PURE__ */ jsx(CardHeader, {
				className: "bg-[#F8FBFE] py-3 pb-3",
				children: /* @__PURE__ */ jsxs(CardTitle, {
					className: "flex items-center gap-2 text-sm text-[#303030]",
					children: [/* @__PURE__ */ jsx(BarChart3, { className: "size-4 text-[#0066AE]" }), "Tren Omset UMKM"]
				})
			}), /* @__PURE__ */ jsx(CardContent, {
				className: "p-4 pt-6",
				children: /* @__PURE__ */ jsx("div", {
					className: "h-[250px] w-full",
					children: /* @__PURE__ */ jsx(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ jsxs(BarChart, {
							data: message.payload,
							margin: {
								top: 0,
								right: 0,
								left: -20,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ jsx(CartesianGrid, {
									strokeDasharray: "3 3",
									vertical: false,
									stroke: "#EFEFEF"
								}),
								/* @__PURE__ */ jsx(XAxis, {
									dataKey: "name",
									axisLine: false,
									tickLine: false,
									tick: {
										fontSize: 12,
										fill: "#7C7C7C"
									}
								}),
								/* @__PURE__ */ jsx(YAxis, {
									axisLine: false,
									tickLine: false,
									tick: {
										fontSize: 12,
										fill: "#7C7C7C"
									},
									tickFormatter: (val) => `Rp${val / 1e6}M`
								}),
								/* @__PURE__ */ jsx(Tooltip, {
									cursor: { fill: "#F8FBFE" },
									formatter: (value) => [`Rp ${new Intl.NumberFormat("id-ID").format(value)}`, "Omset"],
									contentStyle: {
										borderRadius: "8px",
										border: "none",
										boxShadow: "0 4px 14px rgba(3,17,32,0.08)"
									}
								}),
								/* @__PURE__ */ jsx(Bar, {
									dataKey: "omset",
									fill: "#0066AE",
									radius: [
										4,
										4,
										0,
										0
									]
								})
							]
						})
					})
				})
			})]
		});
		if (message.type === "pie-chart") return /* @__PURE__ */ jsxs(Card, {
			className: "mt-3 overflow-hidden border-[#EFEFEF] shadow-sm",
			children: [/* @__PURE__ */ jsx(CardHeader, {
				className: "bg-[#F8FBFE] py-3 pb-3",
				children: /* @__PURE__ */ jsxs(CardTitle, {
					className: "flex items-center gap-2 text-sm text-[#303030]",
					children: [/* @__PURE__ */ jsx(PieChart, { className: "size-4 text-[#00893D]" }), "Status Penyelesaian Survey"]
				})
			}), /* @__PURE__ */ jsx(CardContent, {
				className: "p-4",
				children: /* @__PURE__ */ jsx("div", {
					className: "h-[200px] w-full",
					children: /* @__PURE__ */ jsx(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ jsxs(PieChart$1, { children: [
							/* @__PURE__ */ jsx(Pie, {
								data: message.payload,
								cx: "50%",
								cy: "50%",
								innerRadius: 60,
								outerRadius: 80,
								paddingAngle: 2,
								dataKey: "value",
								stroke: "none",
								children: message.payload.map((entry, index) => /* @__PURE__ */ jsx(Cell, { fill: entry.color }, `cell-${index}`))
							}),
							/* @__PURE__ */ jsx(Tooltip, {
								formatter: (value) => [`${value}%`, "Persentase"],
								contentStyle: {
									borderRadius: "8px",
									border: "none",
									boxShadow: "0 4px 14px rgba(3,17,32,0.08)"
								}
							}),
							/* @__PURE__ */ jsx(Legend, {
								iconType: "circle",
								wrapperStyle: { fontSize: "12px" }
							})
						] })
					})
				})
			})]
		});
		if (message.type === "table") return /* @__PURE__ */ jsxs(Card, {
			className: "mt-3 overflow-hidden border-[#EFEFEF] shadow-sm",
			children: [/* @__PURE__ */ jsx(CardHeader, {
				className: "bg-[#F8FBFE] py-3 pb-3",
				children: /* @__PURE__ */ jsxs(CardTitle, {
					className: "flex items-center gap-2 text-sm text-[#303030]",
					children: [/* @__PURE__ */ jsx(Table, { className: "size-4 text-[#FF944C]" }), "Data Desa Wisata"]
				})
			}), /* @__PURE__ */ jsx(CardContent, {
				className: "p-0",
				children: /* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full text-left text-sm",
						children: [/* @__PURE__ */ jsx("thead", {
							className: "border-b border-[#EFEFEF] bg-[#F7F7F7]",
							children: /* @__PURE__ */ jsxs("tr", { children: [
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-2 text-xs font-semibold text-[#7C7C7C]",
									children: "Nama Desa"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-2 text-xs font-semibold text-[#7C7C7C]",
									children: "Provinsi"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-2 text-xs font-semibold text-[#7C7C7C]",
									children: "Status"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-2 text-xs font-semibold text-[#7C7C7C]",
									children: "Skor"
								})
							] })
						}), /* @__PURE__ */ jsx("tbody", {
							className: "divide-y divide-[#EFEFEF]",
							children: message.payload.map((row) => /* @__PURE__ */ jsxs("tr", {
								className: "hover:bg-[#F8FBFE]",
								children: [
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-2 font-medium text-[#303030]",
										children: row.desa
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-2 text-[#7C7C7C]",
										children: row.provinsi
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-2",
										children: /* @__PURE__ */ jsx("span", {
											className: `inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${row.status === "Aktif" ? "bg-[#EAF8F0] text-[#00893D]" : "bg-[#F1F5F8] text-[#7C7C7C]"}`,
											children: row.status
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-2 font-bold text-[#0066AE]",
										children: row.score
									})
								]
							}, row.id))
						})]
					})
				})
			})]
		});
		return null;
	};
	const formatTime = (date) => {
		return new Intl.DateTimeFormat("id-ID", {
			hour: "2-digit",
			minute: "2-digit"
		}).format(date);
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Chatbot Asisten" }), /* @__PURE__ */ jsxs("div", {
		className: "flex h-screen flex-col bg-[#F7F7F7]",
		children: [
			/* @__PURE__ */ jsxs("header", {
				className: "flex h-16 shrink-0 items-center justify-between border-b border-[#EFEFEF] bg-white px-4 shadow-sm sm:px-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ jsx(Link, {
						href: "/dashboard",
						className: "flex size-8 items-center justify-center rounded-lg text-[#7C7C7C] hover:bg-[#F1F5F8]",
						children: /* @__PURE__ */ jsx(ArrowLeft, { className: "size-5" })
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "relative",
							children: [/* @__PURE__ */ jsx(Avatar, {
								className: "size-10 border-2 border-[#EFEFEF]",
								children: /* @__PURE__ */ jsx(AvatarFallback, {
									className: "bg-[#EAF3FF] text-[#0066AE]",
									children: /* @__PURE__ */ jsx(Bot, { className: "size-5" })
								})
							}), /* @__PURE__ */ jsx("span", { className: "absolute right-0 bottom-0 size-3 rounded-full border-2 border-white bg-[#00893D]" })]
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
							className: "text-sm font-bold text-[#303030]",
							children: "SocialImpact Bot"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-[#00893D]",
							children: "Online"
						})] })]
					})]
				}), /* @__PURE__ */ jsx("button", {
					className: "flex size-8 items-center justify-center rounded-lg text-[#7C7C7C] hover:bg-[#F1F5F8]",
					children: /* @__PURE__ */ jsx(MoreVertical, { className: "size-5" })
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				ref: scrollAreaRef,
				className: "flex-1 overflow-y-auto p-4 sm:p-6",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto flex max-w-4xl flex-col gap-6",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col items-center justify-center py-6 text-center",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "mb-4 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0066AE] to-[#2FA6FC] text-white shadow-lg",
									children: /* @__PURE__ */ jsx(Bot, { className: "size-8" })
								}),
								/* @__PURE__ */ jsx("h2", {
									className: "text-xl font-bold text-[#303030]",
									children: "Tanya Asisten AI"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-2 max-w-md text-sm text-[#7C7C7C]",
									children: "Dapatkan data real-time, grafik tren, dan laporan program CSR Desa Wisata BCA melalui percakapan."
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3",
									children: [
										/* @__PURE__ */ jsx("button", {
											onClick: () => {
												setInput("Tampilkan grafik omset UMKM");
												document.getElementById("chat-input")?.focus();
											},
											className: "rounded-lg border border-[#EFEFEF] bg-white p-3 text-xs font-semibold text-[#0066AE] shadow-sm transition hover:bg-[#F8FBFE]",
											children: "📊 Grafik Tren Omset"
										}),
										/* @__PURE__ */ jsx("button", {
											onClick: () => {
												setInput("Bagaimana persentase status survey?");
												document.getElementById("chat-input")?.focus();
											},
											className: "rounded-lg border border-[#EFEFEF] bg-white p-3 text-xs font-semibold text-[#0066AE] shadow-sm transition hover:bg-[#F8FBFE]",
											children: "🥧 Status Survey"
										}),
										/* @__PURE__ */ jsx("button", {
											onClick: () => {
												setInput("Tampilkan data tabel desa wisata");
												document.getElementById("chat-input")?.focus();
											},
											className: "rounded-lg border border-[#EFEFEF] bg-white p-3 text-xs font-semibold text-[#0066AE] shadow-sm transition hover:bg-[#F8FBFE]",
											children: "📋 Tabel Data Desa"
										})
									]
								})
							]
						}),
						messages.map((message) => /* @__PURE__ */ jsxs("div", {
							className: `flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`,
							children: [/* @__PURE__ */ jsx(Avatar, {
								className: "mt-1 size-8 shrink-0 border border-[#EFEFEF]",
								children: message.role === "user" ? /* @__PURE__ */ jsx(AvatarFallback, {
									className: "bg-[#F1F5F8] text-[#7C7C7C]",
									children: /* @__PURE__ */ jsx(User, { className: "size-4" })
								}) : /* @__PURE__ */ jsx(AvatarFallback, {
									className: "bg-[#0066AE] text-white",
									children: /* @__PURE__ */ jsx(Bot, { className: "size-4" })
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: `flex max-w-[85%] flex-col gap-1 sm:max-w-[75%] ${message.role === "user" ? "items-end" : "items-start"}`,
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-xs font-semibold text-[#303030]",
											children: message.role === "user" ? "Anda" : "SocialImpact Bot"
										}), /* @__PURE__ */ jsx("span", {
											className: "text-[10px] text-[#A0A0A0]",
											children: formatTime(message.timestamp)
										})]
									}),
									/* @__PURE__ */ jsx("div", {
										className: `rounded-2xl px-4 py-2.5 text-sm ${message.role === "user" ? "rounded-tr-sm bg-[#0066AE] text-white" : "rounded-tl-sm border border-[#EFEFEF] bg-white text-[#303030] shadow-sm"}`,
										children: /* @__PURE__ */ jsx("p", {
											className: "leading-relaxed whitespace-pre-wrap",
											children: message.content
										})
									}),
									message.role === "bot" && message.type !== "text" && /* @__PURE__ */ jsx("div", {
										className: "mt-1 w-full max-w-2xl",
										children: renderChart(message)
									})
								]
							})]
						}, message.id)),
						isTyping && /* @__PURE__ */ jsxs("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ jsx(Avatar, {
								className: "mt-1 size-8 shrink-0 border border-[#EFEFEF]",
								children: /* @__PURE__ */ jsx(AvatarFallback, {
									className: "bg-[#0066AE] text-white",
									children: /* @__PURE__ */ jsx(Bot, { className: "size-4" })
								})
							}), /* @__PURE__ */ jsx("div", {
								className: "flex items-end gap-1",
								children: /* @__PURE__ */ jsx("div", {
									className: "flex items-center rounded-2xl rounded-tl-sm border border-[#EFEFEF] bg-white px-4 py-3 shadow-sm",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex gap-1",
										children: [
											/* @__PURE__ */ jsx("span", {
												className: "size-1.5 animate-bounce rounded-full bg-[#A0A0A0]",
												style: { animationDelay: "0ms" }
											}),
											/* @__PURE__ */ jsx("span", {
												className: "size-1.5 animate-bounce rounded-full bg-[#A0A0A0]",
												style: { animationDelay: "150ms" }
											}),
											/* @__PURE__ */ jsx("span", {
												className: "size-1.5 animate-bounce rounded-full bg-[#A0A0A0]",
												style: { animationDelay: "300ms" }
											})
										]
									})
								})
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "shrink-0 bg-white p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] sm:px-6",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-4xl",
					children: [/* @__PURE__ */ jsxs("form", {
						onSubmit: handleSend,
						className: "relative flex items-end gap-2 rounded-2xl border border-[#DCE7F1] bg-[#F8FBFE] p-1.5 transition-colors focus-within:border-[#0066AE] focus-within:bg-white",
						children: [/* @__PURE__ */ jsx(Input, {
							id: "chat-input",
							value: input,
							onChange: (e) => setInput(e.target.value),
							placeholder: "Tanyakan seputar data, statistik, atau informasi desa wisata...",
							className: "min-h-12 border-0 bg-transparent px-4 py-3 text-sm focus-visible:ring-0 focus-visible:ring-offset-0",
							disabled: isTyping,
							autoComplete: "off"
						}), /* @__PURE__ */ jsx(Button, {
							type: "submit",
							disabled: !input.trim() || isTyping,
							className: "mr-0.5 mb-0.5 size-10 shrink-0 rounded-xl bg-[#0066AE] p-0 text-white hover:bg-[#093967] disabled:bg-[#DDE4EC] disabled:text-[#A0A0A0]",
							children: /* @__PURE__ */ jsx(Send, { className: "size-4" })
						})]
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-2 text-center text-[10px] text-[#A0A0A0]",
						children: "Chatbot ini adalah simulasi. Data yang ditampilkan hanyalah mock data."
					})]
				})
			})
		]
	})] });
}
//#endregion
export { Chatbot as default };

//# sourceMappingURL=chatbot-CssvPmVl.js.map