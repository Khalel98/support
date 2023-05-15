<template>
  <div class="section__header">
    <div class="section__header__title">Подкатегории вопросов</div>
    <v-btn class="button_add" @click="dialog = !dialog">
      Добавить категорию
    </v-btn>
  </div>

  <!--:sort-by="[{ key: 'calories', order: 'asc' }]"-->
  <v-data-table
    :headers="headers"
    :items="dataItems"
    v-model:page="page"
    :items-per-page="itemsPerPage"
    hide-default-footer
    class="elevation-1"
  >
    <template v-slot:top>
      <v-dialog v-model="dialog" max-width="600px">
        <v-card ref="form">
          <div class="dialog__container">
            <div class="dialog__container__close">
              <v-icon size="small" class="me-2" @click="close">
                mdi-window-close
              </v-icon>
            </div>
            <div class="dialog__title">{{ formTitle }}</div>
            <div>
              <label class="universal__label">Категория вопроса</label>
              <v-autocomplete
                ref="category"
                required
                :rules="[() => !!editedItem.category || 'Это поле обязательна']"
                v-model="editedItem.category"
                :items="categories"
                variant="outlined"
                placeholder="Выберите категорию..."
              ></v-autocomplete>
            </div>
            <div>
              <label class="universal__label">Наименование на казахском</label>
              <v-text-field
                ref="name_kz"
                required
                :rules="[() => !!editedItem.name_kz || 'Это поле обязательна']"
                v-model="editedItem.name_kz"
                variant="outlined"
                placeholder="Выберите наименование..."
              ></v-text-field>
            </div>
            <div>
              <label class="universal__label">Наименование на русском</label>
              <v-text-field
                ref="name_ru"
                required
                :rules="[() => !!editedItem.name_ru || 'Это поле обязательна']"
                v-model="editedItem.name_ru"
                variant="outlined"
                placeholder="Выберите наименование..."
              ></v-text-field>
            </div>

            <div class="dialog__actions">
              <v-btn
                class="btn__custom"
                style="background: #bbbbbb"
                @click="close"
              >
                Отмена
              </v-btn>
              <v-btn
                class="btn__custom"
                :style="{ background: activeColor }"
                @click="submit"
              >
                {{ formBtn }}
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <div class="dialog__container">
            <div class="dialog__container__close">
              <v-icon size="small" class="me-2" @click="closeDelete">
                mdi-window-close
              </v-icon>
            </div>
            <div class="dialog__title">Уверены в том что хотите удалить?</div>

            <div class="dialog__actions">
              <v-btn
                class="btn__custom"
                style="background: #bbbbbb"
                @click="closeDelete"
              >
                Отмена
              </v-btn>
              <v-btn
                class="btn__custom"
                style="background: red"
                @click="deleteItemConfirm"
              >
                Удалить
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item.raw)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item.raw)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data> Нет данных </template>
    <template v-slot:bottom> </template>
  </v-data-table>
  <div class="pagination__section">
    <v-pagination
      v-model="page"
      :length="Math.ceil(this.dataItems.length / this.itemsPerPage)"
      :total-visible="4"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  data: () => ({
    page: 1,
    itemsPerPage: 3,
    dialog: false,
    dialogDelete: false,
    activeColor: "",
    formHasErrors: false,
    headers: [
      {
        title: "Наименование на казахском",
        align: "start",
        sortable: false,
        key: "name_kz",
      },
      { title: "Наименование на русском", key: "name_ru" },
      { title: "Категория вопроса", key: "category" },
      { title: "Дата создания", key: "created_at" },
      { title: "Действие", key: "actions", sortable: false },
    ],
    dataItems: [],
    editedIndex: -1,
    categories: [
      "Электронная школа(Mektep.EDUS)",
      "Электронный колледж(College.EDUS)",
      "Дополнительное образование(Zerek.EDUS)",
      "Другие платформы EDUS",
    ],
    editedItem: {
      name_kz: "",
      name_ru: "",
      category: null,
      created_at: new Date().toISOString().substr(0, 10),
    },
    defaultItem: {
      name_kz: "",
      name_ru: "",
      category: null,
      created_at: new Date().toISOString().substr(0, 10),
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Добавить новую категорию"
        : "Редактировать подкатегории";
    },

    formBtn() {
      if (this.editedIndex === -1) {
        this.addBlue();
        return "Добавить";
      } else {
        this.addGreen();
        return "Сохранить";
      }
    },
    form() {
      return {
        name_kz: this.editedItem.name_kz,
        name_ru: this.editedItem.name_ru,
        category: this.editedItem.category,
      };
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.dataItems = [
        {
          name_kz: "Авторизация проблемалары",
          name_ru: "Проблемы по авторизации",
          category: "Электронная школа(Mektep.EDUS)",
          created_at: "2023-04-29",
        },
      ];
    },
    addBlue() {
      this.activeColor = "#0075FF";
    },

    addGreen() {
      this.activeColor = "#27AE60";
    },

    editItem(item) {
      this.editedIndex = this.dataItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.dataItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.dataItems.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.dataItems[this.editedIndex], this.editedItem);
      } else {
        this.dataItems.push(this.editedItem);
      }
      this.close();
    },
    submit() {
      this.formHasErrors = false;

      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) this.formHasErrors = true;

        this.$refs[f].validate(true);
      });
      if (this.formHasErrors) {
        console.log("false");
      } else {
        console.log("true");
        this.save();
      }
    },
  },
};
</script>

<style>
.v-data-table__td {
  /*display: none !important;*/
  text-align: left !important;
}
</style>
