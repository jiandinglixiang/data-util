const projectTarget = localStorage.getItem('projectTarget')
// 参数	类型	说明
// area	string	地区；mainlan - 国内，overseas - 海外
// project	string	项目；quickapp - 快应用，app_tw - 繁体版，app_en - 英文版，app_vn - 越南版
const state = {
  currentDataPath: {
    area: 'mainlan',
    project: 'quickapp'
  }
}
if (projectTarget) {
  try {
    const { area, project } = JSON.parse(projectTarget)
    if (area && project) {
      state.currentDataPath = { area, project }
    }
  } catch (e) {
    console.error(e)
  }
}
const mutations = {
  CHANGE_PROJECT_TARGET(state, { area, project }) {
    state.currentDataPath = { area, project }
    localStorage.setItem('projectTarget', JSON.stringify(state.currentDataPath))
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
