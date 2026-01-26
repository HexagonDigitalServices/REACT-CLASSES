import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";

const CartContext = createContext();
const STORAGE_KEY = "cartItems";
const API_BASE = "http://localhost:4000";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    cfg.headers = cfg.headers || {};
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

const normalizeServerItem = (it) => {
  const productId = String(it.productId);
  // console.log(it);
  return {
    id: productId,
    productId,
    name: it.name,
    img: it.img,
    price: it.price,
    quantity: it.qty,
    description: it.description,
  };
};

const ACTIONS = {
  LOAD_CART: "LOAD_CART",
  ADD_ITEM: "ADD_ITEM",
  UPDATE_ITEM: "UPDATE_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  CLEAR_CART: "CLEAR_CART",
};

const getInitialState = () => {
  if (typeof window === "undefined") return { items: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    const items = Array.isArray(parsed)
      ? parsed.map((it) => ({
          id: String(it._id),
          productId: String(it.productId),
          name: it.name,
          img: it.img ?? it.image ?? "",
          price: Number(it.price),
          quantity: Number(it.qty ?? it.quantity ?? 0),
          description: it.description ?? "",
        }))
      : [];
    // console.log(items);
    return { items };
  } catch {
    return { items: [] };
  }
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOAD_CART:
      return {
        ...state,
        items: Array.isArray(action.payload) ? action.payload : [],
      };

    case ACTIONS.ADD_ITEM: {
      const p = action.payload;
      const qty = Number(p.quantity ?? 1);
      const idx = state.items.findIndex((i) => i.id === p.id);
      if (idx > -1) {
        const items = state.items.map((it, i) =>
          i === idx ? { ...it, quantity: Number(it.quantity || 0) + qty } : it
        );
        return { ...state, items };
      }
      return { ...state, items: [...state.items, { ...p, quantity: qty }] };
    }

    case ACTIONS.UPDATE_ITEM: {
      const { id, quantity } = action.payload;
      const items = state.items
        .map((it) =>
          it.id === id ? { ...it, quantity: Number(quantity) } : it
        )
        .filter((it) => Number(it.quantity) > 0);
      return { ...state, items };
    }

    case ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((it) => it.id !== action.payload.id),
      };

    case ACTIONS.CLEAR_CART:
      return { ...state, items: [] };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, null, getInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch (e) {
      console.warn("Could not persist cart:", e);
    }
  }, [state.items]);

  const parsePrice = (p) => {
    if (typeof p === "number" && isFinite(p)) return p;
    if (!p) return 0;
    let s = String(p)
      .trim()
      .replace(/[^0-9.\-]/g, "");
    const parts = s.split(".");
    if (parts.length > 2) s = parts.shift() + "." + parts.join("");
    const n = parseFloat(s);
    return Number.isFinite(n) ? n : 0;
  };

  const totalItems = useMemo(
    () => state.items.reduce((sum, i) => sum + (Number(i.quantity) || 0), 0),
    [state.items]
  );
  const totalPrice = useMemo(
    () =>
      state.items.reduce(
        (sum, i) => sum + (Number(i.quantity) || 0) * parsePrice(i.price),
        0
      ),
    [state.items]
  );

  const fetchCart = useCallback(async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;
    try {
      const res = await api.get("/api/cart");
      if (res?.data?.success && Array.isArray(res.data.cart?.items)) {
        dispatch({
          type: ACTIONS.LOAD_CART,
          payload: res.data.cart.items.map(normalizeServerItem),
        });
      }
    } catch (err) {
      console.warn("Failed to fetch server cart:", err?.message || err);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const dispatchAddLocal = (product) => {
    const payload = {
      id: String(product.id ?? product.productId ?? ""),
      productId: String(product.productId ?? product.id ?? ""),
      name: product.name ?? product.title ?? "",
      img: product.img ?? product.image ?? "",
      price: Number(product.price ?? 0),
      quantity: Number(product.quantity ?? product.qty ?? 1),
      description: product.description ?? "",
    };
    dispatch({ type: ACTIONS.ADD_ITEM, payload });
  };

  const addItem = async (product) => {
    console.log(product);
    const token = localStorage.getItem("authToken");
    const id = String(product.id ?? product.productId ?? "");
    const payloadForServer = {
      productId: id,
      quantity: 1,
      name: product.name ?? "",
      img: product.img ?? product.image ?? "",
      price: Number(product.price ?? 0),
      description: product.description,
    };

    if (token) {
      try {
        const res = await api.post("/api/cart/add", payloadForServer);
        if (res?.data?.success && Array.isArray(res.data.cart?.items)) {
          dispatch({
            type: ACTIONS.LOAD_CART,
            payload: res.data.cart.items.map(normalizeServerItem),
          });
          return;
        }
      } catch (err) {
        console.warn(
          "Server add failed — falling back to local:",
          err?.message || err
        );
      }
    }
    dispatchAddLocal({
      id,
      productId: id,
      name: product.name ?? "",
      img: product.img ?? "",
      price: Number(product.price ?? 0),
      quantity: 1,
      description: product.description,
    });
  };

  const updateCartItem = async ({ id, quantity }) => {
    const token = localStorage.getItem("authToken");
    const numQty = Number(quantity);
    if (token) {
      try {
        await api.put("/api/cart/update", { productId: id, quantity: numQty });
        dispatch({
          type: ACTIONS.UPDATE_ITEM,
          payload: { id, quantity: numQty },
        });
        return;
      } catch (err) {
        console.warn(
          "Server update failed — applying local:",
          err?.message || err
        );
      }
    }
    dispatch({ type: ACTIONS.UPDATE_ITEM, payload: { id, quantity: numQty } });
  };

  const increment = async (id) => {
    const existing = state.items.find((i) => String(i.id) === String(id));
    const next = existing ? Number(existing.quantity || 0) + 1 : 1;
    return updateCartItem({ id, quantity: next });
  };

  const decrement = async (id) => {
    const existing = state.items.find((i) => String(i.id) === String(id));
    const next = existing ? Math.max(0, Number(existing.quantity || 0) - 1) : 0;
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        if (next === 0) {
          await api.delete(`/api/cart/remove/${encodeURIComponent(id)}`);
          dispatch({ type: ACTIONS.REMOVE_ITEM, payload: { id } });
          return;
        }
        await api.put("/api/cart/update", { productId: id, quantity: next });
        dispatch({
          type: ACTIONS.UPDATE_ITEM,
          payload: { id, quantity: next },
        });
        return;
      } catch (err) {
        console.warn(
          "Server decrement failed — applying local:",
          err?.message || err
        );
      }
    }
    if (next === 0) dispatch({ type: ACTIONS.REMOVE_ITEM, payload: { id } });
    else
      dispatch({ type: ACTIONS.UPDATE_ITEM, payload: { id, quantity: next } });
  };

  const removeItem = async (id) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        await api.delete(`/api/cart/remove/${encodeURIComponent(id)}`);
        dispatch({ type: ACTIONS.REMOVE_ITEM, payload: { id } });
        return;
      } catch (err) {
        console.warn(
          "Server remove failed — removing locally:",
          err?.message || err
        );
      }
    }
    dispatch({ type: ACTIONS.REMOVE_ITEM, payload: { id } });
  };

  const clearCart = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        await api.delete("/api/cart/clear");
        dispatch({ type: ACTIONS.CLEAR_CART });
        return;
      } catch (err) {
        console.warn(
          "Server clear failed — clearing locally:",
          err?.message || err
        );
      }
    }
    dispatch({ type: ACTIONS.CLEAR_CART });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        addItem,
        increment,
        decrement,
        removeItem,
        clearCart,
        totalItems,
        totalPrice,
        reloadCart: fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
