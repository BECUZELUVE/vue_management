async function fetchData({usersState:{page,pagesize,sortby,sortdirection,keyword}}){
    var {count,results} = await fetch(`/api/users?page=${page}&pagesize=${pagesize}&sortby=${sortby}&sortdirection=${sortdirection}&keyword=${keyword}`).then(data=>data.json());

    return {count,results}
}

export default {
    //初始化
    async user_init({commit,state}){
        const {count,results} = await fetchData(state);

        commit("changeUsersResults",{results})
        commit("changeUsersCount",{count})
    },
    //页码
    async changeUsersPage({commit,state},{page}){
        commit("changeUsersPage",{page})

        const {count,results} = await fetchData(state);
        commit("changeUsersResults",{results})
        commit("changeUsersCount",{count})
    },
    //页数量
    async changeUsersPageSize({commit,state},{pagesize}){
        commit("changeUsersPage",{page:1})
        commit("changeUsersPageSize",{pagesize})

        const {count,results} = await fetchData(state);
        commit("changeUsersResults",{results})
        commit("changeUsersCount",{count})
    },
    //排序
    async changeUsersSort({commit,state},{sortby,sortdirection}){
        commit("changeUsersPage",{page:1})
        commit("changeUsersSortby",{sortby})
        commit("changeUsersSortdirection",{sortdirection})

        const {count,results} = await fetchData(state);
        commit("changeUsersResults",{results})
        commit("changeUsersCount",{count})
    },
    //关键词查询
    async changeUsersKeyword({commit,state},{keyword}){
        commit("changeUsersPage",{page:1})
        commit("changeUsersKeyword",{keyword})

        const {count,results} = await fetchData(state);
        commit("changeUsersResults",{results})
        commit("changeUsersCount",{count})
    },
    async ADD({commit,state},payload){
        await fetch("/api/users",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(payload)
        }).then(data=>data);
        commit("ADD",payload); 

        const {count,results} = await fetchData(state);
        commit("changeUsersResults",{results})
        commit("changeUsersCount",{count})
    },
    async REMOVE({commit,state}, payload) {
        await fetch(`/api/users?id=${state.usersState.results[payload].id}`, {
            method: "DELETE"
        }).then(data => data);
        commit("REMOVE", payload);

        const {count,results} = await fetchData(state);
        commit("changeUsersResults",{results})
        commit("changeUsersCount",{count})
    },
}