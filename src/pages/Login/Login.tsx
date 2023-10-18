import { useAppDispatch } from '@/hooks/redux.ts'
import { Button, Checkbox, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { getUserInfoAction } from '@/store/actions/userInfo.action.ts'
import { useNavigate } from 'react-router-dom'
import { loginApi } from '@/servers/login.api.ts'
import { cloneDeep } from 'lodash'
import { routes } from '@/routes'
import { addRouteAsync, setLoginToken } from '@/store/reducers/userInfoReducer.ts'

function Login() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const onFinish = async (values: any) => {
    loginApi(values).then(async (res) => {
      dispatch(setLoginToken(res.data))
      await dispatch(getUserInfoAction())
      dispatch(addRouteAsync(cloneDeep(routes)))
      navigate('/dashboard')
    })
  }
  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </>
  )
}

export default Login
