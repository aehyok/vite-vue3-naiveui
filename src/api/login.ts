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