import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'
import EmptyLayout from '@/components/EmptyLayout/EmptyLayout'

Vue.use(Router)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    disabledBreadcrumb: false    设置为 true 点击breadcrumb不会跳转 默认为会跳转
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/dashboard'),
        meta: { title: '仪表盘', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/user-portrait',
    component: Layout,
    redirect: '/user-portrait/index',
    children: [
      {
        path: 'index',
        name: 'UserPortrait',
        component: () => import('@/views/user-portrait/user-portrait'),
        meta: { title: '用户画像', icon: 'el-icon-user' }
      }
    ]
  },
  {
    path: '/rfm/health-monitoring',
    component: Layout,
    redirect: '/rfm/health-monitoring/index',
    children: [
      {
        path: 'index',
        name: 'HealthMonitoring',
        component() {
          return import('@/views/rfm-health-monitoring/rfm-health-monitoring')
        },
        meta: { title: 'RFM健康监控', icon: 'el-icon-video-camera-solid' }
      },
      {
        hidden: true,
        path: 'days-detail',
        name: 'DaysDetail',
        component() {
          return import('@/views/rfm-health-monitoring/days-detail')
        },
        meta: { title: '每日明细', icon: 'el-icon-video-camera-solid' }
      }
    ]
  },
  {
    path: '/user-analyze',
    component: Layout,
    meta: { title: '用户分析', icon: 'el-icon-data-analysis' },
    redirect: '/user-analyze/add-user',
    children: [
      {
        path: 'add-user',
        name: 'addUser',
        component: () => import('@/views/user-analyze/add-user'),
        meta: { title: '新增用户', icon: 'el-icon-finished' }
      },
      {
        path: 'leave-analyze',
        name: 'leaveAnalyze',
        component: () => import('@/views/user-analyze/leave-analyze'),
        meta: { title: '留存分析', icon: 'el-icon-tickets' }
      },
      {
        path: 'active-analyze',
        component: EmptyLayout,
        meta: {
          title: '活跃分析',
          icon: 'el-icon-s-data',
          disabledBreadcrumb: true
        },
        redirect: '/user-analyze/active-analyze/core-indicators',
        children: [
          {
            path: 'core-indicators',
            name: 'coreIndicators',
            component: () =>
              import('@/views/user-analyze/active-analyze/core-indicators'),
            meta: { title: '关键指标', icon: 'el-icon-pie-chart' }
          },
          {
            path: 'active-constitute',
            name: 'activeConstitute',
            component: () =>
              import('@/views/user-analyze/active-analyze/active-constitute'),
            meta: { title: '活跃构成', icon: 'el-icon-s-order' }
          }
        ]
      }
    ]
  },
  {
    path: '/user-lose-monitoring',
    component: Layout,
    redirect: '/user-lose-monitoring/index',
    children: [
      {
        path: 'index',
        name: 'userLoseMonitoring',
        component: () =>
          import('@/views/user-lose-monitoring/user-lose-monitoring'),
        meta: { title: '流失监控', icon: 'el-icon-video-camera-solid' }
      }
    ]
  },
  {
    path: '/page-analyze',
    component: Layout,
    redirect: '/page-analyze/index',
    children: [
      {
        path: 'index',
        name: 'pageAnalyze',
        component: () => import('@/views/page-analyze/page-analyze'),
        meta: { title: '页面分析', icon: 'el-icon-data-line' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

function sortRoutes(arr) {
  arr.sort(function(item, item2) {
    // 排序
    let title = item?.meta?.title
    let title2 = item2?.meta?.title
    if (item.children?.length > 1) {
      sortRoutes(item.children)
      if (!title) {
        title = item.children?.[0]?.meta?.title
      }
    }
    if (item2.children?.length > 1) {
      sortRoutes(item2.children)
      if (!title2) {
        title2 = item2.children?.[0]?.meta?.title
      }
    }
    return title < title2 ? 1 : 0
  })
}
sortRoutes(constantRoutes)

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
