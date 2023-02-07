export interface LoginFormInt {
    username: string
    password: string
}
// export class LoginData {
//     ruleForm:LoginFormInt={
//         username: "",
//         password: ""
//     }
// }
// 这里让他默认记住密码
export class LoginData {
    ruleForm:LoginFormInt={
        username: "admin",
        password: "123456"
    }
}