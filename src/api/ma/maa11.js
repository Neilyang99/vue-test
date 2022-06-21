import request from '@/utils/request'


export function getList(projectId, reportType) {
  return request({
    url: '/maa11/list',
    method: 'get',
    params:{
      maa00ID : projectId,
      selMaa11003 : reportType
    }
  })
}

export function save(params) {
  return request({
    url: '/maa11',
    method: 'post',
    params
  })
}

export function remove(id) {
  return request({
    url: '/maa11',
    method: 'delete',
    params: {
      id: id
    }
  })
}


