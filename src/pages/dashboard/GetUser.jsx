import React, { useEffect, useState } from "react";
import axios from "axios";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
import ShowUser from "./ShowUser";
import PostUser from './PostUser'
import Loading from "../loading/Loading";
import { BiShow } from "react-icons/bi";
import { Button, } from 'antd';

function GetUser() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState({ isOpen: false, data: null });
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get("users/");
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
        <div className="flex md:items-center md:justify-between px-5 gap-5">
          <PostUser handleClick={handleClick} fetchData={fetchData} />
          <input
            type="search"
            placeholder="Qidirish"
            className="w-full mt-3 md:w-[15rem] rounded-lg border h-9 p-2 placeholder:text-gray-600"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        {data?.length > 0 ? (
          <div className="max-h-[500px] overflow-y-auto">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">Id</th>
                  <th scope="col" className="px-6 py-4">Ismi</th>
                  <th scope="col" className="px-6 py-4">Familiyasi</th>
                  <th scope="col" className="px-5 py-4">Sharif</th>
                  <th scope="col" className="px-6 py-4">Kurs</th>
                  <th scope="col" className="px-4 py-4">Guruh</th>
                  <th scope="col" className="px-6 py-4">Manzil</th>
                  <th scope="col" className="px-6 py-4">Lavozim</th>
                  <th scope="col" className="px-6 py-4">O'chirish va Tahrirlash</th>
                </tr>
              </thead>
              <tbody>
                {data?.filter((item) => item.first_name.toLowerCase().includes(search.toLowerCase())).map((item, index) => (
                  <tr key={item.id} className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{item.first_name}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.last_name}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.middle_name}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.course?.title}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.group?.title}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.address}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.user_type}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-start justify-start gap-5">
                        <EditUser
                          key={item.id}
                          user={item}
                          fetchData={fetchData}
                        />
                        <DeleteUser
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
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div></div>
        )}
        <ShowUser setOpen={setOpen} open={open} />
      </div>
    </>
  );
}

export default GetUser;


{/*  */ }