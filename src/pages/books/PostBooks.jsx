import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Modal, Button } from 'antd';

function PostBooks({ handleClick, fetchData }) {
  const { handleSubmit, register, reset } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [kategoriya, setKategoriya] = useState([]);
  const [data, setData] = useState([]);
  const [datas, setDatas] = useState([]);

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
    setIsModalOpen(false);
    reset();
  };

  useEffect(() => {
    fetchDatam();
    fetchDatas();
    fetchDatak();
  }, []);

  const fetchDatak = async () => {
    try {
      const response = await axios.get('categories/');
      const data = response.data;
      setKategoriya(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDatam = async () => {
    try {
      const response = await axios.get('alphabet/');
      const data = response.data;
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDatas = async () => {
    try {
      const response = await axios.get('language/');
      const data = response.data;
      setDatas(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('price', parseFloat(data.price));
    formData.append('description', data.description);
    formData.append('author', data.author);
    formData.append('publication', data.publication);
    formData.append('publication_date', formatDate(data.publication_date));
    formData.append('amount', parseInt(data.amount));
    formData.append('number_inv', parseInt(data.number_inv));
    formData.append('number_isbn', parseInt(data.number_isbn));
    formData.append('location_book', data.location_book);
    formData.append('category', data.category);
    formData.append('alphabet', data.alphabet);
    formData.append('language', data.language);

    try {
      setLoading(true);
      const response = await axios.post('books/', formData);

      if (response.status === 201) {
        fetchData();
        handleCloseEditModal();
        toast.success('Kitob qo\'shildi', {
          position: toast.POSITION.TOP_RIGHT,
        });
        handleClick();
        setIsModalOpen(false);
      } else {
        console.error(`Server returned an error: ${response.statusText}`);
      }
    } catch (error) {
      console.log(error);
      toast.error('Kitob qo\'shilmadi', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 md:block">
        <Button
          type="primary"
          className=" mt-3 bg-blue-600 md:ml-5 md:mt-5"
          onClick={showModal}
          disabled={loading}
        >
          Kitob qo'shish
        </Button>
        <Modal
          title="Kitob qo'shish"
          width={500}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <form
            className="md:block"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              placeholder="Nomi"
              className="w-full md:w-[28rem] rounded-lg border md:h-9 border-gray-600 p-2"
              {...register("title")}
            />
            <input
              type="text"
              placeholder="Ta'rif"
              className="w-full mt-3 md:w-[28rem] rounded-lg border md:h-9 border-gray-600 p-2"
              {...register("description")}
            />
            <div className="ml-0 flex gap-7">
              <input
                type="text"
                placeholder="Muallif"
                className="w-full mt-3 p-2 h-10 md:w-52 rounded-lg border md:h-9 border-gray-600 text-gray-600 py-[5px]"
                {...register("author")}
              />
              <input
                type="text"
                placeholder="Nashriyot"
                className="w-full mt-3 p-2 h-10 md:w-52 rounded-lg border md:h-9 border-gray-600 text-gray-600 py-[5px]"
                {...register("publication")}
              />
            </div>
            <div className="flex gap-7">
              <input
                type="date"
                placeholder="Nashr sanasi"
                className="w-full mt-3 h-10 md:w-52 rounded-lg border md:h-9 border-gray-600 text-gray-600 p-2"
                {...register("publication_date")}
              />
              <input
                type="number"
                placeholder="Miqdori"
                className="w-full mt-3 rounded-lg md:w-52 border md:h-9 border-gray-600 p-2"
                {...register("amount")}
              />
            </div>
            <input
              type="number"
              placeholder="INV raqami"
              className="w-full mt-3 md:w-[28rem]  rounded-lg border md:h-9 border-gray-600 p-2"
              {...register("number_inv")}
            />
            <input
              type="number"
              placeholder="ISBN raqam"
              className="w-full mt-3 md:w-[28rem]  rounded-lg border md:h-9 border-gray-600 p-2"
              {...register("number_isbn")}
            />
            <input
              type="number"
              placeholder="Kitob narxi"
              className="w-full mt-3 md:w-[28rem] rounded-lg border md:h-9 border-gray-600 p-2"
              {...register("price")}
            />
            <input
              type="text"
              placeholder="Kitob joylashuvi"
              className="w-full mt-3 md:w-[28rem]  rounded-lg border md:h-9 border-gray-600 p-2"
              {...register("location_book")}
            />
            <select
              name=""
              id=""
              {...register("category")}
              className="w-full mt-3 md:w-[28rem] rounded-lg border md:h-9 border-gray-600 text-gray-600 p-2"
            >
              {Array.isArray(kategoriya) ? (
                kategoriya.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))
              ) : (
                <option value="">Ma'lumotlar mavjud emas</option>
              )}
            </select>
            <select
              name=""
              id=""
              {...register("alphabet")}
              className="w-full mt-3 md:w-[28rem] rounded-lg border md:h-9 border-gray-600 text-gray-600 p-2"
            >
              {Array.isArray(data) ? (
                data.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))
              ) : (
                <option value="">Ma'lumotlar mavjud emas</option>
              )}
            </select>
            <select
              name=""
              id=""
              {...register("language")}
              className="w-full mt-3 md:w-[28rem] rounded-lg border md:h-9 border-gray-600 text-gray-600 p-2"
            >
              {Array.isArray(datas) ? (
                datas.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))
              ) : (
                <option value="">Ma'lumotlar mavjud emas</option>
              )}
            </select>
            <button
              type="submit"
              className="w-full mt-3 h-10 md:w-[320px] flex items-center justify-center md:mt-3 rounded-lg border-2 px-4 py-2 text-center border-blue-500 bg-blue-500 text-white"
            >
              <span>Ma'lumotlarni yuborish</span>
            </button>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default PostBooks;
