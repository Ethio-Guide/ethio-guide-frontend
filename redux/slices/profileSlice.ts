import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface UserProfile {
  email: string;
  id: string;
  name: string;
  profile_picture: string;
  role: string;
  username: string;
}

interface ProfileState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}

interface PasswordChangePayload {
  old_password: string;
  new_password: string;
}

const initialState: ProfileState = {
  user: null,
  loading: false,
  error: null,
  passwordUpdateLoading: false,
  passwordUpdateError: null,
  passwordUpdateSuccess: false,
};

interface ProfileState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  passwordUpdateLoading: boolean;
  passwordUpdateError: string | null;
  passwordUpdateSuccess: boolean;
}

// 🔹 Async thunk for fetching profile
export const fetchProfile = createAsyncThunk<
  UserProfile,
  string, // token
  { rejectValue: string }
>("profile/fetchProfile", async (token, { rejectWithValue }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store", // 🚀 prevents Next.js caching issues
    });

    if (!res.ok) {
      const errorData = await res.json();
      return rejectWithValue(errorData.message || "Failed to fetch profile");
    }

    const data: UserProfile = await res.json();
    return data;
  } catch (error: unknown) {
    let errorMessage = "Network error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return rejectWithValue(errorMessage);
  }
});

// Async thunk for updating password
export const updatePassword = createAsyncThunk<
  any, // response type
  { token: string; payload: PasswordChangePayload },
  { rejectValue: string }
>("profile/updatePassword", async ({ token, payload }, { rejectWithValue }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me/password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return rejectWithValue(errorData.message || "Failed to update password");
    }

    return await res.json();
  } catch (error: unknown) {
    if (error instanceof Error) return rejectWithValue(error.message);
    return rejectWithValue("Unknown error");
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile(state) {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
     resetPasswordUpdateState(state) {
      state.passwordUpdateLoading = false;
      state.passwordUpdateError = null;
      state.passwordUpdateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(updatePassword.pending, (state) => {
        state.passwordUpdateLoading = true;
        state.passwordUpdateError = null;
        state.passwordUpdateSuccess = false;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.passwordUpdateLoading = false;
        state.passwordUpdateSuccess = true;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.passwordUpdateLoading = false;
        state.passwordUpdateError = action.payload || "Failed to update password";
        state.passwordUpdateSuccess = false;
      });
  },
});

export const { clearProfile, resetPasswordUpdateState } = profileSlice.actions;
export default profileSlice.reducer;
