// Vai ter as importação dos reduces
// e a criação de toda a  estrutura de todo o meu persist
import {createStore} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
//independente da raiz(tamanho)que vai ter o reducer
//ele vai salvar tudo

import rootReducer from './reduces' //vai puxar automaticamente o index
const persistConfig = {
    key:'root',
    storage: AsyncStorage,
    stateReconciler: hardSet

};

const pReducer = persistReducer(persistConfig , rootReducer);

export const store = createStore(pReducer);
export const persistor = persistStore(store);