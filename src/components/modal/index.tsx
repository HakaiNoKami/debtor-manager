import { Modal as AntModal, Form, Select, Input, InputNumber } from "antd";
import { User } from "@models";
import style from "@styles/components/modal.module.scss";

const { Option } = Select;

export type FormValues = {
  amount: number;
  customer: number;
  reason: string;
};

type ModalProps = {
  open: boolean;
  toggleOpen: () => void;
  conclueDebt: (values: FormValues) => void;
  users: Array<User>;
  intialValues?: FormValues;
};

export const Modal = ({
  open,
  toggleOpen,
  conclueDebt,
  users,
  intialValues,
}: ModalProps) => {
  const [form] = Form.useForm();

  return (
    <AntModal
      className={style.modal}
      title={intialValues ? "Edit a debt" : "Add a new debt to a user"}
      okText={intialValues ? "Edit" : "Create"}
      cancelText="Cancel"
      visible={open}
      onOk={() =>
        form
          .validateFields()
          .then((values: FormValues) => {
            form.resetFields();
            conclueDebt(values);
            toggleOpen();
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          })
      }
      onCancel={() => {
        form.resetFields();
        toggleOpen();
      }}
    >
      <Form
        form={form}
        layout="vertical"
        className={style.form}
        initialValues={intialValues}
      >
        <Form.Item
          name="customer"
          label="Customer"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select a customer" allowClear>
            {users?.map((user) => (
              <Option key={user.id} value={user.id}>
                {user.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="reason" label="Reason" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
          <InputNumber
            className={style.amount}
            formatter={(value) =>
              `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value: string) => value.replace(/R\$\s?|(,*)/g, "")}
          />
        </Form.Item>
      </Form>
    </AntModal>
  );
};
