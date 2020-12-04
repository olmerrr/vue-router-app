import {
  createApp
} from 'vue';
import {
  createRouter,
  createWebHistory
} from 'vue-router';
import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import UsersList from './components/users/UsersList.vue';
import TheNotFaund from './components/nav/TheNotFaund.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import UsersFooter from './components/users/UsersFooter.vue';


const router = createRouter({
  history: createWebHistory(),
  routes: [

    {
      path: '/',
      redirect: '/teams'
    },
    {
      name: 'teams',
      path: '/teams',
      meta: { needsAuth: true},
      components: {
        default: TeamsList,
        footer: TeamsFooter
      },
      children: [{
        name: 'team-members',
        path: ':teamId',
        component: TeamMembers,
        props: true
      }, ]
    },
    {
      path: '/users',
      components: {
        default: UsersList,
        footer: UsersFooter
      },
      beforeEnter(to, from, next) {
        console.log('Users before Enter..');
        console.log(to, from);
        next();
      },    
  },
    {
      path: '/:notFaund(.*)',
      component: TheNotFaund
    },

  ],
  linkActiveClass: 'active',
  scrollBehavior(_, _2, savedPosition) {
    // console.log(to, from, savedPosition);
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        left: 0,
        top: 0
      }
    }
  },
});
router.beforeEach(function (to, from, next) {
  console.log('Global beforeEach..');
  console.log(to, from);
  if (to.meta.needsAuth){
    console.log('Needs auth!');
    next();
  } else {
    next();
  }
  // if (to.name === 'team-members'){
  //   next();
  // } else {
  //   next({name: 'team-members', params: {teamId: 't2'}});
  // }
  next();
});
router.afterEach(function(to, from) {
  // sending analitics data
  console.log("Global afterEach...");
  console.log(to, from);

});

const app = createApp(App);

app.use(router);
app.mount('#app');
