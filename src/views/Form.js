import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
//Ant design
import { Form, Input, InputNumber, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
//Components
import Navbar from '../components/Navbar';
//Actions
import { create_a_movie, update_a_movie } from '../store/actions';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [form] = Form.useForm();
  const { isLogin } = useSelector(state => state);
  
  useEffect(() => {
    if (!isLogin) {
      history.push('/login');
    } else if (location.state) {
      const { name, poster, popularity, description, tags } = location.state;
      form.setFieldsValue({ name, poster, popularity: parseFloat(popularity.$numberDecimal), description, tags });
    }
  }, [location.state, form, history, isLogin]);

  const onFinish = (values) => {
    dispatch(create_a_movie(values));
    history.push('/');
  };

  function onUpdate(values) {
    dispatch(update_a_movie(location.state._id, values));
    history.push('/');
  }

  return (
    <div className="Form">
      <Navbar />
      <Form {...layout} name="nest-messages" form={form} onFinish={location.state ? onUpdate : onFinish} style={{margin: "5% 20%"}} onReset={onUpdate}>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: 'Please input Movie name'
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="poster"
        label="Poster"
        rules={[
          {
            required: true,
            message: 'Please input Movie poster'
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="popularity"
        label="Popularity"
        rules={[
          {
            type: 'number',
            min: 0,
            max: 10,
            required: true,
            message: 'Please input Movie popularity'
          },
        ]}
      >
        <InputNumber min={0} max={10} step={0.1} />
        {/* <Rate allowHalf value={5} style={{marginLeft: "2%"}} /> */}
      </Form.Item>
      <Form.Item 
        name="description" 
        label="Synopsis"
        rules={[
          {
            required: true,
            message: 'Please input Movie poster'
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="tags" label="Tags" rules={[
          {
            required: true,
            message: 'Please input Movie tags'
          },
        ]}>
        {/* <Input /> */}
        <Form.List name="tags">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                <Form.Item
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input tag or delete this field.",
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="Tag" style={{ width: '60%' }} />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      style={{ margin: '0 8px' }}
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  style={{ width: '60%' }}
                >
                  <PlusOutlined /> Add field
                </Button>
              </Form.Item>
              </div>
            )
          }}
        </Form.List>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            {location.state ? 'Update' : 'Create'}
          </Button>
      </Form.Item>
    </Form>
    </div>
  )
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