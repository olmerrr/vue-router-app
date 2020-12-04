<template>
<div class="form-controll">
  <button @click="confirmInput">Confirm</button>
  <button @click="saveChanges">Save Changes ({{changesSaved}})</button>
 </div>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from '../components/users/UserItem.vue';

export default {
  components: {
    UserItem,
  },
  data() {
    return {
      changesSaved: false,
    };
  },
  inject: ['users'],
  methods: {
    confirmInput() {
      console.log('COnfirm');
      this.$router.push('/teams');
      // this.$router.back('/');
      // this.$router.forward();
    },
    saveChanges() {
      this.changesSaved = true;
    },
  },
  beforeRouteEnter(to, from, next) {
    console.log('UsersList Cmp beforeRouteEnter');
    console.log(to, from);
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log('UserList CMP beforeRouteLeave..');
    console.log(to, from);
    if (this.changesSaved){
      next();
    } else {
        const userWantToLeave = confirm('Are you sure? You got unsaved changes');
        next(userWantToLeave);
    }
},
  unmounted(){
    console.log('Unmounted..');
  },
};
</script>

<style scoped>
.form-controll {
  padding: 10px; 
}
.form-controll button {
  cursor: pointer;
  margin-right: 20px;
}
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>