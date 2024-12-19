import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "seller") {
        window.failure("You are not a seller!");
        navigate("/");
        return;
      }
    } catch (err) {
      console.error(err);
      window.failure("Token expired!");
      localStorage.removeItem("token"); 
      navigate("/login"); 
    }
  }, [navigate]);
};

export default useAuth;
