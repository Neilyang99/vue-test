import request from '@/utils/request'


export function getList(projectId, reportType) {
  return request({
    url: '/maa12/list',
    method: 'get',
    params:{
      maa00ID : projectId,
      reportType : reportType
    }
  })
}

export function save(params) {
  return request({
    url: '/maa12',
    method: 'post',
    params
  })
}

export function remove(id) {
  return request({
    url: '/maa12',
    method: 'delete',
    params: {
      id: id
    }
  })
}


