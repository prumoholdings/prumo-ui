import * as React from "react";
import { UploadCloud, File as FileIcon, X } from "lucide-react";
import { cn } from "../../lib/utils";

/**
 * FileUpload — a drag-and-drop upload area + the uploaded-file list (CREATED;
 * Phase 64 creation loop, coverage-map gap #6). A dashed dropzone (real <button> +
 * drop target with a drag-active state) + a hidden file input + a file list with
 * progress + remove. Tokens via var(--*) only; a11y by construction.
 */
export interface UploadFile {
  id: string;
  name: string;
  size?: string;
  /** 0–100 while uploading; undefined / 100 = done. */
  progress?: number;
}

export interface FileUploadProps {
  onFiles?: (files: File[]) => void;
  files?: UploadFile[];
  onRemove?: (id: string) => void;
  accept?: string;
  multiple?: boolean;
  /** A small hint, e.g. "PDF or JPG, up to 10MB". */
  hint?: string;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

export function FileUpload({
  onFiles,
  files,
  onRemove,
  accept,
  multiple = true,
  hint,
  disabled,
  className,
  "aria-label": ariaLabel,
}: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = React.useState(false);
  const handleFiles = (list: FileList | null) => {
    if (list && list.length && onFiles) onFiles(Array.from(list));
  };
  return (
    <div className={cn("w-full", className)}>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => { e.preventDefault(); setDragActive(false); if (!disabled) handleFiles(e.dataTransfer.files); }}
        disabled={disabled}
        aria-label={ariaLabel ?? "Upload files"}
        className="flex w-full flex-col items-center justify-center gap-2 px-6 py-10 text-center outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        style={{
          borderRadius: "var(--radius-lg)",
          border: `1.5px dashed ${dragActive ? "var(--ring)" : "var(--border)"}`,
          background: dragActive ? "color-mix(in oklch, var(--primary) 6%, var(--background))" : "var(--background)",
          cursor: "pointer",
        }}
      >
        <span
          aria-hidden="true"
          className="flex h-11 w-11 items-center justify-center rounded-full [&_svg]:h-5 [&_svg]:w-5"
          style={{ background: "color-mix(in oklch, var(--muted) 60%, var(--card))", color: "var(--muted-foreground)" }}
        >
          <UploadCloud />
        </span>
        <span className="font-medium text-foreground" style={{ fontSize: "var(--text-small)" }}>
          <span style={{ color: "var(--primary)" }}>Click to upload</span> or drag and drop
        </span>
        {hint && (
          <span className="text-muted-foreground" style={{ fontSize: "var(--text-small)" }}>
            {hint}
          </span>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => handleFiles(e.target.files)}
      />

      {files && files.length > 0 && (
        <ul className="mt-3 flex flex-col gap-2">
          {files.map((f) => (
            <li
              key={f.id}
              className="flex items-center gap-3 px-3 py-2"
              style={{ borderRadius: "var(--radius-md)", border: "1px solid var(--border)", background: "var(--card)" }}
            >
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md [&_svg]:h-4 [&_svg]:w-4"
                style={{ background: "color-mix(in oklch, var(--muted) 60%, var(--card))", color: "var(--muted-foreground)" }}
              >
                <FileIcon />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="truncate font-medium text-foreground" style={{ fontSize: "var(--text-small)" }}>
                    {f.name}
                  </p>
                  {f.size && (
                    <span className="shrink-0 text-muted-foreground" style={{ fontSize: "var(--text-small)" }}>
                      {f.size}
                    </span>
                  )}
                </div>
                {typeof f.progress === "number" && f.progress < 100 && (
                  <div
                    className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full"
                    role="progressbar"
                    aria-valuenow={f.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Uploading ${f.name}`}
                    style={{ background: "var(--secondary)" }}
                  >
                    <div className="h-full rounded-full transition-[width]" style={{ width: `${f.progress}%`, background: "var(--primary)" }} />
                  </div>
                )}
              </div>
              {onRemove && (
                <button
                  type="button"
                  onClick={() => onRemove(f.id)}
                  aria-label={`Remove ${f.name}`}
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
