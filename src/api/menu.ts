import request from '@/utils/request'

/**
 * 获取登录验证码
 * @returns
 */
export const getMenuTreeList = (params: any) => {
    return request(`/menu/tree`, {
        method: "get",
        params: params
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