import { User } from "@models";
import { GetUsers } from "@services";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type UsersContextData = {
  users: Array<User>;
};

type UsersProviderProps = {
  children: ReactNode;
};

export const UsersContext = createContext({} as UsersContextData);
UsersContext.displayName = "UsersContext";

export const UsersProvider = ({ children }: UsersProviderProps) => {
  const [users, setUsers] = useState<Array<User>>();

  useEffect(() => {
    let getUsers = async () => {
      let result = await GetUsers();
      if (result.data) {
        setUsers(result.data);
      }
    };

    getUsers();
  }, []);

  return (
    <UsersContext.Provider value={{ users }}>{children}</UsersContext.Provider>
  );
};

export const useUsersContext = () => useContext(UsersContext);
