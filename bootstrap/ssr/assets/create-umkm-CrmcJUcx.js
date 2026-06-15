import { t as Checkbox } from "./checkbox-BbMatyE1.js";
import { C as store, i as show } from "./survey-assignments-BfNUxixD.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, Banknote, Camera, CheckCircle2, ClipboardCheck, Factory, FileText, Globe2, PackageCheck, Plus, Save, Store, Trash2 } from "lucide-react";
//#region resources/js/pages/survey-assignment/create-umkm.tsx
var legalBusinessOptions = [
	{
		value: "UD",
		label: "UD"
	},
	{
		value: "CV",
		label: "CV"
	},
	{
		value: "PT",
		label: "PT"
	},
	{
		value: "Perorangan",
		label: "Perorangan"
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
function fieldError(errors, name) {
	return errors[name];
}
function digitsOnly(value) {
	return value.replace(/\D/g, "");
}
function formatThousands(value) {
	const digits = digitsOnly(value);
	return digits ? new Intl.NumberFormat("id-ID").format(Number(digits)) : "";
}
function initialForm(criteriaGroups) {
	return {
		business_owner_name: "",
		name: "",
		legal_business_name: "",
		established_year: "",
		company_website_url: "",
		production_address: "",
		categories: [],
		brand_name: "",
		annual_revenue: "",
		monthly_production_capacity: "",
		current_obstacles: "",
		certifications: "",
		has_business_legality_and_certification: "",
		is_umkm_participant: "",
		is_production_capacity_participant: "",
		annual_production_capacity: "",
		factory_location_feasibility: "",
		instagram_url: "",
		facebook_url: "",
		twitter_url: "",
		marketing_website_url: "",
		ecommerce_profile_url: "",
		marketing_notes: "",
		sustainability_notes: "",
		bank_name: "",
		bank_account_number: "",
		has_qris: "",
		qris_provider: "",
		has_edc: "",
		edc_provider: "",
		has_credit_card: "",
		banking_notes: "",
		has_exported: "",
		export_destination_countries: "",
		product_photo: null,
		documents: [],
		annual_turnovers: [],
		annual_worker_stats: [],
		annual_worker_training_stats: [],
		answers: criteriaGroups.flatMap((group) => group.questions.map((question) => ({
			question_id: question.id,
			score: ""
		})))
	};
}
function FieldError({ message }) {
	if (!message) return null;
	return /* @__PURE__ */ jsx("p", {
		className: "mt-1 text-xs font-semibold text-[#D81313]",
		children: message
	});
}
function SectionCard({ icon: Icon, title, description, children }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "rounded-2xl border border-[#E4EAF0] bg-white shadow-[0_14px_34px_rgba(15,23,42,0.05)]",
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
					className: "mt-1 text-xs leading-5 text-[#64748B]",
					children: description
				})]
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "p-4 sm:p-5",
			children
		})]
	});
}
function TextInput({ label, value, onChange, error, placeholder, type = "text", min, max, required = false }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "block min-w-0",
		children: [
			/* @__PURE__ */ jsxs("span", {
				className: "text-xs font-bold text-[#344256]",
				children: [
					label,
					" ",
					required && /* @__PURE__ */ jsx("span", {
						className: "text-[#D81313]",
						children: "*"
					})
				]
			}),
			/* @__PURE__ */ jsx("input", {
				type,
				value,
				onChange: (event) => onChange(event.target.value),
				placeholder,
				min,
				max,
				className: "mt-2 h-10 w-full rounded-xl border border-[#DCE3EA] bg-white px-3 text-sm text-[#172033] transition outline-none placeholder:text-[#9AA7B5] focus:border-[#0066AE] focus:ring-2 focus:ring-[#2FA6FC]/15"
			}),
			/* @__PURE__ */ jsx(FieldError, { message: error })
		]
	});
}
function TextArea({ label, value, onChange, error, placeholder }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "block min-w-0",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "text-xs font-bold text-[#344256]",
				children: label
			}),
			/* @__PURE__ */ jsx("textarea", {
				value,
				onChange: (event) => onChange(event.target.value),
				placeholder,
				rows: 4,
				className: "mt-2 w-full resize-y rounded-xl border border-[#DCE3EA] bg-white px-3 py-2 text-sm leading-6 text-[#172033] transition outline-none placeholder:text-[#9AA7B5] focus:border-[#0066AE] focus:ring-2 focus:ring-[#2FA6FC]/15"
			}),
			/* @__PURE__ */ jsx(FieldError, { message: error })
		]
	});
}
function SelectInput({ label, value, onChange, options, error, placeholder = "Pilih data", required = false }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "block min-w-0",
		children: [
			/* @__PURE__ */ jsxs("span", {
				className: "text-xs font-bold text-[#344256]",
				children: [
					label,
					" ",
					required && /* @__PURE__ */ jsx("span", {
						className: "text-[#D81313]",
						children: "*"
					})
				]
			}),
			/* @__PURE__ */ jsxs("select", {
				value,
				onChange: (event) => onChange(event.target.value),
				className: "mt-2 h-10 w-full rounded-xl border border-[#DCE3EA] bg-white px-3 text-sm text-[#172033] transition outline-none focus:border-[#0066AE] focus:ring-2 focus:ring-[#2FA6FC]/15",
				children: [/* @__PURE__ */ jsx("option", {
					value: "",
					children: placeholder
				}), options.map((option) => /* @__PURE__ */ jsx("option", {
					value: option.value,
					children: option.description ? `${option.label} - ${option.description}` : option.label
				}, option.value))]
			}),
			/* @__PURE__ */ jsx(FieldError, { message: error })
		]
	});
}
function CreateUmkmSurveyAssignment({ assignment, template, criteria_groups, boolean_options, category_options }) {
	const { data, setData, post, processing, errors, reset } = useForm(initialForm(criteria_groups));
	function setAnswerScore(questionId, score) {
		setData("answers", data.answers.map((answer) => answer.question_id === questionId ? {
			...answer,
			score
		} : answer));
	}
	function answerScore(questionId) {
		return data.answers.find((answer) => answer.question_id === questionId)?.score ?? "";
	}
	function toggleCategory(value) {
		setData("categories", data.categories.includes(value) ? data.categories.filter((category) => category !== value) : [...data.categories, value]);
	}
	function addDocument() {
		setData("documents", [...data.documents, {
			document_name: "",
			file: null
		}]);
	}
	function removeDocument(index) {
		setData("documents", data.documents.filter((_, documentIndex) => documentIndex !== index));
	}
	function updateDocument(index, values) {
		setData("documents", data.documents.map((document, documentIndex) => documentIndex === index ? {
			...document,
			...values
		} : document));
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
			preserveScroll: true,
			onSuccess: () => reset()
		});
	}
	const answeredCount = data.answers.filter((answer) => answer.score !== "").length;
	const totalQuestions = data.answers.length;
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Tambah UMKM dan Assessment" }), /* @__PURE__ */ jsx("div", {
		className: "min-h-screen bg-[#F7F7F7] px-4 py-5 text-[#303030] sm:px-5 lg:px-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl space-y-4",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-4 rounded-2xl border border-[#E4EAF0] bg-white px-4 py-4 shadow-[0_14px_34px_rgba(15,23,42,0.05)] sm:px-5 lg:flex-row lg:items-center lg:justify-between",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "mb-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#64748B]",
								children: [
									/* @__PURE__ */ jsxs(Link, {
										href: show.url(assignment.code),
										className: "inline-flex items-center gap-1 text-[#0066AE]",
										children: [
											/* @__PURE__ */ jsx(ArrowLeft, { className: "size-3.5" }),
											" ",
											"Assignment Survey"
										]
									}),
									/* @__PURE__ */ jsx("span", { children: "/" }),
									/* @__PURE__ */ jsx("span", { children: "Tambah UMKM" })
								]
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "text-2xl font-bold tracking-tight text-[#0F172A] sm:text-[28px]",
								children: "Tambah Data UMKM dan Assessment"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 max-w-3xl text-sm leading-6 text-[#64748B]",
								children: "Input profil UMKM berdasarkan tabel database, lalu isi nilai assessment pelaku UMKM dalam satu alur."
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-3 inline-flex max-w-full items-center rounded-full bg-[#F1F5F8] px-3 py-1.5 text-xs font-bold text-[#344256]",
								children: /* @__PURE__ */ jsx("span", {
									className: "truncate",
									children: assignment.village.name
								})
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-3 gap-2 rounded-2xl bg-[#F1F5F8] p-2 text-center sm:min-w-[360px]",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "rounded-xl bg-white px-3 py-2",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-lg font-bold text-[#0066AE]",
									children: template?.question_count ?? 0
								}), /* @__PURE__ */ jsx("p", {
									className: "text-[11px] font-semibold text-[#64748B]",
									children: "Pertanyaan"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "rounded-xl bg-white px-3 py-2",
								children: [/* @__PURE__ */ jsxs("p", {
									className: "text-lg font-bold text-[#00893D]",
									children: [
										answeredCount,
										"/",
										totalQuestions
									]
								}), /* @__PURE__ */ jsx("p", {
									className: "text-[11px] font-semibold text-[#64748B]",
									children: "Terisi"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "rounded-xl bg-white px-3 py-2",
								children: [/* @__PURE__ */ jsxs("p", {
									className: "text-lg font-bold text-[#093967]",
									children: [template?.total_weight ?? 0, "%"]
								}), /* @__PURE__ */ jsx("p", {
									className: "text-[11px] font-semibold text-[#64748B]",
									children: "Bobot"
								})]
							})
						]
					})]
				}),
				!template && /* @__PURE__ */ jsx("div", {
					className: "rounded-2xl border border-[#F2C7C7] bg-[#FFF6F6] px-4 py-3 text-sm font-semibold text-[#D81313]",
					children: "Template assessment UMKM aktif belum tersedia. Jalankan seeder UMKMSurveySeeder terlebih dahulu."
				}),
				/* @__PURE__ */ jsxs("form", {
					onSubmit: submit,
					className: "grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_320px]",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "min-w-0 space-y-4",
						children: [
							/* @__PURE__ */ jsxs(SectionCard, {
								icon: Store,
								title: "Identitas UMKM",
								description: "Data dasar pelaku dan usaha UMKM. Desa mengikuti data assignment dan pengumpul data disimpan otomatis oleh backend.",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "mb-4 rounded-xl border border-[#DDE8F2] bg-[#F8FBFE] px-3 py-3",
										children: [
											/* @__PURE__ */ jsx("p", {
												className: "text-[11px] font-black tracking-[0.08em] text-[#64748B] uppercase",
												children: "Desa Wisata"
											}),
											/* @__PURE__ */ jsx("p", {
												className: "mt-1 text-sm font-bold text-[#172033]",
												children: assignment.village.name
											}),
											/* @__PURE__ */ jsx("p", {
												className: "mt-1 text-xs text-[#64748B]",
												children: assignment.village.location
											})
										]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3",
										children: [
											/* @__PURE__ */ jsx(TextInput, {
												label: "Nama Pelaku UMKM",
												value: data.business_owner_name,
												onChange: (value) => setData("business_owner_name", value),
												error: fieldError(errors, "business_owner_name"),
												placeholder: "Nama pemilik/pelaku usaha"
											}),
											/* @__PURE__ */ jsx(TextInput, {
												label: "Nama UMKM",
												value: data.name,
												onChange: (value) => setData("name", value),
												error: fieldError(errors, "name"),
												placeholder: "Contoh: Batik Sumber Rejeki",
												required: true
											}),
											/* @__PURE__ */ jsx(SelectInput, {
												label: "Nama Lengkap Badan Usaha",
												value: data.legal_business_name,
												onChange: (value) => setData("legal_business_name", value),
												error: fieldError(errors, "legal_business_name"),
												options: legalBusinessOptions,
												placeholder: "Pilih badan usaha"
											}),
											/* @__PURE__ */ jsx(TextInput, {
												label: "Tahun Berdiri",
												value: data.established_year,
												onChange: (value) => setData("established_year", value),
												error: fieldError(errors, "established_year"),
												placeholder: "Contoh: 2018",
												type: "number"
											}),
											/* @__PURE__ */ jsx(TextInput, {
												label: "Website Perusahaan",
												value: data.company_website_url,
												onChange: (value) => setData("company_website_url", value),
												error: fieldError(errors, "company_website_url"),
												placeholder: "https://contoh.com"
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "min-w-0 lg:col-span-2",
												children: [
													/* @__PURE__ */ jsxs("div", {
														className: "flex items-center justify-between gap-3",
														children: [/* @__PURE__ */ jsxs("span", {
															className: "text-xs font-bold text-[#344256]",
															children: [
																"Kategori UMKM",
																" ",
																/* @__PURE__ */ jsx("span", {
																	className: "text-[#D81313]",
																	children: "*"
																})
															]
														}), /* @__PURE__ */ jsx("span", {
															className: "text-[11px] font-semibold text-[#7C7C7C]",
															children: "Bisa pilih lebih dari satu"
														})]
													}),
													/* @__PURE__ */ jsx("div", {
														className: "mt-2 grid grid-cols-1 gap-2 rounded-xl border border-[#DCE3EA] bg-[#F8FAFC] p-3 sm:grid-cols-2 xl:grid-cols-3",
														children: category_options.map((option) => {
															return /* @__PURE__ */ jsxs("label", {
																className: "flex min-w-0 cursor-pointer items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-[#303030] ring-1 ring-[#E6ECF2] transition hover:ring-[#AAD2F8]",
																children: [/* @__PURE__ */ jsx(Checkbox, {
																	checked: data.categories.includes(option.value),
																	onCheckedChange: () => toggleCategory(option.value),
																	className: "border-[#AAD2F8] data-[state=checked]:border-[#0066AE] data-[state=checked]:bg-[#0066AE]"
																}), /* @__PURE__ */ jsx("span", {
																	className: "truncate",
																	children: option.label
																})]
															}, option.value);
														})
													}),
													/* @__PURE__ */ jsx(FieldError, { message: fieldError(errors, "categories") })
												]
											}),
											/* @__PURE__ */ jsx(TextInput, {
												label: "Merk Dagang",
												value: data.brand_name,
												onChange: (value) => setData("brand_name", value),
												error: fieldError(errors, "brand_name"),
												placeholder: "Nama brand"
											}),
											/* @__PURE__ */ jsx(TextInput, {
												label: "Omset per Tahun",
												value: formatThousands(data.annual_revenue),
												onChange: (value) => setData("annual_revenue", digitsOnly(value)),
												error: fieldError(errors, "annual_revenue"),
												placeholder: "Nominal rupiah"
											})
										]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2",
										children: [/* @__PURE__ */ jsx(TextArea, {
											label: "Alamat Tempat Produksi",
											value: data.production_address,
											onChange: (value) => setData("production_address", value),
											error: fieldError(errors, "production_address"),
											placeholder: "Alamat lengkap tempat produksi"
										}), /* @__PURE__ */ jsx(TextArea, {
											label: "Kendala yang Sedang Dihadapi",
											value: data.current_obstacles,
											onChange: (value) => setData("current_obstacles", value),
											error: fieldError(errors, "current_obstacles"),
											placeholder: "Kendala produksi, pemasaran, bahan baku, legalitas"
										})]
									})
								]
							}),
							/* @__PURE__ */ jsxs(SectionCard, {
								icon: PackageCheck,
								title: "Produksi dan Legalitas",
								description: "Lengkapi kapasitas produksi, sertifikasi, dan kelayakan lokasi pabrik.",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3",
									children: [
										/* @__PURE__ */ jsx(TextInput, {
											label: "Kapasitas Produksi Rata-rata per Bulan",
											value: data.monthly_production_capacity,
											onChange: (value) => setData("monthly_production_capacity", value),
											error: fieldError(errors, "monthly_production_capacity"),
											placeholder: "Contoh: 500 pcs/bulan"
										}),
										/* @__PURE__ */ jsx(TextInput, {
											label: "Sertifikasi yang Dimiliki",
											value: data.certifications,
											onChange: (value) => setData("certifications", value),
											error: fieldError(errors, "certifications"),
											placeholder: "Halal, PIRT, BPOM, ISO"
										}),
										/* @__PURE__ */ jsx(TextInput, {
											label: "Legalitas Usaha dan Sertifikasi",
											value: data.has_business_legality_and_certification,
											onChange: (value) => setData("has_business_legality_and_certification", value),
											error: fieldError(errors, "has_business_legality_and_certification"),
											placeholder: "Contoh: NIB, SKU, Halal"
										}),
										/* @__PURE__ */ jsx(TextInput, {
											label: "Peserta UMKM",
											value: data.is_umkm_participant,
											onChange: (value) => setData("is_umkm_participant", value),
											error: fieldError(errors, "is_umkm_participant"),
											placeholder: "Status peserta/program"
										}),
										/* @__PURE__ */ jsx(TextInput, {
											label: "Peserta Kapasitas Produksi",
											value: data.is_production_capacity_participant,
											onChange: (value) => setData("is_production_capacity_participant", value),
											error: fieldError(errors, "is_production_capacity_participant"),
											placeholder: "Status kapasitas produksi"
										}),
										/* @__PURE__ */ jsx(TextInput, {
											label: "Kapasitas Produksi per Tahun",
											value: data.annual_production_capacity,
											onChange: (value) => setData("annual_production_capacity", value),
											error: fieldError(errors, "annual_production_capacity"),
											placeholder: "Contoh: 6.000 pcs/tahun"
										})
									]
								}), /* @__PURE__ */ jsxs("div", {
									className: "mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2",
									children: [/* @__PURE__ */ jsx(TextArea, {
										label: "Kelayakan Lokasi Pabrik",
										value: data.factory_location_feasibility,
										onChange: (value) => setData("factory_location_feasibility", value),
										error: fieldError(errors, "factory_location_feasibility"),
										placeholder: "Catatan kelayakan lokasi, keamanan, kebersihan, akses"
									}), /* @__PURE__ */ jsxs("label", {
										className: "block rounded-2xl border border-dashed border-[#BFD6EA] bg-[#F8FBFE] p-4",
										children: [
											/* @__PURE__ */ jsxs("span", {
												className: "flex items-center gap-2 text-xs font-bold text-[#344256]",
												children: [
													/* @__PURE__ */ jsx(Camera, { className: "size-4 text-[#0066AE]" }),
													" ",
													"Foto Produk"
												]
											}),
											/* @__PURE__ */ jsx("input", {
												type: "file",
												accept: "image/*",
												onChange: (event) => setData("product_photo", event.target.files?.[0] ?? null),
												className: "mt-3 block w-full text-sm text-[#64748B] file:mr-3 file:h-9 file:rounded-lg file:border-0 file:bg-[#0066AE] file:px-3 file:text-sm file:font-bold file:text-white"
											}),
											/* @__PURE__ */ jsx("p", {
												className: "mt-2 text-xs text-[#64748B]",
												children: "Format gambar, maksimal 5 MB."
											}),
											/* @__PURE__ */ jsx(FieldError, { message: fieldError(errors, "product_photo") })
										]
									})]
								})]
							}),
							/* @__PURE__ */ jsx(SectionCard, {
								icon: FileText,
								title: "File Pendukung",
								description: "Untuk dokumen penting, penghargaan, atau foto produk.",
								children: /* @__PURE__ */ jsxs("div", {
									className: "space-y-3",
									children: [
										data.documents.length === 0 && /* @__PURE__ */ jsxs("div", {
											className: "rounded-2xl border border-dashed border-[#BFD6EA] bg-[#F8FBFE] px-4 py-6 text-center",
											children: [
												/* @__PURE__ */ jsx(FileText, { className: "mx-auto size-8 text-[#0066AE]" }),
												/* @__PURE__ */ jsx("p", {
													className: "mt-2 text-sm font-bold text-[#172033]",
													children: "Belum ada file pendukung"
												}),
												/* @__PURE__ */ jsx("p", {
													className: "mt-1 text-xs text-[#64748B]",
													children: "Tambahkan file jika tersedia."
												})
											]
										}),
										data.documents.map((document, index) => /* @__PURE__ */ jsxs("div", {
											className: "grid gap-3 rounded-2xl border border-[#E4EAF0] bg-[#FBFCFE] p-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_44px] lg:items-start",
											children: [
												/* @__PURE__ */ jsx(TextInput, {
													label: "Nama Dokumen",
													value: document.document_name,
													onChange: (value) => updateDocument(index, { document_name: value }),
													error: fieldError(errors, `documents.${index}.document_name`),
													placeholder: "Contoh: NIB, Sertifikat Halal, Katalog Produk"
												}),
												/* @__PURE__ */ jsxs("label", {
													className: "block min-w-0",
													children: [
														/* @__PURE__ */ jsx("span", {
															className: "text-xs font-bold text-[#344256]",
															children: "File Pendukung"
														}),
														/* @__PURE__ */ jsx("input", {
															type: "file",
															accept: "image/*,.pdf",
															onChange: (event) => updateDocument(index, { file: event.target.files?.[0] ?? null }),
															className: "mt-2 block w-full text-sm text-[#64748B] file:mr-3 file:h-9 file:rounded-lg file:border-0 file:bg-[#0066AE] file:px-3 file:text-sm file:font-bold file:text-white"
														}),
														/* @__PURE__ */ jsx("p", {
															className: "mt-1 truncate text-xs text-[#64748B]",
															children: document.file?.name ?? "PDF atau gambar, maksimal 5 MB."
														}),
														/* @__PURE__ */ jsx(FieldError, { message: fieldError(errors, `documents.${index}.file`) })
													]
												}),
												/* @__PURE__ */ jsx("button", {
													type: "button",
													onClick: () => removeDocument(index),
													className: "inline-flex size-10 items-center justify-center rounded-xl border border-[#F2C7C7] bg-white text-[#D81313] transition hover:bg-[#FFF6F6] lg:mt-6",
													"aria-label": "Hapus dokumen",
													children: /* @__PURE__ */ jsx(Trash2, { className: "size-4" })
												})
											]
										}, index)),
										/* @__PURE__ */ jsxs("button", {
											type: "button",
											onClick: addDocument,
											className: "inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#BFD6EA] bg-white px-4 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F8FF]",
											children: [/* @__PURE__ */ jsx(Plus, { className: "size-4" }), "Tambah File"]
										})
									]
								})
							}),
							/* @__PURE__ */ jsxs(SectionCard, {
								icon: Globe2,
								title: "Pemasaran dan Ekspor",
								description: "Kanal digital, catatan pemasaran, sustainability, dan status ekspor.",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3",
									children: [
										/* @__PURE__ */ jsx(TextInput, {
											label: "Instagram",
											value: data.instagram_url,
											onChange: (value) => setData("instagram_url", value),
											error: fieldError(errors, "instagram_url"),
											placeholder: "https://instagram.com/brand"
										}),
										/* @__PURE__ */ jsx(TextInput, {
											label: "Facebook",
											value: data.facebook_url,
											onChange: (value) => setData("facebook_url", value),
											error: fieldError(errors, "facebook_url"),
											placeholder: "https://facebook.com/brand"
										}),
										/* @__PURE__ */ jsx(TextInput, {
											label: "Twitter/X",
											value: data.twitter_url,
											onChange: (value) => setData("twitter_url", value),
											error: fieldError(errors, "twitter_url"),
											placeholder: "https://x.com/brand"
										}),
										/* @__PURE__ */ jsx(TextInput, {
											label: "Website Marketing",
											value: data.marketing_website_url,
											onChange: (value) => setData("marketing_website_url", value),
											error: fieldError(errors, "marketing_website_url"),
											placeholder: "https://brand.com"
										}),
										/* @__PURE__ */ jsx(TextInput, {
											label: "Profil E-Commerce",
											value: data.ecommerce_profile_url,
											onChange: (value) => setData("ecommerce_profile_url", value),
											error: fieldError(errors, "ecommerce_profile_url"),
											placeholder: "https://marketplace.com/toko"
										}),
										/* @__PURE__ */ jsx(SelectInput, {
											label: "Pernah Ekspor",
											value: data.has_exported,
											onChange: (value) => setData("has_exported", value),
											options: boolean_options,
											error: fieldError(errors, "has_exported"),
											placeholder: "Pilih status"
										})
									]
								}), /* @__PURE__ */ jsxs("div", {
									className: "mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3",
									children: [
										/* @__PURE__ */ jsx(TextArea, {
											label: "Catatan Pemasaran",
											value: data.marketing_notes,
											onChange: (value) => setData("marketing_notes", value),
											error: fieldError(errors, "marketing_notes"),
											placeholder: "Strategi, kanal, atau performa pemasaran"
										}),
										/* @__PURE__ */ jsx(TextArea, {
											label: "Catatan Sustainability",
											value: data.sustainability_notes,
											onChange: (value) => setData("sustainability_notes", value),
											error: fieldError(errors, "sustainability_notes"),
											placeholder: "Material ramah lingkungan, limbah, pemberdayaan"
										}),
										/* @__PURE__ */ jsx(TextArea, {
											label: "Negara Tujuan Ekspor",
											value: data.export_destination_countries,
											onChange: (value) => setData("export_destination_countries", value),
											error: fieldError(errors, "export_destination_countries"),
											placeholder: "Sebutkan negara jika sudah ekspor"
										})
									]
								})]
							}),
							/* @__PURE__ */ jsxs(SectionCard, {
								icon: Banknote,
								title: "Solusi Perbankan",
								description: "Data rekening dan fasilitas transaksi yang digunakan UMKM.",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3",
									children: [
										/* @__PURE__ */ jsx(TextInput, {
											label: "Bank yang Digunakan",
											value: data.bank_name,
											onChange: (value) => setData("bank_name", value),
											error: fieldError(errors, "bank_name"),
											placeholder: "Contoh: BCA"
										}),
										/* @__PURE__ */ jsx(TextInput, {
											label: "Nomor Rekening",
											value: data.bank_account_number,
											onChange: (value) => setData("bank_account_number", value),
											error: fieldError(errors, "bank_account_number"),
											placeholder: "Nomor rekening usaha"
										}),
										/* @__PURE__ */ jsx(SelectInput, {
											label: "Memiliki QRIS",
											value: data.has_qris,
											onChange: (value) => setData("has_qris", value),
											options: boolean_options,
											error: fieldError(errors, "has_qris"),
											placeholder: "Pilih status"
										}),
										/* @__PURE__ */ jsx(TextInput, {
											label: "Provider QRIS",
											value: data.qris_provider,
											onChange: (value) => setData("qris_provider", value),
											error: fieldError(errors, "qris_provider"),
											placeholder: "Nama provider QRIS"
										}),
										/* @__PURE__ */ jsx(SelectInput, {
											label: "Memiliki EDC",
											value: data.has_edc,
											onChange: (value) => setData("has_edc", value),
											options: boolean_options,
											error: fieldError(errors, "has_edc"),
											placeholder: "Pilih status"
										}),
										/* @__PURE__ */ jsx(TextInput, {
											label: "Provider EDC",
											value: data.edc_provider,
											onChange: (value) => setData("edc_provider", value),
											error: fieldError(errors, "edc_provider"),
											placeholder: "Nama provider EDC"
										}),
										/* @__PURE__ */ jsx(SelectInput, {
											label: "Memiliki Kartu Kredit",
											value: data.has_credit_card,
											onChange: (value) => setData("has_credit_card", value),
											options: boolean_options,
											error: fieldError(errors, "has_credit_card"),
											placeholder: "Pilih status"
										})
									]
								}), /* @__PURE__ */ jsx("div", {
									className: "mt-4",
									children: /* @__PURE__ */ jsx(TextArea, {
										label: "Catatan Perbankan",
										value: data.banking_notes,
										onChange: (value) => setData("banking_notes", value),
										error: fieldError(errors, "banking_notes"),
										placeholder: "Kebutuhan atau solusi perbankan tambahan"
									})
								})]
							}),
							/* @__PURE__ */ jsx(SectionCard, {
								icon: Banknote,
								title: "Omset Tahunan",
								description: "Tambahkan riwayat omset tahunan UMKM. Data ini disimpan sebagai annual turnover.",
								children: /* @__PURE__ */ jsxs("div", {
									className: "space-y-3",
									children: [
										data.annual_turnovers.length === 0 && /* @__PURE__ */ jsxs("div", {
											className: "rounded-2xl border border-dashed border-[#BFD6EA] bg-[#F8FBFE] px-4 py-6 text-center",
											children: [
												/* @__PURE__ */ jsx(Banknote, { className: "mx-auto size-8 text-[#0066AE]" }),
												/* @__PURE__ */ jsx("p", {
													className: "mt-2 text-sm font-bold text-[#172033]",
													children: "Belum ada omset tahunan"
												}),
												/* @__PURE__ */ jsx("p", {
													className: "mt-1 text-xs text-[#64748B]",
													children: "Tambahkan data tahun dan nominal omset jika tersedia."
												})
											]
										}),
										data.annual_turnovers.map((row, index) => /* @__PURE__ */ jsxs("div", {
											className: "grid gap-3 rounded-2xl border border-[#E4EAF0] bg-[#FBFCFE] p-3 lg:grid-cols-[140px_minmax(0,1fr)_minmax(0,1fr)_44px] lg:items-start",
											children: [
												/* @__PURE__ */ jsx(TextInput, {
													label: "Tahun",
													value: row.year,
													onChange: (value) => updateAnnualTurnover(index, { year: digitsOnly(value) }),
													error: fieldError(errors, `annual_turnovers.${index}.year`),
													placeholder: "2024",
													type: "number"
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
													"aria-label": "Hapus omset tahunan",
													children: /* @__PURE__ */ jsx(Trash2, { className: "size-4" })
												})
											]
										}, index)),
										/* @__PURE__ */ jsxs("button", {
											type: "button",
											onClick: addAnnualTurnover,
											className: "inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#BFD6EA] bg-white px-4 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F8FF]",
											children: [/* @__PURE__ */ jsx(Plus, { className: "size-4" }), "Tambah Omset Tahunan"]
										})
									]
								})
							}),
							/* @__PURE__ */ jsx(SectionCard, {
								icon: Factory,
								title: "Data Pekerja Tahunan",
								description: "Catat jumlah pekerja berdasarkan usia, gender, atau pendidikan per tahun.",
								children: /* @__PURE__ */ jsxs("div", {
									className: "space-y-3",
									children: [
										data.annual_worker_stats.length === 0 && /* @__PURE__ */ jsxs("div", {
											className: "rounded-2xl border border-dashed border-[#BFD6EA] bg-[#F8FBFE] px-4 py-6 text-center",
											children: [
												/* @__PURE__ */ jsx(Factory, { className: "mx-auto size-8 text-[#0066AE]" }),
												/* @__PURE__ */ jsx("p", {
													className: "mt-2 text-sm font-bold text-[#172033]",
													children: "Belum ada data pekerja tahunan"
												}),
												/* @__PURE__ */ jsx("p", {
													className: "mt-1 text-xs text-[#64748B]",
													children: "Tambahkan data jika ingin mencatat profil pekerja UMKM."
												})
											]
										}),
										data.annual_worker_stats.map((row, index) => /* @__PURE__ */ jsxs("div", {
											className: "grid gap-3 rounded-2xl border border-[#E4EAF0] bg-[#FBFCFE] p-3 lg:grid-cols-[120px_170px_minmax(0,1fr)_150px_minmax(0,1fr)_44px] lg:items-start",
											children: [
												/* @__PURE__ */ jsx(TextInput, {
													label: "Tahun",
													value: row.year,
													onChange: (value) => updateAnnualWorkerStat(index, { year: digitsOnly(value) }),
													error: fieldError(errors, `annual_worker_stats.${index}.year`),
													placeholder: "2024",
													type: "number"
												}),
												/* @__PURE__ */ jsx(SelectInput, {
													label: "Dimensi",
													value: row.dimension,
													onChange: (value) => updateAnnualWorkerStat(index, { dimension: value }),
													options: workerDimensionOptions,
													error: fieldError(errors, `annual_worker_stats.${index}.dimension`),
													placeholder: "Pilih dimensi"
												}),
												/* @__PURE__ */ jsx(TextInput, {
													label: "Kategori",
													value: row.category_value,
													onChange: (value) => updateAnnualWorkerStat(index, { category_value: value }),
													error: fieldError(errors, `annual_worker_stats.${index}.category_value`),
													placeholder: "Contoh: perempuan, S1, 22 tahun"
												}),
												/* @__PURE__ */ jsx(TextInput, {
													label: "Jumlah Orang",
													value: row.total_people,
													onChange: (value) => updateAnnualWorkerStat(index, { total_people: digitsOnly(value) }),
													error: fieldError(errors, `annual_worker_stats.${index}.total_people`),
													placeholder: "0",
													type: "number"
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
													className: "inline-flex size-10 items-center justify-center rounded-xl border border-[#F2C7C7] bg-white text-[#D81313] transition hover:bg-[#FFF6F6] lg:mt-6",
													"aria-label": "Hapus data pekerja",
													children: /* @__PURE__ */ jsx(Trash2, { className: "size-4" })
												})
											]
										}, index)),
										/* @__PURE__ */ jsxs("button", {
											type: "button",
											onClick: addAnnualWorkerStat,
											className: "inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#BFD6EA] bg-white px-4 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F8FF]",
											children: [/* @__PURE__ */ jsx(Plus, { className: "size-4" }), "Tambah Data Pekerja"]
										})
									]
								})
							}),
							/* @__PURE__ */ jsx(SectionCard, {
								icon: ClipboardCheck,
								title: "Pelatihan Pekerja Tahunan",
								description: "Catat jumlah pekerja yang mengikuti pelatihan per tahun.",
								children: /* @__PURE__ */ jsxs("div", {
									className: "space-y-3",
									children: [
										data.annual_worker_training_stats.length === 0 && /* @__PURE__ */ jsxs("div", {
											className: "rounded-2xl border border-dashed border-[#BFD6EA] bg-[#F8FBFE] px-4 py-6 text-center",
											children: [
												/* @__PURE__ */ jsx(ClipboardCheck, { className: "mx-auto size-8 text-[#0066AE]" }),
												/* @__PURE__ */ jsx("p", {
													className: "mt-2 text-sm font-bold text-[#172033]",
													children: "Belum ada data pelatihan"
												}),
												/* @__PURE__ */ jsx("p", {
													className: "mt-1 text-xs text-[#64748B]",
													children: "Tambahkan data pelatihan pekerja jika tersedia."
												})
											]
										}),
										data.annual_worker_training_stats.map((row, index) => /* @__PURE__ */ jsxs("div", {
											className: "grid gap-3 rounded-2xl border border-[#E4EAF0] bg-[#FBFCFE] p-3 lg:grid-cols-[120px_minmax(0,1fr)_150px_minmax(0,1fr)_44px] lg:items-start",
											children: [
												/* @__PURE__ */ jsx(TextInput, {
													label: "Tahun",
													value: row.year,
													onChange: (value) => updateAnnualWorkerTrainingStat(index, { year: digitsOnly(value) }),
													error: fieldError(errors, `annual_worker_training_stats.${index}.year`),
													placeholder: "2024",
													type: "number"
												}),
												/* @__PURE__ */ jsx(TextInput, {
													label: "Nama Pelatihan",
													value: row.training_name,
													onChange: (value) => updateAnnualWorkerTrainingStat(index, { training_name: value }),
													error: fieldError(errors, `annual_worker_training_stats.${index}.training_name`),
													placeholder: "Contoh: Digital Marketing"
												}),
												/* @__PURE__ */ jsx(TextInput, {
													label: "Jumlah Orang",
													value: row.total_people,
													onChange: (value) => updateAnnualWorkerTrainingStat(index, { total_people: digitsOnly(value) }),
													error: fieldError(errors, `annual_worker_training_stats.${index}.total_people`),
													placeholder: "0",
													type: "number"
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
													className: "inline-flex size-10 items-center justify-center rounded-xl border border-[#F2C7C7] bg-white text-[#D81313] transition hover:bg-[#FFF6F6] lg:mt-6",
													"aria-label": "Hapus data pelatihan",
													children: /* @__PURE__ */ jsx(Trash2, { className: "size-4" })
												})
											]
										}, index)),
										/* @__PURE__ */ jsxs("button", {
											type: "button",
											onClick: addAnnualWorkerTrainingStat,
											className: "inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#BFD6EA] bg-white px-4 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F8FF]",
											children: [/* @__PURE__ */ jsx(Plus, { className: "size-4" }), "Tambah Data Pelatihan"]
										})
									]
								})
							}),
							/* @__PURE__ */ jsx(SectionCard, {
								icon: ClipboardCheck,
								title: "Assessment Pelaku UMKM",
								description: "Isi nilai 1 sampai 4 untuk semua pertanyaan assessment.",
								children: /* @__PURE__ */ jsxs("div", {
									className: "space-y-4",
									children: [/* @__PURE__ */ jsx(FieldError, { message: fieldError(errors, "answers") }), criteria_groups.map((group) => /* @__PURE__ */ jsxs("div", {
										className: "rounded-2xl border border-[#E4EAF0] bg-[#FBFCFE]",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex flex-col gap-2 border-b border-[#E8EEF5] px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
											children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
												className: "text-xs font-black tracking-[0.08em] text-[#0066AE] uppercase",
												children: [
													"Kriteria",
													" ",
													group.criteria_code
												]
											}), /* @__PURE__ */ jsx("h3", {
												className: "text-sm font-bold text-[#172033]",
												children: group.criteria_name
											})] }), /* @__PURE__ */ jsxs("span", {
												className: "inline-flex h-7 w-fit items-center rounded-full bg-[#EAF4FB] px-3 text-xs font-bold text-[#0066AE]",
												children: [
													"Bobot",
													" ",
													group.criteria_weight_percent,
													"%"
												]
											})]
										}), /* @__PURE__ */ jsx("div", {
											className: "divide-y divide-[#E8EEF5]",
											children: group.questions.map((question) => /* @__PURE__ */ jsxs("div", {
												className: "grid grid-cols-1 gap-3 px-4 py-4 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start",
												children: [/* @__PURE__ */ jsxs("div", {
													className: "min-w-0",
													children: [
														/* @__PURE__ */ jsxs("div", {
															className: "mb-2 flex flex-wrap items-center gap-2",
															children: [/* @__PURE__ */ jsx("span", {
																className: "inline-flex size-7 items-center justify-center rounded-lg bg-white text-xs font-black text-[#0066AE] ring-1 ring-[#DDE8F2]",
																children: question.question_number
															}), /* @__PURE__ */ jsxs("span", {
																className: "rounded-full bg-white px-2 py-1 text-[11px] font-bold text-[#64748B] ring-1 ring-[#E4EAF0]",
																children: [
																	"Bobot",
																	" ",
																	question.question_weight_percent,
																	"%"
																]
															})]
														}),
														/* @__PURE__ */ jsx("p", {
															className: "text-sm leading-6 font-semibold text-[#1F2937]",
															children: question.question_text
														}),
														question.help_text && /* @__PURE__ */ jsx("p", {
															className: "mt-2 text-xs leading-5 text-[#64748B]",
															children: question.help_text
														})
													]
												}), /* @__PURE__ */ jsx(TextInput, {
													label: "Nilai",
													value: answerScore(question.id),
													onChange: (value) => setAnswerScore(question.id, value),
													error: fieldError(errors, `answers.${data.answers.findIndex((answer) => answer.question_id === question.id)}.score`),
													placeholder: "0 - 100",
													type: "number",
													min: "0",
													max: "100",
													required: true
												})]
											}, question.id))
										})]
									}, group.criteria_code))]
								})
							})
						]
					}), /* @__PURE__ */ jsxs("aside", {
						className: "space-y-4 xl:sticky xl:top-4 xl:self-start",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "rounded-2xl border border-[#E4EAF0] bg-white p-4 shadow-[0_14px_34px_rgba(15,23,42,0.05)]",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ jsx("div", {
										className: "flex size-10 items-center justify-center rounded-xl bg-[#0066AE] text-white",
										children: /* @__PURE__ */ jsx(Factory, { className: "size-5" })
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
										className: "text-sm font-bold text-[#172033]",
										children: "Ringkasan Input"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-xs text-[#64748B]",
										children: "UMKM + assessment"
									})] })]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-4 space-y-3 text-sm",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between rounded-xl bg-[#F7FAFC] px-3 py-2",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-[#64748B]",
												children: "Template"
											}), /* @__PURE__ */ jsx("span", {
												className: "font-bold text-[#172033]",
												children: template?.title ?? "-"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between rounded-xl bg-[#F7FAFC] px-3 py-2",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-[#64748B]",
												children: "Kriteria"
											}), /* @__PURE__ */ jsx("span", {
												className: "font-bold text-[#172033]",
												children: criteria_groups.length
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between rounded-xl bg-[#F7FAFC] px-3 py-2",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-[#64748B]",
												children: "Progress Nilai"
											}), /* @__PURE__ */ jsxs("span", {
												className: "font-bold text-[#172033]",
												children: [
													answeredCount,
													"/",
													totalQuestions
												]
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between rounded-xl bg-[#F7FAFC] px-3 py-2",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-[#64748B]",
												children: "Omset Tahunan"
											}), /* @__PURE__ */ jsx("span", {
												className: "font-bold text-[#172033]",
												children: data.annual_turnovers.length
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between rounded-xl bg-[#F7FAFC] px-3 py-2",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-[#64748B]",
												children: "Data Pekerja"
											}), /* @__PURE__ */ jsx("span", {
												className: "font-bold text-[#172033]",
												children: data.annual_worker_stats.length
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between rounded-xl bg-[#F7FAFC] px-3 py-2",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-[#64748B]",
												children: "Data Pelatihan"
											}), /* @__PURE__ */ jsx("span", {
												className: "font-bold text-[#172033]",
												children: data.annual_worker_training_stats.length
											})]
										})
									]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-4 h-2 overflow-hidden rounded-full bg-[#E8EEF5]",
									children: /* @__PURE__ */ jsx("div", {
										className: "h-full rounded-full bg-[#0066AE] transition-all",
										style: { width: `${totalQuestions ? answeredCount / totalQuestions * 100 : 0}%` }
									})
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-4 grid grid-cols-1 gap-2",
									children: [/* @__PURE__ */ jsxs("button", {
										type: "submit",
										disabled: processing || !template,
										className: "inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0066AE] px-4 text-sm font-bold text-white shadow-[0_10px_20px_rgba(0,102,174,0.18)] transition hover:bg-[#00518A] disabled:cursor-not-allowed disabled:opacity-60",
										children: [/* @__PURE__ */ jsx(Save, { className: "size-4" }), processing ? "Menyimpan..." : "Simpan UMKM"]
									}), /* @__PURE__ */ jsxs(Link, {
										href: show.url(assignment.code),
										className: "inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#DDE4EC] bg-white px-4 text-sm font-bold text-[#093967] transition hover:bg-[#F1F5F8]",
										children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "size-4" }), "Kembali"]
									})]
								})
							]
						}), /* @__PURE__ */ jsx("div", {
							className: "rounded-2xl border border-[#D7E8F8] bg-[#F1F8FF] p-4",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 size-5 shrink-0 text-[#0066AE]" }), /* @__PURE__ */ jsxs("div", {
									className: "text-xs leading-5 text-[#35506B]",
									children: [/* @__PURE__ */ jsx("p", {
										className: "font-bold text-[#093967]",
										children: "Skoring otomatis"
									}), /* @__PURE__ */ jsx("p", { children: "Nilai UMKM memakai skala 0-100. Backend menghitung weighted score dari bobot pertanyaan dan menyimpan snapshot otomatis dari data asli." })]
								})]
							})
						})]
					})]
				})
			]
		})
	})] });
}
//#endregion
export { CreateUmkmSurveyAssignment as default };

//# sourceMappingURL=create-umkm-CrmcJUcx.js.map