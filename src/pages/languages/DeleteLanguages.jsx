import React from 'react';
import axios from 'axios';
import { Button, Popconfirm } from 'antd';
import { BsFillTrashFill } from 'react-icons/bs';
import { toast } from 'react-toastify';

function DeleteLanguages({ id, fetchData }) {

  const deleteLanguage = async () => {
    try {
      const response = await axios.delete(`language/${id}`);
      if (response.status === 204) {
        fetchData();
        toast.success("Til o'chirildi", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error('Error happened', error);
      toast.error("Til o'chirilmadi", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <Popconfirm
      title="Til oʻchirilsinmi?"
      onConfirm={() => {
        deleteLanguage();
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

export default DeleteLanguages;
