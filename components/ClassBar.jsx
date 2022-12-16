import { useCallback, useEffect, useState } from "react";
import Card from "./Card";
import { ChartBar } from "./Chart";
import Class from "./Class";
import Example from "./Example";
import Header from "./Header";

export default function ClassBar() {
  const [text, setText] = useState("");
  const [classes, setClasses] = useState([]);
  const [classesInfo, setClassesInfo] = useState([]);
  const [classGroup, setClassGroup] = useState({});
  

  const handleChange = useCallback(e => {
    setText(e.target.value);
  }, []);

  const handleClick = () => {
    // ToDo 選択した年度のデータの取得・処理
    const moldedText = text.trim().toUpperCase();

    if (classes.includes(moldedText)){
      alert("既に登録された授業です！");
      setText("");
      return 0;
    }

    if (moldedText==""){
      return 0;
    }

    fetch("https://tmu-syllabus-default-rtdb.firebaseio.com/2022/"+ moldedText + ".json")
      .then((res) => {
        if (!res.ok){
          throw new Error("無効な授業コードです！");
        }
        return res.json();
      })
      .then((data) => {
        if (data === null) {
          setText("");
          throw new Error("無効な授業コードです！");
        }
        setClassesInfo(classesInfo => [data,...classesInfo]);
        setClasses(classes => [moldedText,...classes]);
        setText("");
      })
      .catch((error) => alert(error));
  };

  useEffect(()=>{
    // ToDo グラフ表示用にclassInfoを集計してclassGroupに代入 → グラフコンポーネントにデータを渡す
    // bebug
    console.log("in useEffect")
    console.log(classes);
    console.log(classesInfo);
  },[classesInfo]);

  const deleteClass = (idx) => {
    setClasses(classes.filter((_, index ) => index !== idx));
    setClassesInfo(classesInfo.filter((_, index ) => index !== idx));
  }

  return (
    <>
      <Header/>
      <Card/>
      <div className="container mx-auto my-4 px-4">
        <div className="w-80 mx-auto">
          <label htmlFor="code" className="block text-md font-medium text-gray-800">
            授業コード
          </label>
          <div className="flex items-center">
            <div className="relative mt-1 rounded-md shadow-sm">
              <input type="text" value={text} onChange={handleChange} name="code" id="code" className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="A0000"/>
              <div className="absolute inset-y-0 right-0 flex items-center">
                <label htmlFor="select-year" className="sr-only">
                  select-year
                </label>
                <select id="select-year" name="select-year" className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                  <option>2022</option>
                  <option>2021</option>
                </select>
              </div>
            </div>
            <button onClick={handleClick} className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 ml-2 rounded-lg">決定</button>
          </div>
        </div>

        <div>{classes}</div>

        {classesInfo.map((classinfo,index) => {
          return (
            <Class 
              key={classinfo.code} 
              name={classinfo.name} 
              code={classinfo.code} 
              url={classinfo.url} 
              teacher={classinfo.teacher} 
              type={classinfo.type} 
              credit={classinfo.credit} 
              year={classinfo.year} 
              term={classinfo.term} 
              day={classinfo.day} 
              period={classinfo.period} 
              deleteMethod={deleteClass} 
              index={index} 
              />
          );
        })}
        <ChartBar label={["取得単位数","必要単位数"]} data1={[20,12]} data2={[28,28]}/>
        <ChartBar label={["取得単位数","必要単位数"]} data1={[20,12]} data2={[28,28]}/>
        <ChartBar label={["取得単位数","必要単位数"]} data1={[20,12]} data2={[28,28]}/>
      </div>
    </>
  );
}