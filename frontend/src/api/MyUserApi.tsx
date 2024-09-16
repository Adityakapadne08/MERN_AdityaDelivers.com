// have all the hooks that we r going to need to interact with myuserapi api
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//type for user rqst which ll describe all the properties need in the body .
type CreateUserRequest = {
  auth0Id: string;
  email: string;
};
export const useCreateMyUser = () => {
  //getting func that lets us fetch the user token using useauth0 hook
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isSuccess,
    isError,
  } = useMutation(createMyUserRequest);

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};
