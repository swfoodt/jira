import { useDebounce, useDocumentTitle } from "utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectModal, useProjectsSearchParams } from "./util";
import {
  ButtonNoPadding,
  ErrorBox,
  Row,
  ScreenContainer,
} from "components/lib";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  const { open } = useProjectModal();
  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();

  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open} type={"link"}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel
        users={users || []}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <ErrorBox error={error} />
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </ScreenContainer>
  );
};
