export default {
    //数据
    changeUsersResults(state,payload){
        state.usersState.results = payload.results;
    },
    //数据的总数
    changeUsersCount(state,payload){
        state.usersState.count = payload.count;
    },
    //页码
    changeUsersPage(state,payload){
        state.usersState.page = payload.page;
    },
    //页数量
    changeUsersPageSize(state,payload){
        state.usersState.pagesize = payload.pagesize;
    },
    //排序条件
    changeUsersSortby(state,payload){
        state.usersState.sortby = payload.sortby;
    },
    //正序倒序
    changeUsersSortdirection(state,payload){
        state.usersState.sortdirection = payload.sortdirection;
    },
    //关键词查询
    changeUsersKeyword(state,payload){
        state.usersState.keyword = payload.keyword;
    },
    ADD(state,payload){
        state.usersState.results.push(payload);
    }
    ,
    REMOVE(state,payload){
        state.usersState.results.splice(payload,1);        
    }
}