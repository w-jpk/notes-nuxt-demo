import { defineStore } from "pinia";

export const useNotesStore = defineStore("notes", {
  state: () => ({
    notes: [],
    undoStack: [],
    redoStack: [],
  }),

  actions: {
    loadFromLocalStorage() {
      const savedNotes = localStorage.getItem("notes");
      const savedUndoStack = localStorage.getItem("undoStack");
      const savedRedoStack = localStorage.getItem("redoStack");

      if (savedNotes) {
        this.notes = JSON.parse(savedNotes);
      }

      if (savedUndoStack) {
        this.undoStack = JSON.parse(savedUndoStack);
      }

      if (savedRedoStack) {
        this.redoStack = JSON.parse(savedRedoStack);
      }
    },

    saveToLocalStorage() {
      localStorage.setItem("notes", JSON.stringify(this.notes));
      localStorage.setItem("undoStack", JSON.stringify(this.undoStack));
      localStorage.setItem("redoStack", JSON.stringify(this.redoStack));
    },

    addNote(title) {
      const newNote = {
        id: Date.now(),
        title,
        todos: [],
      };
      this.notes.push(newNote);
      this.saveToLocalStorage();
    },

    deleteNote(id) {
      const noteIndex = this.notes.findIndex((note) => note.id === id);
      if (noteIndex !== -1) {
        this.notes.splice(noteIndex, 1);
        this.saveToLocalStorage();
      }
    },

    addTodo(noteId, todoText) {
      const note = this.notes.find((n) => n.id === noteId);
      if (note) {
        note.todos.push({
          id: Date.now(),
          text: todoText,
          completed: false,
        });
        this.saveToLocalStorage();
      }
    },

    deleteTodo(noteId, todoId) {
      const note = this.notes.find((n) => n.id === noteId);
      if (note) {
        const todoIndex = note.todos.findIndex((todo) => todo.id === todoId);
        if (todoIndex !== -1) {
          note.todos.splice(todoIndex, 1);
          this.saveToLocalStorage();
        }
      }
    },

    toggleTodoCompletion(noteId, todoId) {
      const note = this.notes.find((n) => n.id === noteId);
      if (note) {
        const todo = note.todos.find((t) => t.id === todoId);
        if (todo) {
          todo.completed = !todo.completed;
          this.saveToLocalStorage();
        }
      }
    },

    undo() {
      if (this.undoStack.length > 0) {
        const lastAction = this.undoStack.pop();
        this.redoStack.push(lastAction);
        lastAction.revert();
        this.saveToLocalStorage();
      }
    },

    redo() {
      if (this.redoStack.length > 0) {
        const lastAction = this.redoStack.pop();
        this.undoStack.push(lastAction);
        lastAction.execute();
        this.saveToLocalStorage();
      }
    },
  },
});
