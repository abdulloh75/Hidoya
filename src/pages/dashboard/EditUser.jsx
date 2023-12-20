import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { FiEdit2 } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

function EditUser({ user, fetchData }) {
  const { handleSubmit, register } = useForm();
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [datas, setDatas] = useState([]);

  const user_type = [
    { "o'qituvchi": "O'qituvchi" },
    { "talaba": "Talaba" },
    { "xodim": "Xodim" },
    { "boshqa": "Boshqa" }
  ];

  const openModal = () => {
    setShowEditModal(true);
  };
  const closeModal = () => {
    setShowEditModal(false);
  };
  const OnEdit = async (formData) => {
    const updatedData = new FormData();
    updatedData.append("first_name", formData.first_name);
    updatedData.append("last_name", formData.last_name);
    updatedData.append("middle_name", formData.middle_name);
    updatedData.append("course", formData.course);
    updatedData.append("group", formData.group);
    updatedData.append("address", formData.address);
    updatedData.append("user_type", formData.user_type);

    try {
      setLoading(true);
      await axios.put(`users/${user.id}/`, updatedData);
      toast.success("Foydalanuvchi tahrirlandi", {
        position: toast.POSITION.TOP_RIGHT,
      });
      fetchData();
      closeModal();
    } catch (error) {
      console.error('Error happened', error);
      toast.error("Foydalanuvchi tahrirlanmadi", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setLoading(false);
    }
  };


  const fetchCourseData = async () => {
    try {
      const response = await axios.get("course/");
      const data = response.data;
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  const fetchGroupData = async () => {
    try {
      const response = await axios.get("groups/");
      const data = response.data;
      setDatas(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGroupData();
  }, []);

  return (
    <div>
      <Button type="primary" className="bg-blue-600 h-10" onClick={openModal} disabled={loading}>
        <FiEdit2 />
      </Button>
      <Modal
        title="Foydalanuvchini tahrirlash"
        visible={showEditModal}
        onOk={OnEdit}
        width={400}
        onCancel={closeModal}
      >
        <form className="md:block" onSubmit={handleSubmit(OnEdit)}>
        <div className="">
          <input
            type="text"
            placeholder="Ismi"
            className="w-full md:w-[22rem] rounded-lg border h-9 border-gray-600 p-2"
            {...register("first_name")}
          />
          <input
            type="text"
            placeholder="Familiya"
            className="w-full mt-3 md:w-[22rem] rounded-lg border h-9 border-gray-600 p-2"
            {...register("last_name")}
          />
          <input
            type="text"
            placeholder="Sharifi"
            className="w-full mt-3 md:w-[22rem] rounded-lg border h-9 border-gray-600 p-2"
            {...register("middle_name")}
          />
            <select
              className="w-full mt-3 md:w-[22rem] rounded-lg border h-9 border-gray-600 p-2"
              {...register("course")}
              name="course"
              id="course"
            >
              {data && data.length > 0 ? (
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
              className="w-full mt-3 md:w-[22rem] rounded-lg border h-9 border-gray-600 p-2"
              {...register("group")}
              name="" id="">
              {datas && datas.length > 0 ? (
                datas.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))
              ) : (
                <option value="">Ma'lumotlar mavjud emas</option>
              )}
            </select>
          <input
            type="text"
            placeholder="Manzili"
            className="w-full mt-3 md:w-[22rem] rounded-lg border h-9 border-gray-600 p-2"
            {...register("address")}
          />
          <select
            className="w-full mt-3 md:w-[22rem] rounded-lg border h-9 border-gray-600 p-2"
            {...register("user_type")}
            name="user_type"
            id="user_type"
          >
            {user_type.map((item) => (
              <option key={Object.keys(item)[0]} value={Object.keys(item)[0]}>
                {Object.values(item)[0]}
              </option>
            ))}
          </select>
          <div className="mt-2 sm:flex sm:flex-row-reverse">
              <button type="button" onClick={handleSubmit(OnEdit)} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" disabled={loading}>
              {loading ? 'Saqlash...' : 'Saqlash'}
            </button>
            <button type="button" onClick={closeModal} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Bekor qilish
            </button>
          </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default EditUser;