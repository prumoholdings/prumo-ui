import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Board, type BoardColumn } from "./board";
import { FormWizard, type WizardStep } from "./form-wizard";

afterEach(cleanup);

interface Task {
  id: string;
  title: string;
}
const columns: BoardColumn<Task>[] = [
  { id: "todo", title: "To do", cards: [{ id: "1", title: "First" }] },
  { id: "doing", title: "Doing", cards: [] },
];
const renderCard = (t: Task) => <span>{t.title}</span>;

describe("Board", () => {
  it("renders columns and cards axe-clean", async () => {
    const { container } = render(
      <Board columns={columns} renderCard={renderCard} aria-label="Board" />,
    );
    expect(screen.getByRole("group", { name: "Board" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "To do" })).toBeInTheDocument();
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("exposes keyboard-operable move buttons that call onMoveCard", () => {
    const onMove = vi.fn();
    render(<Board columns={columns} renderCard={renderCard} onMoveCard={onMove} />);
    const moveBtn = screen.getByRole("button", { name: "Move to Doing" });
    fireEvent.click(moveBtn);
    expect(onMove).toHaveBeenCalledWith("1", "todo", "doing");
  });

  it("renders per-column empty text", () => {
    render(<Board columns={columns} renderCard={renderCard} emptyColumnText="Nothing" />);
    expect(screen.getByText("Nothing")).toBeInTheDocument();
  });

  it("renders the whole-board empty state", async () => {
    const { container } = render(
      <Board columns={[]} renderCard={renderCard} emptyState="No columns." />,
    );
    expect(screen.getByText("No columns.")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });
});

const steps: WizardStep[] = [
  {
    id: "one",
    title: "Step one",
    fields: [{ name: "name", label: "Name", type: "text", required: true }],
  },
  {
    id: "two",
    title: "Step two",
    fields: [{ name: "bio", label: "Bio", type: "textarea" }],
  },
];

describe("FormWizard", () => {
  it("renders a form with fieldset/legend/labels axe-clean", async () => {
    const { container } = render(<FormWizard steps={steps} />);
    expect(screen.getByRole("group", { name: "Step one" })).toBeInTheDocument(); // fieldset
    expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("blocks advancing when a required field is empty and shows an error", () => {
    render(<FormWizard steps={steps} />);
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Name is required.");
    // still on step one
    expect(screen.getByRole("group", { name: "Step one" })).toBeInTheDocument();
  });

  it("advances to the next step when the required field is filled", () => {
    render(<FormWizard steps={steps} />);
    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: "Ada" } });
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByRole("group", { name: "Step two" })).toBeInTheDocument();
  });

  it("calls onSubmit with the collected values on the last step", () => {
    const onSubmit = vi.fn();
    render(<FormWizard steps={steps} onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: "Ada" } });
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    // step two has no required field
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ name: "Ada" }));
  });

  it("Back is disabled on the first step", () => {
    render(<FormWizard steps={steps} />);
    expect(screen.getByRole("button", { name: "Back" })).toBeDisabled();
  });

  it("renders the empty state with zero steps", async () => {
    const { container } = render(<FormWizard steps={[]} emptyState="No steps." />);
    expect(screen.getByText("No steps.")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("progress indicator marks the current step", () => {
    render(<FormWizard steps={steps} />);
    const current = screen.getByText("1");
    expect(current.getAttribute("aria-current")).toBe("step");
  });
});
