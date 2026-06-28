import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { FileUpload, type UploadFile } from "./file-upload";

const meta: Meta<typeof FileUpload> = {
  title: "Composites/FileUpload",
  component: FileUpload,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof FileUpload>;

/** Upload supporting documents — dropzone + a file list (one uploading, one done). */
function Demo() {
  const [files, setFiles] = React.useState<UploadFile[]>([
    { id: "1", name: "proof-of-address.pdf", size: "1.2 MB" },
    { id: "2", name: "birth-certificate.jpg", size: "3.4 MB", progress: 60 },
  ]);
  return (
    <div style={{ maxWidth: "32rem" }}>
      <FileUpload
        aria-label="Upload supporting documents"
        hint="PDF or JPG, up to 10MB"
        files={files}
        onFiles={(fs) =>
          setFiles((prev) => [
            ...prev,
            ...fs.map((f, i) => ({ id: `new-${prev.length + i}`, name: f.name, size: `${Math.max(1, Math.round(f.size / 1024))} KB` })),
          ])
        }
        onRemove={(id) => setFiles((prev) => prev.filter((f) => f.id !== id))}
      />
    </div>
  );
}

export const Default: Story = { render: () => <Demo /> };

/** Empty — just the dropzone. */
export const Empty: Story = {
  args: { hint: "PDF or JPG, up to 10MB", "aria-label": "Upload files" },
  render: (args) => (
    <div style={{ maxWidth: "32rem" }}>
      <FileUpload {...args} />
    </div>
  ),
};
