// src/pages/List/ListPage.jsx
import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ListPage() {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const API_BASE = "http://localhost:4000";
  const LIST_PATH = "/api/watches";

  const mapServerToUI = (item) => {
    let img = item.image ?? item.img ?? "";
    if (typeof img === "string" && img.startsWith("/"))
      img = `${API_BASE}${img}`;
    return {
      id: item._id,
      name: item.name,
      desc: item.description ?? "",
      price: item.price,
      category: item.category ?? "Brand",
      brand: item.brandName ?? "",
      img,
    };
  };

  useEffect(() => {
    let mounted = true;
    const fetchWatches = async () => {
      setLoading(true);
      try {
        const resp = await axios.get(`${API_BASE}${LIST_PATH}`);
        const data = resp.data;
        const items = Array.isArray(data)
          ? data
          : Array.isArray(data?.items)
          ? data.items
          : Array.isArray(data?.watches)
          ? data.watches
          : null;

        if (!items) {
          if (mounted) {
            setWatches([]);
            toast.info("No watches returned from server.");
          }
        } else if (mounted) {
          setWatches(items.map(mapServerToUI));
        }
      } catch (err) {
        console.error("Failed to fetch watches:", err);
        if (mounted) {
          setWatches([]);
          toast.error("Could not fetch watches from server.");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchWatches();
    return () => {
      mounted = false;
    };
  }, []);

  async function handleDelete(id) {
    const prev = watches.slice();
    setWatches((list) => list.filter((w) => w.id !== id));
    setDeletingId(id);
    try {
      await axios.delete(`${API_BASE}${LIST_PATH}/${id}`);
      toast.success("Watch deleted successfully.");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete item. Restoring list.");
      setWatches(prev);
    } finally {
      setDeletingId(null);
    }
  }

  const getCategoryLabel = (watch) => {
    const cat = String(watch.category ?? "").toLowerCase();
    if (cat === "men") return "Men";
    if (cat === "women") return "Women";
    if (cat === "brand" || watch.brand) return watch.brand || "Brand";
    return watch.category || "";
  };

  return (
    <div className="min-h-screen pt-30 bg-gray-50 p-6 font-sans text-gray-800">
      <ToastContainer />
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-[pacifico] font-extrabold tracking-tight">
            Watch Collection
          </h1>
        </header>

        <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {watches.map((watch) => (
            <article
              key={watch.id}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative h-44 rounded-xl overflow-hidden flex items-center justify-center">
                {watch.img ? (
                  <img
                    src={watch.img}
                    alt={watch.name}
                    className="object-contain w-full h-full"
                    onError={(e) => {
                      e.currentTarget.style.objectFit = "contain";
                      e.currentTarget.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23f8fafc'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='Arial' font-size='16'%3EImage not available%3C/text%3E%3C/svg%3E";
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-50 text-gray-400">
                    No image
                  </div>
                )}
              </div>

              <div className="mt-3 flex flex-col gap-2">
                <h3 className="text-lg font-semibold tracking-tight text-gray-800 font-[pacifico]">
                  {watch.name}
                </h3>
                <p className="text-sm text-gray-500">{watch.desc}</p>

                <div className="flex items-center gap-2 text-sm mt-2">
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                    {getCategoryLabel(watch)}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="text-lg font-bold">₹{watch.price}</div>
                  <button
                    onClick={() => handleDelete(watch.id)}
                    className="cursor-pointer inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                    disabled={deletingId === watch.id}
                    aria-disabled={deletingId === watch.id}
                  >
                    <Trash2 size={16} />
                    {deletingId === watch.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        {!loading && (!watches || watches.length === 0) && (
          <p className="text-center text-gray-500 mt-8">No items found.</p>
        )}
      </div>
    </div>
  );
}
