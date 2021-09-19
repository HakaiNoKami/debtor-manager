import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Debt } from "@models";
import { DeleteDebt, GetDebts, PostDebt, PutDebt } from "@services";

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
    const getDebts = async () => {
      const result = await GetDebts();
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
      const idx = debts.findIndex(
        (currentDebt) => currentDebt._id === debt._id
      );
      debts[idx] = debt;
      setDebts(debts);
    }
  };

  const removeDebt = async (id: string) => {
    const result = await DeleteDebt(id);

    if (result.data.success) {
      const newDebts = debts.filter((debt) => debt._id !== id);
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
