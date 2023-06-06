<template>
  <div class="section__header">
    <div class="section__header__title">Статистика пользователей</div>
  </div>
  <div>
    <div class="charts__title">Общее количество пользователей</div>
    <apexchart
      type="donut"
      height="350"
      width="500"
      :options="pie_chartOptions"
      :series="pie_series"
    ></apexchart>
  </div>
  <div>
    <div class="charts__title">Статистика категорий по месяцам</div>
    <apexchart
      type="bar"
      height="350"
      :options="month_chartOptions"
      :series="month_series"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      month_series: [
        {
          name: "Запросы по категориям",
          data: [44, 55, 57, 56, 61, 58],
        },
        {
          name: "Число пользователей",
          data: [35, 41, 36, 26, 45, 48],
        },
      ],
      month_chartOptions: {
        xaxis: {
          categories: [
            this.getPreviousMonth(5),
            this.getPreviousMonth(4),
            this.getPreviousMonth(3),
            this.getPreviousMonth(2),
            this.getPreviousMonth(1),
            this.getCurrentMonth(),
          ],
        },
      },
      pie_series: [44, 55, 41, 17],
      pie_chartOptions: {
        chart: {
          type: "donut",
        },
        labels: [
          "Не зарегистрированные",
          "Родители",
          "Пользователи колледжа",
          "Другие пользователи",
        ],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },
  methods: {
    getCurrentMonth() {
      const date = new Date();
      const month = date.toLocaleString("default", { month: "short" });
      return month;
    },
    getPreviousMonth(offset) {
      const date = new Date();
      date.setMonth(date.getMonth() - offset);
      const month = date.toLocaleString("default", { month: "short" });
      return month;
    },
  },
};
</script>

<style></style>
