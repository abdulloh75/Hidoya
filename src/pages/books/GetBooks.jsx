import React, { useEffect, useState } from "react";
import axios from "axios";
import EditBooks from "./EditBooks";
import DeleteBooks from "./DeleteBooks";
import ShowBooks from "./ShowBooks";
import PostBooks from './PostBooks'
import Loading from "../loading/Loading";
import { BiShow } from "react-icons/bi";
import { Button, } from 'antd';

function GetBooks() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState({ isOpen: false, data: null });
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get("books/");
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
          <PostBooks handleClick={handleClick} fetchData={fetchData} />
          <input
            type="search"
            placeholder="Qidirish"
            className="w-full mt-3 md:w-[15rem] rounded-lg border h-8 p-2 placeholder:text-gray-600"
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
                  <th scope="col" className="px-6 py-4">Sarlavha</th>
                  <th scope="col" className="px-6 py-4">Muallif</th>
                  <th scope="col" className="px-6 py-4">Nashr</th>
                  <th scope="col" className="px-6 py-4">Miqdori</th>
                  <th scope="col" className="px-6 py-4">Narxi</th>
                  <th scope="col" className="px-6 py-4">Manzili</th>
                  <th scope="col" className="pl-12 py-4">O'chirish va Taxrirlash</th>
                </tr>
              </thead>
              <tbody>
                {data?.filter((item) => item.title.toLowerCase().includes(search.toLowerCase())).map((item, index) => (
                  <tr className="border-b dark:border-neutral-500" key={item.id}>
                    <td className="px-6 py-4 truncate max-w-[160px] font-medium">{index+1}</td>
                    <td className="px-6 py-4 truncate max-w-[160px] font-medium">{item.title}</td>
                    <td className="px-6 py-4 truncate max-w-[80px]">{item.author}</td>
                    <td className="px-6 py-4 truncate max-w-[80px]">{item.publication}</td>
                    <td className="px-6 py-4 truncate max-w-[160px]">{item.amount}</td>
                    <td className="px-6 py-4 truncate max-w-[160px]">{item.price}</td>
                    <td className="px-6 py-4 truncate max-w-[130px]">{item.location_book}</td>
                    <td className="py-4 p-2 flex gap-5">
                      <div className="flex items-center justify-start gap-5">
                        <EditBooks
                          key={item.id}
                          book={item}
                          fetchData={fetchData}
                        />
                        <DeleteBooks
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
        <ShowBooks setOpen={setOpen} open={open} />
      </div>
    </>
  );
}

export default GetBooks;
