import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { GET_ALL_USERS, GET_ONE_USER } from './query/user';
import { CREATE_USER } from './mutations/user';

import './App.css';

const App = () => {
  /**
   * Первым паарметром хуки useQuery и useMutation
   * принимают сам запрос. Вторым параметром -
   * - принимают массив опций.
   *
   * refetch - функция, при вызове которой будет
   * опять делаться запрос и поле data будет обновляться.
   */
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  // pollInterval - запрос происзодит каждые 500мс
  // const { data, loading, error, refetch } = useQuery(GET_ALL_USERS, {
  //   pollInterval: 500,
  // });
  const { data: oneUser, loading: loadingOneUser } = useQuery(GET_ONE_USER, {
    variables: {
      id: 0,
    },
  });
  const [newUser] = useMutation(CREATE_USER);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState(0);
  console.log(oneUser);
  /**
   * В поле data, если запрос пройдет без ошибок,
   * то уже будет список наших пользователей.
   * Но по хорошему сделать их состояния,
   * поэтому сделаем хук useEffect().
   */
  console.log(data);
  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data]);

  const addUser = (e) => {
    e.preventDefault();
    newUser({
      variables: {
        input: {
          username,
          age,
        },
      },
    }).then(({ data }) => {
      console.log(data);
      setUsername('');
      setAge(0);
    });
  };

  const getAll = (e) => {
    e.preventDefault();
    refetch();
  };

  if (loading) {
    return <h2>Loading...</h2>;
  } else {
    return (
      <div>
        <form>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
          />
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type="number"
            placeholder="Age"
          />
          <div className="btns">
            <button onClick={addUser}>Create</button>
            <button onClick={getAll}>Get</button>
          </div>
        </form>
        <div>
          {users.map((user) => (
            <div className="user" key={user.id}>
              {user.id} {user.username}
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default App;
