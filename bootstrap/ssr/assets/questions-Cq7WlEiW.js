import { i as DropdownMenuItem, n as DropdownMenuContent, o as DropdownMenuSeparator, s as DropdownMenuTrigger, t as DropdownMenu } from "./dropdown-menu-Dez2j4dN.js";
import { n as queryParams, t as applyUrlDefaults } from "./wayfinder-BrhwLpUM.js";
import { o as questions, t as dashboard } from "./routes-MVysbYPj.js";
import { a as DialogFooter, i as DialogDescription, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-UyX6Ddfj.js";
import { n as show$1, t as exportMethod$1 } from "./questions-WXr_SZfd.js";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ClipboardList, Download, Edit3, Eye, MoreVertical, Plus, Search, Trash2 } from "lucide-react";
//#region resources/js/actions/App/Http/Controllers/SurveyQuestionController.ts
/**
* @see \App\Http\Controllers\SurveyQuestionController::__invoke
* @see app/Http/Controllers/SurveyQuestionController.php:24
* @route '/questions'
*/
var SurveyQuestionController = (options) => ({
	url: SurveyQuestionController.url(options),
	method: "get"
});
SurveyQuestionController.definition = {
	methods: ["get", "head"],
	url: "/questions"
};
/**
* @see \App\Http\Controllers\SurveyQuestionController::__invoke
* @see app/Http/Controllers/SurveyQuestionController.php:24
* @route '/questions'
*/
SurveyQuestionController.url = (options) => {
	return SurveyQuestionController.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\SurveyQuestionController::__invoke
* @see app/Http/Controllers/SurveyQuestionController.php:24
* @route '/questions'
*/
SurveyQuestionController.get = (options) => ({
	url: SurveyQuestionController.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::__invoke
* @see app/Http/Controllers/SurveyQuestionController.php:24
* @route '/questions'
*/
SurveyQuestionController.head = (options) => ({
	url: SurveyQuestionController.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::__invoke
* @see app/Http/Controllers/SurveyQuestionController.php:24
* @route '/questions'
*/
var SurveyQuestionControllerForm = (options) => ({
	action: SurveyQuestionController.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::__invoke
* @see app/Http/Controllers/SurveyQuestionController.php:24
* @route '/questions'
*/
SurveyQuestionControllerForm.get = (options) => ({
	action: SurveyQuestionController.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::__invoke
* @see app/Http/Controllers/SurveyQuestionController.php:24
* @route '/questions'
*/
SurveyQuestionControllerForm.head = (options) => ({
	action: SurveyQuestionController.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
SurveyQuestionController.form = SurveyQuestionControllerForm;
/**
* @see \App\Http\Controllers\SurveyQuestionController::updateTemplate
* @see app/Http/Controllers/SurveyQuestionController.php:46
* @route '/questions/templates/{template}'
*/
var updateTemplate = (args, options) => ({
	url: updateTemplate.url(args, options),
	method: "patch"
});
updateTemplate.definition = {
	methods: ["patch"],
	url: "/questions/templates/{template}"
};
/**
* @see \App\Http\Controllers\SurveyQuestionController::updateTemplate
* @see app/Http/Controllers/SurveyQuestionController.php:46
* @route '/questions/templates/{template}'
*/
updateTemplate.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { template: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { template: args.id };
	if (Array.isArray(args)) args = { template: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { template: typeof args.template === "object" ? args.template.id : args.template };
	return updateTemplate.definition.url.replace("{template}", parsedArgs.template.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\SurveyQuestionController::updateTemplate
* @see app/Http/Controllers/SurveyQuestionController.php:46
* @route '/questions/templates/{template}'
*/
updateTemplate.patch = (args, options) => ({
	url: updateTemplate.url(args, options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::updateTemplate
* @see app/Http/Controllers/SurveyQuestionController.php:46
* @route '/questions/templates/{template}'
*/
var updateTemplateForm = (args, options) => ({
	action: updateTemplate.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::updateTemplate
* @see app/Http/Controllers/SurveyQuestionController.php:46
* @route '/questions/templates/{template}'
*/
updateTemplateForm.patch = (args, options) => ({
	action: updateTemplate.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
updateTemplate.form = updateTemplateForm;
/**
* @see \App\Http\Controllers\SurveyQuestionController::exportMethod
* @see app/Http/Controllers/SurveyQuestionController.php:37
* @route '/questions/{template}/export'
*/
var exportMethod = (args, options) => ({
	url: exportMethod.url(args, options),
	method: "get"
});
exportMethod.definition = {
	methods: ["get", "head"],
	url: "/questions/{template}/export"
};
/**
* @see \App\Http\Controllers\SurveyQuestionController::exportMethod
* @see app/Http/Controllers/SurveyQuestionController.php:37
* @route '/questions/{template}/export'
*/
exportMethod.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { template: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { template: args.id };
	if (Array.isArray(args)) args = { template: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { template: typeof args.template === "object" ? args.template.id : args.template };
	return exportMethod.definition.url.replace("{template}", parsedArgs.template.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\SurveyQuestionController::exportMethod
* @see app/Http/Controllers/SurveyQuestionController.php:37
* @route '/questions/{template}/export'
*/
exportMethod.get = (args, options) => ({
	url: exportMethod.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::exportMethod
* @see app/Http/Controllers/SurveyQuestionController.php:37
* @route '/questions/{template}/export'
*/
exportMethod.head = (args, options) => ({
	url: exportMethod.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::exportMethod
* @see app/Http/Controllers/SurveyQuestionController.php:37
* @route '/questions/{template}/export'
*/
var exportMethodForm = (args, options) => ({
	action: exportMethod.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::exportMethod
* @see app/Http/Controllers/SurveyQuestionController.php:37
* @route '/questions/{template}/export'
*/
exportMethodForm.get = (args, options) => ({
	action: exportMethod.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::exportMethod
* @see app/Http/Controllers/SurveyQuestionController.php:37
* @route '/questions/{template}/export'
*/
exportMethodForm.head = (args, options) => ({
	action: exportMethod.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
exportMethod.form = exportMethodForm;
/**
* @see \App\Http\Controllers\SurveyQuestionController::show
* @see app/Http/Controllers/SurveyQuestionController.php:29
* @route '/questions/{template}'
*/
var show = (args, options) => ({
	url: show.url(args, options),
	method: "get"
});
show.definition = {
	methods: ["get", "head"],
	url: "/questions/{template}"
};
/**
* @see \App\Http\Controllers\SurveyQuestionController::show
* @see app/Http/Controllers/SurveyQuestionController.php:29
* @route '/questions/{template}'
*/
show.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { template: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { template: args.id };
	if (Array.isArray(args)) args = { template: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { template: typeof args.template === "object" ? args.template.id : args.template };
	return show.definition.url.replace("{template}", parsedArgs.template.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\SurveyQuestionController::show
* @see app/Http/Controllers/SurveyQuestionController.php:29
* @route '/questions/{template}'
*/
show.get = (args, options) => ({
	url: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::show
* @see app/Http/Controllers/SurveyQuestionController.php:29
* @route '/questions/{template}'
*/
show.head = (args, options) => ({
	url: show.url(args, options),
	method: "head"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::show
* @see app/Http/Controllers/SurveyQuestionController.php:29
* @route '/questions/{template}'
*/
var showForm = (args, options) => ({
	action: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::show
* @see app/Http/Controllers/SurveyQuestionController.php:29
* @route '/questions/{template}'
*/
showForm.get = (args, options) => ({
	action: show.url(args, options),
	method: "get"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::show
* @see app/Http/Controllers/SurveyQuestionController.php:29
* @route '/questions/{template}'
*/
showForm.head = (args, options) => ({
	action: show.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
show.form = showForm;
/**
* @see \App\Http\Controllers\SurveyQuestionController::updateUmkm
* @see app/Http/Controllers/SurveyQuestionController.php:79
* @route '/questions/umkm/{question}'
*/
var updateUmkm = (args, options) => ({
	url: updateUmkm.url(args, options),
	method: "patch"
});
updateUmkm.definition = {
	methods: ["patch"],
	url: "/questions/umkm/{question}"
};
/**
* @see \App\Http\Controllers\SurveyQuestionController::updateUmkm
* @see app/Http/Controllers/SurveyQuestionController.php:79
* @route '/questions/umkm/{question}'
*/
updateUmkm.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { question: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { question: args.id };
	if (Array.isArray(args)) args = { question: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { question: typeof args.question === "object" ? args.question.id : args.question };
	return updateUmkm.definition.url.replace("{question}", parsedArgs.question.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\SurveyQuestionController::updateUmkm
* @see app/Http/Controllers/SurveyQuestionController.php:79
* @route '/questions/umkm/{question}'
*/
updateUmkm.patch = (args, options) => ({
	url: updateUmkm.url(args, options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::updateUmkm
* @see app/Http/Controllers/SurveyQuestionController.php:79
* @route '/questions/umkm/{question}'
*/
var updateUmkmForm = (args, options) => ({
	action: updateUmkm.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::updateUmkm
* @see app/Http/Controllers/SurveyQuestionController.php:79
* @route '/questions/umkm/{question}'
*/
updateUmkmForm.patch = (args, options) => ({
	action: updateUmkm.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
updateUmkm.form = updateUmkmForm;
/**
* @see \App\Http\Controllers\SurveyQuestionController::updatePariwisata
* @see app/Http/Controllers/SurveyQuestionController.php:91
* @route '/questions/pariwisata/{question}'
*/
var updatePariwisata = (args, options) => ({
	url: updatePariwisata.url(args, options),
	method: "patch"
});
updatePariwisata.definition = {
	methods: ["patch"],
	url: "/questions/pariwisata/{question}"
};
/**
* @see \App\Http\Controllers\SurveyQuestionController::updatePariwisata
* @see app/Http/Controllers/SurveyQuestionController.php:91
* @route '/questions/pariwisata/{question}'
*/
updatePariwisata.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { question: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { question: args.id };
	if (Array.isArray(args)) args = { question: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { question: typeof args.question === "object" ? args.question.id : args.question };
	return updatePariwisata.definition.url.replace("{question}", parsedArgs.question.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\SurveyQuestionController::updatePariwisata
* @see app/Http/Controllers/SurveyQuestionController.php:91
* @route '/questions/pariwisata/{question}'
*/
updatePariwisata.patch = (args, options) => ({
	url: updatePariwisata.url(args, options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::updatePariwisata
* @see app/Http/Controllers/SurveyQuestionController.php:91
* @route '/questions/pariwisata/{question}'
*/
var updatePariwisataForm = (args, options) => ({
	action: updatePariwisata.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::updatePariwisata
* @see app/Http/Controllers/SurveyQuestionController.php:91
* @route '/questions/pariwisata/{question}'
*/
updatePariwisataForm.patch = (args, options) => ({
	action: updatePariwisata.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
updatePariwisata.form = updatePariwisataForm;
/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:67
* @route '/questions/{question}'
*/
var update = (args, options) => ({
	url: update.url(args, options),
	method: "patch"
});
update.definition = {
	methods: ["patch"],
	url: "/questions/{question}"
};
/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:67
* @route '/questions/{question}'
*/
update.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { question: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { question: args.id };
	if (Array.isArray(args)) args = { question: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { question: typeof args.question === "object" ? args.question.id : args.question };
	return update.definition.url.replace("{question}", parsedArgs.question.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:67
* @route '/questions/{question}'
*/
update.patch = (args, options) => ({
	url: update.url(args, options),
	method: "patch"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:67
* @route '/questions/{question}'
*/
var updateForm = (args, options) => ({
	action: update.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\SurveyQuestionController::update
* @see app/Http/Controllers/SurveyQuestionController.php:67
* @route '/questions/{question}'
*/
updateForm.patch = (args, options) => ({
	action: update.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
update.form = updateForm;
SurveyQuestionController.updateTemplate = updateTemplate;
SurveyQuestionController.exportMethod = exportMethod;
SurveyQuestionController.show = show;
SurveyQuestionController.updateUmkm = updateUmkm;
SurveyQuestionController.updatePariwisata = updatePariwisata;
SurveyQuestionController.update = update;
//#endregion
//#region resources/js/pages/questions/index.tsx
var aspectClasses = [
	"bg-[#EAF3FF] text-[#0066AE]",
	"bg-[#EAF8F0] text-[#00893D]",
	"bg-[#FFF4EA] text-[#C9681E]",
	"bg-[#E8FAFA] text-[#0B7778]",
	"bg-[#FDECEC] text-[#D81313]",
	"bg-[#F1EAFF] text-[#6B46C1]"
];
function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
function aspectClass(aspect) {
	return aspectClasses[Math.abs(aspect.split("").reduce((total, char) => total + char.charCodeAt(0), 0)) % aspectClasses.length];
}
function paginationLabel(label) {
	return label.replace("&laquo; Previous", "Previous").replace("Next &raquo;", "Next");
}
function StatusBadge({ children, muted = false }) {
	return /* @__PURE__ */ jsx("span", {
		className: classNames("inline-flex h-6 min-w-[48px] items-center justify-center rounded-md px-2 text-[11px] font-semibold", muted ? "bg-[#F1F5F8] text-[#303030]" : "bg-[#EAF8F0] text-[#00893D]"),
		children
	});
}
function TypeBadge({ label }) {
	return /* @__PURE__ */ jsx("span", {
		className: "inline-flex h-6 items-center rounded-md bg-[#EAF3FF] px-2 text-[11px] font-bold text-[#0066AE]",
		children: label
	});
}
function QuestionsIndex({ template, aspects, questions: questions$1, filters }) {
	const [filterForm, setFilterForm] = useState({
		search: filters.search ?? "",
		aspect: filters.aspect ?? "",
		per_page: filters.per_page?.toString() ?? "10"
	});
	const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
	const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
	const [editingQuestion, setEditingQuestion] = useState(null);
	const templateForm = useForm({
		title: template.title,
		description: template.description ?? "",
		status: template.status
	});
	const questionForm = useForm({
		survey_template_id: template.id.toString(),
		aspect: filters.aspect || aspects[0] || "",
		code: "",
		question_text: "",
		document_hint: "",
		sort_order: "",
		options: [
			"",
			"",
			"",
			""
		]
	});
	const umkmQuestionForm = useForm({
		criteria_code: "",
		criteria_name: "",
		criteria_weight_percent: "",
		question_number: "",
		question_text: "",
		question_weight_percent: "",
		max_score: "",
		help_text: "",
		sort_order: "",
		is_active: true
	});
	const pariwisataQuestionForm = useForm({
		category_code: "",
		category_name: "",
		sub_category_code: "",
		sub_category_name: "",
		criteria_code: "",
		criteria_name: "",
		criteria_description: "",
		indicator_code: "",
		indicator_name: "",
		indicator_description: "",
		supporting_evidence: "",
		input_type: "radio",
		document_required: false,
		document_hint: "",
		sort_order: "",
		is_active: true,
		options: []
	});
	const isVillageTemplate = template.type === "village";
	const aspectLabel = template.type === "umkm" ? "Kriteria" : template.type === "pariwisata" ? "Kategori" : "Aspek";
	const templateStats = [
		{
			label: "Pertanyaan",
			value: String(template.questions_count)
		},
		{
			label: aspectLabel,
			value: String(template.aspects_count)
		},
		{
			label: "Assignment",
			value: String(template.assignments_count)
		},
		{
			label: "Update",
			value: template.updated_at ?? "-"
		}
	];
	function applyFilters(event) {
		event.preventDefault();
		router.get(show$1.url(template.id), {
			search: filterForm.search || void 0,
			aspect: filterForm.aspect || void 0,
			per_page: filterForm.per_page || void 0
		}, {
			preserveState: true,
			preserveScroll: true,
			replace: true
		});
	}
	function resetFilters() {
		setFilterForm({
			search: "",
			aspect: "",
			per_page: filters.per_page?.toString() ?? "10"
		});
		router.get(show$1.url(template.id), { per_page: filters.per_page || void 0 }, {
			preserveState: true,
			preserveScroll: true,
			replace: true
		});
	}
	function visitPage(url) {
		if (!url) return;
		const normalizedUrl = (() => {
			try {
				const parsed = new URL(url, window.location.origin);
				return `${parsed.pathname}${parsed.search}${parsed.hash}`;
			} catch {
				return url;
			}
		})();
		router.visit(normalizedUrl, {
			preserveScroll: true,
			preserveState: true
		});
	}
	function exportExcel() {
		window.location.href = exportMethod$1.url(template.id);
	}
	function openTemplateModal() {
		templateForm.setData({
			title: template.title,
			description: template.description ?? "",
			status: template.status
		});
		templateForm.clearErrors();
		setIsTemplateModalOpen(true);
	}
	function openCreateQuestionModal() {
		questionForm.setData({
			survey_template_id: template.id.toString(),
			aspect: filters.aspect || aspects[0] || "",
			code: "",
			question_text: "",
			document_hint: "",
			sort_order: "",
			options: [
				"",
				"",
				"",
				""
			]
		});
		questionForm.clearErrors();
		setEditingQuestion(null);
		setIsQuestionModalOpen(true);
	}
	function openEditQuestionModal(question) {
		if (question.raw_type === "umkm") {
			const editable = question.editable;
			umkmQuestionForm.setData({
				criteria_code: editable.criteria_code ?? "",
				criteria_name: editable.criteria_name ?? "",
				criteria_weight_percent: editable.criteria_weight_percent?.toString() ?? "",
				question_number: editable.question_number?.toString() ?? "",
				question_text: editable.question_text ?? "",
				question_weight_percent: editable.question_weight_percent?.toString() ?? "",
				max_score: editable.max_score?.toString() ?? "",
				help_text: editable.help_text ?? "",
				sort_order: editable.sort_order?.toString() ?? "",
				is_active: editable.is_active
			});
			umkmQuestionForm.clearErrors();
			setEditingQuestion(question);
			setIsQuestionModalOpen(true);
			return;
		}
		if (question.raw_type === "pariwisata") {
			const editable = question.editable;
			pariwisataQuestionForm.setData({
				category_code: editable.category_code ?? "",
				category_name: editable.category_name ?? "",
				sub_category_code: editable.sub_category_code ?? "",
				sub_category_name: editable.sub_category_name ?? "",
				criteria_code: editable.criteria_code ?? "",
				criteria_name: editable.criteria_name ?? "",
				criteria_description: editable.criteria_description ?? "",
				indicator_code: editable.indicator_code ?? "",
				indicator_name: editable.indicator_name ?? "",
				indicator_description: editable.indicator_description ?? "",
				supporting_evidence: editable.supporting_evidence ?? "",
				input_type: editable.input_type ?? "radio",
				document_required: editable.document_required,
				document_hint: editable.document_hint ?? "",
				sort_order: editable.sort_order?.toString() ?? "",
				is_active: editable.is_active,
				options: editable.options.map((option) => ({
					id: option.id.toString(),
					score: option.score.toString(),
					level: option.level ?? "",
					label: option.label,
					description: option.description ?? "",
					sort_order: option.sort_order?.toString() ?? ""
				}))
			});
			pariwisataQuestionForm.clearErrors();
			setEditingQuestion(question);
			setIsQuestionModalOpen(true);
			return;
		}
		questionForm.setData({
			survey_template_id: template.id.toString(),
			aspect: question.aspect,
			code: question.code ?? "",
			question_text: question.question_text,
			document_hint: question.document_hint ?? "",
			sort_order: question.no?.toString() ?? "",
			options: [
				1,
				2,
				3,
				4
			].map((score) => question.options.find((option) => option.score === score)?.label ?? "")
		});
		questionForm.clearErrors();
		setEditingQuestion(question);
		setIsQuestionModalOpen(true);
	}
	function updateOption(index, value) {
		questionForm.setData("options", questionForm.data.options.map((option, optionIndex) => optionIndex === index ? value : option));
	}
	function updatePariwisataOption(index, key, value) {
		pariwisataQuestionForm.setData("options", pariwisataQuestionForm.data.options.map((option, optionIndex) => optionIndex === index ? {
			...option,
			[key]: value
		} : option));
	}
	function addPariwisataOption() {
		pariwisataQuestionForm.setData("options", [...pariwisataQuestionForm.data.options, {
			id: "",
			score: "",
			level: "",
			label: "",
			description: "",
			sort_order: (pariwisataQuestionForm.data.options.length + 1).toString()
		}]);
	}
	function removePariwisataOption(index) {
		pariwisataQuestionForm.setData("options", pariwisataQuestionForm.data.options.filter((_option, optionIndex) => optionIndex !== index));
	}
	function submitTemplate(event) {
		event.preventDefault();
		templateForm.patch(SurveyQuestionController.updateTemplate.url(template.id), {
			preserveScroll: true,
			onSuccess: () => setIsTemplateModalOpen(false)
		});
	}
	function submitQuestion(event) {
		event.preventDefault();
		const options = {
			preserveScroll: true,
			onSuccess: () => setIsQuestionModalOpen(false)
		};
		if (editingQuestion) {
			if (editingQuestion.raw_type === "umkm") {
				umkmQuestionForm.patch(SurveyQuestionController.updateUmkm.url(editingQuestion.id), options);
				return;
			}
			if (editingQuestion.raw_type === "pariwisata") {
				pariwisataQuestionForm.patch(SurveyQuestionController.updatePariwisata.url(editingQuestion.id), options);
				return;
			}
			questionForm.patch(SurveyQuestionController.update.url(editingQuestion.id), options);
			return;
		}
		questionForm.post(SurveyQuestionController.url(), options);
	}
	const questionErrors = questionForm.errors;
	const umkmQuestionErrors = umkmQuestionForm.errors;
	const pariwisataQuestionErrors = pariwisataQuestionForm.errors;
	const isQuestionProcessing = questionForm.processing || umkmQuestionForm.processing || pariwisataQuestionForm.processing;
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Head, { title: "Detail Template Survey" }),
		/* @__PURE__ */ jsx("main", {
			className: "min-h-[calc(100dvh-60px)] bg-[#F7F7F7] px-4 py-5 text-[#303030] sm:px-5 lg:px-6",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-[1500px] space-y-4",
				children: [
					/* @__PURE__ */ jsxs("header", {
						className: "flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ jsxs("nav", {
									className: "mb-2 flex flex-wrap items-center gap-2 text-xs font-bold text-[#0066AE]",
									children: [
										/* @__PURE__ */ jsx("span", { children: "Dashboard" }),
										/* @__PURE__ */ jsx("span", {
											className: "text-[#7C7C7C]",
											children: "/"
										}),
										/* @__PURE__ */ jsx("span", { children: "Template Survey" }),
										/* @__PURE__ */ jsx("span", {
											className: "text-[#7C7C7C]",
											children: "/"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "text-[#7C7C7C]",
											children: "Detail Template"
										})
									]
								}),
								/* @__PURE__ */ jsx("h1", {
									className: "text-[26px] leading-8 font-bold tracking-[-0.01em] text-[#303030] md:text-[30px] md:leading-9",
									children: "Detail Template Survey"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm leading-6 text-[#7C7C7C]",
									children: "Lihat informasi template, kelola pertanyaan survey, dan telusuri detail rubrik penilaian."
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 gap-2 sm:grid-cols-2 xl:flex",
							children: [
								/* @__PURE__ */ jsx(Link, {
									href: questions.url(),
									className: "inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#AAD2F8] bg-white px-5 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F5F8]",
									children: "Kembali"
								}),
								/* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: exportExcel,
									className: "inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#AAD2F8] bg-white px-5 text-sm font-bold text-[#0066AE] transition hover:bg-[#F1F5F8]",
									children: [/* @__PURE__ */ jsx(Download, { className: "size-4" }), "Export Excel"]
								}),
								isVillageTemplate && /* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: openCreateQuestionModal,
									className: "inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white shadow-[0_6px_14px_rgba(0,102,174,0.18)] transition hover:bg-[#093967] disabled:cursor-not-allowed disabled:opacity-50",
									children: [/* @__PURE__ */ jsx(Plus, { className: "size-4" }), "Tambah Pertanyaan"]
								})
							]
						})]
					}),
					/* @__PURE__ */ jsx("section", {
						className: "rounded-xl border border-[#EFEFEF] bg-white px-4 py-3 shadow-[0_4px_14px_rgba(3,17,32,0.05)]",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex min-w-0 items-center gap-3",
								children: [/* @__PURE__ */ jsx("div", {
									className: "flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#F1F5F8] text-[#0066AE]",
									children: /* @__PURE__ */ jsx(ClipboardList, {
										className: "size-5",
										strokeWidth: 1.8
									})
								}), /* @__PURE__ */ jsxs("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [
											/* @__PURE__ */ jsx("h2", {
												className: "truncate text-[15px] leading-5 font-bold text-[#303030]",
												children: template.title
											}),
											/* @__PURE__ */ jsx(StatusBadge, {
												muted: template.status !== "published",
												children: template.status
											}),
											/* @__PURE__ */ jsx(TypeBadge, { label: template.type_label })
										]
									}), /* @__PURE__ */ jsx("p", {
										className: "mt-1 line-clamp-1 text-xs leading-5 text-[#7C7C7C]",
										children: template.description ?? "Template survey untuk assessment Desa/Kampung Wisata."
									})]
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between xl:justify-end",
								children: [/* @__PURE__ */ jsx("div", {
									className: "grid grid-cols-2 gap-2 sm:flex",
									children: templateStats.map((stat) => /* @__PURE__ */ jsxs("div", {
										className: "rounded-lg bg-[#F7F7F7] px-3 py-2",
										children: [/* @__PURE__ */ jsx("p", {
											className: "text-[10px] font-semibold text-[#7C7C7C]",
											children: stat.label
										}), /* @__PURE__ */ jsx("p", {
											className: "text-xs font-bold text-[#303030]",
											children: stat.value
										})]
									}, stat.label))
								}), /* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: openTemplateModal,
									className: "inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#0066AE] bg-white px-3 text-xs font-bold text-[#0066AE] transition hover:bg-[#F1F5F8]",
									children: [/* @__PURE__ */ jsx(Edit3, { className: "size-3.5" }), "Edit"]
								})]
							})]
						})
					}),
					/* @__PURE__ */ jsx("form", {
						onSubmit: applyFilters,
						className: "rounded-xl border border-[#EFEFEF] bg-white p-4 shadow-[0_4px_14px_rgba(3,17,32,0.05)]",
						children: /* @__PURE__ */ jsxs("div", {
							className: "grid items-end gap-3 md:grid-cols-2 xl:grid-cols-[minmax(260px,1.4fr)_minmax(170px,0.8fr)_auto_auto]",
							children: [
								/* @__PURE__ */ jsxs("label", {
									className: "space-y-1",
									children: [/* @__PURE__ */ jsx("span", {
										className: "block text-[11px] font-semibold text-[#7C7C7C]",
										children: "Pencarian"
									}), /* @__PURE__ */ jsxs("span", {
										className: "flex h-10 min-w-0 items-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 text-[#7C7C7C]",
										children: [/* @__PURE__ */ jsx(Search, { className: "size-4" }), /* @__PURE__ */ jsx("input", {
											className: "min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#7C7C7C]",
											placeholder: "Cari pertanyaan survey...",
											value: filterForm.search,
											onChange: (event) => setFilterForm((current) => ({
												...current,
												search: event.target.value
											}))
										})]
									})]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "space-y-1",
									children: [/* @__PURE__ */ jsx("span", {
										className: "block text-[11px] font-semibold text-[#7C7C7C]",
										children: aspectLabel
									}), /* @__PURE__ */ jsxs("select", {
										className: "h-10 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold text-[#303030] outline-none focus:border-[#0066AE]",
										value: filterForm.aspect,
										onChange: (event) => setFilterForm((current) => ({
											...current,
											aspect: event.target.value
										})),
										children: [/* @__PURE__ */ jsxs("option", {
											value: "",
											children: ["Semua ", aspectLabel]
										}), aspects.map((aspect) => /* @__PURE__ */ jsx("option", {
											value: aspect,
											children: aspect
										}, aspect))]
									})]
								}),
								/* @__PURE__ */ jsx("button", {
									className: "h-10 rounded-lg bg-[#0066AE] px-5 text-sm font-bold text-white shadow-[0_5px_12px_rgba(0,102,174,0.16)]",
									children: "Terapkan Filter"
								}),
								/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: resetFilters,
									className: "h-10 rounded-lg border border-[#AAD2F8] bg-white px-5 text-sm font-bold text-[#0066AE]",
									children: "Reset"
								})
							]
						})
					}),
					/* @__PURE__ */ jsxs("section", {
						className: "rounded-xl border border-[#EFEFEF] bg-white shadow-[0_4px_14px_rgba(3,17,32,0.06)]",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-3 border-b border-[#EFEFEF] px-5 py-4 md:flex-row md:items-end md:justify-between",
								children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
									className: "text-xl leading-7 font-bold text-[#303030]",
									children: "Daftar Pertanyaan Survey"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-sm leading-5 text-[#7C7C7C]",
									children: "Berikut daftar pertanyaan yang digunakan dalam template assessment desa wisata ini."
								})] }), /* @__PURE__ */ jsxs("div", {
									className: "text-sm font-bold text-[#0066AE]",
									children: [questions$1.total, " pertanyaan"]
								})]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "hidden overflow-x-auto md:block",
								children: /* @__PURE__ */ jsxs("table", {
									className: "w-full min-w-[820px] border-collapse text-left text-sm",
									children: [/* @__PURE__ */ jsx("thead", {
										className: "bg-[#F1F5F8] text-[12px] text-[#0066AE]",
										children: /* @__PURE__ */ jsx("tr", { children: [
											"No",
											"Kode",
											"Pertanyaan",
											aspectLabel,
											"Terakhir Diperbarui",
											"Aksi"
										].map((head) => /* @__PURE__ */ jsx("th", {
											className: "px-3 py-3 font-bold whitespace-nowrap",
											children: head
										}, head)) })
									}), /* @__PURE__ */ jsx("tbody", {
										className: "divide-y divide-[#EFEFEF]",
										children: questions$1.data.map((question, index) => /* @__PURE__ */ jsxs("tr", {
											className: "hover:bg-[#FAFCFF]",
											children: [
												/* @__PURE__ */ jsx("td", {
													className: "px-3 py-3 align-top font-semibold text-[#303030]",
													children: question.no || questions$1.from + index
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-3 py-3 align-top font-bold text-[#303030]",
													children: question.code ?? "-"
												}),
												/* @__PURE__ */ jsxs("td", {
													className: "max-w-[480px] px-3 py-3 align-top",
													children: [
														/* @__PURE__ */ jsx("p", {
															className: "leading-5 font-bold text-[#303030]",
															children: question.question_text
														}),
														question.document_hint && /* @__PURE__ */ jsxs("p", {
															className: "mt-1 text-xs leading-5 text-[#7C7C7C]",
															children: [
																"Dokumen:",
																" ",
																question.document_hint
															]
														}),
														question.description && /* @__PURE__ */ jsx("p", {
															className: "mt-1 text-xs leading-5 text-[#64748B]",
															children: question.description
														}),
														question.supporting_evidence && question.supporting_evidence !== question.document_hint && /* @__PURE__ */ jsxs("p", {
															className: "mt-1 text-xs leading-5 text-[#7C7C7C]",
															children: [
																"Bukti pendukung:",
																" ",
																question.supporting_evidence
															]
														}),
														/* @__PURE__ */ jsxs("div", {
															className: "mt-2 flex flex-wrap gap-1.5",
															children: [
																/* @__PURE__ */ jsx("span", {
																	className: "rounded-md bg-[#F1F5F8] px-2 py-1 text-[11px] font-bold text-[#0066AE]",
																	children: question.type
																}),
																question.weight_label && /* @__PURE__ */ jsxs("span", {
																	className: "rounded-md bg-[#EAF8F0] px-2 py-1 text-[11px] font-bold text-[#00893D]",
																	children: [
																		"Bobot:",
																		" ",
																		question.weight_label
																	]
																}),
																question.max_score_label && /* @__PURE__ */ jsxs("span", {
																	className: "rounded-md bg-[#FFF4EA] px-2 py-1 text-[11px] font-bold text-[#C9681E]",
																	children: [
																		"Maks:",
																		" ",
																		question.max_score_label
																	]
																})
															]
														})
													]
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-3 py-3 align-top",
													children: /* @__PURE__ */ jsx("span", {
														className: classNames("inline-flex rounded-md px-2.5 py-1 text-[11px] font-semibold", aspectClass(question.aspect)),
														children: question.aspect
													})
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-3 py-3 align-top font-semibold text-[#303030]",
													children: question.updated_date ?? "-"
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-3 py-3 align-top",
													children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
														asChild: true,
														children: /* @__PURE__ */ jsx("button", {
															className: "flex size-8 items-center justify-center rounded-md border border-[#AAD2F8] bg-[#F1F5F8] text-[#0066AE]",
															children: /* @__PURE__ */ jsx(MoreVertical, { className: "size-4" })
														})
													}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
														align: "end",
														className: "w-48 rounded-lg border-[#EFEFEF] bg-white text-xs shadow-[0_12px_30px_rgba(3,17,32,0.14)]",
														children: [
															/* @__PURE__ */ jsxs(DropdownMenuItem, {
																className: "gap-2 text-xs font-semibold",
																children: [/* @__PURE__ */ jsx(Eye, { className: "size-4 text-[#303030]" }), "Lihat Detail"]
															}),
															/* @__PURE__ */ jsxs(DropdownMenuItem, {
																className: "gap-2 text-xs",
																onSelect: () => openEditQuestionModal(question),
																children: [/* @__PURE__ */ jsx(Edit3, { className: "size-4 text-[#0066AE]" }), "Edit Pertanyaan"]
															}),
															isVillageTemplate && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(DropdownMenuSeparator, {}), /* @__PURE__ */ jsxs(DropdownMenuItem, {
																className: "gap-2 text-xs font-semibold text-[#D81313]",
																children: [/* @__PURE__ */ jsx(Trash2, { className: "size-4 text-[#D81313]" }), "Hapus Pertanyaan"]
															})] })
														]
													})] })
												})
											]
										}, question.id))
									})]
								})
							}),
							/* @__PURE__ */ jsx("div", {
								className: "space-y-3 p-4 md:hidden",
								children: questions$1.data.map((question) => /* @__PURE__ */ jsxs("article", {
									className: "rounded-xl border border-[#EFEFEF] bg-white p-4 shadow-[0_3px_10px_rgba(3,17,32,0.05)]",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-start justify-between gap-3",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "min-w-0",
												children: [/* @__PURE__ */ jsx("p", {
													className: "text-xs font-bold text-[#0066AE]",
													children: question.code ?? `Q${question.id}`
												}), /* @__PURE__ */ jsx("h3", {
													className: "mt-1 text-sm leading-5 font-bold text-[#303030]",
													children: question.question_text
												})]
											}), /* @__PURE__ */ jsx("span", {
												className: classNames("shrink-0 rounded-md px-2 py-1 text-[11px] font-semibold", aspectClass(question.aspect)),
												children: question.aspect
											})]
										}),
										question.document_hint && /* @__PURE__ */ jsxs("p", {
											className: "mt-2 text-xs leading-5 text-[#7C7C7C]",
											children: ["Dokumen: ", question.document_hint]
										}),
										question.description && /* @__PURE__ */ jsx("p", {
											className: "mt-2 text-xs leading-5 text-[#64748B]",
											children: question.description
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "mt-3 flex flex-wrap gap-1.5",
											children: [
												/* @__PURE__ */ jsx("span", {
													className: "rounded-md bg-[#F1F5F8] px-2 py-1 text-[11px] font-bold text-[#0066AE]",
													children: question.type
												}),
												question.weight_label && /* @__PURE__ */ jsxs("span", {
													className: "rounded-md bg-[#EAF8F0] px-2 py-1 text-[11px] font-bold text-[#00893D]",
													children: ["Bobot: ", question.weight_label]
												}),
												question.max_score_label && /* @__PURE__ */ jsxs("span", {
													className: "rounded-md bg-[#FFF4EA] px-2 py-1 text-[11px] font-bold text-[#C9681E]",
													children: ["Maks: ", question.max_score_label]
												})
											]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "mt-3 grid grid-cols-1 gap-2 text-xs",
											children: /* @__PURE__ */ jsxs("div", { children: [
												/* @__PURE__ */ jsx("span", {
													className: "font-bold text-[#303030]",
													children: question.updated_date ?? "-"
												}),
												/* @__PURE__ */ jsx("br", {}),
												/* @__PURE__ */ jsx("span", {
													className: "text-[#7C7C7C]",
													children: "Diperbarui"
												})
											] })
										}),
										/* @__PURE__ */ jsx("div", {
											className: "mt-4 flex justify-end",
											children: /* @__PURE__ */ jsxs("button", {
												type: "button",
												onClick: () => openEditQuestionModal(question),
												className: "inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#0066AE] bg-white px-3 text-xs font-bold text-[#0066AE]",
												children: [/* @__PURE__ */ jsx(Edit3, { className: "size-3.5" }), "Edit"]
											})
										})
									]
								}, question.id))
							}),
							questions$1.data.length === 0 && /* @__PURE__ */ jsxs("div", {
								className: "border-t border-[#EFEFEF] px-5 py-10 text-center",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-sm font-bold text-[#303030]",
									children: "Pertanyaan tidak ditemukan."
								}), /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-xs text-[#7C7C7C]",
									children: "Ubah filter atau kata kunci pencarian."
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-3 border-t border-[#EFEFEF] px-5 py-4 text-sm text-[#7C7C7C] xl:flex-row xl:items-center xl:justify-between",
								children: [/* @__PURE__ */ jsxs("span", { children: [
									"Menampilkan ",
									questions$1.from ?? 0,
									"-",
									questions$1.to ?? 0,
									" dari ",
									questions$1.total,
									" ",
									"pertanyaan"
								] }), /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end",
									children: [/* @__PURE__ */ jsxs("label", {
										className: "flex items-center gap-2 text-xs font-semibold text-[#7C7C7C]",
										children: ["Per halaman", /* @__PURE__ */ jsx("select", {
											className: "h-9 rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-bold text-[#303030] outline-none focus:border-[#0066AE]",
											value: filterForm.per_page,
											onChange: (event) => {
												const perPage = event.target.value;
												setFilterForm((current) => ({
													...current,
													per_page: perPage
												}));
												router.get(show$1.url(template.id), {
													search: filterForm.search || void 0,
													aspect: filterForm.aspect || void 0,
													per_page: perPage
												}, {
													preserveState: true,
													preserveScroll: true,
													replace: true
												});
											},
											children: [
												10,
												25,
												50
											].map((size) => /* @__PURE__ */ jsx("option", {
												value: size,
												children: size
											}, size))
										})]
									}), /* @__PURE__ */ jsx("div", {
										className: "flex flex-wrap gap-2",
										children: questions$1.links.map((link, index) => /* @__PURE__ */ jsx("button", {
											type: "button",
											disabled: !link.url,
											onClick: () => visitPage(link.url),
											className: classNames("h-9 rounded-lg border px-3 text-sm font-semibold", link.active ? "border-[#0066AE] bg-[#0066AE] text-white" : "border-[#DDE4EC] bg-white text-[#303030]", !link.url && "cursor-not-allowed opacity-50"),
											children: paginationLabel(link.label)
										}, `${link.label}-${index}`))
									})]
								})]
							})
						]
					})
				]
			})
		}),
		/* @__PURE__ */ jsx(Dialog, {
			open: isTemplateModalOpen,
			onOpenChange: setIsTemplateModalOpen,
			children: /* @__PURE__ */ jsxs(DialogContent, {
				className: "border-[#EFEFEF] bg-white sm:max-w-xl",
				children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, {
					className: "text-[#303030]",
					children: "Edit Template Survey"
				}), /* @__PURE__ */ jsx(DialogDescription, { children: "Perbarui judul, deskripsi, dan status template." })] }), /* @__PURE__ */ jsxs("form", {
					onSubmit: submitTemplate,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ jsxs("label", {
							className: "space-y-1.5",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-xs font-bold text-[#303030]",
									children: "Judul Template"
								}),
								/* @__PURE__ */ jsx("input", {
									value: templateForm.data.title,
									onChange: (event) => templateForm.setData("title", event.target.value),
									className: "h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm outline-none focus:border-[#0066AE]"
								}),
								/* @__PURE__ */ jsx(FieldError, { message: templateForm.errors.title })
							]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "space-y-1.5",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-xs font-bold text-[#303030]",
									children: "Deskripsi"
								}),
								/* @__PURE__ */ jsx("textarea", {
									value: templateForm.data.description,
									onChange: (event) => templateForm.setData("description", event.target.value),
									rows: 4,
									className: "w-full resize-none rounded-lg border border-[#DDE4EC] px-3 py-2 text-sm outline-none focus:border-[#0066AE]"
								}),
								/* @__PURE__ */ jsx(FieldError, { message: templateForm.errors.description })
							]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "space-y-1.5",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-xs font-bold text-[#303030]",
									children: "Status"
								}),
								/* @__PURE__ */ jsxs("select", {
									value: templateForm.data.status,
									onChange: (event) => templateForm.setData("status", event.target.value),
									className: "h-10 w-full rounded-lg border border-[#DDE4EC] bg-white px-3 text-sm font-semibold outline-none focus:border-[#0066AE]",
									children: [
										/* @__PURE__ */ jsx("option", {
											value: "draft",
											children: "Draft"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "published",
											children: "Published"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "archived",
											children: "Archived"
										})
									]
								}),
								/* @__PURE__ */ jsx(FieldError, { message: templateForm.errors.status })
							]
						}),
						/* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => setIsTemplateModalOpen(false),
							className: "h-10 rounded-lg border border-[#DDE4EC] bg-white px-4 text-sm font-bold text-[#303030]",
							children: "Batal"
						}), /* @__PURE__ */ jsx("button", {
							type: "submit",
							disabled: templateForm.processing,
							className: "h-10 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white disabled:opacity-60",
							children: "Simpan Template"
						})] })
					]
				})]
			})
		}),
		/* @__PURE__ */ jsx(Dialog, {
			open: isQuestionModalOpen,
			onOpenChange: setIsQuestionModalOpen,
			children: /* @__PURE__ */ jsxs(DialogContent, {
				className: "max-h-[90dvh] overflow-y-auto border-[#EFEFEF] bg-white sm:max-w-2xl",
				children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, {
					className: "text-[#303030]",
					children: editingQuestion ? "Edit Pertanyaan" : "Tambah Pertanyaan"
				}), /* @__PURE__ */ jsx(DialogDescription, { children: "Isi data pertanyaan dan empat kriteria skor." })] }), /* @__PURE__ */ jsxs("form", {
					onSubmit: submitQuestion,
					className: "space-y-4",
					children: [
						(!editingQuestion || editingQuestion.raw_type === "village") && /* @__PURE__ */ jsxs(Fragment, { children: [
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-3 sm:grid-cols-3",
								children: [/* @__PURE__ */ jsxs("label", {
									className: "space-y-1.5 sm:col-span-2",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "text-xs font-bold text-[#303030]",
											children: "Aspek"
										}),
										/* @__PURE__ */ jsx("input", {
											list: "question-aspects",
											value: questionForm.data.aspect,
											onChange: (event) => questionForm.setData("aspect", event.target.value),
											className: "h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm outline-none focus:border-[#0066AE]"
										}),
										/* @__PURE__ */ jsx("datalist", {
											id: "question-aspects",
											children: aspects.map((aspect) => /* @__PURE__ */ jsx("option", { value: aspect }, aspect))
										}),
										/* @__PURE__ */ jsx(FieldError, { message: questionErrors.aspect })
									]
								}), /* @__PURE__ */ jsxs("label", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "text-xs font-bold text-[#303030]",
											children: "Kode"
										}),
										/* @__PURE__ */ jsx("input", {
											value: questionForm.data.code,
											onChange: (event) => questionForm.setData("code", event.target.value),
											placeholder: "Q062",
											className: "h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm outline-none focus:border-[#0066AE]"
										}),
										/* @__PURE__ */ jsx(FieldError, { message: questionErrors.code })
									]
								})]
							}),
							/* @__PURE__ */ jsxs("label", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "text-xs font-bold text-[#303030]",
										children: "Pertanyaan"
									}),
									/* @__PURE__ */ jsx("textarea", {
										value: questionForm.data.question_text,
										onChange: (event) => questionForm.setData("question_text", event.target.value),
										rows: 4,
										className: "w-full resize-none rounded-lg border border-[#DDE4EC] px-3 py-2 text-sm outline-none focus:border-[#0066AE]"
									}),
									/* @__PURE__ */ jsx(FieldError, { message: questionErrors.question_text })
								]
							}),
							/* @__PURE__ */ jsxs("label", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "text-xs font-bold text-[#303030]",
										children: "Dokumen yang Disiapkan"
									}),
									/* @__PURE__ */ jsx("textarea", {
										value: questionForm.data.document_hint,
										onChange: (event) => questionForm.setData("document_hint", event.target.value),
										rows: 3,
										className: "w-full resize-none rounded-lg border border-[#DDE4EC] px-3 py-2 text-sm outline-none focus:border-[#0066AE]"
									}),
									/* @__PURE__ */ jsx(FieldError, { message: questionErrors.document_hint })
								]
							}),
							/* @__PURE__ */ jsxs("label", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "text-xs font-bold text-[#303030]",
										children: "Urutan"
									}),
									/* @__PURE__ */ jsx("input", {
										type: "number",
										min: 1,
										value: questionForm.data.sort_order,
										onChange: (event) => questionForm.setData("sort_order", event.target.value),
										placeholder: "Otomatis jika kosong",
										className: "h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm outline-none focus:border-[#0066AE]"
									}),
									/* @__PURE__ */ jsx(FieldError, { message: questionErrors.sort_order })
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-3 rounded-xl border border-[#EFEFEF] bg-[#F8FAFC] p-3",
								children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "text-xs font-bold text-[#303030]",
									children: "Kriteria Skor"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-[11px] text-[#7C7C7C]",
									children: "Score otomatis 1 sampai 4 berdasarkan urutan."
								})] }), questionForm.data.options.map((option, index) => /* @__PURE__ */ jsxs("label", {
									className: "grid gap-2 sm:grid-cols-[72px_minmax(0,1fr)]",
									children: [/* @__PURE__ */ jsxs("span", {
										className: "flex h-10 items-center text-xs font-bold text-[#0066AE]",
										children: ["Skor ", index + 1]
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("textarea", {
										value: option,
										onChange: (event) => updateOption(index, event.target.value),
										rows: 2,
										className: "w-full resize-none rounded-lg border border-[#DDE4EC] bg-white px-3 py-2 text-sm outline-none focus:border-[#0066AE]"
									}), /* @__PURE__ */ jsx(FieldError, { message: questionErrors[`options.${index}`] })] })]
								}, index))]
							})
						] }),
						editingQuestion?.raw_type === "umkm" && /* @__PURE__ */ jsxs(Fragment, { children: [
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-3 sm:grid-cols-3",
								children: [
									/* @__PURE__ */ jsx(TextField, {
										label: "Kode Kriteria",
										value: umkmQuestionForm.data.criteria_code,
										onChange: (value) => umkmQuestionForm.setData("criteria_code", value),
										error: umkmQuestionErrors.criteria_code
									}),
									/* @__PURE__ */ jsx(TextField, {
										label: "Nomor Pertanyaan",
										type: "number",
										value: umkmQuestionForm.data.question_number,
										onChange: (value) => umkmQuestionForm.setData("question_number", value),
										error: umkmQuestionErrors.question_number
									}),
									/* @__PURE__ */ jsx(TextField, {
										label: "Urutan",
										type: "number",
										value: umkmQuestionForm.data.sort_order,
										onChange: (value) => umkmQuestionForm.setData("sort_order", value),
										error: umkmQuestionErrors.sort_order
									})
								]
							}),
							/* @__PURE__ */ jsx(TextField, {
								label: "Nama Kriteria",
								value: umkmQuestionForm.data.criteria_name,
								onChange: (value) => umkmQuestionForm.setData("criteria_name", value),
								error: umkmQuestionErrors.criteria_name
							}),
							/* @__PURE__ */ jsx(TextAreaField, {
								label: "Pertanyaan",
								value: umkmQuestionForm.data.question_text,
								onChange: (value) => umkmQuestionForm.setData("question_text", value),
								error: umkmQuestionErrors.question_text
							}),
							/* @__PURE__ */ jsx(TextAreaField, {
								label: "Bantuan / Dokumen Pendukung",
								value: umkmQuestionForm.data.help_text,
								onChange: (value) => umkmQuestionForm.setData("help_text", value),
								error: umkmQuestionErrors.help_text,
								rows: 3
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-3 sm:grid-cols-3",
								children: [
									/* @__PURE__ */ jsx(TextField, {
										label: "Bobot Kriteria (%)",
										type: "number",
										value: umkmQuestionForm.data.criteria_weight_percent,
										onChange: (value) => umkmQuestionForm.setData("criteria_weight_percent", value),
										error: umkmQuestionErrors.criteria_weight_percent
									}),
									/* @__PURE__ */ jsx(TextField, {
										label: "Bobot Pertanyaan (%)",
										type: "number",
										value: umkmQuestionForm.data.question_weight_percent,
										onChange: (value) => umkmQuestionForm.setData("question_weight_percent", value),
										error: umkmQuestionErrors.question_weight_percent
									}),
									/* @__PURE__ */ jsx(TextField, {
										label: "Skor Maksimal",
										type: "number",
										value: umkmQuestionForm.data.max_score,
										onChange: (value) => umkmQuestionForm.setData("max_score", value),
										error: umkmQuestionErrors.max_score
									})
								]
							}),
							/* @__PURE__ */ jsx(CheckField, {
								label: "Pertanyaan aktif",
								checked: umkmQuestionForm.data.is_active,
								onChange: (checked) => umkmQuestionForm.setData("is_active", checked)
							})
						] }),
						editingQuestion?.raw_type === "pariwisata" && /* @__PURE__ */ jsxs(Fragment, { children: [
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ jsx(TextField, {
										label: "Kode Kategori",
										value: pariwisataQuestionForm.data.category_code,
										onChange: (value) => pariwisataQuestionForm.setData("category_code", value),
										error: pariwisataQuestionErrors.category_code
									}),
									/* @__PURE__ */ jsx(TextField, {
										label: "Nama Kategori",
										value: pariwisataQuestionForm.data.category_name,
										onChange: (value) => pariwisataQuestionForm.setData("category_name", value),
										error: pariwisataQuestionErrors.category_name
									}),
									/* @__PURE__ */ jsx(TextField, {
										label: "Kode Sub Kategori",
										value: pariwisataQuestionForm.data.sub_category_code,
										onChange: (value) => pariwisataQuestionForm.setData("sub_category_code", value),
										error: pariwisataQuestionErrors.sub_category_code
									}),
									/* @__PURE__ */ jsx(TextField, {
										label: "Nama Sub Kategori",
										value: pariwisataQuestionForm.data.sub_category_name,
										onChange: (value) => pariwisataQuestionForm.setData("sub_category_name", value),
										error: pariwisataQuestionErrors.sub_category_name
									}),
									/* @__PURE__ */ jsx(TextField, {
										label: "Kode Kriteria",
										value: pariwisataQuestionForm.data.criteria_code,
										onChange: (value) => pariwisataQuestionForm.setData("criteria_code", value),
										error: pariwisataQuestionErrors.criteria_code
									}),
									/* @__PURE__ */ jsx(TextField, {
										label: "Nama Kriteria",
										value: pariwisataQuestionForm.data.criteria_name,
										onChange: (value) => pariwisataQuestionForm.setData("criteria_name", value),
										error: pariwisataQuestionErrors.criteria_name
									})
								]
							}),
							/* @__PURE__ */ jsx(TextAreaField, {
								label: "Deskripsi Kriteria",
								value: pariwisataQuestionForm.data.criteria_description,
								onChange: (value) => pariwisataQuestionForm.setData("criteria_description", value),
								error: pariwisataQuestionErrors.criteria_description,
								rows: 3
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-3 sm:grid-cols-3",
								children: [
									/* @__PURE__ */ jsx(TextField, {
										label: "Kode Indikator",
										value: pariwisataQuestionForm.data.indicator_code,
										onChange: (value) => pariwisataQuestionForm.setData("indicator_code", value),
										error: pariwisataQuestionErrors.indicator_code
									}),
									/* @__PURE__ */ jsx(TextField, {
										label: "Tipe Input",
										value: pariwisataQuestionForm.data.input_type,
										onChange: (value) => pariwisataQuestionForm.setData("input_type", value),
										error: pariwisataQuestionErrors.input_type
									}),
									/* @__PURE__ */ jsx(TextField, {
										label: "Urutan",
										type: "number",
										value: pariwisataQuestionForm.data.sort_order,
										onChange: (value) => pariwisataQuestionForm.setData("sort_order", value),
										error: pariwisataQuestionErrors.sort_order
									})
								]
							}),
							/* @__PURE__ */ jsx(TextAreaField, {
								label: "Pertanyaan Utama / Indikator",
								value: pariwisataQuestionForm.data.indicator_name,
								onChange: (value) => pariwisataQuestionForm.setData("indicator_name", value),
								error: pariwisataQuestionErrors.indicator_name
							}),
							/* @__PURE__ */ jsx(TextAreaField, {
								label: "Deskripsi Indikator",
								value: pariwisataQuestionForm.data.indicator_description,
								onChange: (value) => pariwisataQuestionForm.setData("indicator_description", value),
								error: pariwisataQuestionErrors.indicator_description,
								rows: 3
							}),
							/* @__PURE__ */ jsx(TextAreaField, {
								label: "Bukti Pendukung",
								value: pariwisataQuestionForm.data.supporting_evidence,
								onChange: (value) => pariwisataQuestionForm.setData("supporting_evidence", value),
								error: pariwisataQuestionErrors.supporting_evidence,
								rows: 3
							}),
							/* @__PURE__ */ jsx(TextAreaField, {
								label: "Dokumen Pendukung",
								value: pariwisataQuestionForm.data.document_hint,
								onChange: (value) => pariwisataQuestionForm.setData("document_hint", value),
								error: pariwisataQuestionErrors.document_hint,
								rows: 3
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ jsx(CheckField, {
									label: "Dokumen wajib",
									checked: pariwisataQuestionForm.data.document_required,
									onChange: (checked) => pariwisataQuestionForm.setData("document_required", checked)
								}), /* @__PURE__ */ jsx(CheckField, {
									label: "Pertanyaan aktif",
									checked: pariwisataQuestionForm.data.is_active,
									onChange: (checked) => pariwisataQuestionForm.setData("is_active", checked)
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-3 rounded-xl border border-[#EFEFEF] bg-[#F8FAFC] p-3",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-between gap-3",
										children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
											className: "text-xs font-bold text-[#303030]",
											children: "Opsi Skor ISTC"
										}), /* @__PURE__ */ jsx("p", {
											className: "text-[11px] text-[#7C7C7C]",
											children: "Score, level, label, dan deskripsi opsi."
										})] }), /* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: addPariwisataOption,
											className: "h-8 rounded-lg border border-[#0066AE] px-3 text-xs font-bold text-[#0066AE]",
											children: "Tambah Opsi"
										})]
									}),
									pariwisataQuestionForm.data.options.map((option, index) => /* @__PURE__ */ jsxs("div", {
										className: "space-y-2 rounded-lg border border-[#DDE4EC] bg-white p-3",
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: "grid gap-2 sm:grid-cols-4",
												children: [
													/* @__PURE__ */ jsx(TextField, {
														label: "Skor",
														type: "number",
														value: option.score,
														onChange: (value) => updatePariwisataOption(index, "score", value),
														error: pariwisataQuestionErrors[`options.${index}.score`]
													}),
													/* @__PURE__ */ jsx(TextField, {
														label: "Level",
														value: option.level,
														onChange: (value) => updatePariwisataOption(index, "level", value),
														error: pariwisataQuestionErrors[`options.${index}.level`]
													}),
													/* @__PURE__ */ jsx(TextField, {
														label: "Label",
														value: option.label,
														onChange: (value) => updatePariwisataOption(index, "label", value),
														error: pariwisataQuestionErrors[`options.${index}.label`]
													}),
													/* @__PURE__ */ jsx(TextField, {
														label: "Urutan",
														type: "number",
														value: option.sort_order,
														onChange: (value) => updatePariwisataOption(index, "sort_order", value),
														error: pariwisataQuestionErrors[`options.${index}.sort_order`]
													})
												]
											}),
											/* @__PURE__ */ jsx(TextAreaField, {
												label: "Deskripsi Opsi",
												value: option.description,
												onChange: (value) => updatePariwisataOption(index, "description", value),
												error: pariwisataQuestionErrors[`options.${index}.description`],
												rows: 2
											}),
											pariwisataQuestionForm.data.options.length > 1 && /* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => removePariwisataOption(index),
												className: "text-xs font-bold text-[#D81313]",
												children: "Hapus opsi"
											})
										]
									}, `${option.id}-${index}`)),
									/* @__PURE__ */ jsx(FieldError, { message: pariwisataQuestionErrors.options })
								]
							})
						] }),
						/* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => setIsQuestionModalOpen(false),
							className: "h-10 rounded-lg border border-[#DDE4EC] bg-white px-4 text-sm font-bold text-[#303030]",
							children: "Batal"
						}), /* @__PURE__ */ jsx("button", {
							type: "submit",
							disabled: isQuestionProcessing,
							className: "h-10 rounded-lg bg-[#0066AE] px-4 text-sm font-bold text-white disabled:opacity-60",
							children: editingQuestion ? "Simpan Pertanyaan" : "Tambah Pertanyaan"
						})] })
					]
				})]
			})
		})
	] });
}
function FieldError({ message }) {
	if (!message) return null;
	return /* @__PURE__ */ jsx("p", {
		className: "mt-1 text-xs font-semibold text-[#D81313]",
		children: message
	});
}
function TextField({ label, value, onChange, error, type = "text" }) {
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
				className: "h-10 w-full rounded-lg border border-[#DDE4EC] px-3 text-sm outline-none focus:border-[#0066AE]"
			}),
			/* @__PURE__ */ jsx(FieldError, { message: error })
		]
	});
}
function TextAreaField({ label, value, onChange, error, rows = 4 }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "space-y-1.5",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "text-xs font-bold text-[#303030]",
				children: label
			}),
			/* @__PURE__ */ jsx("textarea", {
				value,
				rows,
				onChange: (event) => onChange(event.target.value),
				className: "w-full resize-none rounded-lg border border-[#DDE4EC] px-3 py-2 text-sm outline-none focus:border-[#0066AE]"
			}),
			/* @__PURE__ */ jsx(FieldError, { message: error })
		]
	});
}
function CheckField({ label, checked, onChange }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "flex h-10 items-center gap-2 rounded-lg border border-[#DDE4EC] bg-white px-3 text-xs font-bold text-[#303030]",
		children: [/* @__PURE__ */ jsx("input", {
			type: "checkbox",
			checked,
			onChange: (event) => onChange(event.target.checked),
			className: "size-4 accent-[#0066AE]"
		}), label]
	});
}
QuestionsIndex.layout = { breadcrumbs: [
	{
		title: "Dashboard",
		href: dashboard()
	},
	{
		title: "Template Survey",
		href: questions()
	},
	{
		title: "Detail Template",
		href: "#"
	}
] };
//#endregion
export { QuestionsIndex as default };

//# sourceMappingURL=questions-Cq7WlEiW.js.map