import React, { createContext, useEffect, useReducer } from 'react';
import jwtDecode, { JwtPayload } from 'jwt-decode';

import { ACCOUNT_INITIALISE, LOGIN, LOGOUT } from "../store/actions";
import axios from '../services/auth-mock-apis.service';
import accountReducer from '../store/reducers/accountReducer';

interface InitialState {
  isLoggedIn: boolean,
  isInitialised: boolean,
  user: object | null
}

interface AuthContext {
  isLoggedIn: boolean,
  isInitialised: boolean,
  user: object | null,
  login : (username: string, password: string) => void,
  logout: () => void,
}

const initialState: InitialState = {
  isLoggedIn: false,
  isInitialised: false,
  user: null
};

const verifyToken = (serviceToken: string) => {
  if (!serviceToken) {
    return false;
  }

  const decoded: JwtPayload = jwtDecode(serviceToken);
  const exp = decoded.exp;
  return decoded.exp && decoded.exp > (Date.now() / 1000);
};

const setSession = (serviceToken: string | null) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem('serviceToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

const JWTContext = createContext<AuthContext>({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => { }
});
export const JWTProvider = ({ children }: { children : JSX.Element | JSX.Element[] }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  const login = async (username: string, password: string) => {
    const response = await axios.post('/mock-api/account/login', { username, password });
    const { serviceToken, user } = response.data;
    setSession(serviceToken);
    dispatch({
      type: LOGIN,
      payload: {
        user
      }
    });
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT, payload: {} });
  };

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem('serviceToken');
        if (serviceToken && verifyToken(serviceToken)) {
          setSession(serviceToken);
          const response = await axios.get('/mock-api/account/me');
          const { user } = response.data;
          dispatch({
            type: ACCOUNT_INITIALISE,
            payload: {
              isLoggedIn: true,
              user
            }
          });
        } else {
          dispatch({
            type: ACCOUNT_INITIALISE,
            payload: {
              isLoggedIn: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: ACCOUNT_INITIALISE,
          payload: {
            isLoggedIn: false,
            user: null
          }
        });
      }
    };
    init();
  }, []);


  return (
    <JWTContext.Provider value={{ ...state, login, logout}}>
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;