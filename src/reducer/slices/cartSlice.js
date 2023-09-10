import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
	cart: localStorage.getItem("cart")
		? JSON.parse(localStorage.getItem("cart"))
		: [],

	totalItems: localStorage.getItem("totalItems")
		? JSON.parse(localStorage.getItem("totalItems"))
		: 0,
	total: localStorage.getItem("total")
		? JSON.parse(localStorage.getItem("total"))
		: 0,
};

export const cartSlice = createSlice({
	name: "cart",
	initialState: initialState,
	reducers: {
		addToCart: (state, value) => {
			const course = value.payload;
			const presentItemIndex = state.cart.findIndex(
				(item) => item._id === course._id
			);
			if (presentItemIndex >= 0) {
				// If the course is already in the cart, do not modify the quantity
				toast.success("Item already in Cart");
				return;
			}
			// If the course is not in the cart, add it to the cart
			state.cart.push(course);
			// Update the total quantity and price
			state.totalItems++;
			state.total += course.price;
			// Update to localstorage
			localStorage.setItem("cart", JSON.stringify(state.cart));
			localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
			localStorage.setItem("total", JSON.stringify(state.total));
			//show toast
			toast.success("Course added to Cart");
		},
		removeFromCart: (state, value) => {
			const courseId = value.payload;
			const index = state.cart.findIndex((item) => item._id === courseId);
			if (index >= 0) {
				// If the course is found in the cart, remove it
				state.totalItems--;
				state.total -= state.cart[index].price;
				state.cart.splice(index, 1);
				//Update to localstrorage
				localStorage.setItem("cart", JSON.stringify(state.cart));
				localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
				localStorage.setItem("total", JSON.stringify(state.total));
				//show toast
				toast.success("Course removed from Cart");
			}
			// return state.cart.filter((item) => item.id !== value.payload);
		},
		resetCart: (state) => {
			state.cart = [];
			state.totalItems = 0;
			state.total = 0;
			//Reset localstorage
			localStorage.removeItem("cart");
			localStorage.removeItem("totalItems");
			localStorage.removeItem("total");
		},
	},
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
