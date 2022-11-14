<template>
    <div id="root">
          <div class="todo-container">
              <div class="todo-wrap">
                  <MyHeader @addTodos="addTodo"/>
                  <List :todos="todos"/>
                  <MyFooter :todos="todos" @checkAllTodo="checkAllTodo" @deleteAllTodo="deleteAllTodo"/>
              </div>
          </div>
      </div>
  </template>
  
  <script>
  import MyHeader from '../components/MyHeader.vue'
  import MyFooter from '../components/MyFooter.vue'
  import List from '../components/List.vue'
  
  
  export default {
    name: 'App',
    components: {
      MyHeader,
      List,
      MyFooter,
      
    },
    data(){
        return {
            // todos:this.$auth.$storage.getLocalStorage('todos') ? JSON.parse(this.$auth.$storage.getLocalStorage('todos')) : []
            todos:[]
        }
    },
    created(){
      this.todos = this.$auth.$storage.getLocalStorage('todos') ? (this.$auth.$storage.getLocalStorage('todos')) : []
    },  
    methods: {
  
      //添加一个todo
      addTodo(todoObj){
        this.todos.unshift(todoObj)
      },
  
      //勾选or取消勾选一个todo
      checkTodo(id){
        this.todos.forEach((todo)=>{
          if(todo.id === id) todo.done = !todo.done
        })
      },
  
      //全部勾选or全部取消勾选
      checkAllTodo(done){
        this.todos.forEach(todo => {
          todo.done = done
        });
      },
  
      //删除一个todo
      deleteTodo(id){
        this.todos = this.todos.filter( (todo)=>{
            return todo.id !== id
        })
      },
  
      //删除所有已完成的todo
      deleteAllTodo(){
        this.todos = this.todos.filter(todo =>{
          return !todo.done
        })
      },
      updateTodo(id,title){
        this.todos.forEach(todo => {
          if(todo.id === id) todo.title = title
        });
      }
    },
    watch:{
      todos:{
        deep:true,
        handler(newValue){
          this.$auth.$storage.setLocalStorage('todos',JSON.stringify(newValue))
        }
      }
    },
    mounted() {
      console.log(this.$auth.$storage.getLocalStorage('todos'))
      this.$nuxt.$on('checkTodo',this.checkTodo)
      this.$nuxt.$on('deleteTodo',this.deleteTodo)
      this.$nuxt.$on('updateTodo',this.updateTodo)
    },
    beforeDestroy() {
      this.$nuxt.$off('checkTodo')
      this.$nuxt.$off('deleteTodo')
      this.$nuxt.$off('updateTodo')
    },
  }
  </script>
  
  <style scoped>
    /*base*/
    body {
      background: #fff;
    }
    .btn {
      
      padding: 4px 12px;
      margin-bottom: 0;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      vertical-align: middle;
      cursor: pointer;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
      border-radius: 4px;
    }
    .btn-edit {
      color: #fff;
      background-color: skyblue;
      border: 1px solid rgb(99, 157, 180);
      margin-right: 5px;
    }
    .btn-danger {
      color: #fff;
      background-color: #da4f49;
      border: 1px solid #bd362f;
    }
    .btn-danger:hover {
      color: #fff;
      background-color: #bd362f;
    }
    .btn:focus {
      outline: none;
    }
    .todo-container {
      width: 600px;
      margin: 0 auto;
    }
    .todo-container .todo-wrap {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
  </style>
  