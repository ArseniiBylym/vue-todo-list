<template>
  <div v-if="s$modal__isOpen" class="modal">
    <div class="content">
      <div class="header">
        <h3>{{s$modal__getFields ? 'Edit todo' : 'Create new todo'}}</h3>
      </div>
      <div class="form">
        <label>
          Title
          <input type="text" v-model="title" />
        </label>
        <label>
          Text
          <input type="text" v-model="text" />
        </label>
      </div>
      <div class="controls">
        <button class="create" @click="handleSuccess" :disabled="isDisabled">Create</button>
        <button class="cancel" @click="handleClose">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
  data() {
    return {
      title: '',
      text: '',
    };
  },
  computed: {
    ...mapGetters('modal', ['s$modal__isOpen', 's$modal__getFields', 's$modal__isEdit']),
    isDisabled() {
      return !this.title.length || !this.text.length;
    },
  },
  watch: {
    s$modal__isOpen(newValue, oldValue) {
      if (newValue && this.s$modal__isEdit) {
        this.setFields();
      }
      if(!newValue) {
        this.title = '';
        this.text = '';
      }
    }
  },
  methods: {
    ...mapActions('modal', ['s$modal__open', 's$modal__close']),
    ...mapActions('todos', ['s$todos__addTodo', 's$todos__updateTodo']),
    async handleSuccess() {
      
      this.s$modal__isEdit 
        ? await this.s$todos__updateTodo({title: this.title, text: this.text, _id: this.s$modal__getFields._id})
        : await this.s$todos__addTodo({title: this.title, text: this.text})
      this.s$modal__close();
    },
    handleClose() {
      this.title = '';
      this.text = '';
      this.s$modal__close();
    },
    setFields() {
      this.title = this.s$modal__getFields.title || '';
      this.text = this.s$modal__getFields.text || '';
    }
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content {
  width: 400px;
  padding: 2rem;
  background-color: white;
}
.form {
  label {
    display: block;
    width: 100%;
    margin: 1rem auto;
    display: flex;
    flex-flow: row;
    input {
      flex-grow: 1;
      margin-left: 1rem;
    }
  }
}
.controls {
  margin-top: 1rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-evenly;
}
</style>