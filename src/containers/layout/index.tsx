import { ReactNode } from "react";
import { Layout as AntLayout, PageHeader, PageHeaderProps } from "antd";

import style from "@styles/containers/layout.module.scss";

const currentYear = new Date().getFullYear();

type LayoutProps = PageHeaderProps & {
  children: ReactNode;
};

const { Header, Content, Footer } = AntLayout;

export const Layout = ({ children, ...props }: LayoutProps) => {
  return (
    <AntLayout className={style.layout}>
      <Header className={style.header}>
        <p>Debtor manager</p>
      </Header>
      <Content className={style.content}>
        <div className={style.main}>
          {props.title && (
            <PageHeader {...props} className={style.pageHeader} />
          )}
          {children}
        </div>
      </Content>
      <Footer className={style.footer}>
        Debtor manager ©{currentYear} Created by Marcus Castro
      </Footer>
    </AntLayout>
  );
};
