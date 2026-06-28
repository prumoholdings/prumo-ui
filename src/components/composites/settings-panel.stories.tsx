import type { Meta, StoryObj } from "@storybook/react";
import { SettingsPanel } from "./settings-panel";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const meta: Meta<typeof SettingsPanel> = {
  title: "Composites/SettingsPanel",
  component: SettingsPanel,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof SettingsPanel>;

const radius = (
  <Select defaultValue="3">
    <SelectTrigger className="h-9 min-h-0 w-[140px]" aria-label="Default search radius">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="1">1 mile</SelectItem>
      <SelectItem value="3">3 miles</SelectItem>
      <SelectItem value="5">5 miles</SelectItem>
    </SelectContent>
  </Select>
);

const digest = (
  <Select defaultValue="weekly">
    <SelectTrigger className="h-9 min-h-0 w-[140px]" aria-label="Digest frequency">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="off">Off</SelectItem>
      <SelectItem value="weekly">Weekly</SelectItem>
      <SelectItem value="daily">Daily</SelectItem>
    </SelectContent>
  </Select>
);

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: "44rem" }}>
      <SettingsPanel
        aria-label="Settings"
        sections={[
          {
            id: "notifications",
            title: "Notifications",
            description: "How we keep you updated on schools you're tracking.",
            rows: [
              { id: "tour", label: "Tour reminders", description: "Email me the day before a booked school tour.", control: <Switch defaultChecked aria-label="Tour reminders" /> },
              { id: "new", label: "New schools in your area", description: "Notify me when a school is added near your postcode.", control: <Switch aria-label="New schools" /> },
              { id: "digest", label: "Weekly digest", description: "A summary of updates to your shortlist.", control: digest },
            ],
          },
          {
            id: "search",
            title: "Search defaults",
            rows: [
              { id: "postcode", label: "Home postcode", description: "Used to calculate catchment distance.", control: <Input defaultValue="NW1 8XX" aria-label="Home postcode" className="w-40" /> },
              { id: "radius", label: "Default search radius", control: radius },
            ],
          },
          {
            id: "privacy",
            title: "Privacy",
            rows: [
              { id: "share", label: "Share my shortlist", description: "Let family members view the schools you've shortlisted.", control: <Switch aria-label="Share shortlist" /> },
            ],
          },
        ]}
      />
    </div>
  ),
};
