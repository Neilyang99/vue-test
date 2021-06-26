import request from '@/utils/request'


export function getList(params) {
  return request({
    url: '/slb10/list',
    method: 'get',
    params
  })
}

export function save(params) {
  return request({
    url: '/slb10',
    method: 'post',
    params
  })
}

export function remove(id) {
  return request({
    url: '/slb10',
    method: 'delete',
    params: {
      id: id
    }
  })
}

export function getSlb11List(slb11002) {
  return request({
    url: '/slb11/list',
    method: 'get',
    params:{
      slb11002:slb11002
    }
  })
}

export function getHouse(projectNo){
  return request({
    url: '/slb10/getHouse',
    method: 'get',
    params: {
      slb10004: projectNo
    }
  })
}

export function getOnSaleCase(params){
  return request({
    url: '/slb10/getOnSaleCase',
    method: 'get',
    params
  })
}

export function getWeather(){
  return request({
    url: '/slb10/getWeather',
    method: 'get'
  })
}

export function getAttendance(){
  return request({
    url: '/slb10/getAttendance',
    method: 'get'
  })
}

