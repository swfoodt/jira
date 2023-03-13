import Table, { TableProps } from "antd/lib/table";
import dayjs from "dayjs";

export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}
interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
}
interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          key: "1",
          title: "名称",
          dataIndex: "name",
          sorter:(a, b) => a.name.localeCompare(b.name)
        },
        {
          key: "2",
          title: "部门",
          dataIndex: "organization"
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
          render(value, project){
            return <span>
              {project.created ? dayjs(project.created).format('YYYY-MM-DD'):'无'}
            </span>
          }
        }
      ]}
      {...props}
    />
  );
  // return (
  //   <table>
  //     <thead>
  //       <tr>
  //         <th>名称</th>
  //         <th>负责人</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {list.map((project) => (
  //         <tr key={project.id}>
  //           <td>{project.name}</td>
  //           <td>
  //             {users.find((user) => user.id === project.personId)?.name ||
  //               "未知"}
  //           </td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // );
};
