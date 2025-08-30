import { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";


Chart.register(...registerables);

export default function InstructorChart({ courses }) {
  const [currChart, setCurrChart] = useState("students");

 
const generateRandomColors = (numColors) => {
  const colors = [];
  const goldenRatio = 0.6180339887;
  let hue = Math.random() * 360;

  for (let i = 0; i < numColors; i++) {
    hue += goldenRatio * 360;
    hue %= 360;
    const saturation = 65 + Math.random() * 25;
    const lightness = 45 + Math.random() * 20; 
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
};



  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  };


  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div className="instructor-chart-container">
      <p className="instructor-chart-title">Visualize</p>
      <br />
      <div className="instructor-chart-buttons">
        <button
          onClick={() => setCurrChart("students")}
          className={`chart-btn ${
            currChart === "students" ? "active" : ""
          }`}
        >
          Students
        </button>
        <button
          onClick={() => setCurrChart("income")}
          className={`chart-btn ${
            currChart === "income" ? "active" : ""
          }`}
        >
          Income
        </button>
      </div>
      <br />
      <div className="instructor-chart-pie">
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  );
}
