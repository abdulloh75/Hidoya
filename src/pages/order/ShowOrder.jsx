import React from 'react';
import { Modal, } from 'antd';

const ShowOrder = ({ setOpen, open }) => {
  return (
    <>
      <div>
        <Modal
          title="Buyurutmani ko'rish"
          open={open.isOpen}
          destroyOnClose
          onCancel={() => setOpen({ isOpen: false, data: null })}
          height={500}
          width={400}
        >
          <div className="p-8">
            <h2 className="text-xl font-bold mb-4">Foydalanuvchi tafsilotlari</h2>
            <table className="min-w-full text-left text-sm font-light mb-6">
              <tbody>
                <tr>
                  <th className="py-2 pr-4">Id</th>
                  <td className="py-2 font-medium">{open?.data?.id}</td>
                </tr>
                <tr>
                  <th className="py-2 pr-4">Status</th>
                  <td className={`py-2 ${open?.data?.status === 'topshirilgan' ? 'text-green-500' : 'text-red-500'}`}>
                    {open?.data?.status}
                  </td>
                </tr>
                <tr>
                  <th className="py-2 pr-4">Ismi</th>
                  <td className="py-2">{open?.data?.user.first_name}</td>
                </tr>
                <tr>
                  <th className="py-2 pr-4">Familiyasi</th>
                  <td className="py-2">{open?.data?.user.last_name}</td>
                </tr>
                <tr>
                  <th className="py-2 pr-4">Sharifi</th>
                  <td className="py-2">{open?.data?.user.middle_name}</td>
                </tr>
                <tr>
                  <th className="py-2 pr-4">Kurs</th>
                  <td className="py-2">{open?.data?.user.course}</td>
                </tr>
                <tr>
                  <th className="py-2 pr-4">Lavozim</th>
                  <td className="py-2">{open?.data?.user.user_type}</td>
                </tr>
                <tr>
                  <th className="py-2 pr-4">Kitoblar</th>
                  <td className="py-2">
                    {Array.isArray(open?.data?.books) && open.data.books.length > 0 ? (
                      open.data.books.map((book, index) => (
                        <span key={book.id}>
                          {index > 0 && <span className="mx-1">, </span>}
                          {book.title}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">Malumot yo'q</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="w-32 h-10 border border-blue-400 bg-blue-500 text-white text-lg rounded-lg"
              >
                Bekor qilish
              </button>
            </div>
          </div>
        </Modal>
     </div>

    </>
  );
}

export default ShowOrder;