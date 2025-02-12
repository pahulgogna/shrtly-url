import { Line } from 'react-chartjs-2';

// Import required Chart.js modules
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useMemo } from 'react';

// Register the Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({xValues, yValues, className} : {xValues: string[], yValues: number[], className?: string}) => {

    const yUpperBound = useMemo(() => {
        const maxV = Math.max(...yValues)
        return Math.max(Math.round(maxV + maxV*.25), 5)

    }, [yValues])


    const data = {
        labels: xValues,
        datasets: [
        {
            label: 'Clicks',
            data: yValues,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
        ],
        };

    const options = {
            responsive: true,
            plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: true,
                text: 'Clicks data over time',
            }
            },
            scales: {
            y: {
                min: 0,
                max: yUpperBound,
                ticks: {
                    stepSize: 1,
                    },
                }
            }
        }

    return (
        <div className="flex w-full h-full justify-center">
            <Line data={data} options={options} className={className}/>
        </div>
    )
};

export default Chart;
