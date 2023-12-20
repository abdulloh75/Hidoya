import React, { useState, useEffect } from "react";
import axios from 'axios'

const Ekategoriya = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "e-categories/"
      );
      const data = response.data;
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-[100%] py-5 bg-blue-500 px-8 gap-5">
      <div className="flex gap-10">
        {data && data.length > 0 ? (
          data.map((category) => (
            <ul
              className=""
              key={category.id}
            >
              <li className="font-bold cursor-pointer text-white">
                {category.title}
              </li>
            </ul>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  )
}

export default Ekategoriya