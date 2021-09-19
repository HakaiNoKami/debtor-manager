import Head from "next/head";
import { CardUser, FormValues, Modal } from "@components";
import { Layout } from "@containers";
import { Debt } from "@models";
import { useDebtsContext, useUsersContext } from "@providers";
import { Button, Row } from "antd";
import { useState } from "react";

import style from "@styles/pages/index.module.scss";

export const Home = () => {
  const [open, setOpen] = useState(false);
  const { users } = useUsersContext();
  const { debts, addDebt } = useDebtsContext();

  const toggleOpen = () => setOpen(!open);

  const addNewDebt = async (values: FormValues) => {
    let debt: Debt = {
      idUsuario: values.customer,
      motivo: values.reason,
      valor: values.amount,
    };

    addDebt(debt);
  };

  return (
    <>
      <Head>
        <title>Debtor manager</title>
        <meta name="description" content="My own debtor manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout
        title="User list"
        subTitle="All users who have debts"
        extra={[
          <Button type="primary" key="1" onClick={toggleOpen}>
            New debt
          </Button>,
        ]}
      >
        <div className={style.userList}>
          {debts ? (
            <Row>
              {users?.map((user) => (
                <CardUser key={user.id} user={user} debts={debts} />
              ))}
            </Row>
          ) : (
            <div className={style.noItems}>
              <p>No items</p>
            </div>
          )}
        </div>
      </Layout>
      <Modal
        open={open}
        toggleOpen={toggleOpen}
        conclueDebt={addNewDebt}
        users={users}
      />
    </>
  );
};

export default Home;
