export const getLocalStorageData = (storageName) => {
  return JSON.parse(localStorage.getItem(storageName));
};
export const setLocalStorageData = (storageName, storageData) => {
  localStorage.setItem(storageName, JSON.stringify(storageData));
};
