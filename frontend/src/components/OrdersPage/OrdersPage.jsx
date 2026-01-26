import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingBag, Calendar, Package, Eye, EyeOff } from "lucide-react";

const API_BASE = "http://localhost:4000/api";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  const axiosInstance = axios.create({
    baseURL: API_BASE,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  async function fetchOrders() {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get("/orders/my");
      const payload = res?.data;
      const list = Array.isArray(payload?.orders)
        ? payload.orders
        : Array.isArray(payload)
        ? payload
        : payload?.orders ?? [];
      setOrders(list);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError(
        err?.response?.data?.message || err.message || "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  }

  const getKey = (o) => o._id ?? o.orderId ?? o.id ?? JSON.stringify(o);
  const toggle = (k) =>
    setExpanded((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));

  const formatDate = (o) => {
    const d = o.createdAt ?? o.placedAt ?? o.date ?? o.updatedAt ?? null;
    if (!d) return "—";
    try {
      return new Date(d).toLocaleDateString();
    } catch {
      return String(d).slice(0, 10);
    }
  };

  const formatPrice = (o) => {
    if (o.finalAmount != null)
      return `₹${Number(o.finalAmount).toLocaleString()}`;
    if (o.totalAmount != null)
      return `₹${Number(o.totalAmount).toLocaleString()}`;
    const items = o.items ?? [];
    if (!items.length) return "₹0";
    const sum = items.reduce((acc, it) => {
      const p =
        typeof it.price === "number"
          ? it.price
          : Number(String(it.price ?? "").replace(/[^0-9.-]+/g, "")) || 0;
      const q = Number(it.qty ?? it.quantity ?? 1) || 1;
      return acc + p * q;
    }, 0);
    return `₹${sum.toLocaleString()}`;
  };

  const handleCancel = async (order) => {
    const id = order._id ?? order.orderId ?? order.id;
    if (!id) return alert("Cannot determine order id to cancel.");
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    const curStatus = (
      order.orderStatus ??
      order.status ??
      order.paymentStatus ??
      ""
    )
      .toString()
      .toLowerCase();
    if (curStatus === "cancelled") return alert("Order is already cancelled.");

    const prev = [...orders];
    const key = getKey(order);
    setOrders((arr) =>
      arr.map((o) =>
        getKey(o) === key
          ? { ...o, orderStatus: "Cancelled", status: "Cancelled" }
          : o
      )
    );
    try {
      await axiosInstance.put(`/orders/${id}`, { orderStatus: "Cancelled" });
    } catch (err) {
      console.error("Cancel order failed", err);
      setOrders(prev);
      alert(err?.response?.data?.message || "Failed to cancel order");
    }
  };

  return (
    <div className="min-h-screen mt-12 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto font-sans">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <ShoppingBag className="text-gray-600" /> My Orders
          </h1>
          <button
            onClick={fetchOrders}
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium"
          >
            Refresh
          </button>
        </div>

        {loading && <p className="text-gray-600">Loading orders…</p>}
        {error && <p className="text-red-600">{error}</p>}

        <div className="space-y-8">
          {!orders.length && !loading ? (
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 text-center">
              <p className="text-gray-600">No orders found.</p>
            </div>
          ) : (
            orders.map((order, idx) => {
              const key = getKey(order);
              const isExpanded = expanded.includes(key);
              const items = (order.items || []).map((it, i) => ({
                id: it.productId ?? it._id ?? it.id ?? i,
                name: String(it.name ?? ""),
                price:
                  typeof it.price === "number"
                    ? `₹${it.price.toLocaleString()}`
                    : it.price ?? "₹0",
                qty: it.qty ?? it.quantity ?? 1,
                img: it.img ?? null,
              }));
              const status =
                order.orderStatus ?? order.status ?? order.paymentStatus ?? "—";
              const orderIsCancelled =
                String(status).toLowerCase() === "cancelled";

              return (
                <div
                  key={key}
                  className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        Order #{order.orderId ?? order._id ?? order.id}
                      </h2>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar size={14} /> {formatDate(order)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mt-4 md:mt-0">
                      <span className="inline-block px-3 py-1 text-sm rounded-full bg-gray-200 text-gray-700">
                        {status}
                      </span>

                      <button
                        onClick={() => toggle(key)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition"
                      >
                        {isExpanded ? (
                          <>
                            <EyeOff size={16} /> Hide Details
                          </>
                        ) : (
                          <>
                            <Eye size={16} /> View Details
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleCancel(order)}
                        disabled={orderIsCancelled}
                        className={`px-3 py-1.5 rounded text-sm font-medium ${
                          orderIsCancelled
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-red-50 text-red-700 hover:bg-red-100"
                        }`}
                        title={
                          orderIsCancelled
                            ? "Order already cancelled"
                            : "Cancel order"
                        }
                      >
                        Cancel
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                        {items.map((it) => (
                          <div
                            key={it.id}
                            className="flex items-center gap-4 p-4 rounded-lg"
                          >
                            {it.img ? (
                              <img
                                src={it.img}
                                alt={it.name}
                                className="w-20 h-20 object-contain"
                              />
                            ) : (
                              <div className="w-20 h-20 rounded-md bg-gray-100 flex items-center justify-center text-sm text-gray-500">
                                No image
                              </div>
                            )}
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-800">
                                {it.name}
                              </h3>
                              <p className="text-gray-600">{it.price}</p>
                              <p className="text-sm text-gray-500">
                                Qty: {it.qty}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-1">
                          <Package size={18} /> Delivery Details
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                          <p>
                            <span className="font-medium">Name:</span>{" "}
                            {order.name ?? "—"}
                          </p>
                          <p>
                            <span className="font-medium">Email:</span>{" "}
                            {order.email ?? "—"}
                          </p>
                          <p>
                            <span className="font-medium">Mobile:</span>{" "}
                            {order.phoneNumber ?? "—"}
                          </p>
                          <p>
                            <span className="font-medium">Payment:</span>{" "}
                            {order.paymentMethod ?? "—"}
                          </p>
                          <p className="sm:col-span-2">
                            <span className="font-medium">Address:</span>{" "}
                            {order.address ?? "—"}
                          </p>
                          {order.notes && (
                            <p className="sm:col-span-2">
                              <span className="font-medium">Note:</span>{" "}
                              {order.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex justify-between items-center border-t pt-4">
                    <span className="font-semibold text-gray-800">Total:</span>
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(order)}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
