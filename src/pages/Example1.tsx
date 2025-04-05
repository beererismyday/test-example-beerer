/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Example1 = () => {
  const navigate = useNavigate();

  const [fruits, setFruits] = useState<any>([]);
  const [vegetables, setVegetables] = useState<any>([]);
  const [list, setList] = useState<any>([]);

  const datas = useRef([
    {
      type: "Fruit",
      name: "Apple",
    },
    {
      type: "Vegetable",
      name: "Broccoli",
    },
    {
      type: "Vegetable",
      name: "Mushroom",
    },
    {
      type: "Fruit",
      name: "Banana",
    },
    {
      type: "Vegetable",
      name: "Tomato",
    },
    {
      type: "Fruit",
      name: "Orange",
    },
    {
      type: "Fruit",
      name: "Mango",
    },
    {
      type: "Fruit",
      name: "Pineapple",
    },
    {
      type: "Vegetable",
      name: "Cucumber",
    },
    {
      type: "Fruit",
      name: "Watermelon",
    },
    {
      type: "Vegetable",
      name: "Carrot",
    },
  ]);

  const handleSelected = (item: any) => {
    setList((prev: any) => prev.filter((res: any) => res.name !== item?.name));

    if (item.type === "Fruit") {
      setFruits((prev: any) => [...prev, { ...item, countdown: 5 }]);
    } else {
      setVegetables((prev: any) => [...prev, { ...item, countdown: 5 }]);
    }
  };

  const handleMoveBack = (item: any) => {
    setList((prev: any) => [...prev, item]);
    
    if (item.type === "Fruit") {
      setFruits((prev: any) =>
        prev.filter((res: any) => res.name !== item.name)
      );
    } else {
      setVegetables((prev: any) =>
        prev.filter((res: any) => res.name !== item.name)
      );
    }
  };

  useEffect(() => {
    setList(datas.current);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setFruits((prev: any) => {
        const itemsToReturn = prev.filter((item: any) => item.countdown === 1);
        if (itemsToReturn.length > 0) {
          setList((prevList: any) => {
            const filteredItems = itemsToReturn.filter(
              (item: any) =>
                !prevList.some((listItem: any) => listItem.name === item.name)
            );
            return [...prevList, ...filteredItems];
          });
        }
        return prev
          .map((item: any) => ({ ...item, countdown: item.countdown - 1 }))
          .filter((item: any) => item.countdown > 0);
      });

      setVegetables((prev: any) => {
        const itemsToReturn = prev.filter((item: any) => item.countdown === 1);
        if (itemsToReturn.length > 0) {
          setList((prevList: any) => {
            const filteredItems = itemsToReturn.filter(
              (item: any) =>
                !prevList.some((listItem: any) => listItem.name === item.name)
            );
            return [...prevList, ...filteredItems];
          });
        }
        return prev
          .map((item: any) => ({ ...item, countdown: item.countdown - 1 }))
          .filter((item: any) => item.countdown > 0);
      });
    }, 1000);

    return () => clearInterval(timer);
  });

  return (
    <div className="grid grid-flow-row-dense auto-rows-auto gap-5">
      <div className="w-full h-full grid grid-flow-row-dense auto-rows-auto">
        <div className="w-full h-fit grid grid-flow-col-dense auto-cols-auto justify-between">
          <h1 className="text-left text-2xl font-semibold content-center text-zinc-900">
            1. Auto Delete Todo List
          </h1>
          <button
            className="ring-blue-400 ring-2 px-6 py-3 text-base text-blue-400 rounded-2xl hover:shadow-xl cursor-pointer hover:text-white hover:bg-blue-400"
            onClick={() => navigate("/example2")}>
            Example 2
          </button>
        </div>
      </div>
      <div className="w-full grid grid-flow-col-dense grid-cols-3 gap-5 h-full">
        <div className="grid grid-flow-row-dense auto-rows-min gap-3.5">
          {list.map((item: any, index: number) => (
            <button
              className="border-2 border-gray-300 rounded-xl p-3 hover:bg-blue-300/40 hover:text-blue-600 hover:drop-shadow-lg hover:font-semibold cursor-pointer active:bg-blue-300 active:text-white active:border-blue-300"
              key={index}
              onClick={() => handleSelected(item)}>
              <p className="text-base">{item?.name}</p>
            </button>
          ))}
        </div>
        <div className="grid grid-flow-row-dense auto-rows-min border-2 border-gray-300 rounded-xl h-full">
          <div className="bg-gray-200 rounded-t-[10px] border-b-2 border-gray-300">
            <h1 className="text-xl p-3 font-semibold">Fruit</h1>
          </div>
          <div className="grid grid-flow-row-dense auto-rows-auto gap-4 p-4">
            {fruits.map((item: any, index: number) => (
              <button
                key={index}
                className="border-2 border-gray-300 rounded-xl p-3 hover:bg-blue-300/40 hover:text-blue-600 hover:drop-shadow-lg hover:font-semibold cursor-pointer active:bg-blue-300 active:text-white active:border-blue-300"
                onClick={() => handleMoveBack(item)}>
                <p
                  className={
                    "text-base" +
                    (item.countdown <= 2
                      ? " text-red-400 transform animate-pulse duration-75 ease-in-out"
                      : "")
                  }>
                  {item.name}
                </p>
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-flow-row-dense auto-rows-min border-2 border-gray-300 rounded-xl h-full">
          <div className="bg-gray-200 rounded-t-[10px]">
            <h1 className="text-xl p-3 font-semibold">Vegetable</h1>
          </div>
          <div className="grid grid-flow-row-dense auto-rows-auto gap-4 p-4">
            {vegetables.map((item: any, index: number) => (
              <button
                key={index}
                className="border-2 border-gray-300 rounded-xl p-3 hover:bg-blue-300/40 hover:text-blue-600 hover:drop-shadow-lg hover:font-semibold cursor-pointer active:bg-blue-300 active:text-white active:border-blue-300"
                onClick={() => handleMoveBack(item)}>
                <p
                  className={
                    "text-base" +
                    (item.countdown <= 2
                      ? " text-red-400 transform animate-pulse duration-75 ease-in-out"
                      : "")
                  }>
                  {item.name}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Example1;
