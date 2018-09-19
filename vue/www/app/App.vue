<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">人员管理系统</div>
                </Menu>
            </Header>
            <Layout :style="{padding: '0 24px 24px'}">
                <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                    <Users></Users>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import Users from "./components/users/index.vue";
    export default{
        components:{
            Users
        }
    }
</script>
<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 300px;
    height: 30px;
    color: #fff;
    font-size: 26px;
    border-radius: 3px;
    float: left;
    position: relative;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>