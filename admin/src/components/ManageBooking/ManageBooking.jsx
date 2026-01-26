import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  Phone,
  MapPin,
  MessageSquare,
  Calendar,
  Watch,
  ChevronDown,
  Trash2,
  Search,
  CreditCard,
} from "lucide-react";

const API_BASE = "http://localhost:4000/api";

const axiosInstance = axios.create({ baseURL: API_BASE });
axiosInstance.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("authtoken");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

const ManageBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [expanded, setExpanded] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  async function fetchOrders() {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get("/orders");
      const orders = Array.isArray(res?.data?.orders)
        ? res.data.orders
        : Array.isArray(res?.data)
        ? res.data
        : [];
      setBookings(orders.map(mapOrderToBooking));
    } catch (err) {
      setError(
        err?.response?.data?.message || err.message || "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  }

  const mapOrderToBooking = (o) => {
    const items = (o.items || []).map((it) => ({
      productId: it.productId ?? null,
      name: String(it.name ?? ""),
      img: it.img ?? null,
      price: Number(it.price ?? 0),
      qty: Number(it.qty ?? 1),
      // description removed from display, but kept in data mapping if needed later
      description: it.description,
    }));

    return {
      id: o._id,
      orderId: o.orderId,
      userId: o.user ?? null,
      paymentStatus: o.paymentStatus ?? "Unpaid",
      paymentMethod: o.paymentMethod ?? "Online",
      customerName: o.name ?? "Customer",
      email: o.email,
      phone: o.phoneNumber,
      address: o.address,
      notes: o.notes,
      shippingCharge: Number(o.shippingCharge ?? 0),
      totalAmount: Number(o.totalAmount ?? 0),
      taxAmount: Number(o.taxAmount ?? 0),
      finalAmount: Number(o.finalAmount ?? 0),
      watches: items,
      date: o.createdAt ? new Date(o.createdAt).toLocaleDateString() : "—",
      status: o.orderStatus ?? "Pending",
      raw: o,
    };
  };

  async function deleteBooking(id) {
    if (!window.confirm("Delete this booking?")) return;
    try {
      await axiosInstance.delete(`/orders/${id}`);
      setBookings((p) => p.filter((b) => b.id !== id));
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to delete booking");
    }
  }

  async function updateStatus(id, newStatus) {
    // prevent updating if booking is already cancelled
    const current = bookings.find((b) => b.id === id);
    if (String(current?.status ?? "").toLowerCase() === "cancelled") {
      alert("Cannot update status of a cancelled booking.");
      return;
    }

    const prev = bookings;
    setBookings((p) =>
      p.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    try {
      await axiosInstance.put(`/orders/${id}`, { orderStatus: newStatus });
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to update status");
      fetchOrders();
    }
  }

  const toggle = (id) =>
    setExpanded((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );

  const q = searchTerm.trim().toLowerCase();
  const filtered = bookings.filter((b) => {
    const matchesSearch =
      !q ||
      b.customerName.toLowerCase().includes(q) ||
      (b.email || "").toLowerCase().includes(q) ||
      b.watches.some((w) => (w.name || "").toLowerCase().includes(q));
    const matchesStatus = statusFilter === "All" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const StatusBadge = ({ status }) => {
    const map = {
      Pending: "bg-amber-100 text-amber-800",
      Confirmed: "bg-blue-100 text-blue-800",
      Completed: "bg-green-100 text-green-800",
      Cancelled: "bg-rose-100 text-rose-800",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          map[status] || "bg-slate-100 text-slate-800"
        }`}
      >
        {status}
      </span>
    );
  };

  const PaymentBadge = ({ status }) => {
    const map = {
      Paid: "bg-green-100 text-green-800",
      Unpaid: "bg-rose-100 text-rose-800",
      Refund: "bg-amber-100 text-amber-800",
    };
    return (
      <span
        className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium $|{
          map[status] || "bg-slate-100 text-slate-800"
        }`}
      >
        <CreditCard className="w-3 h-3" />
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen pt-30 bg-gradient-to-br from-slate-50 to-slate-100 font-[pacifico] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-sm">
            <Calendar className="w-6 h-6 text-slate-700" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Manage Bookings
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              View and manage customer bookings
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-md border border-slate-200 p-5 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-slate-800">
              All Bookings ({filtered.length})
            </h2>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                  placeholder="Search bookings..."
                />
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-white pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm"
                >
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {loading && <div className="text-center py-6">Loading bookings…</div>}
          {error && (
            <div className="text-center text-red-600 py-3">{error}</div>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-16 bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-md border border-slate-200">
              <Calendar className="w-12 h-12 mx-auto text-slate-400 mb-3" />
              <p className="text-slate-500">No bookings found</p>
            </div>
          ) : (
            filtered.map((b) => {
              const isCancelled =
                String(b.status ?? "").toLowerCase() === "cancelled";
              return (
                <div
                  key={b.id}
                  className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-md border border-slate-200 overflow-hidden"
                >
                  <div className="p-5 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100">
                        <User className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {b.customerName}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {b.email}{" "}
                          <span className="mx-2 text-slate-300">·</span>
                          <span className="text-slate-500">
                            Order:{" "}
                            <span className="font-medium text-slate-800">
                              {b.orderId}
                            </span>
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <StatusBadge status={b.status} />
                      <PaymentBadge status={b.paymentStatus} />

                      <div className="flex items-center gap-2">
                        <select
                          value={b.status}
                          onChange={(e) => updateStatus(b.id, e.target.value)}
                          disabled={isCancelled}
                          title={
                            isCancelled
                              ? "Cannot update status of a cancelled booking"
                              : "Change booking status"
                          }
                          className={`text-sm rounded-lg py-1 px-2 border ${
                            isCancelled
                              ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-70"
                              : "bg-slate-100 border-slate-200"
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>

                        <button
                          onClick={() => deleteBooking(b.id)}
                          className="p-2 rounded-lg bg-rose-100 text-rose-700 hover:bg-rose-200"
                          title="Delete booking"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => toggle(b.id)}
                          className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-sm font-medium"
                        >
                          {expanded.includes(b.id)
                            ? "Hide Details"
                            : "View Details"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {expanded.includes(b.id) && (
                    <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                          <User className="w-4 h-4" /> Customer Details
                        </h4>
                        <InfoRow
                          icon={<Phone className="w-4 h-4" />}
                          label="Phone"
                          value={b.phone}
                        />
                        <InfoRow
                          icon={<MapPin className="w-4 h-4" />}
                          label="Address"
                          value={b.address}
                        />
                        <InfoRow
                          icon={<Calendar className="w-4 h-4" />}
                          label="Booking Date"
                          value={b.date}
                        />
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100">
                            <CreditCard className="w-4 h-4" />
                          </div>
                          <div className="text-sm">
                            <div className="text-slate-600">Payment Status</div>
                            <div className="text-slate-800 font-medium">
                              <PaymentBadge status={b.paymentStatus} />
                            </div>
                          </div>
                        </div>
                        <InfoRow
                          icon={<Calendar className="w-4 h-4" />}
                          label="Order ID"
                          value={b.orderId}
                        />
                        {b.notes && (
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 mt-1">
                              <MessageSquare className="w-4 h-4" />
                            </div>
                            <div className="text-sm flex-1">
                              <div className="text-slate-600">Notes</div>
                              <div className="text-slate-800 font-medium">
                                {b.notes}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                          <Watch className="w-4 h-4" /> Watch Details
                        </h4>
                        <div className="space-y-6">
                          {b.watches.map((w, i) => (
                            <div
                              key={i}
                              className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl"
                            >
                              <div className="w-full sm:w-1/3">
                                <div className="rounded-xl overflow-hidden shadow-sm">
                                  {w.img ? (
                                    <img
                                      src={w.img}
                                      alt={w.name}
                                      className="w-full h-40 object-contain"
                                    />
                                  ) : (
                                    <div className="w-full h-40 flex items-center justify-center bg-slate-100 text-slate-400">
                                      No image
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="w-full sm:w-2/3">
                                <h5 className="text-lg font-semibold text-slate-800">
                                  {w.name}
                                </h5>
                                <div className="mt-3 space-y-1 text-sm">
                                  <div>
                                    <span className="font-medium text-slate-600">
                                      Price:{" "}
                                    </span>
                                    ₹{Number(w.price).toLocaleString()}
                                  </div>
                                  <div>
                                    <span className="font-medium text-slate-600">
                                      Qty:{" "}
                                    </span>
                                    {w.qty}
                                  </div>
                                  <div>
                                    <span className="font-medium text-slate-600">
                                      ProductId:{" "}
                                    </span>
                                    {w.productId ?? "—"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 text-sm">
                          <div>
                            <span className="font-medium text-slate-600">
                              Subtotal:{" "}
                            </span>
                            ₹{Number(b.totalAmount).toLocaleString()}
                          </div>
                          <div>
                            <span className="font-medium text-slate-600">
                              Tax:{" "}
                            </span>
                            ₹{Number(b.taxAmount).toLocaleString()}
                          </div>
                          <div>
                            <span className="font-medium text-slate-600">
                              Shipping:{" "}
                            </span>
                            ₹{Number(b.shippingCharge).toLocaleString()}
                          </div>
                          <div className="mt-2 text-lg font-bold">
                            <span className="font-medium text-slate-600">
                              Final:{" "}
                            </span>
                            ₹{Number(b.finalAmount).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 mb-3">
    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100">
      {icon}
    </div>
    <div className="text-sm">
      <div className="text-slate-600">{label}</div>
      <div className="text-slate-800 font-medium">{value}</div>
    </div>
  </div>
);

export default ManageBooking;
