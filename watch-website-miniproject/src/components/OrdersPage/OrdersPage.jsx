import React, { useState } from "react";
import { Calendar, Eye, EyeOff, Package, ShoppingBag, ShoppingCart } from 'lucide-react'

const orders = [
    {
        id: "ORD12345",
        date: "2025-09-01",
        customer: {
            name: "John Doe",
            email: "john@example.com",
            mobile: "9876543210",
            address: "123 Main Street, City, Country",
            payment: "Cash on Delivery",
            note: "Please deliver between 10am–2pm",
        },
        items: [
            {
                id: 1,
                name: "Rolex Submariner",
                price: "₹1,20,000",
                qty: 1,
                img: "https://cdn1.ethoswatches.com/media/catalog/product/cache/06b0325fe0d1ea074c67035fe5935845/b/v/bvlgari-serpenti-103944.jpg",
            },
            {
                id: 2,
                name: "Omega Speedmaster",
                price: "₹95,000",
                qty: 2,
                img: "https://cdn1.ethoswatches.com/media/catalog/product/cache/06b0325fe0d1ea074c67035fe5935845/o/r/oris-aquis-01-733-7792-4158-07-8-19-05p.jpg",
            },
        ],
        total: "₹3,10,000",
        status: "Processing",
    },
    {
        id: "ORD12346",
        date: "2025-08-28",
        customer: {
            name: "Jane Smith",
            email: "jane@example.com",
            mobile: "9123456789",
            address: "456 Park Lane, City, Country",
            payment: "Online",
            note: "Gift wrap the order",
        },
        items: [
            {
                id: 3,
                name: "Tag Heuer Carrera",
                price: "₹75,000",
                qty: 1,
                img: "https://ermitagejewelers.com/storage/107624/conversions/Rolex-Milgauss-116400-7462-optimized.jpg?v=1742317207",
            },
        ],
        total: "₹75,000",
        status: "Shipped",
    },
];

const OrdersPage = () => {
    const [expandedOrders, setExpandedOrders] = useState([])

    const toggleExpand = (id) => {
        setExpandedOrders((prev) =>
            prev.includes(id) ? prev.filter((orderId) => orderId !== id) : [...prev, id])
    }

    return (
        <div className="min-h-screen mt-12 font-[pacifico] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                    <ShoppingBag className="text-gray-600" /> My Orders
                </h1>

                <div className="space-y-8">
                    {
                        orders.map((order) => {
                            const isExpanded = expandedOrders.includes(order.id)
                            return (
                                <div
                                    key={order.id}
                                    className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
                                >
                                    {/* Header  */}
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                                        <div>

                                            <h2 className="text-xl font-semibold text-gray-800">
                                                Order #{order.id}
                                            </h2>
                                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                                <Calendar size={14} /> {order.date}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="inline-block px-3 py-1 text-sm rounded-full bg-gray-200 text-gray-700">
                                                {order.status}
                                            </span>
                                            <button
                                                onClick={() => toggleExpand(order.id)}
                                                className="flex items-center gap-1 px-3 cursor-pointer py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium textgra7 transition"
                                            >
                                                {isExpanded ? (
                                                    <>
                                                        <EyeOff size={16} /> Hide Details
                                                    </>
                                                ) : (
                                                    <>
                                                        <Eye size={16} /> View Details
                                                    </>
                                                )
                                                }
                                            </button>
                                        </div>
                                    </div>
                                    {/* Expanded section  */}
                                    {
                                        isExpanded && (
                                            <>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                                                    {
                                                        order.items.map((item) => (
                                                            <div
                                                                key={item.id}
                                                                className="flex items-center gap-4 p-4 rounded-lg">
                                                                <img
                                                                    src={item.img}
                                                                    alt={item.name}
                                                                    className="w-20 h-20 object-contain"
                                                                />
                                                                <div className="flex-1">
                                                                    <h3 className="font-medium text-gray-800">
                                                                        {item.name}
                                                                    </h3>
                                                                    <p className="text-gray-600">{item.price}</p>
                                                                    <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>

                                                {/* Cusotmer Info  */}
                                                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                                    <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-1">
                                                        <Package size={18} /> Delivery Details
                                                    </h3>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                                                        <p>
                                                            <span className="font-medium">Name:</span>{" "}
                                                            {order.customer.name}
                                                        </p>
                                                        <p>
                                                            <span className="font-medium">Email:</span>{" "}
                                                            {order.customer.email}
                                                        </p>
                                                        <p>
                                                            <span className="font-medium">Mobile:</span>{" "}
                                                            {order.customer.mobile}
                                                        </p>
                                                        <p>
                                                            <span className="font-medium">Payment:</span>{" "}
                                                            {order.customer.payment}
                                                        </p>
                                                        <p className="sm:col-span-2">
                                                            <span className="font-medium">Address:</span>{" "}
                                                            {order.customer.address}
                                                        </p>
                                                        {order.customer.note && (
                                                            <p className="sm:col-span-2">
                                                                <span className="font-medium">Note:</span>{" "}
                                                                {order.customer.note}
                                                            </p>
                                                        )}
                                                    </div>

                                                </div>
                                            </>
                                        )
                                    }
                                    {/* Total  */}
                                    <div className="flex justify-between items-center border-t pt-4">
                                        <span className="font-semibold text-gray-800">Total:</span>
                                        <span className="text-lg font-bold text-gray-900">
                                            {order.total}
                                        </span>
                                    </div>
                                </div>


                            )
                        })
                    }
                </div>
            </div>
        </div>
    )

}

export default OrdersPage 