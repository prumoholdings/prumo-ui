import { TOKEN_FAMILIES as xt } from "./tokens.js";
import { COLOR_TOKENS as Xn, DENSITY_TOKENS as Zn, FONT_TOKENS as Jn, MOTION_TOKENS as Qn, RADIUS_TOKENS as el, SHADOW_TOKENS as tl, SPACING_TOKENS as rl, SURFACE_TOKENS as al, TOKEN_NAMES as ol, TYPE_TOKENS as nl, tokenVar as ll } from "./tokens.js";
import { clsx as yt } from "clsx";
import { twMerge as Nt } from "tailwind-merge";
import * as s from "react";
import { jsx as t, jsxs as i, Fragment as wt } from "react/jsx-runtime";
import * as te from "@radix-ui/react-accordion";
import { ChevronDown as Te, MoreHorizontal as He, ChevronRight as W, ChevronLeft as Ve, Check as L, Minus as Ge, X as ne, Search as ze, Circle as be, ChevronUp as St, icons as kt, ArrowUp as Ct, ArrowDown as Rt, ChevronsUpDown as Tt, Info as zt, ArrowUpRight as Dt, ArrowDownRight as Mt, Plus as At, UploadCloud as It, File as Pt } from "lucide-react";
import { cva as Y } from "class-variance-authority";
import * as O from "@radix-ui/react-alert-dialog";
import { Slot as qe } from "@radix-ui/react-slot";
import * as De from "@radix-ui/react-avatar";
import { useReducedMotion as le, motion as se } from "framer-motion";
import * as _ from "@radix-ui/react-select";
import { DayPicker as Ft } from "react-day-picker";
import * as _e from "@radix-ui/react-checkbox";
import { Command as K } from "cmdk";
import * as D from "@radix-ui/react-dialog";
import * as A from "@radix-ui/react-context-menu";
import { useReactTable as _t, getPaginationRowModel as $t, getFilteredRowModel as jt, getSortedRowModel as Et, getCoreRowModel as Ot, flexRender as Se } from "@tanstack/react-table";
import { Drawer as B } from "vaul";
import * as I from "@radix-ui/react-dropdown-menu";
import * as Lt from "@radix-ui/react-label";
import * as Re from "@radix-ui/react-radio-group";
import * as ge from "@radix-ui/react-hover-card";
import * as P from "@radix-ui/react-menubar";
import * as re from "@radix-ui/react-popover";
import * as $e from "@radix-ui/react-progress";
import * as Q from "@radix-ui/react-scroll-area";
import * as Bt from "@radix-ui/react-separator";
import * as me from "@radix-ui/react-slider";
import { AreaChart as Ht, BarChart as Vt, LineChart as Gt } from "@tremor/react";
import * as je from "@radix-ui/react-switch";
import * as ve from "@radix-ui/react-tabs";
import * as U from "@radix-ui/react-toast";
import * as qt from "@radix-ui/react-toggle";
import * as Ke from "@radix-ui/react-toggle-group";
import * as ae from "@radix-ui/react-tooltip";
function n(...e) {
  return Nt(yt(e));
}
function Uo(e) {
  const r = s.useRef(null), [a, o] = s.useState(
    () => e.map((l) => `var(--${l})`)
  );
  return s.useEffect(() => {
    const l = r.current;
    if (!l || typeof window > "u") return;
    const d = getComputedStyle(l), m = e.map((u) => d.getPropertyValue(`--${u}`).trim() || `var(--${u})`);
    o(m);
  }, [e.join(",")]), [r, a];
}
const ie = {
  /** --duration-instant: 100ms */
  instant: 0.1,
  /** --duration-fast: 200ms */
  fast: 0.2,
  /** --duration-base: 300ms */
  base: 0.3,
  /** --duration-slow: 500ms */
  slow: 0.5
}, de = {
  /** --ease-entrance: cubic-bezier(0, 0, 0.38, 0.9) */
  entrance: [0, 0, 0.38, 0.9],
  /** --ease-exit: cubic-bezier(0.2, 0, 1, 0.9) */
  exit: [0.2, 0, 1, 0.9],
  /** --ease-standard: cubic-bezier(0.2, 0, 0.38, 0.9) */
  standard: [0.2, 0, 0.38, 0.9]
}, Ue = s.forwardRef(
  ({ token: e, label: r, className: a, style: o, ...l }, d) => /* @__PURE__ */ i(
    "div",
    {
      ref: d,
      className: n("inline-flex items-center gap-3 p-2", a),
      style: {
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-sm)",
        border: "1px solid var(--border)",
        background: "var(--card)",
        color: "var(--card-foreground)",
        transition: "transform var(--duration-fast) var(--ease-standard)",
        ...o
      },
      ...l,
      children: [
        /* @__PURE__ */ t(
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
        /* @__PURE__ */ t("span", { style: { fontSize: "var(--text-small)" }, children: r ?? e })
      ]
    }
  )
);
Ue.displayName = "TokenSwatch";
function Wo({ family: e = "color" }) {
  const r = xt[e];
  return /* @__PURE__ */ t(
    "div",
    {
      className: "container",
      style: { display: "flex", flexWrap: "wrap", gap: "var(--density-gap)" },
      children: r.map((a) => /* @__PURE__ */ t(Ue, { token: a }, a))
    }
  );
}
const Yo = te.Root, Kt = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t(
  te.Item,
  {
    ref: a,
    className: n("border-b border-border", e),
    ...r
  }
));
Kt.displayName = "AccordionItem";
const Ut = s.forwardRef(({ className: e, children: r, ...a }, o) => /* @__PURE__ */ t(te.Header, { className: "flex", children: /* @__PURE__ */ i(
  te.Trigger,
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
    ...a,
    children: [
      r,
      /* @__PURE__ */ t(
        Te,
        {
          className: "h-4 w-4 shrink-0 text-muted-foreground",
          style: { transition: "transform var(--duration-fast) var(--ease-standard)" },
          "aria-hidden": "true"
        }
      )
    ]
  }
) }));
Ut.displayName = "AccordionTrigger";
const Wt = s.forwardRef(({ className: e, children: r, ...a }, o) => /* @__PURE__ */ t(
  te.Content,
  {
    ref: o,
    className: "overflow-hidden text-muted-foreground data-[state=closed]:animate-none",
    style: { fontSize: "var(--text-small)" },
    ...a,
    children: /* @__PURE__ */ t("div", { className: n("pb-4 pt-0", e), children: r })
  }
));
Wt.displayName = "AccordionContent";
const Yt = Y(
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
), Xt = s.forwardRef(({ className: e, variant: r, ...a }, o) => /* @__PURE__ */ t(
  "div",
  {
    ref: o,
    role: "alert",
    className: n(Yt({ variant: r }), e),
    ...a
  }
));
Xt.displayName = "Alert";
const Zt = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t(
  "h5",
  {
    ref: a,
    className: n("mb-1 font-medium leading-none tracking-tight", e),
    style: { fontSize: "var(--text-body)" },
    ...r
  }
));
Zt.displayName = "AlertTitle";
const Jt = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t(
  "div",
  {
    ref: a,
    className: n("[&_p]:leading-relaxed text-muted-foreground", e),
    style: { fontSize: "var(--text-small)" },
    ...r
  }
));
Jt.displayName = "AlertDescription";
const G = Y(
  n(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    // PRIMITIVE state grammar: press darkens + a subtle tactile scale; disabled
    // dims but keeps the hue.
    "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
  ),
  {
    variants: {
      // Solid variants DARKEN on hover/active (a shade of the same hue), never a
      // washed-out opacity reduction.
      variant: {
        default: "bg-primary text-primary-foreground hover:brightness-95 active:brightness-90",
        destructive: "bg-destructive text-destructive-foreground hover:brightness-95 active:brightness-90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground active:brightness-95",
        secondary: "bg-secondary text-secondary-foreground hover:brightness-95 active:brightness-90",
        ghost: "hover:bg-accent hover:text-accent-foreground active:brightness-95",
        accent: "bg-accent text-accent-foreground hover:brightness-95 active:brightness-90",
        link: "text-primary underline-offset-4 hover:underline active:scale-100"
      },
      size: {
        default: "min-h-[40px] px-4 py-2",
        sm: "min-h-[32px] rounded-md px-3 text-xs",
        lg: "min-h-[44px] rounded-md px-6",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: { variant: "default", size: "default" }
  }
), q = s.forwardRef(
  ({ className: e, variant: r, size: a, asChild: o = !1, style: l, ...d }, m) => /* @__PURE__ */ t(
    o ? qe : "button",
    {
      ref: m,
      className: n(G({ variant: r, size: a }), e),
      style: {
        fontSize: "var(--text-small)",
        transition: "background-color var(--duration-fast) var(--ease-standard), opacity var(--duration-fast) var(--ease-standard), transform var(--duration-instant) var(--ease-standard)",
        ...l
      },
      ...d
    }
  )
);
q.displayName = "Button";
const Xo = O.Root, Zo = O.Trigger, Qt = O.Portal, We = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
  O.Overlay,
  {
    ref: o,
    className: n(
      "fixed inset-0 z-50 bg-foreground/40",
      "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
      e
    ),
    style: { transition: "opacity var(--duration-base) var(--ease-standard)", ...r },
    ...a
  }
));
We.displayName = "AlertDialogOverlay";
const er = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ i(Qt, { children: [
  /* @__PURE__ */ t(We, {}),
  /* @__PURE__ */ t(
    O.Content,
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
        ...r
      },
      ...a
    }
  )
] }));
er.displayName = "AlertDialogContent";
const tr = ({ className: e, ...r }) => /* @__PURE__ */ t("div", { className: n("flex flex-col space-y-2 text-center sm:text-left", e), ...r });
tr.displayName = "AlertDialogHeader";
const rr = ({ className: e, ...r }) => /* @__PURE__ */ t(
  "div",
  {
    className: n("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", e),
    ...r
  }
);
rr.displayName = "AlertDialogFooter";
const ar = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
  O.Title,
  {
    ref: o,
    className: n("font-semibold", e),
    style: { fontSize: "var(--text-h3)", fontFamily: "var(--font-display)", ...r },
    ...a
  }
));
ar.displayName = "AlertDialogTitle";
const or = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
  O.Description,
  {
    ref: o,
    className: n("text-muted-foreground", e),
    style: { fontSize: "var(--text-small)", ...r },
    ...a
  }
));
or.displayName = "AlertDialogDescription";
const nr = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t(O.Action, { ref: a, className: n(G(), e), ...r }));
nr.displayName = "AlertDialogAction";
const lr = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t(
  O.Cancel,
  {
    ref: a,
    className: n(G({ variant: "outline" }), "mt-2 sm:mt-0", e),
    ...r
  }
));
lr.displayName = "AlertDialogCancel";
const sr = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t(
  De.Root,
  {
    ref: a,
    className: n("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", e),
    ...r
  }
));
sr.displayName = "Avatar";
const ir = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t(De.Image, { ref: a, className: n("aspect-square h-full w-full", e), ...r }));
ir.displayName = "AvatarImage";
const dr = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
  De.Fallback,
  {
    ref: o,
    className: n(
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground",
      e
    ),
    style: { fontSize: "var(--text-small)", ...r },
    ...a
  }
));
dr.displayName = "AvatarFallback";
const cr = Y(
  n(
    "inline-flex items-center rounded-sm border px-2.5 py-0.5 font-semibold",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring"
  ),
  {
    // PRIMITIVE grammar: tags/badges are a SOFT TINT fill + matching text (a
    // low-saturation pill), not a heavy solid block. `solid` stays for emphasis.
    variants: {
      variant: {
        default: "border-transparent bg-primary/15 text-foreground",
        secondary: "border-transparent bg-muted text-foreground",
        accent: "border-transparent bg-accent/20 text-foreground",
        destructive: "border-transparent bg-destructive/15 text-destructive",
        outline: "text-foreground border-border",
        solid: "border-transparent bg-primary text-primary-foreground"
      }
    },
    defaultVariants: { variant: "default" }
  }
);
function Ye({ className: e, variant: r, style: a, ...o }) {
  return /* @__PURE__ */ t(
    "div",
    {
      className: n(cr({ variant: r }), e),
      style: { fontSize: "var(--text-small)", ...a },
      ...o
    }
  );
}
const mr = s.forwardRef(({ ...e }, r) => /* @__PURE__ */ t("nav", { ref: r, "aria-label": "breadcrumb", ...e }));
mr.displayName = "Breadcrumb";
const ur = s.forwardRef(
  ({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
    "ol",
    {
      ref: o,
      className: n(
        "flex flex-wrap items-center gap-1.5 break-words text-muted-foreground sm:gap-2.5",
        e
      ),
      style: { fontSize: "var(--text-small)", ...r },
      ...a
    }
  )
);
ur.displayName = "BreadcrumbList";
const fr = s.forwardRef(
  ({ className: e, ...r }, a) => /* @__PURE__ */ t("li", { ref: a, className: n("inline-flex items-center gap-1.5", e), ...r })
);
fr.displayName = "BreadcrumbItem";
const pr = s.forwardRef(({ asChild: e, className: r, ...a }, o) => /* @__PURE__ */ t(
  e ? qe : "a",
  {
    ref: o,
    className: n("transition-colors hover:text-foreground", r),
    style: { transitionDuration: "var(--duration-fast)" },
    ...a
  }
));
pr.displayName = "BreadcrumbLink";
const gr = s.forwardRef(
  ({ className: e, ...r }, a) => /* @__PURE__ */ t(
    "span",
    {
      ref: a,
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      className: n("font-normal text-foreground", e),
      ...r
    }
  )
);
gr.displayName = "BreadcrumbPage";
const hr = ({ children: e, className: r, ...a }) => /* @__PURE__ */ t("li", { role: "presentation", "aria-hidden": "true", className: n("[&>svg]:size-3.5", r), ...a, children: e ?? /* @__PURE__ */ t(W, {}) });
hr.displayName = "BreadcrumbSeparator";
const br = ({ className: e, ...r }) => /* @__PURE__ */ i(
  "span",
  {
    role: "presentation",
    "aria-hidden": "true",
    className: n("flex h-9 w-9 items-center justify-center", e),
    ...r,
    children: [
      /* @__PURE__ */ t(He, { className: "h-4 w-4" }),
      /* @__PURE__ */ t("span", { className: "sr-only", children: "More" })
    ]
  }
);
br.displayName = "BreadcrumbEllipsis";
function vr({ className: e, classNames: r, showOutsideDays: a = !0, ...o }) {
  return /* @__PURE__ */ t(
    Ft,
    {
      showOutsideDays: a,
      className: n("p-3", e),
      classNames: {
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        month_caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "font-medium",
        nav: "flex items-center gap-1 absolute right-1 top-1 z-10",
        button_previous: n(
          G({ variant: "outline", size: "icon" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        button_next: n(
          G({ variant: "outline", size: "icon" }),
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
          G({ variant: "ghost", size: "icon" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today: "bg-accent text-accent-foreground rounded-md",
        outside: "text-muted-foreground opacity-50",
        disabled: "text-muted-foreground opacity-50",
        hidden: "invisible",
        ...r
      },
      components: {
        Chevron: ({ orientation: l, ...d }) => l === "left" ? /* @__PURE__ */ t(Ve, { className: "h-4 w-4", ...d }) : /* @__PURE__ */ t(W, { className: "h-4 w-4", ...d })
      },
      ...o
    }
  );
}
vr.displayName = "Calendar";
const oe = s.forwardRef(
  ({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
    "div",
    {
      ref: o,
      className: n("rounded-xl border border-border bg-card text-card-foreground", e),
      style: { boxShadow: "var(--shadow-sm)", ...r },
      ...a
    }
  )
);
oe.displayName = "Card";
const xr = s.forwardRef(
  ({ className: e, ...r }, a) => /* @__PURE__ */ t("div", { ref: a, className: n("flex flex-col space-y-1.5 p-6", e), ...r })
);
xr.displayName = "CardHeader";
const yr = s.forwardRef(
  ({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
    "div",
    {
      ref: o,
      className: n("font-semibold leading-none tracking-tight", e),
      style: { fontSize: "var(--text-h3)", fontFamily: "var(--font-display)", ...r },
      ...a
    }
  )
);
yr.displayName = "CardTitle";
const Nr = s.forwardRef(
  ({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
    "div",
    {
      ref: o,
      className: n("text-muted-foreground", e),
      style: { fontSize: "var(--text-small)", ...r },
      ...a
    }
  )
);
Nr.displayName = "CardDescription";
const wr = s.forwardRef(
  ({ className: e, ...r }, a) => /* @__PURE__ */ t("div", { ref: a, className: n("p-6 pt-0", e), ...r })
);
wr.displayName = "CardContent";
const Sr = s.forwardRef(
  ({ className: e, ...r }, a) => /* @__PURE__ */ t("div", { ref: a, className: n("flex items-center p-6 pt-0", e), ...r })
);
Sr.displayName = "CardFooter";
const he = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
  _e.Root,
  {
    ref: o,
    className: n(
      "peer group h-5 w-5 shrink-0 rounded-sm border border-primary outline-none",
      "focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      // indeterminate = a dash, same primary fill (PRIMITIVE grammar, ref 38).
      "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
      e
    ),
    style: { transition: "background-color var(--duration-fast) var(--ease-standard)", ...r },
    ...a,
    children: /* @__PURE__ */ i(_e.Indicator, { className: "flex items-center justify-center text-current", children: [
      /* @__PURE__ */ t(L, { className: "hidden h-4 w-4 group-data-[state=checked]:block", "aria-hidden": "true" }),
      /* @__PURE__ */ t(Ge, { className: "hidden h-4 w-4 group-data-[state=indeterminate]:block", "aria-hidden": "true" })
    ] })
  }
));
he.displayName = "Checkbox";
const kr = D.Root, Jo = D.Trigger, Cr = D.Portal, Qo = D.Close, Xe = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
  D.Overlay,
  {
    ref: o,
    className: n(
      "fixed inset-0 z-50 bg-foreground/40",
      "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
      e
    ),
    style: { transition: "opacity var(--duration-base) var(--ease-standard)", ...r },
    ...a
  }
));
Xe.displayName = "DialogOverlay";
const Ze = s.forwardRef(({ className: e, children: r, style: a, ...o }, l) => /* @__PURE__ */ i(Cr, { children: [
  /* @__PURE__ */ t(Xe, {}),
  /* @__PURE__ */ i(
    D.Content,
    {
      ref: l,
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
        ...a
      },
      ...o,
      children: [
        r,
        /* @__PURE__ */ i(
          D.Close,
          {
            className: n(
              "absolute right-4 top-4 rounded-sm opacity-70 outline-none",
              "hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring",
              "inline-flex h-11 w-11 items-center justify-center"
            ),
            children: [
              /* @__PURE__ */ t(ne, { className: "h-4 w-4", "aria-hidden": "true" }),
              /* @__PURE__ */ t("span", { className: "sr-only", children: "Close" })
            ]
          }
        )
      ]
    }
  )
] }));
Ze.displayName = "DialogContent";
const Rr = ({ className: e, ...r }) => /* @__PURE__ */ t("div", { className: n("flex flex-col space-y-1.5 text-center sm:text-left", e), ...r });
Rr.displayName = "DialogHeader";
const Tr = ({ className: e, ...r }) => /* @__PURE__ */ t(
  "div",
  {
    className: n("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", e),
    ...r
  }
);
Tr.displayName = "DialogFooter";
const zr = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
  D.Title,
  {
    ref: o,
    className: n("font-semibold leading-none tracking-tight", e),
    style: { fontSize: "var(--text-h3)", fontFamily: "var(--font-display)", ...r },
    ...a
  }
));
zr.displayName = "DialogTitle";
const Dr = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
  D.Description,
  {
    ref: o,
    className: n("text-muted-foreground", e),
    style: { fontSize: "var(--text-small)", ...r },
    ...a
  }
));
Dr.displayName = "DialogDescription";
const Je = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t(
  K,
  {
    ref: a,
    className: n(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      e
    ),
    ...r
  }
));
Je.displayName = "Command";
const en = ({ children: e, ...r }) => /* @__PURE__ */ t(kr, { ...r, children: /* @__PURE__ */ t(Ze, { className: "overflow-hidden p-0", children: /* @__PURE__ */ t(Je, { className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5", children: e }) }) }), Mr = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ i("div", { className: "flex items-center border-b border-border px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ t(ze, { className: "mr-2 h-4 w-4 shrink-0 opacity-50", "aria-hidden": "true" }),
  /* @__PURE__ */ t(
    K.Input,
    {
      ref: o,
      className: n(
        "flex h-11 w-full rounded-md bg-transparent py-3 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        e
      ),
      style: { fontSize: "var(--text-body)", ...r },
      ...a
    }
  )
] }));
Mr.displayName = "CommandInput";
const Ar = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t(
  K.List,
  {
    ref: a,
    className: n("max-h-80 overflow-y-auto overflow-x-hidden", e),
    ...r
  }
));
Ar.displayName = "CommandList";
const Ir = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t(
  K.Empty,
  {
    ref: a,
    className: n("py-6 text-center text-muted-foreground", e),
    style: { fontSize: "var(--text-small)" },
    ...r
  }
));
Ir.displayName = "CommandEmpty";
const Pr = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
  K.Group,
  {
    ref: o,
    className: n(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      e
    ),
    style: { fontSize: "var(--text-small)", ...r },
    ...a
  }
));
Pr.displayName = "CommandGroup";
const Fr = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t(K.Separator, { ref: a, className: n("-mx-1 h-px bg-border", e), ...r }));
Fr.displayName = "CommandSeparator";
const _r = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
  K.Item,
  {
    ref: o,
    className: n(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 outline-none min-h-[36px]",
      "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      e
    ),
    style: { fontSize: "var(--text-small)", ...r },
    ...a
  }
));
_r.displayName = "CommandItem";
const $r = ({ className: e, ...r }) => /* @__PURE__ */ t("span", { className: n("ml-auto tracking-widest text-muted-foreground", e), ...r });
$r.displayName = "CommandShortcut";
const tn = A.Root, rn = A.Trigger, an = A.Group, on = A.Portal, nn = A.Sub, ln = A.RadioGroup, xe = "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 outline-none min-h-[36px] focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", jr = s.forwardRef(({ className: e, inset: r, children: a, style: o, ...l }, d) => /* @__PURE__ */ i(
  A.SubTrigger,
  {
    ref: d,
    className: n(xe, "data-[state=open]:bg-accent", r && "pl-8", e),
    style: { fontSize: "var(--text-small)", ...o },
    ...l,
    children: [
      a,
      /* @__PURE__ */ t(W, { className: "ml-auto h-4 w-4", "aria-hidden": "true" })
    ]
  }
));
jr.displayName = "ContextMenuSubTrigger";
const Er = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
  A.SubContent,
  {
    ref: o,
    className: n(
      "z-50 min-w-32 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground",
      e
    ),
    style: { boxShadow: "var(--shadow-md)", ...r },
    ...a
  }
));
Er.displayName = "ContextMenuSubContent";
const Or = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(A.Portal, { children: /* @__PURE__ */ t(
  A.Content,
  {
    ref: o,
    className: n(
      "z-50 min-w-32 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground",
      e
    ),
    style: { boxShadow: "var(--shadow-md)", ...r },
    ...a
  }
) }));
Or.displayName = "ContextMenuContent";
const Lr = s.forwardRef(({ className: e, inset: r, style: a, ...o }, l) => /* @__PURE__ */ t(
  A.Item,
  {
    ref: l,
    className: n(xe, r && "pl-8", e),
    style: { fontSize: "var(--text-small)", ...a },
    ...o
  }
));
Lr.displayName = "ContextMenuItem";
const Br = s.forwardRef(({ className: e, children: r, checked: a, style: o, ...l }, d) => /* @__PURE__ */ i(
  A.CheckboxItem,
  {
    ref: d,
    className: n(xe, "pl-8", e),
    checked: a,
    style: { fontSize: "var(--text-small)", ...o },
    ...l,
    children: [
      /* @__PURE__ */ t("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ t(A.ItemIndicator, { children: /* @__PURE__ */ t(L, { className: "h-4 w-4", "aria-hidden": "true" }) }) }),
      r
    ]
  }
));
Br.displayName = "ContextMenuCheckboxItem";
const Hr = s.forwardRef(({ className: e, children: r, style: a, ...o }, l) => /* @__PURE__ */ i(
  A.RadioItem,
  {
    ref: l,
    className: n(xe, "pl-8", e),
    style: { fontSize: "var(--text-small)", ...a },
    ...o,
    children: [
      /* @__PURE__ */ t("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ t(A.ItemIndicator, { children: /* @__PURE__ */ t(be, { className: "h-2 w-2 fill-current", "aria-hidden": "true" }) }) }),
      r
    ]
  }
));
Hr.displayName = "ContextMenuRadioItem";
const Vr = s.forwardRef(({ className: e, inset: r, style: a, ...o }, l) => /* @__PURE__ */ t(
  A.Label,
  {
    ref: l,
    className: n("px-2 py-1.5 font-semibold text-muted-foreground", r && "pl-8", e),
    style: { fontSize: "var(--text-small)", ...a },
    ...o
  }
));
Vr.displayName = "ContextMenuLabel";
const Gr = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t(
  A.Separator,
  {
    ref: a,
    className: n("-mx-1 my-1 h-px bg-border", e),
    ...r
  }
));
Gr.displayName = "ContextMenuSeparator";
const qr = ({
  shouldScaleBackground: e = !0,
  ...r
}) => /* @__PURE__ */ t(B.Root, { shouldScaleBackground: e, ...r });
qr.displayName = "Drawer";
const sn = B.Trigger, Kr = B.Portal, dn = B.Close, Qe = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t(
  B.Overlay,
  {
    ref: a,
    className: n("fixed inset-0 z-50 bg-foreground/40", e),
    ...r
  }
));
Qe.displayName = "DrawerOverlay";
const Ur = s.forwardRef(({ className: e, children: r, style: a, ...o }, l) => /* @__PURE__ */ i(Kr, { children: [
  /* @__PURE__ */ t(Qe, {}),
  /* @__PURE__ */ i(
    B.Content,
    {
      ref: l,
      className: n(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-xl",
        "border-t border-border bg-popover text-popover-foreground",
        e
      ),
      style: { boxShadow: "var(--shadow-lg)", ...a },
      ...o,
      children: [
        /* @__PURE__ */ t("div", { className: "mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted", "aria-hidden": "true" }),
        r
      ]
    }
  )
] }));
Ur.displayName = "DrawerContent";
const Wr = ({ className: e, ...r }) => /* @__PURE__ */ t("div", { className: n("grid gap-1.5 p-4 text-center sm:text-left", e), ...r });
Wr.displayName = "DrawerHeader";
const Yr = ({ className: e, ...r }) => /* @__PURE__ */ t("div", { className: n("mt-auto flex flex-col gap-2 p-4", e), ...r });
Yr.displayName = "DrawerFooter";
const Xr = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
  B.Title,
  {
    ref: o,
    className: n("font-semibold leading-none tracking-tight", e),
    style: { fontSize: "var(--text-h3)", fontFamily: "var(--font-display)", ...r },
    ...a
  }
));
Xr.displayName = "DrawerTitle";
const Zr = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
  B.Description,
  {
    ref: o,
    className: n("text-muted-foreground", e),
    style: { fontSize: "var(--text-small)", ...r },
    ...a
  }
));
Zr.displayName = "DrawerDescription";
const cn = I.Root, mn = I.Trigger, un = I.Group, fn = I.Portal, pn = I.Sub, gn = I.RadioGroup, ye = "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 outline-none min-h-[36px] focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", Jr = s.forwardRef(({ className: e, inset: r, children: a, style: o, ...l }, d) => /* @__PURE__ */ i(
  I.SubTrigger,
  {
    ref: d,
    className: n(ye, "data-[state=open]:bg-accent", r && "pl-8", e),
    style: { fontSize: "var(--text-small)", ...o },
    ...l,
    children: [
      a,
      /* @__PURE__ */ t(W, { className: "ml-auto h-4 w-4", "aria-hidden": "true" })
    ]
  }
));
Jr.displayName = "DropdownMenuSubTrigger";
const Qr = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
  I.SubContent,
  {
    ref: o,
    className: n(
      "z-50 min-w-32 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground",
      e
    ),
    style: { boxShadow: "var(--shadow-md)", ...r },
    ...a
  }
));
Qr.displayName = "DropdownMenuSubContent";
const ea = s.forwardRef(({ className: e, sideOffset: r = 4, style: a, ...o }, l) => /* @__PURE__ */ t(I.Portal, { children: /* @__PURE__ */ t(
  I.Content,
  {
    ref: l,
    sideOffset: r,
    className: n(
      "z-50 min-w-32 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground",
      "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
      e
    ),
    style: {
      boxShadow: "var(--shadow-md)",
      transition: "opacity var(--duration-fast) var(--ease-entrance)",
      ...a
    },
    ...o
  }
) }));
ea.displayName = "DropdownMenuContent";
const ta = s.forwardRef(({ className: e, inset: r, style: a, ...o }, l) => /* @__PURE__ */ t(
  I.Item,
  {
    ref: l,
    className: n(ye, r && "pl-8", e),
    style: { fontSize: "var(--text-small)", ...a },
    ...o
  }
));
ta.displayName = "DropdownMenuItem";
const ra = s.forwardRef(({ className: e, children: r, checked: a, style: o, ...l }, d) => /* @__PURE__ */ i(
  I.CheckboxItem,
  {
    ref: d,
    className: n(ye, "pl-8", e),
    checked: a,
    style: { fontSize: "var(--text-small)", ...o },
    ...l,
    children: [
      /* @__PURE__ */ t("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ t(I.ItemIndicator, { children: /* @__PURE__ */ t(L, { className: "h-4 w-4", "aria-hidden": "true" }) }) }),
      r
    ]
  }
));
ra.displayName = "DropdownMenuCheckboxItem";
const aa = s.forwardRef(({ className: e, children: r, style: a, ...o }, l) => /* @__PURE__ */ i(
  I.RadioItem,
  {
    ref: l,
    className: n(ye, "pl-8", e),
    style: { fontSize: "var(--text-small)", ...a },
    ...o,
    children: [
      /* @__PURE__ */ t("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ t(I.ItemIndicator, { children: /* @__PURE__ */ t(be, { className: "h-2 w-2 fill-current", "aria-hidden": "true" }) }) }),
      r
    ]
  }
));
aa.displayName = "DropdownMenuRadioItem";
const oa = s.forwardRef(({ className: e, inset: r, style: a, ...o }, l) => /* @__PURE__ */ t(
  I.Label,
  {
    ref: l,
    className: n("px-2 py-1.5 font-semibold text-muted-foreground", r && "pl-8", e),
    style: { fontSize: "var(--text-small)", ...a },
    ...o
  }
));
oa.displayName = "DropdownMenuLabel";
const na = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t(
  I.Separator,
  {
    ref: a,
    className: n("-mx-1 my-1 h-px bg-border", e),
    ...r
  }
));
na.displayName = "DropdownMenuSeparator";
const la = ({ className: e, ...r }) => /* @__PURE__ */ t("span", { className: n("ml-auto tracking-widest text-muted-foreground", e), ...r });
la.displayName = "DropdownMenuShortcut";
const hn = ge.Root, bn = ge.Trigger, sa = s.forwardRef(({ className: e, align: r = "center", sideOffset: a = 4, style: o, ...l }, d) => /* @__PURE__ */ t(ge.Portal, { children: /* @__PURE__ */ t(
  ge.Content,
  {
    ref: d,
    align: r,
    sideOffset: a,
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
    ...l
  }
) }));
sa.displayName = "HoverCardContent";
const ce = s.forwardRef(
  ({ className: e, type: r, style: a, ...o }, l) => /* @__PURE__ */ t(
    "input",
    {
      type: r,
      ref: l,
      className: n(
        "flex min-h-[44px] w-full rounded-md border border-input bg-background px-3 py-2",
        "text-foreground placeholder:text-muted-foreground",
        // PRIMITIVE grammar: idle 1px border → colored border + ring on focus.
        "outline-none transition-colors hover:border-ring/60 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring",
        "aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        e
      ),
      style: { fontSize: "var(--text-body)", ...a },
      ...o
    }
  )
);
ce.displayName = "Input";
const ue = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
  Lt.Root,
  {
    ref: o,
    className: n(
      "font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      e
    ),
    style: { fontSize: "var(--text-small)", ...r },
    ...a
  }
));
ue.displayName = "Label";
const vn = P.Menu, xn = P.Group, ia = P.Portal, yn = P.Sub, Nn = P.RadioGroup, da = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
  P.Root,
  {
    ref: o,
    className: n(
      "flex h-11 items-center gap-1 rounded-md border border-border bg-background p-1",
      e
    ),
    style: { boxShadow: "var(--shadow-sm)", ...r },
    ...a
  }
));
da.displayName = "Menubar";
const ca = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
  P.Trigger,
  {
    ref: o,
    className: n(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 font-medium outline-none min-h-[36px]",
      "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      e
    ),
    style: { fontSize: "var(--text-small)", ...r },
    ...a
  }
));
ca.displayName = "MenubarTrigger";
const ma = s.forwardRef(({ className: e, inset: r, children: a, style: o, ...l }, d) => /* @__PURE__ */ i(
  P.SubTrigger,
  {
    ref: d,
    className: n(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 outline-none min-h-[36px]",
      "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent",
      r && "pl-8",
      e
    ),
    style: { fontSize: "var(--text-small)", ...o },
    ...l,
    children: [
      a,
      /* @__PURE__ */ t(W, { className: "ml-auto h-4 w-4", "aria-hidden": "true" })
    ]
  }
));
ma.displayName = "MenubarSubTrigger";
const ua = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
  P.SubContent,
  {
    ref: o,
    className: n(
      "z-50 min-w-32 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground",
      e
    ),
    style: { boxShadow: "var(--shadow-md)", ...r },
    ...a
  }
));
ua.displayName = "MenubarSubContent";
const fa = s.forwardRef(({ className: e, align: r = "start", alignOffset: a = -4, sideOffset: o = 8, style: l, ...d }, m) => /* @__PURE__ */ t(ia, { children: /* @__PURE__ */ t(
  P.Content,
  {
    ref: m,
    align: r,
    alignOffset: a,
    sideOffset: o,
    className: n(
      "z-50 min-w-48 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground",
      e
    ),
    style: { boxShadow: "var(--shadow-md)", ...l },
    ...d
  }
) }));
fa.displayName = "MenubarContent";
const Me = "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 outline-none min-h-[36px] focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", pa = s.forwardRef(({ className: e, inset: r, style: a, ...o }, l) => /* @__PURE__ */ t(
  P.Item,
  {
    ref: l,
    className: n(Me, r && "pl-8", e),
    style: { fontSize: "var(--text-small)", ...a },
    ...o
  }
));
pa.displayName = "MenubarItem";
const ga = s.forwardRef(({ className: e, children: r, checked: a, style: o, ...l }, d) => /* @__PURE__ */ i(
  P.CheckboxItem,
  {
    ref: d,
    className: n(Me, "pl-8", e),
    checked: a,
    style: { fontSize: "var(--text-small)", ...o },
    ...l,
    children: [
      /* @__PURE__ */ t("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ t(P.ItemIndicator, { children: /* @__PURE__ */ t(L, { className: "h-4 w-4", "aria-hidden": "true" }) }) }),
      r
    ]
  }
));
ga.displayName = "MenubarCheckboxItem";
const ha = s.forwardRef(({ className: e, children: r, style: a, ...o }, l) => /* @__PURE__ */ i(
  P.RadioItem,
  {
    ref: l,
    className: n(Me, "pl-8", e),
    style: { fontSize: "var(--text-small)", ...a },
    ...o,
    children: [
      /* @__PURE__ */ t("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ t(P.ItemIndicator, { children: /* @__PURE__ */ t(be, { className: "h-2 w-2 fill-current", "aria-hidden": "true" }) }) }),
      r
    ]
  }
));
ha.displayName = "MenubarRadioItem";
const ba = s.forwardRef(({ className: e, inset: r, style: a, ...o }, l) => /* @__PURE__ */ t(
  P.Label,
  {
    ref: l,
    className: n("px-2 py-1.5 font-semibold text-muted-foreground", r && "pl-8", e),
    style: { fontSize: "var(--text-small)", ...a },
    ...o
  }
));
ba.displayName = "MenubarLabel";
const va = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t(
  P.Separator,
  {
    ref: a,
    className: n("-mx-1 my-1 h-px bg-border", e),
    ...r
  }
));
va.displayName = "MenubarSeparator";
const xa = ({ className: e, ...r }) => /* @__PURE__ */ t(
  "nav",
  {
    role: "navigation",
    "aria-label": "pagination",
    className: n("mx-auto flex w-full justify-center", e),
    ...r
  }
);
xa.displayName = "Pagination";
const ya = s.forwardRef(
  ({ className: e, ...r }, a) => /* @__PURE__ */ t("ul", { ref: a, className: n("flex flex-row items-center gap-1", e), ...r })
);
ya.displayName = "PaginationContent";
const Na = s.forwardRef(
  ({ className: e, ...r }, a) => /* @__PURE__ */ t("li", { ref: a, className: n("", e), ...r })
);
Na.displayName = "PaginationItem";
const Ae = ({ className: e, isActive: r, size: a = "icon", ...o }) => /* @__PURE__ */ t(
  "a",
  {
    "aria-current": r ? "page" : void 0,
    className: n(
      G({ variant: r ? "outline" : "ghost", size: a }),
      "cursor-pointer",
      e
    ),
    ...o
  }
);
Ae.displayName = "PaginationLink";
const wa = ({ className: e, ...r }) => /* @__PURE__ */ i(
  Ae,
  {
    "aria-label": "Go to previous page",
    size: "default",
    className: n("gap-1 pl-2.5", e),
    ...r,
    children: [
      /* @__PURE__ */ t(Ve, { className: "h-4 w-4", "aria-hidden": "true" }),
      /* @__PURE__ */ t("span", { children: "Previous" })
    ]
  }
);
wa.displayName = "PaginationPrevious";
const Sa = ({ className: e, ...r }) => /* @__PURE__ */ i(
  Ae,
  {
    "aria-label": "Go to next page",
    size: "default",
    className: n("gap-1 pr-2.5", e),
    ...r,
    children: [
      /* @__PURE__ */ t("span", { children: "Next" }),
      /* @__PURE__ */ t(W, { className: "h-4 w-4", "aria-hidden": "true" })
    ]
  }
);
Sa.displayName = "PaginationNext";
const ka = ({ className: e, ...r }) => /* @__PURE__ */ i("span", { "aria-hidden": !0, className: n("flex h-9 w-9 items-center justify-center", e), ...r, children: [
  /* @__PURE__ */ t(He, { className: "h-4 w-4" }),
  /* @__PURE__ */ t("span", { className: "sr-only", children: "More pages" })
] });
ka.displayName = "PaginationEllipsis";
const wn = re.Root, Sn = re.Trigger, kn = re.Anchor, Ca = s.forwardRef(({ className: e, align: r = "center", sideOffset: a = 4, style: o, ...l }, d) => /* @__PURE__ */ t(re.Portal, { children: /* @__PURE__ */ t(
  re.Content,
  {
    ref: d,
    align: r,
    sideOffset: a,
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
    ...l
  }
) }));
Ca.displayName = "PopoverContent";
const Ra = s.forwardRef(({ className: e, value: r, style: a, ...o }, l) => /* @__PURE__ */ t(
  $e.Root,
  {
    ref: l,
    className: n("relative h-2 w-full overflow-hidden rounded-full bg-secondary", e),
    style: a,
    ...o,
    children: /* @__PURE__ */ t(
      $e.Indicator,
      {
        className: "h-full w-full flex-1 bg-primary",
        style: {
          transform: `translateX(-${100 - (r || 0)}%)`,
          transition: "transform var(--duration-base) var(--ease-standard)"
        }
      }
    )
  }
));
Ra.displayName = "Progress";
const et = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t(Re.Root, { ref: a, className: n("grid gap-2", e), ...r }));
et.displayName = "RadioGroup";
const tt = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t(
  Re.Item,
  {
    ref: a,
    className: n(
      "aspect-square h-5 w-5 rounded-full border border-primary text-primary outline-none",
      "focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      e
    ),
    ...r,
    children: /* @__PURE__ */ t(Re.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ t(be, { className: "h-2.5 w-2.5 fill-current text-current", "aria-hidden": "true" }) })
  }
));
tt.displayName = "RadioGroupItem";
const Ta = s.forwardRef(({ className: e, children: r, ...a }, o) => /* @__PURE__ */ i(Q.Root, { ref: o, className: n("relative overflow-hidden", e), ...a, children: [
  /* @__PURE__ */ t(Q.Viewport, { className: "h-full w-full rounded-[inherit]", children: r }),
  /* @__PURE__ */ t(rt, {}),
  /* @__PURE__ */ t(Q.Corner, {})
] }));
Ta.displayName = "ScrollArea";
const rt = s.forwardRef(({ className: e, orientation: r = "vertical", ...a }, o) => /* @__PURE__ */ t(
  Q.ScrollAreaScrollbar,
  {
    ref: o,
    orientation: r,
    className: n(
      "flex touch-none select-none",
      r === "vertical" && "h-full w-2.5 border-l border-l-transparent p-px",
      r === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-px",
      e
    ),
    ...a,
    children: /* @__PURE__ */ t(Q.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
rt.displayName = "ScrollBar";
const at = _.Root, Cn = _.Group, ot = _.Value, Ie = s.forwardRef(({ className: e, children: r, style: a, ...o }, l) => /* @__PURE__ */ i(
  _.Trigger,
  {
    ref: l,
    className: n(
      "flex min-h-[44px] w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2",
      "text-foreground data-[placeholder]:text-muted-foreground outline-none transition-colors hover:border-ring/60 focus:border-ring focus:ring-2 focus:ring-ring",
      "disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      e
    ),
    style: { fontSize: "var(--text-body)", ...a },
    ...o,
    children: [
      r,
      /* @__PURE__ */ t(_.Icon, { asChild: !0, children: /* @__PURE__ */ t(Te, { className: "h-4 w-4 opacity-50", "aria-hidden": "true" }) })
    ]
  }
));
Ie.displayName = "SelectTrigger";
const nt = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t(
  _.ScrollUpButton,
  {
    ref: a,
    className: n("flex cursor-default items-center justify-center py-1", e),
    ...r,
    children: /* @__PURE__ */ t(St, { className: "h-4 w-4", "aria-hidden": "true" })
  }
));
nt.displayName = "SelectScrollUpButton";
const lt = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t(
  _.ScrollDownButton,
  {
    ref: a,
    className: n("flex cursor-default items-center justify-center py-1", e),
    ...r,
    children: /* @__PURE__ */ t(Te, { className: "h-4 w-4", "aria-hidden": "true" })
  }
));
lt.displayName = "SelectScrollDownButton";
const Pe = s.forwardRef(({ className: e, children: r, position: a = "popper", style: o, ...l }, d) => /* @__PURE__ */ t(_.Portal, { children: /* @__PURE__ */ i(
  _.Content,
  {
    ref: d,
    className: n(
      "relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border border-border bg-popover text-popover-foreground",
      a === "popper" && "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
      e
    ),
    position: a,
    style: { boxShadow: "var(--shadow-md)", ...o },
    ...l,
    children: [
      /* @__PURE__ */ t(nt, {}),
      /* @__PURE__ */ t(
        _.Viewport,
        {
          className: n(
            "p-1",
            a === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children: r
        }
      ),
      /* @__PURE__ */ t(lt, {})
    ]
  }
) }));
Pe.displayName = "SelectContent";
const za = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
  _.Label,
  {
    ref: o,
    className: n("px-2 py-1.5 font-semibold text-muted-foreground", e),
    style: { fontSize: "var(--text-small)", ...r },
    ...a
  }
));
za.displayName = "SelectLabel";
const Fe = s.forwardRef(({ className: e, children: r, style: a, ...o }, l) => /* @__PURE__ */ i(
  _.Item,
  {
    ref: l,
    className: n(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 outline-none min-h-[36px]",
      "focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    style: { fontSize: "var(--text-small)", ...a },
    ...o,
    children: [
      /* @__PURE__ */ t("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ t(_.ItemIndicator, { children: /* @__PURE__ */ t(L, { className: "h-4 w-4", "aria-hidden": "true" }) }) }),
      /* @__PURE__ */ t(_.ItemText, { children: r })
    ]
  }
));
Fe.displayName = "SelectItem";
const Da = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t(
  _.Separator,
  {
    ref: a,
    className: n("-mx-1 my-1 h-px bg-border", e),
    ...r
  }
));
Da.displayName = "SelectSeparator";
const Ma = s.forwardRef(({ className: e, orientation: r = "horizontal", decorative: a = !0, ...o }, l) => /* @__PURE__ */ t(
  Bt.Root,
  {
    ref: l,
    decorative: a,
    orientation: r,
    className: n(
      "shrink-0 bg-border",
      r === "horizontal" ? "h-px w-full" : "h-full w-px",
      e
    ),
    ...o
  }
));
Ma.displayName = "Separator";
const Rn = D.Root, Tn = D.Trigger, zn = D.Close, Aa = D.Portal, st = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
  D.Overlay,
  {
    ref: o,
    className: n(
      "fixed inset-0 z-50 bg-foreground/40",
      "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
      e
    ),
    style: { transition: "opacity var(--duration-base) var(--ease-standard)", ...r },
    ...a
  }
));
st.displayName = "SheetOverlay";
const Ia = Y(
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
), Pa = s.forwardRef(({ side: e = "right", className: r, children: a, style: o, ...l }, d) => /* @__PURE__ */ i(Aa, { children: [
  /* @__PURE__ */ t(st, {}),
  /* @__PURE__ */ i(
    D.Content,
    {
      ref: d,
      className: n(Ia({ side: e }), r),
      style: {
        boxShadow: "var(--shadow-lg)",
        transition: "transform var(--duration-base) var(--ease-entrance)",
        ...o
      },
      ...l,
      children: [
        a,
        /* @__PURE__ */ i(
          D.Close,
          {
            className: n(
              "absolute right-4 top-4 rounded-sm opacity-70 outline-none",
              "hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring",
              "inline-flex h-11 w-11 items-center justify-center"
            ),
            children: [
              /* @__PURE__ */ t(ne, { className: "h-4 w-4", "aria-hidden": "true" }),
              /* @__PURE__ */ t("span", { className: "sr-only", children: "Close" })
            ]
          }
        )
      ]
    }
  )
] }));
Pa.displayName = "SheetContent";
const Fa = ({ className: e, ...r }) => /* @__PURE__ */ t("div", { className: n("flex flex-col space-y-2 text-center sm:text-left", e), ...r });
Fa.displayName = "SheetHeader";
const _a = ({ className: e, ...r }) => /* @__PURE__ */ t(
  "div",
  {
    className: n("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", e),
    ...r
  }
);
_a.displayName = "SheetFooter";
const $a = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
  D.Title,
  {
    ref: o,
    className: n("font-semibold text-foreground", e),
    style: { fontSize: "var(--text-h3)", fontFamily: "var(--font-display)", ...r },
    ...a
  }
));
$a.displayName = "SheetTitle";
const ja = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
  D.Description,
  {
    ref: o,
    className: n("text-muted-foreground", e),
    style: { fontSize: "var(--text-small)", ...r },
    ...a
  }
));
ja.displayName = "SheetDescription";
const Ea = s.forwardRef(
  ({ className: e, style: r, thumbLabels: a, "aria-label": o, value: l, defaultValue: d, ...m }, u) => {
    const g = (l ?? d ?? [0]).length, p = (v) => Array.isArray(a) ? a[v] : a ?? o;
    return /* @__PURE__ */ i(
      me.Root,
      {
        ref: u,
        className: n("relative flex w-full touch-none select-none items-center", e),
        value: l,
        defaultValue: d,
        ...m,
        children: [
          /* @__PURE__ */ t(me.Track, { className: "relative h-2 w-full grow overflow-hidden rounded-full bg-secondary", children: /* @__PURE__ */ t(me.Range, { className: "absolute h-full bg-primary" }) }),
          Array.from({ length: g }).map((v, y) => /* @__PURE__ */ t(
            me.Thumb,
            {
              "aria-label": p(y),
              className: n(
                "block h-5 w-5 rounded-full border-2 border-primary bg-background outline-none",
                "focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              ),
              style: { boxShadow: "var(--shadow-sm)", ...r }
            },
            y
          ))
        ]
      }
    );
  }
);
Ea.displayName = "Slider";
const Oa = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
  je.Root,
  {
    ref: o,
    className: n(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent outline-none",
      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      e
    ),
    style: { transition: "background-color var(--duration-fast) var(--ease-standard)", ...r },
    ...a,
    children: /* @__PURE__ */ t(
      je.Thumb,
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
Oa.displayName = "Switch";
const La = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
  "table",
  {
    ref: o,
    className: n("w-full caption-bottom border-collapse", e),
    style: { fontSize: "var(--text-small)", ...r },
    ...a
  }
));
La.displayName = "Table";
const Ba = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t("thead", { ref: a, className: n("[&_tr]:border-b [&_tr]:border-border", e), ...r }));
Ba.displayName = "TableHeader";
const Ha = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t("tbody", { ref: a, className: n("[&_tr:last-child]:border-0", e), ...r }));
Ha.displayName = "TableBody";
const Va = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t(
  "tfoot",
  {
    ref: a,
    className: n("border-t border-border bg-muted/50 font-medium [&>tr]:last:border-b-0", e),
    ...r
  }
));
Va.displayName = "TableFooter";
const Ga = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
  "tr",
  {
    ref: o,
    className: n(
      "border-b border-border hover:bg-muted/50 data-[state=selected]:bg-muted",
      e
    ),
    style: { transition: "background-color var(--duration-fast) var(--ease-standard)", ...r },
    ...a
  }
));
Ga.displayName = "TableRow";
const qa = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t(
  "th",
  {
    ref: a,
    className: n(
      "h-11 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      e
    ),
    ...r
  }
));
qa.displayName = "TableHead";
const Ka = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t(
  "td",
  {
    ref: a,
    className: n("p-4 align-middle [&:has([role=checkbox])]:pr-0", e),
    ...r
  }
));
Ka.displayName = "TableCell";
const Ua = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t("caption", { ref: a, className: n("mt-4 text-muted-foreground", e), ...r }));
Ua.displayName = "TableCaption";
const Dn = ve.Root, Wa = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t(
  ve.List,
  {
    ref: a,
    className: n(
      "inline-flex h-11 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      e
    ),
    ...r
  }
));
Wa.displayName = "TabsList";
const Ya = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
  ve.Trigger,
  {
    ref: o,
    className: n(
      "inline-flex min-h-[36px] items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 font-medium text-muted-foreground outline-none",
      "transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
      // the ACTIVE tab lifts off the muted track (shadow on active only, not every trigger).
      "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:[box-shadow:var(--shadow-sm)]",
      e
    ),
    style: {
      fontSize: "var(--text-small)",
      transition: "background-color var(--duration-fast) var(--ease-standard)",
      ...r
    },
    ...a
  }
));
Ya.displayName = "TabsTrigger";
const Xa = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t(
  ve.Content,
  {
    ref: a,
    className: n("mt-2 outline-none focus-visible:ring-2 focus-visible:ring-ring", e),
    ...r
  }
));
Xa.displayName = "TabsContent";
const it = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
  "textarea",
  {
    ref: o,
    className: n(
      "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2",
      "text-foreground placeholder:text-muted-foreground",
      "outline-none transition-colors hover:border-ring/60 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring",
      "disabled:cursor-not-allowed disabled:opacity-50",
      e
    ),
    style: { fontSize: "var(--text-body)", ...r },
    ...a
  }
));
it.displayName = "Textarea";
const dt = Y(
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
), Za = s.forwardRef(({ className: e, variant: r, size: a, style: o, ...l }, d) => /* @__PURE__ */ t(
  qt.Root,
  {
    ref: d,
    className: n(dt({ variant: r, size: a }), e),
    style: {
      fontSize: "var(--text-small)",
      transition: "background-color var(--duration-fast) var(--ease-standard)",
      ...o
    },
    ...l
  }
));
Za.displayName = "Toggle";
const ct = s.createContext({
  size: "default",
  variant: "default"
}), Ja = s.forwardRef(({ className: e, variant: r, size: a, children: o, ...l }, d) => /* @__PURE__ */ t(
  Ke.Root,
  {
    ref: d,
    className: n("flex items-center justify-center gap-1", e),
    ...l,
    children: /* @__PURE__ */ t(ct.Provider, { value: { variant: r, size: a }, children: o })
  }
));
Ja.displayName = "ToggleGroup";
const Qa = s.forwardRef(({ className: e, children: r, variant: a, size: o, style: l, ...d }, m) => {
  const u = s.useContext(ct);
  return /* @__PURE__ */ t(
    Ke.Item,
    {
      ref: m,
      className: n(
        dt({ variant: u.variant || a, size: u.size || o }),
        e
      ),
      style: {
        fontSize: "var(--text-small)",
        transition: "background-color var(--duration-fast) var(--ease-standard)",
        ...l
      },
      ...d,
      children: r
    }
  );
});
Qa.displayName = "ToggleGroupItem";
const eo = U.Provider, mt = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t(
  U.Viewport,
  {
    ref: a,
    className: n(
      "fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:max-w-[400px]",
      e
    ),
    ...r
  }
));
mt.displayName = "ToastViewport";
const to = Y(
  n(
    "group pointer-events-auto relative flex w-full items-start gap-3 p-4 pr-9",
    "data-[state=open]:opacity-100 data-[state=closed]:opacity-0 data-[state=closed]:scale-95",
    "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0",
    "data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]"
  ),
  { variants: { variant: { default: "", destructive: "" } }, defaultVariants: { variant: "default" } }
), ut = s.forwardRef(({ className: e, variant: r, style: a, ...o }, l) => /* @__PURE__ */ t(
  U.Root,
  {
    ref: l,
    className: n(to({ variant: r }), e),
    style: {
      borderRadius: "var(--radius-lg)",
      // srgb mix (NOT oklch) so destructive stays in the red family — an oklch arc
      // between red and a near-neutral border passes through purple.
      border: `1px solid ${r === "destructive" ? "color-mix(in srgb, var(--destructive) 38%, var(--card))" : "var(--border)"}`,
      background: "var(--popover)",
      color: "var(--popover-foreground)",
      boxShadow: "var(--shadow-lg)",
      transition: "opacity var(--duration-base) var(--ease-entrance), transform var(--duration-base) var(--ease-entrance)",
      ...a
    },
    ...o
  }
));
ut.displayName = "Toast";
const ro = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
  U.Action,
  {
    ref: o,
    className: n(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-input bg-transparent px-3 font-medium outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring",
      e
    ),
    style: { fontSize: "var(--text-small)", ...r },
    ...a
  }
));
ro.displayName = "ToastAction";
const ft = s.forwardRef(({ className: e, ...r }, a) => /* @__PURE__ */ t(
  U.Close,
  {
    ref: a,
    className: n(
      "absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground opacity-70 outline-none transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring",
      e
    ),
    "toast-close": "",
    ...r,
    children: /* @__PURE__ */ t(ne, { className: "h-4 w-4", "aria-hidden": "true" })
  }
));
ft.displayName = "ToastClose";
const pt = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
  U.Title,
  {
    ref: o,
    className: n("font-semibold text-foreground", e),
    style: { fontSize: "var(--text-small)", ...r },
    ...a
  }
));
pt.displayName = "ToastTitle";
const gt = s.forwardRef(({ className: e, style: r, ...a }, o) => /* @__PURE__ */ t(
  U.Description,
  {
    ref: o,
    className: n("text-muted-foreground", e),
    style: { fontSize: "var(--text-small)", lineHeight: 1.45, ...r },
    ...a
  }
));
gt.displayName = "ToastDescription";
const ao = 4, oo = 1e6;
let ke = 0;
function no() {
  return ke = (ke + 1) % Number.MAX_SAFE_INTEGER, ke.toString();
}
const Ce = /* @__PURE__ */ new Map();
function Ee(e) {
  if (Ce.has(e)) return;
  const r = setTimeout(() => {
    Ce.delete(e), ee({ type: "REMOVE_TOAST", toastId: e });
  }, oo);
  Ce.set(e, r);
}
function lo(e, r) {
  switch (r.type) {
    case "ADD_TOAST":
      return { ...e, toasts: [r.toast, ...e.toasts].slice(0, ao) };
    case "UPDATE_TOAST":
      return { ...e, toasts: e.toasts.map((a) => a.id === r.toast.id ? { ...a, ...r.toast } : a) };
    case "DISMISS_TOAST": {
      const { toastId: a } = r;
      return a ? Ee(a) : e.toasts.forEach((o) => Ee(o.id)), {
        ...e,
        toasts: e.toasts.map((o) => o.id === a || a === void 0 ? { ...o, open: !1 } : o)
      };
    }
    case "REMOVE_TOAST":
      return r.toastId === void 0 ? { ...e, toasts: [] } : { ...e, toasts: e.toasts.filter((a) => a.id !== r.toastId) };
  }
}
const fe = [];
let pe = { toasts: [] };
function ee(e) {
  pe = lo(pe, e), fe.forEach((r) => r(pe));
}
function so({ ...e }) {
  const r = no(), a = (l) => ee({ type: "UPDATE_TOAST", toast: { ...l, id: r } }), o = () => ee({ type: "DISMISS_TOAST", toastId: r });
  return ee({
    type: "ADD_TOAST",
    toast: { ...e, id: r, open: !0, onOpenChange: (l) => {
      l || o();
    } }
  }), { id: r, dismiss: o, update: a };
}
function io() {
  const [e, r] = s.useState(pe);
  return s.useEffect(() => (fe.push(r), () => {
    const a = fe.indexOf(r);
    a > -1 && fe.splice(a, 1);
  }), [e]), { ...e, toast: so, dismiss: (a) => ee({ type: "DISMISS_TOAST", toastId: a }) };
}
function Mn() {
  const { toasts: e } = io();
  return /* @__PURE__ */ i(eo, { children: [
    e.map(({ id: r, title: a, description: o, action: l, icon: d, ...m }) => /* @__PURE__ */ i(ut, { ...m, children: [
      d && /* @__PURE__ */ t("span", { "aria-hidden": "true", className: "mt-0.5 shrink-0 [&_svg]:h-5 [&_svg]:w-5", children: d }),
      /* @__PURE__ */ i("div", { className: "grid flex-1 gap-1", children: [
        a && /* @__PURE__ */ t(pt, { children: a }),
        o && /* @__PURE__ */ t(gt, { children: o })
      ] }),
      l,
      /* @__PURE__ */ t(ft, {})
    ] }, r)),
    /* @__PURE__ */ t(mt, {})
  ] });
}
const An = ae.Provider, In = ae.Root, Pn = ae.Trigger, co = s.forwardRef(({ className: e, sideOffset: r = 4, style: a, ...o }, l) => /* @__PURE__ */ t(ae.Portal, { children: /* @__PURE__ */ t(
  ae.Content,
  {
    ref: l,
    sideOffset: r,
    className: n(
      "z-50 overflow-hidden rounded-sm border border-border bg-popover px-3 py-1.5 text-popover-foreground",
      "data-[state=delayed-open]:opacity-100 data-[state=closed]:opacity-0",
      e
    ),
    style: {
      fontSize: "var(--text-small)",
      boxShadow: "var(--shadow-md)",
      transition: "opacity var(--duration-fast) var(--ease-standard)",
      ...a
    },
    ...o
  }
) }));
co.displayName = "TooltipContent";
const Oe = kt;
function ht(e) {
  if (!e) return null;
  const r = e.charAt(0).toUpperCase() + e.slice(1), a = Oe[r] ?? Oe[e];
  return a ? /* @__PURE__ */ t(a, { className: "h-4 w-4", "aria-hidden": !0 }) : null;
}
function J(e, r) {
  if (!r) return;
  const a = e == null ? void 0 : e[r];
  return a == null || a === "" ? void 0 : String(a);
}
function mo(e) {
  return e === "accent" ? "accent" : e === "muted" ? "secondary" : "default";
}
function Ne(e) {
  return !e || e.length === 0 ? null : e.map((r, a) => {
    const o = r.variant ?? (a === e.length - 1 ? "default" : "outline"), l = /* @__PURE__ */ i(wt, { children: [
      ht(r.icon),
      r.label
    ] });
    return r.href ? /* @__PURE__ */ t(q, { variant: o, asChild: !0, children: /* @__PURE__ */ t("a", { href: r.href, children: l }) }, a) : /* @__PURE__ */ t(q, { type: "button", variant: o, children: l }, a);
  });
}
function bt(e, r) {
  const a = e.titleKey ? J(r, e.titleKey) : e.title, o = J(r, e.subtitleKey), l = J(r, e.mediaKey);
  return /* @__PURE__ */ i(oe, { className: "flex h-full flex-col overflow-hidden", children: [
    l && /* @__PURE__ */ t("div", { className: "aspect-video w-full overflow-hidden bg-muted", children: /* @__PURE__ */ t("img", { src: l, alt: "", className: "h-full w-full object-cover" }) }),
    /* @__PURE__ */ i("div", { className: "flex flex-1 flex-col gap-3 p-5", children: [
      /* @__PURE__ */ i("div", { className: "flex flex-wrap items-start justify-between gap-2", children: [
        /* @__PURE__ */ i("div", { className: "min-w-0 flex-1", children: [
          a && /* @__PURE__ */ t(
            "h3",
            {
              className: "font-semibold text-foreground",
              style: { fontFamily: "var(--font-display)", fontSize: "var(--text-body)" },
              children: a
            }
          ),
          o && /* @__PURE__ */ t("p", { className: "text-muted-foreground", style: { fontSize: "var(--text-small)" }, children: o })
        ] }),
        e.badges && e.badges.length > 0 && /* @__PURE__ */ t("div", { className: "flex shrink-0 flex-wrap gap-1.5", children: e.badges.map((d, m) => {
          const u = J(r, d.key);
          return u ? /* @__PURE__ */ t(Ye, { variant: mo(d.tone), children: u }, m) : null;
        }) })
      ] }),
      e.fields && e.fields.length > 0 && /* @__PURE__ */ t("dl", { className: "grid grid-cols-2 gap-x-4 gap-y-2", children: e.fields.map((d, m) => /* @__PURE__ */ i("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ t("dt", { className: "text-muted-foreground", style: { fontSize: "var(--text-small)" }, children: d.label }),
        /* @__PURE__ */ t(
          "dd",
          {
            className: "font-medium text-foreground",
            style: { fontSize: "var(--text-small)" },
            children: J(r, d.key) ?? "—"
          }
        )
      ] }, m)) }),
      e.actions && e.actions.length > 0 && /* @__PURE__ */ t("div", { className: "mt-auto flex flex-wrap gap-2 pt-1", children: Ne(e.actions) })
    ] })
  ] });
}
function uo(e, r) {
  if (e == null || e === "")
    return /* @__PURE__ */ i("span", { className: "text-muted-foreground", children: [
      /* @__PURE__ */ t("span", { "aria-hidden": !0, children: "—" }),
      /* @__PURE__ */ t("span", { className: "sr-only", children: "Not available" })
    ] });
  switch (r.format) {
    case "number":
      return /* @__PURE__ */ t("span", { className: "tabular-nums", children: Number(e).toLocaleString() });
    case "currency":
      return /* @__PURE__ */ t("span", { className: "tabular-nums", children: Number(e).toLocaleString(void 0, {
        style: "currency",
        currency: r.currency ?? "USD",
        maximumFractionDigits: 0
      }) });
    case "percent":
      return /* @__PURE__ */ i("span", { className: "tabular-nums", children: [
        Number(e),
        "%"
      ] });
    case "badge":
      return /* @__PURE__ */ t(Ye, { variant: "secondary", children: String(e) });
    case "date":
    case "text":
    default:
      return /* @__PURE__ */ t("span", { children: String(e) });
  }
}
function fo(e) {
  return e.map((r) => {
    const a = r.format === "number" || r.format === "currency" || r.format === "percent";
    return {
      accessorKey: r.key,
      header: r.header,
      meta: { align: r.align ?? (a ? "right" : "left") },
      cell: (o) => uo(o.getValue(), r)
    };
  });
}
function po(e) {
  return !e || e.length === 0 ? null : e.map(
    (r) => r.kind === "search" ? /* @__PURE__ */ t(
      ce,
      {
        placeholder: r.placeholder ?? r.label,
        "aria-label": r.label,
        className: "w-full max-w-[16rem]"
      },
      r.id
    ) : /* @__PURE__ */ i(at, { children: [
      /* @__PURE__ */ t(Ie, { className: "w-[11rem]", "aria-label": r.label, children: /* @__PURE__ */ t(ot, { placeholder: r.placeholder ?? r.label }) }),
      /* @__PURE__ */ t(Pe, { children: (r.options ?? []).map((a) => /* @__PURE__ */ t(Fe, { value: a.value, children: a.label }, a.value)) })
    ] }, r.id)
  );
}
function go(e) {
  return e ? /* @__PURE__ */ i(oe, { className: n("p-5"), children: [
    e.title && /* @__PURE__ */ t(
      "h3",
      {
        className: "mb-3 font-semibold text-foreground",
        style: { fontFamily: "var(--font-display)", fontSize: "var(--text-body)" },
        children: e.title
      }
    ),
    e.facts && e.facts.length > 0 && /* @__PURE__ */ t("dl", { className: "space-y-2.5", children: e.facts.map((r, a) => /* @__PURE__ */ i("div", { className: "flex items-baseline justify-between gap-3", children: [
      /* @__PURE__ */ t("dt", { className: "text-muted-foreground", style: { fontSize: "var(--text-small)" }, children: r.label }),
      /* @__PURE__ */ t(
        "dd",
        {
          className: "text-right font-medium text-foreground",
          style: { fontSize: "var(--text-small)" },
          children: r.value
        }
      )
    ] }, a)) }),
    e.actions && e.actions.length > 0 && /* @__PURE__ */ t("div", { className: "mt-4 flex flex-col gap-2", children: Ne(e.actions) })
  ] }) : null;
}
const ho = `
.prumo-dt { --dt-pad-y: 0.5rem; --dt-pad-x: 0.95rem; }
.prumo-dt tbody tr { transition: background-color var(--duration-fast, 150ms) var(--ease-standard, ease); }
@media (prefers-reduced-motion: reduce) { .prumo-dt tbody tr { transition: none; } }
.prumo-dt-scroll { position: relative; overflow-x: auto; border: 1px solid var(--border); border-radius: var(--radius-lg); background: var(--card); }
.prumo-dt table { width: 100%; border-collapse: separate; border-spacing: 0; }
.prumo-dt th, .prumo-dt td { padding: var(--dt-pad-y) var(--dt-pad-x); text-align: left; vertical-align: middle; white-space: nowrap; }
.prumo-dt th[data-align="right"], .prumo-dt td[data-align="right"] { text-align: right; }
.prumo-dt th[data-align="center"], .prumo-dt td[data-align="center"] { text-align: center; }
.prumo-dt thead th { position: sticky; top: 0; z-index: 1; background: color-mix(in oklch, var(--muted) 28%, var(--card)); border-bottom: 1px solid var(--border); font-weight: 600; color: var(--muted-foreground); }
.prumo-dt tbody td { border-top: 1px solid color-mix(in oklch, var(--border) 65%, transparent); background: var(--card); }
.prumo-dt tbody tr:first-child td { border-top: 0; }
.prumo-dt tbody tr:hover td { background: color-mix(in oklch, var(--muted) 22%, var(--card)); }
.prumo-dt tbody tr[data-state="selected"] td { background: color-mix(in oklch, var(--primary) 8%, var(--card)); }
/* per-RECORD card reflow on small screens */
@media (max-width: 47.99em) {
  .prumo-dt-scroll { overflow-x: visible; border: 0; background: transparent; }
  .prumo-dt thead { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
  .prumo-dt table, .prumo-dt tbody, .prumo-dt tr, .prumo-dt td { display: block; }
  .prumo-dt tbody { display: grid; gap: var(--density-gap, 0.75rem); }
  .prumo-dt tr { border: 1px solid var(--border); border-radius: var(--radius-lg); padding: var(--density-padding, 1rem); box-shadow: var(--shadow-sm); background: var(--card); }
  .prumo-dt td { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 0.5rem 0; border: 0; white-space: normal; text-align: right; }
  .prumo-dt td + td { border-top: 1px solid color-mix(in oklch, var(--border) 55%, transparent); }
  .prumo-dt td::before { content: attr(data-label); font-weight: 600; color: var(--muted-foreground); text-align: left; }
  /* first cell = the record TITLE: prominent, no label, full width */
  .prumo-dt td:first-child { justify-content: flex-start; text-align: left; padding-top: 0; padding-bottom: 0.65rem; font-family: var(--font-display); font-weight: 700; font-size: var(--text-body); }
  .prumo-dt td:first-child::before { content: none; }
}
`;
function Fn({
  columns: e,
  columnsSpec: r,
  data: a,
  enableFiltering: o = !0,
  enablePagination: l = !0,
  pageSize: d = 10,
  filterPlaceholder: m = "Search…",
  toolbarActions: u,
  enableRowSelection: g = !1,
  bulkActions: p,
  emptyState: v,
  caption: y,
  className: N
}) {
  const [h, w] = s.useState([]), [S, b] = s.useState([]), [k, c] = s.useState(""), [C, z] = s.useState({}), M = s.useMemo(
    () => ({
      id: "__select",
      header: ({ table: R }) => /* @__PURE__ */ t(
        he,
        {
          checked: R.getIsAllPageRowsSelected() ? !0 : R.getIsSomePageRowsSelected() ? "indeterminate" : !1,
          onCheckedChange: (f) => R.toggleAllPageRowsSelected(!!f),
          "aria-label": "Select all rows on this page"
        }
      ),
      cell: ({ row: R }) => /* @__PURE__ */ t(
        he,
        {
          checked: R.getIsSelected(),
          onCheckedChange: (f) => R.toggleSelected(!!f),
          "aria-label": "Select row"
        }
      ),
      enableSorting: !1,
      meta: { align: "center" }
    }),
    []
  ), F = s.useMemo(
    () => e ?? (r ? fo(r) : []),
    [e, r]
  ), j = s.useMemo(
    () => g ? [M, ...F] : F,
    [g, M, F]
  ), x = _t({
    data: a,
    columns: j,
    getCoreRowModel: Ot(),
    getSortedRowModel: Et(),
    getFilteredRowModel: jt(),
    getPaginationRowModel: l ? $t() : void 0,
    enableRowSelection: g,
    onRowSelectionChange: z,
    onSortingChange: w,
    onColumnFiltersChange: b,
    onGlobalFilterChange: c,
    state: { sorting: h, columnFilters: S, globalFilter: k, rowSelection: C },
    initialState: { pagination: { pageSize: d } }
  }), $ = x.getSelectedRowModel().rows, H = x.getRowModel().rows, V = x.getFilteredRowModel().rows.length, we = (R) => {
    const f = x.getColumn(R), T = f == null ? void 0 : f.columnDef.header;
    return typeof T == "string" ? T : R;
  };
  return /* @__PURE__ */ i("div", { className: n("prumo-dt w-full", N), children: [
    /* @__PURE__ */ t("style", { children: ho }),
    g && $.length > 0 && /* @__PURE__ */ i(
      "div",
      {
        className: "mb-3 flex flex-wrap items-center gap-3 px-3 py-2",
        style: {
          borderRadius: "var(--radius-lg)",
          background: "color-mix(in oklch, var(--primary) 9%, var(--card))",
          border: "1px solid color-mix(in oklch, var(--primary) 22%, var(--border))"
        },
        children: [
          /* @__PURE__ */ i("span", { className: "font-medium text-foreground", style: { fontSize: "var(--text-small)" }, children: [
            $.length,
            " selected"
          ] }),
          p && /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center gap-2", children: p($.map((R) => R.original)) }),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => x.resetRowSelection(),
              className: "ml-auto font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:underline",
              style: { fontSize: "var(--text-small)" },
              children: "Clear selection"
            }
          )
        ]
      }
    ),
    (o || u) && /* @__PURE__ */ i("div", { className: "mb-3 flex flex-wrap items-center gap-3", children: [
      o && /* @__PURE__ */ i("div", { className: "relative w-full max-w-xs", children: [
        /* @__PURE__ */ t(
          ze,
          {
            className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ t(
          ce,
          {
            value: k ?? "",
            onChange: (R) => c(R.target.value),
            placeholder: m,
            "aria-label": m,
            className: "pl-9"
          }
        )
      ] }),
      /* @__PURE__ */ i(
        "span",
        {
          className: "text-muted-foreground",
          style: { fontSize: "var(--text-small)" },
          "aria-live": "polite",
          children: [
            V,
            " ",
            V === 1 ? "result" : "results"
          ]
        }
      ),
      u && /* @__PURE__ */ t("div", { className: "ml-auto flex items-center gap-2", children: u })
    ] }),
    /* @__PURE__ */ t("div", { className: "prumo-dt-scroll", children: /* @__PURE__ */ i("table", { style: { fontSize: "var(--text-small)" }, children: [
      y && /* @__PURE__ */ t("caption", { className: "sr-only", children: y }),
      /* @__PURE__ */ t("thead", { children: x.getHeaderGroups().map((R) => /* @__PURE__ */ t("tr", { children: R.headers.map((f) => {
        var Z;
        const T = f.column.getCanSort(), E = f.column.getIsSorted(), X = ((Z = f.column.columnDef.meta) == null ? void 0 : Z.align) ?? "left";
        return /* @__PURE__ */ t(
          "th",
          {
            "data-align": X,
            "aria-sort": E === "asc" ? "ascending" : E === "desc" ? "descending" : void 0,
            children: f.isPlaceholder ? null : T ? /* @__PURE__ */ i(
              "button",
              {
                type: "button",
                onClick: f.column.getToggleSortingHandler(),
                className: n(
                  "inline-flex min-h-[44px] items-center gap-1.5 font-semibold uppercase outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
                  X === "right" && "flex-row-reverse"
                ),
                style: {
                  fontSize: "0.7rem",
                  letterSpacing: "0.04em",
                  transition: "color var(--duration-fast) var(--ease-standard)"
                },
                children: [
                  Se(f.column.columnDef.header, f.getContext()),
                  E === "asc" ? /* @__PURE__ */ t(Ct, { className: "h-3.5 w-3.5", "aria-hidden": "true" }) : E === "desc" ? /* @__PURE__ */ t(Rt, { className: "h-3.5 w-3.5", "aria-hidden": "true" }) : /* @__PURE__ */ t(Tt, { className: "h-3.5 w-3.5 opacity-40", "aria-hidden": "true" })
                ]
              }
            ) : /* @__PURE__ */ t(
              "span",
              {
                className: "font-semibold uppercase",
                style: { fontSize: "0.7rem", letterSpacing: "0.04em" },
                children: Se(f.column.columnDef.header, f.getContext())
              }
            )
          },
          f.id
        );
      }) }, R.id)) }),
      /* @__PURE__ */ t("tbody", { children: H.length === 0 ? /* @__PURE__ */ t("tr", { children: /* @__PURE__ */ t("td", { colSpan: j.length, className: "p-8 text-center text-muted-foreground", children: v ?? "No results found." }) }) : H.map((R) => /* @__PURE__ */ t("tr", { "data-state": R.getIsSelected() ? "selected" : void 0, children: R.getVisibleCells().map((f) => {
        var T;
        return /* @__PURE__ */ t(
          "td",
          {
            "data-align": ((T = f.column.columnDef.meta) == null ? void 0 : T.align) ?? "left",
            "data-label": we(f.column.id),
            children: Se(f.column.columnDef.cell, f.getContext())
          },
          f.id
        );
      }) }, R.id)) })
    ] }) }),
    l && H.length > 0 && /* @__PURE__ */ i("div", { className: "mt-3 flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ i("p", { className: "text-muted-foreground", style: { fontSize: "var(--text-small)" }, children: [
        "Page ",
        x.getState().pagination.pageIndex + 1,
        " of ",
        x.getPageCount() || 1,
        " · ",
        V,
        " ",
        V === 1 ? "row" : "rows"
      ] }),
      /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ t(
          q,
          {
            variant: "outline",
            size: "sm",
            onClick: () => x.previousPage(),
            disabled: !x.getCanPreviousPage(),
            children: "Previous"
          }
        ),
        /* @__PURE__ */ t(
          q,
          {
            variant: "outline",
            size: "sm",
            onClick: () => x.nextPage(),
            disabled: !x.getCanNextPage(),
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function bo(e) {
  let r = 0;
  for (let a = 0; a < e.length; a++)
    r = (r << 5) - r + e.charCodeAt(a), r |= 0;
  return Math.abs(r);
}
function vo(e) {
  const r = e.trim().split(/\s+/).filter(Boolean);
  return r.length === 0 ? "?" : r.length === 1 ? r[0].slice(0, 2).toUpperCase() : (r[0][0] + r[r.length - 1][0]).toUpperCase();
}
function xo(e) {
  return bo(e) % 12 * 30;
}
function yo({
  entity: e,
  size: r = "sm"
}) {
  const a = xo(e.id), o = r === "md" ? "1.625rem" : "1.375rem";
  return /* @__PURE__ */ t(
    "span",
    {
      "aria-hidden": "true",
      className: "inline-flex shrink-0 items-center justify-center font-semibold",
      style: {
        width: o,
        height: o,
        fontSize: "0.7rem",
        lineHeight: 1,
        borderRadius: "var(--radius-sm)",
        background: `color-mix(in oklch, ${`hsl(from var(--primary) calc(h + ${a}) s l)`} 20%, var(--card))`,
        color: `hsl(from var(--primary) calc(h + ${a}) s calc(l - 20))`
      },
      children: vo(e.name)
    }
  );
}
function vt(e) {
  return {
    background: `hsl(from var(--primary) calc(h + ${e}) calc(s * 0.5) calc(l * 0.82))`
  };
}
function No({ value: e, hueOffset: r }) {
  return /* @__PURE__ */ i(
    "span",
    {
      className: "inline-flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1 font-semibold",
      style: {
        fontSize: "var(--text-small)",
        borderRadius: "var(--radius-sm)",
        background: "color-mix(in oklch, var(--muted) 60%, var(--card))",
        color: "var(--foreground)",
        border: "1px solid color-mix(in oklch, var(--border) 70%, transparent)"
      },
      children: [
        /* @__PURE__ */ t(
          "span",
          {
            "aria-hidden": "true",
            className: "inline-block h-2 w-2 shrink-0 rounded-full",
            style: vt(r)
          }
        ),
        e
      ]
    }
  );
}
function Le({
  fraction: e,
  animate: r,
  width: a = "4.75rem"
}) {
  const o = Math.max(0, Math.min(1, e));
  return /* @__PURE__ */ t(
    "span",
    {
      "aria-hidden": "true",
      className: "relative inline-block h-1.5 overflow-hidden rounded-full",
      style: { width: a, background: "color-mix(in oklch, var(--muted) 70%, var(--card))" },
      children: /* @__PURE__ */ t(
        se.span,
        {
          className: "absolute left-0 top-0 h-full rounded-full",
          style: { background: "var(--primary)" },
          initial: r ? { width: 0 } : !1,
          animate: { width: `${o * 100}%` },
          transition: r ? { duration: ie.slow, ease: de.standard } : { duration: 0 }
        }
      )
    }
  );
}
function wo({
  value: e,
  attr: r,
  animate: a,
  catHue: o
}) {
  const l = r.format ?? "text";
  if (e == null || e === "")
    return /* @__PURE__ */ i("span", { className: "text-muted-foreground", children: [
      /* @__PURE__ */ t("span", { "aria-hidden": "true", children: "—" }),
      /* @__PURE__ */ t("span", { className: "sr-only", children: "No data" })
    ] });
  switch (l) {
    case "check":
      return e ? /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-1.5 font-medium text-foreground", children: [
        /* @__PURE__ */ t(
          "span",
          {
            "aria-hidden": "true",
            className: "inline-flex h-5 w-5 items-center justify-center",
            style: {
              borderRadius: "var(--radius-sm)",
              background: "color-mix(in oklch, var(--primary) 16%, var(--card))"
            },
            children: /* @__PURE__ */ t(L, { className: "h-3.5 w-3.5", style: { color: "var(--primary)" } })
          }
        ),
        /* @__PURE__ */ t("span", { children: "Yes" })
      ] }) : /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-1.5 text-muted-foreground", children: [
        /* @__PURE__ */ t(
          "span",
          {
            "aria-hidden": "true",
            className: "inline-flex h-5 w-5 items-center justify-center",
            style: {
              borderRadius: "var(--radius-sm)",
              background: "color-mix(in oklch, var(--muted) 55%, var(--card))"
            },
            children: /* @__PURE__ */ t(Ge, { className: "h-3.5 w-3.5" })
          }
        ),
        /* @__PURE__ */ t("span", { children: "No" })
      ] });
    case "badge":
      return /* @__PURE__ */ t(No, { value: String(e), hueOffset: o.get(String(e)) ?? 0 });
    case "score": {
      const d = r.scoreMax ?? 5, m = typeof e == "number" ? e : Number(e), u = Number.isFinite(m), g = u ? m / d : 0;
      return /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-2", children: [
        /* @__PURE__ */ t("span", { className: "sr-only", children: u ? `${m} out of ${d}` : String(e) }),
        /* @__PURE__ */ t(Le, { fraction: g, animate: a }),
        /* @__PURE__ */ i("span", { className: "tabular-nums font-semibold text-foreground", "aria-hidden": "true", children: [
          u ? m : String(e),
          /* @__PURE__ */ i("span", { className: "font-normal text-muted-foreground", children: [
            "/",
            d
          ] })
        ] })
      ] });
    }
    case "percent": {
      const d = r.percentMax ?? 100, m = typeof e == "number" ? e : Number(e), u = Number.isFinite(m), g = u ? m / d : 0;
      return /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-2", children: [
        /* @__PURE__ */ t("span", { className: "sr-only", children: u ? `${m} percent` : String(e) }),
        /* @__PURE__ */ t(Le, { fraction: g, animate: a }),
        /* @__PURE__ */ t("span", { className: "tabular-nums font-semibold text-foreground", "aria-hidden": "true", children: u ? `${m}%` : String(e) })
      ] });
    }
    case "count": {
      const d = typeof e == "number" ? e : Number(e), m = Number.isFinite(d) ? d : String(e);
      return /* @__PURE__ */ i("span", { className: "inline-flex items-baseline gap-1", children: [
        /* @__PURE__ */ t("span", { className: "tabular-nums font-semibold text-foreground", children: m }),
        r.unit && /* @__PURE__ */ t("span", { className: "text-muted-foreground", style: { fontSize: "var(--text-small)" }, children: r.unit })
      ] });
    }
    case "currency": {
      const d = typeof e == "number" ? e : Number(e);
      if (!Number.isFinite(d)) return /* @__PURE__ */ t("span", { className: "font-medium", children: String(e) });
      let m;
      try {
        m = new Intl.NumberFormat(void 0, {
          style: "currency",
          currency: r.currency ?? "USD",
          maximumFractionDigits: 0
        }).format(d);
      } catch {
        m = String(d);
      }
      return /* @__PURE__ */ t("span", { className: "tabular-nums font-semibold text-foreground", children: m });
    }
    case "text":
    default:
      return /* @__PURE__ */ t("span", { className: "font-medium text-foreground", children: String(e) });
  }
}
const So = `
.prumo-ct { position: relative; --ct-label-w: 10rem; --ct-col-w: 10.25rem; --ct-pad-y: 1.25rem; --ct-pad-x: 1.35rem; }
.prumo-ct[data-density="compact"] { --ct-pad-y: 0.7rem; --ct-pad-x: 1rem; }
.prumo-ct-scroll { position: relative; overflow-x: auto; overflow-y: visible; border-radius: var(--radius-lg); border: 1px solid var(--border); background: var(--card); box-shadow: var(--shadow-sm); -webkit-overflow-scrolling: touch; scrollbar-width: thin; }
.prumo-ct table { width: 100%; border-collapse: separate; border-spacing: 0; }
.prumo-ct th, .prumo-ct td { text-align: left; vertical-align: middle; padding: var(--ct-pad-y) var(--ct-pad-x); }
/* row separators = hairlines on the body cells */
.prumo-ct tbody td, .prumo-ct tbody th[scope="row"] { border-top: 1px solid color-mix(in oklch, var(--border) 75%, transparent); }
.prumo-ct tbody tr:hover td, .prumo-ct tbody tr:hover th[scope="row"] { background-color: color-mix(in oklch, var(--muted) 28%, var(--card)); }
/* frozen LABEL column — separated by position + a hairline, lightly tinted */
.prumo-ct .prumo-ct-corner, .prumo-ct th[scope="row"] {
  position: sticky; left: 0; z-index: 2;
  min-width: var(--ct-label-w); width: var(--ct-label-w);
  background: color-mix(in oklch, var(--muted) 22%, var(--card));
  border-right: 1px solid var(--border);
}
/* sticky HEADER row */
.prumo-ct thead th { position: sticky; top: 0; z-index: 3; background: color-mix(in oklch, var(--muted) 18%, var(--card)); border-bottom: 1px solid var(--border); vertical-align: bottom; padding-top: 1.35rem; padding-bottom: 1.35rem; }
.prumo-ct .prumo-ct-corner { z-index: 4; top: 0; }
/* entity columns */
.prumo-ct thead th.prumo-ct-entity, .prumo-ct tbody td { min-width: var(--ct-col-w); }
.prumo-ct tbody td { background: var(--card); }
/* group header row */
.prumo-ct .prumo-ct-group th { position: sticky; left: 0; z-index: 2; background: color-mix(in oklch, var(--muted) 40%, var(--card)); border-top: 1px solid var(--border); font-family: var(--font-display); }
/* row-stagger on INNER spans only (sticky-safe) */
.prumo-ct-cell-in { display: inline-flex; }
@media (prefers-reduced-motion: no-preference) {
  .prumo-ct-anim .prumo-ct-cell-in { animation: prumo-ct-in var(--duration-base, 300ms) var(--ease-entrance, cubic-bezier(0.2,0,0.38,0.9)) both; }
}
@keyframes prumo-ct-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
/* right-edge fade + swipe hint — only when the columns scroll (small screens) */
.prumo-ct-fade { display: none; }
.prumo-ct-swipe { display: none; }
@media (max-width: 30em) {
  .prumo-ct { --ct-label-w: 7.5rem; --ct-col-w: 8.25rem; --ct-pad-x: 0.8rem; }
  .prumo-ct-fade { display: block; position: absolute; top: 0; bottom: 0; right: 0; width: 2.25rem; pointer-events: none; z-index: 3; border-top-right-radius: var(--radius-lg); border-bottom-right-radius: var(--radius-lg); background: linear-gradient(to right, transparent, var(--card)); }
  .prumo-ct-swipe { display: flex; align-items: center; justify-content: center; gap: 0.4rem; padding-top: 0.7rem; color: var(--muted-foreground); font-size: var(--text-small); }
}
`;
function _n({
  entities: e,
  attributes: r,
  groups: a,
  eyebrow: o,
  title: l,
  description: d,
  sources: m,
  footnote: u,
  keyAttributeIds: g,
  density: p = "comfortable",
  enableDensityToggle: v = !1,
  emptyState: y,
  caption: N,
  className: h
}) {
  const w = le(), [S, b] = s.useState(p), k = !!g && g.length > 0, [c, C] = s.useState(k), z = s.useRef(!0);
  s.useEffect(() => {
    z.current = !1;
  }, []);
  const M = !w && z.current;
  if (e.length === 0 || r.length === 0)
    return /* @__PURE__ */ t(
      "div",
      {
        className: n(
          "flex items-center justify-center rounded-lg border border-border bg-card p-8 text-center text-muted-foreground",
          h
        ),
        style: { borderRadius: "var(--radius-lg)" },
        children: y ?? "Nothing to compare yet."
      }
    );
  const F = k && c ? r.filter((f) => g.includes(f.id)) : r, j = a && a.length > 0 ? a.map((f) => f.id) : [], x = [];
  if (j.length > 0) {
    for (const f of a) {
      const T = F.filter((E) => E.group === f.id);
      if (T.length !== 0) {
        x.push({ kind: "group", group: f });
        for (const E of T) x.push({ kind: "attr", attr: E });
      }
    }
    for (const f of F)
      (!f.group || !j.includes(f.group)) && x.push({ kind: "attr", attr: f });
  } else
    for (const f of F) x.push({ kind: "attr", attr: f });
  const $ = Array.from(
    new Set(
      r.filter((f) => (f.format ?? "text") === "badge").flatMap((f) => e.map((T) => T.values[f.id])).filter((f) => typeof f == "string" && f.length > 0)
    )
  ), H = r.some((f) => (f.format ?? "text") === "check"), V = new Map(
    $.map((f, T) => [f, Math.round(T * 300 / Math.max($.length, 1))])
  ), we = v || k;
  let R = 0;
  return /* @__PURE__ */ i("div", { className: n("prumo-ct w-full", h), "data-density": S, children: [
    /* @__PURE__ */ t("style", { children: So }),
    (o || l || d || m) && /* @__PURE__ */ i("header", { className: "mb-5", children: [
      o && /* @__PURE__ */ t(
        "p",
        {
          className: "mb-2 font-semibold uppercase",
          style: { fontSize: "var(--text-small)", letterSpacing: "0.08em", color: "var(--primary)" },
          children: o
        }
      ),
      l && /* @__PURE__ */ t(
        "h2",
        {
          className: "text-balance font-semibold text-foreground",
          style: { fontSize: "var(--text-h2)", fontFamily: "var(--font-display)", lineHeight: 1.1 },
          children: l
        }
      ),
      d && /* @__PURE__ */ t("p", { className: "mt-2 max-w-prose text-muted-foreground", style: { fontSize: "var(--text-body)" }, children: d }),
      m && /* @__PURE__ */ i(
        "p",
        {
          className: "mt-3 inline-flex items-center gap-1.5 text-muted-foreground",
          style: { fontSize: "var(--text-small)" },
          children: [
            /* @__PURE__ */ t(zt, { className: "h-3.5 w-3.5 shrink-0", "aria-hidden": "true" }),
            m
          ]
        }
      )
    ] }),
    we && /* @__PURE__ */ i("div", { className: "mb-3 flex flex-wrap items-center gap-2", children: [
      k && /* @__PURE__ */ t(
        Be,
        {
          ariaLabel: "Show key attributes or all attributes",
          options: [
            { id: "key", label: "Key" },
            { id: "all", label: "All" }
          ],
          value: c ? "key" : "all",
          onChange: (f) => C(f === "key")
        }
      ),
      v && /* @__PURE__ */ t(
        Be,
        {
          ariaLabel: "Row density",
          options: [
            { id: "comfortable", label: "Comfortable" },
            { id: "compact", label: "Compact" }
          ],
          value: S,
          onChange: (f) => b(f)
        }
      )
    ] }),
    /* @__PURE__ */ i("div", { className: "prumo-ct-scroll", children: [
      /* @__PURE__ */ i(
        "table",
        {
          className: n(M && "prumo-ct-anim"),
          style: { fontSize: "var(--text-small)" },
          children: [
            N && /* @__PURE__ */ t("caption", { className: "sr-only", children: N }),
            /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ i("tr", { children: [
              /* @__PURE__ */ t("th", { scope: "col", className: "prumo-ct-corner align-bottom", children: /* @__PURE__ */ t("span", { className: "prumo-ct-cell-in font-medium uppercase text-muted-foreground", style: { fontSize: "0.7rem", letterSpacing: "0.06em" }, children: "Compare" }) }),
              e.map((f) => /* @__PURE__ */ t("th", { scope: "col", className: "prumo-ct-entity align-bottom", children: /* @__PURE__ */ i("span", { className: "prumo-ct-cell-in items-start gap-2.5", children: [
                /* @__PURE__ */ t(yo, { entity: f, size: "md" }),
                /* @__PURE__ */ i("span", { className: "min-w-0", children: [
                  /* @__PURE__ */ t(
                    "span",
                    {
                      className: "block font-semibold text-foreground",
                      style: { fontFamily: "var(--font-display)", fontSize: "var(--text-body)", lineHeight: 1.15 },
                      children: f.name
                    }
                  ),
                  f.subtitle && /* @__PURE__ */ t("span", { className: "block truncate font-normal text-muted-foreground", style: { fontSize: "var(--text-small)" }, children: f.subtitle })
                ] })
              ] }) }, f.id))
            ] }) }),
            /* @__PURE__ */ t("tbody", { children: x.map((f) => {
              if (f.kind === "group")
                return /* @__PURE__ */ t("tr", { className: "prumo-ct-group", children: /* @__PURE__ */ t("th", { scope: "colgroup", colSpan: e.length + 1, children: /* @__PURE__ */ i("span", { className: "prumo-ct-cell-in flex-col items-start gap-0.5", children: [
                  /* @__PURE__ */ t("span", { className: "font-semibold text-foreground", style: { fontSize: "var(--text-small)" }, children: f.group.label }),
                  f.group.description && /* @__PURE__ */ t("span", { className: "font-normal text-muted-foreground", style: { fontSize: "var(--text-small)" }, children: f.group.description })
                ] }) }) }, `g-${f.group.id}`);
              const T = f.attr, E = w ? 0 : Math.min(R * 0.04, 0.4);
              R += 1;
              const X = { animationDelay: `${E}s` };
              return /* @__PURE__ */ i("tr", { children: [
                /* @__PURE__ */ t("th", { scope: "row", className: "align-top", children: /* @__PURE__ */ i("span", { className: "prumo-ct-cell-in flex-col items-start gap-0.5", style: X, children: [
                  /* @__PURE__ */ t("span", { className: "font-semibold text-foreground", children: T.label }),
                  T.hint && /* @__PURE__ */ t("span", { className: "font-normal text-muted-foreground", style: { fontSize: "var(--text-small)" }, children: T.hint })
                ] }) }),
                e.map((Z) => /* @__PURE__ */ t("td", { children: /* @__PURE__ */ t("span", { className: "prumo-ct-cell-in", style: X, children: /* @__PURE__ */ t(wo, { value: Z.values[T.id], attr: T, animate: M, catHue: V }) }) }, Z.id))
              ] }, T.id);
            }) })
          ]
        }
      ),
      /* @__PURE__ */ t("div", { className: "prumo-ct-fade", "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ i("p", { className: "prumo-ct-swipe", "aria-hidden": "true", children: [
      "← swipe to compare ",
      e.length,
      " →"
    ] }),
    ($.length > 0 || H || u) && /* @__PURE__ */ i("div", { className: "mt-4", children: [
      ($.length > 0 || H) && /* @__PURE__ */ i("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground", style: { fontSize: "var(--text-small)" }, children: [
        $.map((f) => /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ t("span", { className: "inline-block h-2 w-2 rounded-full", style: vt(V.get(f) ?? 0), "aria-hidden": "true" }),
          f
        ] }, f)),
        H && /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ t(L, { className: "h-3.5 w-3.5", style: { color: "var(--primary)" }, "aria-hidden": "true" }),
          "Available"
        ] })
      ] }),
      u && /* @__PURE__ */ t("p", { className: "mt-2 max-w-prose text-muted-foreground", style: { fontSize: "var(--text-small)" }, children: u })
    ] })
  ] });
}
function Be({
  options: e,
  value: r,
  onChange: a,
  ariaLabel: o
}) {
  return /* @__PURE__ */ t(
    "div",
    {
      role: "group",
      "aria-label": o,
      className: "inline-flex items-center gap-0.5 p-0.5",
      style: {
        borderRadius: "var(--radius)",
        background: "color-mix(in oklch, var(--muted) 55%, var(--card))",
        border: "1px solid var(--border)"
      },
      children: e.map((l) => {
        const d = l.id === r;
        return /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            "aria-pressed": d,
            onClick: () => a(l.id),
            className: "px-3 py-1 font-medium transition-colors",
            style: {
              minHeight: "2rem",
              fontSize: "var(--text-small)",
              borderRadius: "calc(var(--radius) - 0.15rem)",
              background: d ? "var(--card)" : "transparent",
              color: d ? "var(--foreground)" : "var(--muted-foreground)",
              boxShadow: d ? "var(--shadow-sm)" : "none"
            },
            children: l.label
          },
          l.id
        );
      })
    }
  );
}
function $n({
  items: e,
  renderItem: r,
  card: a,
  getKey: o,
  layout: l = "grid",
  minCardWidth: d = "16rem",
  emptyState: m,
  "aria-label": u,
  className: g
}) {
  const p = le(), v = (h, w) => r ? r(h, w) : a ? bt(a, h) : null;
  if (e.length === 0)
    return /* @__PURE__ */ t(
      "div",
      {
        className: n(
          "flex items-center justify-center rounded-lg border border-dashed border-border bg-card p-10 text-center text-muted-foreground",
          g
        ),
        children: m ?? "Nothing here yet."
      }
    );
  const y = l === "grid" ? {
    display: "grid",
    gap: "var(--density-gap)",
    gridTemplateColumns: `repeat(auto-fill, minmax(min(${d}, 100%), 1fr))`
  } : l === "list" ? { display: "flex", flexDirection: "column", gap: "var(--density-gap)" } : {
    // masonry via CSS multi-columns: reflows column count by width.
    columnWidth: d,
    columnGap: "var(--density-gap)"
  }, N = l === "masonry";
  return /* @__PURE__ */ t(
    "ul",
    {
      role: "list",
      "aria-label": u,
      className: n("m-0 list-none p-0", g),
      style: y,
      children: e.map((h, w) => {
        const S = o ? o(h, w) : w;
        return /* @__PURE__ */ t(
          se.li,
          {
            role: "listitem",
            className: N ? "mb-[var(--density-gap)] break-inside-avoid" : void 0,
            style: N ? { breakInside: "avoid" } : void 0,
            initial: p ? !1 : { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: p ? { duration: 0 } : { duration: ie.base, delay: Math.min(w * 0.035, 0.32), ease: de.entrance },
            children: v(h, w)
          },
          S
        );
      })
    }
  );
}
function ko({ deltaPct: e }) {
  const r = e >= 0;
  return /* @__PURE__ */ i(
    "span",
    {
      className: "inline-flex items-center gap-0.5 font-medium text-muted-foreground tabular-nums",
      style: { fontSize: "var(--text-small)" },
      children: [
        r ? /* @__PURE__ */ t(Dt, { className: "h-3.5 w-3.5", "aria-hidden": "true" }) : /* @__PURE__ */ t(Mt, { className: "h-3.5 w-3.5", "aria-hidden": "true" }),
        Math.abs(e).toFixed(1),
        "%",
        /* @__PURE__ */ i("span", { className: "sr-only", children: [
          r ? "up" : "down",
          " from the previous period"
        ] })
      ]
    }
  );
}
function Co(e) {
  if (e.length < 2) return "";
  let r = `M${e[0][0].toFixed(1)},${e[0][1].toFixed(1)}`;
  for (let a = 0; a < e.length - 1; a++) {
    const o = e[a - 1] ?? e[a], l = e[a], d = e[a + 1], m = e[a + 2] ?? d, u = l[0] + (d[0] - o[0]) / 6, g = l[1] + (d[1] - o[1]) / 6, p = d[0] - (m[0] - l[0]) / 6, v = d[1] - (m[1] - l[1]) / 6;
    r += ` C${u.toFixed(1)},${g.toFixed(1)} ${p.toFixed(1)},${v.toFixed(1)} ${d[0].toFixed(1)},${d[1].toFixed(1)}`;
  }
  return r;
}
function Ro({ data: e }) {
  const a = `spark-${s.useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  if (e.length < 2) return null;
  const o = 84, l = 30, d = 2, m = Math.min(...e), g = Math.max(...e) - m || 1, p = (o - d * 2) / (e.length - 1), v = e.map((h, w) => {
    const S = d + w * p, b = d + (1 - (h - m) / g) * (l - d * 2);
    return [S, b];
  }), y = Co(v), N = `${y} L${v[v.length - 1][0].toFixed(1)},${l} L${v[0][0].toFixed(1)},${l} Z`;
  return /* @__PURE__ */ i("svg", { width: o, height: l, viewBox: `0 0 ${o} ${l}`, "aria-hidden": "true", style: { flexShrink: 0 }, children: [
    /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ i("linearGradient", { id: a, x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ t("stop", { offset: "0%", stopColor: "var(--primary)", stopOpacity: "0.24" }),
      /* @__PURE__ */ t("stop", { offset: "100%", stopColor: "var(--primary)", stopOpacity: "0" })
    ] }) }),
    /* @__PURE__ */ t("path", { d: N, fill: `url(#${a})` }),
    /* @__PURE__ */ t(
      "path",
      {
        d: y,
        fill: "none",
        stroke: "var(--primary)",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  ] });
}
const To = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
};
function zo({
  data: e,
  indexKey: r,
  categoryKey: a,
  tokens: o
}) {
  const l = e.map((w, S) => ({
    name: String(w[r]),
    value: Number(w[a]) || 0,
    color: `var(--${o[S % o.length]})`
  })), d = l.reduce((w, S) => w + S.value, 0) || 1, m = 224, u = 24, g = (m - u) / 2 - 2, p = m / 2, v = m / 2, y = 2 * Math.PI * g, N = u * 1.4;
  let h = 0;
  return /* @__PURE__ */ t("div", { className: "flex items-center justify-center py-2", children: /* @__PURE__ */ i("svg", { width: m, height: m, viewBox: `0 0 ${m} ${m}`, role: "img", "aria-label": "Distribution", children: [
    /* @__PURE__ */ t(
      "circle",
      {
        cx: p,
        cy: v,
        r: g,
        fill: "none",
        stroke: "color-mix(in oklch, var(--muted) 45%, var(--card))",
        strokeWidth: u
      }
    ),
    /* @__PURE__ */ t("g", { transform: `rotate(-90 ${p} ${v})`, children: l.map((w, S) => {
      const k = w.value / d * y, c = Math.max(k - N, 1e-3), C = h + N / 2;
      return h += k, /* @__PURE__ */ t(
        "circle",
        {
          cx: p,
          cy: v,
          r: g,
          fill: "none",
          stroke: w.color,
          strokeWidth: u,
          strokeDasharray: `${c.toFixed(2)} ${(y - c).toFixed(2)}`,
          strokeDashoffset: (-C).toFixed(2),
          strokeLinecap: "round"
        },
        `${w.name}-${S}`
      );
    }) }),
    /* @__PURE__ */ t(
      "text",
      {
        x: p,
        y: v,
        textAnchor: "middle",
        dominantBaseline: "central",
        style: { fontFamily: "var(--font-display)", fontSize: "var(--text-h2)", fontWeight: 600, fill: "var(--foreground)" },
        children: d
      }
    )
  ] }) });
}
function Do({
  data: e,
  indexKey: r,
  categoryKey: a,
  tokens: o
}) {
  var u;
  const l = e.map((g) => ({ label: String(g[r]), value: Number(g[a]) || 0 })), d = Math.max(...l.map((g) => g.value), 1), m = ((u = l[0]) == null ? void 0 : u.value) || 1;
  return /* @__PURE__ */ t("ol", { className: "mt-2 flex flex-col gap-3", children: l.map((g, p) => {
    const v = g.value / d * 100, y = p === 0 ? 100 : g.value / m * 100;
    return /* @__PURE__ */ i("li", { children: [
      /* @__PURE__ */ i("div", { className: "flex items-baseline justify-between gap-2", style: { fontSize: "var(--text-small)" }, children: [
        /* @__PURE__ */ t("span", { className: "font-medium text-foreground", children: g.label }),
        /* @__PURE__ */ i("span", { className: "tabular-nums text-muted-foreground", children: [
          g.value.toLocaleString(),
          p > 0 && /* @__PURE__ */ i("span", { className: "ml-1.5", children: [
            "· ",
            y.toFixed(0),
            "%"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t(
        "div",
        {
          className: "mt-1 h-7 w-full overflow-hidden",
          style: { borderRadius: "var(--radius-md)", background: "color-mix(in oklch, var(--muted) 38%, var(--card))" },
          children: /* @__PURE__ */ t(
            "div",
            {
              className: "h-full transition-[width]",
              style: {
                width: `${v}%`,
                minWidth: g.value > 0 ? "0.25rem" : 0,
                borderRadius: "var(--radius-md)",
                // subtle gradient lift (srgb, not oklch — M1) to soften the utilitarian flat fill.
                background: `linear-gradient(90deg, var(--${o[0] ?? "primary"}), color-mix(in srgb, var(--${o[0] ?? "primary"}) 80%, var(--card)))`
              }
            }
          )
        }
      )
    ] }, p);
  }) });
}
const Mo = ["blue", "cyan", "amber", "violet", "emerald", "rose"];
function Ao({ spec: e }) {
  var g;
  const r = s.useRef(null), a = e.colorTokens ?? ["primary", "accent"], o = a.join(","), l = e.kind === "donut" ? e.data.length : ((g = e.categories) == null ? void 0 : g.length) ?? 1, d = Mo.slice(0, Math.max(l, 1));
  s.useEffect(() => {
    const p = r.current;
    if (!p || typeof window > "u") return;
    const v = () => {
      const w = getComputedStyle(p);
      return a.map((S) => w.getPropertyValue(`--${S}`).trim() || `var(--${S})`);
    }, y = () => {
      const w = v(), S = (b) => w[b % w.length];
      p.querySelectorAll(".recharts-area").forEach((b, k) => {
        b.querySelectorAll(".recharts-area-area").forEach((c) => {
          c.style.fill = S(k), c.style.fillOpacity = "0.16";
        }), b.querySelectorAll(".recharts-area-curve").forEach((c) => {
          c.style.stroke = S(k), c.style.fill = "none";
        });
      }), p.querySelectorAll(".recharts-line").forEach((b, k) => {
        b.querySelectorAll(".recharts-line-curve").forEach((c) => {
          c.style.stroke = S(k);
        });
      }), p.querySelectorAll(".recharts-bar").forEach((b, k) => {
        b.querySelectorAll(".recharts-bar-rectangle path, .recharts-rectangle").forEach((c) => {
          c.style.fill = S(k);
        });
      }), p.querySelectorAll(".recharts-pie-sector path, .recharts-pie .recharts-sector").forEach((b, k) => {
        b.style.fill = S(k), b.style.stroke = "var(--card)";
      });
    };
    y();
    const N = new MutationObserver(() => y());
    N.observe(p, { childList: !0, subtree: !0 });
    const h = new ResizeObserver(() => y());
    return h.observe(p), () => {
      N.disconnect(), h.disconnect();
    };
  }, [e.kind, JSON.stringify(e.data), o]);
  const m = {
    data: e.data,
    colors: d,
    showAnimation: !1,
    showLegend: !1,
    className: "h-64 mt-2"
  }, u = e.kind === "donut" ? e.data.map((p) => String(p[e.index ?? "name"])) : e.categories ?? [];
  return /* @__PURE__ */ i("div", { ref: r, children: [
    e.title && /* @__PURE__ */ t("h3", { className: "mb-2 font-semibold text-foreground", style: { fontSize: "var(--text-body)", fontFamily: "var(--font-display)" }, children: e.title }),
    u.length > 0 && /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-x-4 gap-y-1", style: { fontSize: "var(--text-small)" }, children: u.map((p, v) => /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-1.5 text-muted-foreground", children: [
      /* @__PURE__ */ t(
        "span",
        {
          "aria-hidden": "true",
          className: "inline-block h-2 w-2 rounded-full",
          style: { background: `var(--${a[v % a.length]})` }
        }
      ),
      p
    ] }, `${p}-${v}`)) }),
    e.kind === "area" && /* @__PURE__ */ t(Ht, { ...m, curveType: "monotone", index: e.index ?? "date", categories: e.categories ?? [] }),
    e.kind === "bar" && /* @__PURE__ */ t(Vt, { ...m, index: e.index ?? "date", categories: e.categories ?? [] }),
    e.kind === "line" && /* @__PURE__ */ t(Gt, { ...m, curveType: "monotone", index: e.index ?? "date", categories: e.categories ?? [] }),
    e.kind === "donut" && /* @__PURE__ */ t(
      zo,
      {
        data: e.data,
        indexKey: e.index ?? "name",
        categoryKey: e.category ?? "value",
        tokens: a
      }
    ),
    e.kind === "funnel" && /* @__PURE__ */ t(
      Do,
      {
        data: e.data,
        indexKey: e.index ?? "name",
        categoryKey: e.category ?? "value",
        tokens: a
      }
    )
  ] });
}
function jn({
  kpis: e,
  chart: r,
  columns: a = 4,
  emptyState: o,
  className: l,
  "aria-label": d
}) {
  const m = le();
  return e.length === 0 && !r ? /* @__PURE__ */ t(
    "div",
    {
      className: n(
        "flex items-center justify-center rounded-lg border border-dashed border-border bg-card p-10 text-center text-muted-foreground",
        l
      ),
      style: { borderRadius: "var(--radius-lg)" },
      children: o ?? "No metrics to show."
    }
  ) : /* @__PURE__ */ i("section", { className: n("w-full", l), "aria-label": d ?? "Dashboard", children: [
    e.length > 0 && /* @__PURE__ */ t("div", { className: n("grid gap-[var(--density-gap)]", To[a]), children: e.map((u, g) => /* @__PURE__ */ t(
      se.div,
      {
        initial: m ? !1 : { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: m ? { duration: 0 } : { duration: ie.base, delay: Math.min(g * 0.05, 0.3), ease: de.entrance },
        children: /* @__PURE__ */ t(oe, { className: "h-full", children: /* @__PURE__ */ i("div", { className: "flex h-full flex-col gap-2", style: { padding: "1.1rem 1.2rem" }, children: [
          /* @__PURE__ */ t(
            "p",
            {
              className: "font-semibold uppercase text-muted-foreground",
              style: { fontSize: "0.7rem", letterSpacing: "0.05em" },
              children: u.label
            }
          ),
          /* @__PURE__ */ i("div", { className: "flex items-end justify-between gap-3", children: [
            /* @__PURE__ */ i("div", { className: "flex flex-col gap-1", children: [
              /* @__PURE__ */ t(
                "span",
                {
                  className: "font-semibold text-foreground tabular-nums",
                  style: { fontSize: "var(--text-h2)", fontFamily: "var(--font-display)", lineHeight: 1 },
                  children: u.value
                }
              ),
              typeof u.deltaPct == "number" && /* @__PURE__ */ t(ko, { deltaPct: u.deltaPct })
            ] }),
            u.spark && u.spark.length > 1 && /* @__PURE__ */ t(Ro, { data: u.spark })
          ] }),
          u.hint && /* @__PURE__ */ t("p", { className: "text-muted-foreground", style: { fontSize: "var(--text-small)", marginTop: "auto" }, children: u.hint })
        ] }) })
      },
      `${u.label}-${g}`
    )) }),
    r && /* @__PURE__ */ t(oe, { className: "mt-[var(--density-gap)]", children: /* @__PURE__ */ t("div", { style: { padding: "1.25rem 1.2rem" }, children: /* @__PURE__ */ t(Ao, { spec: r }) }) })
  ] });
}
function En({
  columns: e,
  renderCard: r,
  cardSpec: a,
  onMoveCard: o,
  onAddCard: l,
  emptyColumnText: d = "No items",
  emptyState: m,
  className: u,
  "aria-label": g
}) {
  const p = le(), v = (b, k) => r ? r(b, k) : a ? bt(a, b) : null, y = s.useRef(!0);
  s.useEffect(() => {
    y.current = !1;
  }, []);
  const N = !p && y.current, h = s.useRef(null), [w, S] = s.useState(!1);
  return s.useEffect(() => {
    const b = h.current;
    if (!b) return;
    const k = () => S(b.scrollLeft + b.clientWidth < b.scrollWidth - 4);
    k(), b.addEventListener("scroll", k, { passive: !0 });
    const c = new ResizeObserver(k);
    return c.observe(b), () => {
      b.removeEventListener("scroll", k), c.disconnect();
    };
  }, [e]), e.length === 0 ? /* @__PURE__ */ t(
    "div",
    {
      className: n(
        "flex items-center justify-center rounded-lg border border-dashed border-border bg-card p-10 text-center text-muted-foreground",
        u
      ),
      style: { borderRadius: "var(--radius-lg)" },
      children: m ?? "No columns yet."
    }
  ) : /* @__PURE__ */ i("div", { className: n("relative", u), children: [
    /* @__PURE__ */ t(
      "div",
      {
        ref: h,
        role: "group",
        "aria-label": g ?? "Board",
        className: "flex flex-col gap-5 md:flex-row md:items-start md:gap-5 md:overflow-x-auto md:pb-2",
        children: e.map((b, k) => {
          const c = e[k - 1], C = e[k + 1];
          return /* @__PURE__ */ i("section", { "aria-label": b.title, className: "flex w-full shrink-0 flex-col md:w-80", children: [
            /* @__PURE__ */ i("header", { className: "mb-3 flex items-center gap-2 px-0.5", children: [
              b.accentToken && /* @__PURE__ */ t(
                "span",
                {
                  "aria-hidden": "true",
                  className: "inline-block h-2.5 w-2.5 shrink-0 rounded-full",
                  style: { background: `var(--${b.accentToken})` }
                }
              ),
              /* @__PURE__ */ t("h3", { className: "font-semibold text-foreground", style: { fontSize: "var(--text-body)", fontFamily: "var(--font-display)" }, children: b.title }),
              /* @__PURE__ */ t("span", { className: "tabular-nums text-muted-foreground", style: { fontSize: "var(--text-small)" }, children: b.cards.length }),
              /* @__PURE__ */ t("span", { className: "flex-1" }),
              l && /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: () => l(b.id),
                  "aria-label": `Add to ${b.title}`,
                  className: "inline-flex h-7 w-7 items-center justify-center rounded-sm text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
                  children: /* @__PURE__ */ t(At, { className: "h-4 w-4", "aria-hidden": "true" })
                }
              )
            ] }),
            /* @__PURE__ */ t("ul", { role: "list", className: "m-0 flex list-none flex-col gap-3 p-0", children: b.cards.length === 0 ? /* @__PURE__ */ t(
              "li",
              {
                className: "rounded-lg border border-dashed border-border p-4 text-center text-muted-foreground",
                style: { fontSize: "var(--text-small)", borderRadius: "var(--radius-lg)" },
                children: d
              }
            ) : b.cards.map((z, M) => /* @__PURE__ */ i(
              se.li,
              {
                role: "listitem",
                className: "border border-border bg-card p-3.5",
                style: { borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)" },
                initial: N ? { opacity: 0, y: 8 } : !1,
                animate: { opacity: 1, y: 0 },
                transition: N ? { duration: ie.base, delay: Math.min(M * 0.03, 0.25), ease: de.entrance } : { duration: 0 },
                children: [
                  v(z, b),
                  o && (c || C) && /* @__PURE__ */ i("div", { className: "mt-2.5 flex justify-end gap-1", children: [
                    c && /* @__PURE__ */ t(
                      "button",
                      {
                        type: "button",
                        onClick: () => o(z.id, b.id, c.id),
                        "aria-label": `Move to ${c.title}`,
                        className: "inline-flex h-11 min-w-[44px] items-center justify-center rounded-sm px-2 text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
                        style: { fontSize: "var(--text-small)" },
                        children: "←"
                      }
                    ),
                    C && /* @__PURE__ */ t(
                      "button",
                      {
                        type: "button",
                        onClick: () => o(z.id, b.id, C.id),
                        "aria-label": `Move to ${C.title}`,
                        className: "inline-flex h-11 min-w-[44px] items-center justify-center rounded-sm px-2 text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
                        style: { fontSize: "var(--text-small)" },
                        children: "→"
                      }
                    )
                  ] })
                ]
              },
              z.id
            )) })
          ] }, b.id);
        })
      }
    ),
    w && /* @__PURE__ */ t(
      "div",
      {
        "aria-hidden": "true",
        className: "pointer-events-none absolute inset-y-0 right-0 hidden w-12 md:block",
        style: { background: "linear-gradient(to right, transparent, var(--background))" }
      }
    )
  ] });
}
function Io(e, r) {
  const a = {};
  for (const o of e.fields) {
    if (!o.required) continue;
    const l = r[o.name];
    (l === void 0 || l === "" || o.type === "checkbox" && l !== !0) && (a[o.name] = `${o.label} is required.`);
  }
  return a;
}
function On({
  steps: e,
  initialValues: r = {},
  onSubmit: a,
  onChange: o,
  className: l,
  emptyState: d
}) {
  const m = le(), [u, g] = s.useState(0), [p, v] = s.useState(r), [y, N] = s.useState({});
  if (e.length === 0)
    return /* @__PURE__ */ t(
      "div",
      {
        className: n(
          "flex items-center justify-center rounded-lg border border-dashed border-border bg-card p-10 text-center text-muted-foreground",
          l
        ),
        children: d ?? "No steps configured."
      }
    );
  const h = e[u], w = u === e.length - 1, S = (c, C) => {
    const z = { ...p, [c]: C };
    v(z), o == null || o(z), y[c] && N((M) => ({ ...M, [c]: "" }));
  }, b = () => {
    const c = Io(h, p);
    if (Object.keys(c).length > 0) {
      N(c);
      return;
    }
    w ? a == null || a(p) : g((C) => C + 1);
  }, k = () => g((c) => Math.max(0, c - 1));
  return /* @__PURE__ */ i(
    "form",
    {
      className: n("w-full max-w-2xl border border-border bg-card", l),
      style: { borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", padding: "1.75rem" },
      noValidate: !0,
      onSubmit: (c) => {
        c.preventDefault(), b();
      },
      children: [
        /* @__PURE__ */ t("ol", { className: "mb-6 flex flex-wrap items-center gap-2", "aria-label": "Progress", children: e.map((c, C) => {
          const z = C < u, M = C === u;
          return /* @__PURE__ */ i("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ t(
              "span",
              {
                "aria-current": M ? "step" : void 0,
                className: n(
                  "inline-flex h-8 w-8 items-center justify-center rounded-full border text-center font-medium",
                  z && "bg-primary text-primary-foreground border-transparent",
                  M && "border-primary text-primary",
                  !z && !M && "border-border text-muted-foreground"
                ),
                style: { fontSize: "var(--text-small)" },
                children: z ? /* @__PURE__ */ t(L, { className: "h-4 w-4", "aria-hidden": "true" }) : C + 1
              }
            ),
            /* @__PURE__ */ t(
              "span",
              {
                className: n(
                  "hidden sm:inline",
                  M ? "text-foreground" : "text-muted-foreground"
                ),
                style: { fontSize: "var(--text-small)" },
                children: c.title
              }
            ),
            C < e.length - 1 && /* @__PURE__ */ t(
              "span",
              {
                "aria-hidden": "true",
                className: "mx-1 h-px w-6",
                style: { background: C < u ? "var(--primary)" : "var(--border)" }
              }
            )
          ] }, c.id);
        }) }),
        /* @__PURE__ */ i(
          se.fieldset,
          {
            className: "m-0 border-0 p-0",
            initial: m ? !1 : { opacity: 0, x: 10 },
            animate: { opacity: 1, x: 0 },
            transition: m ? { duration: 0 } : { duration: ie.base, ease: de.entrance },
            children: [
              /* @__PURE__ */ i("legend", { className: "mb-2 w-full", children: [
                /* @__PURE__ */ i(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: "mb-1 block font-semibold uppercase text-muted-foreground",
                    style: { fontSize: "var(--text-small)", letterSpacing: "0.05em" },
                    children: [
                      "Step ",
                      u + 1,
                      " of ",
                      e.length
                    ]
                  }
                ),
                /* @__PURE__ */ t(
                  "span",
                  {
                    className: "block font-semibold text-foreground",
                    style: { fontSize: "var(--text-h3)", fontFamily: "var(--font-display)" },
                    children: h.title
                  }
                )
              ] }),
              h.description && /* @__PURE__ */ t("p", { className: "mb-4 text-muted-foreground", style: { fontSize: "var(--text-small)" }, children: h.description }),
              /* @__PURE__ */ t("div", { className: "grid gap-5", children: h.fields.map((c) => {
                const C = `fw-${h.id}-${c.name}`, z = `${C}-err`, M = `${C}-hint`, F = y[c.name], j = [c.hint ? M : null, F ? z : null].filter(Boolean).join(" ") || void 0;
                return /* @__PURE__ */ i("div", { className: "grid gap-1.5", children: [
                  c.type !== "checkbox" && /* @__PURE__ */ i(ue, { htmlFor: C, children: [
                    c.label,
                    c.required && /* @__PURE__ */ t("span", { className: "text-destructive", children: " *" })
                  ] }),
                  c.type === "text" || c.type === "number" ? /* @__PURE__ */ t(
                    ce,
                    {
                      id: C,
                      type: c.type,
                      placeholder: c.placeholder,
                      required: c.required,
                      "aria-required": c.required,
                      "aria-invalid": !!F,
                      "aria-describedby": j,
                      value: p[c.name] ?? "",
                      onChange: (x) => S(c.name, c.type === "number" ? x.target.valueAsNumber : x.target.value)
                    }
                  ) : c.type === "textarea" ? /* @__PURE__ */ t(
                    it,
                    {
                      id: C,
                      placeholder: c.placeholder,
                      required: c.required,
                      "aria-required": c.required,
                      "aria-invalid": !!F,
                      "aria-describedby": j,
                      value: p[c.name] ?? "",
                      onChange: (x) => S(c.name, x.target.value)
                    }
                  ) : c.type === "select" ? /* @__PURE__ */ i(
                    at,
                    {
                      value: p[c.name] ?? "",
                      onValueChange: (x) => S(c.name, x),
                      children: [
                        /* @__PURE__ */ t(Ie, { id: C, "aria-required": c.required, "aria-invalid": !!F, "aria-describedby": j, children: /* @__PURE__ */ t(ot, { placeholder: c.placeholder ?? "Select…" }) }),
                        /* @__PURE__ */ t(Pe, { children: (c.options ?? []).map((x) => /* @__PURE__ */ t(Fe, { value: x.value, children: x.label }, x.value)) })
                      ]
                    }
                  ) : c.type === "radio" ? /* @__PURE__ */ t(
                    et,
                    {
                      "aria-label": c.label,
                      "aria-required": c.required,
                      "aria-describedby": j,
                      value: p[c.name] ?? "",
                      onValueChange: (x) => S(c.name, x),
                      children: (c.options ?? []).map((x) => {
                        const $ = `${C}-${x.value}`;
                        return /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ t(tt, { value: x.value, id: $ }),
                          /* @__PURE__ */ t(ue, { htmlFor: $, className: "font-normal", children: x.label })
                        ] }, x.value);
                      })
                    }
                  ) : (
                    // checkbox
                    /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ t(
                        he,
                        {
                          id: C,
                          "aria-required": c.required,
                          "aria-invalid": !!F,
                          "aria-describedby": j,
                          checked: p[c.name] === !0,
                          onCheckedChange: (x) => S(c.name, x === !0)
                        }
                      ),
                      /* @__PURE__ */ i(ue, { htmlFor: C, className: "font-normal", children: [
                        c.label,
                        c.required && /* @__PURE__ */ t("span", { className: "text-destructive", children: " *" })
                      ] })
                    ] })
                  ),
                  c.hint && /* @__PURE__ */ t("p", { id: M, className: "text-muted-foreground", style: { fontSize: "var(--text-small)" }, children: c.hint }),
                  F && /* @__PURE__ */ t("p", { id: z, role: "alert", className: "text-destructive", style: { fontSize: "var(--text-small)" }, children: F })
                ] }, c.name);
              }) })
            ]
          },
          h.id
        ),
        /* @__PURE__ */ i("div", { className: "mt-6 flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ t(q, { type: "button", variant: "outline", onClick: k, disabled: u === 0, children: "Back" }),
          /* @__PURE__ */ t(q, { type: "submit", children: w ? "Submit" : "Next" })
        ] })
      ]
    }
  );
}
function Ln({
  title: e,
  description: r,
  breadcrumb: a,
  actions: o,
  actionSpecs: l,
  meta: d,
  as: m = "h1",
  divider: u = !0,
  children: g,
  className: p,
  "aria-label": v
}) {
  return /* @__PURE__ */ i("header", { className: n("w-full", p), "aria-label": v, children: [
    a && /* @__PURE__ */ t(
      "nav",
      {
        "aria-label": "Breadcrumb",
        className: "mb-2 text-muted-foreground",
        style: { fontSize: "var(--text-small)" },
        children: a
      }
    ),
    /* @__PURE__ */ i("div", { className: "flex flex-wrap items-start justify-between gap-x-4 gap-y-3", children: [
      /* @__PURE__ */ i("div", { className: "min-w-0", children: [
        /* @__PURE__ */ t(
          m,
          {
            className: "text-balance font-semibold text-foreground",
            style: { fontFamily: "var(--font-display)", fontSize: "var(--text-h2)", lineHeight: 1.15 },
            children: e
          }
        ),
        r && /* @__PURE__ */ t("p", { className: "mt-1.5 max-w-prose text-muted-foreground", style: { fontSize: "var(--text-body)" }, children: r }),
        d && /* @__PURE__ */ t(
          "div",
          {
            className: "mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-muted-foreground",
            style: { fontSize: "var(--text-small)" },
            children: d
          }
        )
      ] }),
      (o || l && l.length > 0) && /* @__PURE__ */ t("div", { className: "flex shrink-0 flex-wrap items-center gap-2", children: o ?? Ne(l) })
    ] }),
    g && /* @__PURE__ */ t("div", { className: "mt-4", children: g }),
    u && /* @__PURE__ */ t("div", { "aria-hidden": "true", className: "mt-4 h-px w-full", style: { background: "var(--border)" } })
  ] });
}
function Bn({
  search: e,
  filters: r,
  filterSpecs: a,
  activeFilters: o,
  onClearAll: l,
  resultCount: d,
  sort: m,
  actions: u,
  divider: g = !1,
  className: p,
  "aria-label": v
}) {
  const y = !!o && o.length > 0;
  return /* @__PURE__ */ i("div", { role: "search", "aria-label": v ?? "Filter", className: n("w-full", p), children: [
    /* @__PURE__ */ i("div", { className: "flex flex-wrap items-center gap-3", children: [
      e && /* @__PURE__ */ i("div", { className: "relative w-full max-w-xs", children: [
        /* @__PURE__ */ t(
          ze,
          {
            className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ t(
          ce,
          {
            value: e.value,
            onChange: (N) => e.onChange(N.target.value),
            placeholder: e.placeholder ?? "Search…",
            "aria-label": e.placeholder ?? "Search",
            className: "pl-9"
          }
        )
      ] }),
      (r || a && a.length > 0) && /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center gap-2", children: r ?? po(a) }),
      (d != null || m || u) && /* @__PURE__ */ i("div", { className: "ml-auto flex items-center gap-3", children: [
        d != null && /* @__PURE__ */ t("span", { "aria-live": "polite", className: "tabular-nums text-muted-foreground", style: { fontSize: "var(--text-small)" }, children: d }),
        m,
        u
      ] })
    ] }),
    y && /* @__PURE__ */ i("div", { className: "mt-3 flex flex-wrap items-center gap-2", children: [
      o.map((N) => /* @__PURE__ */ i(
        "span",
        {
          className: "inline-flex items-center gap-1 font-medium",
          style: {
            fontSize: "var(--text-small)",
            borderRadius: "var(--radius-sm)",
            padding: "0.25rem 0.35rem 0.25rem 0.6rem",
            background: "color-mix(in oklch, var(--muted) 60%, var(--card))",
            color: "var(--foreground)"
          },
          children: [
            N.label,
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: N.onRemove,
                "aria-label": `Remove filter${N.name ? `: ${N.name}` : ""}`,
                className: "-mr-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring outline-none",
                children: /* @__PURE__ */ t(ne, { className: "h-3 w-3", "aria-hidden": "true" })
              }
            )
          ]
        },
        N.id
      )),
      l && /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: l,
          className: "ml-1 font-medium text-muted-foreground transition-colors hover:text-foreground outline-none focus-visible:underline",
          style: { fontSize: "var(--text-small)" },
          children: "Clear all"
        }
      )
    ] }),
    g && /* @__PURE__ */ t("div", { "aria-hidden": "true", className: "mt-3 h-px w-full", style: { background: "var(--border)" } })
  ] });
}
function Hn({
  header: e,
  media: r,
  sections: a,
  aside: o,
  asideSpec: l,
  source: d,
  className: m,
  "aria-label": u
}) {
  const g = o ?? go(l);
  return /* @__PURE__ */ i("div", { className: n("w-full", m), "aria-label": u, children: [
    e,
    /* @__PURE__ */ i("div", { className: n("mt-6 grid gap-8", g && "lg:grid-cols-[minmax(0,1fr)_320px]"), children: [
      /* @__PURE__ */ i("div", { className: "min-w-0 space-y-8", children: [
        r,
        a.map((p) => /* @__PURE__ */ i("section", { "aria-label": p.title, children: [
          /* @__PURE__ */ t(
            "h2",
            {
              className: "font-semibold text-foreground",
              style: { fontFamily: "var(--font-display)", fontSize: "var(--text-h3)" },
              children: p.title
            }
          ),
          p.description && /* @__PURE__ */ t("p", { className: "mt-1 max-w-prose text-muted-foreground", style: { fontSize: "var(--text-small)" }, children: p.description }),
          p.facts && p.facts.length > 0 && /* @__PURE__ */ t("dl", { className: "mt-3 grid gap-x-8 gap-y-0 sm:grid-cols-2", children: p.facts.map((v, y) => /* @__PURE__ */ i(
            "div",
            {
              className: "flex flex-col gap-0.5 py-3",
              style: { borderTop: "1px solid color-mix(in oklch, var(--border) 70%, transparent)" },
              children: [
                /* @__PURE__ */ t("dt", { className: "text-muted-foreground", style: { fontSize: "var(--text-small)" }, children: v.label }),
                /* @__PURE__ */ t("dd", { className: "font-medium text-foreground", children: v.value ?? /* @__PURE__ */ i("span", { className: "text-muted-foreground", children: [
                  /* @__PURE__ */ t("span", { "aria-hidden": "true", children: "—" }),
                  /* @__PURE__ */ t("span", { className: "sr-only", children: "Not available" })
                ] }) })
              ]
            },
            y
          )) }),
          p.children && /* @__PURE__ */ t("div", { className: "mt-3", children: p.children })
        ] }, p.id)),
        d && /* @__PURE__ */ t(
          "p",
          {
            className: "border-t pt-4 text-muted-foreground",
            style: { fontSize: "var(--text-small)", borderColor: "var(--border)" },
            children: d
          }
        )
      ] }),
      g && /* @__PURE__ */ t("aside", { className: "h-fit lg:sticky lg:top-4", children: g })
    ] })
  ] });
}
function Vn({
  icon: e,
  iconName: r,
  title: a,
  description: o,
  action: l,
  actionSpec: d,
  size: m = "default",
  className: u
}) {
  const g = e ?? ht(r), p = l ?? (d ? Ne([d]) : null);
  return /* @__PURE__ */ i(
    "div",
    {
      role: "status",
      className: n(
        "flex flex-col items-center justify-center text-center",
        m === "default" ? "px-6 py-16" : "px-4 py-10",
        u
      ),
      children: [
        g && /* @__PURE__ */ t(
          "div",
          {
            "aria-hidden": "true",
            className: "mb-4 flex items-center justify-center [&_svg]:h-6 [&_svg]:w-6",
            style: {
              width: "3rem",
              height: "3rem",
              borderRadius: "var(--radius-lg)",
              background: "color-mix(in oklch, var(--muted) 60%, var(--card))",
              color: "var(--muted-foreground)"
            },
            children: g
          }
        ),
        /* @__PURE__ */ t("h3", { className: "font-semibold text-foreground", style: { fontFamily: "var(--font-display)", fontSize: "var(--text-h3)" }, children: a }),
        o && /* @__PURE__ */ t("p", { className: "mt-1.5 max-w-sm text-muted-foreground", style: { fontSize: "var(--text-small)", lineHeight: 1.5 }, children: o }),
        p && /* @__PURE__ */ t("div", { className: "mt-5 flex flex-wrap items-center justify-center gap-2", children: p })
      ]
    }
  );
}
function Gn({ entries: e, className: r, "aria-label": a }) {
  return /* @__PURE__ */ t("ol", { "aria-label": a ?? "Activity", className: n("relative", r), children: e.map((o, l) => {
    const d = l === e.length - 1;
    return /* @__PURE__ */ i("li", { className: n("relative flex gap-3", d ? "pb-0" : "pb-6"), children: [
      !d && /* @__PURE__ */ t(
        "span",
        {
          "aria-hidden": "true",
          className: "absolute bottom-0 top-8 w-px",
          style: { left: "15.5px", background: "var(--border)" }
        }
      ),
      /* @__PURE__ */ t(
        "span",
        {
          "aria-hidden": "true",
          className: "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center [&_svg]:h-4 [&_svg]:w-4",
          style: {
            borderRadius: "var(--radius-full, 9999px)",
            background: "color-mix(in oklch, var(--muted) 60%, var(--card))",
            color: "var(--muted-foreground)",
            border: "1px solid var(--border)"
          },
          children: o.icon ?? /* @__PURE__ */ t("span", { style: { height: "0.5rem", width: "0.5rem", borderRadius: "9999px", background: "var(--muted-foreground)" } })
        }
      ),
      /* @__PURE__ */ i("div", { className: "min-w-0 flex-1 pt-1", children: [
        /* @__PURE__ */ i("div", { className: "flex flex-wrap items-baseline gap-x-2", children: [
          /* @__PURE__ */ t("p", { className: "font-medium text-foreground", style: { fontSize: "var(--text-small)" }, children: o.title }),
          o.timestamp != null && /* @__PURE__ */ t("time", { className: "text-muted-foreground", style: { fontSize: "var(--text-small)" }, children: o.timestamp })
        ] }),
        o.description && /* @__PURE__ */ t("p", { className: "mt-0.5 text-muted-foreground", style: { fontSize: "var(--text-small)", lineHeight: 1.5 }, children: o.description })
      ] })
    ] }, o.id);
  }) });
}
function qn({
  onFiles: e,
  files: r,
  onRemove: a,
  accept: o,
  multiple: l = !0,
  hint: d,
  disabled: m,
  className: u,
  "aria-label": g
}) {
  const p = s.useRef(null), [v, y] = s.useState(!1), N = (h) => {
    h && h.length && e && e(Array.from(h));
  };
  return /* @__PURE__ */ i("div", { className: n("w-full", u), children: [
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        onClick: () => {
          var h;
          return (h = p.current) == null ? void 0 : h.click();
        },
        onDragOver: (h) => {
          h.preventDefault(), m || y(!0);
        },
        onDragLeave: () => y(!1),
        onDrop: (h) => {
          h.preventDefault(), y(!1), m || N(h.dataTransfer.files);
        },
        disabled: m,
        "aria-label": g ?? "Upload files",
        className: "flex w-full flex-col items-center justify-center gap-2 px-6 py-10 text-center outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        style: {
          borderRadius: "var(--radius-lg)",
          border: `1.5px dashed ${v ? "var(--ring)" : "var(--border)"}`,
          background: v ? "color-mix(in oklch, var(--primary) 6%, var(--background))" : "var(--background)",
          cursor: "pointer"
        },
        children: [
          /* @__PURE__ */ t(
            "span",
            {
              "aria-hidden": "true",
              className: "flex h-11 w-11 items-center justify-center rounded-full [&_svg]:h-5 [&_svg]:w-5",
              style: { background: "color-mix(in oklch, var(--muted) 60%, var(--card))", color: "var(--muted-foreground)" },
              children: /* @__PURE__ */ t(It, {})
            }
          ),
          /* @__PURE__ */ i("span", { className: "font-medium text-foreground", style: { fontSize: "var(--text-small)" }, children: [
            /* @__PURE__ */ t("span", { style: { color: "var(--primary)" }, children: "Click to upload" }),
            " or drag and drop"
          ] }),
          d && /* @__PURE__ */ t("span", { className: "text-muted-foreground", style: { fontSize: "var(--text-small)" }, children: d })
        ]
      }
    ),
    /* @__PURE__ */ t(
      "input",
      {
        ref: p,
        type: "file",
        accept: o,
        multiple: l,
        className: "sr-only",
        tabIndex: -1,
        onChange: (h) => N(h.target.files)
      }
    ),
    r && r.length > 0 && /* @__PURE__ */ t("ul", { className: "mt-3 flex flex-col gap-2", children: r.map((h) => /* @__PURE__ */ i(
      "li",
      {
        className: "flex items-center gap-3 px-3 py-2",
        style: { borderRadius: "var(--radius-md)", border: "1px solid var(--border)", background: "var(--card)" },
        children: [
          /* @__PURE__ */ t(
            "span",
            {
              "aria-hidden": "true",
              className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-md [&_svg]:h-4 [&_svg]:w-4",
              style: { background: "color-mix(in oklch, var(--muted) 60%, var(--card))", color: "var(--muted-foreground)" },
              children: /* @__PURE__ */ t(Pt, {})
            }
          ),
          /* @__PURE__ */ i("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ i("div", { className: "flex items-baseline justify-between gap-2", children: [
              /* @__PURE__ */ t("p", { className: "truncate font-medium text-foreground", style: { fontSize: "var(--text-small)" }, children: h.name }),
              h.size && /* @__PURE__ */ t("span", { className: "shrink-0 text-muted-foreground", style: { fontSize: "var(--text-small)" }, children: h.size })
            ] }),
            typeof h.progress == "number" && h.progress < 100 && /* @__PURE__ */ t(
              "div",
              {
                className: "mt-1.5 h-1.5 w-full overflow-hidden rounded-full",
                role: "progressbar",
                "aria-valuenow": h.progress,
                "aria-valuemin": 0,
                "aria-valuemax": 100,
                "aria-label": `Uploading ${h.name}`,
                style: { background: "var(--secondary)" },
                children: /* @__PURE__ */ t("div", { className: "h-full rounded-full transition-[width]", style: { width: `${h.progress}%`, background: "var(--primary)" } })
              }
            )
          ] }),
          a && /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => a(h.id),
              "aria-label": `Remove ${h.name}`,
              className: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
              children: /* @__PURE__ */ t(ne, { className: "h-4 w-4", "aria-hidden": "true" })
            }
          )
        ]
      },
      h.id
    )) })
  ] });
}
function Kn({ sections: e, className: r, "aria-label": a }) {
  return /* @__PURE__ */ t("div", { className: n("flex w-full flex-col gap-10", r), "aria-label": a, children: e.map((o) => /* @__PURE__ */ i("section", { "aria-label": o.title, children: [
    /* @__PURE__ */ t(
      "h2",
      {
        className: "font-semibold text-foreground",
        style: { fontFamily: "var(--font-display)", fontSize: "var(--text-h3)" },
        children: o.title
      }
    ),
    o.description && /* @__PURE__ */ t("p", { className: "mt-1 max-w-prose text-muted-foreground", style: { fontSize: "var(--text-small)" }, children: o.description }),
    /* @__PURE__ */ t("div", { className: "mt-4 flex flex-col", children: o.rows.map((l, d) => /* @__PURE__ */ i(
      "div",
      {
        className: n(
          "gap-4 py-4",
          l.stacked ? "flex flex-col" : "flex flex-wrap items-center justify-between"
        ),
        style: d > 0 ? { borderTop: "1px solid color-mix(in oklch, var(--border) 70%, transparent)" } : void 0,
        children: [
          /* @__PURE__ */ i("div", { className: "min-w-0 max-w-prose", children: [
            /* @__PURE__ */ t("div", { className: "font-medium text-foreground", style: { fontSize: "var(--text-small)" }, children: l.label }),
            l.description && /* @__PURE__ */ t("p", { className: "mt-0.5 text-muted-foreground", style: { fontSize: "var(--text-small)", lineHeight: 1.45 }, children: l.description })
          ] }),
          /* @__PURE__ */ t("div", { className: n("shrink-0", l.stacked && "w-full max-w-sm"), children: l.control })
        ]
      },
      l.id
    )) })
  ] }, o.id)) });
}
const Po = [
  { name: "DataTable", replaces: "a hand-rolled <table> of data rows" },
  { name: "ComparisonTable", replaces: "a hand-rolled comparison matrix (multi-column <table>)" },
  { name: "StatDashboard", replaces: "a hand-rolled KPI / stat-card grid" },
  { name: "Board", replaces: "a hand-rolled kanban / pipeline column layout" },
  { name: "CardCollection", replaces: "a hand-rolled grid/list of many repeated cards" },
  { name: "FormWizard", replaces: "a hand-rolled multi-step form" },
  { name: "Timeline", replaces: "a hand-rolled vertical activity / history feed" },
  { name: "DetailView", replaces: "a hand-rolled label/value fact-section layout" },
  { name: "SettingsPanel", replaces: "a hand-rolled settings-rows layout" }
], Un = Po.map((e) => e.name);
export {
  Yo as Accordion,
  Wt as AccordionContent,
  Kt as AccordionItem,
  Ut as AccordionTrigger,
  Xt as Alert,
  Jt as AlertDescription,
  Xo as AlertDialog,
  nr as AlertDialogAction,
  lr as AlertDialogCancel,
  er as AlertDialogContent,
  or as AlertDialogDescription,
  rr as AlertDialogFooter,
  tr as AlertDialogHeader,
  We as AlertDialogOverlay,
  Qt as AlertDialogPortal,
  ar as AlertDialogTitle,
  Zo as AlertDialogTrigger,
  Zt as AlertTitle,
  sr as Avatar,
  dr as AvatarFallback,
  ir as AvatarImage,
  Ye as Badge,
  En as Board,
  mr as Breadcrumb,
  br as BreadcrumbEllipsis,
  fr as BreadcrumbItem,
  pr as BreadcrumbLink,
  ur as BreadcrumbList,
  gr as BreadcrumbPage,
  hr as BreadcrumbSeparator,
  q as Button,
  Xn as COLOR_TOKENS,
  vr as Calendar,
  oe as Card,
  $n as CardCollection,
  wr as CardContent,
  Nr as CardDescription,
  Sr as CardFooter,
  xr as CardHeader,
  yr as CardTitle,
  he as Checkbox,
  Je as Command,
  en as CommandDialog,
  Ir as CommandEmpty,
  Pr as CommandGroup,
  Mr as CommandInput,
  _r as CommandItem,
  Ar as CommandList,
  Fr as CommandSeparator,
  $r as CommandShortcut,
  _n as ComparisonTable,
  tn as ContextMenu,
  Br as ContextMenuCheckboxItem,
  Or as ContextMenuContent,
  an as ContextMenuGroup,
  Lr as ContextMenuItem,
  Vr as ContextMenuLabel,
  on as ContextMenuPortal,
  ln as ContextMenuRadioGroup,
  Hr as ContextMenuRadioItem,
  Gr as ContextMenuSeparator,
  nn as ContextMenuSub,
  Er as ContextMenuSubContent,
  jr as ContextMenuSubTrigger,
  rn as ContextMenuTrigger,
  Zn as DENSITY_TOKENS,
  ie as DURATION,
  Fn as DataTable,
  Hn as DetailView,
  kr as Dialog,
  Qo as DialogClose,
  Ze as DialogContent,
  Dr as DialogDescription,
  Tr as DialogFooter,
  Rr as DialogHeader,
  Xe as DialogOverlay,
  Cr as DialogPortal,
  zr as DialogTitle,
  Jo as DialogTrigger,
  qr as Drawer,
  dn as DrawerClose,
  Ur as DrawerContent,
  Zr as DrawerDescription,
  Yr as DrawerFooter,
  Wr as DrawerHeader,
  Qe as DrawerOverlay,
  Kr as DrawerPortal,
  Xr as DrawerTitle,
  sn as DrawerTrigger,
  cn as DropdownMenu,
  ra as DropdownMenuCheckboxItem,
  ea as DropdownMenuContent,
  un as DropdownMenuGroup,
  ta as DropdownMenuItem,
  oa as DropdownMenuLabel,
  fn as DropdownMenuPortal,
  gn as DropdownMenuRadioGroup,
  aa as DropdownMenuRadioItem,
  na as DropdownMenuSeparator,
  la as DropdownMenuShortcut,
  pn as DropdownMenuSub,
  Qr as DropdownMenuSubContent,
  Jr as DropdownMenuSubTrigger,
  mn as DropdownMenuTrigger,
  de as EASE,
  Vn as EmptyState,
  Jn as FONT_TOKENS,
  qn as FileUpload,
  Bn as FilterBar,
  On as FormWizard,
  Po as HEAVY_COMPONENTS,
  Un as HEAVY_COMPONENT_NAMES,
  hn as HoverCard,
  sa as HoverCardContent,
  bn as HoverCardTrigger,
  ce as Input,
  ue as Label,
  Qn as MOTION_TOKENS,
  da as Menubar,
  ga as MenubarCheckboxItem,
  fa as MenubarContent,
  xn as MenubarGroup,
  pa as MenubarItem,
  ba as MenubarLabel,
  vn as MenubarMenu,
  ia as MenubarPortal,
  Nn as MenubarRadioGroup,
  ha as MenubarRadioItem,
  va as MenubarSeparator,
  yn as MenubarSub,
  ua as MenubarSubContent,
  ma as MenubarSubTrigger,
  ca as MenubarTrigger,
  Ln as PageHeader,
  xa as Pagination,
  ya as PaginationContent,
  ka as PaginationEllipsis,
  Na as PaginationItem,
  Ae as PaginationLink,
  Sa as PaginationNext,
  wa as PaginationPrevious,
  wn as Popover,
  kn as PopoverAnchor,
  Ca as PopoverContent,
  Sn as PopoverTrigger,
  Ra as Progress,
  el as RADIUS_TOKENS,
  et as RadioGroup,
  tt as RadioGroupItem,
  tl as SHADOW_TOKENS,
  rl as SPACING_TOKENS,
  al as SURFACE_TOKENS,
  Ta as ScrollArea,
  rt as ScrollBar,
  at as Select,
  Pe as SelectContent,
  Cn as SelectGroup,
  Fe as SelectItem,
  za as SelectLabel,
  lt as SelectScrollDownButton,
  nt as SelectScrollUpButton,
  Da as SelectSeparator,
  Ie as SelectTrigger,
  ot as SelectValue,
  Ma as Separator,
  Kn as SettingsPanel,
  Rn as Sheet,
  zn as SheetClose,
  Pa as SheetContent,
  ja as SheetDescription,
  _a as SheetFooter,
  Fa as SheetHeader,
  st as SheetOverlay,
  Aa as SheetPortal,
  $a as SheetTitle,
  Tn as SheetTrigger,
  Ea as Slider,
  jn as StatDashboard,
  Oa as Switch,
  xt as TOKEN_FAMILIES,
  ol as TOKEN_NAMES,
  nl as TYPE_TOKENS,
  La as Table,
  Ha as TableBody,
  Ua as TableCaption,
  Ka as TableCell,
  Va as TableFooter,
  qa as TableHead,
  Ba as TableHeader,
  Ga as TableRow,
  Dn as Tabs,
  Xa as TabsContent,
  Wa as TabsList,
  Ya as TabsTrigger,
  it as Textarea,
  Gn as Timeline,
  ut as Toast,
  ro as ToastAction,
  ft as ToastClose,
  gt as ToastDescription,
  eo as ToastProvider,
  pt as ToastTitle,
  mt as ToastViewport,
  Mn as Toaster,
  Za as Toggle,
  Ja as ToggleGroup,
  Qa as ToggleGroupItem,
  Wo as TokenPalette,
  Ue as TokenSwatch,
  In as Tooltip,
  co as TooltipContent,
  An as TooltipProvider,
  Pn as TooltipTrigger,
  cr as badgeVariants,
  fo as buildColumnsFromSpec,
  G as buttonVariants,
  n as cn,
  lo as reducer,
  Ne as renderActionSpecs,
  go as renderAsideSpec,
  bt as renderCardSpec,
  po as renderFilterSpecs,
  ht as resolveIcon,
  so as toast,
  dt as toggleVariants,
  ll as tokenVar,
  io as useToast,
  Uo as useTokenColors
};
//# sourceMappingURL=index.js.map
