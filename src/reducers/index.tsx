interface State {
    user: any;
    token: string;
  }
  
  enum ActionType {
    Login = 'LOGIN',
    CheckUser = 'CHECK_USER',
    Logout = 'LOGOUT',
  }
  
  interface Action {
    type: ActionType;
  }
  
  interface AuthAction extends Action {
    type: ActionType.Login;
    payload: { token: string };
  }
  
  interface UserAction extends Action {
    type: ActionType.CheckUser;
    payload: any;
  }
  
  interface LogoutAction extends Action {
    type: ActionType.Logout;
    payload: any;
  }
  
  const initialState: State = {
    user: null,
    token: '',
  };
  
  function Reducer(state: State, action: AuthAction | UserAction | LogoutAction): State {
    switch (action.type) {
      case ActionType.Login:
        localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          token: action.payload.token,
        };
      case ActionType.CheckUser:
        return {
          ...state,
          user: action.payload,
        };
      case ActionType.Logout:
        localStorage.clear();
        return {
          ...state,
          user: null,
        };
      default:
        throw new Error('Invalid action type');
    }
  }
  
  export { Reducer, initialState };