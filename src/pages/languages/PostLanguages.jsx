import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from "react-toastify";
import { Modal, Button } from 'antd';
import { useState } from 'react';

function PostLanguages({ handleClick, fetchData }) {
  const { handleSubmit, register, reset } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);

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
    formDataObject.append("title", formData.title);

    try {
      setLoading(true);
      const response = await axios.post(
        `language/`,
        formDataObject,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      fetchData()
      handleCloseEditModal()
      toast.success("Til qo'shildi", {
        position: toast.POSITION.TOP_RIGHT,
      });
      handleClick()
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Til qo'shilmadi", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 md:block">
        <Button type="primary" className=" bg-blue-600 ml-5 mt-5" onClick={showModal}  disabled={loading}>
          Til qo'shish
        </Button>
        <Modal className="md:mt-52" width={380} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <form className="md:block" onSubmit={handleSubmit(onSubmit)}>
            <div className="items-center md:flex">
              <div className="mb-4">
                <label htmlFor="icon" className=" ml-0 block text-gray-700 text-sm font-bold mb-2">Til qo'shish</label>
                <input
                  type="text"
                  placeholder="Til nomi"
                  className="w-[310px] md:ml-0 h-10 rounded-lg border-2 md:w-[320px]  border-[#dee2e6] px-4 py-2 placeholder-gray-600 focus:border-blue-400 focus:outline-none"
                  {...register("title")}
                />
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

export default PostLanguages;
