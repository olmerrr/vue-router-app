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
      // можно так делать главную страницу
      {path: '/',redirect: '/teams'},
      // можно так делать главную страницу

      // а можнои вот так делать главную страницу
      // {path: '/teams',component: TeamsList, alias: '/'},
      // а можнои вот так делать главную страницу

      {path: '/teams',component: TeamsList},
      {path: '/teams/:teamId',component: TeamMembers, props: true},

      {path: '/users',component: UsersList},
      // default route
      // {path: '/:notFaund(.*)', redirect: '/teams'},
      {path: '/:notFaund(.*)', component: TheNotFaund},

      // default route

    ],
    linkActiveClass: 'active',
});
const app = createApp(App);
app.use(router);
app.mount('#app');
