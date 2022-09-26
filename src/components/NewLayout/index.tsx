import React from "react";
import { Layout } from "@douyinfe/semi-ui";
import NavMenu from "../Nav";

const NewLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { Header, Content } = Layout;
  return (
    <Layout className="components-layout-demo">
      <Header className="w-full h-[60px] bg-primary leading-[60px] font-custom">
        <NavMenu></NavMenu>
      </Header>
      <Content>
        {children}
      </Content>
      {/* <Footer>Footer</Footer> */}
    </Layout>
  );
};

export default NewLayout;
