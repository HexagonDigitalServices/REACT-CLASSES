import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import watchesData from "../CategoriesHome/Categoriesdata";
import { useCart } from "../../CartContext";

const BarndPage = () => {
    const { brandName } = useParams()
    const navigate = useNavigate()
    const brandWatches = watchesData[brandName?.toLowerCase()] || []
    const { addItem, cart, increment, decrement } = useCart()

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.scrollTo(0, 0)
            try {
                document.documentElement && (document.documentElement.scrollTo = 0)
                document.body && (document.body.scrollTop = 0)

            } catch (err) {

            }
        }
    }, [])

    const findInCart = (id) => cart.find((p) => p.id === id)

    if (!brandWatches.length) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
                <div className="max-w-lg text-center bg-white rounded-2xl shadow-lg p-8 border border-amber-200">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">No watches found</h2>
                    <p className="text-gray-600 mb-6">
                        This brand has no watches listed in our collection yet.
                    </p>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-amber-600 transition-all flex items-center justify-center gap-2 mx-auto"
                    >
                        <ArrowLeft size={18} />
                        Go back
                    </button>
                </div>
            </div>
        );
    }

  return (
    <div
      className="min-h-screen bg-cover bg-fixed opacity-100 bg-center py-8 px-4 sm:px-6 md:px-8 lg:px-12"
      // style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
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
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold bg-white text-black rounded-full border border-gray-400 px-6 py-2 font-[pacifico] capitalize drop-shadow-md w-fit text-center"
            >
              {brandName} Collections
            </h1>
          </div>
        </div>

        {/* Watch Grid
            Responsive columns:
              - base: 1 column (mobile)
              - sm: 2 columns
              - md: 3 columns (tablet)
              - lg (1024px): 4 columns (laptop)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 relative z-10">
          {brandWatches.map((watch) => {
            const inCart = findInCart(watch.id);
            return (
              <div
                key={watch.id}
                className="bg-white/95 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                {/* Watch Image */}
                <div className="relative h-48 md:h-56 lg:h-64 xl:h-55 overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={watch.image}
                    alt={watch.name}
                    className="h-full w-full object-cover transition-transform duration-500"
                  />
                </div>

                {/* Watch Details */}
                <div className="p-4">
                  <h2 className="font-semibold text-gray-800 text-lg sm:text-xl mb-1 font-[pacifico] truncate">{watch.name}</h2>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">
                    {watch.desc}
                  </p>

                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-600">{watch.price}</p>

                    {/* If item in cart: show qty controls, else show Add */}
                    {inCart ? (
                      <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">
                        <button
                          onClick={() => decrement(watch.id)}
                          aria-label={`Decrease ${watch.name} quantity`}
                          className="p-1 rounded-full cursor-pointer transition"
                        >
                          <Minus size={16} />
                        </button>

                        <div className="px-3 text-sm font-medium w-10 text-center">
                          {inCart.qty}
                        </div>

                        <button
                          onClick={() => increment(watch.id)}
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
                            name: watch.name,
                            price: watch.price,
                            img: watch.image, // match CartPage expectation
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

export default BarndPage