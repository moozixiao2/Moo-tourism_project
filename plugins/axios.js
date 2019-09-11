import { Message } from "element-ui";

// aixos 拦截器
export default ( {$axios, redirect} ) => {
    // 错误拦截
    $axios.onError(res => {
        // 解构
        const {message, statusCode} = res.response.data
        if(statusCode === 400){
            Message.error(message)
        }

        if(statusCode === 401 || statusCode === 403){
            Message.error('您未登录，请先登录...')
            redirect('/user/login')
        }
    })
}