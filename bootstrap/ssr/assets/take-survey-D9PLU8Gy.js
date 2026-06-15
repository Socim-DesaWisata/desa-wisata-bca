import { c as store, i as show, l as destroy } from "./survey-assignments-BfNUxixD.js";
import { Head, Link, router } from "@inertiajs/react";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, Building2, ChevronRight, ClipboardList, CloudUpload, Eye, FileText, MapPin, Save, Trash2, UserRound } from "lucide-react";
//#region resources/js/pages/survey/take-survey.tsx
var MAX_UPLOAD_FILE_SIZE_MB = 5;
var MAX_UPLOAD_FILE_SIZE_BYTES = MAX_UPLOAD_FILE_SIZE_MB * 1024 * 1024;
var colors = { background: "#F7F7F7" };
var SurveyDraftContext = createContext(null);
function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
function fileSizeLabel(bytes) {
	return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
function getInitialSelectedOptions(aspects) {
	return Object.fromEntries(aspects.flatMap((aspect) => aspect.questions).filter((question) => question.answer).map((question) => [question.id, question.answer?.selected_option_id]));
}
function SurveyDraftProvider({ initialSelectedOptions, children }) {
	const [selectedOptions, setSelectedOptions] = useState(() => ({ ...initialSelectedOptions }));
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
			documents,
			dirtyQuestionIds,
			hasUnsavedChanges,
			selectOption,
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
function SectionTitle({ title, subtitle }) {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
		className: "text-base font-bold text-[#0066AE]",
		children: title
	}), subtitle && /* @__PURE__ */ jsx("p", {
		className: "mt-1 text-xs font-medium text-[#7C7C7C]",
		children: subtitle
	})] });
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
function getQuestionDraftStatus(question, selectedOptionId, localFilesCount) {
	if (!selectedOptionId && localFilesCount === 0) return {
		label: "Belum diisi",
		description: "Belum ada jawaban",
		className: "bg-[#F7F7F7] text-[#7C7C7C]"
	};
	if (!question.answer) return {
		label: "Draft lokal",
		description: "Aktif di halaman ini, belum masuk database",
		className: "bg-[#FFF4EA] text-[#C9681E]"
	};
	if (selectedOptionId !== question.answer.selected_option_id) return {
		label: "Diubah lokal",
		description: "Berbeda dari jawaban database, belum disimpan",
		className: "bg-[#FDECEC] text-[#D81313]"
	};
	if (localFilesCount > 0) return {
		label: "Ada draft lokal",
		description: "Ada dokumen baru di halaman ini, belum disimpan",
		className: "bg-[#FFF4EA] text-[#C9681E]"
	};
	return {
		label: "Tersimpan database",
		description: "Jawaban sudah tersimpan di database",
		className: "bg-[#EAF8F0] text-[#00893D]"
	};
}
function QuestionCard({ aspect, question, selectedOptionId, files, onSelectOption, onFilesChange, onPreviewFile, onRemoveFile, onDeleteDocument }) {
	const [fileError, setFileError] = useState("");
	const hasDocuments = (question.answer?.documents.length ?? 0) > 0 || files.length > 0;
	const draftStatus = getQuestionDraftStatus(question, selectedOptionId, files.length);
	function handleFilesChange(fileList) {
		const selectedFiles = Array.from(fileList ?? []);
		if (selectedFiles.length === 0) return;
		const oversizedFiles = selectedFiles.filter((file) => file.size > MAX_UPLOAD_FILE_SIZE_BYTES);
		const acceptedFiles = selectedFiles.filter((file) => file.size <= MAX_UPLOAD_FILE_SIZE_BYTES);
		if (oversizedFiles.length > 0) setFileError(`File ${oversizedFiles.map((file) => `${file.name} (${fileSizeLabel(file.size)})`).join(", ")} melebihi batas ${MAX_UPLOAD_FILE_SIZE_MB} MB per file.`);
		else setFileError("");
		if (acceptedFiles.length > 0) onFilesChange(acceptedFiles);
	}
	return /* @__PURE__ */ jsxs("article", {
		className: "rounded-2xl border border-[#EFEFEF] bg-white px-4 py-5 sm:px-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ jsx("span", {
					className: "rounded-md bg-[#F1F5F8] px-2.5 py-1 text-xs font-bold text-[#0066AE]",
					children: aspect
				}), /* @__PURE__ */ jsx("span", {
					className: classNames("rounded-md px-2.5 py-1 text-xs font-bold", draftStatus.className),
					title: draftStatus.description,
					children: draftStatus.label
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-5 text-sm font-semibold text-[#0066AE]",
				children: "Pertanyaan survey"
			}),
			/* @__PURE__ */ jsx("h2", {
				className: "mt-2 max-w-3xl text-lg leading-tight font-bold text-[#303030] sm:text-xl",
				children: question.question_text
			}),
			question.document_hint && /* @__PURE__ */ jsx("p", {
				className: "mt-2 max-w-2xl text-[13px] leading-5 font-medium text-[#7C7C7C] sm:text-sm sm:leading-6",
				children: question.document_hint
			}),
			/* @__PURE__ */ jsx("p", {
				className: classNames("mt-3 inline-flex rounded-lg px-3 py-2 text-xs font-semibold", draftStatus.className),
				children: draftStatus.description
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-6 border-t border-[#EFEFEF] pt-5",
				children: [/* @__PURE__ */ jsx(SectionTitle, {
					title: "Pilih skor",
					subtitle: "Pilih satu nilai yang paling sesuai kondisi lapangan."
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-3 divide-y divide-[#EFEFEF]",
					children: question.options.map((option) => {
						const selected = selectedOptionId === option.id;
						const isDatabaseAnswer = question.answer?.selected_option_id === option.id;
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
									"aria-hidden": "true",
									className: classNames("mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border-2", selected ? "border-[#0066AE]" : "border-[#D1D8E0]"),
									children: selected && /* @__PURE__ */ jsx("span", { className: "size-3 rounded-full bg-[#0066AE]" })
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ jsxs("span", {
										className: classNames("block text-sm leading-5 font-bold", selected ? "text-[#0066AE]" : "text-[#303030]"),
										children: [
											option.score,
											" - ",
											option.label
										]
									}), selected && /* @__PURE__ */ jsx("span", {
										className: classNames("mt-1 inline-flex rounded-md px-2 py-0.5 text-[11px] font-bold", isDatabaseAnswer ? "bg-[#EAF8F0] text-[#00893D]" : question.answer ? "bg-[#FDECEC] text-[#D81313]" : "bg-[#FFF4EA] text-[#C9681E]"),
										children: isDatabaseAnswer ? "Jawaban database" : question.answer ? "Perubahan lokal" : "Draft lokal"
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
					/* @__PURE__ */ jsx(SectionTitle, {
						title: "Dokumen pendukung",
						subtitle: "Unggah foto atau dokumen pendukung setelah memilih opsi jawaban."
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
									children: "Unggah foto atau dokumen pendukung"
								}), /* @__PURE__ */ jsx("span", {
									className: "block text-xs font-medium text-[#7C7C7C]",
									children: "JPG, PNG, WEBP, atau PDF. Maksimal 5 MB per file."
								})]
							}),
							/* @__PURE__ */ jsx("input", {
								type: "file",
								multiple: true,
								accept: "image/jpeg,image/png,image/webp,application/pdf",
								onChange: (event) => {
									handleFilesChange(event.target.files);
									event.target.value = "";
								},
								className: "sr-only"
							})
						]
					}),
					fileError && /* @__PURE__ */ jsx("p", {
						className: "mt-2 rounded-lg bg-[#FDECEC] px-3 py-2 text-xs font-semibold text-[#D81313]",
						children: fileError
					}),
					hasDocuments && /* @__PURE__ */ jsxs("div", {
						className: "mt-3 space-y-2",
						children: [question.answer?.documents.map((document) => /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 rounded-xl border border-[#EFEFEF] bg-white px-3 py-2 text-sm font-semibold text-[#303030] transition hover:border-[#AAD2F8] hover:bg-[#F8FBFF]",
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
									"aria-label": `Preview ${document.file_name}`,
									children: /* @__PURE__ */ jsx(Eye, { className: "size-4" })
								}),
								/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => onDeleteDocument(document),
									className: "flex size-8 shrink-0 items-center justify-center rounded-lg text-[#D81313] transition hover:bg-[#FDECEC]",
									"aria-label": `Hapus ${document.file_name}`,
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
									"aria-label": `Preview ${file.name}`,
									children: /* @__PURE__ */ jsx(Eye, { className: "size-4" })
								}),
								/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => onRemoveFile(file),
									className: "flex size-8 shrink-0 items-center justify-center rounded-lg text-[#D81313] transition hover:bg-[#FDECEC]",
									"aria-label": `Hapus ${file.name}`,
									children: /* @__PURE__ */ jsx(Trash2, { className: "size-4" })
								})
							]
						}, `${file.name}-${file.lastModified}`))]
					})
				]
			})
		]
	});
}
function TakeSurvey({ assignment, template, aspects, summary }) {
	return /* @__PURE__ */ jsx(SurveyDraftProvider, {
		initialSelectedOptions: useMemo(() => getInitialSelectedOptions(aspects), [aspects]),
		children: /* @__PURE__ */ jsx(TakeSurveyContent, {
			assignment,
			template,
			aspects,
			summary
		})
	});
}
function TakeSurveyContent({ assignment, template, aspects, summary }) {
	const [activeAspectIndex, setActiveAspectIndex] = useState(0);
	const [processing, setProcessing] = useState(false);
	const isSubmittingRef = useRef(false);
	const { selectedOptions, documents, dirtyQuestionIds, hasUnsavedChanges, selectOption, setQuestionFiles, removeQuestionFile, clearSavedChanges } = useSurveyDraft();
	const activeAspect = aspects[activeAspectIndex] ?? null;
	const hasAspects = aspects.length > 0;
	const progress = hasAspects ? Math.round((activeAspectIndex + 1) / aspects.length * 100) : 0;
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
	function previousAspect() {
		setActiveAspectIndex((current) => Math.max(current - 1, 0));
	}
	function nextAspect() {
		setActiveAspectIndex((current) => Math.min(current + 1, aspects.length - 1));
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
			formData.append(`answers[${index}][survey_question_option_id]`, String(selectedOptions[questionId]));
			(documents[questionId] ?? []).forEach((file) => {
				formData.append(`answers[${index}][documents][]`, file);
			});
		});
		setProcessing(true);
		isSubmittingRef.current = true;
		router.post(store.url(assignment.code), formData, {
			forceFormData: true,
			preserveScroll: true,
			onFinish: () => {
				setProcessing(false);
				isSubmittingRef.current = false;
			},
			onSuccess: clearSavedChanges
		});
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `Isi Survey - ${template.title}` }), /* @__PURE__ */ jsxs("div", {
		className: "min-h-[100dvh] font-sans text-[#303030]",
		style: { backgroundColor: colors.background },
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
							children: "Isi Survey"
						}), /* @__PURE__ */ jsx("p", {
							className: "truncate text-sm font-medium text-[#7C7C7C]",
							children: template.title
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
						className: "flex size-9 items-center justify-center rounded-lg transition hover:bg-[#F1F5F8] active:scale-95",
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
					"aria-label": "Breadcrumb",
					className: "mb-4 flex items-center gap-2 text-sm font-semibold",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "text-[#0066AE]",
							children: "Survey"
						}),
						/* @__PURE__ */ jsx(ChevronRight, {
							size: 16,
							strokeWidth: 2.4,
							className: "text-[#B0B0B0]"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-[#303030]",
							children: activeAspect?.name ?? "Belum Ada Aspect"
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
									children: assignment.village.name
								}), /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm font-medium text-[#7C7C7C]",
									children: template.title
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
								"Aspect",
								" ",
								hasAspects ? activeAspectIndex + 1 : 0,
								" ",
								"dari ",
								summary.total_aspects
							]
						}), /* @__PURE__ */ jsxs("p", {
							className: "mt-0.5 text-xs font-medium text-[#7C7C7C]",
							children: [
								summary.total_questions,
								" pertanyaan dari",
								" ",
								summary.total_options,
								" pilihan jawaban"
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
						children: [/* @__PURE__ */ jsx(SectionTitle, {
							title: "Aspect Survey",
							subtitle: activeAspect ? activeAspect.name : "Template survey belum memiliki pertanyaan."
						}), /* @__PURE__ */ jsx("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: aspects.map((aspect, index) => /* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => setActiveAspectIndex(index),
								className: classNames("h-9 rounded-lg px-3 text-xs font-bold transition active:scale-[0.98]", index === activeAspectIndex ? "bg-[#0066AE] text-white" : "bg-[#F1F5F8] text-[#0066AE]"),
								children: [
									index + 1,
									". ",
									aspect.name
								]
							}, aspect.name))
						})]
					})
				}),
				/* @__PURE__ */ jsxs("section", {
					className: "space-y-4 bg-white px-4 pb-5 sm:px-6",
					children: [activeAspect?.questions.map((question) => /* @__PURE__ */ jsx(QuestionCard, {
						aspect: activeAspect.name,
						question,
						selectedOptionId: selectedOptions[question.id],
						files: documents[question.id] ?? [],
						onSelectOption: (optionId) => selectOption(question.id, optionId),
						onFilesChange: (files) => setQuestionFiles(question.id, files),
						onPreviewFile: previewFile,
						onRemoveFile: (file) => removeQuestionFile(question.id, file),
						onDeleteDocument: deleteStoredDocument
					}, question.id)), !activeAspect && /* @__PURE__ */ jsxs("div", {
						className: "rounded-2xl border border-dashed border-[#AAD2F8] bg-[#F8FBFF] px-6 py-12 text-center",
						children: [
							/* @__PURE__ */ jsx(FileText, { className: "mx-auto size-12 text-[#0066AE]" }),
							/* @__PURE__ */ jsx("h2", {
								className: "mt-4 text-lg font-bold text-[#303030]",
								children: "Template survey belum memiliki pertanyaan"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm font-medium text-[#7C7C7C]",
								children: "Tambahkan pertanyaan pada template ini sebelum survey diisi."
							})
						]
					})]
				}),
				/* @__PURE__ */ jsx("section", {
					className: "rounded-b-3xl bg-white px-4 pb-5 sm:px-6",
					children: /* @__PURE__ */ jsxs("div", {
						className: "border-t border-[#EFEFEF] pt-5",
						children: [/* @__PURE__ */ jsx(SectionTitle, { title: "Informasi survey" }), /* @__PURE__ */ jsx("div", {
							className: "mt-3 grid gap-2.5 text-sm",
							children: [
								["Template", template.title],
								["Status template", template.status ?? "-"],
								["Published at", template.published_at],
								["Assigned at", assignment.assigned_at],
								["Last saved at", assignment.last_saved_at]
							].map(([label, value]) => /* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-[28px_1fr_auto] items-center gap-2.5",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "flex size-7 items-center justify-center text-[#0066AE]",
										children: /* @__PURE__ */ jsx(FileText, {
											size: 20,
											strokeWidth: 2.1
										})
									}),
									/* @__PURE__ */ jsx("span", {
										className: "font-medium text-[#7C7C7C]",
										children: label
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-right font-semibold text-[#303030]",
										children: value
									})
								]
							}, label))
						})]
					})
				}),
				/* @__PURE__ */ jsxs("footer", {
					className: "mt-4 grid w-full grid-cols-1 gap-2 sm:grid-cols-3 sm:items-center",
					children: [
						/* @__PURE__ */ jsxs("button", {
							type: "button",
							disabled: !hasAspects || activeAspectIndex === 0,
							onClick: previousAspect,
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
							className: "h-11 rounded-xl px-4 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F5F8] active:scale-[0.98]",
							children: processing ? "Menyimpan..." : "Simpan Draft"
						}),
						/* @__PURE__ */ jsxs("button", {
							type: "button",
							disabled: !hasAspects || activeAspectIndex === aspects.length - 1,
							onClick: nextAspect,
							className: "flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0066AE] px-4 text-sm font-bold text-white shadow-[0_8px_16px_rgba(0,102,174,0.16)] transition hover:bg-[#093967] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",
							children: [activeAspectIndex === aspects.length - 1 ? "Selesai" : "Selanjutnya", /* @__PURE__ */ jsx(ChevronRight, {
								size: 20,
								strokeWidth: 2.3
							})]
						})
					]
				})
			]
		})]
	})] });
}
TakeSurvey.layout = null;
//#endregion
export { TakeSurvey as default };

//# sourceMappingURL=take-survey-D9PLU8Gy.js.map