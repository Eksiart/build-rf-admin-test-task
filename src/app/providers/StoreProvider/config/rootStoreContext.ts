import { createContext, useContext } from 'react';
import RootStore from '../model/store/rootStore';

export const RootStoreContext = createContext<RootStore | null>(null);

export const useRootStore = () => {
  const context = useContext(RootStoreContext);
  if (context === null) {
    throw new Error('Root Store not found');
  }
  return context;
};
