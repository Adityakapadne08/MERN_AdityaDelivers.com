//,redirect user to this page , will be inside the auth0

import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import  { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
    const navigate = useNavigate();
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();
  //stores the state values i.e whenever state gets changes that does not let component to rerender 
  const hasCreatedUser = useRef(false);

  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      hasCreatedUser.current=true; 
    }
    navigate("/")
  }, [createUser,navigate,user]);
};


export default AuthCallbackPage;
