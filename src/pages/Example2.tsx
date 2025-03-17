import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Example2 = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    await fetch(`${apiUrl}/users`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          data.forEach((item, index) => {
            item.department = item.department.replace(/_/g, " ");
            if (item.hair) {
              item.hair = Object.entries(item.hair).map(([color, count]) => ({
                [color]: count,
              }));
            }
          });
          console.log(`🚀 ~ data.forEach ~ data : `, data);
          setLoading(false);
          setDatas(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="grid grid-flow-row-dense auto-rows-auto gap-5">
      <div className="w-full h-full grid grid-flow-row-dense auto-rows-auto">
        <div className="w-full h-fit grid grid-flow-col-dense auto-cols-auto justify-between">
          <button
            className="ring-blue-400 ring-2 px-6 py-3 text-base text-blue-400 rounded-2xl hover:shadow-xl cursor-pointer hover:text-white hover:bg-blue-400"
            onClick={() => navigate("/example1")}>
            Example 1
          </button>
          <h1 className="text-left text-2xl font-semibold content-center text-zinc-900">
            2. Create data from API (OPTIONAL)
          </h1>
        </div>
      </div>
      <div className="w-full h-full">
        {loading && (
          <h1 className="text-3xl mt-10 font-bold">Loading Data . . .</h1>
        )}
        {!loading && (
          <div className="grid grid-flow-row-dense gap-5 w-full">
            {datas.map((res: any, index: number) => (
              <div
                key={index}
                className="justify-start grid grid-flow-row-dense auto-rows-auto w-full py-8 px-5 hover:shadow-xl hover:bg-linear-to-bl from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl">
                <h1 className="text-lg font-semibold text-left">
                  {res.department}
                </h1>
                <ul className="list-disc pl-6 text-left">
                  <li>Male : {res.data.male}</li>
                  <li>Female : {res.data.female}</li>
                  <li>Age rage : {res.data.ageRange}</li>
                  <li>
                    Hair :
                    <ul className="list-decimal list-inside">
                      {Object.entries(res.data.hair).map(
                        ([color, count], index2) => (
                          <li key={index2}>{`${color} : ${count}`}</li>
                        )
                      )}
                    </ul>
                  </li>
                  <li>
                    Users Address :
                    <ul className="list-decimal list-inside">
                      {Object.entries(res.data.addressUser).map(
                        ([name, value], index2) => (
                          <li key={index2}>{`${name} : ${value}`}</li>
                        )
                      )}
                    </ul>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Example2;
