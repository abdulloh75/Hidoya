import React, { useEffect, useState } from "react";
import axios from "axios";
import EditOrder from "./EditOrder";
import DeleteOrder from "./DeleteOrder";
import ShowOrder from "./ShowOrder";
import PostOrder from './PostOrder'
import Loading from "../loading/Loading";
import { BiShow } from "react-icons/bi";
import { Button, Select } from 'antd';

function GetOrder() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState({ isOpen: false, data: null });
  const [loading, setLoading] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState("");

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get("orders/");
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
          <PostOrder handleClick={handleClick} fetchData={fetchData} />
          <Select
            showSearch
            style={{
              width: 200,
              marginTop: 13,
            }}
            placeholder="Search to Select"
            onChange={(value) => setSelectedStatus(value)}
            value={selectedStatus}
          >
            <Option value=''>
              Xammasi
            </Option>
            <Option value='topshirilgan'>
              Topshirilgan
            </Option>
            <Option value='topshirilmagan'>
              Topshirilmagan
            </Option>
          </Select>
        </div>
        {data?.length > 0 ? (
          <div className="max-h-[500px] overflow-y-auto">
            <table className=" min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">Id</th>
                  <th scope="col" className="px-6 py-4">Status</th>
                  <th scope="col" className="px-5 py-4">Ismi</th>
                  <th scope="col" className="px-6 py-4">Familiyasi</th>
                  <th scope="col" className="px-4 py-4">Sharifi</th>
                  <th scope="col" className="px-6 py-4">Kurs</th>
                  <th scope="col" className="px-6 py-4">Lavozim</th>
                  <th scope="col" className="px-6 py-4">Kitoblar</th>
                  <th scope="col" className="px-6 py-4">O'chirish va Tahrirlash</th>
                </tr>
              </thead>
              <tbody>
                {data?.filter(item => item.status.includes(selectedStatus)).map((item, index) => (
                  <tr key={item.id} className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                    <td className={`whitespace-nowrap px-6 py-4 ${item.status === 'topshirilgan' ? 'text-green-500' : 'text-red-500'}`}>
                      {item.status}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">{item.user.first_name}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.user.last_name}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.user.middle_name}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.user.course}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.user.user_type}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {Array.isArray(item.books) && item.books.length > 0
                        ? item.books.map(book => (
                          <span key={book.id}>{book.title}</span>
                        ))
                        : "Malumot yo'q"
                      }
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex gap-5">
                        <EditOrder
                          key={item.id}
                          order={item}
                          fetchData={fetchData} />
                        <DeleteOrder
                          id={item.id}
                          fetchData={fetchData}
                        />
                        <Button type="primary" className="bg-blue-500 h-10 text-[19px]" onClick={() => setOpen({ isOpen: true, data: item })}>
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
        <ShowOrder setOpen={setOpen} open={open} />
      </div>
    </>
  );
}

export default GetOrder;