import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { FiEdit2 } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditAlifbolar({ alifbolar, fetchData }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedTitle, setLocalEditedTitle] = useState(alifbolar.title);
  const [loading, setLoading] = useState(false);
  const openModal = () => {
    setShowEditModal(true);
  };

  const closeModal = () => {
    setShowEditModal(false);
  };

  const OnEdit = async () => {
    try {
      setLoading(true);
      await axios.put(
        `alphabet/${alifbolar.id}/`,
        { title: editedTitle },
      );
      toast.success("Alifbo tahrirlandi", {
        position: toast.POSITION.TOP_RIGHT,
      });
      fetchData();
      closeModal();
    } catch (error) {
      console.error('Error happened', error);
      toast.error("Alifbo tahrirlanmadi", {
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
        width={400}
        onCancel={closeModal}
      >
        <div className="">
          <input
            id="title"
            value={editedTitle}
            onChange={(e) => setLocalEditedTitle(e.target.value)}
            className="mt-3 w-full md:w-[360px] h-10 rounded-lg border-2 md:mt-3 px-4 py-2 placeholder-gray-600 border-[#dee2e6] outline-none mb-4"
          />
          <div className="md:mt-2 sm:flex sm:flex-row-reverse">
            <button onClick={OnEdit} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" disabled={loading}>
              {loading ? 'Saqlash...' : 'Saqlash'}
            </button>
            <button type="button" onClick={closeModal} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Bekor qilish
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default EditAlifbolar;
