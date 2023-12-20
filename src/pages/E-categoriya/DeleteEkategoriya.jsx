import React from 'react';
import axios from 'axios';
import { Button, message, Popconfirm } from 'antd';
import { BsFillTrashFill } from 'react-icons/bs';
import { toast } from 'react-toastify';

function DeleteEkategoriya({ id, fetchData }) {

  const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
  };
  const deleteElectronkategoriya = async () => {
    try {
      const response = await axios.delete(`e-categories/${id}`);
      if (response.status === 204) {
        fetchData();
        toast.success("Electron kategoriya o'chirildi", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error('Error happened', error);
      toast.error("Electron kategoriya o'chirilmadi", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <Popconfirm
      title="Electron kategoriya oʻchirilsinmi"
      onConfirm={() => {
        deleteElectronkategoriya();
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

export default DeleteEkategoriya;
