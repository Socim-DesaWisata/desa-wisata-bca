import { C as destroy, S as store, i as show } from "./survey-assignments-CULhP1Eb.js";
import { Head, Link, router } from "@inertiajs/react";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, Building2, ChevronRight, ClipboardList, CloudUpload, Eye, FileText, MapPin, Save, Trash2, UserRound } from "lucide-react";
//#region resources/js/pages/survey-assignment/take-survey-pariwisata.tsx
var SurveyDraftContext = createContext(null);
function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
function getInitialSelectedOptions(subCategories) {
	return Object.fromEntries(subCategories.flatMap((subCategory) => subCategory.questions).filter((question) => question.answer).map((question) => [question.id, question.answer?.selected_option_id]));
}
function getInitialNotes(subCategories) {
	return Object.fromEntries(subCategories.flatMap((subCategory) => subCategory.questions).filter((question) => question.answer?.notes).map((question) => [question.id, question.answer?.notes ?? ""]));
}
function SurveyDraftProvider({ initialSelectedOptions, initialNotes, children }) {
	const [selectedOptions, setSelectedOptions] = useState(() => ({ ...initialSelectedOptions }));
	const [notes, setNotes] = useState(() => ({ ...initialNotes }));
	const [documents, setDocuments] = useState({});
	const [dirtyQuestionIds, setDirtyQuestionIds] = useState(() => /* @__PURE__ */ new Set());
	const hasUnsavedChanges = dirtyQuestionIds.size > 0;
	const selectOption = useCallback((questionId, optionId) => {
		setSelectedOptions((current) => ({
			...current,
			[questionId]: optionId
		}));
		setDirtyQuestionIds((current) => new Set(current).add(questionId));
	}, []);
	const setNote = useCallback((questionId, note) => {
		setNotes((current) => ({
			...current,
			[questionId]: note
		}));
		setDirtyQuestionIds((current) => new Set(current).add(questionId));
	}, []);
	const setQuestionFiles = useCallback((questionId, files) => {
		if (files.length === 0) return;
		setDocuments((current) => ({
			...current,
			[questionId]: [...current[questionId] ?? [], ...files]
		}));
		setDirtyQuestionIds((current) => new Set(current).add(questionId));
	}, []);
	const removeQuestionFile = useCallback((questionId, file) => {
		setDocuments((current) => ({
			...current,
			[questionId]: (current[questionId] ?? []).filter((item) => item.name !== file.name || item.lastModified !== file.lastModified || item.size !== file.size)
		}));
		setDirtyQuestionIds((current) => new Set(current).add(questionId));
	}, []);
	const clearPendingFiles = useCallback(() => {
		setDocuments({});
	}, []);
	const clearSavedChanges = useCallback(() => {
		setDocuments({});
		setDirtyQuestionIds(/* @__PURE__ */ new Set());
	}, []);
	return /* @__PURE__ */ jsx(SurveyDraftContext.Provider, {
		value: {
			selectedOptions,
			notes,
			documents,
			dirtyQuestionIds,
			hasUnsavedChanges,
			selectOption,
			setNote,
			setQuestionFiles,
			removeQuestionFile,
			clearPendingFiles,
			clearSavedChanges
		},
		children
	});
}
function useSurveyDraft() {
	const context = useContext(SurveyDraftContext);
	if (!context) throw new Error("useSurveyDraft must be used within SurveyDraftProvider");
	return context;
}
function statusClass(status) {
	return {
		assigned: "bg-[#F1F5F8] text-[#0066AE]",
		in_progress: "bg-[#EAF7FF] text-[#0066AE]",
		submitted: "bg-[#EAF3FF] text-[#093967]",
		approved: "bg-[#EAF8F0] text-[#00893D]",
		need_revision: "bg-[#FFF4EA] text-[#C9681E]",
		rejected: "bg-[#FDECEC] text-[#D81313]"
	}[status] ?? "bg-[#F1F5F8] text-[#7C7C7C]";
}
function InfoRow({ icon, label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex min-w-0 items-center gap-2.5",
		children: [/* @__PURE__ */ jsx("span", {
			className: "flex size-7 shrink-0 items-center justify-center text-[#0066AE]",
			children: icon
		}), /* @__PURE__ */ jsxs("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ jsx("span", {
				className: "block text-[11px] font-medium text-[#7C7C7C]",
				children: label
			}), /* @__PURE__ */ jsx("span", {
				className: "block truncate text-sm font-semibold text-[#303030]",
				children: value
			})]
		})]
	});
}
function QuestionCard({ question, questionNumber, selectedOptionId, note, files, onSelectOption, onNoteChange, onFilesChange, onPreviewFile, onRemoveFile, onDeleteDocument }) {
	const localChanged = Boolean(selectedOptionId) && selectedOptionId !== question.answer?.selected_option_id;
	const draftStatus = !selectedOptionId ? "Belum diisi" : !question.answer ? "Draft lokal" : localChanged || files.length > 0 || note !== (question.answer.notes ?? "") ? "Diubah lokal" : "Tersimpan database";
	return /* @__PURE__ */ jsxs("article", {
		className: "rounded-2xl border border-[#EFEFEF] bg-white px-4 py-5 sm:px-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ jsx("span", {
					className: "rounded-md bg-[#F1F5F8] px-2.5 py-1 text-xs font-semibold text-[#093967]",
					children: question.indicator_code
				}), /* @__PURE__ */ jsx("span", {
					className: classNames("rounded-md px-2.5 py-1 text-xs font-bold", draftStatus === "Tersimpan database" && "bg-[#EAF8F0] text-[#00893D]", draftStatus === "Belum diisi" && "bg-[#F7F7F7] text-[#7C7C7C]", draftStatus !== "Tersimpan database" && draftStatus !== "Belum diisi" && "bg-[#FFF4EA] text-[#C9681E]"),
					children: draftStatus
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-5 text-sm font-semibold text-[#0066AE]",
				children: "Pertanyaan survey"
			}),
			/* @__PURE__ */ jsxs("h2", {
				className: "mt-2 max-w-3xl text-2xl leading-tight font-bold text-[#303030] sm:text-[26px]",
				children: [
					questionNumber,
					". ",
					question.indicator_name
				]
			}),
			question.indicator_description && /* @__PURE__ */ jsx("p", {
				className: "mt-3 max-w-3xl text-sm leading-6 font-medium text-[#7C7C7C] sm:text-[15px]",
				children: question.indicator_description
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-3 grid gap-2 text-xs font-semibold text-[#7C7C7C] sm:grid-cols-2",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "rounded-lg bg-[#F8FBFF] px-3 py-2",
					children: [
						"Kriteria: ",
						question.criteria_code ?? "-",
						" ·",
						" ",
						question.criteria_name ?? "-"
					]
				}), /* @__PURE__ */ jsxs("p", {
					className: "rounded-lg bg-[#F8FBFF] px-3 py-2",
					children: ["Kategori: ", question.category_name ?? "-"]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-6 border-t border-[#EFEFEF] pt-5",
				children: [/* @__PURE__ */ jsx("h3", {
					className: "text-base font-bold text-[#0066AE]",
					children: "Pilih skor"
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-3 divide-y divide-[#EFEFEF]",
					children: question.options.map((option) => {
						const selected = selectedOptionId === option.id;
						return /* @__PURE__ */ jsxs("label", {
							className: classNames("flex cursor-pointer items-start gap-3 py-3 transition active:scale-[0.995]", selected && "rounded-xl bg-[#F1F5F8] px-3"),
							children: [
								/* @__PURE__ */ jsx("input", {
									type: "radio",
									name: `question-${question.id}`,
									value: option.id,
									checked: selected,
									onChange: () => onSelectOption(option.id),
									className: "sr-only"
								}),
								/* @__PURE__ */ jsx("span", {
									className: classNames("mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border-2", selected ? "border-[#0066AE]" : "border-[#D1D8E0]"),
									children: selected && /* @__PURE__ */ jsx("span", { className: "size-3 rounded-full bg-[#0066AE]" })
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ jsx("span", {
										className: classNames("block text-sm leading-5 font-bold", selected ? "text-[#0066AE]" : "text-[#303030]"),
										children: option.label
									}), /* @__PURE__ */ jsx("span", {
										className: "mt-1 block text-xs leading-5 font-semibold text-[#7C7C7C]",
										children: option.description
									})]
								})
							]
						}, option.id);
					})
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-6 border-t border-[#EFEFEF] pt-5",
				children: [
					/* @__PURE__ */ jsx("h3", {
						className: "text-base font-bold text-[#0066AE]",
						children: "Dokumen pendukung"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1 text-xs font-medium text-[#7C7C7C]",
						children: question.document_hint ?? question.supporting_evidence ?? "Unggah bukti jika tersedia."
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "mt-3 flex cursor-pointer items-start gap-3 rounded-2xl bg-[#F1F5F8] px-4 py-4 text-left transition hover:bg-[#EAF3FF] active:scale-[0.995]",
						children: [
							/* @__PURE__ */ jsx(CloudUpload, {
								size: 32,
								strokeWidth: 2.1,
								className: "shrink-0 text-[#0066AE]"
							}),
							/* @__PURE__ */ jsxs("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ jsx("span", {
									className: "block text-sm font-bold text-[#0066AE]",
									children: "Unggah foto atau dokumen"
								}), /* @__PURE__ */ jsx("span", {
									className: "block text-xs font-medium text-[#7C7C7C]",
									children: "JPG, PNG, WEBP, atau PDF. Maksimal 50 MB per file."
								})]
							}),
							/* @__PURE__ */ jsx("input", {
								type: "file",
								multiple: true,
								accept: "image/jpeg,image/png,image/webp,application/pdf",
								onChange: (event) => onFilesChange(Array.from(event.target.files ?? [])),
								className: "sr-only"
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-3 space-y-2",
						children: [question.answer?.documents.map((document) => /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 rounded-xl border border-[#EFEFEF] bg-white px-3 py-2 text-sm font-semibold text-[#303030]",
							children: [
								/* @__PURE__ */ jsx(FileText, { className: "size-5 shrink-0 text-[#0066AE]" }),
								/* @__PURE__ */ jsx("span", {
									className: "min-w-0 flex-1 truncate",
									children: document.file_name
								}),
								/* @__PURE__ */ jsx("span", {
									className: "rounded-md bg-[#EAF8F0] px-2 py-1 text-xs font-bold text-[#00893D]",
									children: "Database"
								}),
								/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => window.open(document.file_url, "_blank", "noopener,noreferrer"),
									className: "flex size-8 shrink-0 items-center justify-center rounded-lg text-[#0066AE] transition hover:bg-[#EAF3FF]",
									children: /* @__PURE__ */ jsx(Eye, { className: "size-4" })
								}),
								/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => onDeleteDocument(document),
									className: "flex size-8 shrink-0 items-center justify-center rounded-lg text-[#D81313] transition hover:bg-[#FDECEC]",
									children: /* @__PURE__ */ jsx(Trash2, { className: "size-4" })
								})
							]
						}, document.id)), files.map((file) => /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 rounded-xl border border-[#AAD2F8] bg-[#F8FBFF] px-3 py-2 text-sm font-semibold text-[#303030]",
							children: [
								/* @__PURE__ */ jsx(FileText, { className: "size-5 shrink-0 text-[#0066AE]" }),
								/* @__PURE__ */ jsx("span", {
									className: "min-w-0 flex-1 truncate",
									children: file.name
								}),
								/* @__PURE__ */ jsx("span", {
									className: "rounded-md bg-[#FFF4EA] px-2 py-1 text-xs font-bold text-[#C9681E]",
									children: "Draft lokal"
								}),
								/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => onPreviewFile(file),
									className: "flex size-8 shrink-0 items-center justify-center rounded-lg text-[#0066AE] transition hover:bg-[#EAF3FF]",
									children: /* @__PURE__ */ jsx(Eye, { className: "size-4" })
								}),
								/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => onRemoveFile(file),
									className: "flex size-8 shrink-0 items-center justify-center rounded-lg text-[#D81313] transition hover:bg-[#FDECEC]",
									children: /* @__PURE__ */ jsx(Trash2, { className: "size-4" })
								})
							]
						}, `${file.name}-${file.lastModified}`))]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-6 border-t border-[#EFEFEF] pt-5",
				children: [/* @__PURE__ */ jsx("label", {
					className: "text-base font-bold text-[#0066AE]",
					children: "Catatan survey"
				}), /* @__PURE__ */ jsx("textarea", {
					value: note,
					onChange: (event) => onNoteChange(event.target.value),
					className: "mt-3 min-h-28 w-full rounded-xl border border-[#DDE4EC] bg-white px-4 py-3 text-sm font-semibold text-[#303030] transition outline-none focus:border-[#0066AE]",
					placeholder: "Tulis catatan lapangan untuk indikator ini..."
				})]
			})
		]
	});
}
function TakeSurveyPariwisata({ assignment, template, sub_categories, summary }) {
	return /* @__PURE__ */ jsx(SurveyDraftProvider, {
		initialSelectedOptions: useMemo(() => getInitialSelectedOptions(sub_categories), [sub_categories]),
		initialNotes: useMemo(() => getInitialNotes(sub_categories), [sub_categories]),
		children: /* @__PURE__ */ jsx(TakeSurveyPariwisataContent, {
			assignment,
			template,
			sub_categories,
			summary
		})
	});
}
function TakeSurveyPariwisataContent({ assignment, template, sub_categories, summary }) {
	const [activeSubCategoryIndex, setActiveSubCategoryIndex] = useState(0);
	const [processing, setProcessing] = useState(false);
	const isSubmittingRef = useRef(false);
	const { selectedOptions, notes, documents, dirtyQuestionIds, hasUnsavedChanges, selectOption, setNote, setQuestionFiles, removeQuestionFile, clearSavedChanges } = useSurveyDraft();
	const activeSubCategory = sub_categories[activeSubCategoryIndex] ?? null;
	const hasSubCategories = sub_categories.length > 0;
	const progress = hasSubCategories ? Math.round((activeSubCategoryIndex + 1) / sub_categories.length * 100) : 0;
	const currentStartNumber = useMemo(() => sub_categories.slice(0, activeSubCategoryIndex).reduce((total, subCategory) => total + subCategory.questions.length, 0), [activeSubCategoryIndex, sub_categories]);
	useEffect(() => {
		if (!hasUnsavedChanges) return;
		const warnBeforeUnload = (event) => {
			if (isSubmittingRef.current) return;
			event.preventDefault();
			event.returnValue = "";
		};
		window.addEventListener("beforeunload", warnBeforeUnload);
		return () => {
			window.removeEventListener("beforeunload", warnBeforeUnload);
		};
	}, [hasUnsavedChanges]);
	function previousSubCategory() {
		setActiveSubCategoryIndex((current) => Math.max(current - 1, 0));
	}
	function nextSubCategory() {
		setActiveSubCategoryIndex((current) => Math.min(current + 1, sub_categories.length - 1));
	}
	function previewFile(file) {
		const url = URL.createObjectURL(file);
		window.open(url, "_blank", "noopener,noreferrer");
		window.setTimeout(() => URL.revokeObjectURL(url), 6e4);
	}
	function deleteStoredDocument(document) {
		router.delete(destroy.url({
			assignment: assignment.code,
			document: document.id
		}), { preserveScroll: true });
	}
	function submitDraft() {
		const selectedQuestionIds = Array.from(dirtyQuestionIds).filter((questionId) => selectedOptions[questionId]);
		if (selectedQuestionIds.length === 0) return;
		const formData = new FormData();
		selectedQuestionIds.forEach((questionId, index) => {
			formData.append(`answers[${index}][question_id]`, String(questionId));
			formData.append(`answers[${index}][pariwisata_suvey_option_id]`, String(selectedOptions[questionId]));
			formData.append(`answers[${index}][notes]`, notes[questionId] ?? "");
			(documents[questionId] ?? []).forEach((file) => {
				formData.append(`answers[${index}][documents][]`, file);
			});
		});
		setProcessing(true);
		isSubmittingRef.current = true;
		router.post(store.url({ assignment: assignment.code }), formData, {
			forceFormData: true,
			preserveScroll: true,
			onFinish: () => {
				setProcessing(false);
				isSubmittingRef.current = false;
			},
			onSuccess: clearSavedChanges
		});
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `Survey Pariwisata - ${assignment.village.name}` }), /* @__PURE__ */ jsxs("div", {
		className: "min-h-[100dvh] bg-[#F7F7F7] font-sans text-[#303030]",
		children: [/* @__PURE__ */ jsx("header", {
			className: "fixed inset-x-0 top-0 z-50 border-b border-[#EFEFEF] bg-white/95 shadow-[0_8px_24px_rgba(9,57,103,0.08)] backdrop-blur-md lg:left-[232px]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto flex h-16 w-full max-w-4xl items-center justify-between px-4 sm:px-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex min-w-0 items-center gap-3",
					children: [/* @__PURE__ */ jsx(Link, {
						href: show.url(assignment.code),
						"aria-label": "Kembali",
						className: "flex size-9 shrink-0 items-center justify-center rounded-lg text-[#0066AE] transition hover:bg-[#F1F5F8] active:scale-95",
						children: /* @__PURE__ */ jsx(ArrowLeft, {
							size: 23,
							strokeWidth: 2.2
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ jsx("h1", {
							className: "truncate text-xl leading-tight font-bold text-[#303030]",
							children: "Isi Survey Pariwisata"
						}), /* @__PURE__ */ jsx("p", {
							className: "truncate text-sm font-medium text-[#7C7C7C]",
							children: template?.title ?? "Template belum tersedia"
						})]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-1 text-[#0066AE]",
					children: [/* @__PURE__ */ jsx("span", {
						className: classNames("hidden rounded-full px-3 py-1.5 text-xs font-bold sm:inline-flex", hasUnsavedChanges ? "bg-[#FFF4EA] text-[#C9681E]" : "bg-[#EAF8F0] text-[#00893D]"),
						children: hasUnsavedChanges ? "Ada perubahan belum disimpan" : "Semua perubahan tersimpan"
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						"aria-label": "Simpan",
						disabled: processing,
						onClick: submitDraft,
						className: "flex size-9 items-center justify-center rounded-lg transition hover:bg-[#F1F5F8] active:scale-95 disabled:opacity-50",
						children: /* @__PURE__ */ jsx(Save, {
							size: 22,
							strokeWidth: 2.1
						})
					})]
				})]
			})
		}), /* @__PURE__ */ jsxs("main", {
			className: "mx-auto w-full max-w-4xl px-4 pt-24 pb-6 sm:px-6 sm:pt-24",
			children: [
				/* @__PURE__ */ jsxs("nav", {
					className: "mb-4 flex items-center gap-2 text-sm font-semibold",
					children: [
						/* @__PURE__ */ jsx(Link, {
							href: show.url(assignment.code),
							className: "text-[#0066AE]",
							children: "Assignment"
						}),
						/* @__PURE__ */ jsx(ChevronRight, {
							size: 16,
							strokeWidth: 2.4,
							className: "text-[#B0B0B0]"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-[#303030]",
							children: activeSubCategory?.sub_category_code ?? "Survey"
						})
					]
				}),
				/* @__PURE__ */ jsxs("section", {
					className: "rounded-t-3xl bg-white px-4 pt-5 pb-4 sm:px-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex min-w-0 gap-3",
							children: [/* @__PURE__ */ jsx("span", {
								className: "flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#F1F5F8] text-[#0066AE]",
								children: /* @__PURE__ */ jsx(Building2, {
									size: 26,
									strokeWidth: 2.1
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ jsx("h2", {
									className: "truncate text-lg leading-tight font-bold text-[#303030] sm:text-xl",
									children: "Survey Pariwisata Desa"
								}), /* @__PURE__ */ jsxs("p", {
									className: "mt-1 text-sm font-medium text-[#7C7C7C]",
									children: [
										assignment.village.name,
										" ·",
										" ",
										assignment.village.location
									]
								})]
							})]
						}), /* @__PURE__ */ jsxs("span", {
							className: classNames("inline-flex h-8 w-fit items-center gap-2 rounded-full px-3 text-sm font-bold", statusClass(assignment.status)),
							children: [/* @__PURE__ */ jsx("span", { className: "size-2.5 rounded-full bg-current" }), assignment.status_label]
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "mt-5 grid gap-3 border-t border-[#EFEFEF] pt-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ jsx(InfoRow, {
								icon: /* @__PURE__ */ jsx(ClipboardList, {
									size: 20,
									strokeWidth: 2.1
								}),
								label: "Kode Assignment",
								value: assignment.code
							}),
							/* @__PURE__ */ jsx(InfoRow, {
								icon: /* @__PURE__ */ jsx(UserRound, {
									size: 20,
									strokeWidth: 2.1
								}),
								label: "Enumerator",
								value: assignment.assigned_by.name
							}),
							/* @__PURE__ */ jsx(InfoRow, {
								icon: /* @__PURE__ */ jsx(MapPin, {
									size: 20,
									strokeWidth: 2.1
								}),
								label: "Lokasi",
								value: assignment.village.location
							})
						]
					})]
				}),
				/* @__PURE__ */ jsx("section", {
					className: "bg-white px-4 pb-5 sm:px-6",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-3 border-t border-[#EFEFEF] pt-4 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
							className: "text-sm font-bold text-[#303030]",
							children: [
								"Sub kategori",
								" ",
								hasSubCategories ? activeSubCategoryIndex + 1 : 0,
								" ",
								"dari ",
								summary.total_sub_categories
							]
						}), /* @__PURE__ */ jsxs("p", {
							className: "mt-0.5 text-xs font-medium text-[#7C7C7C]",
							children: [
								summary.answered_questions,
								" /",
								" ",
								summary.total_questions,
								" pertanyaan tersimpan"
							]
						})] }), /* @__PURE__ */ jsx("div", {
							className: "h-2 w-full overflow-hidden rounded-full bg-[#F1F5F8] sm:w-72",
							children: /* @__PURE__ */ jsx("div", {
								className: "h-full rounded-full bg-[#0066AE]",
								style: { width: `${progress}%` }
							})
						})]
					})
				}),
				/* @__PURE__ */ jsx("section", {
					className: "bg-white px-4 pb-5 sm:px-6",
					children: /* @__PURE__ */ jsxs("div", {
						className: "border-t border-[#EFEFEF] pt-5",
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "text-base font-bold text-[#0066AE]",
								children: "Sub Kategori Survey"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 text-xs font-medium text-[#7C7C7C]",
								children: "Satu halaman menampilkan pertanyaan dengan sub_category_code yang sama."
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-3 flex gap-2 overflow-x-auto pb-1",
								children: sub_categories.map((subCategory, index) => /* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: () => setActiveSubCategoryIndex(index),
									className: classNames("h-9 shrink-0 rounded-lg px-3 text-xs font-bold transition active:scale-[0.98]", index === activeSubCategoryIndex ? "bg-[#0066AE] text-white" : "bg-[#F1F5F8] text-[#0066AE]"),
									children: [
										subCategory.sub_category_code,
										" ·",
										" ",
										subCategory.answered_count,
										"/",
										subCategory.question_count
									]
								}, subCategory.sub_category_code))
							})
						]
					})
				}),
				/* @__PURE__ */ jsxs("section", {
					className: "space-y-4 bg-white px-4 pb-5 sm:px-6",
					children: [activeSubCategory?.questions.map((question, index) => /* @__PURE__ */ jsx(QuestionCard, {
						question,
						questionNumber: currentStartNumber + index + 1,
						selectedOptionId: selectedOptions[question.id],
						note: notes[question.id] ?? "",
						files: documents[question.id] ?? [],
						onSelectOption: (optionId) => selectOption(question.id, optionId),
						onNoteChange: (value) => setNote(question.id, value),
						onFilesChange: (files) => setQuestionFiles(question.id, files),
						onPreviewFile: previewFile,
						onRemoveFile: (file) => removeQuestionFile(question.id, file),
						onDeleteDocument: deleteStoredDocument
					}, question.id)), !activeSubCategory && /* @__PURE__ */ jsxs("div", {
						className: "rounded-2xl border border-dashed border-[#AAD2F8] bg-[#F8FBFF] px-6 py-12 text-center",
						children: [
							/* @__PURE__ */ jsx(FileText, { className: "mx-auto size-12 text-[#0066AE]" }),
							/* @__PURE__ */ jsx("h2", {
								className: "mt-4 text-lg font-bold text-[#303030]",
								children: "Template survey pariwisata belum memiliki pertanyaan"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm font-medium text-[#7C7C7C]",
								children: "Jalankan seeder atau publish template pariwisata terlebih dahulu."
							})
						]
					})]
				}),
				/* @__PURE__ */ jsxs("footer", {
					className: "mt-4 grid w-full grid-cols-1 gap-2 sm:grid-cols-3 sm:items-center",
					children: [
						/* @__PURE__ */ jsxs("button", {
							type: "button",
							disabled: !hasSubCategories || activeSubCategoryIndex === 0,
							onClick: previousSubCategory,
							className: "flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F5F8] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45",
							children: [/* @__PURE__ */ jsx(ArrowLeft, {
								size: 20,
								strokeWidth: 2.2
							}), "Sebelumnya"]
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							disabled: processing,
							onClick: submitDraft,
							className: "h-11 rounded-xl px-4 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F5F8] active:scale-[0.98] disabled:opacity-50",
							children: processing ? "Menyimpan..." : "Simpan Draft"
						}),
						/* @__PURE__ */ jsxs("button", {
							type: "button",
							disabled: !hasSubCategories || activeSubCategoryIndex === sub_categories.length - 1,
							onClick: nextSubCategory,
							className: "flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0066AE] px-4 text-sm font-bold text-white shadow-[0_8px_16px_rgba(0,102,174,0.16)] transition hover:bg-[#093967] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",
							children: ["Berikutnya", /* @__PURE__ */ jsx(ChevronRight, {
								size: 20,
								strokeWidth: 2.2
							})]
						})
					]
				})
			]
		})]
	})] });
}
//#endregion
export { TakeSurveyPariwisata as default };

//# sourceMappingURL=take-survey-pariwisata-CGQuPtqT.js.map