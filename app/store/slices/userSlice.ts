// // store/slices/userSlice.ts

// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";

// // Define the shape of the user data
// interface UserProfile {
//   id: string;
//   name: string;
//   email: string;
//   username: string;
//   profile_picture: string;
//   role: string;
//   is_verified: boolean;
//   created_at: string;
// }

// // Define the state structure for this slice
// interface UserState {
//   profile: UserProfile | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: UserState = {
//   profile: null,
//   loading: false,
//   error: null,
// };

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// // --- Thunks now accept a `token` argument ---

// export const fetchUserProfile = createAsyncThunk(
//   "user/fetchProfile",
//   async (token: string, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/auth/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch profile"
//       );
//     }
//   }
// );

// interface UpdateProfileArgs {
//   profileData: { name: string; userDetail: { username: string } };
//   token: string;
// }
// export const updateUserProfile = createAsyncThunk(
//   "user/updateProfile",
//   async ({ profileData, token }: UpdateProfileArgs, { rejectWithValue }) => {
//     try {
//       const response = await axios.patch(
//         `${API_BASE_URL}/auth/me`,
//         profileData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to update profile"
//       );
//     }
//   }
// );

// interface UpdatePasswordArgs {
//   passwordData: { old_password: string; new_password: string };
//   token: string;
// }
// export const updatePassword = createAsyncThunk(
//   "user/updatePassword",
//   async ({ passwordData, token }: UpdatePasswordArgs, { rejectWithValue }) => {
//     try {
//       await axios.patch(`${API_BASE_URL}/auth/me/password`, passwordData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to update password"
//       );
//     }
//   }
// );

// // --- The slice definition remains the same ---

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch Profile
//       .addCase(fetchUserProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(
//         fetchUserProfile.fulfilled,
//         (state, action: PayloadAction<UserProfile>) => {
//           state.loading = false;
//           state.profile = action.payload;
//         }
//       )
//       .addCase(fetchUserProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       // Update Profile
//       .addCase(updateUserProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(
//         updateUserProfile.fulfilled,
//         (state, action: PayloadAction<UserProfile>) => {
//           state.loading = false;
//           state.profile = action.payload;
//         }
//       )
//       .addCase(updateUserProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       // Update Password
//       .addCase(updatePassword.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updatePassword.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(updatePassword.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export default userSlice.reducer;


import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// (The UserProfile interface remains the same)
interface UserProfile {
  id: string;
  name: string;
  email: string;
  username: string;
  profile_picture: string;
  role: string;
  is_verified: boolean;
  created_at: string;
}

// Define the state structure
interface UserState {
  profile: UserProfile | null;
  // Independent status for profile fetching/updating
  profileStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  profileError: string | null;
  // Independent status for password updating
  passwordStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  passwordError: string | null;
}

const initialState: UserState = {
  profile: null,
  profileStatus: 'idle',
  profileError: null,
  passwordStatus: 'idle',
  passwordError: null,
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// --- Thunks remain the same, but their effects on the state will change ---

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (token: string, { rejectWithValue }) => {
    // ... (no changes to the thunk logic itself)
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

interface UpdateProfileArgs {
  profileData: { name: string; userDetail: { username: string } };
  token: string;
}
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ profileData, token }: UpdateProfileArgs, { rejectWithValue }) => {
    // ... (no changes to the thunk logic itself)
    try {
      const response = await axios.patch(`${API_BASE_URL}/auth/me`, profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

interface UpdatePasswordArgs {
  passwordData: { old_password: string; new_password: string };
  token: string;
}
export const updatePassword = createAsyncThunk(
  'user/updatePassword',
  async ({ passwordData, token }: UpdatePasswordArgs, { rejectWithValue }) => {
    // ... (no changes to the thunk logic itself)
    try {
      const response = await axios.patch(`${API_BASE_URL}/auth/me/password`, passwordData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Return the response data for potential success messages
      return response.data;
    } catch (error: any)      {
      // Specifically check for error structure from the backend
      console.error('Password update error:', error.response?.data);
      return rejectWithValue(error.response?.data?.message || 'An unknown error occurred during password update');
    }
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // A reducer to clear password status, e.g., after showing a success message
    clearPasswordStatus: (state) => {
        state.passwordStatus = 'idle';
        state.passwordError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // --- Cases for Profile Actions ---
      .addCase(fetchUserProfile.pending, (state) => {
        state.profileStatus = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.profileStatus = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.profileStatus = 'failed';
        state.profileError = action.payload as string;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.profileStatus = 'loading';
        state.profileError = null; // Clear previous errors
      })
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.profileStatus = 'succeeded';
        state.profile = action.payload; // Update profile with new data from server
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.profileStatus = 'failed';
        state.profileError = action.payload as string;
      })
      // --- Cases for Password Actions ---
      .addCase(updatePassword.pending, (state) => {
        state.passwordStatus = 'loading';
        state.passwordError = null; // Clear previous errors
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.passwordStatus = 'succeeded';
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.passwordStatus = 'failed';
        state.passwordError = action.payload as string;
      });
  },
});

export const { clearPasswordStatus } = userSlice.actions;
export default userSlice.reducer;