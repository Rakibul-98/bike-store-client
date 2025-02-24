import { createSlice } from "@reduxjs/toolkit";
import { CartType, ItemType } from "../../../interfaces/interfaces";

interface CartState {
  items: ItemType[];
  totalAmount: number;
  totalItems: number;
  shippingCost: number;
  tax: number;
  discount: number;
  grandTotal: number;
  appliedCoupon: string | null;
  validCoupons: Record<string, number>;
}

const loadCartFromLocalStorage = (): Partial<CartState> => {
  try {
    const saved = localStorage.getItem("cart");
    if (!saved) return { items: [] };

    const parsed = JSON.parse(saved);

    const validItems = Array.isArray(parsed?.items)
      ? parsed.items.filter(
          (item: ItemType) =>
            item?._id &&
            item?.cart_quantity &&
            item?.available_quantity &&
            item?.price
        )
      : [];

    return {
      items: validItems,
      appliedCoupon: parsed.appliedCoupon || null,
      discount: Number(parsed.discount) || 0,
    };
  } catch (error) {
    console.error("Failed to load cart:", error);
    return { items: [] };
  }
};

const initialCartData = loadCartFromLocalStorage();

const initialState: CartState = {
  items: initialCartData.items || [],
  totalAmount: 0,
  totalItems: 0,
  shippingCost: 0,
  tax: 0,
  discount: initialCartData.discount || 0,
  grandTotal: 0,
  appliedCoupon: initialCartData.appliedCoupon || null,
  validCoupons: {
    SAVE20: 20,
    FREEDEL: 500,
  },
};

const saveCartToLocalStorage = (state: CartState) => {
  try {
    const toSave = {
      items: state.items,
      appliedCoupon: state.appliedCoupon,
      discount: state.discount,
    };
    localStorage.setItem("cart", JSON.stringify(toSave));
  } catch (error) {
    console.error("Failed to save cart:", error);
  }
};

const calculateTotals = (state: CartType) => {
  state.totalAmount = state.items.reduce(
    (total, item) => total + item.price * item.cart_quantity,
    0
  );
  state.totalItems = state.items.reduce(
    (total, item) => total + item.cart_quantity,
    0
  );

  if (state.totalItems < 10 && state.totalItems > 0) {
    state.shippingCost = 500;
  } else if (state.totalItems >= 10 && state.totalItems < 20) {
    state.shippingCost = 300;
  } else if (state.totalItems >= 20) {
    state.shippingCost = 200;
  } else {
    state.shippingCost = 0;
  }

  state.tax = parseFloat((state.totalAmount * 0.15).toFixed(2));

  if (state.coupon === "SAVE20") {
    state.discount = parseFloat((state.totalAmount * 0.2).toFixed(2));
  } else {
    state.discount = 0;
  }

  state.grandTotal = parseFloat(
    (
      state.totalAmount +
      state.shippingCost +
      state.tax -
      state.discount
    ).toFixed(2)
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (!Array.isArray(state.items)) state.items = [];

      const product = action.payload;
      const existingItem = state.items.find((item) => item._id === product._id);

      if (existingItem) {
        if (existingItem.cart_quantity < existingItem.available_quantity) {
          existingItem.cart_quantity += 1;
        }
      } else {
        state.items.push({ ...product, cart_quantity: 1 });
      }

      calculateTotals(state);
      saveCartToLocalStorage(state);
    },

    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item._id === productId);

      if (existingItem) {
        existingItem.cart_quantity += 1;
      }

      calculateTotals(state);
      saveCartToLocalStorage(state);
    },

    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item._id === productId);

      if (existingItem) {
        if (existingItem.cart_quantity > 1) {
          existingItem.cart_quantity -= 1;
        } else {
          state.items = state.items.filter((item) => item._id !== productId);
        }
      }

      calculateTotals(state);
      saveCartToLocalStorage(state);
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item._id !== productId);

      calculateTotals(state);
      saveCartToLocalStorage(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.appliedCoupon = null;
      state.discount = 0;

      calculateTotals(state);
      saveCartToLocalStorage(state);
    },
    // },
    applyCoupon: (state, action) => {
      const couponCode = action.payload;
      const discountValue = state.validCoupons[couponCode];

      if (discountValue) {
        state.appliedCoupon = couponCode;
        state.discount =
          typeof discountValue === "number" && discountValue < 100
            ? (state.totalAmount * discountValue) / 100
            : discountValue;
      } else {
        state.appliedCoupon = null;
        state.discount = 0;
      }

      state.grandTotal = parseFloat(
        (
          state.totalAmount +
          state.shippingCost +
          state.tax -
          state.discount
        ).toFixed(2)
      );
      saveCartToLocalStorage(state);
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  applyCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;
