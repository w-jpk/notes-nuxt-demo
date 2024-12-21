<template>
  <div class="note">
    <h1 class="note__header">Заметки</h1>

    <button class="note__btn note__btn--create" @click="createNote">
      Создать заметку
    </button>

    <div v-for="note in notesStore.notes" :key="note.id" class="item">
      <h2 class="item__header">{{ note.title }}</h2>

      <ul class="item__list">
        <li v-for="todo in note.todos.slice(0, 3)" :key="todo.id">
          <span>{{ todo.text }}</span>
        </li>
      </ul>

      <div class="actions">
        <button class="note__btn" @click="editNote(note.id)">
          Редактировать
        </button>

        <button
          class="note__btn note__btn--delete"
          @click="deleteNote(note.id)">
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNotesStore } from "~/store/notes";
import { useRouter } from "vue-router";

const notesStore = useNotesStore();
const router = useRouter();

const createNote = () => {
  const title = prompt("Введите название заметки");
  if (title) {
    notesStore.addNote(title);
  }
};

const editNote = (id) => {
  router.push(`/note/${id}`);
};

const deleteNote = (id) => {
  if (confirm("Вы уверены, что хотите удалить эту заметку?")) {
    notesStore.deleteNote(id);
  }
};

onMounted(() => {
  notesStore.loadFromLocalStorage();
});
</script>

<style lang="scss" scoped>
.note {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &__header {
    font-size: 2.5rem;
    text-align: center;
    color: #444;
    margin-bottom: 20px;
  }

  &__btn {
    display: inline-block;
    margin: 10px 5px;
    padding: 10px 15px;
    font-size: 1rem;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }

    &--create {
      background-color: #28a745;

      &:hover {
        background-color: #1e7e34;
      }
    }

    &--delete {
      background-color: #dc3545;

      &:hover {
        background-color: #a71d2a;
      }
    }
  }
}

.item {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #fafafa;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  &__header {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #333;
  }

  &__list {
    list-style: none;
    padding: 0;

    li {
      padding: 5px 0;
      border-bottom: 1px dashed #ccc;
      font-size: 1rem;
      color: #555;

      &:last-child {
        border-bottom: none;
      }
    }
  }
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .note {
    padding: 15px;
  }

  .note__header {
    font-size: 2rem;
  }

  .note__btn {
    font-size: 0.9rem;
    padding: 8px 12px;
  }

  .note__item {
    padding: 10px;

    .item__header {
      font-size: 1.2rem;
    }

    .item__list li {
      font-size: 0.9rem;
    }
  }
}
</style>
