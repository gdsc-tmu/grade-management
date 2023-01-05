import Link from "next/link";

export default function Card(props) {
  return (
    <div className="w-full mx-auto px-4 py-3 mb-3 bg-white rounded-md shadow-lg dark:bg-gray-800">

      <div className="flex items-center justify-between">
        <span className="text-sm font-light text-gray-800 dark:text-gray-400">{props.code}</span>
        <button onClick={() => props.deleteMethod(props.index)} className="bg-slate-500 hover:bg-slate-700 text-white py-1 px-4 rounded-lg">削除</button>
      </div>

      <div>
        <Link href={props.url}>
          <h1 className="mt-2 text-lg font-s emibold text-gray-800 dark:text-white">{props.name}</h1>
        </Link>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{props.teacher}</p>
      </div>

    </div>
  );
}