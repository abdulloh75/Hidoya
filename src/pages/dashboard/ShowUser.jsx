import React from 'react';
import { Modal, } from 'antd';

const ShowLanguages = ({ setOpen, open }) => {
  return (
    <>
      <div>
        <Modal
          open={open.isOpen}
          title="Foydalanuvchini ko'rish"
          height={500}
          width={450}
          destroyOnClose
          onCancel={() => setOpen({ isOpen: false, data: null })}
        >
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Foydalanuvchi haqida</h2>
            <table className="min-w-full text-left text-sm font-light mb-8">
              <tbody>
                <tr>
                  <th className="py-2 pr-4">Ismi</th>
                  <td className="py-2 font-medium">{open?.data?.first_name}</td>
                </tr>
                <tr>
                  <th className="py-2 pr-4">Familiyasi</th>
                  <td className="py-2">{open?.data?.last_name}</td>
                </tr>
                <tr>
                  <th className="py-2 pr-4">Sharif</th>
                  <td className="py-2">{open?.data?.middle_name}</td>
                </tr>
                <tr>
                  <th className="py-2 pr-4">Kurs</th>
                  <td className="py-2">{open?.data?.course?.title}</td>
                </tr>
                <tr>
                  <th className="py-2 pr-4">Guruh</th>
                  <td className="py-2">{open?.data?.group?.title}</td>
                </tr>
                <tr>
                  <th className="py-2 pr-4">Manzil</th>
                  <td className="py-2">{open?.data?.address}</td>
                </tr>
                <tr>
                  <th className="py-2 pr-4">Lavozim</th>
                  <td className="py-2">{open?.data?.user_type}</td>
                </tr>
                <tr>
                  <th className="py-2 pr-4">Foydalanuvchining buyurtmalari</th>
                  <td className="py-2">{open?.data?.user_orders}</td>
                </tr>
              </tbody>
            </table>
            <div className="flex gap-5 md:mt-5">
              <button
                onClick={() => setOpen({ isOpen: false, data: null })}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-blue-500 shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white sm:mt-0 sm:ml-0 sm:w-auto sm:text-sm"
              >
                <span>Bekor qilish</span>
              </button>
            </div>
          </div>
        </Modal>
     </div>

    </>
  );
}

export default ShowLanguages;