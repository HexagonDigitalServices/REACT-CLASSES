import React, { useState } from "react";
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    ShoppingCart,
    Send,
    AlertCircle,
    Check,
    User,
    IndianRupee,
    MapIcon,
} from "lucide-react";

export default function ContactPage() {

    const WHATSAPP_NUMBER = "918299431275"

    const initialForm = {
        name: "",
        email: "",
        phone: "",
        product: "General Inquiry",
        budget: "",
        contactMethod: "WhatsApp",
        message: ""
    }

    const [form, setForm] = useState(initialForm)
    const [errors, setErrors] = useState({})
    const [sending, setSending] = useState(false)
    const [toast, setToast] = useState(null)

    const products = [
        "General Inquiry",
        "Norqain Independence",
        "Zenith Chronomaster",
        "Jacob & Co. Epic X",
        "Bvlgari Octo",
        "H. Moser Endeavour",
    ];

    function showToast(text, kind = "info", duration = 1800) {
        setToast({ text, kind })
        setTimeout(() => setToast(null), duration)
    }

    function validate() {
        const e = {};
        if (!form.name.trim()) e.name = "Name is required";
        if (!form.email.trim()) e.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Email is invalid";
        if (!form.phone.trim()) e.phone = "Phone is required";
        if (!form.product.trim()) e.product = "Select product";
        if (!form.budget.trim()) e.budget = "Budget is required";
        if (!form.contactMethod.trim()) e.contactMethod = "Select contact method";
        if (!form.message.trim()) e.message = "Message is required";
        return e;
    }

    function handleChange(e) {
        const { name, value } = e.target
        setForm((s) => ({ ...s, [name]: value }))
        setErrors((s) => ({ ...s, [name]: undefined }))
    }

    function clearForm() {
        setForm(initialForm)
        setErrors({})
    }

    function handleSubmit(e) {
        e.preventDefault()
        const ev = validate()
        setErrors(ev)
        if (Object.keys(ev).length > 0) {
            showToast("Please fill all required fields", "error")
            return
        }
        setSending(true)

        const message =
            `Hello! I am *${form.name}*.\n\n` +
            `📌 *Interest:* ${form.product}\n` +
            `💰 *Budget:* ${form.budget}\n` +
            `📞 *Phone:* ${form.phone}\n` +
            `✉️ *Email:* ${form.email}\n` +
            `📬 *Preferred Contact:* ${form.contactMethod}\n\n` +
            `📝 *Message:* ${form.message}`;

        const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
            message
        )}`;

        showToast("Opening Whatsapp...", "success", 900)

        setTimeout(() => {
            window.open(url, "_blank")
            clearForm()
            setSending(false)
            showToast("Submitted- form cleared", "success", 1600)
        },700)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-10 md:mb-10">
                    <h1
                        className="text-3xl sm:text-4xl md:text-5xl font-medium"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                        Get in touch
                    </h1>
                    <p
                        className="mt-2 text-gray-500 max-w-2xl mx-auto text-sm sm:text-base"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Looking for a watch, quote or consultation? Fill the form — we'll reply on WhatsApp with
                        details.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-8 items-start">
                    <div className="lg:col-span-7 order-1 lg:order-1">
                        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-8 md:p-8 lg:p-8">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Row: name / email */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <InputWithIcon
                                        icon={<User className="w-5 h-5 text-black" />}
                                        label="Your Name"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="FullName"
                                        error={errors.name}
                                        required
                                    />
                                    <InputWithIcon
                                        icon={<Mail className="w-5 h-5 text-black" />}
                                        label="Email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        error={errors.email}
                                        required
                                    />
                                </div>

                                {/* Row: phone / contact method */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <InputWithIcon
                                        icon={<Phone className="w-5 h-5 text-black" />}
                                        label="Phone"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="+91 xxxxxx xxxxx"
                                        error={errors.phone}
                                        required
                                    />
                                    <SelectWithIcon
                                        icon={<Clock className="w-5 h-5 text-black" />}
                                        label="Preferred Contact"
                                        name="contactMethod"
                                        value={form.contactMethod}
                                        onChange={handleChange}
                                        options={["WhatsApp", "Phone Call", "Email"]}
                                        error={errors.contactMethod}
                                        required
                                    />
                                </div>

                                {/* product */}
                                <div>
                                    <SelectWithIcon
                                        icon={<ShoppingCart className="w-5 h-5 text-black" />}
                                        label="Product of interest"
                                        name="product"
                                        value={form.product}
                                        onChange={handleChange}
                                        options={products}
                                        error={errors.product}
                                        required
                                    />
                                </div>

                                {/* budget / message */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <InputWithIcon
                                        icon={<IndianRupee className="w-5 h-5 text-green-600" />}
                                        label="Estimated Budget"
                                        name="budget"
                                        value={form.budget}
                                        onChange={handleChange}
                                        placeholder="e.g. ₹ 1,50,000 - ₹ 3,00,000"
                                        error={errors.budget}
                                        required
                                    />
                                    <div>
                                        <label className="block text-sm text-gray-600">
                                            Short message <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            rows={4}
                                            className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 ${errors.message ? "border-rose-400" : "border-gray-200"
                                                } transition`}
                                            placeholder="Tell us what you are looking for..."
                                            required
                                        />
                                    </div>
                                </div>

                                {/* actions */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                                    <button
                                        type="submit"
                                        disabled={sending}
                                        className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-300 to-gray-500 text-white px-5 sm:px-6 py-3 rounded-full shadow hover:scale-[1.02] cursor-pointer transition-transform disabled:opacity-60"
                                        aria-label="Send via WhatsApp"
                                    >
                                        <Send className="w-4 h-4" />
                                        <span className="font-medium">Send via WhatsApp</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            clearForm();
                                            showToast("Form cleared", "info");
                                        }}
                                        className="inline-flex items-center cursor-pointer gap-2 border border-gray-200 px-4 py-3 rounded-xl text-sm hover:bg-gray-50 transition-colors"
                                    >
                                        Clear
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="lg:col-span-5 order-2 lg:order-2">
                        <div className="grid grid-cols-1 gap-4 items-start">
                            <CreativeCard
                                title="Showroom Visits"
                                subtitle="Private viewings by appointment"
                                icon={<MapPin className="w-6 h-6 text-black" />}
                                ctaText="Book Visit"
                                ctaOnClick={() => {
                                    const msg = `Hi, I'd like to book a private showroom visit.`
                                    window.open(
                                        `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
                                            msg
                                        )}`, "_blank"
                                    )
                                }}
                                accent="amber"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {toast && (
                <div
                    className={`fixed left-1/2 -translate-x-1/2 bottom-8 z-50 px-4 py-2 rounded-full text-sm flex items-center gap-2 shadow-lg ${toast.kind === "error" ? "bg-rose-500 text-white" : "bg-black text-white"
                        }`}
                >
                    {toast.kind === "success" ? (
                        <Check className="w-4 h-4" />
                    ) : (
                        <AlertCircle className="w-4 h-4" />
                    )}
                    <span>{toast.text}</span>
                </div>
            )}

            {/* fonts */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600&family=Playfair+Display:wght@400;600;700&display=swap');
      `}</style>
        </div>

    )
}


function InputWithIcon({ icon, label, name, value, onChange, placeholder, error, required }) {
    return (
        <label className="block">
            <span className="text-sm text-gray-600">
                {label} {required && <span className="text-red-500">*</span>}
            </span>
            <div className={`mt-2 relative`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>
                <input
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className={`w-full rounded-xl border px-4 py-3 pl-12 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition ${error ? "border-rose-400" : "border-gray-200"
                        }`}
                />
            </div>
            {error && (
                <p className="text-rose-500 text-xs mt-1 flex items-center gap-2">
                    <AlertCircle className="w-3 h-3" />
                    {error}
                </p>
            )}
        </label>
    );
}


function SelectWithIcon({ icon, label, name, value, onChange, options = [], error, required }) {
    return (
        <label className="block">
            <span className="text-sm text-gray-600">
                {label} {required && <span className="text-red-500">*</span>}
            </span>
            <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={`w-full rounded-xl border px-4 py-3 pl-12 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition ${error ? "border-rose-400" : "border-gray-200"
                        }`}
                >
                    {options.map((o) => (
                        <option key={o} value={o}>
                            {o}
                        </option>
                    ))}
                </select>
            </div>
        </label>
    );
}

function CreativeCard({ title, subtitle, icon, ctaText, ctaOnClick, accent = "amber" }) {

    const accentBg = accent === "indigo" ? "from-indigo-50 to-cyan-50" : "from-gray-300 to-gray-400"
    const buttonClass = accent === "indigo" ? "bg-indigo-600 text-white" : "bg-amber-50 text-amber-700"

    return (
        <div className={`rounded-2xl p-4 border border-gray-100 bg-gradient-to-r ${accentBg} shadow-lg`}>
            <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-white/90 backdrop-blur-lg">{icon}</div>
                <div className="flex-1">
                    <div className="font-semibold" style={{ fontFamily: "'Playfair Display',serif" }}>
                        {title}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{subtitle}</p>
                </div>
            </div>
            <div className="mt-4">
                <button
                    className={`inline-flex bg-gradient-to-br from-gray-300 to-gray-400 items-center gap-2 px-3 py-2 rounded-lg text-black text-sm font-medium ${buttonClass} shadow-sm`}
                    onClick={ctaOnClick}
                >
                    {ctaText}
                </button>
            </div>
        </div>
    )
}