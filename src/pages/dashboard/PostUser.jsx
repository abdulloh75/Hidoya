import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from "react-toastify";
import { Modal, Button } from 'antd';
import { useState, useEffect } from 'react';

function PostUser({ handleClick, fetchData }) {
  const { handleSubmit, register, reset } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [datas, setDatas] = useState([]);

  const user_type = [
    { "o'qituvchi": "O'qituvchi" },
    { "talaba": "Talaba" },
    { "xodim": "Xodim" },
    { "boshqa": "Boshqa" }
  ]

  const showModal = () => {
    if (!loading) {
      setIsModalOpen(true);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("middle_name", data.middle_name);
    formData.append("course", data.course);
    formData.append("group", data.group);
    formData.append("address", data.address);
    formData.append("user_type", data.user_type);

    try {
      setLoading(true);
      const response = await axios.post(
        `users/`,
        formData,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      fetchData();
      handleCloseModal();
      toast.success("Foydalanuvchi qo'shildi", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.log(error);
      toast.error("Foydalanuvchi qo'shilmadi", {
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
    <>
      <div className="flex flex-wrap gap-4 md:block">
        <Button type="primary" className=" bg-blue-600 md:ml-5 md:mt-5 mt-[14px]" onClick={showModal}  disabled={loading}>
          Foydalanuvchi qo'shish
        </Button>
        <Modal title="Tillarni qo'shish" className="md:mt-52" width={380} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <form className="md:block" onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <input
                type="text"
                placeholder="Ismi"
                className="w-full md:w-[21rem] rounded-lg border h-9 border-gray-600 p-2"
                {...register("first_name")}
              />
              <input
                type="text"
                placeholder="Familiya"
                className="w-full mt-3 md:w-[21rem] rounded-lg border h-9 border-gray-600 p-2"
                {...register("last_name")}
              />
              <input
                type="text"
                placeholder="Sharifi"
                className="w-full mt-3 md:w-[21rem] rounded-lg border h-9 border-gray-600 p-2"
                {...register("middle_name")}
              />
              <select
                className="w-full mt-3 md:w-[21rem] rounded-lg border h-9 border-gray-600 p-2"
                {...register("course")}
                name="" id="">
                {data && data.length > 0 ? (
                  data.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))
                ) : (
                  <option value="">Ma'lumotlar mavjud emas</option>
                )}
              </select>
              <select
                className="w-full mt-3 md:w-[21rem] rounded-lg border h-9 border-gray-600 p-2"
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
                className="w-full mt-3 md:w-[21rem] rounded-lg border h-9 border-gray-600 p-2"
                {...register("address")}
              />
              <select
                className="w-full mt-3 md:w-[21rem] rounded-lg border h-9 border-gray-600 p-2"
                {...register("user_type")}
                name="user_type"
                id="user_type"
              >
                <option value="">Ma'lumotlar mavjud emas</option>
                {user_type.map((item) => (
                  <option key={Object.values(item)[0]} value={Object.keys(item)[0]}>
                    {Object.values(item)[0]}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-[320px] mt-3 md:ml-0 flex h-10 md:w-[320px] md:flex md:items-center md:justify-center md:mt-3 rounded-lg border-2 px-4 py-2 text-center border-blue-400 bg-blue-400 text-white"
            >
              {loading ? 'Saqlash...' : 'Saqlash'}
            </button>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default PostUser;
