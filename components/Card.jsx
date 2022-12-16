export default function Card() {
  return (
    <div className="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <span className="text-sm font-light text-gray-800 dark:text-gray-400">Courses and MOOCs</span>
        <span className="px-3 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full dark:bg-blue-300 dark:text-blue-900">psychology</span>
      </div>

      <div>
        <h1 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">AP® Psychology - Course 5: Health and Behavior</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio eligendi similique exercitationem optio libero vitae accusamus cupiditate laborum eos.</p>
      </div>
    </div>
  );
}