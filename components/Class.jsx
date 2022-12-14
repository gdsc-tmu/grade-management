import Link from "next/link";


export default function Class(props) {
  return (

    <div>
      <Link href={props.url}>
        {props.name}
      </Link>
      <div>{props.code}</div>
      <div>{props.teacher}</div>
      <div>{props.type}</div>
      <div>{props.credit}</div>
      <div>{props.year}</div>
      <div>{props.term}</div>
      <div>{props.day}</div>
      <div>{props.period}</div>
      <button onClick={() => props.deleteMethod(props.index)}>削除</button>
    </div>
  );
}