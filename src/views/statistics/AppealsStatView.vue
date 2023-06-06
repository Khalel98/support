<template>
  <div class="section__header">
    <div class="section__header__title">Статистика обращений</div>
  </div>
  <div>
    <div class="charts__title">Заявки за неделю</div>
    <apexchart
      type="bar"
      height="350"
      :options="appeal_chartOptions"
      :series="appeal_series"
    ></apexchart>
  </div>

  <div>
    <div class="charts__title">Статус заявок за месяц</div>
    <apexchart
      type="line"
      height="350"
      :options="month_chartOptions"
      :series="month_series"
    ></apexchart>
  </div>

  <div>
    <div class="charts__title">Статистика категорий</div>
    <apexchart
      type="donut"
      height="350"
      width="600"
      :options="pie_chartOptions"
      :series="pie_series"
    ></apexchart>
  </div>

  <div>
    <div class="charts__title">
      По продолжительности завершенния одного запроса
    </div>
    <apexchart
      type="line"
      height="350"
      :options="time_chartOptions"
      :series="time_series"
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
      appeal_series: [
        {
          name: "Поступившие заявки",
          data: [44, 55, 57, 12, 75, 58, 63],
        },
        {
          name: "Обработанные заявки",
          data: [76, 85, 101, 22, 23, 105, 91],
        },
        {
          name: "Завершенные заявки",
          data: [35, 41, 36, 12, 43, 48, 52],
        },
      ],
      appeal_chartOptions: {
        xaxis: {
          categories: [
            this.getPreviousDay(6),
            this.getPreviousDay(5),
            this.getPreviousDay(4),
            this.getPreviousDay(3),
            this.getPreviousDay(2),
            this.getPreviousDay(1),
            this.getCurrentDay(),
          ],
        },
      },
      month_series: [
        {
          name: "Поступившие",
          data: [
            28, 29, 33, 36, 32, 32, 33, 3, 33, 34, 4, 3, 3, 3, 34, 12, 2, 28,
            29, 33, 36, 32, 32, 33, 3, 33, 34, 33, 34, 34,
          ],
        },
        {
          name: "Завершенные",
          data: [
            12, 11, 14, 18, 17, 13, 13, 12, 11, 14, 18, 17, 13, 13, 12, 11, 14,
            18, 17, 13, 13, 12, 11, 14, 18, 17, 13, 13, 17, 13,
          ],
        },
      ],
      month_chartOptions: {
        chart: {
          height: 350,
          type: "line",
        },
        colors: ["#77B6EA", "#545454"],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "smooth",
        },

        xaxis: {
          categories: [],
        },
        yaxis: {
          min: 0,
          max: 50,
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: -25,
          offsetX: -5,
        },
      },
      pie_series: [44, 55, 41, 17],
      pie_chartOptions: {
        chart: {
          type: "donut",
        },
        labels: ["Школа", "Колледж", "Дополнительное образование", "Smart"],
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
      time_series: [
        {
          name: "Минут",
          data: [10, 41, 35, 51, 49, 62, 69],
        },
      ],
      time_chartOptions: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },

        yaxis: {
          min: 0, // Minimum value for the y-axis
          max: 200, // Maximum value for the y-axis
          labels: {
            formatter: function (value) {
              return value.toFixed(0); // Customize the label formatting as needed
            },
          },
        },
        xaxis: {
          categories: [
            this.getPreviousDay(6),
            this.getPreviousDay(5),
            this.getPreviousDay(4),
            this.getPreviousDay(3),
            this.getPreviousDay(2),
            this.getPreviousDay(1),
            this.getCurrentDay(),
          ],
        },
      },
    };
  },
  mounted() {
    this.generateXAxisCategories();
  },
  methods: {
    getCurrentDay() {
      const date = new Date();
      const day = date.toLocaleString("default", { weekday: "short" });
      return day;
    },
    getPreviousDay(offset) {
      const date = new Date();
      date.setDate(date.getDate() - offset);
      const day = date.toLocaleString("default", { weekday: "short" });
      return day;
    },
    generateXAxisCategories() {
      const today = new Date();
      const xAxisCategories = [];

      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const formattedDate = date.toLocaleDateString();
        xAxisCategories.push(formattedDate);
      }

      this.month_chartOptions.xaxis.categories = xAxisCategories;
    },
  },
};
</script>

<style></style>
