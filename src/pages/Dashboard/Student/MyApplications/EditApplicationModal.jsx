import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import {
  HiOutlineDocument,
  HiOutlinePhotograph,
  HiOutlineDocumentText,
  HiOutlinePaperClip,
  HiOutlineX,
} from "react-icons/hi";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ACCEPTED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

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

const getFileIcon = (type, className = "text-base") => {
  switch (type) {
    case "pdf":   return <HiOutlineDocument className={className} />;
    case "image": return <HiOutlinePhotograph className={className} />;
    case "word":  return <HiOutlineDocumentText className={className} />;
    default:      return <HiOutlinePaperClip className={className} />;
  }
};

const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const EditApplicationModal = ({ application, isOpen, onClose, onSuccess }) => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [removedUrls, setRemovedUrls] = useState([]);
  const [pendingFiles, setPendingFiles] = useState([]);

  useEffect(() => {
    if (application) {
      reset({
        phone: application.phone || "",
        dateOfBirth: application.dateOfBirth || "",
        gender: application.gender || "",
        currentUniversity: application.currentUniversity || "",
        cgpa: application.cgpa || "",
      });
      setRemovedUrls([]);
      setPendingFiles([]);
    }
  }, [application, reset]);

  const visibleUrls = (application?.documentUrls ?? []).filter(
    (u) => !removedUrls.includes(u)
  );
  const totalCount = visibleUrls.length + pendingFiles.length;
  const canAddMore = totalCount < 5;

  const uploadDocuments = async (files) => {
    const { data: urlPairs } = await axiosSecure.post("/upload-url", {
      files: files.map((f) => ({ fileName: f.name, fileType: f.type })),
    });
    if (!Array.isArray(urlPairs) || urlPairs.length !== files.length) {
      throw new Error("Unexpected response from upload server");
    }
    await Promise.all(
      urlPairs.map(({ uploadUrl }, i) => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30000);
        return fetch(uploadUrl, {
          method: "PUT",
          body: files[i],
          headers: { "Content-Type": files[i].type },
          signal: controller.signal,
        })
          .then((res) => {
            if (!res.ok) throw new Error(`Failed to upload ${files[i].name}`);
          })
          .finally(() => clearTimeout(timeout));
      })
    );
    return urlPairs.map(({ fileUrl }) => fileUrl);
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files || []);
    e.target.value = "";
    if (selected.length === 0) return;

    const valid = [];
    for (const file of selected) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 5MB`);
        continue;
      }
      if (!ACCEPTED_TYPES.includes(file.type)) {
        toast.error(`${file.name} has an unsupported file type`);
        continue;
      }
      valid.push(file);
    }
    if (valid.length === 0) return;

    setPendingFiles((prev) => {
      const remaining = 5 - visibleUrls.length - prev.length;
      if (remaining <= 0) {
        toast.error("Maximum 5 files allowed in total");
        return prev;
      }
      const toAdd = valid.slice(0, remaining);
      if (toAdd.length < valid.length) {
        toast.error(`Only ${toAdd.length} file${toAdd.length === 1 ? "" : "s"} added — maximum 5 reached`);
      }
      return [...prev, ...toAdd];
    });
  };

  const onSubmit = async (data) => {
    let newUrls = [];
    if (pendingFiles.length > 0) {
      try {
        newUrls = await uploadDocuments(pendingFiles);
      } catch (err) {
        toast.error(err.message || "File upload failed. Please try again.");
        return;
      }
    }

    const finalUrls = [...visibleUrls, ...newUrls];

    try {
      await axiosSecure.patch(`/applications/${application._id}`, {
        phone: data.phone,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        currentUniversity: data.currentUniversity,
        cgpa: data.cgpa,
        documentUrls: finalUrls,
      });

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Application has been updated successfully",
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating application:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to update application",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-xl mb-4">Edit Application</h3>
        <p className="text-sm text-base-content/70 mb-4">
          Update your application details for {application?.scholarshipName}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Phone */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone Number *</span>
            </label>
            <input
              type="tel"
              {...register("phone", { required: true })}
              className="input input-bordered w-full"
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <span className="text-error text-sm mt-1">This field is required</span>
            )}
          </div>

          {/* Date of Birth */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date of Birth *</span>
            </label>
            <input
              type="date"
              {...register("dateOfBirth", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.dateOfBirth && (
              <span className="text-error text-sm mt-1">This field is required</span>
            )}
          </div>

          {/* Gender */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Gender *</span>
            </label>
            <select
              {...register("gender", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <span className="text-error text-sm mt-1">This field is required</span>
            )}
          </div>

          {/* Current University */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Current University *</span>
            </label>
            <input
              type="text"
              {...register("currentUniversity", { required: true })}
              className="input input-bordered w-full"
              placeholder="Enter your current university"
            />
            {errors.currentUniversity && (
              <span className="text-error text-sm mt-1">This field is required</span>
            )}
          </div>

          {/* CGPA */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">CGPA (Out of 4) *</span>
            </label>
            <input
              type="number"
              step="0.01"
              {...register("cgpa", {
                required: true,
                min: { value: 0, message: "CGPA must be at least 0" },
                max: { value: 4, message: "CGPA must not exceed 4" },
                valueAsNumber: true,
              })}
              className="input input-bordered w-full"
              placeholder="Enter CGPA (0-4)"
            />
            {errors.cgpa && (
              <span className="text-error text-sm mt-1">
                {errors.cgpa.message || "This field is required"}
              </span>
            )}
          </div>

          {/* Supporting Documents */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Supporting Documents</span>
              <span className="label-text-alt text-base-content/50">{totalCount}/5 files</span>
            </label>

            {/* Existing files */}
            {visibleUrls.length > 0 && (
              <div className="space-y-1 mb-2">
                {visibleUrls.map((url) => {
                  const filename = extractFilename(url);
                  const type = getFileType(filename);
                  return (
                    <div
                      key={url}
                      className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-base-200/60 border border-base-content/10"
                    >
                      <div className="flex items-center gap-2 text-sm min-w-0">
                        {getFileIcon(type)}
                        <span className="truncate">{filename}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setRemovedUrls((prev) => [...prev, url])}
                        className="btn btn-ghost btn-xs text-error hover:bg-error/10 flex-shrink-0"
                        aria-label="Remove file"
                      >
                        <HiOutlineX />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pending (newly added) files */}
            {pendingFiles.length > 0 && (
              <div className="space-y-1 mb-2">
                {pendingFiles.map((file, i) => {
                  const type = getFileType(file.name);
                  return (
                    <div
                      key={`${file.name}-${i}`}
                      className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/20"
                    >
                      <div className="flex items-center gap-2 text-sm min-w-0">
                        {getFileIcon(type)}
                        <span className="truncate">{file.name}</span>
                        <span className="text-base-content/40 text-xs flex-shrink-0">
                          {formatBytes(file.size)}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setPendingFiles((prev) => prev.filter((_, idx) => idx !== i))
                        }
                        className="btn btn-ghost btn-xs text-error hover:bg-error/10 flex-shrink-0"
                        aria-label="Remove file"
                      >
                        <HiOutlineX />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* File input or cap notice */}
            {canAddMore ? (
              <label className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-dashed border-base-content/20 hover:border-primary/40 cursor-pointer transition-colors">
                <HiOutlinePaperClip className="text-base-content/40" />
                <span className="text-sm text-base-content/50">
                  Add files (PDF, Word, JPG, PNG — max 5MB each)
                </span>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <p className="text-sm text-base-content/40 px-1">
                Maximum 5 files reached
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Updating...
                </>
              ) : (
                "Update Application"
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={isSubmitting ? undefined : onClose}></div>
    </div>
  );
};

export default EditApplicationModal;
