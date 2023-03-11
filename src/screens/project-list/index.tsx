import { useEffect, useState } from "react"
import { cleanObject, useDebounce, useMount } from "utils"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import * as qs from "qs"
import { useHttp } from "utils/http"

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
        <div>
            <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
            <List users={users} list={list}></List>
        </div>
    )
}