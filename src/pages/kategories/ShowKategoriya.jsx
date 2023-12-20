import React from 'react';
import { Modal, } from 'antd';

const ShowKategoriya = ({ setOpen, open }) => {
  return (
    <>
      <div>
        <Modal
          open={open.isOpen}
          title="Kategoriyani ko'rish"
          height={500}
          width={500}
          destroyOnClose
          onCancel={() => setOpen({ isOpen: false, data: null })}
        >
          <div
            className="w-[310px] mt-3 rounded-lg md:flex md:mt-5 md:w-[27rem] items-center justify-evenly border-2 border-[#dee2e6] p-2"
            key={open?.data?.id}
          >
            <span className="md:w-full font-medium text-gray-700">
              {open?.data?.title}
            </span>
          </div>
          <div className="flex gap-5 md:mt-5">
            <button
              onClick={() => setOpen({ isOpen: false, data: null })}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-blue-500 shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white sm:mt-0 sm:ml-0 sm:w-auto sm:text-sm"
            >
              <span>Bekor qilish</span>
            </button>
          </div>
        </Modal>
     </div>

    </>
  );
}

export default ShowKategoriya;