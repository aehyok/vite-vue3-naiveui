import request from '@/utils/request'

/**
 * 获取登录验证码
 * @returns
 */
export const getCaptcha = () => {
    return request(`/token/captcha`, {
        method: "get"
    })
}

/**
 * 登录接口
 * @returns
 */
export const login = (data: any) => {
    return request(`/token/login`, {
        method: "post",
        data
    })
}