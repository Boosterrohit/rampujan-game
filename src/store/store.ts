import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import rootSaga from "./sagas"; // Your root saga
import rootReducer from "./rootReducer";

// Persist configuration
const persistConfig = {
  key: "root", // Key for storage
  storage, // Default localStorage for web
  whitelist: ["auth"], // List of reducers you want to persist (e.g., "auth")
};

// Create Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable warnings for non-serializable values like sagas
    }).concat(sagaMiddleware), // Add Saga middleware
});

// Run root saga
sagaMiddleware.run(rootSaga);

// Persistor for managing persisted state
const persistor = persistStore(store);

// Export store and persistor
export { store, persistor };

// Export types for usage throughout your app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
