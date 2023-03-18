import { useState } from "react"
import { useDebounce, useDocumentTitle } from "utils"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import styled from "@emotion/styled"
import { Typography } from "antd"
import { useProjects } from "utils/project"
import { useUsers } from "utils/user"
import { useUrlQueryParam } from "utils/url"

export const ProjectListScreen = () => {
    const [param, setParam] = useUrlQueryParam(['name','personId'])
    const debouncedParam = useDebounce(param, 300)
    const {isLoading, error, data: list} = useProjects(debouncedParam)
    const {data: users} = useUsers()

    useDocumentTitle('项目列表', false)
    console.log(useUrlQueryParam(['name']))

    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel users={users || []} param={param} setParam={setParam}></SearchPanel>
            {error? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
            <List users={users || []} loading={isLoading} dataSource={list || []}></List>
        </Container>
    )
}

const Container = styled.div`
    padding: 3.2rem
`