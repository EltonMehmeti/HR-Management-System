import {
    Card,
    CardBody,
  } from "@material-tailwind/react";
  import Chart from "react-apexcharts";
  
  const SalaryChart = ({ salaries }) => {
    const chartConfig = {
      type: "line",
      height: 240,
      series: [
        {
          name: "Salary",
          data: salaries.map((salary) => salary.amount),
        },
      ],
      options: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        title: {
          show: "",
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#020617"],
        stroke: {
          lineCap: "round",
          curve: "smooth",
        },
        markers: {
          size: 0,
        },
        xaxis: {
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          labels: {
            style: {
              colors: "#616161",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
          categories: salaries.map((salary) => new Date(salary.transactionDate).toLocaleDateString()),
        },
        yaxis: {
          labels: {
            style: {
              colors: "#616161",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
        },
        grid: {
          show: true,
          borderColor: "#dddddd",
          strokeDashArray: 5,
          xaxis: {
            lines: {
              show: true,
            },
          },
          padding: {
            top: 5,
            right: 20,
          },
        },
        fill: {
          opacity: 0.8,
        },
        tooltip: {
          theme: "dark",
        },
      },
    };
  
    return (
      <Card>

        <CardBody className="px-2 pb-0">
          <Chart {...chartConfig} />
        </CardBody>
      </Card>
    );
  };
  
  export default SalaryChart;
  