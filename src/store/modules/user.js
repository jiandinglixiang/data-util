import { getInfo, login, logout } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  async login(content, userInfo) {
    const { username, password } = userInfo
    const { data } = await login({
      username: username.trim(),
      password: password
    })
    setToken(data.token)
  },

  // get user info
  async getInfo({ commit }) {
    const { data } = await getInfo(getToken())
    if (!data) {
      throw new Error('获取失败')
    }
    const { name, avatar } = data
    commit('SET_NAME', name)
    commit('SET_AVATAR', avatar)
  },

  // user logout
  async logout({ commit }) {
    await logout(getToken())
    removeToken() // must remove  token  first
    resetRouter()
    commit('RESET_STATE')
  },

  // remove token
  resetToken({ commit }) {
    removeToken() // must remove  token  first
    commit('RESET_STATE')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
