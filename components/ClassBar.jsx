import { useCallback, useEffect, useState } from "react";
import Class from "./Class";

export default function() {
  const [text, setText] = useState("");
  const [classes, setClasses] = useState([]);
  const [classesInfo, setClassesInfo] = useState([]);
  const [classGroup, setClassGroup] = useState({});
  

  const handleChange = useCallback(e => {
    setText(e.target.value);
  }, []);

  const handleClick = () => {
    // ToDo 重複・空欄・英小文字・fetch errorの処理追加
    setClasses(classes => [...classes,text]);
    fetch("https://tmu-syllabus-default-rtdb.firebaseio.com/2022/"+ text + ".json")
      .then((res) => res.json())
      .then((data) => setClassesInfo([...classesInfo,data]));
    setText("");
  };

  useEffect(()=>{
    // ToDo グラフ表示用にclassInfoを集計してclassGroupに代入 → グラフコンポーネントにデータを渡す
    console.log("in useEffect")
  },[classesInfo]);

  const deleteClass = (idx) => {
    setClasses(classes.filter((_, index ) => index !== idx));
    setClassesInfo(classesInfo.filter((_, index ) => index !== idx));
  }

  return (
    <div>
      <label htmlFor="code">授業コード : </label>
      <input type="text" value={text} id="code" name="code" onChange={handleChange}></input>
      <button onClick={handleClick}>決定</button>

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

    </div>
  );
}