import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js";

function HomePage() {
  //initialize dataSource with static styling, but empty data
  const [dataSource, setDataSource] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "rgba(255, 206, 86, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(239, 148, 0, 0.7)",
          "rgba(198, 0, 33, 0.7)",
          "rgba(72, 174, 49, 0.7)",
          "rgba(108, 49, 174, 0.7)",
        ],
        borderColor: ["rgba(255, 206, 86, 1)", "rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(239, 148, 0, 1)", "rgba(198, 0, 33, 1)", "rgba(72, 174, 49, 1)", "rgba(108, 49, 174, 1)"],
        borderWidth: 1,
      },
    ],
  });

  // draws doughnut chart using Chart.js
  const createChart = () => {
    console.log("2");
    let ctx = document.getElementById("myChart").getContext("2d");
    /* eslint-disable no-unused-vars */
    let myDoughnutChart = new Chart(ctx, {
      type: "doughnut",
      data: dataSource,
    });
  };

  useEffect(() => {
    // fetch data from server
    const fetchData = async () => {
      const res = await axios("http://localhost:5000/budget");
      var copyDataState = Object.assign({}, dataSource);
      for (let i = 0; i < res.data.myBudget.length; i++) {
        copyDataState.labels[i] = res.data.myBudget[i].title;
        copyDataState.datasets[0].data[i] = res.data.myBudget[i].budget;
      }
      setDataSource(copyDataState);
    };

    // asyncornnous method so that data is fetched before chart is drawn
    async function run() {
      await fetchData();
      createChart();
    }
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container center" role="main">
      <div className="page-area">
        <section className="text-box">
          <h1>Stay on track</h1>
          <p>
            Do you know where you are spending your money? If you really stop to track it down, you would get surprised! Proper budget management depends on real data... and this app will help you
            with that!
          </p>
        </section>
        <section className="text-box">
          <h1>Alerts</h1>
          <p>What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.</p>
        </section>
        <section className="text-box">
          <h1>Results</h1>
          <p>
            People who stick to a financial plan, budgeting every expense, get out of debt faster! Also, they to live happier lives... since they expend without guilt or fear... because they know it
            is all good and accounted for.
          </p>
        </section>
        <section className="text-box">
          <h1>Free</h1>
          <p>This app is free!!! And you are the only one holding your data!</p>
        </section>
        <section className="text-box">
          <h1>Stay on track</h1>
          <p>
            Do you know where you are spending your money? If you really stop to track it down, you would get surprised! Proper budget management depends on real data... and this app will help you
            with that!
          </p>
        </section>
        <section className="text-box">
          <h1>Alerts</h1>
          <p>What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.</p>
        </section>
        <section className="text-box">
          <h1>Results</h1>
          <p>
            People who stick to a financial plan, budgeting every expense, get out of debt faster! Also, they to live happier lives... since they expend without guilt or fear... because they know it
            is all good and accounted for.
          </p>
        </section>
        <section className="text-box">
          <h1>My Chart</h1>
          <p>
            <canvas id="myChart" width="400" height="400"></canvas>
          </p>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
