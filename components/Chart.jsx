import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
  );
  
export const ChartBar = (props) => {
  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top"
      },
      title: {
        display: false,
        text: "Chart.js Bar Chart"
      }
    }
  };

  const labels = props.label;
  const data1 = props.data1;
  const data2 = props.data2;

  const data = {
    labels, // x軸のラベルの配列
    datasets: [
      {
        label: props.label[0], // 凡例
        data: data1,        // データの配列(labelsと要素数同じ)
        backgroundColor: ["rgba(53, 162, 235, 0.5)",
                          "rgba(255, 99, 132, 0.5)"] // グラフの棒の色
      },
      // {
      //   label: props.label[1],
      //   data: data2,
      //   backgroundColor: "rgba(255, 99, 132, 0.5)"
      // }
    ]
  };

  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
};
