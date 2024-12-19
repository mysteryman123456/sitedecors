const Logout = () => {
  const isValid = localStorage.getItem("token");
  if (isValid) {
    localStorage.removeItem("token");
    return
  }
};

export default Logout;