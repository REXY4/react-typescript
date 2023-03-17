import { createContext, useReducer, ReactNode } from 'react';
import { Reducer,  initialState } from '../reducers';

interface ContextValue {
  state:any, 
  dispatch: React.Dispatch<any>;
}

export const UserContext = createContext<ContextValue | undefined>(undefined);

export function UserContextProvider(props: { children: ReactNode }) {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
}
