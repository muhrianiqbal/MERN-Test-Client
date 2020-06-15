import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
//Components
import Navbar from '../components/Navbar';
//Actions
import { fetch_one_movies, delete_a_movie } from '../store/actions';
//Ant design
import { LoadingOutlined } from '@ant-design/icons';
import { Rate, Empty, Button } from 'antd';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { detail, isLoading, isLogin } = useSelector(state => state);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetch_one_movies(id));
  }, [dispatch, id]);

  async function onDelete() {
    await dispatch(delete_a_movie(detail._id));
    history.push('/');
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", marginTop: "10%"}}>
          <LoadingOutlined  style={{fontSize: "100px", color: "#1890ff"}} />
        </div>
      </>
    )
  }

  if (!detail) {
    return (
      <>
        <Navbar />
        <div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", marginTop: "10%"}}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      </>
    )
  }

  return (
    <div className="Detail">
      <Navbar />
      <div style={{display: "flex", margin: "2% 10%"}}>
        <div style={{}}>
          <img alt="Not Found" src={detail.poster} height="250" />
        </div>
        <div style={{marginLeft: "2%"}}>
          <h1>{detail.name}</h1>
          <div style={{display: "flex", flexWrap: "wrap"}}>
            {detail.tags.map((tag, index) => {
              return (
                <div key={index} style={index > 0 ? {marginLeft: "2%"} : {marginLeft: "0"}}>
                  <h4 style={{color: "#1890ff"}}>{index < detail.tags.length ? "| " : " "}{tag}</h4>
                </div>
              )
            })}
          </div>
          <div style={{display: "flex"}}>
            <Rate allowHalf disabled value={Math.round(+detail.popularity.$numberDecimal)/2} />
            <h2 style={{color: "gold", padding:"1px 0 0 10px"}}>{detail.popularity.$numberDecimal}</h2>
          </div>
          <p>{detail.description}</p>
          {isLogin ?
            <div style={{display: "flex"}}>
              <Button type="primary" onClick={() => history.push({pathname: '/form', state: detail})}>
                Edit
              </Button>
              <Button danger type="primary" style={{marginLeft: "2%"}} onClick={onDelete}>
                Delete
              </Button>
            </div>
          : <></>}
        </div>
      </div>
    </div>
  )
}