import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Board, type BoardColumn } from "./board";
import { Badge } from "../ui/badge";

interface Task {
  id: string;
  title: string;
  assignee: string;
  priority: "low" | "med" | "high";
}

const initial: BoardColumn<Task>[] = [
  {
    id: "todo",
    title: "To do",
    accentToken: "muted-foreground",
    cards: [
      { id: "1", title: "Draft spec", assignee: "AR", priority: "high" },
      { id: "2", title: "Collect data", assignee: "GH", priority: "med" },
    ],
  },
  {
    id: "doing",
    title: "In progress",
    accentToken: "primary",
    cards: [{ id: "3", title: "Build prototype", assignee: "AL", priority: "high" }],
  },
  { id: "done", title: "Done", accentToken: "accent", cards: [] },
];

const renderCard = (task: Task) => (
  <div>
    <div className="flex items-center justify-between gap-2">
      <span className="font-medium text-foreground" style={{ fontSize: "var(--text-small)" }}>
        {task.title}
      </span>
      <Badge variant={task.priority === "high" ? "destructive" : "secondary"}>{task.priority}</Badge>
    </div>
    <p className="mt-1 text-muted-foreground" style={{ fontSize: "var(--text-small)" }}>
      {task.assignee}
    </p>
  </div>
);

const meta: Meta<typeof Board<Task>> = {
  title: "Composites/Board",
  component: Board,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Board<Task>>;

/** Horizontal columns on desktop; resize below ~768px to see them stack
 * vertically (one DOM tree). Move buttons are keyboard-operable. */
export const Default: Story = {
  render: () => {
    const [columns, setColumns] = React.useState(initial);
    const onMoveCard = (cardId: string, fromId: string, toId: string) => {
      setColumns((cols) => {
        const card = cols.flatMap((c) => c.cards).find((c) => c.id === cardId);
        if (!card) return cols;
        return cols.map((c) => {
          if (c.id === fromId) return { ...c, cards: c.cards.filter((x) => x.id !== cardId) };
          if (c.id === toId) return { ...c, cards: [...c.cards, card] };
          return c;
        });
      });
    };
    return <Board columns={columns} renderCard={renderCard} onMoveCard={onMoveCard} aria-label="Sprint board" />;
  },
};

export const EmptyColumns: Story = {
  args: {
    columns: [
      { id: "a", title: "Backlog", cards: [] },
      { id: "b", title: "Active", cards: [] },
    ],
    renderCard,
    emptyColumnText: "Drop items here",
  },
};

export const Empty: Story = {
  args: { columns: [], renderCard, emptyState: "Create a column to get started." },
};
