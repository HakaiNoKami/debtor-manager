import axios from "axios";
import { Debt } from "../models";

const BaseUrl = process.env.NEXT_PUBLIC_BACK_END_BASE_URL ?? "";
const UUID = process.env.NEXT_PUBLIC_UUID ?? "";

type Response<T> = {
  success: boolean;
  message: string;
  result: T;
};

type InternalResult = {
  n: number;
  nModified: number;
  opTime: {
    ts: string;
    t: number;
  };
  electionId: string;
  ok: number;
  clusterTime: {
    clusterTime: string;
    signature: {
      hash: string;
      keyId: string;
    };
  };
  operationTime: string;
};

const _axiosClient = axios.create({
  baseURL: BaseUrl,
});

_axiosClient.interceptors.request.use(
  (request) => {
    request.params = { ...request.params, uuid: UUID };
    return request;
  },
  (error) => Promise.reject(error)
);

// #region Calls
export const GetDebts = () => {
  return _axiosClient.get<Response<Array<Debt>>>(`divida`);
};

export const GetDebtById = (id: string) => {
  return _axiosClient.get<Response<Debt>>(`divida/${id}`);
};

export const PostDebt = (debt: Debt) => {
  return _axiosClient.post<Response<string>>(`divida`, {
    idUsuario: debt.idUsuario,
    motivo: debt.motivo,
    valor: debt.valor,
  });
};

export const PutDebt = (debt: Debt) => {
  return _axiosClient.put<Response<InternalResult>>(`divida/${debt._id}`, {
    idUsuario: debt.idUsuario,
    motivo: debt.motivo,
    valor: debt.valor,
  });
};

export const DeleteDebt = (id: string) => {
  return _axiosClient.delete<Response<InternalResult>>(`divida/${id}`);
};
// #endregion
