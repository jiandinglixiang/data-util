import request from '@/utils/request'

export function getRFMData(params = {}) {
  return request({
    url: '/rfm',
    method: 'get',
    params
  })
}
