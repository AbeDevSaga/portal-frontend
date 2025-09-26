import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import resident from "@/common/utils/constants/mock/resident-mock";

// Default user = first resident
const initialState = resident[0];

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<typeof initialState>) => {
      return action.payload;
    },
    updateUserField: (state, action: PayloadAction<{ key: string; value: any }>) => {
      const { key, value } = action.payload;
      (state as any)[key] = value; // updates top-level fields
    },
    resetUser: () => initialState,
  },
});

export const { setUser, updateUserField, resetUser } = userSlice.actions;
export default userSlice.reducer;
