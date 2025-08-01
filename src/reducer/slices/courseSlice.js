const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
	step: 1,
	course: [],
	editCourse: false,
};

export const courseSlice = createSlice({
	name: "course",
	initialState: initialState,
	reducers: {
		setStep: (state, action) => {
			state.step = action.payload;
		},
		setCourse: (state, action) => {
			state.course = action.payload;
		},
		setEditCourse: (state, action) => {
			state.editCourse = action.payload;
		},
		resetCourseState: (state, action) => {
			state.step = 1;
			state.course = null;
			state.editCourse = false;
		},
	},
});

export const { setStep, setCourse, setEditCourse, resetCourseState } =
	courseSlice.actions;
export default courseSlice.reducer;
