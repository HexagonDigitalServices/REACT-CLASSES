
import cartModel from "../models/cartModel.js";

export async function addToCart(req, res) {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const { productId, quantity, name, img, price , description } = req.body;

    if (!productId || !name  || !img || !price) {
      return res.status(400).json({ success: false, message: "productId, name, img and price are required." });
    }
    const itemPayload = {
      productId,
      name,
      img,
      price,
      qty: quantity,
      description
    };

    let cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      cart = await cartModel.create({ user: userId, items: [itemPayload] });
    } else {
      const idx = cart.items.findIndex((it) => String(it.productId) === String(productId));
      if (idx > -1) cart.items[idx].qty = (Number(cart.items[idx].qty) || 0) + quantity;
      else cart.items.push(itemPayload);
      await cart.save();
    }

    return res.status(200).json({ success: true, message: "Item added to cart", cart });
  } catch (error) {
    console.error("addToCart error:", error);
    return res.status(500).json({ success: false, message: "Error adding to cart", error: error.message });
  }
}

export async function getCart(req, res) {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const cart = (await cartModel.findOne({ user: userId })) || null;
    if (!cart || !cart.items.length) {
      return res.status(200).json({
        success: true,
        cart: { items: [] },
        summary: { totalAmount: 0, tax: 0, shipping: 0, finalAmount: 0 },
      });
    }

    const totalAmount = cart.items.reduce((sum, it) => {
      const p = Number(it.price);
      const q = Number(it.qty) || 0;
      return sum + (Number.isFinite(p) ? p : 0) * q;
    }, 0);

    const taxRate = 0.08;
    const shipping = 0;
    const tax = parseFloat((totalAmount * taxRate).toFixed(2));
    const finalAmount = parseFloat((totalAmount + tax + shipping).toFixed(2));

    return res.status(200).json({
      success: true,
      cart,
      summary: { totalAmount, tax, shipping, finalAmount },
    });
  } catch (error) {
    console.error("getCart error:", error);
    return res.status(500).json({ success: false, message: "Error retrieving cart", error: error.message });
  }
}

export async function updateCartItem(req, res) {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res.status(400).json({ success: false, message: "Valid productId and quantity are required." });
    }

    const cart = await cartModel.findOne({ user: userId });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found." });

    const idx = cart.items.findIndex((it) => String(it.productId) === String(productId));
    if (idx === -1) return res.status(404).json({ success: false, message: "Item not found in cart." });

    if (quantity === 0) cart.items.splice(idx, 1);
    else cart.items[idx].qty = quantity;

    await cart.save();
    return res.status(200).json({ success: true, message: "Cart updated", cart });
  } catch (error) {
    console.error("updateCartItem error:", error);
    return res.status(500).json({ success: false, message: "Error updating item", error: error.message });
  }
}

export async function removeCartItem(req, res) {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const { productId } = req.params;
    if (!productId) return res.status(400).json({ success: false, message: "productId is required." });

    const cart = await cartModel.findOne({ user: userId });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found." });

    cart.items = cart.items.filter((it) => String(it.productId) !== String(productId));
    await cart.save();

    return res.status(200).json({ success: true, message: "Item removed", cart });
  } catch (error) {
    console.error("removeCartItem error:", error);
    return res.status(500).json({ success: false, message: "Error removing item", error: error.message });
  }
}

export const clearUserCart = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const cart = await cartModel.findOne({ user: userId });
    if (!cart) return res.status(200).json({ success: true, message: "Cart already empty", cart: { items: [] } });

    cart.items = [];
    await cart.save();

    return res.status(200).json({ success: true, message: "Cart cleared successfully", cart });
  } catch (error) {
    console.error("clearUserCart error:", error);
    return res.status(500).json({ success: false, message: "Error clearing cart", error: error.message });
  }
};
