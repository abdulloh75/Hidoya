import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { FiEdit2 } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

function EditBooks({ book, fetchData }) {
  const { handleSubmit, register } = useForm();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedTitle, setLocalEditedTitle] = useState(book);
  const [loading, setLoading] = useState(false);
  const [kategoriya, setKategoriya] = useState([]);
  const [data, setData] = useState([]);
  const [datas, setDatas] = useState([]);

  const openModal = () => {
    setShowEditModal(true);
  };
  const closeModal = () => {
    setShowEditModal(false);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const OnEdit = async (formData) => {
    const updatedData = new FormData();
    console.log(updatedData);
    updatedData.append("title", formData.title);
    updatedData.append("price", parseFloat(formData.price));
    updatedData.append("description", formData.description);
    updatedData.append("author", formData.author);
    updatedData.append("publication", formData.publication);
    updatedData.append("publication_date", formatDate(formData.publication_date));
    updatedData.append("amount", parseInt(formData.amount, 10));
    updatedData.append("number_inv", parseInt(formData.number_inv, 10));
    updatedData.append("number_isbn", parseInt(formData.number_isbn, 10));
    updatedData.append("location_book", formData.location_book);
    updatedData.append("category", parseInt(formData.category, 10));
    updatedData.append("alphabet", parseInt(formData.alphabet, 10));
    updatedData.append("language", parseInt(formData.language, 10));

    try {
      setLoading(true);
      const response = await axios.put(`books/${book.id}/`, updatedData);
      toast.success("Kitob tahrirlandi", {
        position: toast.POSITION.TOP_RIGHT,
      });
      fetchData();
      closeModal();
    } catch (error) {
      console.error('Error happened', error);
      toast.error("Kitob tahrirlanmadi", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button type="primary" className="bg-blue-600 md:ml-5 h-10" onClick={openModal} disabled={loading}>
        <FiEdit2 />
      </Button>
      <Modal
        title="Alifboni tahrirlash"
        visible={showEditModal}
        onOk={OnEdit}
        width={500}
        onCancel={closeModal}
      >
        <form
          className="md:block"
          onSubmit={handleSubmit(OnEdit)}
        >
          <input
            type="text"
            placeholder="Nomi"
            className="w-full md:w-[28rem] rounded-lg border md:h-9 border-gray-600 p-2"
            {...register("title", { value: editedTitle.title })}
          />
          <input
            type="text"
            placeholder="Ta'rif"
            className="w-full mt-3 md:w-[28rem] rounded-lg border md:h-9 border-gray-600 p-2"
            {...register("description", { value: editedTitle.description })}
          />
          <div className="ml-0 flex gap-7">
            <input
              type="text"
              placeholder="Muallif"
              className="w-full mt-3 p-2 h-10 md:w-52 rounded-lg border md:h-9 border-gray-600 text-gray-600 py-[5px]"
              {...register("author", { value: editedTitle.author })}
            />
            <input
              type="text"
              placeholder="Nashriyot"
              className="w-full mt-3 p-2 h-10 md:w-52 rounded-lg border md:h-9 border-gray-600 text-gray-600 py-[5px]"
              {...register("publication", { value: editedTitle.publication })}
            />
          </div>
          <div className="flex gap-7">
            <input
              type="date"
              placeholder="Nashr sanasi"
              className="w-full mt-3 h-10 md:w-52 rounded-lg border md:h-9 border-gray-600 text-gray-600 p-2"
              {...register("publication_date", { value: editedTitle.publication_date })}
            />
            <input
              type="number"
              placeholder="Miqdori"
              className="w-full mt-3 rounded-lg md:w-52 border md:h-9 border-gray-600 p-2"
              {...register("amount", { value: editedTitle.amount })}
            />
          </div>
          <input
            type="number"
            placeholder="INV raqami"
            className="w-full mt-3 md:w-[28rem]  rounded-lg border md:h-9 border-gray-600 p-2"
            {...register("number_inv", { value: editedTitle.number_inv })}
          />
          <input
            type="number"
            placeholder="ISBN raqam"
            className="w-full mt-3 md:w-[28rem]  rounded-lg border md:h-9 border-gray-600 p-2"
            {...register("number_isbn", { value: editedTitle.number_isbn })}
          />
          <input
            type="number"
            placeholder="Kitob narxi"
            maxLength={8}
            className="w-full mt-3 md:w-[28rem] rounded-lg border md:h-9 border-gray-600 p-2"
            {...register("price", { value: editedTitle.price })}
          />
          <input
            type="text"
            placeholder="Kitob joylashuvi"
            className="w-full mt-3 md:w-[28rem]  rounded-lg border md:h-9 border-gray-600 p-2"
            {...register("location_book", { value: editedTitle.location_book })}
          />
          <select
            name=""
            id=""
            {...register("category")}
            defaultValue={editedTitle.category ? editedTitle.category.id : ""}
            className="w-full mt-3 md:w-[28rem] rounded-lg border md:h-9 border-gray-600 text-gray-600 p-2"
          >
            {Array.isArray(kategoriya) ? (
              kategoriya.map((item) => (
                <option key={item.id} value={item.id} >
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
            defaultValue={editedTitle.alphabet ? editedTitle.alphabet.id : ""}
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
            defaultValue={editedTitle.language ? editedTitle.language.id : ""}
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
            <div className="mt-2 sm:flex sm:flex-row-reverse">
              <button
              onClick={handleSubmit(OnEdit)}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                disabled={loading}
              >
                {loading ? 'Saqlash...' : 'Saqlash'}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Bekor qilish
              </button>
            </div>
        </form>
      </Modal>
    </div>
  );
}

export default EditBooks;
