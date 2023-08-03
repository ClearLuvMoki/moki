import {POST} from "@/service/index";

/**
 * Author: Moki
 * Date: 2023-08-03
 * Todo: 获取邮箱验证码
 **/
export const getEmailCode = (
    {email}: { email: string }
) => {
    return POST('/user/sms', {
        email,
    });
};