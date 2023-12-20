import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pdf from '../../../assets/pdf.png';

const Ebooks = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("e-books/");
      const data = response.data;
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let savePDF = (url) => {
    axios({
      url: url, //your url
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      // create file link in browser's memory
      const href = URL.createObjectURL(response.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', 'file.pdf'); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  };

  return (
    <div className='flex flex-wrap justify-center'>
      {data && data.length > 0 ? (
        data.map((category) => (
          <div key={category.id} className="m-4 w-64 rounded-lg overflow-hidden border border-gray-300 shadow-md">
            <img src={pdf} alt="" className="w-full h-56 object-cover" />
            <div className="p-4">
              <div className="text-xl font-bold mb-2">{category.category.title}</div>
              <h1 className="text-lg font-semibold mb-2">{category.title}</h1>
              <div className='flex items-center gap-4 mb-2'>
                <span className="whitespace-nowrap px-2 py-1 bg-gray-200 rounded-md">{category.size} MB</span>
                <a href={category.file} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  Onlayn ko'rish
                </a>
              </div>
              <a
                // download
                // href={category.file}
                className="text-blue-500 hover:underline"
                onClick={() => savePDF(category.file)}
              >
                Download PDF
              </a>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">
          <p className="text-xl font-semibold">No data available</p>
        </div>
      )}
    </div>
  );
};

export default Ebooks;
