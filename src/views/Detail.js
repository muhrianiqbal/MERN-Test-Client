import React from 'react';
//Components
import Navbar from '../components/Navbar';

export default () => {
  return (
    <div className="Detail">
      <Navbar />
      <div style={{display: "flex", margin: "2% 10%"}}>
        <div style={{}}>
          <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" height="250" />
        </div>
        <div style={{marginLeft: "2%"}}>
          <h1>Judul</h1>
        </div>
      </div>
    </div>
  )
}