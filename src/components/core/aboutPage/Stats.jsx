import React from "react";


const stats = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

const StatsComponent = () => {
  return (
    <div className="stats-wrapper">
      <div className="statscontainer">
        <div className="stats-grid">
          {stats.map((item, index) => (
            <div className="stat-box" key={index}>
              <h1 className="stat-count">{item.count}</h1>
              <p className="stat-label">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsComponent;
