export const authState = {
  user: { username: "", password: "" },
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
};

export const notificationState = {
  notification: null,
};
