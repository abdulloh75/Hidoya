import React, { useEffect, useState } from "react";
import axios from "axios";
import EditLanguages from "./EditLanguages";
import DeleteLanguages from "./DeleteLanguages";
import ShowLanguages from "./ShowLanguages";
import PostLanguages from './PostLanguages'
import Loading from "../loading/Loading";
import { BiShow } from "react-icons/bi";
import { Button, } from 'antd';

function GetLanguages() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState({ isOpen: false, data: null });
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get("language/");
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
        <PostLanguages handleClick={handleClick} fetchData={fetchData} />
        <div className="max-h-[500px] overflow-y-auto">
          <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500 ">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Id
                </th>
                <th scope="col" className="px-5 py-4">
                  Til nomi
                </th>
                <th scope="col" className="px-6 py-4 flex items-center justify-end mr-5">
                  O'chirish va Tahrirlash
                </th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={item.id} className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.title}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center justify-end gap-5">
                        <EditLanguages
                          key={item.id}
                          language={item}
                          fetchData={fetchData}
                        />
                        <DeleteLanguages
                          id={item.id}
                          fetchData={fetchData}
                        />
                        <Button
                          type="primary"
                          className="bg-blue-500 h-10 text-[19px]"
                          onClick={() => setOpen({ isOpen: true, data: item })}
                        >
                          <BiShow />
                        </Button>

                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>

                </tr>
              )}
            </tbody>
          </table>
        </div>
        <ShowLanguages setOpen={setOpen} open={open} />
      </div>
    </>
  );
}

export default GetLanguages;
