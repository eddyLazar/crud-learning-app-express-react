import { Layout } from "antd";
import Accounts from "./Accounts";

const { Header, Footer, Sider, Content } = Layout;

export function App() {
  return (
    <Layout>
      <Header>Header</Header>
      <Content>
        <Accounts></Accounts>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}
