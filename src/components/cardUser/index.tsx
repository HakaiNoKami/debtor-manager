import { Debt, User } from "@models";
import { useMemo } from "react";
import { Col, Card, Skeleton, Avatar, Collapse } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { NumberFormatter } from "@utils";

import style from "@styles/components/cardUser.module.scss";
import { DebtItem } from "@components";

const { Meta } = Card;
const { Panel } = Collapse;

type CardUserProps = {
  user: User;
  debts: Array<Debt>;
};

export const CardUser = ({ user, debts }: CardUserProps) => {
  const userDebts = useMemo(
    () => debts?.filter((debt) => debt.idUsuario === user.id),
    [debts, user]
  );

  return userDebts?.length ? (
    <Col xs={24} lg={12} className={style.container}>
      <Collapse ghost>
        <Panel
          header={
            <Card className={style.card}>
              <Skeleton loading={false} avatar active>
                <Meta
                  avatar={
                    <Avatar src={<UserOutlined />} className={style.avatar} />
                  }
                  title={user.name}
                  description={
                    <main className={style.description}>
                      <p>{user.company.name}</p>
                      <div className={style.total}>
                        <span>Total debts:</span>
                        <span>
                          {NumberFormatter(
                            userDebts.reduce(
                              (total, debt) => total + debt.valor,
                              0
                            )
                          )}
                        </span>
                      </div>
                    </main>
                  }
                />
              </Skeleton>
            </Card>
          }
          key="1"
        >
          <div className={style.debts}>
            {userDebts?.map((debt) => (
              <DebtItem key={debt._id} debt={debt} />
            ))}
          </div>
        </Panel>
      </Collapse>
    </Col>
  ) : null;
};
