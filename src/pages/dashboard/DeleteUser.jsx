import React from 'react';
import axios from 'axios';
import { Button, Popconfirm } from 'antd';
import { BsFillTrashFill } from 'react-icons/bs';
import { toast } from 'react-toastify';

function DeleteUser({ id, fetchData }) {

  const deleteUser = async () => {
    try {
      const response = await axios.delete(`users/${id}`);
      if (response.status === 204) {
        fetchData();
        toast.success("Foydalanuvchi o'chirildi", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error('Error happened', error);
      console.log('Full error object:', error);
      
      if (error.response && error.response.status === 406) {
        toast.error("Ushbu foydalanuvchini o'chirib bo'lmaydi!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error("Foydalanuvchi o'chirilmadi", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  return (
    <Popconfirm
      title="Foydalanuvchi oʻchirilsinmi?"
      onConfirm={() => {
        deleteUser();
      }}
      okText="Ha"
      cancelText="Yo'q"
    >
      <Button danger className="w-12 h-10 rounded p-[14px] py-[10px] text-[19px] bg-red-500">
        <BsFillTrashFill className="text-white" />
      </Button>
    </Popconfirm>
  );
}

export default DeleteUser;
