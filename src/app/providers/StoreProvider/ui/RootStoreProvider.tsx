import { ReactNode } from 'react';
import RootStore from '../model/store/rootStore';
import { RootStoreContext } from '../config/rootStoreContext';

export const RootStoreProvider = ({ children }: { children: ReactNode }) => {
  return <RootStoreContext.Provider value={new RootStore()}>{children}</RootStoreContext.Provider>;
};
