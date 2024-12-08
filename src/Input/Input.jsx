import './Input.scss'
import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend

)


function Input() {

  const [weight, setWeight] = useState('');

  const [newEntry, setNewEntry] = useState({
    date: '',
    weight: '',
  });

  const [entries, setEntries] = useState([
    {date: '2024-11-05', weight: 120},
    {date: '2024-09-05', weight: 140},
    {date: '2024-02-05', weight: 150},
    {date: '2024-02-12', weight: 170},
  ])

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('entries'));
    if (savedEntries) {
      setEntries(savedEntries);
    }
  }, [])

  const handleWeightSubmit = (event) => {
      
    event.preventDefault();

    if (weight !== '') {
      const currentDate = new Date;
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();

      const formattedMonth = month < 10 ? '0' + month : month;
      const formattedDay = day < 10 ? '0' + day : day;

      const formattedDate = `${year}-${formattedMonth}-${formattedDay}`

      setNewEntry({
        date: formattedDate,
        weight: weight,
      })

      const updatedEntries = [
        ...entries.filter(entry => entry.date !== formattedDate),
        {date: formattedDate, weight: weight },
      ];

      setEntries(updatedEntries);
    
      setWeight('')

      localStorage.setItem('entries', JSON.stringify(updatedEntries))
    } 
  }

  useEffect(() => {
    document.title = weight + ' lbs';
  }, [weight])

  const data = {
    labels: entries.map(entry => entry.date),
    datasets: [
      {
        label: 'Weight over time',
        data: entries.map(entry => entry.weight),
        fill: false,
        borderColor: 'rgb(75, 197, 192)', // Line color
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRation: false,
    plugins: {
      legend: {
        position: 'bottom', // Position of the legend
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Days',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Weight',
        },
      },
    },
  };

  return(
    <div id="input-div">
      <h1>Enter a weight</h1>
      <form id="weight-form" onSubmit={(e) => handleWeightSubmit(e)}>

        <input 
         type="number" 
         value={weight}
         onChange={(e) => setWeight(e.target.value)}
        /><span>Lb</span><br/>

        <button type="submit">Add</button>
      </form>

      <h3>All weights</h3>
      <ul>
        {entries.map((entry, index) => (
          <li key={index}>Date: {entry.date} Weight: {entry.weight}</li>
        ))}
      </ul>

      <h3>Select a month</h3>

     <Line className='graph' data={data} options={options}/>

    </div>
  )

}

export default Input