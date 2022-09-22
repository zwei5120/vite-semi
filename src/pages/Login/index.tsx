import React, { useEffect } from "react";
import { Form, Button, Typography } from "@douyinfe/semi-ui";

const Login = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[400px] h-[300px]">
        <div className="w-full text-center">煤质数据采集控制系统</div>
        <Form layout="vertical">
          <Form.Input
            field="username"
            placeholder="请输入账号"
            noLabel
          ></Form.Input>
          <Form.Input
            mode="password"
            field="password"
            placeholder="请输入密码"
            noLabel
          ></Form.Input>
          <div className="w-full text-left my-1 ml-1">
            <Typography.Text link size="small">忘记密码</Typography.Text>
          </div>
        </Form>
        <Button theme='solid' type='primary' style={{ marginRight: 8 }}>深色主要</Button>
      </div>
    </div>
  );
};

export default Login;
