import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import { combineReducers } from 'redux';
import userReducer from '../utils/slices/user.slice.js';
import adminReducer from '../utils/slices/admin.slice.js';
import themeReducer from './slices/theme.slice.js';
import topicReducer from './slices/topic.slice.js'
import subTopicReducer from './slices/subtopic.slice.js';
import questionReducer from './slices/question.slice.js';
// Combine reducers
const rootReducer = combineReducers({
    admin: adminReducer,
    user: userReducer,
    theme: themeReducer,
    topic: topicReducer,
    subtopic: subTopicReducer,
    question: questionReducer,
});

// Persist configuration
const persistConfig = {
    key: 'root',
    storage,
};

// Apply persistReducer to rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // To avoid warnings/errors when using non-serializable values in state
        }),
});

// Persistor for redux-persist
const persistor = persistStore(store);

// Export both store and persistor
export { store, persistor };
