import {createRouter, createWebHistory, RouterView} from 'vue-router'
import {Dashboard, BrowserCheck} from '@vicons/tabler'
import {IdManagement, CicsSystemGroup} from '@vicons/carbon'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layout/Layout.vue'),
      meta: {title: '首页'},
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: RouterView,
          redirect: '/dashboard/analysis',
          meta: {title: 'Dashboard', icon: Dashboard},
          children: [
            {
              path: 'analysis',
              name: 'Analysis',
              component:() =>  import('@/views/dashboard/Analysis.vue'),
              meta: {title: '分析页'}
            },
            {
              path: 'workbench',
              name: 'Workbench',
              component:() =>  import('@/views/dashboard/Workbench.vue'),
              meta: {title: '工作台'}
            },
          ]
        },
        {
          path: '/system',
          name: 'System',
          component: RouterView,
          meta: {title: '系统管理', icon: CicsSystemGroup},
          children: [
            {
              path: '/account',
              name: 'Account',
              component: () => import('@/views/system/Account.vue'),
              meta: {title: '账号管理'}
            }
          ]
        },
        {
          path: '/recruitment',
          name: 'Recruitment',
          component: RouterView,
          meta: {title: '招聘管理', icon: IdManagement},
          children: [
            {
              path: 'job',
              name: 'Job',
              component: () => import('@/views/recruitment/Job.vue'),
              meta: {title: '职位管理'}
            },
            {
              path: 'job-post',
              name: 'Job-post',
              component: () => import('@/views/recruitment/JobPost.vue'),
              meta: {title: '职位发布'}
            },
            {
              path: 'resume',
              name: 'Resume',
              component: () => import('@/views/recruitment/Resume.vue'),
              meta: {title: '简历管理'}
            },
            {
              path: 'candidate',
              name: 'Candidate',
              component:() =>  import('@/views/recruitment/Candidate.vue'),
              meta: {title: '候选人管理'}
            },
            {
              path: 'interview',
              name: 'Interview',
              component:() =>  import('@/views/recruitment/Interview.vue'),
              meta: {title: '面试管理'}
            },
          ]
        },
        {
          path: '/attendance',
          name: 'Attendance',
          component: RouterView,
          meta: {title: '考勤管理', icon: BrowserCheck},
          children: [
            {
              path: '/check',
              name: 'Check',
              component: () => import('@/views/attendance/Attendance.vue'),
              meta: {title: '考勤打卡'}
            },
            {
              path: '/leave',
              name: 'Leave',
              component: () => import('@/views/attendance/Leave.vue'),
              meta: {title: '请假管理'}
            },
            {
              path: '/overtime',
              name: 'Overtime',
              component: () => import('@/views/attendance/Overtime.vue'),
              meta: {title: '加班管理'}
            },
          ]
        }
      ]
    }
  ]
})


export default router
