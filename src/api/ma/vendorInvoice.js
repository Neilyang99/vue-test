import request from '@/utils/request'

export function projectList() {
  return request({
    url: '/maa00/selectList',
    method: 'get'
  })
}

export function getList(params) {
  return request({
    url: '/maa02/listByProject',
    method: 'get',
    params
  })
}


