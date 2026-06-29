import * as React from "react";
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
export declare function FileUpload({ onFiles, files, onRemove, accept, multiple, hint, disabled, className, "aria-label": ariaLabel, }: FileUploadProps): React.JSX.Element;
