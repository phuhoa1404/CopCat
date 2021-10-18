
import { getToken, getUser } from '../utils/utils';
import { SagaAction } from '../utils/models/media.model'

interface InitialStateType {
    loading: boolean;
    error: boolean;
    token: any;
    errorMessage: string;
    username: any;
    isLoggedIn: boolean;
    profilePic: null;
  }
  
  const initialState = {
    loading: false,
    error: false,
    token: getToken(),
    errorMessage: '',
    username: getUser(),
    isLoggedIn: false,
    profilePic: null,
  };

  export const loginReducer = (
    state: InitialStateType = initialState,
    action: SagaAction,
  ) => {
    switch (action.type) {
      case "INIT_LOGIN": {
        return { ...state, loading: true, error: false, errorMessage: '' };
      }
      case "LOGIN_SUCCESS": {
        return { ...state, isLoggedIn: true };
      }
      case "SET_TOKEN": {
        return {
          ...state,
          loading: false,
          token: action.token,
          username: action.username,
        };
      }
      case "SET_TOKEN_FAILED": {
        return {
          ...state,
          loading: false,
          error: true,
          errorMessage: action.error,
        };
      }
      case "HANDLE_PROFILE_PIC": {
        return {
          ...state,
          profilePic: action.profilePic,
        };
      }
      default:
        return state;
    }
  };