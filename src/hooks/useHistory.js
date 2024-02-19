import { useNavigate, useLocation } from "react-router-dom";

export const useHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // call back function
  const listen = (cb) => {
    return window.history.listen((location, action) => {
      cb({ location, action });
    });
  };

  return {
    push: navigate,
    go: navigate,
    goBack: () => navigate(-1),
    goForward: () => navigate(1),
    listen,
    location,
  };
};
