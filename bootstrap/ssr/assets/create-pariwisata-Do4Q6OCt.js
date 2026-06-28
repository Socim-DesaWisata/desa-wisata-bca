import { c as surveyAssignments, t as dashboard } from "./routes-MVysbYPj.js";
import { i as show, w as store } from "./survey-assignments-CULhP1Eb.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, Banknote, BarChart3, GraduationCap, ImagePlus, MapPin, Package, Plus, Save, Ticket, Trash2, UserRound, Users } from "lucide-react";
//#region resources/js/pages/survey-assignment/create-pariwisata.tsx
var defaultForm = {
	name: "",
	image: null,
	categories: [],
	operational_days: "",
	operational_hours: "",
	operational_schedule_notes: "",
	entrance_ticket_price: "",
	entrance_ticket_description: "",
	address: "",
	person_in_charge_name: "",
	person_in_charge_phone: "",
	person_in_charge_address: "",
	is_active: true,
	annual_turnovers: [],
	annual_visitors: [],
	visitor_type_annuals: [],
	packages: [],
	annual_worker_stats: [],
	annual_worker_training_stats: []
};
var operationalDayOptions = [
	"Senin",
	"Selasa",
	"Rabu",
	"Kamis",
	"Jumat",
	"Sabtu",
	"Minggu"
];
var visitorTypeOptions = [
	{
		value: "domestik",
		label: "Domestik"
	},
	{
		value: "mancanegara",
		label: "Mancanegara"
	},
	{
		value: "pelajar",
		label: "Pelajar"
	},
	{
		value: "rombongan",
		label: "Rombongan"
	}
];
var workerDimensionOptions = [
	{
		value: "age",
		label: "Usia"
	},
	{
		value: "gender",
		label: "Gender"
	},
	{
		value: "education",
		label: "Pendidikan"
	}
];
function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
function digitsOnly(value) {
	return value.replace(/\D/g, "");
}
function formatThousands(value) {
	const digits = digitsOnly(value);
	return digits ? new Intl.NumberFormat("id-ID").format(Number(digits)) : "";
}
function fieldError(errors, name) {
	return errors[name];
}
function FieldError({ message }) {
	if (!message) return null;
	return /* @__PURE__ */ jsx("p", {
		className: "mt-1 text-xs font-semibold text-[#D81313]",
		children: message
	});
}
function TextInput({ label, value, onChange, error, type = "text", placeholder }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "space-y-1.5",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "text-xs font-bold text-[#303030]",
				children: label
			}),
			/* @__PURE__ */ jsx("input", {
				type,
				value,
				onChange: (event) => onChange(event.target.value),
				placeholder,
				className: "h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm text-[#303030] transition outline-none focus:border-[#0066AE]"
			}),
			/* @__PURE__ */ jsx(FieldError, { message: error })
		]
	});
}
function TextArea({ label, value, onChange, error, rows = 3, placeholder }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "space-y-1.5",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "text-xs font-bold text-[#303030]",
				children: label
			}),
			/* @__PURE__ */ jsx("textarea", {
				value,
				onChange: (event) => onChange(event.target.value),
				rows,
				placeholder,
				className: "w-full resize-none rounded-lg border border-[#DDE4EC] bg-white px-3 py-2 text-sm text-[#303030] transition outline-none focus:border-[#0066AE]"
			}),
			/* @__PURE__ */ jsx(FieldError, { message: error })
		]
	});
}
function SelectInput({ label, value, onChange, error, options, placeholder = "Pilih opsi" }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "space-y-1.5",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "text-xs font-bold text-[#303030]",
				children: label
			}),
			/* @__PURE__ */ jsxs("select", {
				value,
				onChange: (event) => onChange(event.target.value),
				className: "h-11 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm text-[#303030] transition outline-none focus:border-[#0066AE]",
				children: [/* @__PURE__ */ jsx("option", {
					value: "",
					children: placeholder
				}), options.map((option) => /* @__PURE__ */ jsx("option", {
					value: option.value,
					children: option.label
				}, option.value))]
			}),
			/* @__PURE__ */ jsx(FieldError, { message: error })
		]
	});
}
function SectionCard({ icon: Icon, title, description, children }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "overflow-hidden rounded-2xl border border-[#E4EAF0] bg-white shadow-[0_14px_34px_rgba(15,23,42,0.05)]",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-start gap-3 border-b border-[#EEF2F6] px-4 py-4 sm:px-5",
			children: [/* @__PURE__ */ jsx("div", {
				className: "flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF4FB] text-[#0066AE]",
				children: /* @__PURE__ */ jsx(Icon, { className: "size-5" })
			}), /* @__PURE__ */ jsxs("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-[15px] font-bold text-[#172033]",
					children: title
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-0.5 text-sm leading-5 text-[#64748B]",
					children: description
				})]
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "p-4 sm:p-5",
			children
		})]
	});
}
function EmptyState({ icon: Icon, title, description }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-2xl border border-dashed border-[#BFD6EA] bg-[#F8FBFE] px-4 py-6 text-center",
		children: [
			/* @__PURE__ */ jsx(Icon, { className: "mx-auto size-8 text-[#0066AE]" }),
			/* @__PURE__ */ jsx("p", {
				className: "mt-2 text-sm font-bold text-[#172033]",
				children: title
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-xs text-[#64748B]",
				children: description
			})
		]
	});
}
function InfoTile({ label, value, icon: Icon }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-3 rounded-xl border border-[#EFEFEF] bg-white px-4 py-3",
		children: [/* @__PURE__ */ jsx("span", {
			className: "flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#0066AE]",
			children: /* @__PURE__ */ jsx(Icon, { className: "size-5" })
		}), /* @__PURE__ */ jsxs("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ jsx("p", {
				className: "text-[11px] font-semibold text-[#7C7C7C]",
				children: label
			}), /* @__PURE__ */ jsx("p", {
				className: "truncate text-sm font-bold text-[#303030]",
				children: value
			})]
		})]
	});
}
function CreatePariwisata({ assignment, category_options }) {
	const { data, setData, post, processing, errors } = useForm(defaultForm);
	function setField(field, value) {
		setData((current) => ({
			...current,
			[field]: value
		}));
	}
	function toggleCategory(category) {
		setData("categories", data.categories.includes(category) ? data.categories.filter((current) => current !== category) : [...data.categories, category]);
	}
	function getSelectedOperationalDays() {
		return data.operational_days.split(",").map((day) => day.trim()).filter(Boolean);
	}
	function toggleOperationalDay(day) {
		const selectedDays = getSelectedOperationalDays();
		setField("operational_days", (selectedDays.includes(day) ? selectedDays.filter((selectedDay) => selectedDay !== day) : operationalDayOptions.filter((option) => selectedDays.includes(option) || option === day)).join(", "));
	}
	function addAnnualTurnover() {
		setData("annual_turnovers", [...data.annual_turnovers, {
			year: "",
			value: "",
			notes: ""
		}]);
	}
	function updateAnnualTurnover(index, values) {
		setData("annual_turnovers", data.annual_turnovers.map((row, rowIndex) => rowIndex === index ? {
			...row,
			...values
		} : row));
	}
	function removeAnnualTurnover(index) {
		setData("annual_turnovers", data.annual_turnovers.filter((_, rowIndex) => rowIndex !== index));
	}
	function addAnnualVisitor() {
		setData("annual_visitors", [...data.annual_visitors, {
			year: "",
			value: "",
			notes: ""
		}]);
	}
	function updateAnnualVisitor(index, values) {
		setData("annual_visitors", data.annual_visitors.map((row, rowIndex) => rowIndex === index ? {
			...row,
			...values
		} : row));
	}
	function removeAnnualVisitor(index) {
		setData("annual_visitors", data.annual_visitors.filter((_, rowIndex) => rowIndex !== index));
	}
	function addVisitorTypeAnnual() {
		setData("visitor_type_annuals", [...data.visitor_type_annuals, {
			year: "",
			visitor_type: "",
			value: "",
			notes: ""
		}]);
	}
	function updateVisitorTypeAnnual(index, values) {
		setData("visitor_type_annuals", data.visitor_type_annuals.map((row, rowIndex) => rowIndex === index ? {
			...row,
			...values
		} : row));
	}
	function removeVisitorTypeAnnual(index) {
		setData("visitor_type_annuals", data.visitor_type_annuals.filter((_, rowIndex) => rowIndex !== index));
	}
	function addPackage() {
		setData("packages", [...data.packages, {
			name: "",
			package_type: "",
			duration: "",
			facilities: "",
			description: "",
			price: "",
			is_active: true
		}]);
	}
	function updatePackage(index, values) {
		setData("packages", data.packages.map((row, rowIndex) => rowIndex === index ? {
			...row,
			...values
		} : row));
	}
	function removePackage(index) {
		setData("packages", data.packages.filter((_, rowIndex) => rowIndex !== index));
	}
	function addAnnualWorkerStat() {
		setData("annual_worker_stats", [...data.annual_worker_stats, {
			year: "",
			dimension: "",
			category_value: "",
			total_people: "",
			notes: ""
		}]);
	}
	function updateAnnualWorkerStat(index, values) {
		setData("annual_worker_stats", data.annual_worker_stats.map((row, rowIndex) => rowIndex === index ? {
			...row,
			...values
		} : row));
	}
	function removeAnnualWorkerStat(index) {
		setData("annual_worker_stats", data.annual_worker_stats.filter((_, rowIndex) => rowIndex !== index));
	}
	function addAnnualWorkerTrainingStat() {
		setData("annual_worker_training_stats", [...data.annual_worker_training_stats, {
			year: "",
			training_name: "",
			total_people: "",
			notes: ""
		}]);
	}
	function updateAnnualWorkerTrainingStat(index, values) {
		setData("annual_worker_training_stats", data.annual_worker_training_stats.map((row, rowIndex) => rowIndex === index ? {
			...row,
			...values
		} : row));
	}
	function removeAnnualWorkerTrainingStat(index) {
		setData("annual_worker_training_stats", data.annual_worker_training_stats.filter((_, rowIndex) => rowIndex !== index));
	}
	function submit(event) {
		event.preventDefault();
		post(store.url(assignment.code), {
			forceFormData: true,
			preserveScroll: true
		});
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Tambah Data Pariwisata" }), /* @__PURE__ */ jsx("main", {
		className: "min-h-[calc(100dvh-60px)] bg-[#F7F7F7] px-4 py-5 text-[#303030] sm:px-5 lg:px-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-[1500px] space-y-4",
			children: [
				/* @__PURE__ */ jsxs("header", {
					className: "flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ jsxs("nav", {
								className: "mb-2 flex flex-wrap items-center gap-2 text-xs font-bold",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "text-[#0066AE]",
										children: "Dashboard"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-[#7C7C7C]",
										children: "/"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-[#0066AE]",
										children: "Survey Assignment"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-[#7C7C7C]",
										children: "/"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-[#7C7C7C]",
										children: "Pariwisata"
									})
								]
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "text-[28px] leading-9 font-bold tracking-[-0.01em] text-[#303030] md:text-[30px]",
								children: "Tambah Data Pariwisata"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 max-w-3xl text-sm leading-6 text-[#7C7C7C]",
								children: "Input destinasi wisata untuk desa pada assignment ini. Lengkapi juga data tahunan, paket wisata, dan profil tenaga kerja."
							})
						]
					}), /* @__PURE__ */ jsxs(Link, {
						href: show.url(assignment.code),
						className: "inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-5 text-sm font-bold text-[#303030] transition hover:bg-[#F1F5F8]",
						children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "size-4" }), "Kembali"]
					})]
				}),
				/* @__PURE__ */ jsxs("section", {
					className: "grid gap-3 md:grid-cols-2 xl:grid-cols-4",
					children: [
						/* @__PURE__ */ jsx(InfoTile, {
							icon: Ticket,
							label: "Kode Assignment",
							value: assignment.code
						}),
						/* @__PURE__ */ jsx(InfoTile, {
							icon: MapPin,
							label: "Desa Wisata",
							value: `${assignment.village.name} (${assignment.village.code ?? "-"})`
						}),
						/* @__PURE__ */ jsx(InfoTile, {
							icon: MapPin,
							label: "Lokasi",
							value: assignment.village.location
						}),
						/* @__PURE__ */ jsx(InfoTile, {
							icon: UserRound,
							label: "Enumerator",
							value: assignment.assigned_by.name
						})
					]
				}),
				/* @__PURE__ */ jsxs("form", {
					onSubmit: submit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ jsxs("section", {
							className: "overflow-hidden rounded-xl border border-[#EFEFEF] bg-white shadow-[0_4px_14px_rgba(3,17,32,0.05)]",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-start gap-3 border-b border-[#EFEFEF] px-5 py-4",
								children: [/* @__PURE__ */ jsx("span", {
									className: "flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#0066AE]",
									children: /* @__PURE__ */ jsx(MapPin, { className: "size-5" })
								}), /* @__PURE__ */ jsxs("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ jsx("h2", {
										className: "text-lg font-bold text-[#303030]",
										children: "Input Pariwisata"
									}), /* @__PURE__ */ jsx("p", {
										className: "mt-0.5 text-sm leading-5 text-[#7C7C7C]",
										children: "Data disimpan ke tabel pariwisata desa dan kategori pariwisata."
									})]
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "grid gap-5 p-5 xl:grid-cols-[minmax(0,1fr)_360px]",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ jsx(TextInput, {
											label: "Nama Destinasi Wisata",
											value: data.name,
											onChange: (value) => setField("name", value),
											error: errors.name,
											placeholder: "Contoh: Air Terjun Tirta"
										}),
										/* @__PURE__ */ jsxs("label", {
											className: "block space-y-1.5",
											children: [
												/* @__PURE__ */ jsx("span", {
													className: "text-xs font-bold text-[#303030]",
													children: "Gambar Pariwisata"
												}),
												/* @__PURE__ */ jsxs("div", {
													className: "flex items-center gap-3 rounded-lg border border-dashed border-[#AAD2F8] bg-[#F8FBFE] px-3 py-3",
													children: [/* @__PURE__ */ jsx("span", {
														className: "flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#0066AE]",
														children: /* @__PURE__ */ jsx(ImagePlus, { className: "size-5" })
													}), /* @__PURE__ */ jsxs("div", {
														className: "min-w-0 flex-1",
														children: [/* @__PURE__ */ jsx("input", {
															type: "file",
															accept: "image/jpeg,image/png,image/webp",
															onChange: (event) => setField("image", event.target.files?.[0] ?? null),
															className: "w-full text-sm font-semibold text-[#303030] file:mr-3 file:rounded-lg file:border-0 file:bg-[#0066AE] file:px-3 file:py-2 file:text-xs file:font-bold file:text-white"
														}), /* @__PURE__ */ jsx("p", {
															className: "mt-1 truncate text-[11px] font-semibold text-[#7C7C7C]",
															children: data.image?.name ?? "JPG, PNG, atau WEBP maks. 50MB"
														})]
													})]
												}),
												/* @__PURE__ */ jsx(FieldError, { message: errors.image })
											]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "grid gap-4 md:grid-cols-2",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "space-y-1.5",
												children: [
													/* @__PURE__ */ jsx("span", {
														className: "text-xs font-bold text-[#303030]",
														children: "Hari Operasional"
													}),
													/* @__PURE__ */ jsx("div", {
														className: "grid gap-2 rounded-lg border border-[#DDE4EC] bg-white p-3 sm:grid-cols-2",
														children: operationalDayOptions.map((day) => {
															const isChecked = getSelectedOperationalDays().includes(day);
															return /* @__PURE__ */ jsxs("label", {
																className: classNames("flex h-9 items-center gap-2 rounded-md border px-2 text-sm font-semibold transition", isChecked ? "border-[#0066AE] bg-[#EAF3FF] text-[#0066AE]" : "border-[#DDE4EC] bg-white text-[#303030]"),
																children: [/* @__PURE__ */ jsx("input", {
																	type: "checkbox",
																	checked: isChecked,
																	onChange: () => toggleOperationalDay(day),
																	className: "size-4 accent-[#0066AE]"
																}), day]
															}, day);
														})
													}),
													/* @__PURE__ */ jsxs("p", {
														className: "text-[11px] font-semibold text-[#7C7C7C]",
														children: [
															"Tersimpan sebagai:",
															" ",
															data.operational_days || "-"
														]
													}),
													/* @__PURE__ */ jsx(FieldError, { message: errors.operational_days })
												]
											}), /* @__PURE__ */ jsx(TextInput, {
												label: "Jam Operasional",
												value: data.operational_hours,
												onChange: (value) => setField("operational_hours", value),
												error: errors.operational_hours,
												placeholder: "08.00 - 17.00"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "grid gap-4 md:grid-cols-2",
											children: [/* @__PURE__ */ jsx(TextInput, {
												label: "Harga Tiket Masuk",
												value: formatThousands(data.entrance_ticket_price),
												onChange: (value) => setField("entrance_ticket_price", digitsOnly(value)),
												error: errors.entrance_ticket_price,
												placeholder: "25.000"
											}), /* @__PURE__ */ jsx(TextInput, {
												label: "Keterangan Tiket",
												value: data.entrance_ticket_description,
												onChange: (value) => setField("entrance_ticket_description", value),
												error: errors.entrance_ticket_description,
												placeholder: "Termasuk parkir"
											})]
										}),
										/* @__PURE__ */ jsx(TextArea, {
											label: "Alamat Destinasi",
											value: data.address,
											onChange: (value) => setField("address", value),
											error: errors.address,
											rows: 3,
											placeholder: "Alamat lengkap destinasi wisata"
										}),
										/* @__PURE__ */ jsx(TextArea, {
											label: "Catatan Jadwal Operasional",
											value: data.operational_schedule_notes,
											onChange: (value) => setField("operational_schedule_notes", value),
											error: errors.operational_schedule_notes,
											rows: 3,
											placeholder: "Catatan jadwal khusus, libur, atau perubahan jam operasional."
										})
									]
								}), /* @__PURE__ */ jsxs("aside", {
									className: "space-y-4 rounded-xl border border-[#EFEFEF] bg-[#F8FAFC] p-4",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ jsx("span", {
												className: "flex size-10 items-center justify-center rounded-lg bg-white text-[#0066AE]",
												children: /* @__PURE__ */ jsx(Ticket, { className: "size-5" })
											}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
												className: "text-sm font-bold text-[#303030]",
												children: "Kategori Destinasi"
											}), /* @__PURE__ */ jsx("p", {
												className: "text-xs text-[#7C7C7C]",
												children: "Pilih satu atau lebih kategori."
											})] })]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "grid gap-2 sm:grid-cols-2 xl:grid-cols-1",
											children: category_options.map((category) => /* @__PURE__ */ jsxs("label", {
												className: classNames("flex min-h-10 items-center gap-2 rounded-lg border px-3 text-sm font-semibold transition", data.categories.includes(category.value) ? "border-[#0066AE] bg-[#EAF3FF] text-[#0066AE]" : "border-[#DDE4EC] bg-white text-[#303030]"),
												children: [/* @__PURE__ */ jsx("input", {
													type: "checkbox",
													checked: data.categories.includes(category.value),
													onChange: () => toggleCategory(category.value),
													className: "size-4 accent-[#0066AE]"
												}), category.label]
											}, category.value))
										}),
										/* @__PURE__ */ jsx(FieldError, { message: errors.categories }),
										/* @__PURE__ */ jsxs("div", {
											className: "border-t border-[#DDE4EC] pt-4",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "mb-3 flex items-center gap-3",
												children: [/* @__PURE__ */ jsx("span", {
													className: "flex size-10 items-center justify-center rounded-lg bg-white text-[#0066AE]",
													children: /* @__PURE__ */ jsx(UserRound, { className: "size-5" })
												}), /* @__PURE__ */ jsx("p", {
													className: "text-sm font-bold text-[#303030]",
													children: "Penanggung Jawab"
												})]
											}), /* @__PURE__ */ jsxs("div", {
												className: "space-y-3",
												children: [
													/* @__PURE__ */ jsx(TextInput, {
														label: "Nama PIC",
														value: data.person_in_charge_name,
														onChange: (value) => setField("person_in_charge_name", value),
														error: errors.person_in_charge_name,
														placeholder: "Nama penanggung jawab"
													}),
													/* @__PURE__ */ jsx(TextInput, {
														label: "Telepon PIC",
														value: data.person_in_charge_phone,
														onChange: (value) => setField("person_in_charge_phone", value),
														error: errors.person_in_charge_phone,
														placeholder: "08xxxxxxxxxx"
													}),
													/* @__PURE__ */ jsx(TextArea, {
														label: "Alamat PIC",
														value: data.person_in_charge_address,
														onChange: (value) => setField("person_in_charge_address", value),
														error: errors.person_in_charge_address,
														rows: 3,
														placeholder: "Alamat penanggung jawab"
													})
												]
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "border-t border-[#DDE4EC] pt-4",
											children: [/* @__PURE__ */ jsx("p", {
												className: "mb-3 text-sm font-bold text-[#303030]",
												children: "Ringkasan Data Tambahan"
											}), /* @__PURE__ */ jsxs("div", {
												className: "space-y-2 text-sm",
												children: [
													/* @__PURE__ */ jsxs("div", {
														className: "flex items-center justify-between rounded-lg bg-white px-3 py-2",
														children: [/* @__PURE__ */ jsx("span", { children: "Omset Tahunan" }), /* @__PURE__ */ jsx("span", {
															className: "font-bold",
															children: data.annual_turnovers.length
														})]
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "flex items-center justify-between rounded-lg bg-white px-3 py-2",
														children: [/* @__PURE__ */ jsx("span", { children: "Pengunjung Tahunan" }), /* @__PURE__ */ jsx("span", {
															className: "font-bold",
															children: data.annual_visitors.length
														})]
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "flex items-center justify-between rounded-lg bg-white px-3 py-2",
														children: [/* @__PURE__ */ jsx("span", { children: "Jenis Pengunjung" }), /* @__PURE__ */ jsx("span", {
															className: "font-bold",
															children: data.visitor_type_annuals.length
														})]
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "flex items-center justify-between rounded-lg bg-white px-3 py-2",
														children: [/* @__PURE__ */ jsx("span", { children: "Paket Wisata" }), /* @__PURE__ */ jsx("span", {
															className: "font-bold",
															children: data.packages.length
														})]
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "flex items-center justify-between rounded-lg bg-white px-3 py-2",
														children: [/* @__PURE__ */ jsx("span", { children: "Data Pekerja" }), /* @__PURE__ */ jsx("span", {
															className: "font-bold",
															children: data.annual_worker_stats.length
														})]
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "flex items-center justify-between rounded-lg bg-white px-3 py-2",
														children: [/* @__PURE__ */ jsx("span", { children: "Pelatihan Pekerja" }), /* @__PURE__ */ jsx("span", {
															className: "font-bold",
															children: data.annual_worker_training_stats.length
														})]
													})
												]
											})]
										}),
										/* @__PURE__ */ jsxs("label", {
											className: "flex items-center justify-between gap-3 rounded-lg border border-[#DDE4EC] bg-white px-3 py-2 text-sm font-bold text-[#303030]",
											children: ["Status Aktif", /* @__PURE__ */ jsx("input", {
												type: "checkbox",
												checked: data.is_active,
												onChange: (event) => setField("is_active", event.target.checked),
												className: "size-4 accent-[#0066AE]"
											})]
										})
									]
								})]
							})]
						}),
						/* @__PURE__ */ jsx(SectionCard, {
							icon: Banknote,
							title: "Omset Tahunan",
							description: "Tambahkan riwayat omset tahunan untuk destinasi wisata ini.",
							children: /* @__PURE__ */ jsxs("div", {
								className: "space-y-3",
								children: [
									data.annual_turnovers.length === 0 && /* @__PURE__ */ jsx(EmptyState, {
										icon: Banknote,
										title: "Belum ada omset tahunan",
										description: "Tambahkan data omset per tahun jika tersedia."
									}),
									data.annual_turnovers.map((row, index) => /* @__PURE__ */ jsxs("div", {
										className: "grid gap-3 rounded-2xl border border-[#E4EAF0] bg-[#FBFCFE] p-3 lg:grid-cols-[140px_minmax(0,1fr)_minmax(0,1fr)_44px] lg:items-start",
										children: [
											/* @__PURE__ */ jsx(TextInput, {
												label: "Tahun",
												value: row.year,
												onChange: (value) => updateAnnualTurnover(index, { year: digitsOnly(value) }),
												error: fieldError(errors, `annual_turnovers.${index}.year`),
												placeholder: "2024"
											}),
											/* @__PURE__ */ jsx(TextInput, {
												label: "Nilai Omset",
												value: formatThousands(row.value),
												onChange: (value) => updateAnnualTurnover(index, { value: digitsOnly(value) }),
												error: fieldError(errors, `annual_turnovers.${index}.value`),
												placeholder: "Nominal rupiah"
											}),
											/* @__PURE__ */ jsx(TextInput, {
												label: "Catatan",
												value: row.notes,
												onChange: (value) => updateAnnualTurnover(index, { notes: value }),
												error: fieldError(errors, `annual_turnovers.${index}.notes`),
												placeholder: "Opsional"
											}),
											/* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => removeAnnualTurnover(index),
												className: "inline-flex size-10 items-center justify-center rounded-xl border border-[#F2C7C7] bg-white text-[#D81313] transition hover:bg-[#FFF6F6] lg:mt-6",
												children: /* @__PURE__ */ jsx(Trash2, { className: "size-4" })
											})
										]
									}, index)),
									/* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: addAnnualTurnover,
										className: "inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#BFD6EA] bg-white px-4 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F8FF]",
										children: [/* @__PURE__ */ jsx(Plus, { className: "size-4" }), "Tambah Omset Tahunan"]
									}),
									/* @__PURE__ */ jsx(FieldError, { message: fieldError(errors, "annual_turnovers") })
								]
							})
						}),
						/* @__PURE__ */ jsx(SectionCard, {
							icon: BarChart3,
							title: "Pengunjung Tahunan",
							description: "Catat total jumlah pengunjung per tahun.",
							children: /* @__PURE__ */ jsxs("div", {
								className: "space-y-3",
								children: [
									data.annual_visitors.length === 0 && /* @__PURE__ */ jsx(EmptyState, {
										icon: BarChart3,
										title: "Belum ada pengunjung tahunan",
										description: "Tambahkan total pengunjung per tahun jika tersedia."
									}),
									data.annual_visitors.map((row, index) => /* @__PURE__ */ jsxs("div", {
										className: "grid gap-3 rounded-2xl border border-[#E4EAF0] bg-[#FBFCFE] p-3 lg:grid-cols-[140px_200px_minmax(0,1fr)_44px] lg:items-start",
										children: [
											/* @__PURE__ */ jsx(TextInput, {
												label: "Tahun",
												value: row.year,
												onChange: (value) => updateAnnualVisitor(index, { year: digitsOnly(value) }),
												error: fieldError(errors, `annual_visitors.${index}.year`),
												placeholder: "2024"
											}),
											/* @__PURE__ */ jsx(TextInput, {
												label: "Total Pengunjung",
												value: row.value,
												onChange: (value) => updateAnnualVisitor(index, { value: digitsOnly(value) }),
												error: fieldError(errors, `annual_visitors.${index}.value`),
												placeholder: "1250"
											}),
											/* @__PURE__ */ jsx(TextInput, {
												label: "Catatan",
												value: row.notes,
												onChange: (value) => updateAnnualVisitor(index, { notes: value }),
												error: fieldError(errors, `annual_visitors.${index}.notes`),
												placeholder: "Opsional"
											}),
											/* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => removeAnnualVisitor(index),
												className: "inline-flex size-10 items-center justify-center rounded-xl border border-[#F2C7C7] bg-white text-[#D81313] transition hover:bg-[#FFF6F6] lg:mt-6",
												children: /* @__PURE__ */ jsx(Trash2, { className: "size-4" })
											})
										]
									}, index)),
									/* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: addAnnualVisitor,
										className: "inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#BFD6EA] bg-white px-4 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F8FF]",
										children: [/* @__PURE__ */ jsx(Plus, { className: "size-4" }), "Tambah Pengunjung Tahunan"]
									}),
									/* @__PURE__ */ jsx(FieldError, { message: fieldError(errors, "annual_visitors") })
								]
							})
						}),
						/* @__PURE__ */ jsx(SectionCard, {
							icon: Users,
							title: "Jenis Pengunjung Tahunan",
							description: "Pisahkan jumlah pengunjung tahunan berdasarkan jenis pengunjung.",
							children: /* @__PURE__ */ jsxs("div", {
								className: "space-y-3",
								children: [
									data.visitor_type_annuals.length === 0 && /* @__PURE__ */ jsx(EmptyState, {
										icon: Users,
										title: "Belum ada jenis pengunjung",
										description: "Tambahkan data jenis pengunjung per tahun."
									}),
									data.visitor_type_annuals.map((row, index) => /* @__PURE__ */ jsxs("div", {
										className: "grid gap-3 rounded-2xl border border-[#E4EAF0] bg-[#FBFCFE] p-3 xl:grid-cols-[140px_220px_180px_minmax(0,1fr)_44px] xl:items-start",
										children: [
											/* @__PURE__ */ jsx(TextInput, {
												label: "Tahun",
												value: row.year,
												onChange: (value) => updateVisitorTypeAnnual(index, { year: digitsOnly(value) }),
												error: fieldError(errors, `visitor_type_annuals.${index}.year`),
												placeholder: "2024"
											}),
											/* @__PURE__ */ jsx(SelectInput, {
												label: "Jenis Pengunjung",
												value: row.visitor_type,
												onChange: (value) => updateVisitorTypeAnnual(index, { visitor_type: value }),
												error: fieldError(errors, `visitor_type_annuals.${index}.visitor_type`),
												options: visitorTypeOptions
											}),
											/* @__PURE__ */ jsx(TextInput, {
												label: "Jumlah",
												value: row.value,
												onChange: (value) => updateVisitorTypeAnnual(index, { value: digitsOnly(value) }),
												error: fieldError(errors, `visitor_type_annuals.${index}.value`),
												placeholder: "500"
											}),
											/* @__PURE__ */ jsx(TextInput, {
												label: "Catatan",
												value: row.notes,
												onChange: (value) => updateVisitorTypeAnnual(index, { notes: value }),
												error: fieldError(errors, `visitor_type_annuals.${index}.notes`),
												placeholder: "Opsional"
											}),
											/* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => removeVisitorTypeAnnual(index),
												className: "inline-flex size-10 items-center justify-center rounded-xl border border-[#F2C7C7] bg-white text-[#D81313] transition hover:bg-[#FFF6F6] xl:mt-6",
												children: /* @__PURE__ */ jsx(Trash2, { className: "size-4" })
											})
										]
									}, index)),
									/* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: addVisitorTypeAnnual,
										className: "inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#BFD6EA] bg-white px-4 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F8FF]",
										children: [/* @__PURE__ */ jsx(Plus, { className: "size-4" }), "Tambah Jenis Pengunjung"]
									}),
									/* @__PURE__ */ jsx(FieldError, { message: fieldError(errors, "visitor_type_annuals") })
								]
							})
						}),
						/* @__PURE__ */ jsx(SectionCard, {
							icon: Package,
							title: "Paket Wisata",
							description: "Kelola paket wisata yang tersedia pada destinasi ini.",
							children: /* @__PURE__ */ jsxs("div", {
								className: "space-y-3",
								children: [
									data.packages.length === 0 && /* @__PURE__ */ jsx(EmptyState, {
										icon: Package,
										title: "Belum ada paket wisata",
										description: "Tambahkan paket jika destinasi memiliki paket wisata khusus."
									}),
									data.packages.map((row, index) => /* @__PURE__ */ jsxs("div", {
										className: "space-y-3 rounded-2xl border border-[#E4EAF0] bg-[#FBFCFE] p-3",
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: "grid gap-3 xl:grid-cols-[minmax(0,1fr)_220px_180px_180px]",
												children: [
													/* @__PURE__ */ jsx(TextInput, {
														label: "Nama Paket",
														value: row.name,
														onChange: (value) => updatePackage(index, { name: value }),
														error: fieldError(errors, `packages.${index}.name`),
														placeholder: "Contoh: Paket Jelajah Desa"
													}),
													/* @__PURE__ */ jsx(TextInput, {
														label: "Tipe Paket",
														value: row.package_type,
														onChange: (value) => updatePackage(index, { package_type: value }),
														error: fieldError(errors, `packages.${index}.package_type`),
														placeholder: "Family / Adventure"
													}),
													/* @__PURE__ */ jsx(TextInput, {
														label: "Durasi",
														value: row.duration,
														onChange: (value) => updatePackage(index, { duration: value }),
														error: fieldError(errors, `packages.${index}.duration`),
														placeholder: "2 Hari 1 Malam"
													}),
													/* @__PURE__ */ jsx(TextInput, {
														label: "Harga",
														value: formatThousands(row.price),
														onChange: (value) => updatePackage(index, { price: digitsOnly(value) }),
														error: fieldError(errors, `packages.${index}.price`),
														placeholder: "250.000"
													})
												]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "grid gap-3 xl:grid-cols-2",
												children: [/* @__PURE__ */ jsx(TextArea, {
													label: "Fasilitas",
													value: row.facilities,
													onChange: (value) => updatePackage(index, { facilities: value }),
													error: fieldError(errors, `packages.${index}.facilities`),
													rows: 3,
													placeholder: "Daftar fasilitas paket"
												}), /* @__PURE__ */ jsx(TextArea, {
													label: "Deskripsi",
													value: row.description,
													onChange: (value) => updatePackage(index, { description: value }),
													error: fieldError(errors, `packages.${index}.description`),
													rows: 3,
													placeholder: "Deskripsi singkat paket wisata"
												})]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
												children: [/* @__PURE__ */ jsxs("label", {
													className: "flex items-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 py-2 text-sm font-semibold text-[#303030]",
													children: [/* @__PURE__ */ jsx("input", {
														type: "checkbox",
														checked: row.is_active,
														onChange: (event) => updatePackage(index, { is_active: event.target.checked }),
														className: "size-4 accent-[#0066AE]"
													}), "Paket aktif"]
												}), /* @__PURE__ */ jsxs("button", {
													type: "button",
													onClick: () => removePackage(index),
													className: "inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#F2C7C7] bg-white px-4 text-sm font-bold text-[#D81313] transition hover:bg-[#FFF6F6]",
													children: [/* @__PURE__ */ jsx(Trash2, { className: "size-4" }), "Hapus Paket"]
												})]
											})
										]
									}, index)),
									/* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: addPackage,
										className: "inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#BFD6EA] bg-white px-4 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F8FF]",
										children: [/* @__PURE__ */ jsx(Plus, { className: "size-4" }), "Tambah Paket Wisata"]
									})
								]
							})
						}),
						/* @__PURE__ */ jsx(SectionCard, {
							icon: Users,
							title: "Data Pekerja Tahunan",
							description: "Catat jumlah pekerja berdasarkan dimensi dan kategori pada setiap tahun.",
							children: /* @__PURE__ */ jsxs("div", {
								className: "space-y-3",
								children: [
									data.annual_worker_stats.length === 0 && /* @__PURE__ */ jsx(EmptyState, {
										icon: Users,
										title: "Belum ada data pekerja",
										description: "Tambahkan jumlah pekerja berdasarkan usia, gender, atau pendidikan."
									}),
									data.annual_worker_stats.map((row, index) => /* @__PURE__ */ jsxs("div", {
										className: "grid gap-3 rounded-2xl border border-[#E4EAF0] bg-[#FBFCFE] p-3 xl:grid-cols-[140px_180px_minmax(0,1fr)_180px_minmax(0,1fr)_44px] xl:items-start",
										children: [
											/* @__PURE__ */ jsx(TextInput, {
												label: "Tahun",
												value: row.year,
												onChange: (value) => updateAnnualWorkerStat(index, { year: digitsOnly(value) }),
												error: fieldError(errors, `annual_worker_stats.${index}.year`),
												placeholder: "2024"
											}),
											/* @__PURE__ */ jsx(SelectInput, {
												label: "Dimensi",
												value: row.dimension,
												onChange: (value) => updateAnnualWorkerStat(index, { dimension: value }),
												error: fieldError(errors, `annual_worker_stats.${index}.dimension`),
												options: workerDimensionOptions
											}),
											/* @__PURE__ */ jsx(TextInput, {
												label: "Kategori",
												value: row.category_value,
												onChange: (value) => updateAnnualWorkerStat(index, { category_value: value }),
												error: fieldError(errors, `annual_worker_stats.${index}.category_value`),
												placeholder: "Contoh: 18-25 tahun"
											}),
											/* @__PURE__ */ jsx(TextInput, {
												label: "Total Orang",
												value: row.total_people,
												onChange: (value) => updateAnnualWorkerStat(index, { total_people: digitsOnly(value) }),
												error: fieldError(errors, `annual_worker_stats.${index}.total_people`),
												placeholder: "10"
											}),
											/* @__PURE__ */ jsx(TextInput, {
												label: "Catatan",
												value: row.notes,
												onChange: (value) => updateAnnualWorkerStat(index, { notes: value }),
												error: fieldError(errors, `annual_worker_stats.${index}.notes`),
												placeholder: "Opsional"
											}),
											/* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => removeAnnualWorkerStat(index),
												className: "inline-flex size-10 items-center justify-center rounded-xl border border-[#F2C7C7] bg-white text-[#D81313] transition hover:bg-[#FFF6F6] xl:mt-6",
												children: /* @__PURE__ */ jsx(Trash2, { className: "size-4" })
											})
										]
									}, index)),
									/* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: addAnnualWorkerStat,
										className: "inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#BFD6EA] bg-white px-4 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F8FF]",
										children: [/* @__PURE__ */ jsx(Plus, { className: "size-4" }), "Tambah Data Pekerja"]
									}),
									/* @__PURE__ */ jsx(FieldError, { message: fieldError(errors, "annual_worker_stats") })
								]
							})
						}),
						/* @__PURE__ */ jsx(SectionCard, {
							icon: GraduationCap,
							title: "Pelatihan Pekerja Tahunan",
							description: "Catat program pelatihan pekerja beserta jumlah pesertanya per tahun.",
							children: /* @__PURE__ */ jsxs("div", {
								className: "space-y-3",
								children: [
									data.annual_worker_training_stats.length === 0 && /* @__PURE__ */ jsx(EmptyState, {
										icon: GraduationCap,
										title: "Belum ada data pelatihan",
										description: "Tambahkan program pelatihan pekerja jika tersedia."
									}),
									data.annual_worker_training_stats.map((row, index) => /* @__PURE__ */ jsxs("div", {
										className: "grid gap-3 rounded-2xl border border-[#E4EAF0] bg-[#FBFCFE] p-3 xl:grid-cols-[140px_minmax(0,1fr)_180px_minmax(0,1fr)_44px] xl:items-start",
										children: [
											/* @__PURE__ */ jsx(TextInput, {
												label: "Tahun",
												value: row.year,
												onChange: (value) => updateAnnualWorkerTrainingStat(index, { year: digitsOnly(value) }),
												error: fieldError(errors, `annual_worker_training_stats.${index}.year`),
												placeholder: "2024"
											}),
											/* @__PURE__ */ jsx(TextInput, {
												label: "Nama Pelatihan",
												value: row.training_name,
												onChange: (value) => updateAnnualWorkerTrainingStat(index, { training_name: value }),
												error: fieldError(errors, `annual_worker_training_stats.${index}.training_name`),
												placeholder: "Pelatihan hospitality"
											}),
											/* @__PURE__ */ jsx(TextInput, {
												label: "Total Peserta",
												value: row.total_people,
												onChange: (value) => updateAnnualWorkerTrainingStat(index, { total_people: digitsOnly(value) }),
												error: fieldError(errors, `annual_worker_training_stats.${index}.total_people`),
												placeholder: "15"
											}),
											/* @__PURE__ */ jsx(TextInput, {
												label: "Catatan",
												value: row.notes,
												onChange: (value) => updateAnnualWorkerTrainingStat(index, { notes: value }),
												error: fieldError(errors, `annual_worker_training_stats.${index}.notes`),
												placeholder: "Opsional"
											}),
											/* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => removeAnnualWorkerTrainingStat(index),
												className: "inline-flex size-10 items-center justify-center rounded-xl border border-[#F2C7C7] bg-white text-[#D81313] transition hover:bg-[#FFF6F6] xl:mt-6",
												children: /* @__PURE__ */ jsx(Trash2, { className: "size-4" })
											})
										]
									}, index)),
									/* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: addAnnualWorkerTrainingStat,
										className: "inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#BFD6EA] bg-white px-4 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F8FF]",
										children: [/* @__PURE__ */ jsx(Plus, { className: "size-4" }), "Tambah Pelatihan Pekerja"]
									})
								]
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "sticky bottom-0 z-10 -mx-4 border-t border-[#DDE4EC] bg-white/95 px-4 py-3 shadow-[0_-8px_24px_rgba(3,17,32,0.08)] backdrop-blur sm:-mx-5 sm:px-5 lg:-mx-6 lg:px-6",
							children: /* @__PURE__ */ jsxs("div", {
								className: "mx-auto flex max-w-[1500px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
								children: [/* @__PURE__ */ jsxs("p", {
									className: "text-xs font-semibold text-[#7C7C7C]",
									children: [
										"Village ID otomatis dari assignment:",
										" ",
										assignment.village.id ?? "-"
									]
								}), /* @__PURE__ */ jsxs("button", {
									type: "submit",
									disabled: processing,
									className: "inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white shadow-[0_6px_14px_rgba(0,102,174,0.18)] transition hover:bg-[#093967] disabled:cursor-not-allowed disabled:opacity-60",
									children: [/* @__PURE__ */ jsx(Save, { className: "size-4" }), processing ? "Menyimpan..." : "Simpan Pariwisata"]
								})]
							})
						})
					]
				})
			]
		})
	})] });
}
CreatePariwisata.layout = { breadcrumbs: [
	{
		title: "Dashboard",
		href: dashboard()
	},
	{
		title: "Survey Assignment",
		href: surveyAssignments()
	},
	{
		title: "Tambah Pariwisata",
		href: surveyAssignments()
	}
] };
//#endregion
export { CreatePariwisata as default };

//# sourceMappingURL=create-pariwisata-Do4Q6OCt.js.map