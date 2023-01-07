import { useCallback, useEffect, useState } from "react";
import { ChartBar } from "./Chart";
import Card from "./Card";
import Header from "./Header";
import InputForm from "./InputForm";

export default function ClassBar() {
  const [text, setText] = useState("");
  const [classes, setClasses] = useState([]);
  const [year, setYear] = useState("2022");
  const [classesInfo, setClassesInfo] = useState([]);

  // 総単位数
  const [totalClassCredit, setTotalClassCredit] = useState(0);
  // 特別研究(M)Ⅰ~Ⅳ
  const reseachClassCode = ["T0231","T0232","T0233","T0234"];
  const [reseachClassCredit, setReseachClassCredit] = useState(0);
  // 研究プロジェクト演習
  const projectClassCode = ["T0004"];
  const [projectClassCredit, setprojectClassCredit] = useState(0);
  // 特論
  const specialClassCode = ["T0010","T0011","T0012","T0013","T0014"];
  const [specialClassCredit, setspecialClassCredit] = useState(0);
  // 所属学域科目
  const [majorClassCredit, setMajorClassCredit] = useState(0);
  

  const handleChange = useCallback(e => {
    setText(e.target.value);
  }, []);

  const fetchClassData = async() => {
    const formatText = text.trim().toUpperCase();

    if (classes.includes(formatText)){
      alert("既に登録された授業です！");
      setText("");
      return 0;
    }

    if (formatText==""){
      return 0;
    }

    const response = await fetch("https://tmu-syllabus-default-rtdb.firebaseio.com/2022/"+ formatText + ".json");

    const classDataJson = await response.json();

    if(!response.ok){
      throw new Error("無効な授業コードです！");
    }
    
    else if(classDataJson === null){
      setText("");
      throw new Error("無効な授業コードです！");
    }
    
    return classDataJson;
  };

  const handleClick2 = async() => {
    try{
      const classDataJson = await fetchClassData();

      setTotalClassCredit(prevNum => prevNum + Number(classDataJson.credit));

      if(reseachClassCode.includes(classDataJson.code)){
        setReseachClassCredit(prevNum => prevNum + Number(classDataJson.credit));
      }

      else if(projectClassCode.includes(classDataJson.code)){
        setprojectClassCredit(prebNum => prebNum + Number(classDataJson.credit));
      }

      else if(specialClassCode.includes(classDataJson.code)){
        setspecialClassCredit(prebNum => prebNum + Number(classDataJson.credit));
      }

      else if(classDataJson.type === "電子情報システム工学域"){
        setMajorClassCredit(prebNum => prebNum + Number(classDataJson.credit));
      }
      
      setClasses(classes => [text.trim().toUpperCase(),...classes]);
      setClassesInfo(classesInfo => [classDataJson,...classesInfo]);
      setText("");
    } 
    catch(error){
      alert(error);
    } 
    finally{
      console.log("fetch()終了")
    }
  }

  useEffect(()=>{
    console.log("in useEffect")
    console.log(classes);
    console.log(classesInfo);
    console.log(year);
    console.log(totalClassCredit);
  },[classesInfo]);

  const deleteClass = (idx) => {
    setClasses(classes.filter((_, index ) => index !== idx));
    
    setClassesInfo(classesInfo.filter((element, index ) => {
      if(index === idx){

        setTotalClassCredit(prevNum => prevNum - Number(element.credit));

        if(reseachClassCode.includes(element.code)){
          setReseachClassCredit(prevNum => prevNum - Number(element.credit));
        }
  
        else if(projectClassCode.includes(element.code)){
          setprojectClassCredit(prebNum => prebNum - Number(element.credit));
        }
  
        else if(specialClassCode.includes(element.code)){
          setspecialClassCredit(prebNum => prebNum - Number(element.credit));
        }
  
        else if(element.type === "電子情報システム工学域"){
          setMajorClassCredit(prebNum => prebNum - Number(element.credit));
        }
      }
      return index !== idx
    }));
  }

  return (
    <>
      <Header/>
      
      <div className="container mx-auto my-4 px-4">

        <div className="flex">

          <div className="w-1/3 mr-2 py-5 rounded-md bg-slate-100 flex-col items-center">

            <div className="w-9/12 mx-auto mb-3">
              <InputForm text={text} handleClick={handleClick2} handleChange={handleChange} setYear={setYear}/>
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
            <ChartBar label={["必要単位数","取得単位数"]} title={"総単位数"} data1={[30,totalClassCredit]}/>
            <ChartBar label={["必要単位数","取得単位数"]} title={"ゼミ"} data1={[8,reseachClassCredit]}/>
            <ChartBar label={["必要単位数","取得単位数"]} title={"研究プロジェクト"} data1={[2, projectClassCredit]}/>
            <ChartBar label={["必要単位数","取得単位数"]} title={"所属学域科目"} data1={[12,majorClassCredit+Math.min(4,specialClassCredit)]}/>
          </div>

        </div>

      </div>
    </>
  );
}