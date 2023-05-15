<template>
  <div class="posts__body">
    <div>
      <h1 class="posts__title">{{ post.title.substring(0, 50) }}</h1>
      <p class="posts__description">
        {{ post.body.substring(0, 180) + "..." }}
      </p>
    </div>

    <div>
      <p class="posts__category">Категория: {{ post.category }}</p>

      <div class="posts__action">
        <v-btn class="posts__action__edit" @click="$emit('edit')"
          >Редактировать</v-btn
        >
        <v-btn class="posts__action__delete" @click="$emit('delete')"
          >Удалить</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    trunCateword(word, maxValue) {
      word.substring(0, maxValue) + "...";
    },
  },
};
</script>
