import { ReactNode, createContext, useReducer } from 'react';

/* --------------------------------------------------------------- */

interface IState {
  isLoading: boolean
}

interface IAction {
  type: string,
  payload: boolean;
}

interface IProps {
  children: ReactNode | number | string;
}

interface IHandlers {
  [key: string]: (state: IState, action: IAction) => IState,
}

/* --------------------------------------------------------------- */

const initialState: IState = {
  isLoading: false,
};

const handlers: IHandlers = {
  SET_IS_LOADING: (state: IState, action: IAction): IState => {
    return {
      ...state,
      isLoading: action.payload
    };
  }
};

const reducer = (state: IState, action: IAction) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

//  Context
const LoadingContext = createContext({
  ...initialState,
  openLoadingAct: () => {},
  closeLoadingAct: () => {}
});

//  Provider
function LoadingProvider({ children }: IProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openLoadingAct = () => {
    dispatch({
      type: 'SET_IS_LOADING',
      payload: true
    });
  };

  const closeLoadingAct = () => {
    dispatch({
      type: 'SET_IS_LOADING',
      payload: false
    });
  };

  return (
    <LoadingContext.Provider
      value={{
        ...state,
        openLoadingAct,
        closeLoadingAct
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export { LoadingContext, LoadingProvider };