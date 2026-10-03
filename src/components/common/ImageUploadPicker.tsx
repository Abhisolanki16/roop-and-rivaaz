"use client";

import React, { useRef, useState } from "react";
import { uploadImageToFirebase } from "@/lib/uploadImage";
import { storage } from "@/lib/firebase";
import {
  UploadCloud,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Link as LinkIcon,
  X,
  Smartphone,
  Laptop,
} from "lucide-react";

interface ImageUploadPickerProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  folder?: "products" | "banners" | "edits" | "general";
  presetUrls?: { label: string; url: string }[];
  required?: boolean;
}

export default function ImageUploadPicker({
  label = "Image",
  value,
  onChange,
  folder = "products",
  presetUrls,
  required = false,
}: ImageUploadPickerProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WEBP, etc.)");
      return;
    }

    // Limit to 10MB
    if (file.size > 10 * 1024 * 1024) {
      setError("Image file size should be less than 10MB");
      return;
    }

    try {
      setError(null);
      setUploading(true);
      setProgress(5);

      const url = await uploadImageToFirebase(file, {
        folder,
        onProgress: (p) => setProgress(p),
      });

      onChange(url);
      setUploading(false);
      setProgress(100);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to upload image. Please try again.");
      setUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-[#35141f]">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[10px] text-[#7b1e3a] hover:underline flex items-center gap-1 font-medium cursor-pointer"
        >
          <LinkIcon size={11} /> {showUrlInput ? "Hide Direct URL" : "Paste URL Manually"}
        </button>
      </div>

      {/* Main Upload Box & Preview Area */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* Thumbnail Preview */}
        <div className="sm:col-span-3">
          <div className="relative aspect-square w-full max-w-[130px] rounded-xs overflow-hidden border border-[#e8ddcd] bg-[#fcfaf5] flex items-center justify-center group shadow-2xs">
            {value ? (
              <>
                <img
                  src={value}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback on broken URL
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80";
                  }}
                />
                <button
                  type="button"
                  onClick={() => onChange("")}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  title="Remove image"
                >
                  <X size={12} />
                </button>
              </>
            ) : (
              <div className="text-center p-2 text-[#746863]/60">
                <ImageIcon size={28} className="mx-auto mb-1 stroke-1" />
                <span className="text-[9px] uppercase tracking-wider block">No Photo</span>
              </div>
            )}
          </div>
        </div>

        {/* Upload Trigger Dropzone */}
        <div className="sm:col-span-9 space-y-2">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xs p-3.5 sm:p-4 text-center cursor-pointer transition-all ${
              isDragOver
                ? "border-[#7b1e3a] bg-[#7b1e3a]/5"
                : "border-[#d8cbc6] hover:border-[#c5902f] bg-white hover:bg-[#fcfaf5]"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleInputChange}
            />

            {uploading ? (
              <div className="space-y-2 py-1">
                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#7b1e3a]">
                  <Loader2 size={16} className="animate-spin text-[#c5902f]" />
                  <span>Uploading to Firebase Storage ({progress}%)...</span>
                </div>
                <div className="w-full bg-[#f4ecdf] h-1.5 rounded-full overflow-hidden max-w-xs mx-auto">
                  <div
                    className="bg-[#7b1e3a] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="w-8 h-8 rounded-full bg-[#f4ecdf] text-[#7b1e3a] mx-auto flex items-center justify-center">
                  <UploadCloud size={16} />
                </div>
                <p className="text-xs font-semibold text-[#35141f]">
                  <span className="text-[#7b1e3a] underline">Click to choose image</span> or drag & drop
                </p>
                <div className="flex items-center justify-center gap-3 text-[10px] text-[#746863]">
                  <span className="flex items-center gap-1">
                    <Smartphone size={11} /> Phone Camera & Gallery
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Laptop size={11} /> Laptop / PC File
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Optional manual URL input */}
          {showUrlInput && (
            <div className="pt-1">
              <input
                type="url"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Or paste external image URL (https://...)"
                className="w-full px-3 py-1.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
              />
            </div>
          )}

          {/* Quick presets picker */}
          {presetUrls && presetUrls.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] text-[#746863] font-semibold">Presets:</span>
              {presetUrls.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onChange(preset.url)}
                  className="text-[10px] px-2 py-0.5 rounded-xs bg-[#f4ecdf] hover:bg-[#e8ddcd] text-[#35141f] border border-[#e8ddcd] transition-colors cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="text-[11px] text-red-600 flex items-center gap-1.5 bg-red-50 p-2 rounded-xs border border-red-200">
          <AlertCircle size={13} /> {error}
        </div>
      )}
    </div>
  );
}
