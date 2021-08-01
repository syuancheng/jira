import React from 'react'
import { useEffect, useState } from "react"
import { SearchPanel } from "./search-panel"
import { List } from "./list"
import {cleanObject, useMount, useDebounce} from "../utils"
import * as qs from "qs"
// The students that use JS find issue at runtime.
// we wish to find the issue at static code instead of runtime. that's the advantage of strong type.
const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debouncedParam = useDebounce(param, 200)
    const [users, setUsers] = useState([])
    const [list, setList] = useState([])

    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response => {
            if(response.ok) {
                setList(await response.json())
            }
        })
    }, [debouncedParam])

    useMount(() => {
        fetch(`${apiUrl}/users`).then(async response => { 
            if(response.ok) {
                setUsers(await response.json())
            }
        })
    })//only one time

    return <div>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List users={users} list={list} />
    </div>
}