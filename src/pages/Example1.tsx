import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Example1 = () => {
  const navigate = useNavigate();

  const [fruits, setFruits] = useState<unknown>([]);
  const [vegetables, setVegetables] = useState<unknown>([]);
  const [list, setList] = useState<unknown>([]);
  const [timer, setTimer] = useState<number>(5);

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

  const handleSelected = (item) => {
    setList((prev) => prev.filter((res) => res.name !== item.name));

    if (item.type === "Fruit") {
      setFruits((prev) => [...prev, item]);
    } else {
      setVegetables((prev) => [...prev, item]);
    }
  };

  const handleMoveBack = (item) => {
    setList((prev) => [...prev, item]);

    if (item.type === "Fruit") {
      setFruits((prev) => prev.filter((res) => res.name !== item.name));
    } else {
      setVegetables((prev) => prev.filter((res) => res.name !== item.name));
    }
  };

  useEffect(() => {
    setList(datas.current);
  }, []);

  useEffect(() => {
    setTimer(5);
    if (fruits.length > 0 || vegetables.length > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        setList(datas.current);
        setFruits([]);
        setVegetables([]);
        clearInterval(interval);
      }, 5000);

      return () => {
        clearTimeout(timeout);
        clearInterval(interval);
      };
    }
  }, [fruits, vegetables]);

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
          {list.map((item, index) => (
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
            {fruits.map((item, index) => (
              <button
                key={index}
                className="border-2 border-gray-300 rounded-xl p-3 hover:bg-blue-300/40 hover:text-blue-600 hover:drop-shadow-lg hover:font-semibold cursor-pointer active:bg-blue-300 active:text-white active:border-blue-300"
                onClick={() => handleMoveBack(item)}>
                <p className="text-base">{item.name}</p>
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-flow-row-dense auto-rows-min border-2 border-gray-300 rounded-xl h-full">
          <div className="bg-gray-200 rounded-t-[10px]">
            <h1 className="text-xl p-3 font-semibold">Vegetable</h1>
          </div>
          <div className="grid grid-flow-row-dense auto-rows-auto gap-4 p-4">
            {vegetables.map((item, index) => (
              <button
                key={index}
                className="border-2 border-gray-300 rounded-xl p-3 hover:bg-blue-300/40 hover:text-blue-600 hover:drop-shadow-lg hover:font-semibold cursor-pointer active:bg-blue-300 active:text-white active:border-blue-300"
                onClick={() => handleMoveBack(item)}>
                <p className="text-base">{item.name}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
      {(fruits.length > 0 || vegetables.length > 0) && (
        <div className="absolute bottom-5 right-5">
          <p className="text-xl">
            Timer :
            <span className="transition duration-700 ease-in-out animate-pulse font-semibold text-red-500 px-2">
              {timer}
            </span>
            second
          </p>
        </div>
      )}
    </div>
  );
};

export default Example1;
