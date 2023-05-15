<template>
  <div class="section__header">
    <div class="section__header__title">Общеобразовательная школа №5</div>
  </div>

  <div class="section__organization">
    <div class="section__organization__content">
      <div
        class="section__organization__item"
        v-for="item in items"
        :key="item.id"
      >
        <label for="" class="section__organization__item__label">{{
          item.label
        }}</label>
        <div class="section__organization__item__field">
          <p class="field__text">{{ item.field }}</p>
        </div>
      </div>
      <div class="section__header__title" style="width: 100%; margin: 15px 0">
        Пользователи
      </div>

      <div
        class="section__organization__item"
        v-for="item in users"
        :key="item.id"
      >
        <label for="" class="section__organization__item__label">{{
          item.label
        }}</label>
        <div class="section__organization__item__field">
          <p class="field__text">{{ item.field }}</p>
        </div>
      </div>
      <div class="section__header__title" style="width: 100%; margin: 15px 0">
        Статистика по запросам
      </div>

      <div
        class="section__organization__item"
        v-for="item in requests"
        :key="item.id"
      >
        <label for="" class="section__organization__item__label">{{
          item.label
        }}</label>
        <div class="section__organization__item__field">
          <p class="field__text">{{ item.field }}</p>
        </div>
      </div>
    </div>
  </div>

  <br />
  <h3 class="profile__title">Последние запросы</h3>
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
  <div class="pagination__section">
    <v-pagination
      v-model="page"
      :length="Math.ceil(this.data_tables.length / this.itemsPerPage)"
      :total-visible="4"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //table
      page: 1,
      itemsPerPage: 5,
      items: [
        {
          id: "1",
          label: "Полное название",
          field: "КГУ Общеобразовательная школа №5 имени Абая",
        },
        {
          id: "2",
          label: "Система",
          field: "Электронная школа (Mektep.EDUS)",
        },
        {
          id: "3",
          label: "Директор школы",
          field: "Жақсылықова Ардақ Балажановна",
        },
        {
          id: "4",
          label: "Общие количество пользователей",
          field: "1032",
        },
      ],
      users: [
        //2
        {
          id: "5",
          label: "Учителя",
          field: "152",
        },
        {
          id: "6",
          label: "Ученики",
          field: "815",
        },
        {
          id: "7",
          label: "Персоналы",
          field: "70",
        },
        {
          id: "8",
          label: "Родители",
          field: "1630",
        },
      ],
      requests: [
        //3
        {
          id: "9",
          label: "Общие количество запросов",
          field: "520",
        },
        {
          id: "10",
          label: "Количество запросов от учителей",
          field: "320",
        },
        {
          id: "11",
          label: "Количество запросов от родителей  ",
          field: "150",
        },
        {
          id: "12",
          label: "Количество запросов от персоналов",
          field: "50",
        },
      ],
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
.section__organization {
  &__content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  &__item {
    width: 48%;
    margin-bottom: 20px;
    @media (max-width: 1200px) {
      width: 100%;
    }
    &__label {
      font-family: "Inter";
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      /* identical to box height */

      /* Dark Gray */

      color: #7a7a7a;
    }
    &__field {
      display: flex;
      align-items: center;
      padding: 0px 20px;
      background: #fafafa;
      height: 50px;
      border: 0.5px solid #7a7a7a;
      border-radius: 10px;
      width: 100%;
      .field__text {
        font-family: "Inter";
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;

        color: #000000;
      }
    }
  }
}
</style>
