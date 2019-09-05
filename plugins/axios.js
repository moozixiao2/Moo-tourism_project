import { Message } from "element-ui";

// aixos 拦截器
export default ( {$axios} ) => {
    // 错误拦截
    $axios.onError(res => {
        // 解构
        const {message, statusCode} = res.response.data
        if(statusCode === 400){
            Message.error(message)
        }
    })
}