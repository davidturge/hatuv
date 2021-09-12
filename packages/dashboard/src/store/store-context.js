import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import createAccountsStore from './accounts-store';
import createUsersStore from './users-store';
import creatGroupStore from './groups-store';
import creatUIStore from './ui-store';

const StoreContext = createContext(null);

export function useStore() {
  return useContext(StoreContext);
}

export function StoreContextProvider({ children }) {
  const [uiStore] = useState(() => creatUIStore());
  const [accountStore] = useState(() => createAccountsStore());
  const [userStore] = useState(() => createUsersStore());
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
