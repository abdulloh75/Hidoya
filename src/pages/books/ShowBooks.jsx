import React from 'react';
import { Modal, } from 'antd';

const ShowBooks = ({ setOpen, open }) => {
  return (
    <>
      <div className='md:text-medium flex items-center justify-center'>
        <Modal
          open={open.isOpen}
          title="Kitobni ko'rish"
          height={700}
          width={500}
          destroyOnClose
          onCancel={() => setOpen({ isOpen: false, data: null })}
        >
          <table className="min-w-full text-left text-sm font-light overflow-x-auto">
            <thead className="">
              <tr>
                <th className="px-3 py-2 font-medium">Sarlavha</th>
                <td className="px-3 py-2 truncate max-w-[160px]">{open?.data?.title}</td>
              </tr>
              <tr>
                <th className="px-3 py-2 font-medium">Tavsif</th>
                <td className="px-3 py-2 truncate max-w-[100px]">{open?.data?.description}</td>
              </tr>
              <tr>
                <th className="px-3 py-2 font-medium">Muallif</th>
                <td className="px-3 py-2 truncate max-w-[80px]">{open?.data?.author}</td>
              </tr>
              <tr>
                <th className="px-3 py-2 font-medium">Nashr</th>
                <td className="px-3 py-2 truncate max-w-[80px]">{open?.data?.publication}</td>
              </tr>
              <tr>
                <th className="px-3 py-2 font-medium">Nashr vaqti</th>
                <td className="px-3 py-2 truncate max-w-[160px]">{open?.data?.publication_date}</td>
              </tr>
              <tr>
                <th className="px-3 py-2 font-medium">Miqdori</th>
                <td className="px-3 py-2 truncate max-w-[160px]">{open?.data?.amount}</td>
              </tr>
              <tr>
                <th className="px-3 py-2 font-medium">Raqam (inv)</th>
                <td className="px-3 py-2 truncate max-w-[160px]">{open?.data?.number_inv}</td>
              </tr>
              <tr>
                <th className="px-3 py-2 font-medium">Raqam (ISBN)</th>
                <td className="px-3 py-2 truncate max-w-[160px]">{open?.data?.number_isbn}</td>
              </tr>
              <tr>
                <th className="px-3 py-2 font-medium">Narxi</th>
                <td className="px-3 py-2 truncate max-w-[160px]">{open?.data?.price}</td>
              </tr>
              <tr>
                <th className="px-3 py-2 font-medium">Manzili</th>
                <td className="px-3 py-2 truncate max-w-[160px]">{open?.data?.location_book}</td>
              </tr>
              <tr>
                <th className="px-3 py-2 font-medium">Kategoriya</th>
                <td className="px-3 py-2 truncate max-w-[160px]">{open?.data?.category.title}</td>
              </tr>
              <tr>
                <th className="px-3 py-2 font-medium">Alifbo</th>
                <td className="px-3 py-2 truncate max-w-[160px]">{open?.data?.alphabet.title}</td>
              </tr>
              <tr>
                <th className="px-3 py-2 font-medium">Til</th>
                <td className="px-3 py-2 truncate max-w-[160px]">
                  <p className="text-ellipsis overflow-hidden">{open?.data?.language.title}</p>
                </td>
              </tr>
            </thead>
          </table>
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

export default ShowBooks;