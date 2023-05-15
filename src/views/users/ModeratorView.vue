<template>
  <div class="section__header">
    <div class="section__header__title">Мой профиль</div>
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
    <v-container style="padding: 0px">
      <v-row justify="space-between" no-gutters>
        <v-col cols="12" md="6" class="profile__col">
          <label class="universal__label">Должность</label>
          <div class="profile__input">{{ user.position }}</div>
        </v-col>
        <v-col cols="12" md="6" class="profile__col">
          <label class="universal__label">Рейтинг</label>
          <div
            class="profile__input"
            style="border: none; padding: 0; pointer-events: none"
          >
            <v-rating
              v-model="rating"
              color="#ff8300"
              :half-increments="true"
              :dense="true"
              :size="50"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
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

    <v-container style="padding: 0px; margin-top: 20px">
      <v-row align="start" no-gutters>
        <v-col cols="12" md="6" class="profile__col">
          <label class="universal__label">Должность</label>

          <v-select
            variant="outlined"
            v-model="editedUser.position"
            :items="positions"
          ></v-select>
        </v-col>
        <v-col cols="12" md="6" class="profile__col">
          <label class="universal__label">Рейтинг</label>
          <div
            class="profile__input"
            style="border: none; padding: 0; pointer-events: none"
          >
            <v-rating
              v-model="rating"
              color="#ff8300"
              :half-increments="true"
              :dense="true"
              :size="50"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>

  <div>
    <div class="section__stat">
      <div class="section__header__title" style="margin: 20px 0">
        Статистика по запросам
      </div>
      <div class="section__stat__content">
        <div class="section__stat__item">
          <div class="section__stat__item__title">
            Общие количество <strong>завершенных</strong> запросов
          </div>
          <h1 class="section__stat__item__number">
            {{ counterData[0].count }}
          </h1>
        </div>
        <div class="section__stat__item" style="background: #f77f00">
          <div class="section__stat__item__title">
            Общие количество <strong>обработанных</strong> запросов
          </div>
          <h1 class="section__stat__item__number">
            {{ counterData[1].count }}
          </h1>
        </div>
        <div class="section__stat__item">
          <div class="section__stat__item__title">
            Общие количество <strong>завершенных</strong> запросов в
            <strong>день</strong>
          </div>
          <h1 class="section__stat__item__number">
            {{ counterData[2].count }}
          </h1>
        </div>
        <div class="section__stat__item" style="background: #f77f00">
          <div class="section__stat__item__title">
            Общие количество <strong>обработанных</strong> запросов в
            <strong>день</strong>
          </div>
          <h1 class="section__stat__item__number">
            {{ counterData[3].count }}
          </h1>
        </div>
      </div>
    </div>

    <div
      class="section__header__title"
      style="margin: 20px 0; margin-top: 30px"
    >
      Инструкции
    </div>
    <v-container style="padding: 0px">
      <v-row>
        <v-col
          v-for="(post, index) in posts"
          :key="index"
          class="card__body"
          cols="12"
          sm="12"
          md="6"
          lg="4"
        >
          <div class="moderator__card">
            <div>
              <div class="moderator__card__title">
                {{ subString(post.title, 50) }}
              </div>
              <div class="moderator__card__description">
                {{ subString(post.content, 165) }}
              </div>
            </div>
            <div>
              <div class="moderator__card__manager">{{ manager }}</div>
              <div class="posts__action">
                <v-btn class="posts__action__edit" @click="editPost(index)"
                  >Редактировать</v-btn
                >
                <v-btn class="posts__action__delete" @click="deletePost(index)"
                  >Удалить</v-btn
                >
              </div>
            </div>
          </div></v-col
        >
      </v-row>
    </v-container>

    <v-dialog v-model="dialog" max-width="500px">
      <div class="moderator__popup">
        <div class="dialog__container__close">
          <v-icon size="small" class="me-2" @click="closeDialog">
            mdi-window-close
          </v-icon>
        </div>
        <div class="moderator__popup__title">Редактировать вопрос</div>
        <div class="moderator__popup__fields">
          <v-text-field
            variant="outlined"
            v-model="editedPost.title"
            label="Вопрос"
          ></v-text-field>
          <v-textarea
            variant="outlined"
            v-model="editedPost.content"
            label="Ответ"
          ></v-textarea>
        </div>
        <div class="moderator__popup__actions">
          <v-btn
            class="button_add"
            style="background: #bbbbbb !important; margin-right: 20px"
            @click="closeDialog"
          >
            Отменить
          </v-btn>
          <v-btn
            class="button_add"
            style="background: #27ae60 !important"
            @click="savePost"
          >
            Сохранить
          </v-btn>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { VRating } from "vuetify/lib/components";

export default {
  components: {
    VRating,
  },
  data() {
    return {
      rating: 4.8,
      manager: "Мақсым Орынбасар,Менеджер 1",
      posts: [
        {
          title: "Что делать, если мой компьютер не загружается?",
          content:
            "Если ваш компьютер не загружается, попробуйте выполнить следующие шаги: Проверьте, включен ли компьютер и подключен ли он к розетке. Попробуйте перезагрузить компьютер, нажав и удержив",
        },
        {
          title: "Что делать, если мой компьютер не загружается?",
          content:
            "Если ваш компьютер не загружается, попробуйте выполнить следующие шаги: Проверьте, включен ли компьютер и подключен ли он к розетке. Попробуйте перезагрузить компьютер, нажав и удержив",
        },
      ],
      dialog: false,
      editMode: false,
      editedPost: {
        title: "",
        content: "",
      },
      editedPostIndex: null,
      //table
      page: 1,
      itemsPerPage: 5,

      user: {
        full_name: "Орынбасар Мақсым",
        identiny_number: "Электронная школа",
        email: "maxim.orynbassar@gmail.com",
        phone: "+77785096839",
        position: "Менеджер тех поддержки",
      },
      editedUser: null,
      isEditing: false,
      positions: [
        "",
        "Менеджер тех поддержки",
        "Учитель информатики",
        "Классный руководитель",
        "Designer",
      ],
      duration: 20,
      counterData: [
        {
          id: 102,
          count: 0,
        },
        {
          id: 105,
          count: 0,
        },
        {
          id: 12,
          count: 0,
        },
        {
          id: 15,
          count: 0,
        },
      ],
    };
  },
  created() {
    this.counterData.forEach((item) => {
      setInterval(() => {
        if (item.count < item.id) {
          item.count++;
        }
      }, this.duration);
    });
  },
  methods: {
    openDialog(index) {
      this.dialog = true;
      this.editMode = true;
      this.editedPost = {
        title: this.posts[index].title,
        content: this.posts[index].content,
      };
      this.editedPostIndex = index;
    },
    closeDialog() {
      this.dialog = false;
    },
    subString(word, length) {
      if (word.length > length) {
        return word.substring(0, length) + "...";
      } else {
        return word;
      }
    },
    savePost() {
      this.posts[this.editedPostIndex].title = this.editedPost.title;
      this.posts[this.editedPostIndex].content = this.editedPost.content;

      this.dialog = false;
    },
    editPost(index) {
      this.openDialog(index);
    },
    deletePost(index) {
      let text = "Нажмите ОК если уверены что хотите удалить.";
      if (confirm(text) == true) {
        this.posts.splice(index, 1);
      }
    },

    saveUser() {
      this.user.full_name = this.editedUser.full_name;
      this.user.identiny_number = this.editedUser.identiny_number;
      this.user.email = this.editedUser.email;
      this.user.phone = this.editedUser.phone;
      this.user.position = this.editedUser.position;

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

<style lang="scss">
.moderator__card {
  background: #f4f7fb;
  border-radius: 10px;
  padding: 20px;
  height: 300px;
  @media (max-width: 1440px) {
    height: 400px;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &__title {
    width: 100%;
    font-weight: 700;
    font-size: 22px;
    line-height: 27px;
    color: #000000;
  }
  &__description {
    width: 100%;
    margin-top: 15px;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
  }
  &__manager {
    margin: 20px 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #616161;
  }
}
.moderator__popup {
  background: #ffffff;
  padding: 30px;
  &__title {
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #000000;
    margin: 30px 0;
    width: 100%;
    text-align: center;
  }
  &__fields {
  }
  &__actions {
    display: flex;
    justify-content: flex-end;
  }
}

.section__stat {
  margin: 20px 0;
  &__content {
    max-width: 1340px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  &__item {
    background: #f44336cc;
    width: 24%;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px;
    text-align: center;
    border-radius: 10px;
    @media (max-width: 1200px) {
      width: 48%;
      margin-top: 20px;
    }
    @media (max-width: 967px) {
      width: 100%;
    }
    &__title {
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      color: #fafafa;
      margin-bottom: 10px;
    }
    &__number {
      font-weight: 700;
      font-size: 32px;
      line-height: 39px;
      color: #fafafa;
    }
  }
}
</style>
