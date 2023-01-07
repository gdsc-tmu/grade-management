export default function InputForm(props) {
  return (
    <div>

      <label htmlFor="code" className="block text-md font-medium text-gray-800">
        授業コード
      </label>

      <div className="flex items-center justify-between mt-1">

        <div className="relative rounded-md shadow-sm">
          <input type="text" value={props.text} onChange={props.handleChange} name="code" id="code" className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="A0000"/>

          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="select-year" className="sr-only">
              select-year
            </label>
            <select onChange={e => props.setYear(e.target.value)} defaultValue="2022" id="select-year" name="select-year" className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <option value="2022">2022年度</option>
              <option value="2021">2021年度</option>
            </select>
          </div>
        </div>

        <button onClick={props.handleClick} className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 ml-2 rounded-lg">追加</button>

      </div>
    </div>
  );
}