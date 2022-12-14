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
    // ToDo 重複・fetch errorの処理追加
    const moldedText = text.trim().toUpperCase();

    fetch("https://tmu-syllabus-default-rtdb.firebaseio.com/2022/"+ moldedText + ".json")
      .then((res) => {
        if (!res.ok){
          throw new Error('Network response was not OK');
        }
        return res.json()
      })
      .then((data) => {
        if (data === null) {
          throw new Error('Network response was not OK');
        }
        setClassesInfo([...classesInfo,data]);
        setClasses(classes => [...classes,moldedText]);
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