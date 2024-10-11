import { SECURE_SROGARE } from "@/types";

const setItem = (name: SECURE_SROGARE, value: string) => {
  return localStorage.setItem(name, value);
};

const getItem = (name: SECURE_SROGARE) => {
  return localStorage.getItem(name);
};

const removeItem = (name: SECURE_SROGARE) => {
  return localStorage.removeItem(name);
};

const secureStorage = {
  setItem,
  getItem,
  removeItem,
};

export default secureStorage;
