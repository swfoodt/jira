import styled from "@emotion/styled";
import { useDocumentTitle } from "utils";
import { KanbanColumn } from "./kanban-column";
import { useKanbanSearchParams, useProjectInUrl, useTasksSearchParams } from "screens/kanban/util";
import { useKanbans } from "utils/kanban";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "components/lib";
import { TaskModal } from "./task-modal";
import { CreateKanban } from "./create-kanban";
import { Spin } from "antd";
import { useTasks } from "utils/task";
import { DragDropContext } from "react-beautiful-dnd";
import { Drag, Drop } from "components/drag-and-drop";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbanSearchParams()
  );
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
  const isLoading = taskIsLoading || kanbanIsLoading;
  return (
    <DragDropContext onDragEnd={() => {}}>
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <Drop type={"COLUMN"} direction={"horizontal"} droppableId={"kanban"}>
          <ColumnsContainer>
            {kanbans?.map((kanban, index) => (
              <Drag
                key={kanban.id}
                draggableId={"kanban" + kanban.id}
                index={index}
              >
                <KanbanColumn kanban={kanban} key={kanban.id} />
              </Drag>
            ))}
            <CreateKanban />
          </ColumnsContainer>
        </Drop>
      )}
      <TaskModal />
    </ScreenContainer>
  </DragDropContext>
  );
};

export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
  
  ::-webkit-scrollbar {
    display: none;
  }
`;
