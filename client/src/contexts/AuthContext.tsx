import * as React from 'react';

type AuthParams = {
  token: string;
};

type AuthContextData = {
  isAuthenticated: boolean;
  authenticate: ({ token }: AuthParams) => void;
  logout: () => void;
};

type ProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = React.createContext<AuthContextData>({
  isAuthenticated: false,
  authenticate: () => { },
  logout: () => { },
});

AuthContext.displayName = 'AuthContext';

function setUserToken() {
  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  const token = params.get('token');

  if (token) {
    localStorage.setItem('token', token);
  }

}

export function AuthProvider({ children }: ProviderProps) {
  setUserToken();
  const localToken = localStorage.getItem('token');

  const [isAuthenticated, setIsAuthenticated] = React.useState(
    () => Boolean(localToken?.length) ?? false
  );

  function authenticate({ token }: AuthParams) {
    setIsAuthenticated(true);
    localStorage.setItem('token', token);
  }

  function logout() {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  }

  return (
    <AuthContext.Provider value={{ authenticate, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be within its context');
  }
  return context;
}
