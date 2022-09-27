import request from '@/utils/request'


export function getList(params) {
  return request({
    url: '/maa16/list',
    method: 'get',
    params
  })
}

export function save(params) {
  return request({
    url: '/maa16',
    method: 'post',
    params
  })
}

export function remove(id) {
  return request({
    url: '/maa16',
    method: 'delete',
    params: {
      id: id
    }
  })
}

export function getMaxPeriod(maa00ID) {
  return request({
    url: '/maa16/getMaxPeriod',
    method: 'get',
    params:{
      maa00ID: maa00ID
    }
  })
}