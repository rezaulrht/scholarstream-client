import { useState, useEffect } from "react";
import { HiOutlineX, HiOutlineExternalLink, HiOutlineDocument, HiOutlinePhotograph, HiOutlineDocumentText, HiOutlinePaperClip } from "react-icons/hi";

// R2 key format: applications/{email}/{Date.now()}-{randomHex}-{originalName}
// Raw last segment: "1748000000000-a1b2c3d4-transcript.pdf"
const extractFilename = (url) => {
  const raw = url.split("/").pop();
  const parts = raw.split("-");
  return parts.slice(2).join("-");
};

const getFileType = (filename) => {
  const ext = filename.split(".").pop().toLowerCase();
  if (ext === "pdf") return "pdf";
  if (["jpg", "jpeg", "png"].includes(ext)) return "image";
  if (["doc", "docx"].includes(ext)) return "word";
  return "other";
};

const getFileIcon = (type, className = "text-xl") => {
  switch (type) {
    case "pdf":   return <HiOutlineDocument className={className} />;
    case "image": return <HiOutlinePhotograph className={className} />;
    case "word":  return <HiOutlineDocumentText className={className} />;
    default:      return <HiOutlinePaperClip className={className} />;
  }
};

const FILE_LABELS = { pdf: "PDF", image: "Image", word: "Word", other: "File" };

const DocumentViewerModal = ({ isOpen, onClose, documentUrls = [], title = "" }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (isOpen) setActiveIndex(0);
  }, [isOpen]);

  if (!isOpen || !documentUrls || documentUrls.length === 0) return null;

  const files = documentUrls.map((url) => {
    const filename = extractFilename(url);
    const type = getFileType(filename);
    return { url, filename, type };
  });

  const active = files[activeIndex];
  const fileCountLabel = `${files.length} ${files.length === 1 ? "file" : "files"}`;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-4xl w-full h-[80vh] max-h-[80vh] p-0 flex flex-col bg-base-300 border border-base-content/10">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-base-content/10 bg-primary/5 flex-shrink-0">
          <h3 className="font-bold text-lg text-base-content truncate">
            <HiOutlinePaperClip className="inline-block mr-1" /> Supporting Documents — {title}
          </h3>
          <button onClick={onClose} className="btn btn-sm btn-ghost btn-circle flex-shrink-0">
            <HiOutlineX className="text-lg" />
          </button>
        </div>

        {/* Desktop: sidebar + viewer */}
        <div className="hidden lg:flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-56 flex-shrink-0 border-r border-base-content/10 overflow-y-auto bg-base-200/50 p-2">
            <p className="text-xs font-bold text-base-content/50 uppercase tracking-wider px-2 py-2">
              {fileCountLabel}
            </p>
            {files.map((file, i) => (
              <button
                key={file.url}
                onClick={() => setActiveIndex(i)}
                className={`w-full flex items-start gap-2 px-3 py-2 rounded-lg text-left transition-colors mb-1 ${
                  i === activeIndex
                    ? "bg-primary/15 border border-primary/25 text-primary"
                    : "hover:bg-base-content/5 text-base-content"
                }`}
              >
                <span className="mt-0.5 flex-shrink-0">{getFileIcon(file.type)}</span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate">{file.filename}</p>
                  <p className="text-xs text-base-content/50">{FILE_LABELS[file.type]}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Viewer */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-base-content/10 bg-base-200/30 flex-shrink-0">
              <span className="text-sm font-semibold text-base-content truncate">{active.filename}</span>
              <a
                href={active.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-xs btn-ghost text-primary gap-1 flex-shrink-0"
              >
                <HiOutlineExternalLink /> Open in new tab
              </a>
            </div>
            <div className="flex-1 overflow-hidden bg-base-100">
              {active.type === "pdf" && (
                <iframe src={active.url} className="w-full h-full border-0" title={active.filename} />
              )}
              {active.type === "image" && (
                <div className="w-full h-full flex items-center justify-center p-4 bg-base-200/50">
                  <img
                    src={active.url}
                    alt={active.filename}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                  />
                </div>
              )}
              {active.type === "word" && (
                <iframe
                  src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(active.url)}`}
                  className="w-full h-full border-0"
                  title={active.filename}
                />
              )}
              {active.type === "other" && (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-base-content/50">
                  {getFileIcon("other", "text-6xl")}
                  <p className="text-sm">Preview not available for this file type.</p>
                  <a
                    href={active.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm gap-1"
                  >
                    <HiOutlineExternalLink /> Download / Open
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile: file list, open in new tab */}
        <div className="lg:hidden flex-1 overflow-y-auto p-4 space-y-3">
          <p className="text-xs font-bold text-base-content/50 uppercase tracking-wider mb-3">
            {fileCountLabel}
          </p>
          {files.map((file) => (
            <a
              key={file.url}
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-base-200 border border-base-content/10 hover:bg-primary/10 hover:border-primary/30 transition-colors"
            >
              <span className="text-2xl">{getFileIcon(file.type, "text-2xl")}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-base-content truncate">{file.filename}</p>
                <p className="text-xs text-base-content/50">{FILE_LABELS[file.type]}</p>
              </div>
              <HiOutlineExternalLink className="text-primary flex-shrink-0" />
            </a>
          ))}
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </div>
  );
};

export default DocumentViewerModal;
