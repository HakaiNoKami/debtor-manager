import { Debt } from "@models";
import { DeleteDebt, GetDebts, PostDebt, PutDebt } from "@services";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type DebtsContextData = {
  debts: Array<Debt>;
  addDebt: (debt: Debt) => void;
  editDebt: (debt: Debt) => void;
  removeDebt: (id: string) => void;
};

type DebtsProviderProps = {
  children: ReactNode;
};

export const DebtsContext = createContext({} as DebtsContextData);
DebtsContext.displayName = "DebtsContext";

export const DebtsProvider = ({ children }: DebtsProviderProps) => {
  const [debts, setDebts] = useState<Array<Debt>>();

  useEffect(() => {
    let getDebts = async () => {
      let result = await GetDebts();
      if (result.data.success) {
        setDebts(result.data.result);
      }
    };

    getDebts();
  }, []);

  const addDebt = async (debt: Debt) => {
    const result = await PostDebt(debt);

    if (result.data.success) {
      debt._id = result.data.result;
      setDebts([...debts, debt]);
    }
  };

  const editDebt = async (debt: Debt) => {
    const result = await PutDebt(debt);

    if (result.data.success) {
      let newDebts = debts.filter(
        (currentdebt) => currentdebt._id !== debt._id
      );
      setDebts([...newDebts, debt]);
    }
  };

  const removeDebt = async (id: string) => {
    const result = await DeleteDebt(id);

    if (result.data.success) {
      let newDebts = debts.filter((debt) => debt._id !== id);
      setDebts(newDebts);
    }
  };

  return (
    <DebtsContext.Provider value={{ debts, addDebt, editDebt, removeDebt }}>
      {children}
    </DebtsContext.Provider>
  );
};

export const useDebtsContext = () => useContext(DebtsContext);
