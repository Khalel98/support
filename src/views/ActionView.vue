<template>
  <div class="section__header">
    <div>
      <div class="section__header__subtitle">
        Все запросы -> Новые -> {{ this.step }}
      </div>
      <div class="section__header__title">Изменить пароль</div>
    </div>
    <v-btn
      class="universal__btn orangeColor"
      v-if="this.step === 'start'"
      @click="this.step = 'processing'"
    >
      Обработать
    </v-btn>
    <v-btn
      class="universal__btn light-greenColor"
      v-if="this.step === 'processed' || this.step === 'answered'"
      @click="this.step = 'answering'"
    >
      Ответить
    </v-btn>
  </div>
  <div class="div" style="display: flex; flex-wrap: wrap; margin: -10px">
    <v-col cols="12" md="7" sm="12">
      <div class="card__section__body">
        <div class="data__pulicity">{{ data__publicity }} день назад</div>

        <v-card
          border
          class="card__section"
          density="compact"
          prepend-avatar="https://randomuser.me/api/portraits/women/10.jpg"
          subtitle="Администратор школы"
          title="Бекімбетова Арайлым"
          variant="text"
        >
          <p class="card__section__text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit
            fermentum nibh ut sit netus proin eros. Ac pellentesque eget justo,
            urna, nisl enim massa. Non dui faucibus neque, adipiscing. Diam odio
            aenean ut aliquam purus leo. Eget purus nisl morbi bibendum id ut
            pellentesque leo sed. Pretium accumsan, posuere pharetra egestas
            enim ultrices turpis.
          </p>

          <a
            class="card__section__download"
            href="/images/myw3schoolsimage.jpg"
            download
          >
            <img src="@/assets/file.png" alt="file" />
            <p class="card__section__download__text">Файл с изменениями</p>
          </a>
        </v-card>
        <v-form ref="form" v-if="this.step !== 'start'">
          <div class="section__choice">
            <div class="section__choice__headliner">
              <p>Категория вопроса</p>
              <span v-if="showResult" style="font-style: italic">{{
                selectedOption1
              }}</span>
            </div>

            <v-select
              v-if="showSelect1"
              v-model="selectedOption1"
              :items="options1"
              label="Выберите категорию"
              class="select__option"
              :rules="[(v) => !!v || 'Это поле обезательное']"
              required
            ></v-select>

            <div class="section__choice__headliner">
              <p>Организация</p>
              <span v-if="showResult" style="font-style: italic">{{
                organizationOption
              }}</span>
            </div>

            <v-select
              v-if="showOrganization"
              v-model="organizationOption"
              :items="organizationOptions"
              label="Выберите организацию"
              class="select__option"
              :rules="[(v) => !!v || 'Это поле обезательное']"
              required
            ></v-select>


            <div class="section__choice__headliner">
              <p>Подкатегория вопроса</p>
              <span v-if="showResult">{{ selectedOption2 }}</span>
            </div>
            <v-select
              v-if="showSelect2"
              v-model="selectedOption2"
              :items="options2"
              label="Выберите категорию"
              class="select__option"
              :rules="[(v) => !!v || 'Это поле обезательное']"
              required
            ></v-select>
            <div class="section__choice__headliner">
              <p>Приоритет запроса</p>
              <span :style="{ color: activeColor }" v-if="showResult">{{
                selectedRadio
              }}</span>
            </div>
            <v-radio-group
              v-if="showRadio"
              v-model="selectedRadio"
              class="radio_btn"
              :rules="[(v) => !!v || 'Это поле обезательное']"
              required
            >
              <v-radio label="Срочно" value="Срочно"></v-radio>
              <v-radio label="Обычный" value="Обычный"></v-radio>
            </v-radio-group>
            <div class="section__btns__body">
              <v-btn
                v-if="showButton"
                @click="validate"
                class="section__btns"
                style="background: #7a7a7a !important"
                >Завершить обработку
              </v-btn>
            </div>
          </div>
        </v-form>

        <div class="feedback__block" v-if="!showButton">
          <div class="feedback__block__content">
            <img src="@/assets/feedback.png" alt="" />
            <div class="manager">
              <div class="manager__name">
                <strong>Алиева Арай</strong>, менеджер 1
              </div>
              <div class="manager__action">
                Обработывал(-а) запрос и изменено статус запрос на “<span
                  style="color: #f77f00"
                  >Обработан</span
                >”
              </div>
            </div>
          </div>
          <div class="feedback__block__created_at">20 часов назад</div>
        </div>

        <div class="section__answer">
          <v-card
            border
            style="padding: 20px"
            variant="text"
            v-if="this.step === 'answering'"
          >
            <textarea
              v-model="answer"
              class="section__answer__textarea"
              placeholder="Введите текст"
            ></textarea>
            <div v-if="images">
              <div
                v-for="(image, index) in images"
                :key="index"
                class=""
                style="display: flex; align-items: center"
              >
                <a
                  class="card__section__download"
                  :href="image"
                  download="screenshot"
                  style="margin: 2px 5px 2px 0; width: 100%"
                >
                  <img src="@/assets/file.png" alt="file" />
                  <p class="card__section__download__text">
                    Скриншот {{ index + 1 }}
                  </p>
                </a>

                <v-icon
                  icon="mdi-close"
                  size="x-small"
                  color="#8E8E8E"
                  @click="removeImage(index)"
                ></v-icon>
              </div>
              <input
                style="display: none"
                multiple
                type="file"
                @change="onFileChange"
                id="multiFile"
              />
            </div>
            <div class="section__answer__action">
              <v-btn
                class="section__btns"
                style="
                  background: #00ca5d !important;
                  height: 43px;
                  width: 180px;
                "
                @click="addAnswer"
                >Ответить
              </v-btn>
              <a
                class="card__section__download"
                @click="multiFileClick"
                style="cursor: pointer; margin: 0 0 0 20px"
              >
                <img src="@/assets/drop.png" alt="file" />
                <p class="card__section__download__text">Прикрепить файл</p>
              </a>
            </div>
          </v-card>
          <div v-for="(item, index) in newAnswer" :key="index">
            <div
              class="section__after__answer"
              v-if="this.step === 'answered' || this.step === 'answering'"
            >
              <div class="feedback__results">
                <div class="feedback__results__header">
                  <div class="feedback__block__content">
                    <div class="manager">
                      <div class="manager__name">
                        <strong>Мақсым Орынбасар</strong>
                      </div>
                      <div class="manager__action">менеджер 1</div>
                    </div>
                  </div>
                  <div class="feedback__block__cre ated_at">20 часов назад</div>
                </div>
                <div class="feedback__results__body">
                  <div class="feedback__results__message">
                    {{ item.answer }}
                  </div>
                  <div v-if="item.images" style="margin-top: 20px">
                    <div
                      v-for="(image, index) in item.images"
                      :key="index"
                      class=""
                      style="display: flex; align-items: center"
                    >
                      <a
                        class="card__section__download"
                        :href="image"
                        download="screenshot"
                        style="
                          margin: 2px 5px 2px 0;
                          width: 100%;
                          background: #fafafa;
                        "
                      >
                        <img src="@/assets/file.png" alt="file" />
                        <p class="card__section__download__text">
                          Скриншот {{ index + 1 }}
                        </p>
                      </a>
                    </div>
                    <input
                      style="display: none"
                      multiple
                      type="file"
                      @change="onFileChange"
                      id="multiFile"
                    />
                  </div>
                  <v-rating
                    v-model="item.rating"
                    :half-increments="true"
                    :dense="true"
                    :size="24"
                    style="margin-top: 20px"
                  />
                </div>
              </div>

              <div class="feedback__block">
                <div class="feedback__block__content">
                  <img src="@/assets/feedback.png" alt="" />
                  <div class="manager">
                    <div class="manager__name">
                      <strong>Мақсым Орынбасар</strong>, менеджер 1
                    </div>
                    <div class="manager__action">
                      Ответил(-а) на запрос и изменено статус запрос на “<span
                        style="color: #27ae60"
                        >Отвечен</span
                      >”
                    </div>
                  </div>
                </div>
                <div class="feedback__block__created_at">20 часов назад</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-col>
    <v-col cols="12" md="5" sm="12">
      <v-card border density="compact" variant="text" class="status__section">
        <p class="status__section__title">Статус запроса</p>
        <div class="div" v-if="this.step === 'start'"></div>
        <v-btn
          class="button_add"
          v-if="this.step === 'start' || this.step === 'processing'"
        >
          Создан
        </v-btn>
        <v-btn
          class="button_add"
          v-if="this.step === 'processed' || this.step === 'answering'"
          style="background: #f77f00 !important"
        >
          Обработан
        </v-btn>
        <v-btn
          class="button_add"
          v-if="this.step === 'answered'"
          style="background: #32d47b !important"
        >
          Отвечен
        </v-btn>
      </v-card>

      <v-card>
        <v-container>
          <p class="status__section__title">Профиль пользователя</p>
          <v-row justify="center">
            <!-- IMG user -->
            <v-col cols="12" class="text-center" sm="3">
              <img src="@/assets/avatarLarge.png" class="img-fluid" alt="" />
            </v-col>
            <!-- User description -->
            <v-col cols="12" class="text-center" sm="7">
              <p class="user__description__text"><b>Бекімбетова Арайлым </b></p>
              <p class="user__description__text">Администратор школы</p>
              <p class="user__description__text" style="color: #7a7a7a">
                arailym125@gmail.com
              </p>
              <p class="user__description__text">
                Общеобразовательная школа №2
              </p>
            </v-col>
          </v-row>
          <!-- Block stat -->
          <v-row justify="center">
            <v-col cols="10" offset="">
              <v-card style="border-radius: 30px" color="#EBEBFF">
                <v-container>
                  <v-row class="text-center">
                    <v-col>
                      <h2 class="stat__number">5</h2>
                      <p class="stat__title">Общий</p>
                    </v-col>
                    <v-col>
                      <h2 class="stat__number">3</h2>
                      <p class="stat__title">В процессе</p>
                    </v-col>
                    <v-col>
                      <h2 class="stat__number">2</h2>
                      <p class="stat__title">Закрыто</p>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
          <!-- CRUD desription -->
          <v-container>
            <v-row justify="center">
              <v-col cols="11" offset="">
                <v-col>
                  <p class="report__title" style="color: #0075c4">Создано</p>
                  <div class="report">
                    <v-icon
                      icon="mdi-message"
                      size="x-small"
                      color="#8E8E8E"
                    ></v-icon>
                    <p class="report__text">
                      Нет доступа к журналу и критериальным оценки
                    </p>
                  </div>
                  <div class="report">
                    <v-icon
                      icon="mdi-message"
                      size="x-small"
                      color="#8E8E8E"
                    ></v-icon>
                    <p class="report__text">
                      Нет доступа к журналу и критериальным оценки
                    </p>
                  </div>
                </v-col>

                <v-col>
                  <p class="report__title" style="color: #e87700">В процессе</p>
                  <div class="report">
                    <v-icon
                      icon="mdi-forum"
                      size="x-small"
                      color="#8E8E8E"
                    ></v-icon>
                    <p class="report__text">
                      Нет доступа к журналу и критериальным оценки
                    </p>
                  </div>
                  <div class="report">
                    <v-icon
                      icon="mdi-forum"
                      size="x-small"
                      color="#8E8E8E"
                    ></v-icon>
                    <p class="report__text">
                      Нет доступа к журналу и критериальным оценки
                    </p>
                  </div>
                </v-col>

                <v-col>
                  <p class="report__title" style="color: #d62828">Закрыто</p>
                  <div class="report">
                    <v-icon
                      icon="mdi-delete"
                      size="x-small"
                      color="#8E8E8E"
                    ></v-icon>
                    <p class="report__text">
                      Нет доступа к журналу и критериальным оценки
                    </p>
                  </div>
                </v-col>
              </v-col>
            </v-row>
          </v-container>
        </v-container>
      </v-card>
    </v-col>
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
      newAnswer: [],
      data__publicity: 1,
      step: "start",
      options1: [
        "Электронная школа(Mektep.EDUS)",
        "Электронный колледж(College.EDUS)",
        "Дополнительное образование(Zerek.EDUS)",
        "Другие платформы EDUS",
      ],
      organizationOptions: [
        "1",
        "2",
        "3",
        "4",
      ],
      options2: [
        "Проблемы по авторизации",
        "Ошибки в коде программы",
        "Жалобы на работу системы",
        "Требуется исправление информации",
      ],
      selectedOption1: null,
      organizationOption:null,
      selectedOption2: null,
      selectedRadio: null,
      showSelect1: true,
      showOrganization:true,
      showSelect2: true,
      showRadio: true,
      showButton: true,
      showResult: false,
      activeColor: "",
      images: [],
      answer: "",
      rating: 0,
    };
  },
  methods: {
    submitSelections() {
      this.showSelect1 = false;
      this.showOrganization = false;
      this.showSelect2 = false;
      this.showRadio = false;
      this.showButton = false;
      this.showResult = true;
      if (this.selectedRadio == "Срочно") {
        this.activeColor = "#F44336";
      }
    },
    async validate() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        this.submitSelections();
        this.step = "processed";
      }
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files);
    },
    createImage(files) {
      var vm = this;
      for (var index = 0; index < files.length; index++) {
        var reader = new FileReader();
        reader.onload = function (event) {
          const imageUrl = event.target.result;
          vm.images.push(imageUrl);
        };
        reader.readAsDataURL(files[index]);
      }
    },
    removeImage(index) {
      this.images.splice(index, 1);
    },
    multiFileClick() {
      document.getElementById("multiFile").click();
    },
    addAnswer() {
      this.step = "answered";
      this.newAnswer.push({
        images: this.images,
        answer: this.answer,
        rating: this.rating,
      });
      this.images = [];
      this.answer = "";
    },
  },
};
</script>

<style>
.rounded {
  border-radius: 30px;
}
.create-text {
  color: #0075c3;
}
.process-text {
  color: #e87700;
}
.delete-text {
  color: #d62828;
}
</style>
