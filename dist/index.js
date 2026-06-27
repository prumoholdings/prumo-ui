import { TOKEN_FAMILIES as Ve } from "./tokens.js";
import { COLOR_TOKENS as Oo, DENSITY_TOKENS as Eo, FONT_TOKENS as $o, MOTION_TOKENS as Ho, RADIUS_TOKENS as Vo, SHADOW_TOKENS as qo, SPACING_TOKENS as Uo, SURFACE_TOKENS as Ko, TOKEN_NAMES as Wo, TYPE_TOKENS as Yo, tokenVar as Xo } from "./tokens.js";
import { clsx as qe } from "clsx";
import { twMerge as Ue } from "tailwind-merge";
import * as s from "react";
import { jsx as r, jsxs as l } from "react/jsx-runtime";
import * as H from "@radix-ui/react-accordion";
import { ChevronDown as ne, MoreHorizontal as be, ChevronRight as B, ChevronLeft as he, Check as _, X as ye, Search as xe, Circle as J, ChevronUp as Ke, ArrowUp as We, ArrowDown as Ye, ChevronsUpDown as Xe, Minus as Je, ArrowUpRight as Qe, ArrowDownRight as Ze } from "lucide-react";
import { cva as K } from "class-variance-authority";
import * as z from "@radix-ui/react-alert-dialog";
import { Slot as ve } from "@radix-ui/react-slot";
import * as se from "@radix-ui/react-avatar";
import { useReducedMotion as G, motion as j } from "framer-motion";
import { DayPicker as et } from "react-day-picker";
import * as me from "@radix-ui/react-checkbox";
import { Command as F } from "cmdk";
import * as y from "@radix-ui/react-dialog";
import * as v from "@radix-ui/react-context-menu";
import { useReactTable as tt, getPaginationRowModel as rt, getFilteredRowModel as at, getSortedRowModel as ot, getCoreRowModel as nt, flexRender as te } from "@tanstack/react-table";
import { Drawer as P } from "vaul";
import * as N from "@radix-ui/react-dropdown-menu";
import * as st from "@radix-ui/react-label";
import * as re from "@radix-ui/react-radio-group";
import * as C from "@radix-ui/react-select";
import * as X from "@radix-ui/react-hover-card";
import * as w from "@radix-ui/react-menubar";
import * as V from "@radix-ui/react-popover";
import * as ue from "@radix-ui/react-progress";
import * as $ from "@radix-ui/react-scroll-area";
import * as it from "@radix-ui/react-separator";
import * as W from "@radix-ui/react-slider";
import { AreaChart as lt, BarChart as dt, LineChart as ct, DonutChart as mt } from "@tremor/react";
import * as pe from "@radix-ui/react-switch";
import * as Q from "@radix-ui/react-tabs";
import * as ut from "@radix-ui/react-toggle";
import * as Ne from "@radix-ui/react-toggle-group";
import * as q from "@radix-ui/react-tooltip";
function n(...e) {
  return Ue(qe(e));
}
function pt(e) {
  const t = s.useRef(null), [a, o] = s.useState(
    () => e.map((i) => `var(--${i})`)
  );
  return s.useEffect(() => {
    const i = t.current;
    if (!i || typeof window > "u") return;
    const d = getComputedStyle(i), m = e.map((u) => d.getPropertyValue(`--${u}`).trim() || `var(--${u})`);
    o(m);
  }, [e.join(",")]), [t, a];
}
const we = s.forwardRef(
  ({ token: e, label: t, className: a, style: o, ...i }, d) => /* @__PURE__ */ l(
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
      ...i,
      children: [
        /* @__PURE__ */ r(
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
        /* @__PURE__ */ r("span", { style: { fontSize: "var(--text-small)" }, children: t ?? e })
      ]
    }
  )
);
we.displayName = "TokenSwatch";
function Ka({ family: e = "color" }) {
  const t = Ve[e];
  return /* @__PURE__ */ r(
    "div",
    {
      className: "container",
      style: { display: "flex", flexWrap: "wrap", gap: "var(--density-gap)" },
      children: t.map((a) => /* @__PURE__ */ r(we, { token: a }, a))
    }
  );
}
const Wa = H.Root, ft = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ r(
  H.Item,
  {
    ref: a,
    className: n("border-b border-border", e),
    ...t
  }
));
ft.displayName = "AccordionItem";
const gt = s.forwardRef(({ className: e, children: t, ...a }, o) => /* @__PURE__ */ r(H.Header, { className: "flex", children: /* @__PURE__ */ l(
  H.Trigger,
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
      t,
      /* @__PURE__ */ r(
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
gt.displayName = "AccordionTrigger";
const bt = s.forwardRef(({ className: e, children: t, ...a }, o) => /* @__PURE__ */ r(
  H.Content,
  {
    ref: o,
    className: "overflow-hidden text-muted-foreground data-[state=closed]:animate-none",
    style: { fontSize: "var(--text-small)" },
    ...a,
    children: /* @__PURE__ */ r("div", { className: n("pb-4 pt-0", e), children: t })
  }
));
bt.displayName = "AccordionContent";
const ht = K(
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
), yt = s.forwardRef(({ className: e, variant: t, ...a }, o) => /* @__PURE__ */ r(
  "div",
  {
    ref: o,
    role: "alert",
    className: n(ht({ variant: t }), e),
    ...a
  }
));
yt.displayName = "Alert";
const xt = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ r(
  "h5",
  {
    ref: a,
    className: n("mb-1 font-medium leading-none tracking-tight", e),
    style: { fontSize: "var(--text-body)" },
    ...t
  }
));
xt.displayName = "AlertTitle";
const vt = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ r(
  "div",
  {
    ref: a,
    className: n("[&_p]:leading-relaxed text-muted-foreground", e),
    style: { fontSize: "var(--text-small)" },
    ...t
  }
));
vt.displayName = "AlertDescription";
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
  ({ className: e, variant: t, size: a, asChild: o = !1, style: i, ...d }, m) => /* @__PURE__ */ r(
    o ? ve : "button",
    {
      ref: m,
      className: n(A({ variant: t, size: a }), e),
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
const Ya = z.Root, Xa = z.Trigger, Nt = z.Portal, Se = s.forwardRef(({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
  z.Overlay,
  {
    ref: o,
    className: n(
      "fixed inset-0 z-50 bg-foreground/40",
      "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
      e
    ),
    style: { transition: "opacity var(--duration-base) var(--ease-standard)", ...t },
    ...a
  }
));
Se.displayName = "AlertDialogOverlay";
const wt = s.forwardRef(({ className: e, style: t, ...a }, o) => /* @__PURE__ */ l(Nt, { children: [
  /* @__PURE__ */ r(Se, {}),
  /* @__PURE__ */ r(
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
      ...a
    }
  )
] }));
wt.displayName = "AlertDialogContent";
const St = ({ className: e, ...t }) => /* @__PURE__ */ r("div", { className: n("flex flex-col space-y-2 text-center sm:text-left", e), ...t });
St.displayName = "AlertDialogHeader";
const Ct = ({ className: e, ...t }) => /* @__PURE__ */ r(
  "div",
  {
    className: n("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", e),
    ...t
  }
);
Ct.displayName = "AlertDialogFooter";
const Rt = s.forwardRef(({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
  z.Title,
  {
    ref: o,
    className: n("font-semibold", e),
    style: { fontSize: "var(--text-h3)", fontFamily: "var(--font-display)", ...t },
    ...a
  }
));
Rt.displayName = "AlertDialogTitle";
const Tt = s.forwardRef(({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
  z.Description,
  {
    ref: o,
    className: n("text-muted-foreground", e),
    style: { fontSize: "var(--text-small)", ...t },
    ...a
  }
));
Tt.displayName = "AlertDialogDescription";
const kt = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ r(z.Action, { ref: a, className: n(A(), e), ...t }));
kt.displayName = "AlertDialogAction";
const Dt = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ r(
  z.Cancel,
  {
    ref: a,
    className: n(A({ variant: "outline" }), "mt-2 sm:mt-0", e),
    ...t
  }
));
Dt.displayName = "AlertDialogCancel";
const Mt = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ r(
  se.Root,
  {
    ref: a,
    className: n("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", e),
    ...t
  }
));
Mt.displayName = "Avatar";
const zt = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ r(se.Image, { ref: a, className: n("aspect-square h-full w-full", e), ...t }));
zt.displayName = "AvatarImage";
const It = s.forwardRef(({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
  se.Fallback,
  {
    ref: o,
    className: n(
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground",
      e
    ),
    style: { fontSize: "var(--text-small)", ...t },
    ...a
  }
));
It.displayName = "AvatarFallback";
const Pt = K(
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
function At({ className: e, variant: t, style: a, ...o }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: n(Pt({ variant: t }), e),
      style: { fontSize: "var(--text-small)", ...a },
      ...o
    }
  );
}
const _t = s.forwardRef(({ ...e }, t) => /* @__PURE__ */ r("nav", { ref: t, "aria-label": "breadcrumb", ...e }));
_t.displayName = "Breadcrumb";
const jt = s.forwardRef(
  ({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
    "ol",
    {
      ref: o,
      className: n(
        "flex flex-wrap items-center gap-1.5 break-words text-muted-foreground sm:gap-2.5",
        e
      ),
      style: { fontSize: "var(--text-small)", ...t },
      ...a
    }
  )
);
jt.displayName = "BreadcrumbList";
const Ft = s.forwardRef(
  ({ className: e, ...t }, a) => /* @__PURE__ */ r("li", { ref: a, className: n("inline-flex items-center gap-1.5", e), ...t })
);
Ft.displayName = "BreadcrumbItem";
const Bt = s.forwardRef(({ asChild: e, className: t, ...a }, o) => /* @__PURE__ */ r(
  e ? ve : "a",
  {
    ref: o,
    className: n("transition-colors hover:text-foreground", t),
    style: { transitionDuration: "var(--duration-fast)" },
    ...a
  }
));
Bt.displayName = "BreadcrumbLink";
const Gt = s.forwardRef(
  ({ className: e, ...t }, a) => /* @__PURE__ */ r(
    "span",
    {
      ref: a,
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      className: n("font-normal text-foreground", e),
      ...t
    }
  )
);
Gt.displayName = "BreadcrumbPage";
const Lt = ({ children: e, className: t, ...a }) => /* @__PURE__ */ r("li", { role: "presentation", "aria-hidden": "true", className: n("[&>svg]:size-3.5", t), ...a, children: e ?? /* @__PURE__ */ r(B, {}) });
Lt.displayName = "BreadcrumbSeparator";
const Ot = ({ className: e, ...t }) => /* @__PURE__ */ l(
  "span",
  {
    role: "presentation",
    "aria-hidden": "true",
    className: n("flex h-9 w-9 items-center justify-center", e),
    ...t,
    children: [
      /* @__PURE__ */ r(be, { className: "h-4 w-4" }),
      /* @__PURE__ */ r("span", { className: "sr-only", children: "More" })
    ]
  }
);
Ot.displayName = "BreadcrumbEllipsis";
function Et({ className: e, classNames: t, showOutsideDays: a = !0, ...o }) {
  return /* @__PURE__ */ r(
    et,
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
        Chevron: ({ orientation: i, ...d }) => i === "left" ? /* @__PURE__ */ r(he, { className: "h-4 w-4", ...d }) : /* @__PURE__ */ r(B, { className: "h-4 w-4", ...d })
      },
      ...o
    }
  );
}
Et.displayName = "Calendar";
const ae = s.forwardRef(
  ({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: n("rounded-xl border border-border bg-card text-card-foreground", e),
      style: { boxShadow: "var(--shadow-sm)", ...t },
      ...a
    }
  )
);
ae.displayName = "Card";
const Ce = s.forwardRef(
  ({ className: e, ...t }, a) => /* @__PURE__ */ r("div", { ref: a, className: n("flex flex-col space-y-1.5 p-6", e), ...t })
);
Ce.displayName = "CardHeader";
const Re = s.forwardRef(
  ({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: n("font-semibold leading-none tracking-tight", e),
      style: { fontSize: "var(--text-h3)", fontFamily: "var(--font-display)", ...t },
      ...a
    }
  )
);
Re.displayName = "CardTitle";
const $t = s.forwardRef(
  ({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: n("text-muted-foreground", e),
      style: { fontSize: "var(--text-small)", ...t },
      ...a
    }
  )
);
$t.displayName = "CardDescription";
const oe = s.forwardRef(
  ({ className: e, ...t }, a) => /* @__PURE__ */ r("div", { ref: a, className: n("p-6 pt-0", e), ...t })
);
oe.displayName = "CardContent";
const Ht = s.forwardRef(
  ({ className: e, ...t }, a) => /* @__PURE__ */ r("div", { ref: a, className: n("flex items-center p-6 pt-0", e), ...t })
);
Ht.displayName = "CardFooter";
const Te = s.forwardRef(({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
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
    ...a,
    children: /* @__PURE__ */ r(me.Indicator, { className: "flex items-center justify-center text-current", children: /* @__PURE__ */ r(_, { className: "h-4 w-4", "aria-hidden": "true" }) })
  }
));
Te.displayName = "Checkbox";
const Vt = y.Root, Ja = y.Trigger, qt = y.Portal, Qa = y.Close, ke = s.forwardRef(({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
  y.Overlay,
  {
    ref: o,
    className: n(
      "fixed inset-0 z-50 bg-foreground/40",
      "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
      e
    ),
    style: { transition: "opacity var(--duration-base) var(--ease-standard)", ...t },
    ...a
  }
));
ke.displayName = "DialogOverlay";
const De = s.forwardRef(({ className: e, children: t, style: a, ...o }, i) => /* @__PURE__ */ l(qt, { children: [
  /* @__PURE__ */ r(ke, {}),
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
        ...a
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
              /* @__PURE__ */ r(ye, { className: "h-4 w-4", "aria-hidden": "true" }),
              /* @__PURE__ */ r("span", { className: "sr-only", children: "Close" })
            ]
          }
        )
      ]
    }
  )
] }));
De.displayName = "DialogContent";
const Ut = ({ className: e, ...t }) => /* @__PURE__ */ r("div", { className: n("flex flex-col space-y-1.5 text-center sm:text-left", e), ...t });
Ut.displayName = "DialogHeader";
const Kt = ({ className: e, ...t }) => /* @__PURE__ */ r(
  "div",
  {
    className: n("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", e),
    ...t
  }
);
Kt.displayName = "DialogFooter";
const Wt = s.forwardRef(({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
  y.Title,
  {
    ref: o,
    className: n("font-semibold leading-none tracking-tight", e),
    style: { fontSize: "var(--text-h3)", fontFamily: "var(--font-display)", ...t },
    ...a
  }
));
Wt.displayName = "DialogTitle";
const Yt = s.forwardRef(({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
  y.Description,
  {
    ref: o,
    className: n("text-muted-foreground", e),
    style: { fontSize: "var(--text-small)", ...t },
    ...a
  }
));
Yt.displayName = "DialogDescription";
const Me = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ r(
  F,
  {
    ref: a,
    className: n(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      e
    ),
    ...t
  }
));
Me.displayName = "Command";
const Za = ({ children: e, ...t }) => /* @__PURE__ */ r(Vt, { ...t, children: /* @__PURE__ */ r(De, { className: "overflow-hidden p-0", children: /* @__PURE__ */ r(Me, { className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5", children: e }) }) }), Xt = s.forwardRef(({ className: e, style: t, ...a }, o) => /* @__PURE__ */ l("div", { className: "flex items-center border-b border-border px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ r(xe, { className: "mr-2 h-4 w-4 shrink-0 opacity-50", "aria-hidden": "true" }),
  /* @__PURE__ */ r(
    F.Input,
    {
      ref: o,
      className: n(
        "flex h-11 w-full rounded-md bg-transparent py-3 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        e
      ),
      style: { fontSize: "var(--text-body)", ...t },
      ...a
    }
  )
] }));
Xt.displayName = "CommandInput";
const Jt = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ r(
  F.List,
  {
    ref: a,
    className: n("max-h-80 overflow-y-auto overflow-x-hidden", e),
    ...t
  }
));
Jt.displayName = "CommandList";
const Qt = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ r(
  F.Empty,
  {
    ref: a,
    className: n("py-6 text-center text-muted-foreground", e),
    style: { fontSize: "var(--text-small)" },
    ...t
  }
));
Qt.displayName = "CommandEmpty";
const Zt = s.forwardRef(({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
  F.Group,
  {
    ref: o,
    className: n(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      e
    ),
    style: { fontSize: "var(--text-small)", ...t },
    ...a
  }
));
Zt.displayName = "CommandGroup";
const er = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ r(F.Separator, { ref: a, className: n("-mx-1 h-px bg-border", e), ...t }));
er.displayName = "CommandSeparator";
const tr = s.forwardRef(({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
  F.Item,
  {
    ref: o,
    className: n(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 outline-none min-h-[36px]",
      "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      e
    ),
    style: { fontSize: "var(--text-small)", ...t },
    ...a
  }
));
tr.displayName = "CommandItem";
const rr = ({ className: e, ...t }) => /* @__PURE__ */ r("span", { className: n("ml-auto tracking-widest text-muted-foreground", e), ...t });
rr.displayName = "CommandShortcut";
const eo = v.Root, to = v.Trigger, ro = v.Group, ao = v.Portal, oo = v.Sub, no = v.RadioGroup, Z = "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 outline-none min-h-[36px] focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", ar = s.forwardRef(({ className: e, inset: t, children: a, style: o, ...i }, d) => /* @__PURE__ */ l(
  v.SubTrigger,
  {
    ref: d,
    className: n(Z, "data-[state=open]:bg-accent", t && "pl-8", e),
    style: { fontSize: "var(--text-small)", ...o },
    ...i,
    children: [
      a,
      /* @__PURE__ */ r(B, { className: "ml-auto h-4 w-4", "aria-hidden": "true" })
    ]
  }
));
ar.displayName = "ContextMenuSubTrigger";
const or = s.forwardRef(({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
  v.SubContent,
  {
    ref: o,
    className: n(
      "z-50 min-w-32 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground",
      e
    ),
    style: { boxShadow: "var(--shadow-md)", ...t },
    ...a
  }
));
or.displayName = "ContextMenuSubContent";
const nr = s.forwardRef(({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(v.Portal, { children: /* @__PURE__ */ r(
  v.Content,
  {
    ref: o,
    className: n(
      "z-50 min-w-32 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground",
      e
    ),
    style: { boxShadow: "var(--shadow-md)", ...t },
    ...a
  }
) }));
nr.displayName = "ContextMenuContent";
const sr = s.forwardRef(({ className: e, inset: t, style: a, ...o }, i) => /* @__PURE__ */ r(
  v.Item,
  {
    ref: i,
    className: n(Z, t && "pl-8", e),
    style: { fontSize: "var(--text-small)", ...a },
    ...o
  }
));
sr.displayName = "ContextMenuItem";
const ir = s.forwardRef(({ className: e, children: t, checked: a, style: o, ...i }, d) => /* @__PURE__ */ l(
  v.CheckboxItem,
  {
    ref: d,
    className: n(Z, "pl-8", e),
    checked: a,
    style: { fontSize: "var(--text-small)", ...o },
    ...i,
    children: [
      /* @__PURE__ */ r("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ r(v.ItemIndicator, { children: /* @__PURE__ */ r(_, { className: "h-4 w-4", "aria-hidden": "true" }) }) }),
      t
    ]
  }
));
ir.displayName = "ContextMenuCheckboxItem";
const lr = s.forwardRef(({ className: e, children: t, style: a, ...o }, i) => /* @__PURE__ */ l(
  v.RadioItem,
  {
    ref: i,
    className: n(Z, "pl-8", e),
    style: { fontSize: "var(--text-small)", ...a },
    ...o,
    children: [
      /* @__PURE__ */ r("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ r(v.ItemIndicator, { children: /* @__PURE__ */ r(J, { className: "h-2 w-2 fill-current", "aria-hidden": "true" }) }) }),
      t
    ]
  }
));
lr.displayName = "ContextMenuRadioItem";
const dr = s.forwardRef(({ className: e, inset: t, style: a, ...o }, i) => /* @__PURE__ */ r(
  v.Label,
  {
    ref: i,
    className: n("px-2 py-1.5 font-semibold text-muted-foreground", t && "pl-8", e),
    style: { fontSize: "var(--text-small)", ...a },
    ...o
  }
));
dr.displayName = "ContextMenuLabel";
const cr = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ r(
  v.Separator,
  {
    ref: a,
    className: n("-mx-1 my-1 h-px bg-border", e),
    ...t
  }
));
cr.displayName = "ContextMenuSeparator";
const mr = ({
  shouldScaleBackground: e = !0,
  ...t
}) => /* @__PURE__ */ r(P.Root, { shouldScaleBackground: e, ...t });
mr.displayName = "Drawer";
const so = P.Trigger, ur = P.Portal, io = P.Close, ze = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ r(
  P.Overlay,
  {
    ref: a,
    className: n("fixed inset-0 z-50 bg-foreground/40", e),
    ...t
  }
));
ze.displayName = "DrawerOverlay";
const pr = s.forwardRef(({ className: e, children: t, style: a, ...o }, i) => /* @__PURE__ */ l(ur, { children: [
  /* @__PURE__ */ r(ze, {}),
  /* @__PURE__ */ l(
    P.Content,
    {
      ref: i,
      className: n(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-xl",
        "border-t border-border bg-popover text-popover-foreground",
        e
      ),
      style: { boxShadow: "var(--shadow-lg)", ...a },
      ...o,
      children: [
        /* @__PURE__ */ r("div", { className: "mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted", "aria-hidden": "true" }),
        t
      ]
    }
  )
] }));
pr.displayName = "DrawerContent";
const fr = ({ className: e, ...t }) => /* @__PURE__ */ r("div", { className: n("grid gap-1.5 p-4 text-center sm:text-left", e), ...t });
fr.displayName = "DrawerHeader";
const gr = ({ className: e, ...t }) => /* @__PURE__ */ r("div", { className: n("mt-auto flex flex-col gap-2 p-4", e), ...t });
gr.displayName = "DrawerFooter";
const br = s.forwardRef(({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
  P.Title,
  {
    ref: o,
    className: n("font-semibold leading-none tracking-tight", e),
    style: { fontSize: "var(--text-h3)", fontFamily: "var(--font-display)", ...t },
    ...a
  }
));
br.displayName = "DrawerTitle";
const hr = s.forwardRef(({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
  P.Description,
  {
    ref: o,
    className: n("text-muted-foreground", e),
    style: { fontSize: "var(--text-small)", ...t },
    ...a
  }
));
hr.displayName = "DrawerDescription";
const lo = N.Root, co = N.Trigger, mo = N.Group, uo = N.Portal, po = N.Sub, fo = N.RadioGroup, ee = "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 outline-none min-h-[36px] focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", yr = s.forwardRef(({ className: e, inset: t, children: a, style: o, ...i }, d) => /* @__PURE__ */ l(
  N.SubTrigger,
  {
    ref: d,
    className: n(ee, "data-[state=open]:bg-accent", t && "pl-8", e),
    style: { fontSize: "var(--text-small)", ...o },
    ...i,
    children: [
      a,
      /* @__PURE__ */ r(B, { className: "ml-auto h-4 w-4", "aria-hidden": "true" })
    ]
  }
));
yr.displayName = "DropdownMenuSubTrigger";
const xr = s.forwardRef(({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
  N.SubContent,
  {
    ref: o,
    className: n(
      "z-50 min-w-32 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground",
      e
    ),
    style: { boxShadow: "var(--shadow-md)", ...t },
    ...a
  }
));
xr.displayName = "DropdownMenuSubContent";
const vr = s.forwardRef(({ className: e, sideOffset: t = 4, style: a, ...o }, i) => /* @__PURE__ */ r(N.Portal, { children: /* @__PURE__ */ r(
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
      ...a
    },
    ...o
  }
) }));
vr.displayName = "DropdownMenuContent";
const Nr = s.forwardRef(({ className: e, inset: t, style: a, ...o }, i) => /* @__PURE__ */ r(
  N.Item,
  {
    ref: i,
    className: n(ee, t && "pl-8", e),
    style: { fontSize: "var(--text-small)", ...a },
    ...o
  }
));
Nr.displayName = "DropdownMenuItem";
const wr = s.forwardRef(({ className: e, children: t, checked: a, style: o, ...i }, d) => /* @__PURE__ */ l(
  N.CheckboxItem,
  {
    ref: d,
    className: n(ee, "pl-8", e),
    checked: a,
    style: { fontSize: "var(--text-small)", ...o },
    ...i,
    children: [
      /* @__PURE__ */ r("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ r(N.ItemIndicator, { children: /* @__PURE__ */ r(_, { className: "h-4 w-4", "aria-hidden": "true" }) }) }),
      t
    ]
  }
));
wr.displayName = "DropdownMenuCheckboxItem";
const Sr = s.forwardRef(({ className: e, children: t, style: a, ...o }, i) => /* @__PURE__ */ l(
  N.RadioItem,
  {
    ref: i,
    className: n(ee, "pl-8", e),
    style: { fontSize: "var(--text-small)", ...a },
    ...o,
    children: [
      /* @__PURE__ */ r("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ r(N.ItemIndicator, { children: /* @__PURE__ */ r(J, { className: "h-2 w-2 fill-current", "aria-hidden": "true" }) }) }),
      t
    ]
  }
));
Sr.displayName = "DropdownMenuRadioItem";
const Cr = s.forwardRef(({ className: e, inset: t, style: a, ...o }, i) => /* @__PURE__ */ r(
  N.Label,
  {
    ref: i,
    className: n("px-2 py-1.5 font-semibold text-muted-foreground", t && "pl-8", e),
    style: { fontSize: "var(--text-small)", ...a },
    ...o
  }
));
Cr.displayName = "DropdownMenuLabel";
const Rr = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ r(
  N.Separator,
  {
    ref: a,
    className: n("-mx-1 my-1 h-px bg-border", e),
    ...t
  }
));
Rr.displayName = "DropdownMenuSeparator";
const Tr = ({ className: e, ...t }) => /* @__PURE__ */ r("span", { className: n("ml-auto tracking-widest text-muted-foreground", e), ...t });
Tr.displayName = "DropdownMenuShortcut";
const go = X.Root, bo = X.Trigger, kr = s.forwardRef(({ className: e, align: t = "center", sideOffset: a = 4, style: o, ...i }, d) => /* @__PURE__ */ r(X.Portal, { children: /* @__PURE__ */ r(
  X.Content,
  {
    ref: d,
    align: t,
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
    ...i
  }
) }));
kr.displayName = "HoverCardContent";
const ie = s.forwardRef(
  ({ className: e, type: t, style: a, ...o }, i) => /* @__PURE__ */ r(
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
      style: { fontSize: "var(--text-body)", ...a },
      ...o
    }
  )
);
ie.displayName = "Input";
const Y = s.forwardRef(({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
  st.Root,
  {
    ref: o,
    className: n(
      "font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      e
    ),
    style: { fontSize: "var(--text-small)", ...t },
    ...a
  }
));
Y.displayName = "Label";
const ho = w.Menu, yo = w.Group, Dr = w.Portal, xo = w.Sub, vo = w.RadioGroup, Mr = s.forwardRef(({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
  w.Root,
  {
    ref: o,
    className: n(
      "flex h-11 items-center gap-1 rounded-md border border-border bg-background p-1",
      e
    ),
    style: { boxShadow: "var(--shadow-sm)", ...t },
    ...a
  }
));
Mr.displayName = "Menubar";
const zr = s.forwardRef(({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
  w.Trigger,
  {
    ref: o,
    className: n(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 font-medium outline-none min-h-[36px]",
      "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      e
    ),
    style: { fontSize: "var(--text-small)", ...t },
    ...a
  }
));
zr.displayName = "MenubarTrigger";
const Ir = s.forwardRef(({ className: e, inset: t, children: a, style: o, ...i }, d) => /* @__PURE__ */ l(
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
      a,
      /* @__PURE__ */ r(B, { className: "ml-auto h-4 w-4", "aria-hidden": "true" })
    ]
  }
));
Ir.displayName = "MenubarSubTrigger";
const Pr = s.forwardRef(({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
  w.SubContent,
  {
    ref: o,
    className: n(
      "z-50 min-w-32 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground",
      e
    ),
    style: { boxShadow: "var(--shadow-md)", ...t },
    ...a
  }
));
Pr.displayName = "MenubarSubContent";
const Ar = s.forwardRef(({ className: e, align: t = "start", alignOffset: a = -4, sideOffset: o = 8, style: i, ...d }, m) => /* @__PURE__ */ r(Dr, { children: /* @__PURE__ */ r(
  w.Content,
  {
    ref: m,
    align: t,
    alignOffset: a,
    sideOffset: o,
    className: n(
      "z-50 min-w-48 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground",
      e
    ),
    style: { boxShadow: "var(--shadow-md)", ...i },
    ...d
  }
) }));
Ar.displayName = "MenubarContent";
const le = "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 outline-none min-h-[36px] focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", _r = s.forwardRef(({ className: e, inset: t, style: a, ...o }, i) => /* @__PURE__ */ r(
  w.Item,
  {
    ref: i,
    className: n(le, t && "pl-8", e),
    style: { fontSize: "var(--text-small)", ...a },
    ...o
  }
));
_r.displayName = "MenubarItem";
const jr = s.forwardRef(({ className: e, children: t, checked: a, style: o, ...i }, d) => /* @__PURE__ */ l(
  w.CheckboxItem,
  {
    ref: d,
    className: n(le, "pl-8", e),
    checked: a,
    style: { fontSize: "var(--text-small)", ...o },
    ...i,
    children: [
      /* @__PURE__ */ r("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ r(w.ItemIndicator, { children: /* @__PURE__ */ r(_, { className: "h-4 w-4", "aria-hidden": "true" }) }) }),
      t
    ]
  }
));
jr.displayName = "MenubarCheckboxItem";
const Fr = s.forwardRef(({ className: e, children: t, style: a, ...o }, i) => /* @__PURE__ */ l(
  w.RadioItem,
  {
    ref: i,
    className: n(le, "pl-8", e),
    style: { fontSize: "var(--text-small)", ...a },
    ...o,
    children: [
      /* @__PURE__ */ r("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ r(w.ItemIndicator, { children: /* @__PURE__ */ r(J, { className: "h-2 w-2 fill-current", "aria-hidden": "true" }) }) }),
      t
    ]
  }
));
Fr.displayName = "MenubarRadioItem";
const Br = s.forwardRef(({ className: e, inset: t, style: a, ...o }, i) => /* @__PURE__ */ r(
  w.Label,
  {
    ref: i,
    className: n("px-2 py-1.5 font-semibold text-muted-foreground", t && "pl-8", e),
    style: { fontSize: "var(--text-small)", ...a },
    ...o
  }
));
Br.displayName = "MenubarLabel";
const Gr = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ r(
  w.Separator,
  {
    ref: a,
    className: n("-mx-1 my-1 h-px bg-border", e),
    ...t
  }
));
Gr.displayName = "MenubarSeparator";
const Lr = ({ className: e, ...t }) => /* @__PURE__ */ r(
  "nav",
  {
    role: "navigation",
    "aria-label": "pagination",
    className: n("mx-auto flex w-full justify-center", e),
    ...t
  }
);
Lr.displayName = "Pagination";
const Or = s.forwardRef(
  ({ className: e, ...t }, a) => /* @__PURE__ */ r("ul", { ref: a, className: n("flex flex-row items-center gap-1", e), ...t })
);
Or.displayName = "PaginationContent";
const Er = s.forwardRef(
  ({ className: e, ...t }, a) => /* @__PURE__ */ r("li", { ref: a, className: n("", e), ...t })
);
Er.displayName = "PaginationItem";
const de = ({ className: e, isActive: t, size: a = "icon", ...o }) => /* @__PURE__ */ r(
  "a",
  {
    "aria-current": t ? "page" : void 0,
    className: n(
      A({ variant: t ? "outline" : "ghost", size: a }),
      "cursor-pointer",
      e
    ),
    ...o
  }
);
de.displayName = "PaginationLink";
const $r = ({ className: e, ...t }) => /* @__PURE__ */ l(
  de,
  {
    "aria-label": "Go to previous page",
    size: "default",
    className: n("gap-1 pl-2.5", e),
    ...t,
    children: [
      /* @__PURE__ */ r(he, { className: "h-4 w-4", "aria-hidden": "true" }),
      /* @__PURE__ */ r("span", { children: "Previous" })
    ]
  }
);
$r.displayName = "PaginationPrevious";
const Hr = ({ className: e, ...t }) => /* @__PURE__ */ l(
  de,
  {
    "aria-label": "Go to next page",
    size: "default",
    className: n("gap-1 pr-2.5", e),
    ...t,
    children: [
      /* @__PURE__ */ r("span", { children: "Next" }),
      /* @__PURE__ */ r(B, { className: "h-4 w-4", "aria-hidden": "true" })
    ]
  }
);
Hr.displayName = "PaginationNext";
const Vr = ({ className: e, ...t }) => /* @__PURE__ */ l("span", { "aria-hidden": !0, className: n("flex h-9 w-9 items-center justify-center", e), ...t, children: [
  /* @__PURE__ */ r(be, { className: "h-4 w-4" }),
  /* @__PURE__ */ r("span", { className: "sr-only", children: "More pages" })
] });
Vr.displayName = "PaginationEllipsis";
const No = V.Root, wo = V.Trigger, So = V.Anchor, qr = s.forwardRef(({ className: e, align: t = "center", sideOffset: a = 4, style: o, ...i }, d) => /* @__PURE__ */ r(V.Portal, { children: /* @__PURE__ */ r(
  V.Content,
  {
    ref: d,
    align: t,
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
    ...i
  }
) }));
qr.displayName = "PopoverContent";
const Ur = s.forwardRef(({ className: e, value: t, style: a, ...o }, i) => /* @__PURE__ */ r(
  ue.Root,
  {
    ref: i,
    className: n("relative h-2 w-full overflow-hidden rounded-full bg-secondary", e),
    style: a,
    ...o,
    children: /* @__PURE__ */ r(
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
Ur.displayName = "Progress";
const Ie = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ r(re.Root, { ref: a, className: n("grid gap-2", e), ...t }));
Ie.displayName = "RadioGroup";
const Pe = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ r(
  re.Item,
  {
    ref: a,
    className: n(
      "aspect-square h-5 w-5 rounded-full border border-primary text-primary outline-none",
      "focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      e
    ),
    ...t,
    children: /* @__PURE__ */ r(re.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ r(J, { className: "h-2.5 w-2.5 fill-current text-current", "aria-hidden": "true" }) })
  }
));
Pe.displayName = "RadioGroupItem";
const Kr = s.forwardRef(({ className: e, children: t, ...a }, o) => /* @__PURE__ */ l($.Root, { ref: o, className: n("relative overflow-hidden", e), ...a, children: [
  /* @__PURE__ */ r($.Viewport, { className: "h-full w-full rounded-[inherit]", children: t }),
  /* @__PURE__ */ r(Ae, {}),
  /* @__PURE__ */ r($.Corner, {})
] }));
Kr.displayName = "ScrollArea";
const Ae = s.forwardRef(({ className: e, orientation: t = "vertical", ...a }, o) => /* @__PURE__ */ r(
  $.ScrollAreaScrollbar,
  {
    ref: o,
    orientation: t,
    className: n(
      "flex touch-none select-none",
      t === "vertical" && "h-full w-2.5 border-l border-l-transparent p-px",
      t === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-px",
      e
    ),
    ...a,
    children: /* @__PURE__ */ r($.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
Ae.displayName = "ScrollBar";
const Wr = C.Root, Co = C.Group, Yr = C.Value, _e = s.forwardRef(({ className: e, children: t, style: a, ...o }, i) => /* @__PURE__ */ l(
  C.Trigger,
  {
    ref: i,
    className: n(
      "flex min-h-[44px] w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2",
      "text-foreground data-[placeholder]:text-muted-foreground outline-none focus:ring-2 focus:ring-ring",
      "disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      e
    ),
    style: { fontSize: "var(--text-body)", ...a },
    ...o,
    children: [
      t,
      /* @__PURE__ */ r(C.Icon, { asChild: !0, children: /* @__PURE__ */ r(ne, { className: "h-4 w-4 opacity-50", "aria-hidden": "true" }) })
    ]
  }
));
_e.displayName = "SelectTrigger";
const je = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ r(
  C.ScrollUpButton,
  {
    ref: a,
    className: n("flex cursor-default items-center justify-center py-1", e),
    ...t,
    children: /* @__PURE__ */ r(Ke, { className: "h-4 w-4", "aria-hidden": "true" })
  }
));
je.displayName = "SelectScrollUpButton";
const Fe = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ r(
  C.ScrollDownButton,
  {
    ref: a,
    className: n("flex cursor-default items-center justify-center py-1", e),
    ...t,
    children: /* @__PURE__ */ r(ne, { className: "h-4 w-4", "aria-hidden": "true" })
  }
));
Fe.displayName = "SelectScrollDownButton";
const Be = s.forwardRef(({ className: e, children: t, position: a = "popper", style: o, ...i }, d) => /* @__PURE__ */ r(C.Portal, { children: /* @__PURE__ */ l(
  C.Content,
  {
    ref: d,
    className: n(
      "relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border border-border bg-popover text-popover-foreground",
      a === "popper" && "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
      e
    ),
    position: a,
    style: { boxShadow: "var(--shadow-md)", ...o },
    ...i,
    children: [
      /* @__PURE__ */ r(je, {}),
      /* @__PURE__ */ r(
        C.Viewport,
        {
          className: n(
            "p-1",
            a === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ r(Fe, {})
    ]
  }
) }));
Be.displayName = "SelectContent";
const Xr = s.forwardRef(({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
  C.Label,
  {
    ref: o,
    className: n("px-2 py-1.5 font-semibold text-muted-foreground", e),
    style: { fontSize: "var(--text-small)", ...t },
    ...a
  }
));
Xr.displayName = "SelectLabel";
const Ge = s.forwardRef(({ className: e, children: t, style: a, ...o }, i) => /* @__PURE__ */ l(
  C.Item,
  {
    ref: i,
    className: n(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 outline-none min-h-[36px]",
      "focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    style: { fontSize: "var(--text-small)", ...a },
    ...o,
    children: [
      /* @__PURE__ */ r("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ r(C.ItemIndicator, { children: /* @__PURE__ */ r(_, { className: "h-4 w-4", "aria-hidden": "true" }) }) }),
      /* @__PURE__ */ r(C.ItemText, { children: t })
    ]
  }
));
Ge.displayName = "SelectItem";
const Jr = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ r(
  C.Separator,
  {
    ref: a,
    className: n("-mx-1 my-1 h-px bg-border", e),
    ...t
  }
));
Jr.displayName = "SelectSeparator";
const Qr = s.forwardRef(({ className: e, orientation: t = "horizontal", decorative: a = !0, ...o }, i) => /* @__PURE__ */ r(
  it.Root,
  {
    ref: i,
    decorative: a,
    orientation: t,
    className: n(
      "shrink-0 bg-border",
      t === "horizontal" ? "h-px w-full" : "h-full w-px",
      e
    ),
    ...o
  }
));
Qr.displayName = "Separator";
const Ro = y.Root, To = y.Trigger, ko = y.Close, Zr = y.Portal, Le = s.forwardRef(({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
  y.Overlay,
  {
    ref: o,
    className: n(
      "fixed inset-0 z-50 bg-foreground/40",
      "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
      e
    ),
    style: { transition: "opacity var(--duration-base) var(--ease-standard)", ...t },
    ...a
  }
));
Le.displayName = "SheetOverlay";
const ea = K(
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
), ta = s.forwardRef(({ side: e = "right", className: t, children: a, style: o, ...i }, d) => /* @__PURE__ */ l(Zr, { children: [
  /* @__PURE__ */ r(Le, {}),
  /* @__PURE__ */ l(
    y.Content,
    {
      ref: d,
      className: n(ea({ side: e }), t),
      style: {
        boxShadow: "var(--shadow-lg)",
        transition: "transform var(--duration-base) var(--ease-entrance)",
        ...o
      },
      ...i,
      children: [
        a,
        /* @__PURE__ */ l(
          y.Close,
          {
            className: n(
              "absolute right-4 top-4 rounded-sm opacity-70 outline-none",
              "hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring",
              "inline-flex h-11 w-11 items-center justify-center"
            ),
            children: [
              /* @__PURE__ */ r(ye, { className: "h-4 w-4", "aria-hidden": "true" }),
              /* @__PURE__ */ r("span", { className: "sr-only", children: "Close" })
            ]
          }
        )
      ]
    }
  )
] }));
ta.displayName = "SheetContent";
const ra = ({ className: e, ...t }) => /* @__PURE__ */ r("div", { className: n("flex flex-col space-y-2 text-center sm:text-left", e), ...t });
ra.displayName = "SheetHeader";
const aa = ({ className: e, ...t }) => /* @__PURE__ */ r(
  "div",
  {
    className: n("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", e),
    ...t
  }
);
aa.displayName = "SheetFooter";
const oa = s.forwardRef(({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
  y.Title,
  {
    ref: o,
    className: n("font-semibold text-foreground", e),
    style: { fontSize: "var(--text-h3)", fontFamily: "var(--font-display)", ...t },
    ...a
  }
));
oa.displayName = "SheetTitle";
const na = s.forwardRef(({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
  y.Description,
  {
    ref: o,
    className: n("text-muted-foreground", e),
    style: { fontSize: "var(--text-small)", ...t },
    ...a
  }
));
na.displayName = "SheetDescription";
const sa = s.forwardRef(
  ({ className: e, style: t, thumbLabels: a, "aria-label": o, value: i, defaultValue: d, ...m }, u) => {
    const f = (i ?? d ?? [0]).length, x = (R) => Array.isArray(a) ? a[R] : a ?? o;
    return /* @__PURE__ */ l(
      W.Root,
      {
        ref: u,
        className: n("relative flex w-full touch-none select-none items-center", e),
        value: i,
        defaultValue: d,
        ...m,
        children: [
          /* @__PURE__ */ r(W.Track, { className: "relative h-2 w-full grow overflow-hidden rounded-full bg-secondary", children: /* @__PURE__ */ r(W.Range, { className: "absolute h-full bg-primary" }) }),
          Array.from({ length: f }).map((R, S) => /* @__PURE__ */ r(
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
sa.displayName = "Slider";
const ia = s.forwardRef(({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
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
    ...a,
    children: /* @__PURE__ */ r(
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
ia.displayName = "Switch";
const la = s.forwardRef(({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
  "table",
  {
    ref: o,
    className: n("w-full caption-bottom border-collapse", e),
    style: { fontSize: "var(--text-small)", ...t },
    ...a
  }
));
la.displayName = "Table";
const da = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ r("thead", { ref: a, className: n("[&_tr]:border-b [&_tr]:border-border", e), ...t }));
da.displayName = "TableHeader";
const ca = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ r("tbody", { ref: a, className: n("[&_tr:last-child]:border-0", e), ...t }));
ca.displayName = "TableBody";
const ma = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ r(
  "tfoot",
  {
    ref: a,
    className: n("border-t border-border bg-muted/50 font-medium [&>tr]:last:border-b-0", e),
    ...t
  }
));
ma.displayName = "TableFooter";
const ua = s.forwardRef(({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
  "tr",
  {
    ref: o,
    className: n(
      "border-b border-border hover:bg-muted/50 data-[state=selected]:bg-muted",
      e
    ),
    style: { transition: "background-color var(--duration-fast) var(--ease-standard)", ...t },
    ...a
  }
));
ua.displayName = "TableRow";
const pa = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ r(
  "th",
  {
    ref: a,
    className: n(
      "h-11 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      e
    ),
    ...t
  }
));
pa.displayName = "TableHead";
const fa = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ r(
  "td",
  {
    ref: a,
    className: n("p-4 align-middle [&:has([role=checkbox])]:pr-0", e),
    ...t
  }
));
fa.displayName = "TableCell";
const ga = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ r("caption", { ref: a, className: n("mt-4 text-muted-foreground", e), ...t }));
ga.displayName = "TableCaption";
const Do = Q.Root, ba = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ r(
  Q.List,
  {
    ref: a,
    className: n(
      "inline-flex h-11 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      e
    ),
    ...t
  }
));
ba.displayName = "TabsList";
const ha = s.forwardRef(({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
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
    ...a
  }
));
ha.displayName = "TabsTrigger";
const ya = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ r(
  Q.Content,
  {
    ref: a,
    className: n("mt-2 outline-none focus-visible:ring-2 focus-visible:ring-ring", e),
    ...t
  }
));
ya.displayName = "TabsContent";
const Oe = s.forwardRef(({ className: e, style: t, ...a }, o) => /* @__PURE__ */ r(
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
    ...a
  }
));
Oe.displayName = "Textarea";
const Ee = K(
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
), xa = s.forwardRef(({ className: e, variant: t, size: a, style: o, ...i }, d) => /* @__PURE__ */ r(
  ut.Root,
  {
    ref: d,
    className: n(Ee({ variant: t, size: a }), e),
    style: {
      fontSize: "var(--text-small)",
      transition: "background-color var(--duration-fast) var(--ease-standard)",
      ...o
    },
    ...i
  }
));
xa.displayName = "Toggle";
const $e = s.createContext({
  size: "default",
  variant: "default"
}), va = s.forwardRef(({ className: e, variant: t, size: a, children: o, ...i }, d) => /* @__PURE__ */ r(
  Ne.Root,
  {
    ref: d,
    className: n("flex items-center justify-center gap-1", e),
    ...i,
    children: /* @__PURE__ */ r($e.Provider, { value: { variant: t, size: a }, children: o })
  }
));
va.displayName = "ToggleGroup";
const Na = s.forwardRef(({ className: e, children: t, variant: a, size: o, style: i, ...d }, m) => {
  const u = s.useContext($e);
  return /* @__PURE__ */ r(
    Ne.Item,
    {
      ref: m,
      className: n(
        Ee({ variant: u.variant || a, size: u.size || o }),
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
Na.displayName = "ToggleGroupItem";
const Mo = q.Provider, zo = q.Root, Io = q.Trigger, wa = s.forwardRef(({ className: e, sideOffset: t = 4, style: a, ...o }, i) => /* @__PURE__ */ r(q.Portal, { children: /* @__PURE__ */ r(
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
      ...a
    },
    ...o
  }
) }));
wa.displayName = "TooltipContent";
const Sa = `
.prumo-dt[data-mobile-cards="true"] { }
@media (max-width: 47.99em) {
  .prumo-dt[data-mobile-cards="true"] thead { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
  .prumo-dt[data-mobile-cards="true"] tr { display: block; border: 1px solid var(--border); border-radius: var(--radius-lg); margin-bottom: var(--density-gap); padding: var(--density-padding); box-shadow: var(--shadow-sm); }
  .prumo-dt[data-mobile-cards="true"] td { display: flex; justify-content: space-between; gap: 1rem; padding: 0.35rem 0; border: 0; text-align: right; }
  .prumo-dt[data-mobile-cards="true"] td::before { content: attr(data-label); font-weight: 600; color: var(--muted-foreground); text-align: left; }
}
`;
function Po({
  columns: e,
  data: t,
  enableFiltering: a = !0,
  enablePagination: o = !0,
  pageSize: i = 10,
  filterPlaceholder: d = "Search…",
  emptyState: m,
  caption: u,
  className: f
}) {
  const [x, R] = s.useState([]), [S, T] = s.useState([]), [k, L] = s.useState(""), I = G(), D = tt({
    data: t,
    columns: e,
    getCoreRowModel: nt(),
    getSortedRowModel: ot(),
    getFilteredRowModel: at(),
    getPaginationRowModel: o ? rt() : void 0,
    onSortingChange: R,
    onColumnFiltersChange: T,
    onGlobalFilterChange: L,
    state: { sorting: x, columnFilters: S, globalFilter: k },
    initialState: { pagination: { pageSize: i } }
  }), O = D.getRowModel().rows, c = (p) => {
    const g = D.getColumn(p), b = g == null ? void 0 : g.columnDef.header;
    return typeof b == "string" ? b : p;
  };
  return /* @__PURE__ */ l("div", { className: n("prumo-dt w-full", f), "data-mobile-cards": "true", children: [
    /* @__PURE__ */ r("style", { children: Sa }),
    a && /* @__PURE__ */ r("div", { className: "mb-4 flex items-center gap-2", children: /* @__PURE__ */ l("div", { className: "relative w-full max-w-sm", children: [
      /* @__PURE__ */ r(
        xe,
        {
          className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ r(
        ie,
        {
          value: k ?? "",
          onChange: (p) => L(p.target.value),
          placeholder: d,
          "aria-label": d,
          className: "pl-9"
        }
      )
    ] }) }),
    /* @__PURE__ */ r("div", { className: "overflow-hidden rounded-lg border border-border", children: /* @__PURE__ */ l(
      "table",
      {
        className: "w-full caption-bottom border-collapse",
        style: { fontSize: "var(--text-small)" },
        children: [
          u && /* @__PURE__ */ r("caption", { className: "sr-only", children: u }),
          /* @__PURE__ */ r("thead", { className: "[&_tr]:border-b [&_tr]:border-border bg-muted/40", children: D.getHeaderGroups().map((p) => /* @__PURE__ */ r("tr", { children: p.headers.map((g) => {
            const b = g.column.getCanSort(), M = g.column.getIsSorted();
            return /* @__PURE__ */ r(
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
                      M === "asc" ? /* @__PURE__ */ r(We, { className: "h-3.5 w-3.5", "aria-hidden": "true" }) : M === "desc" ? /* @__PURE__ */ r(Ye, { className: "h-3.5 w-3.5", "aria-hidden": "true" }) : /* @__PURE__ */ r(Xe, { className: "h-3.5 w-3.5 opacity-50", "aria-hidden": "true" })
                    ]
                  }
                ) : te(g.column.columnDef.header, g.getContext())
              },
              g.id
            );
          }) }, p.id)) }),
          /* @__PURE__ */ r("tbody", { className: "[&_tr:last-child]:border-0", children: O.length === 0 ? /* @__PURE__ */ r("tr", { children: /* @__PURE__ */ r("td", { colSpan: e.length, className: "p-8 text-center text-muted-foreground", children: m ?? "No results found." }) }) : O.map((p, g) => /* @__PURE__ */ r(
            j.tr,
            {
              "data-state": p.getIsSelected() ? "selected" : void 0,
              className: "border-b border-border bg-card hover:bg-muted/50",
              initial: I ? !1 : { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              transition: I ? { duration: 0 } : { duration: 0.3, delay: Math.min(g * 0.03, 0.3), ease: [0.2, 0, 0.38, 0.9] },
              children: p.getVisibleCells().map((b) => /* @__PURE__ */ r(
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
        D.getState().pagination.pageIndex + 1,
        " of ",
        D.getPageCount() || 1,
        " · ",
        D.getFilteredRowModel().rows.length,
        " row(s)"
      ] }),
      /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ r(
          U,
          {
            variant: "outline",
            size: "sm",
            onClick: () => D.previousPage(),
            disabled: !D.getCanPreviousPage(),
            children: "Previous"
          }
        ),
        /* @__PURE__ */ r(
          U,
          {
            variant: "outline",
            size: "sm",
            onClick: () => D.nextPage(),
            disabled: !D.getCanNextPage(),
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function He(e) {
  let t = 0;
  for (let a = 0; a < e.length; a++)
    t = (t << 5) - t + e.charCodeAt(a), t |= 0;
  return Math.abs(t);
}
function Ca(e) {
  const t = e.trim().split(/\s+/).filter(Boolean);
  return t.length === 0 ? "?" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
}
function Ra(e) {
  return He(e) % 12 * 30;
}
function fe({
  entity: e,
  size: t = "sm"
}) {
  const a = Ra(e.id), o = t === "md" ? "1.5rem" : "1.25rem";
  return /* @__PURE__ */ r(
    "span",
    {
      "aria-hidden": "true",
      className: "inline-flex shrink-0 items-center justify-center rounded-full font-semibold",
      style: {
        width: o,
        height: o,
        fontSize: "0.65rem",
        lineHeight: 1,
        // Tint the brand primary by rotating its hue, then mix toward the card
        // surface so the chip is a soft, on-palette badge (no hardcoded color).
        background: `color-mix(in oklch, ${`hsl(from var(--primary) calc(h + ${a}) s l)`} 22%, var(--card))`,
        color: `hsl(from var(--primary) calc(h + ${a}) s calc(l - 18))`
      },
      children: Ca(e.name)
    }
  );
}
function Ta(e) {
  const t = ["strong", "tinted", "outline"];
  return t[He(e) % t.length];
}
function ka({ value: e }) {
  const t = Ta(e);
  return /* @__PURE__ */ l(
    "span",
    {
      className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 font-semibold whitespace-nowrap",
      style: { fontSize: "var(--text-small)", ...{
        strong: {
          background: "var(--primary)",
          color: "var(--primary-foreground)",
          borderRadius: "var(--radius-sm)"
        },
        tinted: {
          background: "color-mix(in oklch, var(--primary) 14%, var(--card))",
          color: "var(--foreground)",
          borderRadius: "var(--radius-sm)"
        },
        outline: {
          background: "transparent",
          color: "var(--foreground)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-sm)"
        }
      }[t] },
      children: [
        t !== "outline" ? null : /* @__PURE__ */ r(
          "span",
          {
            "aria-hidden": "true",
            className: "inline-block h-1.5 w-1.5 rounded-full",
            style: { background: "var(--muted-foreground)" }
          }
        ),
        e
      ]
    }
  );
}
function ge({
  fraction: e,
  reduced: t,
  width: a = "4rem"
}) {
  const o = Math.max(0, Math.min(1, e));
  return /* @__PURE__ */ r(
    "span",
    {
      "aria-hidden": "true",
      className: "relative inline-block h-2 overflow-hidden rounded-full",
      style: { width: a, background: "color-mix(in oklch, var(--muted) 70%, var(--card))" },
      children: /* @__PURE__ */ r(
        j.span,
        {
          className: "absolute left-0 top-0 h-full rounded-full",
          style: { background: "var(--primary)" },
          initial: t ? !1 : { width: 0 },
          animate: { width: `${o * 100}%` },
          transition: t ? { duration: 0 } : { duration: 0.5, ease: [0.2, 0, 0.38, 0.9] }
        }
      )
    }
  );
}
function Da({
  value: e,
  attr: t,
  reduced: a
}) {
  const o = t.format ?? "text";
  if (e == null || e === "")
    return /* @__PURE__ */ l("span", { className: "text-muted-foreground", children: [
      /* @__PURE__ */ r("span", { "aria-hidden": "true", children: "—" }),
      /* @__PURE__ */ r("span", { className: "sr-only", children: "No data" })
    ] });
  switch (o) {
    case "check":
      return e ? /* @__PURE__ */ l("span", { className: "inline-flex items-center gap-1.5 font-medium text-foreground", children: [
        /* @__PURE__ */ r(
          _,
          {
            className: "h-5 w-5",
            style: { color: "var(--accent)" },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ r("span", { children: "Yes" })
      ] }) : /* @__PURE__ */ l("span", { className: "inline-flex items-center gap-1.5 text-muted-foreground", children: [
        /* @__PURE__ */ r(Je, { className: "h-5 w-5", "aria-hidden": "true" }),
        /* @__PURE__ */ r("span", { children: "No" })
      ] });
    case "badge":
      return /* @__PURE__ */ r(ka, { value: String(e) });
    case "score": {
      const i = t.scoreMax ?? 5, d = typeof e == "number" ? e : Number(e), m = Number.isFinite(d), u = m ? d / i : 0;
      return /* @__PURE__ */ l("span", { className: "inline-flex items-center gap-2", children: [
        /* @__PURE__ */ r("span", { className: "sr-only", children: m ? `${d} out of ${i}` : String(e) }),
        /* @__PURE__ */ r(ge, { fraction: u, reduced: a }),
        /* @__PURE__ */ l("span", { className: "tabular-nums font-medium text-foreground", "aria-hidden": "true", children: [
          m ? d : String(e),
          /* @__PURE__ */ l("span", { className: "font-normal text-muted-foreground", children: [
            "/",
            i
          ] })
        ] })
      ] });
    }
    case "percent": {
      const i = t.percentMax ?? 100, d = typeof e == "number" ? e : Number(e), m = Number.isFinite(d), u = m ? d / i : 0;
      return /* @__PURE__ */ l("span", { className: "inline-flex items-center gap-2", children: [
        /* @__PURE__ */ r("span", { className: "sr-only", children: m ? `${d} percent` : String(e) }),
        /* @__PURE__ */ r(ge, { fraction: u, reduced: a }),
        /* @__PURE__ */ r("span", { className: "tabular-nums font-medium text-foreground", "aria-hidden": "true", children: m ? `${d}%` : String(e) })
      ] });
    }
    case "count": {
      const i = typeof e == "number" ? e : Number(e), d = Number.isFinite(i) ? i : String(e);
      return /* @__PURE__ */ l("span", { className: "inline-flex items-baseline gap-1", children: [
        /* @__PURE__ */ r("span", { className: "tabular-nums font-medium text-foreground", children: d }),
        t.unit && /* @__PURE__ */ r("span", { className: "text-muted-foreground", style: { fontSize: "var(--text-small)" }, children: t.unit })
      ] });
    }
    case "currency": {
      const i = typeof e == "number" ? e : Number(e);
      if (!Number.isFinite(i)) return /* @__PURE__ */ r("span", { className: "font-medium", children: String(e) });
      let d;
      try {
        d = new Intl.NumberFormat(void 0, {
          style: "currency",
          currency: t.currency ?? "USD",
          maximumFractionDigits: 0
        }).format(i);
      } catch {
        d = String(i);
      }
      return /* @__PURE__ */ r("span", { className: "tabular-nums font-medium text-foreground", children: d });
    }
    case "text":
    default:
      return /* @__PURE__ */ r("span", { className: "font-medium text-foreground", children: String(e) });
  }
}
const Ma = `
.prumo-ct .prumo-ct-cell-entity { display: none; }
@media (max-width: 47.99em) {
  .prumo-ct thead { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
  .prumo-ct, .prumo-ct tbody, .prumo-ct tr, .prumo-ct th, .prumo-ct td { display: block; }
  .prumo-ct { border: 0; overflow: visible; }
  .prumo-ct tbody { display: grid; gap: var(--density-gap); }
  /* Each ATTRIBUTE row = a card. */
  .prumo-ct tr {
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--density-padding);
    box-shadow: var(--shadow-sm);
    background: var(--card);
  }
  .prumo-ct th[scope="row"] {
    padding: 0 0 0.75rem 0;
    margin-bottom: 0.25rem;
    border-bottom: 1px solid var(--border);
    font-size: var(--text-body);
    font-weight: 700;
    color: var(--foreground);
    font-family: var(--font-display);
  }
  /* Each entity value = a line: identity on the left, value cue on the right. */
  .prumo-ct td {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--density-gap);
    padding: 0.6rem 0;
    text-align: right;
  }
  .prumo-ct tr td + td { border-top: 1px solid color-mix(in oklch, var(--border) 60%, transparent); }
  .prumo-ct .prumo-ct-cell-entity {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    color: var(--foreground);
    text-align: left;
  }
}
`;
function Ao({
  entities: e,
  attributes: t,
  emptyState: a,
  caption: o,
  className: i
}) {
  const d = G();
  return e.length === 0 || t.length === 0 ? /* @__PURE__ */ r(
    "div",
    {
      className: n(
        "flex items-center justify-center rounded-lg border border-border bg-card p-8 text-center text-muted-foreground",
        i
      ),
      children: a ?? "Nothing to compare yet."
    }
  ) : /* @__PURE__ */ l("div", { className: n("prumo-ct w-full overflow-hidden rounded-lg border border-border", i), children: [
    /* @__PURE__ */ r("style", { children: Ma }),
    /* @__PURE__ */ l("table", { className: "w-full caption-bottom border-collapse", style: { fontSize: "var(--text-small)" }, children: [
      o && /* @__PURE__ */ r("caption", { className: "sr-only", children: o }),
      /* @__PURE__ */ r("thead", { className: "bg-muted/40", children: /* @__PURE__ */ l("tr", { className: "border-b border-border", children: [
        /* @__PURE__ */ r("th", { scope: "col", className: "h-14 px-4 text-left align-bottom font-medium text-muted-foreground", children: /* @__PURE__ */ r("span", { className: "sr-only", children: "Attribute" }) }),
        e.map((m) => /* @__PURE__ */ r("th", { scope: "col", className: "h-14 px-4 text-left align-bottom", children: /* @__PURE__ */ l("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ r(fe, { entity: m, size: "md" }),
          /* @__PURE__ */ l("span", { className: "min-w-0", children: [
            /* @__PURE__ */ r(
              "span",
              {
                className: "block truncate font-semibold text-foreground",
                style: { fontFamily: "var(--font-display)" },
                children: m.name
              }
            ),
            m.subtitle && /* @__PURE__ */ r("span", { className: "block truncate text-muted-foreground", children: m.subtitle })
          ] })
        ] }) }, m.id))
      ] }) }),
      /* @__PURE__ */ r("tbody", { children: t.map((m, u) => /* @__PURE__ */ l(
        j.tr,
        {
          className: "border-b border-border last:border-0",
          initial: d ? !1 : { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: d ? { duration: 0 } : { duration: 0.3, delay: Math.min(u * 0.04, 0.4), ease: [0.2, 0, 0.38, 0.9] },
          children: [
            /* @__PURE__ */ l("th", { scope: "row", className: "px-4 py-4 text-left align-top font-semibold text-foreground", children: [
              m.label,
              m.hint && /* @__PURE__ */ r("span", { className: "block font-normal text-muted-foreground", children: m.hint })
            ] }),
            e.map((f) => /* @__PURE__ */ l("td", { className: "px-4 py-4 align-middle", children: [
              /* @__PURE__ */ l("span", { className: "prumo-ct-cell-entity", children: [
                /* @__PURE__ */ r(fe, { entity: f }),
                /* @__PURE__ */ r("span", { className: "truncate", children: f.name })
              ] }),
              /* @__PURE__ */ r(Da, { value: f.values[m.id], attr: m, reduced: d })
            ] }, f.id))
          ]
        },
        m.id
      )) })
    ] })
  ] });
}
function _o({
  items: e,
  renderItem: t,
  getKey: a,
  layout: o = "grid",
  minCardWidth: i = "16rem",
  emptyState: d,
  "aria-label": m,
  className: u
}) {
  const f = G();
  if (e.length === 0)
    return /* @__PURE__ */ r(
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
  return /* @__PURE__ */ r(
    "ul",
    {
      role: "list",
      "aria-label": m,
      className: n("m-0 list-none p-0", u),
      style: x,
      children: e.map((S, T) => {
        const k = a ? a(S, T) : T;
        return /* @__PURE__ */ r(
          j.li,
          {
            role: "listitem",
            className: R ? "mb-[var(--density-gap)] break-inside-avoid" : void 0,
            style: R ? { breakInside: "avoid" } : void 0,
            initial: f ? !1 : { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: f ? { duration: 0 } : { duration: 0.3, delay: Math.min(T * 0.04, 0.4), ease: [0, 0, 0.38, 0.9] },
            children: t(S, T)
          },
          k
        );
      })
    }
  );
}
function za({ deltaPct: e }) {
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
        t ? /* @__PURE__ */ r(Qe, { className: "h-3.5 w-3.5", "aria-hidden": "true" }) : /* @__PURE__ */ r(Ze, { className: "h-3.5 w-3.5", "aria-hidden": "true" }),
        Math.abs(e).toFixed(1),
        "%",
        /* @__PURE__ */ r("span", { className: "sr-only", children: t ? "increase" : "decrease" })
      ]
    }
  );
}
const Ia = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
};
function Pa({ spec: e }) {
  const t = e.colorTokens ?? ["primary", "accent"], [a, o] = pt(t), i = {
    data: e.data,
    colors: o,
    showAnimation: !1,
    className: "h-64 mt-2"
  };
  return /* @__PURE__ */ l("div", { ref: a, children: [
    e.title && /* @__PURE__ */ r("h3", { className: "mb-1 font-medium text-foreground", style: { fontSize: "var(--text-body)" }, children: e.title }),
    e.kind === "area" && /* @__PURE__ */ r(lt, { ...i, index: e.index ?? "date", categories: e.categories ?? [] }),
    e.kind === "bar" && /* @__PURE__ */ r(dt, { ...i, index: e.index ?? "date", categories: e.categories ?? [] }),
    e.kind === "line" && /* @__PURE__ */ r(ct, { ...i, index: e.index ?? "date", categories: e.categories ?? [] }),
    e.kind === "donut" && /* @__PURE__ */ r(mt, { ...i, index: e.index ?? "name", category: e.category ?? "value" })
  ] });
}
function jo({
  kpis: e,
  chart: t,
  columns: a = 4,
  emptyState: o,
  className: i,
  "aria-label": d
}) {
  const m = G();
  return e.length === 0 && !t ? /* @__PURE__ */ r(
    "div",
    {
      className: n(
        "flex items-center justify-center rounded-lg border border-dashed border-border bg-card p-10 text-center text-muted-foreground",
        i
      ),
      children: o ?? "No metrics to show."
    }
  ) : /* @__PURE__ */ l("section", { className: n("w-full", i), "aria-label": d ?? "Dashboard", children: [
    e.length > 0 && /* @__PURE__ */ r("div", { className: n("grid gap-[var(--density-gap)]", Ia[a]), children: e.map((u, f) => /* @__PURE__ */ r(
      j.div,
      {
        initial: m ? !1 : { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: m ? { duration: 0 } : { duration: 0.3, delay: Math.min(f * 0.05, 0.3), ease: [0, 0, 0.38, 0.9] },
        children: /* @__PURE__ */ l(ae, { children: [
          /* @__PURE__ */ r(Ce, { className: "pb-2", children: /* @__PURE__ */ r(
            Re,
            {
              className: "font-medium text-muted-foreground",
              style: { fontSize: "var(--text-small)", fontFamily: "var(--font-body)" },
              children: u.label
            }
          ) }),
          /* @__PURE__ */ l(oe, { children: [
            /* @__PURE__ */ l("div", { className: "flex items-baseline gap-2", children: [
              /* @__PURE__ */ r(
                "span",
                {
                  className: "font-semibold text-foreground tabular-nums",
                  style: { fontSize: "var(--text-h2)", fontFamily: "var(--font-display)" },
                  children: u.value
                }
              ),
              typeof u.deltaPct == "number" && /* @__PURE__ */ r(za, { deltaPct: u.deltaPct })
            ] }),
            u.hint && /* @__PURE__ */ r("p", { className: "mt-1 text-muted-foreground", style: { fontSize: "var(--text-small)" }, children: u.hint })
          ] })
        ] })
      },
      `${u.label}-${f}`
    )) }),
    t && /* @__PURE__ */ r(ae, { className: "mt-[var(--density-gap)]", children: /* @__PURE__ */ r(oe, { className: "pt-6", children: /* @__PURE__ */ r(Pa, { spec: t }) }) })
  ] });
}
function Fo({
  columns: e,
  renderCard: t,
  onMoveCard: a,
  emptyColumnText: o = "No items",
  emptyState: i,
  className: d,
  "aria-label": m
}) {
  const u = G();
  return e.length === 0 ? /* @__PURE__ */ r(
    "div",
    {
      className: n(
        "flex items-center justify-center rounded-lg border border-dashed border-border bg-card p-10 text-center text-muted-foreground",
        d
      ),
      children: i ?? "No columns yet."
    }
  ) : /* @__PURE__ */ r(
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
                  /* @__PURE__ */ r(
                    "span",
                    {
                      "aria-hidden": "true",
                      className: "inline-block h-2.5 w-2.5 rounded-full",
                      style: { background: `var(--${f.accentToken ?? "primary"})` }
                    }
                  ),
                  f.title
                ] }),
                /* @__PURE__ */ r(At, { variant: "secondary", children: f.cards.length })
              ] }),
              /* @__PURE__ */ r("ul", { role: "list", className: "flex flex-col gap-[var(--density-gap)] p-0 m-0 list-none", children: f.cards.length === 0 ? /* @__PURE__ */ r("li", { className: "rounded-md border border-dashed border-border p-4 text-center text-muted-foreground", style: { fontSize: "var(--text-small)" }, children: o }) : f.cards.map((T, k) => /* @__PURE__ */ l(
                j.li,
                {
                  role: "listitem",
                  className: "rounded-md border border-border bg-card p-3",
                  style: { boxShadow: "var(--shadow-sm)" },
                  initial: u ? !1 : { opacity: 0, y: 8 },
                  animate: { opacity: 1, y: 0 },
                  transition: u ? { duration: 0 } : { duration: 0.3, delay: Math.min(k * 0.03, 0.25), ease: [0, 0, 0.38, 0.9] },
                  children: [
                    t(T, f),
                    a && (R || S) && /* @__PURE__ */ l("div", { className: "mt-2 flex justify-end gap-1", children: [
                      R && /* @__PURE__ */ r(
                        "button",
                        {
                          type: "button",
                          onClick: () => a(T.id, f.id, R.id),
                          "aria-label": `Move to ${R.title}`,
                          className: "inline-flex h-11 min-w-[44px] items-center justify-center rounded-sm px-2 text-muted-foreground outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring",
                          style: { fontSize: "var(--text-small)" },
                          children: "←"
                        }
                      ),
                      S && /* @__PURE__ */ r(
                        "button",
                        {
                          type: "button",
                          onClick: () => a(T.id, f.id, S.id),
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
function Aa(e, t) {
  const a = {};
  for (const o of e.fields) {
    if (!o.required) continue;
    const i = t[o.name];
    (i === void 0 || i === "" || o.type === "checkbox" && i !== !0) && (a[o.name] = `${o.label} is required.`);
  }
  return a;
}
function Bo({
  steps: e,
  initialValues: t = {},
  onSubmit: a,
  onChange: o,
  className: i,
  emptyState: d
}) {
  const m = G(), [u, f] = s.useState(0), [x, R] = s.useState(t), [S, T] = s.useState({});
  if (e.length === 0)
    return /* @__PURE__ */ r(
      "div",
      {
        className: n(
          "flex items-center justify-center rounded-lg border border-dashed border-border bg-card p-10 text-center text-muted-foreground",
          i
        ),
        children: d ?? "No steps configured."
      }
    );
  const k = e[u], L = u === e.length - 1, I = (c, p) => {
    const g = { ...x, [c]: p };
    R(g), o == null || o(g), S[c] && T((b) => ({ ...b, [c]: "" }));
  }, D = () => {
    const c = Aa(k, x);
    if (Object.keys(c).length > 0) {
      T(c);
      return;
    }
    L ? a == null || a(x) : f((p) => p + 1);
  }, O = () => f((c) => Math.max(0, c - 1));
  return /* @__PURE__ */ l(
    "form",
    {
      className: n("w-full", i),
      noValidate: !0,
      onSubmit: (c) => {
        c.preventDefault(), D();
      },
      children: [
        /* @__PURE__ */ r("ol", { className: "mb-6 flex flex-wrap items-center gap-2", "aria-label": "Progress", children: e.map((c, p) => {
          const g = p < u, b = p === u;
          return /* @__PURE__ */ l("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ r(
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
                children: g ? /* @__PURE__ */ r(_, { className: "h-4 w-4", "aria-hidden": "true" }) : p + 1
              }
            ),
            /* @__PURE__ */ r(
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
            p < e.length - 1 && /* @__PURE__ */ r("span", { "aria-hidden": "true", className: "mx-1 h-px w-6 bg-border" })
          ] }, c.id);
        }) }),
        /* @__PURE__ */ l(
          j.fieldset,
          {
            className: "m-0 border-0 p-0",
            initial: m ? !1 : { opacity: 0, x: 12 },
            animate: { opacity: 1, x: 0 },
            transition: m ? { duration: 0 } : { duration: 0.3, ease: [0, 0, 0.38, 0.9] },
            children: [
              /* @__PURE__ */ r("legend", { className: "mb-1 font-semibold text-foreground", style: { fontSize: "var(--text-h3)", fontFamily: "var(--font-display)" }, children: k.title }),
              k.description && /* @__PURE__ */ r("p", { className: "mb-4 text-muted-foreground", style: { fontSize: "var(--text-small)" }, children: k.description }),
              /* @__PURE__ */ r("div", { className: "grid gap-4", children: k.fields.map((c) => {
                const p = `fw-${k.id}-${c.name}`, g = `${p}-err`, b = `${p}-hint`, M = S[c.name], E = [c.hint ? b : null, M ? g : null].filter(Boolean).join(" ") || void 0;
                return /* @__PURE__ */ l("div", { className: "grid gap-1.5", children: [
                  c.type !== "checkbox" && /* @__PURE__ */ l(Y, { htmlFor: p, children: [
                    c.label,
                    c.required && /* @__PURE__ */ r("span", { className: "text-destructive", children: " *" })
                  ] }),
                  c.type === "text" || c.type === "number" ? /* @__PURE__ */ r(
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
                  ) : c.type === "textarea" ? /* @__PURE__ */ r(
                    Oe,
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
                    Wr,
                    {
                      value: x[c.name] ?? "",
                      onValueChange: (h) => I(c.name, h),
                      children: [
                        /* @__PURE__ */ r(_e, { id: p, "aria-required": c.required, "aria-invalid": !!M, "aria-describedby": E, children: /* @__PURE__ */ r(Yr, { placeholder: c.placeholder ?? "Select…" }) }),
                        /* @__PURE__ */ r(Be, { children: (c.options ?? []).map((h) => /* @__PURE__ */ r(Ge, { value: h.value, children: h.label }, h.value)) })
                      ]
                    }
                  ) : c.type === "radio" ? /* @__PURE__ */ r(
                    Ie,
                    {
                      "aria-label": c.label,
                      "aria-required": c.required,
                      "aria-describedby": E,
                      value: x[c.name] ?? "",
                      onValueChange: (h) => I(c.name, h),
                      children: (c.options ?? []).map((h) => {
                        const ce = `${p}-${h.value}`;
                        return /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ r(Pe, { value: h.value, id: ce }),
                          /* @__PURE__ */ r(Y, { htmlFor: ce, className: "font-normal", children: h.label })
                        ] }, h.value);
                      })
                    }
                  ) : (
                    // checkbox
                    /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ r(
                        Te,
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
                        c.required && /* @__PURE__ */ r("span", { className: "text-destructive", children: " *" })
                      ] })
                    ] })
                  ),
                  c.hint && /* @__PURE__ */ r("p", { id: b, className: "text-muted-foreground", style: { fontSize: "var(--text-small)" }, children: c.hint }),
                  M && /* @__PURE__ */ r("p", { id: g, role: "alert", className: "text-destructive", style: { fontSize: "var(--text-small)" }, children: M })
                ] }, c.name);
              }) })
            ]
          },
          k.id
        ),
        /* @__PURE__ */ l("div", { className: "mt-6 flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ r(U, { type: "button", variant: "outline", onClick: O, disabled: u === 0, children: "Back" }),
          /* @__PURE__ */ r(U, { type: "submit", children: L ? "Submit" : "Next" })
        ] })
      ]
    }
  );
}
export {
  Wa as Accordion,
  bt as AccordionContent,
  ft as AccordionItem,
  gt as AccordionTrigger,
  yt as Alert,
  vt as AlertDescription,
  Ya as AlertDialog,
  kt as AlertDialogAction,
  Dt as AlertDialogCancel,
  wt as AlertDialogContent,
  Tt as AlertDialogDescription,
  Ct as AlertDialogFooter,
  St as AlertDialogHeader,
  Se as AlertDialogOverlay,
  Nt as AlertDialogPortal,
  Rt as AlertDialogTitle,
  Xa as AlertDialogTrigger,
  xt as AlertTitle,
  Mt as Avatar,
  It as AvatarFallback,
  zt as AvatarImage,
  At as Badge,
  Fo as Board,
  _t as Breadcrumb,
  Ot as BreadcrumbEllipsis,
  Ft as BreadcrumbItem,
  Bt as BreadcrumbLink,
  jt as BreadcrumbList,
  Gt as BreadcrumbPage,
  Lt as BreadcrumbSeparator,
  U as Button,
  Oo as COLOR_TOKENS,
  Et as Calendar,
  ae as Card,
  _o as CardCollection,
  oe as CardContent,
  $t as CardDescription,
  Ht as CardFooter,
  Ce as CardHeader,
  Re as CardTitle,
  Te as Checkbox,
  Me as Command,
  Za as CommandDialog,
  Qt as CommandEmpty,
  Zt as CommandGroup,
  Xt as CommandInput,
  tr as CommandItem,
  Jt as CommandList,
  er as CommandSeparator,
  rr as CommandShortcut,
  Ao as ComparisonTable,
  eo as ContextMenu,
  ir as ContextMenuCheckboxItem,
  nr as ContextMenuContent,
  ro as ContextMenuGroup,
  sr as ContextMenuItem,
  dr as ContextMenuLabel,
  ao as ContextMenuPortal,
  no as ContextMenuRadioGroup,
  lr as ContextMenuRadioItem,
  cr as ContextMenuSeparator,
  oo as ContextMenuSub,
  or as ContextMenuSubContent,
  ar as ContextMenuSubTrigger,
  to as ContextMenuTrigger,
  Eo as DENSITY_TOKENS,
  Po as DataTable,
  Vt as Dialog,
  Qa as DialogClose,
  De as DialogContent,
  Yt as DialogDescription,
  Kt as DialogFooter,
  Ut as DialogHeader,
  ke as DialogOverlay,
  qt as DialogPortal,
  Wt as DialogTitle,
  Ja as DialogTrigger,
  mr as Drawer,
  io as DrawerClose,
  pr as DrawerContent,
  hr as DrawerDescription,
  gr as DrawerFooter,
  fr as DrawerHeader,
  ze as DrawerOverlay,
  ur as DrawerPortal,
  br as DrawerTitle,
  so as DrawerTrigger,
  lo as DropdownMenu,
  wr as DropdownMenuCheckboxItem,
  vr as DropdownMenuContent,
  mo as DropdownMenuGroup,
  Nr as DropdownMenuItem,
  Cr as DropdownMenuLabel,
  uo as DropdownMenuPortal,
  fo as DropdownMenuRadioGroup,
  Sr as DropdownMenuRadioItem,
  Rr as DropdownMenuSeparator,
  Tr as DropdownMenuShortcut,
  po as DropdownMenuSub,
  xr as DropdownMenuSubContent,
  yr as DropdownMenuSubTrigger,
  co as DropdownMenuTrigger,
  $o as FONT_TOKENS,
  Bo as FormWizard,
  go as HoverCard,
  kr as HoverCardContent,
  bo as HoverCardTrigger,
  ie as Input,
  Y as Label,
  Ho as MOTION_TOKENS,
  Mr as Menubar,
  jr as MenubarCheckboxItem,
  Ar as MenubarContent,
  yo as MenubarGroup,
  _r as MenubarItem,
  Br as MenubarLabel,
  ho as MenubarMenu,
  Dr as MenubarPortal,
  vo as MenubarRadioGroup,
  Fr as MenubarRadioItem,
  Gr as MenubarSeparator,
  xo as MenubarSub,
  Pr as MenubarSubContent,
  Ir as MenubarSubTrigger,
  zr as MenubarTrigger,
  Lr as Pagination,
  Or as PaginationContent,
  Vr as PaginationEllipsis,
  Er as PaginationItem,
  de as PaginationLink,
  Hr as PaginationNext,
  $r as PaginationPrevious,
  No as Popover,
  So as PopoverAnchor,
  qr as PopoverContent,
  wo as PopoverTrigger,
  Ur as Progress,
  Vo as RADIUS_TOKENS,
  Ie as RadioGroup,
  Pe as RadioGroupItem,
  qo as SHADOW_TOKENS,
  Uo as SPACING_TOKENS,
  Ko as SURFACE_TOKENS,
  Kr as ScrollArea,
  Ae as ScrollBar,
  Wr as Select,
  Be as SelectContent,
  Co as SelectGroup,
  Ge as SelectItem,
  Xr as SelectLabel,
  Fe as SelectScrollDownButton,
  je as SelectScrollUpButton,
  Jr as SelectSeparator,
  _e as SelectTrigger,
  Yr as SelectValue,
  Qr as Separator,
  Ro as Sheet,
  ko as SheetClose,
  ta as SheetContent,
  na as SheetDescription,
  aa as SheetFooter,
  ra as SheetHeader,
  Le as SheetOverlay,
  Zr as SheetPortal,
  oa as SheetTitle,
  To as SheetTrigger,
  sa as Slider,
  jo as StatDashboard,
  ia as Switch,
  Ve as TOKEN_FAMILIES,
  Wo as TOKEN_NAMES,
  Yo as TYPE_TOKENS,
  la as Table,
  ca as TableBody,
  ga as TableCaption,
  fa as TableCell,
  ma as TableFooter,
  pa as TableHead,
  da as TableHeader,
  ua as TableRow,
  Do as Tabs,
  ya as TabsContent,
  ba as TabsList,
  ha as TabsTrigger,
  Oe as Textarea,
  xa as Toggle,
  va as ToggleGroup,
  Na as ToggleGroupItem,
  Ka as TokenPalette,
  we as TokenSwatch,
  zo as Tooltip,
  wa as TooltipContent,
  Mo as TooltipProvider,
  Io as TooltipTrigger,
  Pt as badgeVariants,
  A as buttonVariants,
  n as cn,
  Ee as toggleVariants,
  Xo as tokenVar,
  pt as useTokenColors
};
//# sourceMappingURL=index.js.map
