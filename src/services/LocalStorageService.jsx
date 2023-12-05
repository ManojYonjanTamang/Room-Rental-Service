export const storeToken = (value) => {
  if (value) {
    // console.log("Store Token: ", value);
    localStorage.setItem("accessToken", value.access);
    localStorage.setItem("refreshToken", value.refresh);
  }
};

export const getToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  // console.log(accessToken, refreshToken);
  return { accessToken, refreshToken };
};

export const removeToken = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
