import { Debt } from "@models";
import { NumberFormatter } from "@utils";
import { Tooltip, Button, Modal as AntModal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { FormValues, Modal } from "@components";

import style from "@styles/components/debtItem.module.scss";
import { useDebtsContext, useUsersContext } from "@providers";
import { useState } from "react";

type DebtItemProps = {
  debt: Debt;
};

export const DebtItem = ({ debt }: DebtItemProps) => {
  const [open, setOpen] = useState(false);
  const { users } = useUsersContext();
  const { editDebt, removeDebt } = useDebtsContext();

  const toggleOpen = () => setOpen(!open);

  const conclueDebt = async (values: FormValues) => {
    debt.idUsuario = values.customer;
    debt.motivo = values.reason;
    debt.valor = values.amount;

    editDebt(debt);
  };

  const changeDelete = () => {
    AntModal.confirm({
      title: "Debt remover",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone",
      okText: "Confirm",
      cancelText: "Cancel",
      onOk: () => removeDebt(debt._id),
    });
  };

  return (
    <div className={style.debt}>
      <p>
        {debt.motivo} - {NumberFormatter(debt.valor)}
      </p>
      <div className={style.actions}>
        <Tooltip title="Edit debt">
          <Button shape="circle" icon={<EditOutlined />} onClick={toggleOpen} />
        </Tooltip>
        <Tooltip title="Delete debt">
          <Button
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={changeDelete}
          />
        </Tooltip>
      </div>
      <Modal
        open={open}
        toggleOpen={toggleOpen}
        conclueDebt={conclueDebt}
        users={users}
        intialValues={{
          amount: debt.valor,
          customer: debt.idUsuario,
          reason: debt.motivo,
        }}
      />
    </div>
  );
};
