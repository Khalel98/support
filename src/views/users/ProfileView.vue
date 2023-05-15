<template>
  <div class="section__header">
    <div class="section__header__title">Профиль пользователя</div>
    <div>
      <v-btn
        class="button_add"
        style="background: #ff8300 !important"
        @click="isEditing = true"
        v-if="!isEditing"
      >
        Редактировать
      </v-btn>
      <div v-if="isEditing">
        <v-btn
          class="button_add"
          style="background: #bbbbbb !important; margin-right: 20px"
          @click="cancelEdit"
        >
          Отменить
        </v-btn>
        <v-btn
          class="button_add"
          style="background: #27ae60 !important"
          @click="saveUser"
        >
          Сохранить
        </v-btn>
      </div>
    </div>
  </div>
  <div class="main__view" v-if="!isEditing">
    <div
      style="display: flex; justify-content: space-between; align-items: center"
    >
      <div class="profile__img">
        <img src="@/assets/profile__img.png" alt="" />
      </div>
      <v-container style="padding: 0px">
        <v-row justify="space-between" no-gutters>
          <v-col cols="12" md="6" class="profile__col">
            <label class="universal__label">ФИО</label>
            <div class="profile__input">{{ user.full_name }}</div>
          </v-col>
          <v-col cols="12" md="6" class="profile__col">
            <label class="universal__label">ИИН</label>
            <div class="profile__input">{{ user.identiny_number }}</div>
          </v-col>
          <v-col cols="12" md="6" class="profile__col">
            <label class="universal__label">Почта</label>
            <div class="profile__input">{{ user.email }}</div>
          </v-col>
          <v-col cols="12" md="6" class="profile__col">
            <label class="universal__label">Номер телефона</label>
            <div class="profile__input">{{ user.phone }}</div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div v-if="user.organizations.length > 0">
      <h3 class="profile__title">Организация</h3>

      <div
        v-for="(organization, index) in user.organizations"
        :key="organization.id"
      >
        <h5 class="additional_info" v-if="index > 0">Дополнительно</h5>
        <v-container style="padding: 0px">
          <v-row align="start" no-gutters>
            <v-col
              cols="12"
              md="6"
              v-if="organization.name"
              class="profile__col"
            >
              <label class="universal__label">Название организации</label>
              <div class="profile__input">
                {{ organization.name }}
              </div>
            </v-col>
            <v-col
              cols="12"
              md="6"
              v-if="organization.position"
              class="profile__col"
            >
              <label class="universal__label">Должность</label>
              <div class="profile__input">
                {{ organization.position }}
              </div>
            </v-col>
            <v-col
              cols="12"
              md="6"
              v-if="organization.additional"
              class="profile__col"
            >
              <label class="universal__label">Дополнительно</label>
              <div class="profile__input">
                {{ organization.additional }}
              </div>
            </v-col>

            <v-col
              cols="12"
              md="6"
              v-if="organization.class"
              class="profile__col"
            >
              <label class="universal__label">Класс</label>
              <div class="profile__input">
                {{ organization.class }}
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>

    <div v-if="user.childs.length > 0">
      <h3 class="profile__title">Дети</h3>

      <div v-for="child in user.childs" :key="child.id">
        <v-container style="padding: 0px">
          <v-row align="start" no-gutters>
            <v-col
              cols="12"
              md="6"
              v-if="child.child_name"
              class="profile__col"
            >
              <label class="universal__label">ФИО ребенка </label>
              <div class="profile__input">
                {{ child.child_name }}
              </div>
            </v-col>
            <v-col
              cols="12"
              md="6"
              v-if="child.child_category"
              class="profile__col"
            >
              <label class="universal__label">Связанная система</label>
              <div class="profile__input">
                {{ child.child_category }}
              </div>
            </v-col>
            <v-col
              cols="12"
              md="6"
              v-if="child.child_class"
              class="profile__col"
            >
              <label class="universal__label">Класс </label>
              <div class="profile__input">
                {{ child.child_class }}
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </div>

  <div class="main__view" v-else>
    <div
      style="display: flex; justify-content: space-between; align-items: center"
    >
      <div class="profile__img">
        <img src="@/assets/profile__img.png" alt="" />
      </div>

      <v-container style="padding: 0px">
        <v-row align="start" no-gutters>
          <v-col cols="12" md="6" class="profile__col">
            <label class="universal__label">ФИО</label>

            <v-text-field
              v-model="user.full_name"
              variant="outlined"
              class="disabledFiels"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="profile__col">
            <label class="universal__label">ИИН</label>
            <v-text-field
              v-model="user.identiny_number"
              variant="outlined"
              class="disabledFiels"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="profile__col">
            <label class="universal__label">Почта</label>
            <v-text-field
              v-model="editedUser.email"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="profile__col">
            <label class="universal__label">Номер телефона</label>
            <v-text-field
              v-model="editedUser.phone"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
      "
    >
      <h3 class="profile__title">Организация</h3>
      <v-btn class="profile_add_item" @click="addOrganization"
        >Добавить организацию
      </v-btn>
    </div>

    <div
      v-for="(organization, index) in editedUser.organizations"
      :key="organization.id"
    >
      <h5 class="additional_info" v-if="index > 0">Дополнительно</h5>

      <v-container style="padding: 0px">
        <v-row align="start" no-gutters>
          <v-col cols="12" md="6" class="profile__col">
            <label class="universal__label">Название организации</label>
            <v-select
              variant="outlined"
              v-model="organization.name"
              :items="organizations"
              placeholder="Выберите..."
            ></v-select
          ></v-col>
          <v-col cols="12" md="6" class="profile__col">
            <label class="universal__label">Должность</label>
            <v-select
              variant="outlined"
              v-model="organization.position"
              :items="positions"
              placeholder="Выберите..."
            ></v-select>
          </v-col>
          <v-col cols="12" md="6" class="profile__col">
            <label class="universal__label">Дополнительно</label>
            <v-select
              variant="outlined"
              v-model="organization.additional"
              :items="additionals"
              placeholder="Выберите..."
            ></v-select>
          </v-col>
          <v-col cols="12" md="6" class="profile__col">
            <label class="universal__label">Класс</label>
            <v-select
              variant="outlined"
              v-model="organization.class"
              :items="classes"
              placeholder="Выберите..."
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
      <v-btn
        class="profile_delete_item"
        @click="removeOrganization(index)"
        style="margin-bottom: 30px"
        >Удалить</v-btn
      >
    </div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
      "
    >
      <h3 class="profile__title">Дети</h3>
      <v-btn class="profile_add_item" @click="addChild"
        >Добавить ребенка
      </v-btn>
    </div>

    <div v-for="child in editedUser.childs" :key="child.id">
      <v-container style="padding: 0px">
        <v-row align="start" no-gutters>
          <v-col cols="12" md="6" class="profile__col">
            <label class="universal__label">ФИО ребенка</label>
            <v-select
              variant="outlined"
              v-model="child.child_name"
              :items="child_names"
            ></v-select
          ></v-col>
          <v-col cols="12" md="6" class="profile__col">
            <label class="universal__label">Связанная система</label>
            <v-select
              variant="outlined"
              v-model="child.child_category"
              :items="categories"
            ></v-select
          ></v-col>
          <v-col cols="12" md="6" class="profile__col">
            <label class="universal__label">Класс</label>
            <v-select
              variant="outlined"
              v-model="child.child_class"
              :items="classes"
            ></v-select
          ></v-col>
        </v-row>
      </v-container>

      <v-btn
        class="profile_delete_item"
        @click="removeChild(index)"
        style="margin-bottom: 30px"
        >Удалить</v-btn
      >
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
  <v-btn class="profile_delete_item" style="margin: 30px 0" v-if="isEditing">
    Удалить профиль
  </v-btn>
</template>

<script>
export default {
  data() {
    return {
      //table
      page: 1,
      itemsPerPage: 5,

      user: {
        full_name: "Иванова Екатерина Петровна",
        identiny_number: "911005621215",
        email: "john.doe@example.com",
        phone: "1234567890",
        organizations: [
          {
            id: 1,
            name: "Технический колледж имени Ш. Есенов",
            position: "Учитель информатики",
          },
          {
            id: 2,
            name: "Общеобразовательная школа 5",
            position: "Учитель информатики",
            additional: "Классный руководитель",
            class: "5 а",
          },
        ],
        childs: [
          {
            id: "",
            child_name: "Иванова Павел Алексеевич",
            child_category: "Электронная школа(Mektep.EDUS)",
            child_class: "2 Б",
          },
        ],
      },
      editedUser: null,
      isEditing: false,
      organizations: ["", "Organization A", "Organization B", "Organization C"],
      positions: [
        "",
        "Учитель информатики",
        "Классный руководитель",
        "Designer",
      ],
      additionals: [
        "",
        "Учитель информатики",
        "Классный руководитель",
        "Designer",
      ],
      classes: ["", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      child_names: ["", "Иванова Павел Алексеевич", "Иванова Артур Алексеевич"],
      categories: [
        "Электронная школа(Mektep.EDUS)",
        "Электронный колледж(College.EDUS)",
        "Дополнительное образование(Zerek.EDUS)",
        "Другие платформы EDUS",
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
  methods: {
    addOrganization() {
      this.editedUser.organizations.push({
        name: "",
        position: "",
        additional: "",
        class: "",
      });
    },
    addChild() {
      this.editedUser.childs.push({
        child_name: "",
        child_category: "",
        child_class: "",
      });
    },
    removeOrganization(index) {
      this.editedUser.organizations.splice(index, 1);
    },
    removeChild(index) {
      this.editedUser.childs.splice(index, 1);
    },
    saveUser() {
      this.user.full_name = this.editedUser.full_name;
      this.user.identiny_number = this.editedUser.identiny_number;
      this.user.email = this.editedUser.email;
      this.user.phone = this.editedUser.phone;

      // Filter out organizations with both empty name and position fields
      this.user.organizations = this.editedUser.organizations.filter(
        (organization) =>
          organization.name.trim() !== "" ||
          organization.position.trim() !== "" ||
          organization.additional.trim() !== "" ||
          organization.class.trim() !== ""
      );

      // Filter out childs with both empty name and position fields
      this.user.childs = this.editedUser.childs.filter(
        (child) =>
          child.child_name.trim() !== "" ||
          child.child_category.trim() !== "" ||
          child.child_class.trim() !== ""
      );

      this.isEditing = false;
      this.editedUser = null;
    },
    cancelEdit() {
      this.isEditing = false;
      this.editedUser = JSON.parse(JSON.stringify(this.user));
    },
  },
  mounted() {
    this.editedUser = JSON.parse(JSON.stringify(this.user));
  },
  watch: {
    isEditing(newVal) {
      if (!newVal) {
        this.editedUser = JSON.parse(JSON.stringify(this.user));
      }
    },
  },
};
</script>
