import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  user: { name: string; role: string } | null;
  token: string | null;
}

// Function to load state from localStorage
const loadState = (): AuthState => {
  try {
    const serializedState = localStorage.getItem('auth');
    if (serializedState === null) {
      return { user: null, token: null };
    }
    const storedState: AuthState = JSON.parse(serializedState);
    
    // Validate the stored state: if user exists but role is missing, it's an old/invalid state.
    // In such cases, we clear the state to force re-login and get proper user data.
    if (storedState.user && !storedState.user.role) {
      console.warn("Found old authentication state in localStorage without a 'role'. Clearing state.");
      return { user: null, token: null };
    }
    return storedState;
  } catch (error) {
    console.error("Error loading state from localStorage", error);
    return { user: null, token: null };
  }
};

// Function to save state to localStorage
const saveState = (state: AuthState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('auth', serializedState);
  } catch (error) {
    console.error("Error saving state to localStorage", error);
  }
};

const initialState: AuthState = loadState(); // Initialize state from localStorage

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: { name: string; role: string }; token: string }>
    ) => {
      state.user = user;
      state.token = token;
      saveState(state); // Save state to localStorage
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      saveState(state); // Clear state from localStorage
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
