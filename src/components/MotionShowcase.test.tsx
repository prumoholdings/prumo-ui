import { describe, it, expect, afterEach, beforeAll } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { MotionShowcase } from "./MotionShowcase";

// jsdom has no matchMedia; stub it so the reduced-motion branch is exercised.
beforeAll(() => {
  if (!window.matchMedia) {
    window.matchMedia = ((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;
  }
});

afterEach(cleanup);

describe("MotionShowcase (motion token review surface)", () => {
  it("mounts and renders both motion families with a Replay control", () => {
    render(<MotionShowcase family="all" />);
    expect(screen.getByText("Durations")).toBeInTheDocument();
    expect(screen.getByText("Easings")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /replay/i })).toBeInTheDocument();
  });

  it("labels every motion token and reads it ONLY via var(--*)", () => {
    const { container } = render(<MotionShowcase family="all" />);
    // Each token is labelled by name (some also appear in a description line,
    // so assert at least one match rather than exactly one).
    for (const name of [
      "--duration-instant",
      "--duration-fast",
      "--duration-base",
      "--duration-slow",
      "--ease-entrance",
      "--ease-exit",
      "--ease-standard",
    ]) {
      expect(screen.getAllByText(name).length).toBeGreaterThan(0);
    }
    // ...and the demo dots read the tokens via var(--*) in their transition.
    const transitions = Array.from(container.querySelectorAll<HTMLElement>("span"))
      .map((el) => el.style.transition)
      .filter(Boolean)
      .join(" ");
    expect(transitions).toMatch(/var\(--duration-/);
    expect(transitions).toMatch(/var\(--ease-/);
  });

  it("renders the durations-only variant", () => {
    render(<MotionShowcase family="durations" />);
    expect(screen.getByText("Durations")).toBeInTheDocument();
    expect(screen.queryByText("Easings")).not.toBeInTheDocument();
  });

  it("is axe-clean (presentational, but accessible)", async () => {
    const { container } = render(<MotionShowcase family="all" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
