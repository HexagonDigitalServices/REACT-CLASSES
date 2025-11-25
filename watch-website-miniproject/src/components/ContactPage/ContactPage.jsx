import React, { useState } from "react";
import { Phone } from "lucide-react";

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

        setImmediate(() => {
            window.open(url, "_blank")
            clearForm()
            setSending(false)
            showToast("Submitted- form cleared", "success", 1600)
        })
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
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
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
          className={`w-full rounded-xl border px-4 py-3 pl-12 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition ${
            error ? "border-rose-400" : "border-gray-200"
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
          className={`w-full rounded-xl border px-4 py-3 pl-12 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition ${
            error ? "border-rose-400" : "border-gray-200"
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