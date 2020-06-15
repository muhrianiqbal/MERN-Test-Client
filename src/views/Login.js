import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
//Components
import Navbar from '../components/Navbar';
//Actions
import { login } from '../store/actions';
//Ant design
import { Form, Input, Button } from 'antd';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = values => {
    console.log('Success:', values);
    const { email, password } = values;
    dispatch(login({ email, password }));
    history.push('/');
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="Login">
      <Navbar />
      <Form
        {...layout}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{margin: "30vh 30vw"}}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter the correct email!',
              type: "email"
            },
          ]}
        >
          <Input placeholder="example@mail.com" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

//Styles
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};