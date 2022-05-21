const labels = [
  "21 January",
  "22 January",
  "23 January",
  "24 January",
  "25 January",
  "26 January",
];

const data_death = {
  labels: labels,
  datasets: [
    {
      label: "Deaths",
      backgroundColor: "rgb(217, 83, 79)",
      borderColor: "rgb(240, 173, 78)",
      data: [0, 10, 38, 41, 43, 46, 50],
    },
  ],
};

const config_death = {
  type: "line",
  data: data_death,
  options: {},
};

const death = new Chart(document.getElementById("deaths"), config_death);

const data_survival = {
  labels: labels,
  datasets: [
    {
      label: "Survival",
      backgroundColor: "rgb(92, 184, 92)",
      borderColor: "rgb(91, 192, 222)",
      data: [55, 50, 64, 46, 43, 41, 38, 20, 10],
    },
  ],
};

const config_survival = {
  type: "line",
  data: data_survival,
  options: {},
};

const survival = new Chart(
  document.getElementById("survival"),
  config_survival
);
