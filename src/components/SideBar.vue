<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
    >
      <v-list-item nav class="profile__item">
        <template v-slot:append>
          <v-btn
            variant="text"
            icon="mdi-close"
            @click.stop="rail = !rail"
            id="close__btn"
          ></v-btn>
        </template>
      </v-list-item>
      <div class="user-profile" id="user-profile">
        <div class="user-profile-content" id="user-profile-content">
          <div class="user-profile-img logo">
            <img
              src="https://randomuser.me/api/portraits/men/85.jpg"
              alt="Vue"
            />
          </div>
          <span class="user-profile-name"> Айгерім М. </span>
        </div>
        <a href="" class="user-profile-link">Посмотреть профиль</a>
      </div>

      <v-list density="compact" nav>
        <!--Главная-->
        <v-list-item
          class="sidebar__item"
          prepend-icon="mdi-home-outline"
          title="Главная"
          to="/"
        ></v-list-item>
        <!-- Обращения -->
        <v-list-group>
          <template v-slot:activator="{ props }">
            <router-link to="/appeal" class="sidebar__group__link">
              <v-list-item
                class="sidebar__group"
                v-bind="props"
                prepend-icon="mdi-email-outline"
                title="Обращения"
              ></v-list-item>
            </router-link>
          </template>
          <div class="div" v-if="!rail">
            <v-list-item
              class="sidebar__subitem"
              title="Новые"
              to="/appeal/new"
            ></v-list-item>
            <v-list-item
              class="sidebar__subitem"
              title="Ожидание"
              to="/appeal/expectation"
            ></v-list-item>
            <v-list-item
              class="sidebar__subitem"
              title="Отвеченные"
              to="/appeal/answered"
            ></v-list-item>
            <v-list-item
              class="sidebar__subitem"
              title="Завершенные"
              to="/appeal/completed"
            ></v-list-item>
            <v-list-item
              class="sidebar__subitem"
              title="Просроченные"
              to="/appeal/overdue"
            ></v-list-item>
          </div>
        </v-list-group>

        <!-- Пользователи -->
        <v-list-group>
          <template v-slot:activator="{ props }">
            <router-link to="/users" class="sidebar__group__link">
              <v-list-item
                class="sidebar__group"
                v-bind="props"
                prepend-icon="mdi-account-group-outline"
                title="Пользователи"
              ></v-list-item>
            </router-link>
          </template>
          <div class="div" v-if="!rail">
            <v-list-item
              class="sidebar__subitem"
              title="Все пользователи"
              to="/users/all"
            ></v-list-item>

            <v-list-item
              class="sidebar__subitem"
              title="Профиль"
              to="/users/profile"
            ></v-list-item>

            <v-list-item
              class="sidebar__subitem"
              title="Профиль модератора"
              to="/users/moderator"
            ></v-list-item>
          </div>
        </v-list-group>

        <v-list-item
          class="sidebar__item"
          prepend-icon="mdi-office-building-outline"
          title="Организации"
          to="/organization/all"
        ></v-list-item>

        <v-list-group>
          <template v-slot:activator="{ props }">
            <router-link to="/settings" class="sidebar__group__link">
              <v-list-item
                class="sidebar__group"
                v-bind="props"
                prepend-icon=" mdi-cog-outline"
                title="Настройки"
              ></v-list-item>
            </router-link>
          </template>
          <div class="div" v-if="!rail">
            <v-list-item
              class="sidebar__subitem"
              title="Типы обращений"
              to="/settings/category"
            ></v-list-item>
            <v-list-item
              class="sidebar__subitem"
              title="Подтипы обращений"
              to="/settings/subcategory"
            ></v-list-item>
          </div>
        </v-list-group>

        <v-list-item
          class="sidebar__item"
          prepend-icon="mdi-help-circle-outline"
          title="Справочник"
          to="/about"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <div class="logo-container">
        <img src="@/assets/emblema.png" alt="Logo" height="64" />
        <img src="@/assets/logo.png" alt="Logo" height="18" />
        <span class="logo-text">Техподдержка</span>
      </div>

      <v-spacer></v-spacer>
      <v-btn @click="toggleLanguage">
        <span class="language-text">{{ language }}</span>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <!-- Your app content goes here -->
      <div class="routers__container" style="padding: 30px; padding-top: 35px">
        <div
          class="routers__container__content"
          style="
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
          "
        >
          <router-view />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      rail: false,
      language: "Русский",
    };
  },
  methods: {
    toggleLanguage() {
      if (this.language === "English") {
        this.language = "Русский";
      } else {
        this.language = "English";
      }
    },
  },
  mounted() {},
  watch: {
    rail(newVal) {
      if (newVal === true) {
        document.getElementsByClassName("user-profile-name")[0].style.display =
          "none";
        document.getElementsByClassName("user-profile-link")[0].style.display =
          "none";
        document.getElementsByClassName(" user-profile")[0].style.padding =
          "2px";
        document.getElementsByClassName(" user-profile")[0].style.borderRadius =
          "50%";
        document.getElementById("close__btn").style.display = "none";
      } else {
        document.getElementsByClassName("user-profile-name")[0].style.display =
          "flex";
        document.getElementsByClassName("user-profile-link")[0].style.display =
          "flex";
        document.getElementsByClassName(" user-profile")[0].style.padding =
          "12px 14px";
        document.getElementsByClassName(" user-profile")[0].style.borderRadius =
          "12px";
        document.getElementById("close__btn").style.display = "inline";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.logo-container {
  display: flex;
  align-items: center;
  img {
    margin-right: 15px;
    cursor: pointer;
  }
  .logo-text {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #8e8e8e;
  }
}
.sidebar__item,
.sidebar__subitem,
.sidebar__group,
.sidebar__group__link {
  text-align: left;
  text-decoration: none;
  color: #616161;
}
.v-list-item--active.sidebar__item,
.v-list-item--active.sidebar__group {
  background: #ff8300;
  color: white;
}

.user-profile {
  margin: 4px 8px;
  background: #18a0fb;
  border-radius: 10px;
  padding: 12px 14px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  &-content {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  &-name {
    margin-left: 20px;
    font-size: 14px;
    font-weight: 600;
    line-height: 17px;
    color: #ffffff;
    display: flex;
  }
  &-img {
    width: 35px;
    height: 35px;
    img {
      border-radius: 50%;
      width: 35px;
    }
  }
  &-link {
    margin-top: 12px;
    font-size: 13px;
    font-weight: 300;
    color: #ffffff;
    text-decoration: none;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
