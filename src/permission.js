import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// auth文件主要依赖js-cookie模块，把getToken，setToken，removeToken设置在这里
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration
// 免登录的⽩名单,⽩名单通常装着登录页或扫码下载页
const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  // 设置页⾯标题
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  // 查看有没有token储存在cookie中
  const hasToken = getToken()
 // 参考：https://blog.csdn.net/yezonggang/article/details/109809019
 // 许要军2022.08.02 add 有token，如果想去login则调到首页，如果是其他页面先判定是否有角色，有的话就跳过去，没有的话发请求得到永不信息，再调用函数维护store路由列表，报错要么没权限，要么是请求超时，就要返回error，清除token，返回登录页
  if (hasToken) {
    if (to.path === '/login') {
      // 如果即将要去登录页，则重定向到⾸页
      // 这种情况⼀般不是应⽤于退出登录，⼤多因为有⼈在路径中⼿动输⼊/login     来进⾏路由跳转
      // 所以，直接回到⾸页
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      // 查看该⽤户是否获得许可该⾓⾊可以进⼊那页⾯（注释翻译）
      // 个⼈理解：去仓库中查看有没有存储个⼈信息
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo')

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    // 没有token，且不是白名单内的，返回登录页
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
