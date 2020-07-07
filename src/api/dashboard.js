import request from '@/utils/request'

export function getDashboard(params = {}) {
  return request({
    url: '/dashboard',
    method: 'get',
    params
  })
}
