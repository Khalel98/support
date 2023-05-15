<template>
  <div class="section__header">
    <div class="section__header__title">Часто задаваемых вопросов</div>
    <v-btn class="button_add" @click="addPost"> Добавить вопрос </v-btn>
  </div>
  <div class="search__filter">
    <input
      class="search__filter__input"
      v-model="search"
      placeholder="Поиск"
      style="border-radius: 4px; height: 55px"
    />
  </div>
  <div>
    <label class="universal__label">Выберите категорию</label>
    <v-select
      v-model="category"
      :items="[allCategory, ...categories]"
      variant="outlined"
    ></v-select>
  </div>

  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" v-if="filteredPosts.length === 0">
            <v-alert>Нет воросов</v-alert>
          </v-col>
          <v-col
            class="card__body"
            cols="12"
            sm="12"
            md="6"
            lg="4"
            v-for="(post, index) in displayedPosts"
            :key="post.id"
          >
            <post
              :post="post"
              @edit="editPost(index)"
              @delete="deletePost(index)"
            ></post>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-pagination
              v-model="page"
              :length="numPages"
              @input="goToPage"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-container>
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <div class="post__dialog__title">
            {{ editing ? "Редактировать вопрос" : "Добавить вопрос" }}
          </div>

          <v-card-text>
            <div>
              <label class="universal__label">Вопрос</label>
              <v-text-field
                v-model="title"
                variant="outlined"
                placeholder="Введите вопрос..."
              ></v-text-field>
            </div>
            <div>
              <label class="universal__label">Категория</label>
              <v-select
                v-model="category"
                :items="[...categories]"
                variant="outlined"
                placeholder="Выберите категорию..."
              ></v-select>
            </div>
            <div>
              <label class="universal__label">Ответ</label>
              <v-textarea
                v-model="body"
                variant="outlined"
                placeholder="Введите ответ..."
              ></v-textarea>
            </div>
          </v-card-text>
          <div class="post__dialog__actions">
            <v-btn style="background: #bbbbbb" @click="dialog = false"
              >Отмена</v-btn
            >
            <v-btn v-if="editing" style="background: #27ae60" @click="savePost"
              >Сохранить</v-btn
            >
            <v-btn v-if="!editing" style="background: #0075ff" @click="savePost"
              >Добавить</v-btn
            >
          </div>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import Post from "../components/PostComponent.vue";

export default {
  components: {
    Post,
  },
  data() {
    return {
      posts: [
        {
          id: 1,
          title: "Что делать, если мой компьютер не загружается?",
          body: "Если ваш компьютер не загружается, попробуйте выполнить следующие шаги:Проверьте, включен ли компьютер и подключен ли он к розетке.Попробуйте перезагрузить компьютер, нажав и удержив...",
          category: "News",
        },
        {
          id: 2,
          title: "Что делать, если мой компьютер не загружается?",
          body: "Если ваш компьютер не загружается, попробуйте выполнить следующие шаги:Проверьте, включен ли компьютер и подключен ли он к розетке.Попробуйте перезагрузить компьютер, нажав и удержив...",
          category: "News",
        },
        {
          id: 3,
          title: "Что делать, если мой компьютер не загружается?",
          body: "Если ваш компьютер не загружается, попробуйте выполнить следующие шаги:Проверьте, включен ли компьютер и подключен ли он к розетке.Попробуйте перезагрузить компьютер, нажав и удержив...",
          category: "News",
        },
        {
          id: 4,
          title: "Что делать, если мой компьютер не загружается?",
          body: "Если ваш компьютер не загружается, попробуйте выполнить следующие шаги:Проверьте, включен ли компьютер и подключен ли он к розетке.Попробуйте перезагрузить компьютер, нажав и удержив...",
          category: "News",
        },
        {
          id: 5,
          title: "Что делать, если мой компьютер не загружается?",
          body: "Если ваш компьютер не загружается, попробуйте выполнить следующие шаги:Проверьте, включен ли компьютер и подключен ли он к розетке.Попробуйте перезагрузить компьютер, нажав и удержив...",
          category: "News",
        },
        {
          id: 6,
          title: "Second Post",
          body: "This is the body of the second post.",
          category: "Sports",
        },
        {
          id: 7,
          title: "Third Post",
          body: "This is the body of the third post.",
          category: "Technology",
        },
        {
          id: 8,
          title: "Fourth Post",
          body: "This is the body of the fourth post.",
          category: "News",
        },
      ],
      categories: ["News", "Sports", "Technology"],
      allCategory: "All",
      search: "",
      category: "All",
      dialog: false,
      editing: false,
      title: "",
      body: "",
      editedIndex: -1,
      page: 1,
      itemsPerPage: 6,
    };
  },
  computed: {
    filteredPosts() {
      let filtered = this.posts;
      if (this.search) {
        filtered = filtered.filter((post) =>
          post.title.toLowerCase().includes(this.search.toLowerCase())
        );
      }
      if (this.category !== "All") {
        filtered = filtered.filter((post) => post.category === this.category);
      }
      return filtered;
    },
    numPages() {
      return Math.ceil(this.filteredPosts.length / this.itemsPerPage);
    },
    displayedPosts() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredPosts.slice(start, end);
    },
  },
  methods: {
    addPost() {
      this.dialog = true;
      this.editing = false;
      this.title = "";
      this.body = "";
      this.category = "All";
    },
    editPost(index) {
      const post = this.filteredPosts[index];
      this.dialog = true;
      this.editing = true;
      this.title = post.title;
      this.body = post.body;
      this.category = post.category;
      this.editedIndex = this.posts.indexOf(post);
    },
    deletePost(index) {
      const post = this.filteredPosts[index];
      const i = this.posts.indexOf(post);
      this.posts.splice(i, 1);
    },
    savePost() {
      if (this.editing) {
        const post = this.posts[this.editedIndex];
        post.title = this.title;
        post.body = this.body;
        post.category = this.category;
      } else {
        const id = this.posts.length + 1;
        this.posts.push({
          id,
          title: this.title,
          body: this.body,
          category: this.category,
        });
      }
      this.dialog = false;
    },
    goToPage(page) {
      this.page = page;
    },
  },
};
</script>
