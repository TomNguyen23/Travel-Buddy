import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@/api/custom-axios";

const initialState = {
    login: {
        user: null,
        token: null,
    },
    register: {
        user: null,
        error: false,
        ErrorMessage: null,
    },
    forgetPasswordInfo: null,
};

export const login = createAsyncThunk('auth/login', async (body, thunkAPI) => {
    try {
        const res = await axios.post('api/login', body, {
            signal: thunkAPI.signal
        });
        return res.data;
    } catch (error) {
        console.log(error);
        if (error.response) {
            return thunkAPI.rejectWithValue(error.response.data);
        } else {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
    
})

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        setCredentials(state, action) {
            const { accessToken, userInfo } = action.payload;
            state.login.user = userInfo;
            state.login.token = accessToken;
        },

        setAvatar(state, action) {
            state.login.user.avatar = action.payload;
        },

        logout(state) {
            state.login.user = null;
            state.login.token = null;
        },

        register(state, action) {
            state.register.isFetching = false;
            state.register.user = action.payload;
            state.register.error = false;
        },

        clearRegister(state) {
            state.register = {
                user: null,
                isFetching: false,
                error: false,
                ErrorMessage: null,
            };
        }, 

        forgetPassword(state, action) {
            state.forgetPasswordInfo = action.payload;
        },

        clearForgetPassword(state) {
            state.forgetPasswordInfo = null;
        }
    },

    extraReducers(builder) {
        builder
        .addCase(login.fulfilled, (state, action) => {
            state.login.isFetching = false;
            state.login.user = action.payload;
            state.login.error = false;
        });

    }
});

export const { setCredentials, setAvatar, logout, register, clearRegister, forgetPassword, clearForgetPassword } = authSlice.actions;

export default authSlice.reducer;