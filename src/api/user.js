// 用户相关请求模块
import request from '@/utils/request'

export const login = data => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}

// 发送验证码
// 注意：每个手机号每分钟1次

export const sendSms = mobile => {
    return request({
        method: 'GET',
        url: `/v1_0/sms/codes/${mobile}`,
    })
}