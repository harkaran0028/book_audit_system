import { AsyncLocalStorage } from 'async_hooks';

export const als = new AsyncLocalStorage<any>();

export const getContext = () => als.getStore();
