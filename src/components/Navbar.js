import React from 'react';
import { Input } from 'antd';
import { Link } from 'react-router-dom';

const { Search } = Input;

export default () => {
  return (
    <div className="Navbar">
      <div style={{display: "flex", justifyContent: "space-between"}}>
        {/* <h1 
          style={{ marginTop: "3px", marginLeft: "5px", color: "white" }}
        >
          Movie
        </h1> */}
        <Link to="/" style={{ marginTop: "3px", marginLeft: "5px", color: "white", fontSize: "25px", fontWeight: "bold" }}>Movie</Link>
        <Search
          placeholder="Search"
          onSearch={value => console.log(value)}
          style={{ width: "200px", height: "30px", marginTop: "10px", marginRight: "5px" }}
        />
      </div>
    </div>
  )
}