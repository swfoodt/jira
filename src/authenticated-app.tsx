import styled from "@emotion/styled";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import { ReactComponent as Softwarelogo } from "assets/software-logo.svg";
import { Button, MenuProps } from "antd";
import { Dropdown, Menu } from "antd";

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  const items: MenuProps["items"] = [
    {
      key: 1,
      label: (
        <Menu>
          <Menu.Item key={"logout"}>
            <Button type="link" onClick={logout}>登出</Button>
          </Menu.Item>
        </Menu>
      ),
    },
  ];
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <Softwarelogo width={"18rem"} color={"rgb(38, 132, 255)"} />
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown menu={{ items }}>
            <Button type="link" onClick={(e) => e.preventDefault()}>Hi, {user?.name}</Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem calc(100vh - 6rem);
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.main``;
