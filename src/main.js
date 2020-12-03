import { createApp } from 'vue';
import {createRouter, createWebHistory} from 'vue-router';
import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import UsersList from './components/users/UsersList.vue';
import TheNotFaund from './components/nav/TheNotFaund.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [

      {path: '/',redirect: '/teams'},
      { name: 'teams',
        path: '/teams',component: TeamsList, children:[
        { name:'team-members',
          path: ':teamId',component: TeamMembers, props: true},
      ]},
      {path: '/users',component: UsersList},
      {path: '/:notFaund(.*)', component: TheNotFaund},

    ],
    linkActiveClass: 'active',
});
const app = createApp(App);
app.use(router);
app.mount('#app');
