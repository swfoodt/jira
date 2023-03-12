import { useEffect, useState } from "react"
import { cleanObject, useDebounce, useMount } from "utils"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useHttp } from "utils/http"
import styled from "@emotion/styled"

const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
    const [param,setParam] = useState({
        name: "",
        personId: ""
    })
    const [users,setUsers] = useState([])
    const [list,setList] = useState([])

    const debouncedParam = useDebounce(param, 300)

    const client = useHttp()
    useEffect(() => {
        client('projects',{data: cleanObject(debouncedParam)}).then(setList)
    },[debouncedParam])

    useMount(() => {
        client('users').then(setUsers)
    })

    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
            <List users={users} list={list}></List>
        </Container>
    )
}

const Container = styled.div`
    padding: 3.2rem
`