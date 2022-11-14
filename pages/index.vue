<template>
  <div class="container card">
    <div class="input">
      <label for="username">Username</label>
      <input name="username" type="text" placeholder="Type in your username" v-model="username">
    </div>

    <div class="input">
      <label for="pass">Password</label>
      <input name="pass" type="password" placeholder="Type in your password" v-model="password">
    </div>

    <div class="input">
      <button @click="login"> Login </button>
      <button @click="Register"> Register </button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data(){
    return{
      username:'',
      password:'',
      users:[{username:'admin',password:'123'}]
    }
  },
  created() {
    this.$nuxt.$on('test', this.test)
  },

  methods: {
    login(){
      
      const tryLogin = {username:this.username,password:this.password}

      if(this.users.some(item => {
        return item.username === tryLogin.username && item.password === tryLogin.password
      })){
        this.$router.push({name:'todo'})
      }
      else{
        this.$message('Login failed! Please check your username or password');
      }
    },
    Register(){
      // console.log('Register clicked')
      this.users.unshift({username:this.username,password:this.password})
    },

    handleClick() {
      this.$nuxt.$emit('test')
    },
    test() {
      console.log('test')
    }
  }

}
</script>

<style lang="less" scoped>
.container {
  width: 40%;
  height: 300px;

  margin: auto;

  transform: translateY(calc(50vh - 50%));

  .input {
    width: 60%;
    margin: 30px auto;


    display: flex;
    justify-content: space-between;

    input {
      flex: 1;
    }

    button{
      width: 40%;

      
    }
  }
}
</style>
