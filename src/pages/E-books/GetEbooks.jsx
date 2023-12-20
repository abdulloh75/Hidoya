import React, { useEffect, useState } from "react";
import axios from "axios";
import EditEbooks from "./EditEbooks";
import DeleteEbooks from "./DeleteEbooks";
import PostEbooks from './PostEbooks'
import Loading from "../loading/Loading";
import { BiShow } from "react-icons/bi";
import { Button, } from 'antd';

function GetEbooks() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const openPDFPage = () => {
    window.open(category.file, '');
  };

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get("e-books/");
      const data = response.data;
      setData(data);
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function handleClick() {
    fetchData();
  }
  return (
    <>
      <div className="mt-[8px] rounded-lg md:container mx-auto md:mt-10 flex min-h-[840px] min-w-full max-w-screen-lg flex-col gap-8 bg-white shadow-2xl">
        {loading && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex bg-opacity-75 backdrop-filter backdrop-blur-lg w-[100%] h-full items-center justify-center">
              <Loading />
            </div>
          </div>
        )}
        <PostEbooks handleClick={handleClick} fetchData={fetchData} />
        {data && data.length > 0 ? (
          <div className="max-h-[500px] overflow-y-auto">
          <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-6 py-4">Id</th>
                  <th scope="col" className="px-6 py-4">Sarlavha</th>
                <th scope="col" className="px-6 py-4">Kategoriya</th>
                  <th scope="col" className="px-6 py-4">Hajmi</th>
                <th scope="col" className="px-14 py-4">O'chirish va Tahrirlash</th>
              </tr>
            </thead>
            <tbody>
              {data.map((category, index) => (
                <tr key={category.id} className="border-b dark:border-neutral-500">
                  <td className="whitespace-nowrap px-6 py-0 font-medium">{index+1}</td>
                  <td className="whitespace-nowrap px-6 py-0">{category.title}</td>
                  <td className="whitespace-nowrap px-6 py-0">{category.category.title}</td>
                  <td className="whitespace-nowrap px-6 py-0">{category.size}  mb</td>
                  <td className="whitespace-nowrap px-10 py-4">
                    <div className="flex gap-5">
                      <EditEbooks
                        key={category.id}
                        ebooks={category}
                        fetchData={fetchData}
                      />
                      <DeleteEbooks
                        id={category.id}
                        fetchData={fetchData}
                      />
                      <a href={category.file} target="_blank" download>
                        <Button
                          type="primary"
                          className="bg-blue-500 h-10 text-[19px]"
                          onClick={openPDFPage}
                        >
                          <BiShow />
                        </Button>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
            </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

export default GetEbooks;
