import React, { useEffect, useCallback, useRef } from "react";
import { Form, Button, Typography } from "@douyinfe/semi-ui";
import { useUserInfo, usePermissions } from "../../store/userInfo";
import { apiLogin } from "../../server/user";
import type { FormApi } from "@douyinfe/semi-ui/form/interface";
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const formRef = useRef<FormApi | null>(null);
  const getUserInfo = useUserInfo((state) => state?.getUserInfo);
  const fetchPermissions = usePermissions((state) => state?.fetchPermissions)
  const handleLogin = useCallback((formData: Record<string, any>) => {
    console.log("formData", formData);
    apiLogin(formData as { username: string, password: string }).then(() => {
      // 登录成功
      getUserInfo?.().then(() => {
        // 获取用户信息 权限数据
        fetchPermissions?.().then(() => {
          console.log('11111')
          navigate('/home')
        })
      })
    })
  }, []);
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[400px] h-[300px]">
        <div className="w-full text-center">煤质数据采集控制系统</div>
        <Form
          layout="vertical"
          onSubmit={handleLogin}
          getFormApi={(formApi) => {
            formRef.current = formApi;
          }}
        >
          <Form.Input
            field="username"
            placeholder="请输入账号"
            noLabel
            rules={[{ required: true, message: "请输入账号" }]}
          ></Form.Input>
          <Form.Input
            mode="password"
            field="password"
            placeholder="请输入密码"
            noLabel
            rules={[{ required: true, message: "请输入密码" }]}
          ></Form.Input>
          <div className="w-full text-left my-1 ml-1">
            <Typography.Text link size="small">
              忘记密码
            </Typography.Text>
          </div>
        </Form>
        <Button
          theme="solid"
          type="primary"
          className="w-full"
          onClick={() => {
            formRef?.current?.submitForm();
          }}
        >
          登录
        </Button>
      </div>
    </div>
  );
};

export default Login;
