const projectTarget = localStorage.getItem('projectTarget')
// 参数	类型	说明
// region	string	地区；mainlan - 国内，overseas - 海外
// project	string	项目；quickapp - 快应用，app_tw - 繁体版，app_en - 英文版，app_vn - 越南版
const state = {
  region: 'mainlan',
  project: 'quickapp'
}
if (projectTarget) {
  try {
    const { region, project } = JSON.parse(projectTarget)
    if (region && project) {
      state.region = region
      state.project = project
    }
  } catch (e) {
    console.error(e)
  }
}
const mutations = {
  CHANGE_PROJECT_TARGET(state, { region, project }) {
    if (region && state.region !== region) {
      state.region = region
    }
    state.project = project ?? ''
    localStorage.setItem(
      'projectTarget',
      JSON.stringify({
        region: state.region,
        project: state.project
      })
    )
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
