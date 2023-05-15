<template>
  <div class="section__header">
    <div class="section__header__title">Новые обращение</div>
  </div>
  <div class="search__filter">
    <input
      class="search__filter__input"
      v-model="search"
      placeholder="Поиск"
      style="border-radius: 4px; height: 55px"
    />
  </div>
  <v-card>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="data_tables"
      v-model:page="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
    >
      <template v-slot:[`item.actions`]>
        <router-link to="/action" style="text-decoration: none; color: black">
          <v-icon size="small" class="me-2"> mdi-email-edit-outline </v-icon>
        </router-link>
      </template>
      <template v-slot:bottom> </template>
    </v-data-table>
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
      search: "",
      page: 1,
      itemsPerPage: 8,
      headers: [
        {
          align: "start",
          key: "name",
          sortable: false,
          title: "Наименование",
        },
        { key: "text", title: "Менеджер", sortable: false },
        { key: "service_type", title: "Категория запроса", sortable: false },
        { key: "created_at", title: "Дата создания", sortable: false },
        { key: "actions", title: "Действие", sortable: false },
      ],
      data_tables: [
        {
          name: "Изменить пароль",
          text: "Дизайн сайта выглядит не приветливо для пользователей. Учтите это и измените дизайн",
          service_type: "Қосымша білім беру",
          created_at: new Date().toISOString().substr(0, 10),
        },
        {
          name: "Обновление дизайн",
          text: "Дизайн сайта выглядит не приветливо для пользователей. Учтите это и измените дизайн",
          service_type: "Қосымша білім беру",
          created_at: new Date().toISOString().substr(0, 10),
        },
        {
          name: "Добавить еще ребенка",
          text: "Дизайн сайта выглядит не приветливо для пользователей. Учтите это и измените дизайн",
          service_type: "Қосымша білім беру",
          created_at: new Date().toISOString().substr(0, 10),
        },
        {
          name: "Добавить еще ребенка",
          text: "Дизайн сайта выглядит не приветливо для пользователей. Учтите это и измените дизайн",
          service_type: "Қосымша білім беру",
          created_at: new Date().toISOString().substr(0, 10),
        },
        {
          name: "Добавить еще ребенка",
          text: "Дизайн сайта выглядит не приветливо для пользователей. Учтите это и измените дизайн",
          service_type: "Қосымша білім беру",
          created_at: new Date().toISOString().substr(0, 10),
        },
        {
          name: "Добавить еще ребенка",
          text: "Дизайн сайта выглядит не приветливо для пользователей. Учтите это и измените дизайн",
          service_type: "Қосымша білім беру",
          created_at: new Date().toISOString().substr(0, 10),
        },
        {
          name: "Добавить еще ребенка",
          text: "Дизайн сайта выглядит не приветливо для пользователей. Учтите это и измените дизайн",
          service_type: "Қосымша білім беру",
          created_at: new Date().toISOString().substr(0, 10),
        },
        {
          name: "Добавить еще ребенка",
          text: "Дизайн сайта выглядит не приветливо для пользователей. Учтите это и измените дизайн",
          service_type: "Қосымша білім беру",
          created_at: new Date().toISOString().substr(0, 10),
        },
        {
          name: "Добавить еще ребенка",
          text: "Дизайн сайта выглядит не приветливо для пользователей. Учтите это и измените дизайн",
          service_type: "Қосымша білім беру",
          created_at: new Date().toISOString().substr(0, 10),
        },
      ],
    };
  },
};
</script>
