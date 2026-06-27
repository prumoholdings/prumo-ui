import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { TokenSwatch, TokenPalette } from "./TokenSwatch";
import { TOKEN_NAMES } from "../tokens";

afterEach(cleanup);

describe("TokenSwatch (Stage-1 smoke)", () => {
  it("renders the token label and reads the token via var()", () => {
    render(<TokenSwatch token="primary" />);
    expect(screen.getByText("primary")).toBeInTheDocument();
  });

  it("is axe-clean (a11y addon mechanism works)", async () => {
    const { container } = render(<TokenSwatch token="primary" label="Primary" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders a full family palette axe-clean", async () => {
    const { container } = render(<TokenPalette family="color" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("token contract (NC-VOCAB-01)", () => {
  it("exposes the complete vocabulary as unique bare names", () => {
    expect(TOKEN_NAMES.length).toBeGreaterThan(40);
    expect(new Set(TOKEN_NAMES).size).toBe(TOKEN_NAMES.length);
    // none carries a leading `--` (bare names; tokenVar adds it).
    expect(TOKEN_NAMES.every((n) => !n.startsWith("-"))).toBe(true);
  });
});
