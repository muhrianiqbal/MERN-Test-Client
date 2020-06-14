import React from 'react';
//Components
import Navbar from '../components/Navbar';
//Ant design
import { Card } from 'antd';
import { Rate } from 'antd';

const { Meta } = Card;

export default () => {
  return (
    <div className="Home">
      <Navbar />
      <div style={{margin: "20px"}}>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" height="250" />}
        >
          <Meta title="Europe Street beat" />
          <Rate disabled defaultValue={2} />
        </Card>,
      </div>
    </div>
  )
}