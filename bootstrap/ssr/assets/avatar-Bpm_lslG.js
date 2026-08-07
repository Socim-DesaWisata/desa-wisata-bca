import { t as cn } from "./utils-DAgvUY2L.js";
import "react";
import { jsx } from "react/jsx-runtime";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
//#region resources/js/components/ui/avatar.tsx
function Avatar({ className, ...props }) {
	return /* @__PURE__ */ jsx(AvatarPrimitive.Root, {
		"data-slot": "avatar",
		className: cn("relative flex size-8 shrink-0 overflow-hidden rounded-full", className),
		...props
	});
}
function AvatarImage({ className, ...props }) {
	return /* @__PURE__ */ jsx(AvatarPrimitive.Image, {
		"data-slot": "avatar-image",
		className: cn("aspect-square size-full", className),
		...props
	});
}
function AvatarFallback({ className, ...props }) {
	return /* @__PURE__ */ jsx(AvatarPrimitive.Fallback, {
		"data-slot": "avatar-fallback",
		className: cn("bg-muted flex size-full items-center justify-center rounded-full", className),
		...props
	});
}
//#endregion
export { AvatarFallback as n, AvatarImage as r, Avatar as t };

//# sourceMappingURL=avatar-Bpm_lslG.js.map