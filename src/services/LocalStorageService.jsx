export const storeToken = (value) => {
  if (value) {
    // console.log("Store Token: ", value);
    localStorage.setItem("token", value);
  }
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const removeToken = () => {
  const token = localStorage.removeItem("token");
  return token;
};
