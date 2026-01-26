// src/pages/WatchPage.jsx
import React, { useState, useMemo, useEffect } from "react";
import { Grid, User, Users, ShoppingCart, Minus, Plus } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../../CartContext.jsx"; // adjust path if needed
import { WATCHES as DUMMY_WATCHES, FILTERS as RAW_FILTERS } from "./dummydata";

const ICON_MAP = { Grid, User, Users };
const FILTERS = RAW_FILTERS?.length
  ? RAW_FILTERS.map((f) => ({ ...f, icon: ICON_MAP[f.iconName] ?? Grid }))
  : [
      { key: "all", label: "All", icon: Grid },
      { key: "men", label: "Men", icon: User },
      { key: "women", label: "Women", icon: Users },
    ];

export default function WatchPage() {
  const [filter, setFilter] = useState("all");
  const { cart, addItem, increment, decrement, removeItem } = useCart();

  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // API config
  const API_BASE = "http://localhost:4000";

  // normalize server item -> UI shape
  const mapServerToUI = (item) => {
    let img = item.image ?? item.img ?? "";
    if (typeof img === "string" && img.startsWith("/")) {
      img = `${API_BASE}${img}`;
    }
    // console.log(item);
    const rawGender =
      (item.gender && String(item.gender).toLowerCase()) ||
      (item.category && String(item.category).toLowerCase()) ||
      "";

    const gender =
      rawGender === "men" || rawGender === "male"
        ? "men"
        : rawGender === "women" || rawGender === "female"
        ? "women"
        : "unisex";

    return {
      id:
        item._id ??
        item.id ??
        String(item.sku ?? item.name ?? Math.random()).slice(2, 12),
      name: item.name,

      price: item.price ?? 0,
      category: item.category ?? "",
      brand: item.brandName ?? "",
      description: item.description,
      img,
      gender,
      raw: item,
    };
  };

  // fetch watches from backend, fallback to dummy data if available
  useEffect(() => {
    let mounted = true;
    const fetchWatches = async () => {
      setLoading(true);
      try {
        const resp = await axios.get(`${API_BASE}/api/watches`);
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
            if (Array.isArray(DUMMY_WATCHES) && DUMMY_WATCHES.length) {
              setWatches(DUMMY_WATCHES.map(mapServerToUI));
              toast.info("Using local dummy watches.");
            } else {
              setWatches([]);
              toast.info("No watches returned from server.");
            }
          }
        } else if (mounted) {
          setWatches(items.map(mapServerToUI));
        }
      } catch (err) {
        console.error("Failed to fetch watches:", err);
        if (mounted) {
          if (Array.isArray(DUMMY_WATCHES) && DUMMY_WATCHES.length) {
            setWatches(DUMMY_WATCHES.map(mapServerToUI));
            toast.warn("Could not reach server — using local dummy watches.");
          } else {
            setWatches([]);
            toast.error("Could not fetch watches from server.");
          }
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchWatches();
    return () => {
      mounted = false;
    };
  }, []); // run once

  // helper: find qty in cart for a product id (robust to different shapes)
  const getQty = (id) => {
    // cart might be an array or an object with items; normalize to array
    const items = Array.isArray(cart) ? cart : cart?.items ?? [];
    // console.log(items);

    const match = items.find((c) => {
      const candidates = [c.productId];
      return candidates.some((field) => String(field ?? "") === String(id));
    });

    if (!match) return 0;
    const qty = match.qty ?? match.quantity ?? match.qty ?? match.quantity ?? 0;
    return Number(qty) || 0;
  };

  const filtered = useMemo(
    () =>
      watches.filter((w) =>
        filter === "all"
          ? true
          : filter === "men"
          ? w.gender === "men"
          : filter === "women"
          ? w.gender === "women"
          : true
      ),
    [filter, watches]
  );

  return (
    <div className="px-6 sm:px-8 md:px-12 lg:px-24 py-12 bg-white min-h-screen">
      <ToastContainer />
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-10 gap-6 md:gap-0">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-[pacifico] font-extrabold tracking-widest text-gray-500">
            Timepieces{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-cyan-500">
              Curated
            </span>
          </h1>
          <p className="mt-3 text-sm text-gray-500 max-w-xl">
            A handpicked selection — clean presentation, zero borders. Choose a
            filter to refine.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {FILTERS.map((f) => {
            const Icon = f.icon;
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`inline-flex items-center cursor-pointer gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                  active
                    ? "bg-gradient-to-r from-gray-400 to-gray-600 text-white"
                    : "bg-white text-gray-700 border hover:shadow-sm"
                }`}
              >
                <Icon className="w-4 h-4" />
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading watches…</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No watches found.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 sm:gap-8 md:gap-10">
          {filtered.map((w) => {
            const sid = String(w.id ?? w._id ?? w.sku ?? w.name);
            const qty = getQty(sid);

            return (
              <div key={sid} className="group text-center">
                <div className="relative mx-auto max-w-[240px] w-full h-[320px] md:h-[420px]">
                  <img
                    src={w.img}
                    alt={w.name}
                    className="w-full h-full object-contain"
                    draggable={false}
                  />

                  <div className="absolute left-1/2 -translate-x-1/2 bottom-2">
                    {qty > 0 ? (
                      <div className="inline-flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow">
                        <button
                          aria-label={`decrease ${w.name}`}
                          onClick={() => {
                            if (qty > 1) decrement(sid);
                            else removeItem(sid);
                          }}
                          className="p-2 rounded cursor-pointer "
                        >
                          <Minus className="w-4 h-4" />
                        </button>

                        <div className="px-3 py-1 min-w-[36px] text-center font-medium">
                          {qty}
                        </div>

                        <button
                          aria-label={`increase ${w.name}`}
                          onClick={() => increment(sid)}
                          className="p-2 cursor-pointer  "
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          addItem({
                            id: sid,
                            name: w.name,
                            price: w.price,
                            img: w.img,
                          })
                        }
                        className="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-white shadow hover:bg-gradient-to-br from-gray-200 to-gray-400 "
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-semibold uppercase">{w.name}</h3>
                  <p className="text-xs text-gray-500">{w.desc}</p>
                  <div className="mt-2 text-sm font-medium">₹{w.price}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
