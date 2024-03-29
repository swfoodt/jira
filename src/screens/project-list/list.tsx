import { Dropdown, Menu, Modal } from "antd";
import Table, { TableProps } from "antd/lib/table";
import { ButtonNoPadding } from "components/lib";
import { Pin } from "components/pin";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useDeleteProject, useEditProject } from "utils/project";
import { Project } from "../../types/Project";
import { useProjectModal, useProjectsQueryKey } from "./util";

interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
}
interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject(useProjectsQueryKey());
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });

  // const items: MenuProps["items"] = [
  //   {
  //     key: 1,
  //     label: (
  //       <Menu>
  //         <Menu.Item onClick={editProject(project.id)} key={"edit"}>
  //           编辑
  //         </Menu.Item>
  //         <Menu.Item key={"delete"}>删除</Menu.Item>
  //       </Menu>
  //     ),
  //   },
  // ];
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          key: "1",
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          key: "2",
          title: "部门",
          dataIndex: "organization",
        },
        {
          key: "3",
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          key: "4",
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return <More project={project} />;
          },
        },
      ]}
      {...props}
    />
  );
};

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "确定删除这个项目吗?",
      content: "点击确定删除",
      okText: "确定",
      onOk() {
        deleteProject({ id });
      },
    });
  };
  return (
    <Dropdown
      menu={{
        items: [
          {
            key: 1,
            label: (
              <Menu>
                <Menu.Item onClick={editProject(project.id)} key={"edit"}>
                  编辑
                </Menu.Item>
                <Menu.Item
                  onClick={() => confirmDeleteProject(project.id)}
                  key={"delete"}
                >
                  删除
                </Menu.Item>
              </Menu>
            ),
          },
        ],
      }}
    >
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};
