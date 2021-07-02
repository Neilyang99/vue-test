import request from '@/utils/request'

export function getList(slb15002) {
  return request({
    url: '/slb15/list',
    method: 'get',
    params:{
      slb15002:slb15002
    }
  })
}

export function save(params) {
  return request({
    url: '/slb15/add',
    method: 'post',
    params
  })
}

export function updateAmt(id, projectNo) {
  return request({
    url: '/slb15/updateAmt',
    method: 'post',
    params: {
      id: id,
      projectNo : projectNo
    }
  })
}

export function remove(id, houseId) {
  return request({
    url: '/slb15',
    method: 'delete',
    params: {
      id: id,
      houseId : houseId
    }
  })
}

export function getSlb15004(projectNo){
  return request({
    url: '/slb15/getSlb15004',
    method: 'get',
    params: {
      slb10004: projectNo
    }
  })
}
