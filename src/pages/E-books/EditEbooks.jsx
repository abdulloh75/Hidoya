import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { FiEdit2 } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

function EditEbooks({ ebooks, fetchData }) {
  const { handleSubmit, register } = useForm();
  const [showEditModal, setShowEditModal] = useState(false);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);

  const openModal = () => {
    setShowEditModal(true);
  };
  const closeModal = () => {
    setShowEditModal(false);
  };

  const Elektroncategoriya = async () => {
    try {
      const response = await axios.get("e-categories/");
      const data = response.data;
      setDatas(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Elektroncategoriya();
  }, []);

  const OnEdit = async (formData) => {
    const formDatas = new FormData();
    formDatas.append("file", formData.file[0]);
    formDatas.append("title", formData.title);
    formDatas.append("category", formData.category);

    try {
      setLoading(true);
      await axios.put(
        `e-books/${ebooks.id}/`,
        formDatas,
      );
      toast.success("Elektron kitob tahrirlandi", {
        position: toast.POSITION.TOP_RIGHT,
      });
      fetchData();
      closeModal();
    } catch (error) {
      console.error('Error happened', error);
      toast.error("Elektron kitob tahrirlanmadi", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Button type="primary" className="bg-blue-600 h-10" onClick={openModal} disabled={loading}>
        <FiEdit2 />
      </Button>
      <Modal
        title="Elektron kitobni tahrirlash"
        visible={showEditModal}
        onOk={OnEdit}
        width={400}
        onCancel={closeModal}
      >
        <form className="md:block" onSubmit={handleSubmit(OnEdit)}>
          <div className="items-center md:flex">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Sarlavha nomi"
                className="w-full mt-3 md:ml-0 h-10 rounded-lg border-2 md:w-[21rem]  border-[#dee2e6] px-4 py-2 placeholder-gray-600 focus:border-blue-400 focus:outline-none"
                {...register("title")}
                value={ebooks.title}
              />
              <input
                type="file"
                placeholder=""
                className="w-full mt-3 md:mt-3 h-10 rounded-lg border-2 md:w-[21rem] border-[#dee2e6] p-1 placeholder-gray-600 focus:border-blue-400 focus:outline-none"
                {...register("file")}
                accept=".pdf"
              />
              <select
                name="category"
                id="categoryId"
                {...register("category")}
                value={ebooks.category ? ebooks.category.id: ""}
                className="w-full mt-3 md:w-[21rem] md:mt-3 rounded-lg border md:h-9 border-gray-600 p-2"
              >
                {Array.isArray(datas) && datas.length > 0 ? (
                  datas.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))
                ) : null}
              </select>
            </div>
          </div>
          <div className="md:mt-2 sm:flex sm:flex-row-reverse">
            <button onClick={OnEdit} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" disabled={loading}>
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

export default EditEbooks;
