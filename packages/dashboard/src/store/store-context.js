import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import createAccountStore from './account-store';
import createUserStore from './users-store';
import creatGroupStore from './groups-store';
import creatUIStore from './ui-store';

const StoreContext = createContext(null);

export function useStore() {
  return useContext(StoreContext);
}

export function StoreContextProvider({ children }) {
  const [uiStore] = useState(() => creatUIStore());
  const [userStore] = useState(() => createUserStore());
  const [accountStore] = useState(() => createAccountStore(userStore));
  const [groupStore] = useState(() => creatGroupStore());

  const value = {
    uiStore,
    accountStore,
    userStore,
    groupStore
  };

  StoreContextProvider.propTypes = {
    children: PropTypes.node.isRequired
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreContext;
