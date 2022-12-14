import React, { useEffect, useState } from 'react';
import {
    Bar,
    BarChart,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid,
    PieChart,
    Pie,
    Legend,
  
} from "recharts";


const Analysis = () => {
    const [analysisData, setAnalysisData] = useState([])

    //data analysis hooks here ......................................
    useEffect(() => {
        fetch('https://serene-headland-23680.herokuapp.com/masterAnalysis')
            .then(res => res.json())
            // .then(data => setAnalysisData(data.slice(0,50))
            .then(data => {
                setAnalysisData(data.slice(0, 30))
            })
    }, [])

    return (
        <div>
            <h1 className='mt-5 font-bold text-center text-primary text-2xl'>Analysis</h1>

            <div className='grid lg:grid-cols-2 md:grid-cols-1 '>
                <div className='bg-base-100 m-2 rounded-2xl'>
                    <LineChart width={500} height={400} data={analysisData}>
                        <Line dataKey={"Invest"} stroke="#8884d8" />
                        <XAxis dataKey="Country" />
                        <YAxis />
                        <Tooltip></Tooltip>
                        <Legend />
                        <Bar dataKey="Invest" fill="#8884d8" />
                        <Line dataKey="Sales" fill="#82ca9d" />

                    </LineChart>
                </div>
                <div className='bg-base-100 m-2 rounded-2xl'>
                

                </div>

            </div>

            <div className='bg-base-100 m-2 rounded-2xl p-2 flex justify-center'>
                <BarChart
                    width={700}
                    height={400}
                    data={analysisData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="Gender" />
                    <XAxis dataKey="useTime" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Gender" fill="#8884d8" />
                    <Bar dataKey="useTime" fill="#82ca9d" />
                </BarChart>

            </div>

            <div className='grid lg:grid-cols-2 md:grid-cols-1'>
                <div className='bg-base-100 p-2 m-2 rounded-2xl'>
                    <h1 className='text-center fw-bold text-primary'>PieChart</h1>
                    <PieChart width={400} height={400}>
                        <Pie data={analysisData} dataKey="year" cx="50%" cy="50%" outerRadius={70} fill="#43EA46" />
                        <Pie data={analysisData} dataKey="Sector" cx="50%" cy="50%" innerRadius={60} outerRadius={90} fill="#8884d8" label />
                        <Tooltip />
                        <Legend />
                        <Line dataKey="year" fill="#8884d8" />
                        <Line dataKey="Sector" fill="#82ca9d" />
                    </PieChart>
                </div>
             
            </div>



        </div>
    );
};

export default Analysis;