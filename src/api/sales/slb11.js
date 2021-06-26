import request from '@/utils/request'

export function getList(slb11002) {
  return request({
    url: '/slb11/list',
    method: 'get',
    params:{
      slb11002:slb11002
    }
  })
}

export function save(params) {
  return request({
    url: '/slb11/add',
    method: 'post',
    params
  })
}

export function updateAmt(id, projectNo) {
  return request({
    url: '/slb11/updateAmt',
    method: 'post',
    params: {
      id: id,
      projectNo : projectNo
    }
  })
}

export function remove(id, houseId) {
  return request({
    url: '/slb11',
    method: 'delete',
    params: {
      id: id,
      houseId : houseId
    }
  })
}

export function getSlb11004(projectNo){
  return request({
    url: '/slb11/getSlb11004',
    method: 'get',
    params: {
      slb10004: projectNo
    }
  })
}
