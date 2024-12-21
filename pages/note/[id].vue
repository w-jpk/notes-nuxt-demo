<template>
  <div class="note">
    <h1 class="note__header">Редактирование заметки</h1>

    <input
      class="note__input"
      v-model="note.title"
      placeholder="Название заметки" />

    <ul class="item">
      <li class="item__list" v-for="todo in note.todos" :key="todo.id">
        <input
          class="item__checkbox"
          type="checkbox"
          v-model="todo.completed" />

        <input class="item__input" v-model="todo.text" />

        <button
          class="item__btn item__btn--delete"
          @click="deleteTodo(todo.id)">
          Удалить
        </button>
      </li>
    </ul>

    <button class="note__btn note__btn--create" @click="addTodo">
      Добавить задачу
    </button>

    <div class="actions">
      <button class="note__btn note__btn--save" @click="saveNote">
        Сохранить
      </button>

      <button class="note__btn note__btn--cancel" @click="cancelEdit">
        Отменить
      </button>
    </div>
  </div>
</template>

<script setup>
import { useNotesStore } from "~/store/notes";
import { useRouter } from "vue-router";

const router = useRouter();
const noteId = router.currentRoute.value.params.id;
const notesStore = useNotesStore();
const note = notesStore.notes.find((n) => n.id === parseInt(noteId));

const addTodo = () => {
  const text = prompt("Введите задачу");
  if (text) {
    notesStore.addTodo(note.id, text);
  }
};

const deleteTodo = (todoId) => {
  notesStore.deleteTodo(note.id, todoId);
};

const saveNote = () => {
  router.push("/");
};

const cancelEdit = () => {
  if (confirm("Вы уверены, что хотите отменить изменения?")) {
    router.push("/");
  }
};
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
    font-size: 2rem;
    text-align: center;
    color: #444;
    margin-bottom: 20px;
  }

  &__input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    &:focus {
      outline: none;
      border-color: #007bff;
    }
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
        background-color: #218838;
      }
    }

    &--save {
      background-color: #17a2b8;
      &:hover {
        background-color: #117a8b;
      }
    }

    &--cancel {
      background-color: #6c757d;
      &:hover {
        background-color: #5a6268;
      }
    }
  }
}

.item {
  list-style: none;
  padding: 0;

  &__list {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fafafa;
  }

  &__checkbox {
    margin-right: 10px;
  }

  &__input {
    flex: 1;
    padding: 5px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    &:focus {
      outline: none;
      border-color: #007bff;
    }
  }

  &__btn {
    margin-left: 10px;
    padding: 5px 10px;
    font-size: 0.9rem;
    color: #fff;
    background-color: #dc3545;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #a71d2a;
    }
  }
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .note {
    padding: 15px;

    &__header {
      font-size: 1.8rem;
    }

    &__btn {
      font-size: 0.9rem;
      padding: 8px 12px;
    }

    &__input {
      font-size: 0.9rem;
    }
  }

  .item__list {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
