import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "components/lib";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import { ReactComponent as Softwarelogo } from "assets/software-logo.svg";
import { Button, MenuProps } from "antd";
import { Dropdown, Menu } from "antd";
import { Route, Routes } from "react-router";
import { ProjectScreen } from "screens/project";
import { BrowserRouter as Router, Navigate } from "react-router-dom";
import { useState } from "react";
import { resetRoute } from "utils";
import { ProjectPopover } from "components/project-popover";
import { ProjectModal } from "screens/project-list/project-modal";

export const AuthenticatedApp = () => {
  return (
    <Container>
      <Router>
        <PageHeader />
        <Main>
          <Routes>
          <Route path={"/projects"} element={<ProjectListScreen />} />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Route path="/*" element={<Navigate to="/projects" replace />} />
          </Routes>
          </Main>
        <ProjectModal />
      </Router>
    </Container>
  );
};

const PageHeader = () => {
  const { logout, user } = useAuth();
  const items: MenuProps["items"] = [
    {
      key: 1,
      label: (
        <Menu>
          <Menu.Item key={"logout"}>
            <Button type="link" onClick={logout}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      ),
    },
  ];
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={"link"} onClick={resetRoute}>
          <Softwarelogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </ButtonNoPadding>
        <ProjectPopover />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown menu={{ items }}>
          <Button type="link" onClick={(e) => e.preventDefault()}>
            Hi, {user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
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

const Main = styled.main`
  display: flex;
  overflow: hidden;
`;
