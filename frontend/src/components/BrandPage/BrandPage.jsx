import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import axios from "axios";
import { useCart } from "../../CartContext";

const API_BASE = "http://localhost:4000";

export default function BrandPage() {
  const { brandName } = useParams();
  const navigate = useNavigate();
  const { addItem, cart, increment, decrement } = useCart();

  const [brandWatches, setBrandWatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      try {
        document.documentElement && (document.documentElement.scrollTop = 0);
        document.body && (document.body.scrollTop = 0);
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (!brandName) return setBrandWatches([]);

    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `${API_BASE}/api/watches/brands/${encodeURIComponent(
          brandName
        )}`;
        const resp = await axios.get(url);
        const items = resp?.data?.items ?? resp?.data ?? [];
        const mapped = (items || []).map((it) => {
          const id = it._id ?? it.id;
          const rawPrice =
            typeof it.price === "number"
              ? it.price
              : Number(String(it.price ?? "").replace(/[^0-9.-]+/g, "")) || 0;
          let img = it.image ?? "";
          if (typeof img === "string" && img.startsWith("/"))
            img = `${API_BASE}${img}`;
          return {
            id: String(id),
            image: img || null,
            name: it.name ?? "",
            desc: it.description ?? "",
            priceDisplay: `₹${Number(rawPrice).toFixed(2)}`,
            price: rawPrice,
          };
        });
        if (!cancelled) setBrandWatches(mapped);
      } catch (err) {
        console.error("Failed to fetch brand watches:", err);
        if (!cancelled) setError("Failed to load watches. Try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [brandName]);

  const findInCart = (id) =>
    cart.find(
      (p) => String(p.id) === String(id) || String(p.productId) === String(id)
    );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="text-center">
          <div className="animate-pulse text-lg font-medium text-gray-700">
            Loading watches...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="max-w-lg text-center bg-white rounded-2xl shadow-lg p-8 border border-amber-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-amber-600 transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <ArrowLeft size={18} /> Go back
          </button>
        </div>
      </div>
    );
  }

  if (!brandWatches.length) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="max-w-lg text-center bg-white rounded-2xl shadow-lg p-8 border border-amber-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            No watches found
          </h2>
          <p className="text-gray-600 mb-6">
            This brand has no watches listed in our collection yet.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-amber-600 transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <ArrowLeft size={18} /> Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-fixed opacity-100 bg-center py-8 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-8 gap-6">
          <div className="flex items-center z-10">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-800 cursor-pointer transition-colors group"
              aria-label="Go back"
            >
              <div className="p-2 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 shadow-md transition-all">
                <ArrowLeft size={20} />
              </div>
              <span className="font-medium hidden sm:inline">Back</span>
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-white text-black rounded-full border border-gray-400 px-6 py-2 font-[pacifico] capitalize drop-shadow-md w-fit text-center">
              {brandName} Collections
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 relative z-10">
          {brandWatches.map((watch) => {
            const inCart = findInCart(watch.id);
            const displayedQty =
              inCart?.qty ?? inCart?.quantity ?? inCart?.count ?? 0;
            const targetId = inCart?.id ?? inCart?.productId ?? watch.id;

            return (
              <div
                key={watch.id}
                className="bg-white/95 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-48 md:h-56 lg:h-64 xl:h-55 overflow-hidden flex items-center justify-center p-4">
                  {watch.image ? (
                    <img
                      src={watch.image}
                      alt={watch.name}
                      className="h-full w-full object-cover transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                      No image
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h2 className="font-semibold text-gray-800 text-lg sm:text-xl mb-1 font-[pacifico] truncate">
                    {watch.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">
                    {watch.desc}
                  </p>

                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-600">
                      {watch.priceDisplay ?? `₹${watch.price.toFixed(2)}`}
                    </p>

                    {displayedQty > 0 ? (
                      <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">
                        <button
                          onClick={() => decrement(targetId)}
                          aria-label={`Decrease ${watch.name} quantity`}
                          className="p-1 rounded-full cursor-pointer transition"
                        >
                          <Minus size={16} />
                        </button>

                        <div className="px-3 text-sm font-medium w-10 text-center">
                          {displayedQty}
                        </div>

                        <button
                          onClick={() => increment(targetId)}
                          aria-label={`Increase ${watch.name} quantity`}
                          className="p-1 rounded-full cursor-pointer transition"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          addItem({
                            id: watch.id,
                            productId: watch.id,
                            name: watch.name,
                            price: watch.price,
                            img: watch.image,
                            qty: 1,
                          })
                        }
                        className="flex items-center cursor-pointer bg-gray-300 gap-1 hover:bg-gradient-to-r from-gray-300 to-gray-500 text-black px-3 py-1.5 rounded-xl transition-all duration-200 text-sm"
                      >
                        <span>Add</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
