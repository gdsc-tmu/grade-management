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
        display: true,
        text: props.title
      }
    }
  };

  const labels = props.label;
  const data1 = props.data1;
  const bgColor1 = ((props.data1[0] <= props.data1[1]) ? "rgba(75, 192, 192, 0.5)" : "rgba(255, 99, 132, 0.5)");
  const bgColor2 = ((props.data1[0] <= props.data1[1]) ? "rgba(75, 192, 192, 0.5)" : "rgba(53, 162, 235, 0.5)");
  const borderColor1 = ((props.data1[0] <= props.data1[1]) ? "rgba(75, 192, 192, 1)" : "rgba(255, 99, 132, 1)");
  const borderColor2 = ((props.data1[0] <= props.data1[1]) ? "rgba(75, 192, 192, 1)" : "rgba(53, 162, 235, 1)");

  const data = {
    labels, // x軸のラベルの配列
    datasets: [
      {
        label: props.label[0], // 凡例
        data: data1,        // データの配列(labelsと要素数同じ)
        backgroundColor: [bgColor1,
                          bgColor2], // グラフの棒の色
        borderColor: [borderColor1,
                      borderColor2], // グラフの棒の色
        borderWidth: 2 // 枠線の太さ
      },
    ]
  };

  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
};
