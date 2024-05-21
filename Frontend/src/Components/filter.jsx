import axios from 'axios';
import { useEffect, useState } from 'react';

function filtering({ setFilterName }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/login')
      .then((res) => {
        setData(res.data);
        console.log(data);
      })
      .catch((err) => {
        console.log('error', err);
      });
  }, []);

  return (
    <div className='w-1/2 flex justify-center'>
      <select
        name=""
        id=""
        onChange={(e) => {
          setFilterName(e.target.value);
        }}
        className='w-1/2'
      >
        <option value="all" className='w-1/2'>Everyone</option>
        {data &&
          data.map((user, ind) => {
            return (
              <option key={ind} value={user.name}>
                {user.name}
              </option>
            );
          })}
      </select>
    </div>
  );
}

export default filtering;
