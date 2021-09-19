import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "@models";
import { GetUsers } from "@services";

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
    const getUsers = async () => {
      const result = await GetUsers();
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
