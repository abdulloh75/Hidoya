import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { FiEdit2 } from 'react-icons/fi';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditOrder({ order, fetchData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedTitle, setLocalEditedTitle] = useState(order);
  const [loading, setLoading] = useState(false);
  const [datam, setDatam] = useState([]);
  const [books, setBooks] = useState([]);

  const status_type = [
    { status1: "Topshirilgan" },
    { status2: "Topshirilmagan" },
  ];

  const openModal = () => {
    setShowEditModal(true);
  };

  const closeModal = () => {
    setShowEditModal(false);
  };

  const fetchDatam = async () => {
    try {
      const response = await axios.get("users/");
      const data = response.data;
      setDatam(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDatam();
  }, []);

  const OnEdit = async (data) => {
    const updatedData = new FormData();
    updatedData.append("status", data.status);
    updatedData.append("created_date", data.created_date);
    updatedData.append("return_date", data.return_date);
    updatedData.append("user", data.user);
    updatedData.append("books", data.books);
    try {
      setLoading(true);
      await axios.put(`orders/${order.id}/`, updatedData);
      toast.success("Mahsulot tahrirlandi", {
        position: toast.POSITION.TOP_RIGHT,
      });
      fetchData();
      closeModal();
    } catch (error) {
      console.error('Error happened', error);
      toast.error("Mahsulot tahrirlanmadi", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setLoading(false);
    }
  };

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
    BooksFetchData();
  }, []);

  return (
    <div>
      <Button type="primary" className="bg-blue-600 md:ml-5 h-10" onClick={openModal} disabled={loading}>
        <FiEdit2 />
      </Button>
      <Modal
        title="Mahsulotni tahrirlash"
        visible={showEditModal}
        onOk={handleSubmit(OnEdit)}
        width={400}
        onCancel={closeModal}
      >
        <form className='md:block' onSubmit={handleSubmit(OnEdit)}>
          <div className="mb-4 mt-4">
            <label htmlFor="icon" className="ml-0 block text-gray-700 text-sm font-bold mb-2">Tahrirlash</label>
            <select
              className="w-full md:w-[22rem] rounded-lg border md:h-9 border-gray-600 p-2"
              {...register("status")}
              name="status"
              id="status"
            >
              {status_type.map((item, index) => (
                <option
                  key={index}
                  value={Object.values(item)[0].toLowerCase()}
                  selected={editedTitle.status && Object.values(item)[0].toLowerCase() === editedTitle.status.toLowerCase()}
                >
                  {Object.values(item)[0]}
                </option>
              ))}
            </select>

            <input
              type="date"
              placeholder="Created Date"
              className="w-full md:w-[22rem] mt-3 md:mt-3 rounded-lg border md:h-9 border-gray-600 p-2"
              {...register("created_date", { value: editedTitle.created_date })}
            />
            <input
              type="date"
              placeholder="Return Date"
              className="w-full mt-3 md:w-[22rem] md:mt-3 rounded-lg border md:h-9 border-gray-600 p-2"
              {...register("return_date", { value: editedTitle.return_date })}
            />
            <select
              name="user"
              id="userId"
              {...register("user")}
              value={editedTitle.user?.id}
              className="w-full mt-3 md:w-[22rem] md:mt-3 rounded-lg border md:h-9 border-gray-600 p-2"
            >
              {datam && datam.length > 0 ? (
                datam.map((user) => (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {`${user.first_name} ${user.last_name}`}
                  </option>
                ))
              ) : (
                <option value="">Ma'lumotlar mavjud emas</option>
              )}
            </select>

            <select
              name="books"
              id="bookId"
              {...register("books")}
              className="w-full mt-3 md:w-[22rem] md:mt-3 rounded-lg border md:h-9 border-gray-600 p-2"
              value={editedTitle.books ? editedTitle.books.id : ""}
            >
              <option value="">Ma'lumotlar mavjud emas</option>
              {Array.isArray(books) && books.length > 0 ? (
                books.map((item) => (
                  <option key={item.id} value={item.id} selected={item.title.toLocaleLowerCase() === editedTitle.books?.title?.toLocaleLowerCase()}>
                    {item.title}
                  </option>
                ))
              ) : null}
            </select>
          </div>
          <div className="md:mt-2 sm:flex sm:flex-row-reverse">
            <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" disabled={loading}>
              {loading ? 'Saqlash...' : 'Saqlash'}
            </button>
            <button type="button" onClick={closeModal} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Bekor qilish
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default EditOrder;