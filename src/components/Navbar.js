import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { set_login } from '../store/actions';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

// const { Search } = Input;

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLogin } = useSelector(state => state);

  useEffect(() => {
    if(!isLogin && localStorage.getItem('token')) {
      dispatch(set_login(true));
    }
  },[isLogin, dispatch])

  function logout() {
    localStorage.removeItem('token');
    dispatch(set_login(false));
  }

  // function onSearch() {
  //   history.push('/');
  // }

  return (
    <div className="Navbar">
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <div style={{display: "flex"}}>
          <Link to="/" style={{ marginTop: "3px", marginLeft: "5px", color: "white", fontSize: "25px", fontWeight: "bold" }}>Movie</Link>
          {isLogin ?
            <div style={{width: "30px", display: "flex", marginLeft: "2%", paddingTop: "2%", cursor: "pointer"}} onClick={() => history.push('/form')}>
              <PlusCircleOutlined style={{fontSize: '25px', color: 'white', marginTop: "10px", marginLeft: "15px"}} />
              <h2 style={{marginTop: "3px", marginLeft: "2px", color: "white", fontSize: "24px", fontWeight: "bold"}}>Add</h2>
            </div>
          : <></>}
        </div>
        <div style={{ width: "100px", height: "30px", marginTop: "10px", marginRight: "5px" }}>
          {/* <Search
            placeholder="Search"
            onSearch={onSearch}
            style={{ width: "200px", height: "30px", marginTop: "10px", marginRight: "5px" }}
          /> */}
          {isLogin ?
            <Button danger type="primary" style={{marginRight: "10px"}} onClick={logout}>
              Logout
            </Button>
          : 
            <Button style={{marginRight: "10px", backgroundColor: "#52c41a", border: "none", color: "white", fontWeight: "bold"}} onClick={() => history.push('/login')}>
              Login
            </Button>}
        </div>
      </div>
    </div>
  )
}