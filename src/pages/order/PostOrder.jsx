import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from "react-toastify";
import { Modal, Button } from 'antd';
import { useState, useEffect } from 'react';

function PostOrder({ handleClick, fetchData }) {
  const { handleSubmit, register, reset } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [datam, setDatam] = useState([]);
  const [books, setBooks] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    reset();
  };
  const onSubmit = async (formData) => {
    const formDataObject = new FormData();
    formDataObject.append("status", formData.status);
    formDataObject.append("created_date", formData.created_date);
    formDataObject.append("return_date", formData.return_date);
    formDataObject.append("user", formData.user);
    formDataObject.append("books", formData.books);
    try {
      setLoading(true);
      const response = await axios.post(
        `orders/`,
        formDataObject,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      fetchData()
      handleCloseEditModal()
      toast.success("Mahsulot qo'shildi", {
        position: toast.POSITION.TOP_RIGHT,
      });
      handleClick()
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Mahsulot qo'shilmadi", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }finally {
      setLoading(false);
    }
  };
  const status_type = [
    { status1: "Topshirilgan" },
    { status2: "Topshirilmagan" },
  ];

  const fetchDatam = async () => {
    try {
      const response = await axios.get(
        "users/"
      );
      const data = response.data;
      setDatam(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDatam();
  }, []);

  const BooksFetchData = async () => {
    try {
      const response = await axios.get("books/");
      const data = response.data;
      setBooks(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    BooksFetchData()
  }, []);
  return (
    <>
      <div className="flex flex-wrap gap-4 md:block">
        <Button type="primary" className="mt-3 bg-blue-600 md:mt-5" onClick={showModal}  disabled={loading}>
          Mahsulot qo'shish
        </Button>
        <Modal className="md:mt-52" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <form className="md:block" onSubmit={handleSubmit(onSubmit)}>
            <div className="items-center md:flex">
              <div className="mb-4">
                <label htmlFor="icon" className=" ml-0 block text-gray-700 text-sm font-bold mb-2">Kitob berishni qo'shish</label>
                <select
                  className="w-full md:w-[28rem] md:mt-0 rounded-lg border md:h-9 border-gray-600 p-2"
                  {...register("status")}
                  name="status"
                  id="status"
                >
                  <option value="">Ma'lumotlar mavjud emas</option>
                  {status_type.map((item) => (
                    <option value="">
                      {Object.values(item)[0]}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  placeholder="Created Date"
                  className="w-full mt-3 md:w-[28rem] md:mt-3 rounded-lg border md:h-9 border-gray-600 p-2"
                  {...register("created_date")}
                />
                <input
                  type="date"
                  placeholder="Return Date"
                  className="w-full mt-3 md:w-[28rem] md:mt-3 rounded-lg border md:h-9 border-gray-600 p-2"
                  {...register("return_date")}
                />
                <select
                  name="user"
                  id="userId"
                  {...register("user")}
                  className="w-full mt-3 md:w-[28rem] md:mt-3 rounded-lg border md:h-9 border-gray-600 p-2"
                >
                  {Array.isArray(datam) && datam.length > 0 ? (
                    datam.map((item) => (
                      <option key={item.id} value={item.id}>
                        {`${item.first_name} ${item.last_name}`}
                      </option>
                    ))
                  ) : (
                    <option value="">Ma'lumotlar mavjud emas</option>
                  )}
                </select>
                <select
                  name=""
                  id=""
                  {...register("books")}
                  className="w-full mt-3 md:w-[28rem] md:mt-3 rounded-lg border md:h-9 border-gray-600 p-2"
                >
                  {Array.isArray(books) && books.length > 0 ? (
                    books.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    ))
                  ) : (
                    <option value="">Ma'lumotlar mavjud emas</option>
                  )}
                </select>

              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="w-[320px] mt-3 md:ml-0 flex h-10 md:w-[320px] md:flex md:items-center md:justify-center md:mt-0 rounded-lg border-2 px-4 py-2 text-center border-blue-400 bg-blue-400 text-white"
              >
                {loading ? 'Saqlash...' : 'Saqlash'}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default PostOrder;