import { useCallback, useEffect, useState } from "react";
import { ChartBar } from "./Chart";
import Card from "./Card";
import Header from "./Header";
import InputForm from "./InputForm";

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
      
      <div className="container mx-auto my-4 px-4">

        <div className="flex">
          <div className="w-1/3 mr-2 py-5 rounded-md bg-slate-100 flex-col items-center">

            <div className="w-9/12 mx-auto mb-3">
              <InputForm text={text} handleClick={handleClick} handleChange={handleChange}/>
            </div>

            <div className="w-10/12 mx-auto">
              {classesInfo.map((classinfo,index) => {
                return (
                  <Card 
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
            </div>
          </div>
          
          <div className="w-2/3">
            <ChartBar label={["取得単位数","必要単位数"]} data1={[20,12]} data2={[28,28]}/>
            <ChartBar label={["取得単位数","必要単位数"]} data1={[15,12]} data2={[28,28]}/>
            <ChartBar label={["取得単位数","必要単位数"]} data1={[20,12]} data2={[28,28]}/>
          </div>

        </div>
      </div>
    </>
  );
}