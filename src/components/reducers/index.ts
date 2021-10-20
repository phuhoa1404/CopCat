import { combineReducers } from 'redux';
import { loginReducer } from './login';
import { dataReducer } from '../slices/global.slice';

export const rootReducer = combineReducers({
    login: loginReducer,
    data: dataReducer,
  });
  
  export type RootState = ReturnType<typeof rootReducer>;
  export type DefaultRootState = ReturnType<typeof rootReducer>;