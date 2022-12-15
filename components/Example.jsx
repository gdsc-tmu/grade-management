/*
  From: https://tailwindui.com/components/preview
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function Example() {
  return (
    <div className="w-80 mx-auto">
      <label htmlFor="code" className="block text-md font-medium text-gray-800">
        授業コード
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type="text"
          name="code"
          id="code"
          className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="A0000"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <label htmlFor="select-year" className="sr-only">
            select-year
          </label>
          <select
            id="select-year"
            name="select-year"
            className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option>2022</option>
            <option>2021</option>
          </select>
        </div>
      </div>
    </div>
  )
}
