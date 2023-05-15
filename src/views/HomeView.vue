<template>
  <div class="home">
    <div class="section__statistics">
      <div class="section__statistics__content">
        <div class="statistics__item">
          <div class="statistics__item__title">Статистика обращений</div>
          <div class="statistics__item__content">
            <div class="rectangle" style="background: #fb8500">
              <span>Запросы за все время</span>
              <p>1524</p>
            </div>
            <div class="rectangle" style="background: #00ca5d">
              <span>Завершенные запросы</span>
              <p>527</p>
            </div>
          </div>
        </div>
        <div class="statistics__item">
          <div class="statistics__item__title">Статистика по месяцам</div>
          <div
            class="statistics__item__content"
            style="display: inline; max-height: 300px"
          >
            <div>
              <apexchart
                ref="chart"
                :options="monthStat"
                :series="monthSeries"
                type="line"
                height="350"
                :dataLabels="monthLabels"
              />
            </div>
          </div>
        </div>
        <div class="statistics__item">
          <div class="statistics__item__title">Запросы на сегодня</div>
          <div
            class="statistics__item__content"
            style="display: inline; max-height: 300px"
          >
            <apexchart
              type="pie"
              :options="dayOptions"
              :series="daySeries"
              :height="200"
            ></apexchart>
          </div>
        </div>
        <div class="statistics__item">
          <div class="statistics__item__title">
            Общая статистика запросов по категориям
          </div>
          <div
            class="statistics__item__content"
            style="display: inline; max-height: 300px"
          >
            <apexchart
              type="pie"
              :options="categoriesOptions"
              :series="categoriesSeries"
              :height="200"
            ></apexchart>
          </div>
        </div>
      </div>
    </div>
    <br />
    <h3 style="text-align: left">Последние действия</h3>
    <br />

    <v-card>
      <v-data-table
        :headers="headers"
        :items="data_tables"
        v-model:page="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
      >
        <template v-slot:bottom> </template
      ></v-data-table>
    </v-card>
  </div>
  <div class="pagination__section">
    <v-pagination
      v-model="page"
      :length="Math.ceil(this.data_tables.length / this.itemsPerPage)"
      :total-visible="4"
    ></v-pagination>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "HomeView",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      page: 1,
      itemsPerPage: 5,
      //daystat
      dayOptions: {
        chart: {
          type: "pie",
        },
        title: {
          text: "Общие количество запросов 300",
          align: "right",
          style: {
            fontSize: "16px",
            fontFamily: "Inter",
            fontWeight: "normal",
          },
        },
        labels: [
          "Новые обращение",
          "Ожидающие обращение",
          "Отвеченные обращение",
          "Завершенные обращение",
        ],
        colors: ["#3A54E9", "#2EDCC3", "#D0DF1A", "#FD4141"],
        legend: {
          position: "right",
        },
      },
      daySeries: [48, 19, 15, 18],
      //monthStat
      monthStat: {
        xaxis: {
          categories: [
            "янв",
            "фев",
            "мар",
            "апр",
            "май",
            "июн",
            "июл",
            "авг",
            "сен",
            "окт",
            "ноя",
            "дек",
          ],
        },
        yaxis: {
          min: 0,
          max: 100,
        },
      },
      monthSeries: [
        {
          name: "Новые обращение",
          data: [30, 40, 25, 50, 49, 21, 70, 51, 30, 60, 40, 70],
          color: "#FFAD62",
        },
        {
          name: "Отвеченные обращение",
          data: [1, 3, 4, 65, 34, 44, 22, 98, 34, 21, 22, 89],
          color: "#304BE4",
        },
      ],
      monthLabels: {
        enabled: true,
        style: {
          fontSize: "12px",
          fontWeight: "bold",
          colors: ["#333"],
        },
        formatter: function (val) {
          return val + "%";
        },
      },
      //categoriesStat
      categoriesOptions: {
        chart: {
          type: "pie",
        },
        title: {
          text: "Общие количество запросов 300",
          align: "right",
          style: {
            fontSize: "16px",
            fontFamily: "Inter",
            fontWeight: "normal",
          },
        },
        labels: [
          "Электронная школа(Mektep.EDUS)",
          "Электронный колледж(College.EDUS)",
          "Дополнительное образование(Zerek.EDUS)",
          "Другие платформы EDUS",
        ],
        colors: ["#6A3CB5", "#BAE969", "#D0DF1A", "#FD4141"],
        legend: {
          position: "right",
        },
      },
      categoriesSeries: [45, 30, 10, 5],

      headers: [
        {
          align: "start",
          key: "data",
          sortable: false,
          title: "Дата",
        },
        { key: "managers", title: "Менеджер", sortable: false },
        { key: "action", title: "Действие", sortable: false },
        { key: "appeal_id", title: "Номер обращений", sortable: false },
        { key: "category", title: "Категория запроса", sortable: false },
        { key: "created_at", title: "Дата создания", sortable: false },
      ],
      data_tables: [
        {
          data: "24-04-2023 10:20",
          managers: "Мақсым Орынбасар",
          action: "завершил(-а) запрос",
          appeal_id: 1,
          category: "Mektep.EDUS",
          created_at: "24-04-2023 10:20",
        },
        {
          data: "24-04-2023 10:20",
          managers: "Мақсым Орынбасар",
          action: "завершил(-а) запрос",
          appeal_id: 2,
          category: "Mektep.EDUS",
          created_at: "24-04-2023 10:20",
        },
        {
          data: "24-04-2023 10:20",
          managers: "Мақсым Орынбасар",
          action: "завершил(-а) запрос",
          appeal_id: 3,
          category: "Mektep.EDUS",
          created_at: "24-04-2023 10:20",
        },
        {
          data: "24-04-2023 10:20",
          managers: "Мақсым Орынбасар",
          action: "завершил(-а) запрос",
          appeal_id: 4,
          category: "Mektep.EDUS",
          created_at: "24-04-2023 10:20",
        },
        {
          data: "24-04-2023 10:20",
          managers: "Мақсым Орынбасар",
          action: "завершил(-а) запрос",
          appeal_id: 5,
          category: "Mektep.EDUS",
          created_at: "24-04-2023 10:20",
        },
        {
          data: "24-04-2023 10:20",
          managers: "Мақсым Орынбасар",
          action: "завершил(-а) запрос",
          appeal_id: 6,
          category: "Mektep.EDUS",
          created_at: "24-04-2023 10:20",
        },
        {
          data: "24-04-2023 10:20",
          managers: "Мақсым Орынбасар",
          action: "завершил(-а) запрос",
          appeal_id: 7,
          category: "Mektep.EDUS",
          created_at: "24-04-2023 10:20",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.section__statistics {
  &__content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .statistics__item {
    text-align: left;
    width: 48%;
    margin-bottom: 30px;
    @media only screen and (max-width: 1268px) {
      width: 100%;
    }
    &__title {
      font-weight: 500;
      font-size: 20px;
      line-height: 23px;
      color: #000000;
      margin-bottom: 20px;
    }
    &__content {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .rectangle {
        width: 48%;
        padding: 10px;
        text-align: center;
        border-radius: 10px;
        span {
          font-weight: 400;
          font-size: 1.1vw;
          text-align: center;
          color: #ffffff;
          @media only screen and (max-width: 1068px) {
            font-size: 20px;
          }
        }
        p {
          font-weight: 700;
          font-size: 2.2vw;
          color: #ffffff;
          @media only screen and (max-width: 1068px) {
            font-size: 36px;
          }
        }
      }
    }
  }
}
</style>
