// src/pages/Add/AddPage.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  PlusCircle,
  IndianRupee,
  Trash2,
  Upload,
  Sparkles,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function AddPage() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeColor, setActiveColor] = useState("grey");
  const [category, setCategory] = useState("men");
  const [brandName, setBrandName] = useState("");

  const inputRef = useRef(null);
  const API_BASE = "http://localhost:4000";
  const BRANDS = [
    "Rolex",
    "Omega",
    "Audemars Piguet",
    "Cartier",
    "Brietling",
    "IWC",
    "Hublot",
    "Jaeger LeCoultre",
    "Tag Heuer",
    "Patek Philippe",
  ];

  const themes = {
    grey: {
      bg: "bg-gradient-to-r from-slate-50 to-slate-100",
      card: "bg-gradient-to-br from-white to-slate-50",
      border: "border-slate-200",
      button: "bg-gradient-to-r from-slate-700 to-slate-800",
    },
    blue: {
      bg: "bg-gradient-to-r from-blue-50 to-blue-100",
      card: "bg-gradient-to-br from-white to-blue-50",
      border: "border-blue-200",
      button: "bg-gradient-to-r from-blue-600 to-blue-700",
    },
    purple: {
      bg: "bg-gradient-to-r from-purple-50 to-purple-100",
      card: "bg-gradient-to-br from-white to-purple-50",
      border: "border-purple-200",
      button: "bg-gradient-to-r from-purple-600 to-purple-700",
    },
  };

  const theme = themes[activeColor];
  const inputClass = `w-full rounded-xl border ${theme.border} px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 transition shadow-sm`;

  useEffect(() => {
    if (!imageFile) {
      setImagePreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setImagePreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  useEffect(() => {
    if (category !== "brand") setBrandName("");
  }, [category]);

  const clearFileInput = () => {
    if (inputRef.current) inputRef.current.value = "";
    setImageFile(null);
    setImagePreviewUrl("");
  };

  const handleImageChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/"))
      return toast.error("Please select an image file");
    const maxMB = 5;
    if (f.size > maxMB * 1024 * 1024)
      return toast.error(`Image too large (max ${maxMB} MB)`);
    setImageFile(f);
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setCategory("men");
    setBrandName("");
    clearFileInput();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile || !name.trim() || !description.trim() || !price.trim())
      return toast.error("Please fill all fields and select an image.");
    if (isNaN(Number(price)) || Number(price) <= 0)
      return toast.error("Enter a valid price greater than 0.");
    if (category === "brand" && !brandName.trim())
      return toast.error("Please select the brand.");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("name", name.trim());
      formData.append("description", description.trim());
      formData.append("price", String(Number(price)));
      formData.append("category", category);
      if (category === "brand") {
        formData.append(
          "brandName",
          brandName.trim().toLowerCase().replace(/\s+/g, "-")
        );
      }

      const resp = await axios.post(`${API_BASE}/api/watches`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Saved:", resp?.data);
      toast.success("Watch added successfully!");
      resetForm();
    } catch (err) {
      console.error(err);
      const serverMsg =
        err?.response?.data?.message || err?.response?.data || null;
      toast.error(String(serverMsg || "Failed to add watch. Try again."));
    } finally {
      setLoading(false);
    }
  };

  const prettyCategory = (c) =>
    c === "men" ? "Men" : c === "women" ? "Women" : c === "brand" ? "Brand" : c;

  return (
    <div className={`min-h-screen ${theme.bg} py-12 pt-30 px-4`}>
      <ToastContainer position="top-right" autoClose={2500} />
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold font-[pacifico] text-slate-800">
            Add New Watch
          </h1>
          <div className="flex gap-2">
            {["grey", "blue", "purple"].map((c) => (
              <button
                key={c}
                onClick={() => setActiveColor(c)}
                aria-label={`${c} theme`}
                className={`w-8 h-8 rounded-full ${
                  c === "grey"
                    ? "bg-gradient-to-r from-slate-100 to-slate-200"
                    : c === "blue"
                    ? "bg-gradient-to-r from-blue-50 to-blue-100"
                    : "bg-gradient-to-r from-purple-50 to-purple-100"
                } border-2 ${activeColor === c ? "ring-2 ring-slate-300" : ""}`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form
            onSubmit={handleSubmit}
            className={`rounded-2xl border ${theme.border} shadow-lg p-6 flex flex-col gap-5 ${theme.card}`}
          >
            <div>
              <div className="mb-3 text-sm font-medium text-slate-700 flex items-center gap-2">
                <Upload className="w-4 h-4" /> Watch Image{" "}
                <span className="text-rose-500">*</span>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className={`w-32 h-32 rounded-xl border ${
                    theme.border
                  } flex items-center justify-center overflow-hidden shadow-sm ${
                    imagePreviewUrl ? "" : "bg-slate-50"
                  }`}
                >
                  {imagePreviewUrl ? (
                    <img
                      src={imagePreviewUrl}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <Image className="w-8 h-8" />
                      <div className="text-xs">No image</div>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="watch-image"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm cursor-pointer hover:bg-slate-50 transition shadow-sm"
                  >
                    <PlusCircle className="w-4 h-4 text-slate-700" />
                    <span className="text-slate-700 text-sm">Choose Image</span>
                    <input
                      id="watch-image"
                      ref={inputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>

                  {imagePreviewUrl && (
                    <button
                      type="button"
                      onClick={clearFileInput}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 text-sm hover:bg-slate-50 transition shadow-sm"
                    >
                      <Trash2 className="w-4 h-4 text-slate-600" /> Remove
                    </button>
                  )}
                  <p className="mt-3 text-xs text-slate-500">
                    Recommended: JPG/PNG. Max size: 5MB.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-2 text-sm font-medium text-slate-700">
                Watch Name <span className="text-rose-500">*</span>
              </div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Classic Silver Chrono"
                className={inputClass}
                required
                disabled={loading}
              />
            </div>

            <div>
              <div className="mb-2 text-sm font-medium text-slate-700">
                Category <span className="text-rose-500">*</span>
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClass}
                aria-label="Select category"
                disabled={loading}
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="brand">Brand</option>
              </select>
            </div>

            {category === "brand" && (
              <div>
                <div className="mb-2 text-sm font-medium text-slate-700">
                  Brand <span className="text-rose-500">*</span>
                </div>
                <select
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className={inputClass}
                  required
                  disabled={loading}
                >
                  <option value="">Select brand</option>
                  {BRANDS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <div className="mb-2 text-sm font-medium text-slate-700">
                Description <span className="text-rose-500">*</span>
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Short description about the watch"
                className={`${inputClass} resize-none`}
                required
                disabled={loading}
              />
            </div>

            <div>
              <div className="mb-2 text-sm font-medium text-slate-700">
                Price (INR) <span className="text-rose-500">*</span>
              </div>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="199.99"
                  inputMode="decimal"
                  className={`w-full rounded-xl border ${theme.border} pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 transition shadow-sm`}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="mt-3">
              <button
                type="submit"
                disabled={loading}
                className={`w-full inline-flex items-center justify-center gap-3 rounded-full px-6 py-3.5 text-white font-semibold transition shadow-lg ${
                  theme.button
                } ${
                  loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <PlusCircle className="w-5 h-5" />
                <span className="text-sm">
                  {loading ? "Adding..." : "Add Watch"}
                </span>
              </button>
            </div>
          </form>

          <div className="flex flex-col gap-4">
            <div
              className={`rounded-2xl border ${theme.border} shadow-lg p-5 ${theme.card}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-md font-semibold text-slate-700 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Preview
                </div>
              </div>

              <div
                className={`rounded-xl border ${theme.border} overflow-hidden shadow-md bg-white`}
              >
                {imagePreviewUrl ? (
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={imagePreviewUrl}
                      alt="watch"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/70 text-white text-xs">
                      New
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-64 flex items-center justify-center bg-slate-50 text-slate-400">
                    <Image className="w-12 h-12" />
                  </div>
                )}

                <div className="p-5">
                  <h3 className="text-xl font-bold text-slate-800">
                    {name || "Watch name"}
                  </h3>
                  <div className="mt-2 text-sm text-slate-600">
                    <strong>Category:</strong> {prettyCategory(category)}
                    {category === "brand" && brandName && (
                      <span className="ml-2 text-slate-500">({brandName})</span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-slate-600 min-h-[60px]">
                    {description || "Watch description will appear here."}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <div className="text-sm text-slate-500">Price</div>
                    <div className="text-xl font-bold text-slate-800">
                      {price ? `₹${Number(price).toFixed(2)}` : "₹0.00"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
