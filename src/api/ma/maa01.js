import request from '@/utils/request'


export function getList(params) {
  return request({
    url: '/maa01/list',
    method: 'get',
    params
  })
}

export function save(params) {
  return request({
    url: '/maa01',
    method: 'post',
    params
  })
}

export function remove(id) {
  return request({
    url: '/maa01',
    method: 'delete',
    params: {
      id: id
    }
  })
}

export function selectBudget(params) {
  return request({
    url: '/maa92/selectBudget',
    method: 'get',
    params
  })
}

