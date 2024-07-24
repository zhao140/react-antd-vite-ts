import React from 'react';
import user from './model/user'

class RootStore {
    userStore: typeof user;
    constructor() {
        this.userStore = user;
    }
}
const rootStore = new RootStore();
const context = React.createContext(rootStore);
const useStore = () => React.useContext(context);
export { useStore };
