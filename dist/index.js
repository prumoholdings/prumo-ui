import { TOKEN_FAMILIES as He } from "./tokens.js";
import { COLOR_TOKENS as Ao, DENSITY_TOKENS as _o, FONT_TOKENS as jo, MOTION_TOKENS as Fo, RADIUS_TOKENS as Bo, SHADOW_TOKENS as Go, SPACING_TOKENS as Lo, SURFACE_TOKENS as Oo, TOKEN_NAMES as Eo, TYPE_TOKENS as Ho, tokenVar as $o } from "./tokens.js";
import { clsx as $e } from "clsx";
import { twMerge as Ve } from "tailwind-merge";
import * as s from "react";
import { jsx as a, jsxs as l } from "react/jsx-runtime";
import * as $ from "@radix-ui/react-accordion";
import { ChevronDown as ne, MoreHorizontal as fe, ChevronRight as F, ChevronLeft as ge, Check as _, X as be, Search as he, Circle as J, ChevronUp as qe, ArrowUp as Ue, ArrowDown as Ke, ChevronsUpDown as We, Minus as Ye, ArrowUpRight as Xe, ArrowDownRight as Je } from "lucide-react";
import { cva as K } from "class-variance-authority";
import * as z from "@radix-ui/react-alert-dialog";
import { Slot as ye } from "@radix-ui/react-slot";
import * as se from "@radix-ui/react-avatar";
import { useReducedMotion as B, motion as G } from "framer-motion";
import { DayPicker as Qe } from "react-day-picker";
import * as me from "@radix-ui/react-checkbox";
import { Command as j } from "cmdk";
import * as y from "@radix-ui/react-dialog";
import * as v from "@radix-ui/react-context-menu";
import { useReactTable as Ze, getPaginationRowModel as et, getFilteredRowModel as tt, getSortedRowModel as at, getCoreRowModel as rt, flexRender as te } from "@tanstack/react-table";
import { Drawer as P } from "vaul";
import * as N from "@radix-ui/react-dropdown-menu";
import * as ot from "@radix-ui/react-label";
import * as ae from "@radix-ui/react-radio-group";
import * as C from "@radix-ui/react-select";
import * as X from "@radix-ui/react-hover-card";
import * as w from "@radix-ui/react-menubar";
import * as V from "@radix-ui/react-popover";
import * as ue from "@radix-ui/react-progress";
import * as H from "@radix-ui/react-scroll-area";
import * as nt from "@radix-ui/react-separator";
import * as W from "@radix-ui/react-slider";
import { AreaChart as st, BarChart as it, LineChart as lt, DonutChart as dt } from "@tremor/react";
import * as pe from "@radix-ui/react-switch";
import * as Q from "@radix-ui/react-tabs";
import * as ct from "@radix-ui/react-toggle";
import * as xe from "@radix-ui/react-toggle-group";
import * as q from "@radix-ui/react-tooltip";
function n(...e) {
  return Ve($e(e));
}
function mt(e) {
  const t = s.useRef(null), [r, o] = s.useState(
    () => e.map((i) => `var(--${i})`)
  );
  return s.useEffect(() => {
    const i = t.current;
    if (!i || typeof window > "u") return;
    const d = getComputedStyle(i), m = e.map((u) => d.getPropertyValue(`--${u}`).trim() || `var(--${u})`);
    o(m);
  }, [e.join(",")]), [t, r];
}
const ve = s.forwardRef(
  ({ token: e, label: t, className: r, style: o, ...i }, d) => /* @__PURE__ */ l(
    "div",
    {
      ref: d,
      className: n("inline-flex items-center gap-3 p-2", r),
      style: {
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-sm)",
        border: "1px solid var(--border)",
        background: "var(--card)",
        color: "var(--card-foreground)",
        transition: "transform var(--duration-fast) var(--ease-standard)",
        ...o
      },
      ...i,
      children: [
        /* @__PURE__ */ a(
          "span",
          {
            "aria-hidden": "true",
            style: {
              display: "inline-block",
              width: "2.25rem",
              height: "2.25rem",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border)",
              background: `var(--${e})`
            }
          }
        ),
        /* @__PURE__ */ a("span", { style: { fontSize: "var(--text-small)" }, children: t ?? e })
      ]
    }
  )
);
ve.displayName = "TokenSwatch";
function Or({ family: e = "color" }) {
  const t = He[e];
  return /* @__PURE__ */ a(
    "div",
    {
      className: "container",
      style: { display: "flex", flexWrap: "wrap", gap: "var(--density-gap)" },
      children: t.map((r) => /* @__PURE__ */ a(ve, { token: r }, r))
    }
  );
}
const Er = $.Root, ut = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  $.Item,
  {
    ref: r,
    className: n("border-b border-border", e),
    ...t
  }
));
ut.displayName = "AccordionItem";
const pt = s.forwardRef(({ className: e, children: t, ...r }, o) => /* @__PURE__ */ a($.Header, { className: "flex", children: /* @__PURE__ */ l(
  $.Trigger,
  {
    ref: o,
    className: n(
      "flex flex-1 items-center justify-between py-4 text-left font-medium",
      "min-h-[44px] outline-none focus-visible:ring-2 focus-visible:ring-ring",
      "[&[data-state=open]>svg]:rotate-180",
      e
    ),
    style: {
      fontSize: "var(--text-body)",
      transition: "color var(--duration-fast) var(--ease-standard)"
    },
    ...r,
    children: [
      t,
      /* @__PURE__ */ a(
        ne,
        {
          className: "h-4 w-4 shrink-0 text-muted-foreground",
          style: { transition: "transform var(--duration-fast) var(--ease-standard)" },
          "aria-hidden": "true"
        }
      )
    ]
  }
) }));
pt.displayName = "AccordionTrigger";
const ft = s.forwardRef(({ className: e, children: t, ...r }, o) => /* @__PURE__ */ a(
  $.Content,
  {
    ref: o,
    className: "overflow-hidden text-muted-foreground data-[state=closed]:animate-none",
    style: { fontSize: "var(--text-small)" },
    ...r,
    children: /* @__PURE__ */ a("div", { className: n("pb-4 pt-0", e), children: t })
  }
));
ft.displayName = "AccordionContent";
const gt = K(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground border-border [&>svg]:text-foreground",
        destructive: "border-destructive/50 text-destructive [&>svg]:text-destructive bg-card"
      }
    },
    defaultVariants: { variant: "default" }
  }
), bt = s.forwardRef(({ className: e, variant: t, ...r }, o) => /* @__PURE__ */ a(
  "div",
  {
    ref: o,
    role: "alert",
    className: n(gt({ variant: t }), e),
    ...r
  }
));
bt.displayName = "Alert";
const ht = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "h5",
  {
    ref: r,
    className: n("mb-1 font-medium leading-none tracking-tight", e),
    style: { fontSize: "var(--text-body)" },
    ...t
  }
));
ht.displayName = "AlertTitle";
const yt = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "div",
  {
    ref: r,
    className: n("[&_p]:leading-relaxed text-muted-foreground", e),
    style: { fontSize: "var(--text-small)" },
    ...t
  }
));
yt.displayName = "AlertDescription";
const A = K(
  n(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
  ),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:opacity-90",
        destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        accent: "bg-accent text-accent-foreground hover:opacity-90",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "min-h-[44px] px-4 py-2",
        sm: "min-h-[36px] rounded-md px-3",
        lg: "min-h-[48px] rounded-md px-8",
        icon: "h-11 w-11"
      }
    },
    defaultVariants: { variant: "default", size: "default" }
  }
), U = s.forwardRef(
  ({ className: e, variant: t, size: r, asChild: o = !1, style: i, ...d }, m) => /* @__PURE__ */ a(
    o ? ye : "button",
    {
      ref: m,
      className: n(A({ variant: t, size: r }), e),
      style: {
        fontSize: "var(--text-small)",
        transition: "background-color var(--duration-fast) var(--ease-standard), opacity var(--duration-fast) var(--ease-standard), transform var(--duration-instant) var(--ease-standard)",
        ...i
      },
      ...d
    }
  )
);
U.displayName = "Button";
const Hr = z.Root, $r = z.Trigger, xt = z.Portal, Ne = s.forwardRef(({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
  z.Overlay,
  {
    ref: o,
    className: n(
      "fixed inset-0 z-50 bg-foreground/40",
      "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
      e
    ),
    style: { transition: "opacity var(--duration-base) var(--ease-standard)", ...t },
    ...r
  }
));
Ne.displayName = "AlertDialogOverlay";
const vt = s.forwardRef(({ className: e, style: t, ...r }, o) => /* @__PURE__ */ l(xt, { children: [
  /* @__PURE__ */ a(Ne, {}),
  /* @__PURE__ */ a(
    z.Content,
    {
      ref: o,
      className: n(
        "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4",
        "border border-border bg-popover text-popover-foreground p-6 rounded-lg",
        "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
        "data-[state=closed]:scale-95 data-[state=open]:scale-100",
        e
      ),
      style: {
        boxShadow: "var(--shadow-lg)",
        transition: "opacity var(--duration-base) var(--ease-entrance), transform var(--duration-base) var(--ease-entrance)",
        ...t
      },
      ...r
    }
  )
] }));
vt.displayName = "AlertDialogContent";
const Nt = ({ className: e, ...t }) => /* @__PURE__ */ a("div", { className: n("flex flex-col space-y-2 text-center sm:text-left", e), ...t });
Nt.displayName = "AlertDialogHeader";
const wt = ({ className: e, ...t }) => /* @__PURE__ */ a(
  "div",
  {
    className: n("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", e),
    ...t
  }
);
wt.displayName = "AlertDialogFooter";
const St = s.forwardRef(({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
  z.Title,
  {
    ref: o,
    className: n("font-semibold", e),
    style: { fontSize: "var(--text-h3)", fontFamily: "var(--font-display)", ...t },
    ...r
  }
));
St.displayName = "AlertDialogTitle";
const Ct = s.forwardRef(({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
  z.Description,
  {
    ref: o,
    className: n("text-muted-foreground", e),
    style: { fontSize: "var(--text-small)", ...t },
    ...r
  }
));
Ct.displayName = "AlertDialogDescription";
const Rt = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(z.Action, { ref: r, className: n(A(), e), ...t }));
Rt.displayName = "AlertDialogAction";
const Tt = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  z.Cancel,
  {
    ref: r,
    className: n(A({ variant: "outline" }), "mt-2 sm:mt-0", e),
    ...t
  }
));
Tt.displayName = "AlertDialogCancel";
const Dt = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  se.Root,
  {
    ref: r,
    className: n("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", e),
    ...t
  }
));
Dt.displayName = "Avatar";
const kt = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(se.Image, { ref: r, className: n("aspect-square h-full w-full", e), ...t }));
kt.displayName = "AvatarImage";
const Mt = s.forwardRef(({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
  se.Fallback,
  {
    ref: o,
    className: n(
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground",
      e
    ),
    style: { fontSize: "var(--text-small)", ...t },
    ...r
  }
));
Mt.displayName = "AvatarFallback";
const zt = K(
  n(
    "inline-flex items-center rounded-sm border px-2.5 py-0.5 font-semibold",
    "outline-none focus:ring-2 focus:ring-ring"
  ),
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        accent: "border-transparent bg-accent text-accent-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground border-border"
      }
    },
    defaultVariants: { variant: "default" }
  }
);
function we({ className: e, variant: t, style: r, ...o }) {
  return /* @__PURE__ */ a(
    "div",
    {
      className: n(zt({ variant: t }), e),
      style: { fontSize: "var(--text-small)", ...r },
      ...o
    }
  );
}
const It = s.forwardRef(({ ...e }, t) => /* @__PURE__ */ a("nav", { ref: t, "aria-label": "breadcrumb", ...e }));
It.displayName = "Breadcrumb";
const Pt = s.forwardRef(
  ({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
    "ol",
    {
      ref: o,
      className: n(
        "flex flex-wrap items-center gap-1.5 break-words text-muted-foreground sm:gap-2.5",
        e
      ),
      style: { fontSize: "var(--text-small)", ...t },
      ...r
    }
  )
);
Pt.displayName = "BreadcrumbList";
const At = s.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ a("li", { ref: r, className: n("inline-flex items-center gap-1.5", e), ...t })
);
At.displayName = "BreadcrumbItem";
const _t = s.forwardRef(({ asChild: e, className: t, ...r }, o) => /* @__PURE__ */ a(
  e ? ye : "a",
  {
    ref: o,
    className: n("transition-colors hover:text-foreground", t),
    style: { transitionDuration: "var(--duration-fast)" },
    ...r
  }
));
_t.displayName = "BreadcrumbLink";
const jt = s.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ a(
    "span",
    {
      ref: r,
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      className: n("font-normal text-foreground", e),
      ...t
    }
  )
);
jt.displayName = "BreadcrumbPage";
const Ft = ({ children: e, className: t, ...r }) => /* @__PURE__ */ a("li", { role: "presentation", "aria-hidden": "true", className: n("[&>svg]:size-3.5", t), ...r, children: e ?? /* @__PURE__ */ a(F, {}) });
Ft.displayName = "BreadcrumbSeparator";
const Bt = ({ className: e, ...t }) => /* @__PURE__ */ l(
  "span",
  {
    role: "presentation",
    "aria-hidden": "true",
    className: n("flex h-9 w-9 items-center justify-center", e),
    ...t,
    children: [
      /* @__PURE__ */ a(fe, { className: "h-4 w-4" }),
      /* @__PURE__ */ a("span", { className: "sr-only", children: "More" })
    ]
  }
);
Bt.displayName = "BreadcrumbEllipsis";
function Gt({ className: e, classNames: t, showOutsideDays: r = !0, ...o }) {
  return /* @__PURE__ */ a(
    Qe,
    {
      showOutsideDays: r,
      className: n("p-3", e),
      classNames: {
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        month_caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "font-medium",
        nav: "flex items-center gap-1 absolute right-1 top-1 z-10",
        button_previous: n(
          A({ variant: "outline", size: "icon" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        button_next: n(
          A({ variant: "outline", size: "icon" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        month_grid: "w-full border-collapse space-x-1",
        weekdays: "flex",
        weekday: "text-muted-foreground rounded-md w-9 font-normal",
        week: "flex w-full mt-2",
        day: n(
          "relative p-0 text-center focus-within:relative focus-within:z-20",
          "[&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md"
        ),
        day_button: n(
          A({ variant: "ghost", size: "icon" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today: "bg-accent text-accent-foreground rounded-md",
        outside: "text-muted-foreground opacity-50",
        disabled: "text-muted-foreground opacity-50",
        hidden: "invisible",
        ...t
      },
      components: {
        Chevron: ({ orientation: i, ...d }) => i === "left" ? /* @__PURE__ */ a(ge, { className: "h-4 w-4", ...d }) : /* @__PURE__ */ a(F, { className: "h-4 w-4", ...d })
      },
      ...o
    }
  );
}
Gt.displayName = "Calendar";
const re = s.forwardRef(
  ({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
    "div",
    {
      ref: o,
      className: n("rounded-xl border border-border bg-card text-card-foreground", e),
      style: { boxShadow: "var(--shadow-sm)", ...t },
      ...r
    }
  )
);
re.displayName = "Card";
const Se = s.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ a("div", { ref: r, className: n("flex flex-col space-y-1.5 p-6", e), ...t })
);
Se.displayName = "CardHeader";
const Ce = s.forwardRef(
  ({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
    "div",
    {
      ref: o,
      className: n("font-semibold leading-none tracking-tight", e),
      style: { fontSize: "var(--text-h3)", fontFamily: "var(--font-display)", ...t },
      ...r
    }
  )
);
Ce.displayName = "CardTitle";
const Lt = s.forwardRef(
  ({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
    "div",
    {
      ref: o,
      className: n("text-muted-foreground", e),
      style: { fontSize: "var(--text-small)", ...t },
      ...r
    }
  )
);
Lt.displayName = "CardDescription";
const oe = s.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ a("div", { ref: r, className: n("p-6 pt-0", e), ...t })
);
oe.displayName = "CardContent";
const Ot = s.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ a("div", { ref: r, className: n("flex items-center p-6 pt-0", e), ...t })
);
Ot.displayName = "CardFooter";
const Re = s.forwardRef(({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
  me.Root,
  {
    ref: o,
    className: n(
      "peer h-5 w-5 shrink-0 rounded-sm border border-primary outline-none",
      "focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      e
    ),
    style: { transition: "background-color var(--duration-fast) var(--ease-standard)", ...t },
    ...r,
    children: /* @__PURE__ */ a(me.Indicator, { className: "flex items-center justify-center text-current", children: /* @__PURE__ */ a(_, { className: "h-4 w-4", "aria-hidden": "true" }) })
  }
));
Re.displayName = "Checkbox";
const Et = y.Root, Vr = y.Trigger, Ht = y.Portal, qr = y.Close, Te = s.forwardRef(({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
  y.Overlay,
  {
    ref: o,
    className: n(
      "fixed inset-0 z-50 bg-foreground/40",
      "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
      e
    ),
    style: { transition: "opacity var(--duration-base) var(--ease-standard)", ...t },
    ...r
  }
));
Te.displayName = "DialogOverlay";
const De = s.forwardRef(({ className: e, children: t, style: r, ...o }, i) => /* @__PURE__ */ l(Ht, { children: [
  /* @__PURE__ */ a(Te, {}),
  /* @__PURE__ */ l(
    y.Content,
    {
      ref: i,
      className: n(
        "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4",
        "border border-border bg-popover text-popover-foreground p-6 rounded-lg",
        "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
        "data-[state=closed]:scale-95 data-[state=open]:scale-100",
        e
      ),
      style: {
        boxShadow: "var(--shadow-lg)",
        transition: "opacity var(--duration-base) var(--ease-entrance), transform var(--duration-base) var(--ease-entrance)",
        ...r
      },
      ...o,
      children: [
        t,
        /* @__PURE__ */ l(
          y.Close,
          {
            className: n(
              "absolute right-4 top-4 rounded-sm opacity-70 outline-none",
              "hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring",
              "inline-flex h-11 w-11 items-center justify-center"
            ),
            children: [
              /* @__PURE__ */ a(be, { className: "h-4 w-4", "aria-hidden": "true" }),
              /* @__PURE__ */ a("span", { className: "sr-only", children: "Close" })
            ]
          }
        )
      ]
    }
  )
] }));
De.displayName = "DialogContent";
const $t = ({ className: e, ...t }) => /* @__PURE__ */ a("div", { className: n("flex flex-col space-y-1.5 text-center sm:text-left", e), ...t });
$t.displayName = "DialogHeader";
const Vt = ({ className: e, ...t }) => /* @__PURE__ */ a(
  "div",
  {
    className: n("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", e),
    ...t
  }
);
Vt.displayName = "DialogFooter";
const qt = s.forwardRef(({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
  y.Title,
  {
    ref: o,
    className: n("font-semibold leading-none tracking-tight", e),
    style: { fontSize: "var(--text-h3)", fontFamily: "var(--font-display)", ...t },
    ...r
  }
));
qt.displayName = "DialogTitle";
const Ut = s.forwardRef(({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
  y.Description,
  {
    ref: o,
    className: n("text-muted-foreground", e),
    style: { fontSize: "var(--text-small)", ...t },
    ...r
  }
));
Ut.displayName = "DialogDescription";
const ke = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  j,
  {
    ref: r,
    className: n(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      e
    ),
    ...t
  }
));
ke.displayName = "Command";
const Ur = ({ children: e, ...t }) => /* @__PURE__ */ a(Et, { ...t, children: /* @__PURE__ */ a(De, { className: "overflow-hidden p-0", children: /* @__PURE__ */ a(ke, { className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5", children: e }) }) }), Kt = s.forwardRef(({ className: e, style: t, ...r }, o) => /* @__PURE__ */ l("div", { className: "flex items-center border-b border-border px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ a(he, { className: "mr-2 h-4 w-4 shrink-0 opacity-50", "aria-hidden": "true" }),
  /* @__PURE__ */ a(
    j.Input,
    {
      ref: o,
      className: n(
        "flex h-11 w-full rounded-md bg-transparent py-3 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        e
      ),
      style: { fontSize: "var(--text-body)", ...t },
      ...r
    }
  )
] }));
Kt.displayName = "CommandInput";
const Wt = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  j.List,
  {
    ref: r,
    className: n("max-h-80 overflow-y-auto overflow-x-hidden", e),
    ...t
  }
));
Wt.displayName = "CommandList";
const Yt = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  j.Empty,
  {
    ref: r,
    className: n("py-6 text-center text-muted-foreground", e),
    style: { fontSize: "var(--text-small)" },
    ...t
  }
));
Yt.displayName = "CommandEmpty";
const Xt = s.forwardRef(({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
  j.Group,
  {
    ref: o,
    className: n(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      e
    ),
    style: { fontSize: "var(--text-small)", ...t },
    ...r
  }
));
Xt.displayName = "CommandGroup";
const Jt = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(j.Separator, { ref: r, className: n("-mx-1 h-px bg-border", e), ...t }));
Jt.displayName = "CommandSeparator";
const Qt = s.forwardRef(({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
  j.Item,
  {
    ref: o,
    className: n(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 outline-none min-h-[36px]",
      "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      e
    ),
    style: { fontSize: "var(--text-small)", ...t },
    ...r
  }
));
Qt.displayName = "CommandItem";
const Zt = ({ className: e, ...t }) => /* @__PURE__ */ a("span", { className: n("ml-auto tracking-widest text-muted-foreground", e), ...t });
Zt.displayName = "CommandShortcut";
const Kr = v.Root, Wr = v.Trigger, Yr = v.Group, Xr = v.Portal, Jr = v.Sub, Qr = v.RadioGroup, Z = "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 outline-none min-h-[36px] focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", ea = s.forwardRef(({ className: e, inset: t, children: r, style: o, ...i }, d) => /* @__PURE__ */ l(
  v.SubTrigger,
  {
    ref: d,
    className: n(Z, "data-[state=open]:bg-accent", t && "pl-8", e),
    style: { fontSize: "var(--text-small)", ...o },
    ...i,
    children: [
      r,
      /* @__PURE__ */ a(F, { className: "ml-auto h-4 w-4", "aria-hidden": "true" })
    ]
  }
));
ea.displayName = "ContextMenuSubTrigger";
const ta = s.forwardRef(({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
  v.SubContent,
  {
    ref: o,
    className: n(
      "z-50 min-w-32 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground",
      e
    ),
    style: { boxShadow: "var(--shadow-md)", ...t },
    ...r
  }
));
ta.displayName = "ContextMenuSubContent";
const aa = s.forwardRef(({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(v.Portal, { children: /* @__PURE__ */ a(
  v.Content,
  {
    ref: o,
    className: n(
      "z-50 min-w-32 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground",
      e
    ),
    style: { boxShadow: "var(--shadow-md)", ...t },
    ...r
  }
) }));
aa.displayName = "ContextMenuContent";
const ra = s.forwardRef(({ className: e, inset: t, style: r, ...o }, i) => /* @__PURE__ */ a(
  v.Item,
  {
    ref: i,
    className: n(Z, t && "pl-8", e),
    style: { fontSize: "var(--text-small)", ...r },
    ...o
  }
));
ra.displayName = "ContextMenuItem";
const oa = s.forwardRef(({ className: e, children: t, checked: r, style: o, ...i }, d) => /* @__PURE__ */ l(
  v.CheckboxItem,
  {
    ref: d,
    className: n(Z, "pl-8", e),
    checked: r,
    style: { fontSize: "var(--text-small)", ...o },
    ...i,
    children: [
      /* @__PURE__ */ a("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ a(v.ItemIndicator, { children: /* @__PURE__ */ a(_, { className: "h-4 w-4", "aria-hidden": "true" }) }) }),
      t
    ]
  }
));
oa.displayName = "ContextMenuCheckboxItem";
const na = s.forwardRef(({ className: e, children: t, style: r, ...o }, i) => /* @__PURE__ */ l(
  v.RadioItem,
  {
    ref: i,
    className: n(Z, "pl-8", e),
    style: { fontSize: "var(--text-small)", ...r },
    ...o,
    children: [
      /* @__PURE__ */ a("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ a(v.ItemIndicator, { children: /* @__PURE__ */ a(J, { className: "h-2 w-2 fill-current", "aria-hidden": "true" }) }) }),
      t
    ]
  }
));
na.displayName = "ContextMenuRadioItem";
const sa = s.forwardRef(({ className: e, inset: t, style: r, ...o }, i) => /* @__PURE__ */ a(
  v.Label,
  {
    ref: i,
    className: n("px-2 py-1.5 font-semibold text-muted-foreground", t && "pl-8", e),
    style: { fontSize: "var(--text-small)", ...r },
    ...o
  }
));
sa.displayName = "ContextMenuLabel";
const ia = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  v.Separator,
  {
    ref: r,
    className: n("-mx-1 my-1 h-px bg-border", e),
    ...t
  }
));
ia.displayName = "ContextMenuSeparator";
const la = ({
  shouldScaleBackground: e = !0,
  ...t
}) => /* @__PURE__ */ a(P.Root, { shouldScaleBackground: e, ...t });
la.displayName = "Drawer";
const Zr = P.Trigger, da = P.Portal, eo = P.Close, Me = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  P.Overlay,
  {
    ref: r,
    className: n("fixed inset-0 z-50 bg-foreground/40", e),
    ...t
  }
));
Me.displayName = "DrawerOverlay";
const ca = s.forwardRef(({ className: e, children: t, style: r, ...o }, i) => /* @__PURE__ */ l(da, { children: [
  /* @__PURE__ */ a(Me, {}),
  /* @__PURE__ */ l(
    P.Content,
    {
      ref: i,
      className: n(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-xl",
        "border-t border-border bg-popover text-popover-foreground",
        e
      ),
      style: { boxShadow: "var(--shadow-lg)", ...r },
      ...o,
      children: [
        /* @__PURE__ */ a("div", { className: "mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted", "aria-hidden": "true" }),
        t
      ]
    }
  )
] }));
ca.displayName = "DrawerContent";
const ma = ({ className: e, ...t }) => /* @__PURE__ */ a("div", { className: n("grid gap-1.5 p-4 text-center sm:text-left", e), ...t });
ma.displayName = "DrawerHeader";
const ua = ({ className: e, ...t }) => /* @__PURE__ */ a("div", { className: n("mt-auto flex flex-col gap-2 p-4", e), ...t });
ua.displayName = "DrawerFooter";
const pa = s.forwardRef(({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
  P.Title,
  {
    ref: o,
    className: n("font-semibold leading-none tracking-tight", e),
    style: { fontSize: "var(--text-h3)", fontFamily: "var(--font-display)", ...t },
    ...r
  }
));
pa.displayName = "DrawerTitle";
const fa = s.forwardRef(({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
  P.Description,
  {
    ref: o,
    className: n("text-muted-foreground", e),
    style: { fontSize: "var(--text-small)", ...t },
    ...r
  }
));
fa.displayName = "DrawerDescription";
const to = N.Root, ao = N.Trigger, ro = N.Group, oo = N.Portal, no = N.Sub, so = N.RadioGroup, ee = "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 outline-none min-h-[36px] focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", ga = s.forwardRef(({ className: e, inset: t, children: r, style: o, ...i }, d) => /* @__PURE__ */ l(
  N.SubTrigger,
  {
    ref: d,
    className: n(ee, "data-[state=open]:bg-accent", t && "pl-8", e),
    style: { fontSize: "var(--text-small)", ...o },
    ...i,
    children: [
      r,
      /* @__PURE__ */ a(F, { className: "ml-auto h-4 w-4", "aria-hidden": "true" })
    ]
  }
));
ga.displayName = "DropdownMenuSubTrigger";
const ba = s.forwardRef(({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
  N.SubContent,
  {
    ref: o,
    className: n(
      "z-50 min-w-32 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground",
      e
    ),
    style: { boxShadow: "var(--shadow-md)", ...t },
    ...r
  }
));
ba.displayName = "DropdownMenuSubContent";
const ha = s.forwardRef(({ className: e, sideOffset: t = 4, style: r, ...o }, i) => /* @__PURE__ */ a(N.Portal, { children: /* @__PURE__ */ a(
  N.Content,
  {
    ref: i,
    sideOffset: t,
    className: n(
      "z-50 min-w-32 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground",
      "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
      e
    ),
    style: {
      boxShadow: "var(--shadow-md)",
      transition: "opacity var(--duration-fast) var(--ease-entrance)",
      ...r
    },
    ...o
  }
) }));
ha.displayName = "DropdownMenuContent";
const ya = s.forwardRef(({ className: e, inset: t, style: r, ...o }, i) => /* @__PURE__ */ a(
  N.Item,
  {
    ref: i,
    className: n(ee, t && "pl-8", e),
    style: { fontSize: "var(--text-small)", ...r },
    ...o
  }
));
ya.displayName = "DropdownMenuItem";
const xa = s.forwardRef(({ className: e, children: t, checked: r, style: o, ...i }, d) => /* @__PURE__ */ l(
  N.CheckboxItem,
  {
    ref: d,
    className: n(ee, "pl-8", e),
    checked: r,
    style: { fontSize: "var(--text-small)", ...o },
    ...i,
    children: [
      /* @__PURE__ */ a("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ a(N.ItemIndicator, { children: /* @__PURE__ */ a(_, { className: "h-4 w-4", "aria-hidden": "true" }) }) }),
      t
    ]
  }
));
xa.displayName = "DropdownMenuCheckboxItem";
const va = s.forwardRef(({ className: e, children: t, style: r, ...o }, i) => /* @__PURE__ */ l(
  N.RadioItem,
  {
    ref: i,
    className: n(ee, "pl-8", e),
    style: { fontSize: "var(--text-small)", ...r },
    ...o,
    children: [
      /* @__PURE__ */ a("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ a(N.ItemIndicator, { children: /* @__PURE__ */ a(J, { className: "h-2 w-2 fill-current", "aria-hidden": "true" }) }) }),
      t
    ]
  }
));
va.displayName = "DropdownMenuRadioItem";
const Na = s.forwardRef(({ className: e, inset: t, style: r, ...o }, i) => /* @__PURE__ */ a(
  N.Label,
  {
    ref: i,
    className: n("px-2 py-1.5 font-semibold text-muted-foreground", t && "pl-8", e),
    style: { fontSize: "var(--text-small)", ...r },
    ...o
  }
));
Na.displayName = "DropdownMenuLabel";
const wa = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  N.Separator,
  {
    ref: r,
    className: n("-mx-1 my-1 h-px bg-border", e),
    ...t
  }
));
wa.displayName = "DropdownMenuSeparator";
const Sa = ({ className: e, ...t }) => /* @__PURE__ */ a("span", { className: n("ml-auto tracking-widest text-muted-foreground", e), ...t });
Sa.displayName = "DropdownMenuShortcut";
const io = X.Root, lo = X.Trigger, Ca = s.forwardRef(({ className: e, align: t = "center", sideOffset: r = 4, style: o, ...i }, d) => /* @__PURE__ */ a(X.Portal, { children: /* @__PURE__ */ a(
  X.Content,
  {
    ref: d,
    align: t,
    sideOffset: r,
    className: n(
      "z-50 w-64 rounded-md border border-border bg-popover p-4 text-popover-foreground outline-none",
      "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
      e
    ),
    style: {
      boxShadow: "var(--shadow-md)",
      transition: "opacity var(--duration-fast) var(--ease-standard)",
      ...o
    },
    ...i
  }
) }));
Ca.displayName = "HoverCardContent";
const ie = s.forwardRef(
  ({ className: e, type: t, style: r, ...o }, i) => /* @__PURE__ */ a(
    "input",
    {
      type: t,
      ref: i,
      className: n(
        "flex min-h-[44px] w-full rounded-md border border-input bg-background px-3 py-2",
        "text-foreground placeholder:text-muted-foreground",
        "outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        e
      ),
      style: { fontSize: "var(--text-body)", ...r },
      ...o
    }
  )
);
ie.displayName = "Input";
const Y = s.forwardRef(({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
  ot.Root,
  {
    ref: o,
    className: n(
      "font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      e
    ),
    style: { fontSize: "var(--text-small)", ...t },
    ...r
  }
));
Y.displayName = "Label";
const co = w.Menu, mo = w.Group, Ra = w.Portal, uo = w.Sub, po = w.RadioGroup, Ta = s.forwardRef(({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
  w.Root,
  {
    ref: o,
    className: n(
      "flex h-11 items-center gap-1 rounded-md border border-border bg-background p-1",
      e
    ),
    style: { boxShadow: "var(--shadow-sm)", ...t },
    ...r
  }
));
Ta.displayName = "Menubar";
const Da = s.forwardRef(({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
  w.Trigger,
  {
    ref: o,
    className: n(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 font-medium outline-none min-h-[36px]",
      "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      e
    ),
    style: { fontSize: "var(--text-small)", ...t },
    ...r
  }
));
Da.displayName = "MenubarTrigger";
const ka = s.forwardRef(({ className: e, inset: t, children: r, style: o, ...i }, d) => /* @__PURE__ */ l(
  w.SubTrigger,
  {
    ref: d,
    className: n(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 outline-none min-h-[36px]",
      "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent",
      t && "pl-8",
      e
    ),
    style: { fontSize: "var(--text-small)", ...o },
    ...i,
    children: [
      r,
      /* @__PURE__ */ a(F, { className: "ml-auto h-4 w-4", "aria-hidden": "true" })
    ]
  }
));
ka.displayName = "MenubarSubTrigger";
const Ma = s.forwardRef(({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
  w.SubContent,
  {
    ref: o,
    className: n(
      "z-50 min-w-32 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground",
      e
    ),
    style: { boxShadow: "var(--shadow-md)", ...t },
    ...r
  }
));
Ma.displayName = "MenubarSubContent";
const za = s.forwardRef(({ className: e, align: t = "start", alignOffset: r = -4, sideOffset: o = 8, style: i, ...d }, m) => /* @__PURE__ */ a(Ra, { children: /* @__PURE__ */ a(
  w.Content,
  {
    ref: m,
    align: t,
    alignOffset: r,
    sideOffset: o,
    className: n(
      "z-50 min-w-48 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground",
      e
    ),
    style: { boxShadow: "var(--shadow-md)", ...i },
    ...d
  }
) }));
za.displayName = "MenubarContent";
const le = "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 outline-none min-h-[36px] focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", Ia = s.forwardRef(({ className: e, inset: t, style: r, ...o }, i) => /* @__PURE__ */ a(
  w.Item,
  {
    ref: i,
    className: n(le, t && "pl-8", e),
    style: { fontSize: "var(--text-small)", ...r },
    ...o
  }
));
Ia.displayName = "MenubarItem";
const Pa = s.forwardRef(({ className: e, children: t, checked: r, style: o, ...i }, d) => /* @__PURE__ */ l(
  w.CheckboxItem,
  {
    ref: d,
    className: n(le, "pl-8", e),
    checked: r,
    style: { fontSize: "var(--text-small)", ...o },
    ...i,
    children: [
      /* @__PURE__ */ a("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ a(w.ItemIndicator, { children: /* @__PURE__ */ a(_, { className: "h-4 w-4", "aria-hidden": "true" }) }) }),
      t
    ]
  }
));
Pa.displayName = "MenubarCheckboxItem";
const Aa = s.forwardRef(({ className: e, children: t, style: r, ...o }, i) => /* @__PURE__ */ l(
  w.RadioItem,
  {
    ref: i,
    className: n(le, "pl-8", e),
    style: { fontSize: "var(--text-small)", ...r },
    ...o,
    children: [
      /* @__PURE__ */ a("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ a(w.ItemIndicator, { children: /* @__PURE__ */ a(J, { className: "h-2 w-2 fill-current", "aria-hidden": "true" }) }) }),
      t
    ]
  }
));
Aa.displayName = "MenubarRadioItem";
const _a = s.forwardRef(({ className: e, inset: t, style: r, ...o }, i) => /* @__PURE__ */ a(
  w.Label,
  {
    ref: i,
    className: n("px-2 py-1.5 font-semibold text-muted-foreground", t && "pl-8", e),
    style: { fontSize: "var(--text-small)", ...r },
    ...o
  }
));
_a.displayName = "MenubarLabel";
const ja = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  w.Separator,
  {
    ref: r,
    className: n("-mx-1 my-1 h-px bg-border", e),
    ...t
  }
));
ja.displayName = "MenubarSeparator";
const Fa = ({ className: e, ...t }) => /* @__PURE__ */ a(
  "nav",
  {
    role: "navigation",
    "aria-label": "pagination",
    className: n("mx-auto flex w-full justify-center", e),
    ...t
  }
);
Fa.displayName = "Pagination";
const Ba = s.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ a("ul", { ref: r, className: n("flex flex-row items-center gap-1", e), ...t })
);
Ba.displayName = "PaginationContent";
const Ga = s.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ a("li", { ref: r, className: n("", e), ...t })
);
Ga.displayName = "PaginationItem";
const de = ({ className: e, isActive: t, size: r = "icon", ...o }) => /* @__PURE__ */ a(
  "a",
  {
    "aria-current": t ? "page" : void 0,
    className: n(
      A({ variant: t ? "outline" : "ghost", size: r }),
      "cursor-pointer",
      e
    ),
    ...o
  }
);
de.displayName = "PaginationLink";
const La = ({ className: e, ...t }) => /* @__PURE__ */ l(
  de,
  {
    "aria-label": "Go to previous page",
    size: "default",
    className: n("gap-1 pl-2.5", e),
    ...t,
    children: [
      /* @__PURE__ */ a(ge, { className: "h-4 w-4", "aria-hidden": "true" }),
      /* @__PURE__ */ a("span", { children: "Previous" })
    ]
  }
);
La.displayName = "PaginationPrevious";
const Oa = ({ className: e, ...t }) => /* @__PURE__ */ l(
  de,
  {
    "aria-label": "Go to next page",
    size: "default",
    className: n("gap-1 pr-2.5", e),
    ...t,
    children: [
      /* @__PURE__ */ a("span", { children: "Next" }),
      /* @__PURE__ */ a(F, { className: "h-4 w-4", "aria-hidden": "true" })
    ]
  }
);
Oa.displayName = "PaginationNext";
const Ea = ({ className: e, ...t }) => /* @__PURE__ */ l("span", { "aria-hidden": !0, className: n("flex h-9 w-9 items-center justify-center", e), ...t, children: [
  /* @__PURE__ */ a(fe, { className: "h-4 w-4" }),
  /* @__PURE__ */ a("span", { className: "sr-only", children: "More pages" })
] });
Ea.displayName = "PaginationEllipsis";
const fo = V.Root, go = V.Trigger, bo = V.Anchor, Ha = s.forwardRef(({ className: e, align: t = "center", sideOffset: r = 4, style: o, ...i }, d) => /* @__PURE__ */ a(V.Portal, { children: /* @__PURE__ */ a(
  V.Content,
  {
    ref: d,
    align: t,
    sideOffset: r,
    className: n(
      "z-50 w-72 rounded-md border border-border bg-popover p-4 text-popover-foreground outline-none",
      "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
      "data-[state=closed]:scale-95 data-[state=open]:scale-100",
      e
    ),
    style: {
      boxShadow: "var(--shadow-md)",
      transition: "opacity var(--duration-fast) var(--ease-entrance), transform var(--duration-fast) var(--ease-entrance)",
      ...o
    },
    ...i
  }
) }));
Ha.displayName = "PopoverContent";
const $a = s.forwardRef(({ className: e, value: t, style: r, ...o }, i) => /* @__PURE__ */ a(
  ue.Root,
  {
    ref: i,
    className: n("relative h-2 w-full overflow-hidden rounded-full bg-secondary", e),
    style: r,
    ...o,
    children: /* @__PURE__ */ a(
      ue.Indicator,
      {
        className: "h-full w-full flex-1 bg-primary",
        style: {
          transform: `translateX(-${100 - (t || 0)}%)`,
          transition: "transform var(--duration-base) var(--ease-standard)"
        }
      }
    )
  }
));
$a.displayName = "Progress";
const ze = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(ae.Root, { ref: r, className: n("grid gap-2", e), ...t }));
ze.displayName = "RadioGroup";
const Ie = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  ae.Item,
  {
    ref: r,
    className: n(
      "aspect-square h-5 w-5 rounded-full border border-primary text-primary outline-none",
      "focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      e
    ),
    ...t,
    children: /* @__PURE__ */ a(ae.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ a(J, { className: "h-2.5 w-2.5 fill-current text-current", "aria-hidden": "true" }) })
  }
));
Ie.displayName = "RadioGroupItem";
const Va = s.forwardRef(({ className: e, children: t, ...r }, o) => /* @__PURE__ */ l(H.Root, { ref: o, className: n("relative overflow-hidden", e), ...r, children: [
  /* @__PURE__ */ a(H.Viewport, { className: "h-full w-full rounded-[inherit]", children: t }),
  /* @__PURE__ */ a(Pe, {}),
  /* @__PURE__ */ a(H.Corner, {})
] }));
Va.displayName = "ScrollArea";
const Pe = s.forwardRef(({ className: e, orientation: t = "vertical", ...r }, o) => /* @__PURE__ */ a(
  H.ScrollAreaScrollbar,
  {
    ref: o,
    orientation: t,
    className: n(
      "flex touch-none select-none",
      t === "vertical" && "h-full w-2.5 border-l border-l-transparent p-px",
      t === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-px",
      e
    ),
    ...r,
    children: /* @__PURE__ */ a(H.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
Pe.displayName = "ScrollBar";
const qa = C.Root, ho = C.Group, Ua = C.Value, Ae = s.forwardRef(({ className: e, children: t, style: r, ...o }, i) => /* @__PURE__ */ l(
  C.Trigger,
  {
    ref: i,
    className: n(
      "flex min-h-[44px] w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2",
      "text-foreground data-[placeholder]:text-muted-foreground outline-none focus:ring-2 focus:ring-ring",
      "disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      e
    ),
    style: { fontSize: "var(--text-body)", ...r },
    ...o,
    children: [
      t,
      /* @__PURE__ */ a(C.Icon, { asChild: !0, children: /* @__PURE__ */ a(ne, { className: "h-4 w-4 opacity-50", "aria-hidden": "true" }) })
    ]
  }
));
Ae.displayName = "SelectTrigger";
const _e = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  C.ScrollUpButton,
  {
    ref: r,
    className: n("flex cursor-default items-center justify-center py-1", e),
    ...t,
    children: /* @__PURE__ */ a(qe, { className: "h-4 w-4", "aria-hidden": "true" })
  }
));
_e.displayName = "SelectScrollUpButton";
const je = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  C.ScrollDownButton,
  {
    ref: r,
    className: n("flex cursor-default items-center justify-center py-1", e),
    ...t,
    children: /* @__PURE__ */ a(ne, { className: "h-4 w-4", "aria-hidden": "true" })
  }
));
je.displayName = "SelectScrollDownButton";
const Fe = s.forwardRef(({ className: e, children: t, position: r = "popper", style: o, ...i }, d) => /* @__PURE__ */ a(C.Portal, { children: /* @__PURE__ */ l(
  C.Content,
  {
    ref: d,
    className: n(
      "relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border border-border bg-popover text-popover-foreground",
      r === "popper" && "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
      e
    ),
    position: r,
    style: { boxShadow: "var(--shadow-md)", ...o },
    ...i,
    children: [
      /* @__PURE__ */ a(_e, {}),
      /* @__PURE__ */ a(
        C.Viewport,
        {
          className: n(
            "p-1",
            r === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ a(je, {})
    ]
  }
) }));
Fe.displayName = "SelectContent";
const Ka = s.forwardRef(({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
  C.Label,
  {
    ref: o,
    className: n("px-2 py-1.5 font-semibold text-muted-foreground", e),
    style: { fontSize: "var(--text-small)", ...t },
    ...r
  }
));
Ka.displayName = "SelectLabel";
const Be = s.forwardRef(({ className: e, children: t, style: r, ...o }, i) => /* @__PURE__ */ l(
  C.Item,
  {
    ref: i,
    className: n(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 outline-none min-h-[36px]",
      "focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    style: { fontSize: "var(--text-small)", ...r },
    ...o,
    children: [
      /* @__PURE__ */ a("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ a(C.ItemIndicator, { children: /* @__PURE__ */ a(_, { className: "h-4 w-4", "aria-hidden": "true" }) }) }),
      /* @__PURE__ */ a(C.ItemText, { children: t })
    ]
  }
));
Be.displayName = "SelectItem";
const Wa = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  C.Separator,
  {
    ref: r,
    className: n("-mx-1 my-1 h-px bg-border", e),
    ...t
  }
));
Wa.displayName = "SelectSeparator";
const Ya = s.forwardRef(({ className: e, orientation: t = "horizontal", decorative: r = !0, ...o }, i) => /* @__PURE__ */ a(
  nt.Root,
  {
    ref: i,
    decorative: r,
    orientation: t,
    className: n(
      "shrink-0 bg-border",
      t === "horizontal" ? "h-px w-full" : "h-full w-px",
      e
    ),
    ...o
  }
));
Ya.displayName = "Separator";
const yo = y.Root, xo = y.Trigger, vo = y.Close, Xa = y.Portal, Ge = s.forwardRef(({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
  y.Overlay,
  {
    ref: o,
    className: n(
      "fixed inset-0 z-50 bg-foreground/40",
      "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
      e
    ),
    style: { transition: "opacity var(--duration-base) var(--ease-standard)", ...t },
    ...r
  }
));
Ge.displayName = "SheetOverlay";
const Ja = K(
  "fixed z-50 gap-4 bg-popover text-popover-foreground p-6 border-border",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:-translate-y-full data-[state=open]:translate-y-0",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:translate-y-full data-[state=open]:translate-y-0",
        left: "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0",
        right: "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l data-[state=closed]:translate-x-full data-[state=open]:translate-x-0"
      }
    },
    defaultVariants: { side: "right" }
  }
), Qa = s.forwardRef(({ side: e = "right", className: t, children: r, style: o, ...i }, d) => /* @__PURE__ */ l(Xa, { children: [
  /* @__PURE__ */ a(Ge, {}),
  /* @__PURE__ */ l(
    y.Content,
    {
      ref: d,
      className: n(Ja({ side: e }), t),
      style: {
        boxShadow: "var(--shadow-lg)",
        transition: "transform var(--duration-base) var(--ease-entrance)",
        ...o
      },
      ...i,
      children: [
        r,
        /* @__PURE__ */ l(
          y.Close,
          {
            className: n(
              "absolute right-4 top-4 rounded-sm opacity-70 outline-none",
              "hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring",
              "inline-flex h-11 w-11 items-center justify-center"
            ),
            children: [
              /* @__PURE__ */ a(be, { className: "h-4 w-4", "aria-hidden": "true" }),
              /* @__PURE__ */ a("span", { className: "sr-only", children: "Close" })
            ]
          }
        )
      ]
    }
  )
] }));
Qa.displayName = "SheetContent";
const Za = ({ className: e, ...t }) => /* @__PURE__ */ a("div", { className: n("flex flex-col space-y-2 text-center sm:text-left", e), ...t });
Za.displayName = "SheetHeader";
const er = ({ className: e, ...t }) => /* @__PURE__ */ a(
  "div",
  {
    className: n("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", e),
    ...t
  }
);
er.displayName = "SheetFooter";
const tr = s.forwardRef(({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
  y.Title,
  {
    ref: o,
    className: n("font-semibold text-foreground", e),
    style: { fontSize: "var(--text-h3)", fontFamily: "var(--font-display)", ...t },
    ...r
  }
));
tr.displayName = "SheetTitle";
const ar = s.forwardRef(({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
  y.Description,
  {
    ref: o,
    className: n("text-muted-foreground", e),
    style: { fontSize: "var(--text-small)", ...t },
    ...r
  }
));
ar.displayName = "SheetDescription";
const rr = s.forwardRef(
  ({ className: e, style: t, thumbLabels: r, "aria-label": o, value: i, defaultValue: d, ...m }, u) => {
    const f = (i ?? d ?? [0]).length, x = (R) => Array.isArray(r) ? r[R] : r ?? o;
    return /* @__PURE__ */ l(
      W.Root,
      {
        ref: u,
        className: n("relative flex w-full touch-none select-none items-center", e),
        value: i,
        defaultValue: d,
        ...m,
        children: [
          /* @__PURE__ */ a(W.Track, { className: "relative h-2 w-full grow overflow-hidden rounded-full bg-secondary", children: /* @__PURE__ */ a(W.Range, { className: "absolute h-full bg-primary" }) }),
          Array.from({ length: f }).map((R, S) => /* @__PURE__ */ a(
            W.Thumb,
            {
              "aria-label": x(S),
              className: n(
                "block h-5 w-5 rounded-full border-2 border-primary bg-background outline-none",
                "focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              ),
              style: { boxShadow: "var(--shadow-sm)", ...t }
            },
            S
          ))
        ]
      }
    );
  }
);
rr.displayName = "Slider";
const or = s.forwardRef(({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
  pe.Root,
  {
    ref: o,
    className: n(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent outline-none",
      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      e
    ),
    style: { transition: "background-color var(--duration-fast) var(--ease-standard)", ...t },
    ...r,
    children: /* @__PURE__ */ a(
      pe.Thumb,
      {
        className: n(
          "pointer-events-none block h-5 w-5 rounded-full bg-background ring-0",
          "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        ),
        style: { boxShadow: "var(--shadow-sm)", transition: "transform var(--duration-fast) var(--ease-standard)" }
      }
    )
  }
));
or.displayName = "Switch";
const nr = s.forwardRef(({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
  "table",
  {
    ref: o,
    className: n("w-full caption-bottom border-collapse", e),
    style: { fontSize: "var(--text-small)", ...t },
    ...r
  }
));
nr.displayName = "Table";
const sr = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a("thead", { ref: r, className: n("[&_tr]:border-b [&_tr]:border-border", e), ...t }));
sr.displayName = "TableHeader";
const ir = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a("tbody", { ref: r, className: n("[&_tr:last-child]:border-0", e), ...t }));
ir.displayName = "TableBody";
const lr = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "tfoot",
  {
    ref: r,
    className: n("border-t border-border bg-muted/50 font-medium [&>tr]:last:border-b-0", e),
    ...t
  }
));
lr.displayName = "TableFooter";
const dr = s.forwardRef(({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
  "tr",
  {
    ref: o,
    className: n(
      "border-b border-border hover:bg-muted/50 data-[state=selected]:bg-muted",
      e
    ),
    style: { transition: "background-color var(--duration-fast) var(--ease-standard)", ...t },
    ...r
  }
));
dr.displayName = "TableRow";
const cr = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "th",
  {
    ref: r,
    className: n(
      "h-11 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      e
    ),
    ...t
  }
));
cr.displayName = "TableHead";
const mr = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "td",
  {
    ref: r,
    className: n("p-4 align-middle [&:has([role=checkbox])]:pr-0", e),
    ...t
  }
));
mr.displayName = "TableCell";
const ur = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a("caption", { ref: r, className: n("mt-4 text-muted-foreground", e), ...t }));
ur.displayName = "TableCaption";
const No = Q.Root, pr = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  Q.List,
  {
    ref: r,
    className: n(
      "inline-flex h-11 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      e
    ),
    ...t
  }
));
pr.displayName = "TabsList";
const fr = s.forwardRef(({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
  Q.Trigger,
  {
    ref: o,
    className: n(
      "inline-flex min-h-[36px] items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 font-medium outline-none",
      "focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-background data-[state=active]:text-foreground",
      e
    ),
    style: {
      fontSize: "var(--text-small)",
      boxShadow: "var(--shadow-sm)",
      transition: "background-color var(--duration-fast) var(--ease-standard)",
      ...t
    },
    ...r
  }
));
fr.displayName = "TabsTrigger";
const gr = s.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  Q.Content,
  {
    ref: r,
    className: n("mt-2 outline-none focus-visible:ring-2 focus-visible:ring-ring", e),
    ...t
  }
));
gr.displayName = "TabsContent";
const Le = s.forwardRef(({ className: e, style: t, ...r }, o) => /* @__PURE__ */ a(
  "textarea",
  {
    ref: o,
    className: n(
      "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2",
      "text-foreground placeholder:text-muted-foreground",
      "outline-none focus-visible:ring-2 focus-visible:ring-ring",
      "disabled:cursor-not-allowed disabled:opacity-50",
      e
    ),
    style: { fontSize: "var(--text-body)", ...t },
    ...r
  }
));
Le.displayName = "Textarea";
const Oe = K(
  n(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium outline-none",
    "hover:bg-muted hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
  ),
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "min-h-[44px] min-w-[44px] px-3",
        sm: "min-h-[36px] min-w-[36px] px-2",
        lg: "min-h-[48px] min-w-[48px] px-5"
      }
    },
    defaultVariants: { variant: "default", size: "default" }
  }
), br = s.forwardRef(({ className: e, variant: t, size: r, style: o, ...i }, d) => /* @__PURE__ */ a(
  ct.Root,
  {
    ref: d,
    className: n(Oe({ variant: t, size: r }), e),
    style: {
      fontSize: "var(--text-small)",
      transition: "background-color var(--duration-fast) var(--ease-standard)",
      ...o
    },
    ...i
  }
));
br.displayName = "Toggle";
const Ee = s.createContext({
  size: "default",
  variant: "default"
}), hr = s.forwardRef(({ className: e, variant: t, size: r, children: o, ...i }, d) => /* @__PURE__ */ a(
  xe.Root,
  {
    ref: d,
    className: n("flex items-center justify-center gap-1", e),
    ...i,
    children: /* @__PURE__ */ a(Ee.Provider, { value: { variant: t, size: r }, children: o })
  }
));
hr.displayName = "ToggleGroup";
const yr = s.forwardRef(({ className: e, children: t, variant: r, size: o, style: i, ...d }, m) => {
  const u = s.useContext(Ee);
  return /* @__PURE__ */ a(
    xe.Item,
    {
      ref: m,
      className: n(
        Oe({ variant: u.variant || r, size: u.size || o }),
        e
      ),
      style: {
        fontSize: "var(--text-small)",
        transition: "background-color var(--duration-fast) var(--ease-standard)",
        ...i
      },
      ...d,
      children: t
    }
  );
});
yr.displayName = "ToggleGroupItem";
const wo = q.Provider, So = q.Root, Co = q.Trigger, xr = s.forwardRef(({ className: e, sideOffset: t = 4, style: r, ...o }, i) => /* @__PURE__ */ a(q.Portal, { children: /* @__PURE__ */ a(
  q.Content,
  {
    ref: i,
    sideOffset: t,
    className: n(
      "z-50 overflow-hidden rounded-sm border border-border bg-popover px-3 py-1.5 text-popover-foreground",
      "data-[state=delayed-open]:opacity-100 data-[state=closed]:opacity-0",
      e
    ),
    style: {
      fontSize: "var(--text-small)",
      boxShadow: "var(--shadow-md)",
      transition: "opacity var(--duration-fast) var(--ease-standard)",
      ...r
    },
    ...o
  }
) }));
xr.displayName = "TooltipContent";
const vr = `
.prumo-dt[data-mobile-cards="true"] { }
@media (max-width: 47.99em) {
  .prumo-dt[data-mobile-cards="true"] thead { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
  .prumo-dt[data-mobile-cards="true"] tr { display: block; border: 1px solid var(--border); border-radius: var(--radius-lg); margin-bottom: var(--density-gap); padding: var(--density-padding); box-shadow: var(--shadow-sm); }
  .prumo-dt[data-mobile-cards="true"] td { display: flex; justify-content: space-between; gap: 1rem; padding: 0.35rem 0; border: 0; text-align: right; }
  .prumo-dt[data-mobile-cards="true"] td::before { content: attr(data-label); font-weight: 600; color: var(--muted-foreground); text-align: left; }
}
`;
function Ro({
  columns: e,
  data: t,
  enableFiltering: r = !0,
  enablePagination: o = !0,
  pageSize: i = 10,
  filterPlaceholder: d = "Search…",
  emptyState: m,
  caption: u,
  className: f
}) {
  const [x, R] = s.useState([]), [S, T] = s.useState([]), [D, L] = s.useState(""), I = B(), k = Ze({
    data: t,
    columns: e,
    getCoreRowModel: rt(),
    getSortedRowModel: at(),
    getFilteredRowModel: tt(),
    getPaginationRowModel: o ? et() : void 0,
    onSortingChange: R,
    onColumnFiltersChange: T,
    onGlobalFilterChange: L,
    state: { sorting: x, columnFilters: S, globalFilter: D },
    initialState: { pagination: { pageSize: i } }
  }), O = k.getRowModel().rows, c = (p) => {
    const g = k.getColumn(p), b = g == null ? void 0 : g.columnDef.header;
    return typeof b == "string" ? b : p;
  };
  return /* @__PURE__ */ l("div", { className: n("prumo-dt w-full", f), "data-mobile-cards": "true", children: [
    /* @__PURE__ */ a("style", { children: vr }),
    r && /* @__PURE__ */ a("div", { className: "mb-4 flex items-center gap-2", children: /* @__PURE__ */ l("div", { className: "relative w-full max-w-sm", children: [
      /* @__PURE__ */ a(
        he,
        {
          className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ a(
        ie,
        {
          value: D ?? "",
          onChange: (p) => L(p.target.value),
          placeholder: d,
          "aria-label": d,
          className: "pl-9"
        }
      )
    ] }) }),
    /* @__PURE__ */ a("div", { className: "overflow-hidden rounded-lg border border-border", children: /* @__PURE__ */ l(
      "table",
      {
        className: "w-full caption-bottom border-collapse",
        style: { fontSize: "var(--text-small)" },
        children: [
          u && /* @__PURE__ */ a("caption", { className: "sr-only", children: u }),
          /* @__PURE__ */ a("thead", { className: "[&_tr]:border-b [&_tr]:border-border bg-muted/40", children: k.getHeaderGroups().map((p) => /* @__PURE__ */ a("tr", { children: p.headers.map((g) => {
            const b = g.column.getCanSort(), M = g.column.getIsSorted();
            return /* @__PURE__ */ a(
              "th",
              {
                className: "h-11 px-4 text-left align-middle font-medium text-muted-foreground",
                "aria-sort": M === "asc" ? "ascending" : M === "desc" ? "descending" : void 0,
                children: g.isPlaceholder ? null : b ? /* @__PURE__ */ l(
                  "button",
                  {
                    type: "button",
                    onClick: g.column.getToggleSortingHandler(),
                    className: "inline-flex min-h-[44px] items-center gap-1 font-medium outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
                    style: { transition: "color var(--duration-fast) var(--ease-standard)" },
                    children: [
                      te(g.column.columnDef.header, g.getContext()),
                      M === "asc" ? /* @__PURE__ */ a(Ue, { className: "h-3.5 w-3.5", "aria-hidden": "true" }) : M === "desc" ? /* @__PURE__ */ a(Ke, { className: "h-3.5 w-3.5", "aria-hidden": "true" }) : /* @__PURE__ */ a(We, { className: "h-3.5 w-3.5 opacity-50", "aria-hidden": "true" })
                    ]
                  }
                ) : te(g.column.columnDef.header, g.getContext())
              },
              g.id
            );
          }) }, p.id)) }),
          /* @__PURE__ */ a("tbody", { className: "[&_tr:last-child]:border-0", children: O.length === 0 ? /* @__PURE__ */ a("tr", { children: /* @__PURE__ */ a("td", { colSpan: e.length, className: "p-8 text-center text-muted-foreground", children: m ?? "No results found." }) }) : O.map((p, g) => /* @__PURE__ */ a(
            G.tr,
            {
              "data-state": p.getIsSelected() ? "selected" : void 0,
              className: "border-b border-border bg-card hover:bg-muted/50",
              initial: I ? !1 : { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              transition: I ? { duration: 0 } : { duration: 0.3, delay: Math.min(g * 0.03, 0.3), ease: [0.2, 0, 0.38, 0.9] },
              children: p.getVisibleCells().map((b) => /* @__PURE__ */ a(
                "td",
                {
                  className: "p-4 align-middle",
                  "data-label": c(b.column.id),
                  children: te(b.column.columnDef.cell, b.getContext())
                },
                b.id
              ))
            },
            p.id
          )) })
        ]
      }
    ) }),
    o && O.length > 0 && /* @__PURE__ */ l("div", { className: "mt-4 flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ l("p", { className: "text-muted-foreground", style: { fontSize: "var(--text-small)" }, children: [
        "Page ",
        k.getState().pagination.pageIndex + 1,
        " of ",
        k.getPageCount() || 1,
        " · ",
        k.getFilteredRowModel().rows.length,
        " row(s)"
      ] }),
      /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ a(
          U,
          {
            variant: "outline",
            size: "sm",
            onClick: () => k.previousPage(),
            disabled: !k.getCanPreviousPage(),
            children: "Previous"
          }
        ),
        /* @__PURE__ */ a(
          U,
          {
            variant: "outline",
            size: "sm",
            onClick: () => k.nextPage(),
            disabled: !k.getCanNextPage(),
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
const Nr = `
@media (max-width: 47.99em) {
  .prumo-ct thead { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
  .prumo-ct, .prumo-ct tbody, .prumo-ct tr, .prumo-ct th, .prumo-ct td { display: block; }
  .prumo-ct { border: 0; }
  /* Each ATTRIBUTE row becomes a labelled block inside a per-entity card column.
     We pivot by stacking: every data cell shows its entity name via data-entity. */
  .prumo-ct tr { border: 1px solid var(--border); border-radius: var(--radius-lg); margin-bottom: var(--density-gap); padding: var(--density-padding); box-shadow: var(--shadow-sm); background: var(--card); }
  .prumo-ct th[scope="row"] { font-weight: 600; color: var(--foreground); padding: 0 0 0.5rem 0; }
  .prumo-ct td { display: flex; justify-content: space-between; gap: 1rem; padding: 0.35rem 0; text-align: right; }
  .prumo-ct td::before { content: attr(data-entity); font-weight: 600; color: var(--muted-foreground); text-align: left; }
}
`;
function wr(e, t) {
  const r = t.format ?? "text";
  if (e == null || e === "")
    return /* @__PURE__ */ a("span", { className: "text-muted-foreground", children: "—" });
  switch (r) {
    case "check":
      return e ? /* @__PURE__ */ l("span", { className: "inline-flex items-center gap-1 text-foreground", children: [
        /* @__PURE__ */ a(_, { className: "h-4 w-4 text-primary", "aria-hidden": "true" }),
        /* @__PURE__ */ a("span", { className: "sr-only", children: "Yes" })
      ] }) : /* @__PURE__ */ l("span", { className: "inline-flex items-center gap-1 text-muted-foreground", children: [
        /* @__PURE__ */ a(Ye, { className: "h-4 w-4", "aria-hidden": "true" }),
        /* @__PURE__ */ a("span", { className: "sr-only", children: "No" })
      ] });
    case "badge":
      return /* @__PURE__ */ a(we, { variant: "secondary", children: String(e) });
    case "score": {
      const o = t.scoreMax ?? 5, i = typeof e == "number" ? e : Number(e), d = Number.isFinite(i) ? Math.max(0, Math.min(1, i / o)) : 0;
      return /* @__PURE__ */ l("span", { className: "inline-flex items-center gap-2", children: [
        /* @__PURE__ */ a(
          "span",
          {
            "aria-hidden": "true",
            className: "relative inline-block h-2 w-16 overflow-hidden rounded-full bg-secondary",
            children: /* @__PURE__ */ a(
              "span",
              {
                className: "absolute left-0 top-0 h-full bg-primary",
                style: { width: `${d * 100}%`, transition: "width var(--duration-base) var(--ease-standard)" }
              }
            )
          }
        ),
        /* @__PURE__ */ l("span", { className: "tabular-nums", children: [
          Number.isFinite(i) ? i : String(e),
          /* @__PURE__ */ l("span", { className: "text-muted-foreground", children: [
            "/",
            o
          ] })
        ] })
      ] });
    }
    case "currency": {
      const o = typeof e == "number" ? e : Number(e);
      if (!Number.isFinite(o)) return /* @__PURE__ */ a("span", { children: String(e) });
      try {
        return /* @__PURE__ */ a("span", { className: "tabular-nums", children: new Intl.NumberFormat(void 0, {
          style: "currency",
          currency: t.currency ?? "USD",
          maximumFractionDigits: 0
        }).format(o) });
      } catch {
        return /* @__PURE__ */ a("span", { className: "tabular-nums", children: o });
      }
    }
    case "text":
    default:
      return /* @__PURE__ */ a("span", { children: String(e) });
  }
}
function To({
  entities: e,
  attributes: t,
  emptyState: r,
  caption: o,
  className: i
}) {
  const d = B();
  return e.length === 0 || t.length === 0 ? /* @__PURE__ */ a(
    "div",
    {
      className: n(
        "flex items-center justify-center rounded-lg border border-border bg-card p-8 text-center text-muted-foreground",
        i
      ),
      children: r ?? "Nothing to compare yet."
    }
  ) : /* @__PURE__ */ l("div", { className: n("prumo-ct w-full overflow-hidden rounded-lg border border-border", i), children: [
    /* @__PURE__ */ a("style", { children: Nr }),
    /* @__PURE__ */ l("table", { className: "w-full caption-bottom border-collapse", style: { fontSize: "var(--text-small)" }, children: [
      o && /* @__PURE__ */ a("caption", { className: "sr-only", children: o }),
      /* @__PURE__ */ a("thead", { className: "bg-muted/40", children: /* @__PURE__ */ l("tr", { className: "border-b border-border", children: [
        /* @__PURE__ */ a("th", { scope: "col", className: "h-12 px-4 text-left align-bottom font-medium text-muted-foreground", children: /* @__PURE__ */ a("span", { className: "sr-only", children: "Attribute" }) }),
        e.map((m) => /* @__PURE__ */ l("th", { scope: "col", className: "h-12 px-4 text-left align-bottom", children: [
          /* @__PURE__ */ a("span", { className: "block font-semibold text-foreground", style: { fontFamily: "var(--font-display)" }, children: m.name }),
          m.subtitle && /* @__PURE__ */ a("span", { className: "block text-muted-foreground", children: m.subtitle })
        ] }, m.id))
      ] }) }),
      /* @__PURE__ */ a("tbody", { children: t.map((m, u) => /* @__PURE__ */ l(
        G.tr,
        {
          className: "border-b border-border last:border-0",
          initial: d ? !1 : { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: d ? { duration: 0 } : { duration: 0.3, delay: Math.min(u * 0.04, 0.4), ease: [0.2, 0, 0.38, 0.9] },
          children: [
            /* @__PURE__ */ l("th", { scope: "row", className: "px-4 py-3 text-left align-top font-medium text-foreground", children: [
              m.label,
              m.hint && /* @__PURE__ */ a("span", { className: "block font-normal text-muted-foreground", children: m.hint })
            ] }),
            e.map((f) => /* @__PURE__ */ a("td", { className: "px-4 py-3 align-top", "data-entity": f.name, children: wr(f.values[m.id], m) }, f.id))
          ]
        },
        m.id
      )) })
    ] })
  ] });
}
function Do({
  items: e,
  renderItem: t,
  getKey: r,
  layout: o = "grid",
  minCardWidth: i = "16rem",
  emptyState: d,
  "aria-label": m,
  className: u
}) {
  const f = B();
  if (e.length === 0)
    return /* @__PURE__ */ a(
      "div",
      {
        className: n(
          "flex items-center justify-center rounded-lg border border-dashed border-border bg-card p-10 text-center text-muted-foreground",
          u
        ),
        children: d ?? "Nothing here yet."
      }
    );
  const x = o === "grid" ? {
    display: "grid",
    gap: "var(--density-gap)",
    gridTemplateColumns: `repeat(auto-fill, minmax(min(${i}, 100%), 1fr))`
  } : o === "list" ? { display: "flex", flexDirection: "column", gap: "var(--density-gap)" } : {
    // masonry via CSS multi-columns: reflows column count by width.
    columnWidth: i,
    columnGap: "var(--density-gap)"
  }, R = o === "masonry";
  return /* @__PURE__ */ a(
    "ul",
    {
      role: "list",
      "aria-label": m,
      className: n("m-0 list-none p-0", u),
      style: x,
      children: e.map((S, T) => {
        const D = r ? r(S, T) : T;
        return /* @__PURE__ */ a(
          G.li,
          {
            role: "listitem",
            className: R ? "mb-[var(--density-gap)] break-inside-avoid" : void 0,
            style: R ? { breakInside: "avoid" } : void 0,
            initial: f ? !1 : { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: f ? { duration: 0 } : { duration: 0.3, delay: Math.min(T * 0.04, 0.4), ease: [0, 0, 0.38, 0.9] },
            children: t(S, T)
          },
          D
        );
      })
    }
  );
}
function Sr({ deltaPct: e }) {
  const t = e >= 0;
  return /* @__PURE__ */ l(
    "span",
    {
      className: n(
        "inline-flex items-center gap-0.5 rounded-sm px-1.5 py-0.5 font-medium",
        t ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
      ),
      style: { fontSize: "var(--text-small)" },
      children: [
        t ? /* @__PURE__ */ a(Xe, { className: "h-3.5 w-3.5", "aria-hidden": "true" }) : /* @__PURE__ */ a(Je, { className: "h-3.5 w-3.5", "aria-hidden": "true" }),
        Math.abs(e).toFixed(1),
        "%",
        /* @__PURE__ */ a("span", { className: "sr-only", children: t ? "increase" : "decrease" })
      ]
    }
  );
}
const Cr = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
};
function Rr({ spec: e }) {
  const t = e.colorTokens ?? ["primary", "accent"], [r, o] = mt(t), i = {
    data: e.data,
    colors: o,
    showAnimation: !1,
    className: "h-64 mt-2"
  };
  return /* @__PURE__ */ l("div", { ref: r, children: [
    e.title && /* @__PURE__ */ a("h3", { className: "mb-1 font-medium text-foreground", style: { fontSize: "var(--text-body)" }, children: e.title }),
    e.kind === "area" && /* @__PURE__ */ a(st, { ...i, index: e.index ?? "date", categories: e.categories ?? [] }),
    e.kind === "bar" && /* @__PURE__ */ a(it, { ...i, index: e.index ?? "date", categories: e.categories ?? [] }),
    e.kind === "line" && /* @__PURE__ */ a(lt, { ...i, index: e.index ?? "date", categories: e.categories ?? [] }),
    e.kind === "donut" && /* @__PURE__ */ a(dt, { ...i, index: e.index ?? "name", category: e.category ?? "value" })
  ] });
}
function ko({
  kpis: e,
  chart: t,
  columns: r = 4,
  emptyState: o,
  className: i,
  "aria-label": d
}) {
  const m = B();
  return e.length === 0 && !t ? /* @__PURE__ */ a(
    "div",
    {
      className: n(
        "flex items-center justify-center rounded-lg border border-dashed border-border bg-card p-10 text-center text-muted-foreground",
        i
      ),
      children: o ?? "No metrics to show."
    }
  ) : /* @__PURE__ */ l("section", { className: n("w-full", i), "aria-label": d ?? "Dashboard", children: [
    e.length > 0 && /* @__PURE__ */ a("div", { className: n("grid gap-[var(--density-gap)]", Cr[r]), children: e.map((u, f) => /* @__PURE__ */ a(
      G.div,
      {
        initial: m ? !1 : { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: m ? { duration: 0 } : { duration: 0.3, delay: Math.min(f * 0.05, 0.3), ease: [0, 0, 0.38, 0.9] },
        children: /* @__PURE__ */ l(re, { children: [
          /* @__PURE__ */ a(Se, { className: "pb-2", children: /* @__PURE__ */ a(
            Ce,
            {
              className: "font-medium text-muted-foreground",
              style: { fontSize: "var(--text-small)", fontFamily: "var(--font-body)" },
              children: u.label
            }
          ) }),
          /* @__PURE__ */ l(oe, { children: [
            /* @__PURE__ */ l("div", { className: "flex items-baseline gap-2", children: [
              /* @__PURE__ */ a(
                "span",
                {
                  className: "font-semibold text-foreground tabular-nums",
                  style: { fontSize: "var(--text-h2)", fontFamily: "var(--font-display)" },
                  children: u.value
                }
              ),
              typeof u.deltaPct == "number" && /* @__PURE__ */ a(Sr, { deltaPct: u.deltaPct })
            ] }),
            u.hint && /* @__PURE__ */ a("p", { className: "mt-1 text-muted-foreground", style: { fontSize: "var(--text-small)" }, children: u.hint })
          ] })
        ] })
      },
      `${u.label}-${f}`
    )) }),
    t && /* @__PURE__ */ a(re, { className: "mt-[var(--density-gap)]", children: /* @__PURE__ */ a(oe, { className: "pt-6", children: /* @__PURE__ */ a(Rr, { spec: t }) }) })
  ] });
}
function Mo({
  columns: e,
  renderCard: t,
  onMoveCard: r,
  emptyColumnText: o = "No items",
  emptyState: i,
  className: d,
  "aria-label": m
}) {
  const u = B();
  return e.length === 0 ? /* @__PURE__ */ a(
    "div",
    {
      className: n(
        "flex items-center justify-center rounded-lg border border-dashed border-border bg-card p-10 text-center text-muted-foreground",
        d
      ),
      children: i ?? "No columns yet."
    }
  ) : /* @__PURE__ */ a(
    "div",
    {
      role: "group",
      "aria-label": m ?? "Board",
      className: n(
        // vertical stack on mobile -> horizontal sc*non-wrapping* row on >=md.
        "flex flex-col gap-[var(--density-gap)] md:flex-row md:items-start md:overflow-x-auto",
        d
      ),
      children: e.map((f, x) => {
        const R = e[x - 1], S = e[x + 1];
        return /* @__PURE__ */ l(
          "section",
          {
            "aria-label": f.title,
            className: "flex w-full shrink-0 flex-col rounded-lg border border-border bg-muted/40 p-3 md:w-72",
            children: [
              /* @__PURE__ */ l("header", { className: "mb-2 flex items-center justify-between gap-2 px-1", children: [
                /* @__PURE__ */ l("h3", { className: "flex items-center gap-2 font-medium text-foreground", style: { fontSize: "var(--text-body)" }, children: [
                  /* @__PURE__ */ a(
                    "span",
                    {
                      "aria-hidden": "true",
                      className: "inline-block h-2.5 w-2.5 rounded-full",
                      style: { background: `var(--${f.accentToken ?? "primary"})` }
                    }
                  ),
                  f.title
                ] }),
                /* @__PURE__ */ a(we, { variant: "secondary", children: f.cards.length })
              ] }),
              /* @__PURE__ */ a("ul", { role: "list", className: "flex flex-col gap-[var(--density-gap)] p-0 m-0 list-none", children: f.cards.length === 0 ? /* @__PURE__ */ a("li", { className: "rounded-md border border-dashed border-border p-4 text-center text-muted-foreground", style: { fontSize: "var(--text-small)" }, children: o }) : f.cards.map((T, D) => /* @__PURE__ */ l(
                G.li,
                {
                  role: "listitem",
                  className: "rounded-md border border-border bg-card p-3",
                  style: { boxShadow: "var(--shadow-sm)" },
                  initial: u ? !1 : { opacity: 0, y: 8 },
                  animate: { opacity: 1, y: 0 },
                  transition: u ? { duration: 0 } : { duration: 0.3, delay: Math.min(D * 0.03, 0.25), ease: [0, 0, 0.38, 0.9] },
                  children: [
                    t(T, f),
                    r && (R || S) && /* @__PURE__ */ l("div", { className: "mt-2 flex justify-end gap-1", children: [
                      R && /* @__PURE__ */ a(
                        "button",
                        {
                          type: "button",
                          onClick: () => r(T.id, f.id, R.id),
                          "aria-label": `Move to ${R.title}`,
                          className: "inline-flex h-11 min-w-[44px] items-center justify-center rounded-sm px-2 text-muted-foreground outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring",
                          style: { fontSize: "var(--text-small)" },
                          children: "←"
                        }
                      ),
                      S && /* @__PURE__ */ a(
                        "button",
                        {
                          type: "button",
                          onClick: () => r(T.id, f.id, S.id),
                          "aria-label": `Move to ${S.title}`,
                          className: "inline-flex h-11 min-w-[44px] items-center justify-center rounded-sm px-2 text-muted-foreground outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring",
                          style: { fontSize: "var(--text-small)" },
                          children: "→"
                        }
                      )
                    ] })
                  ]
                },
                T.id
              )) })
            ]
          },
          f.id
        );
      })
    }
  );
}
function Tr(e, t) {
  const r = {};
  for (const o of e.fields) {
    if (!o.required) continue;
    const i = t[o.name];
    (i === void 0 || i === "" || o.type === "checkbox" && i !== !0) && (r[o.name] = `${o.label} is required.`);
  }
  return r;
}
function zo({
  steps: e,
  initialValues: t = {},
  onSubmit: r,
  onChange: o,
  className: i,
  emptyState: d
}) {
  const m = B(), [u, f] = s.useState(0), [x, R] = s.useState(t), [S, T] = s.useState({});
  if (e.length === 0)
    return /* @__PURE__ */ a(
      "div",
      {
        className: n(
          "flex items-center justify-center rounded-lg border border-dashed border-border bg-card p-10 text-center text-muted-foreground",
          i
        ),
        children: d ?? "No steps configured."
      }
    );
  const D = e[u], L = u === e.length - 1, I = (c, p) => {
    const g = { ...x, [c]: p };
    R(g), o == null || o(g), S[c] && T((b) => ({ ...b, [c]: "" }));
  }, k = () => {
    const c = Tr(D, x);
    if (Object.keys(c).length > 0) {
      T(c);
      return;
    }
    L ? r == null || r(x) : f((p) => p + 1);
  }, O = () => f((c) => Math.max(0, c - 1));
  return /* @__PURE__ */ l(
    "form",
    {
      className: n("w-full", i),
      noValidate: !0,
      onSubmit: (c) => {
        c.preventDefault(), k();
      },
      children: [
        /* @__PURE__ */ a("ol", { className: "mb-6 flex flex-wrap items-center gap-2", "aria-label": "Progress", children: e.map((c, p) => {
          const g = p < u, b = p === u;
          return /* @__PURE__ */ l("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ a(
              "span",
              {
                "aria-current": b ? "step" : void 0,
                className: n(
                  "inline-flex h-8 w-8 items-center justify-center rounded-full border text-center font-medium",
                  g && "bg-primary text-primary-foreground border-transparent",
                  b && "border-primary text-primary",
                  !g && !b && "border-border text-muted-foreground"
                ),
                style: { fontSize: "var(--text-small)" },
                children: g ? /* @__PURE__ */ a(_, { className: "h-4 w-4", "aria-hidden": "true" }) : p + 1
              }
            ),
            /* @__PURE__ */ a(
              "span",
              {
                className: n(
                  "hidden sm:inline",
                  b ? "text-foreground" : "text-muted-foreground"
                ),
                style: { fontSize: "var(--text-small)" },
                children: c.title
              }
            ),
            p < e.length - 1 && /* @__PURE__ */ a("span", { "aria-hidden": "true", className: "mx-1 h-px w-6 bg-border" })
          ] }, c.id);
        }) }),
        /* @__PURE__ */ l(
          G.fieldset,
          {
            className: "m-0 border-0 p-0",
            initial: m ? !1 : { opacity: 0, x: 12 },
            animate: { opacity: 1, x: 0 },
            transition: m ? { duration: 0 } : { duration: 0.3, ease: [0, 0, 0.38, 0.9] },
            children: [
              /* @__PURE__ */ a("legend", { className: "mb-1 font-semibold text-foreground", style: { fontSize: "var(--text-h3)", fontFamily: "var(--font-display)" }, children: D.title }),
              D.description && /* @__PURE__ */ a("p", { className: "mb-4 text-muted-foreground", style: { fontSize: "var(--text-small)" }, children: D.description }),
              /* @__PURE__ */ a("div", { className: "grid gap-4", children: D.fields.map((c) => {
                const p = `fw-${D.id}-${c.name}`, g = `${p}-err`, b = `${p}-hint`, M = S[c.name], E = [c.hint ? b : null, M ? g : null].filter(Boolean).join(" ") || void 0;
                return /* @__PURE__ */ l("div", { className: "grid gap-1.5", children: [
                  c.type !== "checkbox" && /* @__PURE__ */ l(Y, { htmlFor: p, children: [
                    c.label,
                    c.required && /* @__PURE__ */ a("span", { className: "text-destructive", children: " *" })
                  ] }),
                  c.type === "text" || c.type === "number" ? /* @__PURE__ */ a(
                    ie,
                    {
                      id: p,
                      type: c.type,
                      placeholder: c.placeholder,
                      required: c.required,
                      "aria-required": c.required,
                      "aria-invalid": !!M,
                      "aria-describedby": E,
                      value: x[c.name] ?? "",
                      onChange: (h) => I(c.name, c.type === "number" ? h.target.valueAsNumber : h.target.value)
                    }
                  ) : c.type === "textarea" ? /* @__PURE__ */ a(
                    Le,
                    {
                      id: p,
                      placeholder: c.placeholder,
                      required: c.required,
                      "aria-required": c.required,
                      "aria-invalid": !!M,
                      "aria-describedby": E,
                      value: x[c.name] ?? "",
                      onChange: (h) => I(c.name, h.target.value)
                    }
                  ) : c.type === "select" ? /* @__PURE__ */ l(
                    qa,
                    {
                      value: x[c.name] ?? "",
                      onValueChange: (h) => I(c.name, h),
                      children: [
                        /* @__PURE__ */ a(Ae, { id: p, "aria-required": c.required, "aria-invalid": !!M, "aria-describedby": E, children: /* @__PURE__ */ a(Ua, { placeholder: c.placeholder ?? "Select…" }) }),
                        /* @__PURE__ */ a(Fe, { children: (c.options ?? []).map((h) => /* @__PURE__ */ a(Be, { value: h.value, children: h.label }, h.value)) })
                      ]
                    }
                  ) : c.type === "radio" ? /* @__PURE__ */ a(
                    ze,
                    {
                      "aria-label": c.label,
                      "aria-required": c.required,
                      "aria-describedby": E,
                      value: x[c.name] ?? "",
                      onValueChange: (h) => I(c.name, h),
                      children: (c.options ?? []).map((h) => {
                        const ce = `${p}-${h.value}`;
                        return /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ a(Ie, { value: h.value, id: ce }),
                          /* @__PURE__ */ a(Y, { htmlFor: ce, className: "font-normal", children: h.label })
                        ] }, h.value);
                      })
                    }
                  ) : (
                    // checkbox
                    /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ a(
                        Re,
                        {
                          id: p,
                          "aria-required": c.required,
                          "aria-invalid": !!M,
                          "aria-describedby": E,
                          checked: x[c.name] === !0,
                          onCheckedChange: (h) => I(c.name, h === !0)
                        }
                      ),
                      /* @__PURE__ */ l(Y, { htmlFor: p, className: "font-normal", children: [
                        c.label,
                        c.required && /* @__PURE__ */ a("span", { className: "text-destructive", children: " *" })
                      ] })
                    ] })
                  ),
                  c.hint && /* @__PURE__ */ a("p", { id: b, className: "text-muted-foreground", style: { fontSize: "var(--text-small)" }, children: c.hint }),
                  M && /* @__PURE__ */ a("p", { id: g, role: "alert", className: "text-destructive", style: { fontSize: "var(--text-small)" }, children: M })
                ] }, c.name);
              }) })
            ]
          },
          D.id
        ),
        /* @__PURE__ */ l("div", { className: "mt-6 flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ a(U, { type: "button", variant: "outline", onClick: O, disabled: u === 0, children: "Back" }),
          /* @__PURE__ */ a(U, { type: "submit", children: L ? "Submit" : "Next" })
        ] })
      ]
    }
  );
}
export {
  Er as Accordion,
  ft as AccordionContent,
  ut as AccordionItem,
  pt as AccordionTrigger,
  bt as Alert,
  yt as AlertDescription,
  Hr as AlertDialog,
  Rt as AlertDialogAction,
  Tt as AlertDialogCancel,
  vt as AlertDialogContent,
  Ct as AlertDialogDescription,
  wt as AlertDialogFooter,
  Nt as AlertDialogHeader,
  Ne as AlertDialogOverlay,
  xt as AlertDialogPortal,
  St as AlertDialogTitle,
  $r as AlertDialogTrigger,
  ht as AlertTitle,
  Dt as Avatar,
  Mt as AvatarFallback,
  kt as AvatarImage,
  we as Badge,
  Mo as Board,
  It as Breadcrumb,
  Bt as BreadcrumbEllipsis,
  At as BreadcrumbItem,
  _t as BreadcrumbLink,
  Pt as BreadcrumbList,
  jt as BreadcrumbPage,
  Ft as BreadcrumbSeparator,
  U as Button,
  Ao as COLOR_TOKENS,
  Gt as Calendar,
  re as Card,
  Do as CardCollection,
  oe as CardContent,
  Lt as CardDescription,
  Ot as CardFooter,
  Se as CardHeader,
  Ce as CardTitle,
  Re as Checkbox,
  ke as Command,
  Ur as CommandDialog,
  Yt as CommandEmpty,
  Xt as CommandGroup,
  Kt as CommandInput,
  Qt as CommandItem,
  Wt as CommandList,
  Jt as CommandSeparator,
  Zt as CommandShortcut,
  To as ComparisonTable,
  Kr as ContextMenu,
  oa as ContextMenuCheckboxItem,
  aa as ContextMenuContent,
  Yr as ContextMenuGroup,
  ra as ContextMenuItem,
  sa as ContextMenuLabel,
  Xr as ContextMenuPortal,
  Qr as ContextMenuRadioGroup,
  na as ContextMenuRadioItem,
  ia as ContextMenuSeparator,
  Jr as ContextMenuSub,
  ta as ContextMenuSubContent,
  ea as ContextMenuSubTrigger,
  Wr as ContextMenuTrigger,
  _o as DENSITY_TOKENS,
  Ro as DataTable,
  Et as Dialog,
  qr as DialogClose,
  De as DialogContent,
  Ut as DialogDescription,
  Vt as DialogFooter,
  $t as DialogHeader,
  Te as DialogOverlay,
  Ht as DialogPortal,
  qt as DialogTitle,
  Vr as DialogTrigger,
  la as Drawer,
  eo as DrawerClose,
  ca as DrawerContent,
  fa as DrawerDescription,
  ua as DrawerFooter,
  ma as DrawerHeader,
  Me as DrawerOverlay,
  da as DrawerPortal,
  pa as DrawerTitle,
  Zr as DrawerTrigger,
  to as DropdownMenu,
  xa as DropdownMenuCheckboxItem,
  ha as DropdownMenuContent,
  ro as DropdownMenuGroup,
  ya as DropdownMenuItem,
  Na as DropdownMenuLabel,
  oo as DropdownMenuPortal,
  so as DropdownMenuRadioGroup,
  va as DropdownMenuRadioItem,
  wa as DropdownMenuSeparator,
  Sa as DropdownMenuShortcut,
  no as DropdownMenuSub,
  ba as DropdownMenuSubContent,
  ga as DropdownMenuSubTrigger,
  ao as DropdownMenuTrigger,
  jo as FONT_TOKENS,
  zo as FormWizard,
  io as HoverCard,
  Ca as HoverCardContent,
  lo as HoverCardTrigger,
  ie as Input,
  Y as Label,
  Fo as MOTION_TOKENS,
  Ta as Menubar,
  Pa as MenubarCheckboxItem,
  za as MenubarContent,
  mo as MenubarGroup,
  Ia as MenubarItem,
  _a as MenubarLabel,
  co as MenubarMenu,
  Ra as MenubarPortal,
  po as MenubarRadioGroup,
  Aa as MenubarRadioItem,
  ja as MenubarSeparator,
  uo as MenubarSub,
  Ma as MenubarSubContent,
  ka as MenubarSubTrigger,
  Da as MenubarTrigger,
  Fa as Pagination,
  Ba as PaginationContent,
  Ea as PaginationEllipsis,
  Ga as PaginationItem,
  de as PaginationLink,
  Oa as PaginationNext,
  La as PaginationPrevious,
  fo as Popover,
  bo as PopoverAnchor,
  Ha as PopoverContent,
  go as PopoverTrigger,
  $a as Progress,
  Bo as RADIUS_TOKENS,
  ze as RadioGroup,
  Ie as RadioGroupItem,
  Go as SHADOW_TOKENS,
  Lo as SPACING_TOKENS,
  Oo as SURFACE_TOKENS,
  Va as ScrollArea,
  Pe as ScrollBar,
  qa as Select,
  Fe as SelectContent,
  ho as SelectGroup,
  Be as SelectItem,
  Ka as SelectLabel,
  je as SelectScrollDownButton,
  _e as SelectScrollUpButton,
  Wa as SelectSeparator,
  Ae as SelectTrigger,
  Ua as SelectValue,
  Ya as Separator,
  yo as Sheet,
  vo as SheetClose,
  Qa as SheetContent,
  ar as SheetDescription,
  er as SheetFooter,
  Za as SheetHeader,
  Ge as SheetOverlay,
  Xa as SheetPortal,
  tr as SheetTitle,
  xo as SheetTrigger,
  rr as Slider,
  ko as StatDashboard,
  or as Switch,
  He as TOKEN_FAMILIES,
  Eo as TOKEN_NAMES,
  Ho as TYPE_TOKENS,
  nr as Table,
  ir as TableBody,
  ur as TableCaption,
  mr as TableCell,
  lr as TableFooter,
  cr as TableHead,
  sr as TableHeader,
  dr as TableRow,
  No as Tabs,
  gr as TabsContent,
  pr as TabsList,
  fr as TabsTrigger,
  Le as Textarea,
  br as Toggle,
  hr as ToggleGroup,
  yr as ToggleGroupItem,
  Or as TokenPalette,
  ve as TokenSwatch,
  So as Tooltip,
  xr as TooltipContent,
  wo as TooltipProvider,
  Co as TooltipTrigger,
  zt as badgeVariants,
  A as buttonVariants,
  n as cn,
  Oe as toggleVariants,
  $o as tokenVar,
  mt as useTokenColors
};
//# sourceMappingURL=index.js.map
