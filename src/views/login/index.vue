<template>
    <div class="login-container">
        <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar" title="登录" />
        <!-- /导航栏 -->
        <!-- 登录表单 -->
        <!-- 
            表单验证：
            1、给 van-field 组件配置 rules 验证规则
            参考文档：http://vant-contrib.gitee.io/vant/#/zh-CN/form#rule-shu-ju-jie-gou

            2、当表单提交的时候会自动触发表单验证
            如果验证通过，会触发submit事件
            如果验证失败，不会触发submit
         -->
        <van-form ref="loginForm" @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="user.mobile" name="mobile" placeholder="请输入手机号" :rules="userFormRules.mobile"
                    type="number" maxlength="11">
                    <i slot="left-icon" class="iconfont icon-shouji"></i>
                </van-field>
                <van-field v-model="user.code" name="code" placeholder="请输入验证码" :rules="userFormRules.code" type="number"
                    maxlength="6">
                    <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
                    <template #button>
                        <!-- 
                            time: 倒计时时间
                         -->
                        <van-count-down v-if="isCountDownShow" :time="1000 * 60" format="ss s"
                            @finish="isCountDownShow = false" />
                        <van-button v-else class="send-sms-btn" native-type="button" round size="small" type="default"
                            @click="onSendSms">发送验证码</van-button>
                    </template>
                </van-field>
            </van-cell-group>
            <div class="login-btn-wrap">
                <van-button block class="login-btn" type="primary" native-type="submit">
                    登录
                </van-button>
            </div>
        </van-form>
        <!-- /登陆表单 -->
    </div>
</template>
  
<script>
import { login, sendSms } from '@/api/user'
export default {
    name: 'LoginIndex',
    components: {},
    props: {},
    data() {
        return {
            user: {
                mobile: '13911111111', // 手机号
                code: '246810' // 验证码
            },
            userFormRules: {
                mobile: [{
                    required: true,
                    message: '手机号不能为空'
                }, {
                    pattern: /^1[3|5|7|8]\d{9}$/,
                    message: '手机号格式错误'
                }],
                code: [{
                    required: true,
                    message: '验证码不能为空'
                }, {
                    pattern: /\d{6}$/,
                    message: '验证码格式错误'
                }]
            },
            isCountDownShow: false // 是否展示倒计时
        }
    },
    computed: {},
    watch: {},
    created() { },
    mounted() { },
    methods: {
        async onSubmit() {
            // 1. 获取表单数据
            const user = this.user

            // 在组件中必须通过 this.$toast 来调用 Toast 组件
            this.$toast.loading({
                message: '登录中...',
                forbidClick: true, // 禁用背景点击
                duration: 0 // 持续时间, 默认是 2000, 如果为 0 则持续展示
            })

            // 3. 提交表单请求登录
            try {
                const { data } = await login(user)
                this.$store.commit('setUser', data.data)
                this.$toast.success('登录成功')
            } catch (err) {
                if (err.response.status === 400) {
                    this.$toast.fail('手机号或验证码错误')
                } else {
                    this.$toast.fail('登陆失败, 请稍后尝试')
                }
            }
        },

        async onSendSms() {
            console.log('onSendSms');
            // 1. 校验手机号
            try {
                await this.$refs.loginForm.validate('mobile')
            } catch (err) {
                return console.log('验证失败', err);
            }
            // 2. 验证通过，显示倒计时
            this.isCountDownShow = true
            // 3. 请求发送验证码
            try {
                await sendSms(this.user.mobile)
                this.$toast('发送成功')
            } catch (err) {
                // 发送失败, 关闭倒计时
                this.isCountDownShow = false
                if (err.response.status === 429) {
                    this.$toast('发送太频繁了,请稍后重试')
                }
                this.$toast('发送失败,请稍后重试')
            }
        }
    }
}

</script>
  
<style scoped lang="less">
.login-container {
    .iconfont {
        font-size: 37px
    }

    .send-sms-btn {
        background-color: #ededed;
        width: 152px;
        height: 46px;
        line-height: 46px;
        font-size: 22px;
        color: #666;
    }

    .login-btn-wrap {
        padding: 53px 33px;

        .login-btn {
            background-color: #6db4fb;
            border: none;
        }
    }
}
</style>