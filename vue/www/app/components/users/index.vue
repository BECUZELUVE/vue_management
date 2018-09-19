<template>
    <div class="box">
        <Row>
            <Col span="12">
                <div class="add">
                    <input type="text" placeholder="请输入姓名" v-model.trim="username">             
                    <input type="text" placeholder="请输入年龄" v-model.trim="age">
                    <select v-model="sex">
                        <option>男</option>
                        <option>女</option>
                    </select>
                    <select v-model="job">
                        <option>前端</option>
                        <option>后端</option>
                        <option>设计</option>
                        <option>项目组长</option>
                        <option>产品经理</option>
                        <option>前台</option>
                        <option>人力</option>
                    </select>
                    <input type="text" placeholder="请输入手机号" v-model.trim="tel">
                    <Button type="success" @click="add">添加</Button>
                </div>
                <div class="search">
                    <Icon type="ios-search" /><input type="text" placeholder="请输入需要查找的姓名或性别或职位或手机号" v-model="keyword">
                </div>
                <p>共计{{$store.state.usersState.count}}条信息</p> 
            </Col>
        </Row>

        <Table :columns="col" :data="$store.state.usersState.results" @on-sort-change="changeSort"></Table>
        <Page class="page"
            :total="$store.state.usersState.count"
            :current="$store.state.usersState.page"
            show-sizer show-elevator
            @on-change="changePage"
            @on-page-size-change="changePageSize"
        />
    </div>
</template>
<script type="text/javascript">
     export default {
        created(){
            this.$store.dispatch("user_init");
        },
        computed:{
            keyword:{
                get(){
                    return this.$store.state.usersState.keyword
                },
                set(v){
                    var keyword = v.replace(/\s/g,",");
                    this.$store.dispatch("changeUsersKeyword",{keyword})
                }
            }
        },
       
        data(){
            return {
                username: "",
                age: "",
                sex: "男",
                tel: "",
                job: "前端",
                //表格列
                col:[
                    {"title":"id",key:"id",sortable:"custom"},
                    {"title":"姓名", key:"name"},
                    {"title":"年龄", key:"age",sortable:"custom",
                        render: (h, params) => {
                            if (params.row.$isEdit) {
                                return h('Input', {
                                    props:{ 
                                        autofocus: true,
                                        autosize:true,
                                        value: params.row.age
                                    },
                                    on: {
                                        'on-change': (event)=> {
                                            params.row.age = event.target.value;
                                        }
                                    }
                                });
                            }else{
                                return h('div', params.row.age);
                            }
                            }
                        },
                    {"title":"性别", key:"sex"},
                    {"title":"职业", key:"job"},
                    {"title":"手机", key:"tel",
                        render: (h, params) => {
                            if (params.row.$isEdit) {
                                return h('Input', {
                                    props:{ 
                                        autofocus: true,
                                        autosize:true,
                                        value: params.row.tel
                                    },
                                    on: {
                                        'on-change': (event)=> {
                                            params.row.tel = event.target.value;
                                        }
                                    }
                                });
                            }else{
                                return h('div', params.row.tel);
                            }
                            }
                    },
                    {
                        "title": '操作',
                        render: (h, params) => {
                            return h('div',[
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            if (params.row.$isEdit) {
                                                this.handleSave(params.row)
                                            } else {
                                                this.handleEdit(params.row)
                                            }
                                        }}
                                        },params.row.$isEdit ? '保存' : '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                },"删除")
                            ])
                        }
                    }
                ]
            }
        },
        methods:{
            //分页
            changePage(page){
                this.$store.dispatch("changeUsersPage",{page})
            },
            //页数量
            changePageSize(pagesize){
                this.$store.dispatch("changeUsersPageSize",{pagesize})
            },
            //排序
            changeSort({key,order}){
                this.$store.dispatch("changeUsersSort",{sortby:key, sortdirection:order == "asc" ? 1 : -1})
            },
            add(){
                if(this.username==""&&this.age==""&&this.sex==""&&this.tel==""&&this.job=="")return;
                var id = "";
                var str = "123456";
                for(var i=0;i<str.length;i++){
                    id+=str[~~(Math.random()*str.length)]
                };
                this.$store.dispatch("ADD",{"id":id,"name":this.username,"age":this.age,"tel":this.tel,"sex":this.sex,"job":this.job});
                this.username="";this.age="";this.tel="";
            },
            remove (index) {
                console.log(index);
                this.$store.dispatch("REMOVE",index)
            },
            handleEdit (row) {
               this.$set(row, '$isEdit', true)
              
            }, 
            handleSave (row) {
              this.$set(row, '$isEdit', false)
            }
        }
     }
</script>
<style>
    thead,tbody{
        font-size: 16px;
    }
    thead i{
        font-size: 16px;
    }
    td .ivu-table-cell,th .ivu-table-cell{
        width:100%;
        text-align: center;
    }
    .ivu-btn{
        font-size: 16px; 
        margin-right: 10px;       
    }
    .add,.search,.del{
        width:1250px;
    }
    .add input{
        width: 150px;
        height: 38px;
        border: 1px solid #ccc;
        border-radius:5px;
        margin:10px 0;
        padding-left:10px;
        font-size: 16px;
        display: inline-block;
        margin-right: 10px;
    }
    .search input{
        width: 750px;
        height: 38px;
        border: 1px solid #ccc;
        border-radius:5px;
        margin:10px 0;
        padding-left:10px;
        font-size: 16px;
        margin-right: 10px;
    }
    select{
        width: 150px;
        height: 38px;
        font-size: 16px;
        color: #666;
        border: 1px solid #ccc;
        border-radius:5px;
    }
    p{
        font-size: 16px;
        margin: 10px 0;
    }
    .page{
        margin: 10px auto;
        text-align: center
    }
    
    .ivu-icon-ios-search{
        font-size:25px;
        margin-right: 10px;
    }
</style>