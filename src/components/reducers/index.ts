import { combineReducers } from 'redux';
import { loginReducer } from './login';
import { globalReducer } from '../slices/global.slice';

export const rootReducer = combineReducers({
    login: loginReducer,
    global: globalReducer,
  });
  
  export type RootState = ReturnType<typeof rootReducer>;
  export type DefaultRootState = ReturnType<typeof rootReducer>;