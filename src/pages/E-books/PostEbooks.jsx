import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from "react-toastify";
import { Modal, Button } from 'antd';
import { useState, useEffect } from 'react';

function PostEbooks({ handleClick, fetchData }) {
  const { handleSubmit, register, reset } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setShowEditModal(false);
    reset();
  };

  const onSubmit = async (formData) => {
    const formDataObject = new FormData();
    formDataObject.append("file", formData.file[0]);
    formDataObject.append("title", formData.title);
    formDataObject.append("category", formData.category);

    try {
      setLoading(true);
      const response = await axios.post(
        `e-books/`,
        formDataObject,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      fetchData()
      handleCloseEditModal()
      toast.success("Elektron kitob qo'shildi", {
        position: toast.POSITION.TOP_RIGHT,
      });
      handleClick()
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Elektron kitob qo'shilmadi", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setLoading(false);
    }
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

  return (
    <>
      <div className="flex flex-wrap gap-4 md:block">
        <Button type="primary" className=" bg-blue-600 ml-5 mt-5" onClick={showModal} disabled={loading}>
          Elektron kitob qo'shish
        </Button>
        <Modal className="md:mt-52" width={380} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <form className="md:block" onSubmit={handleSubmit(onSubmit)}>
            <div className="items-center md:flex">
              <div className="mb-4">
                <label htmlFor="icon" className="ml-0 block text-gray-700 text-sm font-bold mb-2">Elektron kitob qo'shish</label>
                <input
                  type="text"
                  placeholder="Sarlavha nomi"
                  className="w-full mt-3 md:ml-0 h-10 rounded-lg border-2 md:w-[21rem]  border-[#dee2e6] px-4 py-2 placeholder-gray-600 focus:border-blue-400 focus:outline-none"
                  {...register("title")}
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
            <button
              type="submit"
              className="w-[310px] mt-3 md:ml-0 h-10 md:w-[320px] flex items-center justify-center md:mt-0 rounded-lg border-2 px-4 py-2 text-center border-blue-400 bg-blue-400 text-white"
            >
              {loading ? 'Saqlash...' : 'Saqlash'}
            </button>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default PostEbooks;
