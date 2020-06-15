import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
//Components
import Navbar from '../components/Navbar';
//Actions
import { fetch_all_movies } from '../store/actions';
//Ant design
import { Card, Rate } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Meta } = Card;

export default () => {
  const dispatch = useDispatch();
  const { isLoading, movies } = useSelector(state => state);
  const history = useHistory();

  useEffect(() => {
    dispatch(fetch_all_movies());
  }, [dispatch]);

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

  function toDetail(id) {
    history.push('/detail/' + id);
  }

  return (
    <div className="Home">
      <Navbar />
      <div style={{display: "flex", flexWrap: "wrap"}}>
        {movies[0] ? movies.map(movie => {
          return (
            <Card
              hoverable
              style={{ width: 240, margin: "2% 0 0 2%" }}
              cover={<img alt="Not Found" src={movie.poster} height="250" />}
              loading={isLoading}
              key={movie._id}
              onClick={() => toDetail(movie._id)}
            >
              <Meta title={movie.name} />
              <Rate disabled value={Math.round(+movie.popularity.$numberDecimal/2)} />
            </Card>
          )
          })
        : <></>}
      </div>
    </div>
  )
}