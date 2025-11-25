import React, { useState, useMemo } from "react";
import { Grid, Minus, Plus, ShoppingCart, User, Users } from "lucide-react";
import { useCart } from "../../CartContext";
import { WATCHES, FILTERS as RAW_FILTERS } from "./dummydata";

const ICON_MAP = { Grid, User, Users }
const FILTERS = RAW_FILTERS?.length
    ? RAW_FILTERS.map((f) => ({ ...f, icon: ICON_MAP[f.iconName] ?? Grid }))
    : [
        { key: "all", label: "All", icon: Grid },
        { key: "men", label: "Men", icon: User },
        { key: "women", label: "Women", icon: Users },
    ]

export default function WatchPage() {
    const [filter, setFilter] = useState('all')
    const { cart, addItem, increment, removeItem, decrement } = useCart()

    const filtered = useMemo(() => WATCHES.filter((w) => (filter === "all" ? true : w.gender === filter)),
        [filter]
    )

    const getQty = (id) => {
        const it = cart.find((c) => String(c.id) === String(id))
        return it ? Number(it.qty || 0) : 0
    }

    return (
        <div className="px-6 sm:px-8 md:px-12 lg:px-24 py-12 bg-white min-h-screen">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-10 gap-6 md:gap-0">
                <div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-[pacifico] font-extrabold tracking-widest text-gray-500">
                        Timepieces {" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-cyan-500">
                            Curated
                        </span>
                    </h1>
                    <p className="mt-3 text-sm text-gray-500 max-w-xl">
                        A handpicked selection — clean presentation, zero borders. Choose a filter to refine.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {FILTERS.map((f) => {
                        const Icon = f.icon
                        const active = filter === f.key
                        return (
                            <button
                                key={f.key}
                                onClick={() => setFilter(f.key)}
                                className={`inline-flex items-center cursor-pointer gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${active
                                    ? "bg-gradient-to-r from-gray-400 to-gray-600 text-white"
                                    : "bg-white text-gray-700 border hover:shadow-sm"
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {f.label}
                            </button>
                        )
                    })}
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 sm:gap-8 md:gap-10">
                {filtered.map((w) => {
                    const sid = String(w.id ?? w._id ?? w.sku ?? w.name);
                    const qty = getQty(sid)
                    return (
                        <div key={sid} className="group text-center">
                            {/* Image container  */}
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
                                                    if (qty > 1) decrement(sid)
                                                    else removeItem(sid)
                                                }}
                                                className="p-2 rounded cursor-pointer"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <div className="px-3 py-1 min-w-[36px] text-center font-medium">{qty}</div>
                                            <button
                                                aria-label={`increase ${w.name}`}
                                                onClick={() => increment(sid)}
                                                className="p-2 cursor-pointer"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => addItem({ id: sid, name: w.name, price: w.price, img: w.img }) }
                                            className="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-white shadow hover:bg-gradient-to-br from-gray-200 to-gray-400"
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
                                <div className="mt-2 text-sm font-medium">{w.price}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}