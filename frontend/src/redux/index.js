import {
    combineReducers,
    configureStore,
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
    getDefaultMiddleware
} from "@reduxjs/toolkit";
import axios from '../axios'
import _ from 'lodash'
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export const login = createAsyncThunk(
    'auth/login',
    async (userId, thunkAPI) => {
        const res = await axios.post("/login", {"user_id": userId})
        thunkAPI.dispatch(fetchBatches())
        return {userId: res.data.success ? userId : null}
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        const res = await axios.post("/logout")
        console.log(res)
    }
)

export const fetchBatches = createAsyncThunk(
    'data/fetchBatches',
    async (_, thunkAPI) => {
        const res = await axios.get('/batches')
        return {batches: res.data.batches}
    }
)

export const fetchCursor = createAsyncThunk(
    'data/fetchCursor',
    async (_, thunkAPI) => {
        const batchId = thunkAPI.getState()['data'].selectedBatchId
        const res = await axios.get("/cursor", {params: {batch_id: batchId}})
        return {cursor: res.data.cursor}
    }
)

export const fetchCands = createAsyncThunk(
    'data/fetchCandidates',
    async ({start, stop}, thunkAPI) => {
        console.log(start, stop)
        const batchId = thunkAPI.getState()['data'].selectedBatchId
        const res = await axios.get("/candidates", {
            params: {start: start, stop: stop, batch_id: batchId}
        })
        return {candidates: res.data.candidates}
    }
)

export const fetchCounts = createAsyncThunk(
    'data/fetchCounts',
    async (_, thunkAPI) => {
        const batchId = thunkAPI.getState()['data'].selectedBatchId
        const res = await axios.get("/batch_stats", {params: {batch_id: batchId}})
        return {counts: res.data.counts}
    }
)

export const setGrade = createAsyncThunk(
    'data/setGrade',
    async ({id, grade}, thunkAPI) => {
        const nextCursor = Math.min(thunkAPI.getState()['data'].cursor + 1)
        thunkAPI.dispatch(dataSlice.actions.setCursor({cursor: nextCursor}))

        const res = await axios.post("/candidates", {id, grade})
        thunkAPI.dispatch(dataSlice.actions.setCounts({counts: res.data.counts}))
        thunkAPI.dispatch(dataSlice.actions.updateCandidate({id, grade}))
    }
)

export const setComment = createAsyncThunk(
    'data/setComment',
    async ({id, comment}, thunkAPI) => {
        await axios.post("/candidates", {id, comment})
        thunkAPI.dispatch(dataSlice.actions.updateCandidate({id, comment}))
    }
)

export const setMark = createAsyncThunk(
    'data/setMark',
    async ({id, type, coordinate}, thunkAPI) => {
        const res = await axios.post("/mark", {id, type, coordinate})
        thunkAPI.dispatch(dataSlice.actions.updateCandidate({id, ...res.data['candidate']}))
    }
)

export const clearMarks = createAsyncThunk(
    'data/clearMarks',
    async ({id}, thunkAPI) => {
        const res = await axios.delete("/mark", {data: {id}})
        thunkAPI.dispatch(dataSlice.actions.updateCandidate({id, ...res.data['candidate']}))
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userId: null
    },
    reducers: {},
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.userId = action.payload.userId
        },
        [logout.pending]: (state, action) => {
            state.userId = null
        }
    }
})

const dataAdapter = createEntityAdapter()

export const dataSlice = createSlice({
    name: 'data',
    initialState: dataAdapter.getInitialState({
        selectedBatchId: null,
        useSkyviewer: true,
        batches: {},
        cursor: null,
        counts: [0, 0, 0, 0, 0],
        filters: [false, false, false, false, false]
    }),
    reducers: {
        flipFilter: (state, action) => {
            state.filters[action.payload.idx] = !state.filters[action.payload.idx]
        },
        setUseSkyviewer: (state, action) => {
            state.useSkyviewer = action.payload.useSkyviewer;
        },
        selectBatch: (state, action) => {
            if (state.batchId !== action.payload.batchId) {
                state.selectedBatchId = action.payload.batchId
                state.cursor = null
                state.candidates = {}
                state.counts = [0, 0, 0, 0, 0]
            }
        },
        updateCandidate: (state, action) => {
            const order = _.findKey(state.candidates, batch => batch.id === action.payload.id)
            state.candidates[order] = {...state.candidates[order], ...action.payload}
        },
        setCursor: (state, action) => {
            state.cursor = Math.min(Math.max(action.payload.cursor, 0), state.batches[state.selectedBatchId].n_cands - 1)
        },
        progressCursor: (state, action) => {
            const direction = action.payload.forward ? 1 : -1;
            let idx = state.cursor + direction;
            const N = state.batches[state.selectedBatchId].n_cands;
            while (0 <= idx && idx < N && state.filters[state.candidates[idx].grade - 1] && state.candidates[idx].grade !== null) {
                idx += direction;
            }
            state.cursor = Math.min(Math.max(idx, 0), N - 1);
        },
        setCounts: (state, action) => {
            state.counts = action.payload.counts
        },
        deleteBatch: (state, action) => {
            state.batches = _.omit(state.batches, [action.payload.batchId])
            state.selectedBatchId = null
        },
    },
    extraReducers: {
        [fetchBatches.fulfilled]: (state, action) => {
            state.batches = _.keyBy(action.payload.batches, 'id') || {}
        },
        [fetchCursor.fulfilled]: (state, action) => {
            state.cursor = action.payload.cursor
        },
        [fetchCands.fulfilled]: (state, action) => {
            action.payload.candidates.forEach(cand => {
                state.candidates[cand.order] = cand
            })
        },
        [fetchCounts.fulfilled]: (state, action) => {
            state.counts = action.payload.counts
        },
        [logout.fulfilled]: state => ({
            selectedBatchId: null,
            batches: [],
            candidates: {},
            cursor: null,
            counts: [0, 0, 0, 0, 0],
            filters: [false, false, false, false, false],
            useSkyviewer: true
        })
    }
})

export const selectedBatch = state => state.data.batches[state.data.selectedBatchId]

const authPersistConfig = {
    key: 'auth',
    storage: storage,
    blacklist: ['candidates']
}

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    data: persistReducer(authPersistConfig, dataSlice.reducer)
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
})

export const persistor = persistStore(store)