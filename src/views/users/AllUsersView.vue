<template>
  <div class="section__header">
    <div class="section__header__title">Управление пользователями</div>
  </div>
  <div class="search__filter">
    <input class="search__filter__input" v-model="search" placeholder="Поиск" />
  </div>

  <!--:sort-by="[{ key: 'calories', order: 'asc' }]"-->
  <v-data-table
    :headers="headers"
    :search="search"
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
            <v-card-text style="padding: 0">
              <v-container style="padding: 0">
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <label class="universal__label">Фамилия</label>
                    <v-text-field
                      ref="lastname"
                      required
                      :rules="[() => !!lastname || 'Это поле обязательна']"
                      v-model="lastname"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <label class="universal__label">Имя</label>
                    <v-text-field
                      ref="firstname"
                      required
                      :rules="[() => !!firstname || 'Это поле обязательна']"
                      v-model="firstname"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <label class="universal__label">Отчество</label>
                    <v-text-field
                      ref="middlename"
                      required
                      :rules="[() => !!middlename || 'Это поле обязательна']"
                      v-model="middlename"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <label class="universal__label">ИИН</label>
                    <v-text-field
                      :rules="[rules.min, rules.max]"
                      variant="outlined"
                      counter
                      placeholder="001245358574"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <label class="universal__label">Почта</label>
                    <v-text-field
                      ref="mail"
                      required
                      :rules="[rules.required, rules.email]"
                      v-model="editedItem.mail"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <label class="universal__label" placeholder="+7"
                      >Телефон</label
                    >
                    <v-text-field
                      variant="outlined"
                      placeholder="+7"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <label class="universal__label">Организация</label>
                    <v-autocomplete
                      :items="organization"
                      variant="outlined"
                      placeholder="Выберите..."
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <label class="universal__label">Доступ</label>
                    <v-autocomplete
                      ref="root"
                      required
                      :rules="[
                        () => !!editedItem.root || 'Это поле обязательна',
                      ]"
                      v-model="editedItem.root"
                      :items="roots"
                      variant="outlined"
                      placeholder="Выберите..."
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

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
                style="background: #27ae60"
                @click="submit"
              >
                Сохранить
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:[`item.order`]> </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item.raw)">
        mdi-pencil
      </v-icon>
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
    rules: {
      required: (value) => !!value || "Это поле обязательна.",
      min: (v) => v.length > 11 || "ИИН состоит из 12 цифр",
      max: (v) => v.length < 13 || "ИИН состоит из 12 цифр",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Неверно";
      },
    },
    search: "",
    lastname: "Иванов",
    firstname: "Иван",
    middlename: "Иванович",
    organization: ["1", "2"],
    roots: ["Разрешен", "Запрещен"],
    page: 1,
    itemsPerPage: 3,
    dialog: false,
    activeColor: "",
    formHasErrors: false,
    headers: [
      { title: "№", key: "order" },

      {
        title: "ФИО",
        align: "start",
        sortable: false,
        key: "fullname",
      },
      { title: "Почта", key: "mail" },
      { title: "Роль", key: "position" },
      { title: "Доступ", key: "root" },
      { title: "Действие", key: "actions", sortable: false },
    ],
    dataItems: [],
    editedIndex: -1,
    editedItem: {
      fullname: "",
      mail: "",
      position: "",
      root: "",
    },
    defaultItem: {
      fullname: "",
      mail: "",
      position: "",
      root: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Добавить новую категорию"
        : "Редактировать подкатегории";
    },
    form() {
      return {
        lastname: this.lastname,
        firstname: this.firstname,
        middlename: this.middlename,
        mail: this.editedItem.mail,
      };
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.dataItems = [
        {
          fullname:
            this.lastname + " " + this.firstname + " " + this.middlename,
          mail: "ivan.ivanov@gmail.com",
          position: "Оператор",
          root: "Запрещен",
        },
        {
          fullname:
            this.lastname + " " + this.firstname + " " + this.middlename,
          mail: "ivan.ivanov@gmail.com",
          position: "Оператор",
          root: "Запрещен",
        },
        {
          fullname:
            this.lastname + " " + this.firstname + " " + this.middlename,
          mail: "ivan.ivanov@gmail.com",
          position: "Оператор",
          root: "Запрещен",
        },
        {
          fullname:
            this.lastname + " " + this.firstname + " " + this.middlename,
          mail: "ivan.ivanov@gmail.com",
          position: "Оператор",
          root: "Запрещен",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.dataItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      this.editedItem.fullname =
        this.lastname + " " + this.firstname + " " + this.middlename;
      this.defaultItem.fullname =
        this.lastname + " " + this.firstname + " " + this.middlename;
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
