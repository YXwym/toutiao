<template>
    <div class="login-container">
        <!-- 导航栏 -->
        <van-nav-bar title="登录" />
        <!-- /导航栏 -->
        <!-- 登录表单 -->
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field name="用户名" placeholder="请输入手机号" />
                <van-field type="password" name="密码" placeholder="请输入验证码" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button block type="primary" native-type="submit">
                    登录
                </van-button>
            </div>
        </van-form>
        <!-- /登陆表单 -->
    </div>
</template>
  
<script>
export default {
    name: 'LoginIndex',
    components: {},
    props: {},
    data() {
        return {

        }
    },
    computed: {},
    watch: {},
    created() { },
    mounted() { },
    methods: {
        onSubmit(values) {
            console.log('submit', values)
        }
    }
}

</script>
  
<style></style>