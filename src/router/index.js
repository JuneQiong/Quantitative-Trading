import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Prediction from '@/components/Prediction'
import KG from '@/components/KG'
import PreSVM from '@/components/PreSVM'
import PreLR from '@/components/PreLR'
import ComSVM from '@/components/ComSVM'
import ComLR from '@/components/ComLR'
import ComLSTM from '@/components/ComLSTM'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path:'/predict',
      name:'Predict',
      component:Prediction
    },

    {
      path:'/kg',
      name:'KG',
      component:KG
    },
    {
      path:'/preSVM',
      name:'PreSVM',
      component:PreSVM
    },
    {
      path:'/preLR',
      name:'PreLR',
      component:PreLR
    },
    {
      path:'/comSVM',
      name:'ComSVM',
      component:ComSVM
    },
    {
      path:'/comLR',
      name:'ComLR',
      component:ComLR
    },
    {
      path:'/comLSTM',
      name:'ComLSTM',
      component:ComLSTM
    },

  ]
})
