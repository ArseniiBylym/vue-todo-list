<template>
  <div v-if="isOpen" class="modal">
    <div class="content">
      <div class="header">
        <h3>{{fields ? 'Edit todo' : 'Create new todo'}}</h3>
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
        <button class="cancel" @click="close">Cancel</button>
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
    ...mapGetters('modal', ['isOpen', 'fields', 'isEdit']),
    isDisabled: function() {
      return !this.title.length || !this.text.length;
    },
  },
  watch: {
    isOpen(newValue, oldValue) {
      if (newValue && this.isEdit) {
        this.setFields();
      }
      if(!newValue) {
         this.title = '';
        this.text = '';
      }
    }
  },
  methods: {
    ...mapActions('modal', ['open', 'close']),
    ...mapActions('todos', ['addTodo', 'updateTodo']),
    async handleSuccess() {
     this.isEdit ? await this.updateTodo({title: this.title, text: this.text, _id: this.fields._id}) : await this.addTodo({title: this.title, text: this.text});
     this.close();
    },
    handleClose() {
      this.title = '';
      this.text = '';
      this.close();
    },
    setFields() {
      this.title = this.fields ? this.fields.title : '';
      this.text = this.fields ? this.fields.text : '';
    }
  },
  mounted() {
    this.setFields
  }

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