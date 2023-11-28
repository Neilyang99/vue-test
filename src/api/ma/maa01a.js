import request from '@/utils/request'


export function getList(params) {
  return request({
    url: '/maa01a/list',
    method: 'get',
    params
  })
}

export function getListByProject(projectId) {
  return request({
    url: '/maa01a/listByProject',
    method: 'get',
    params:{
      projectId: projectId
    }
  })
}

export function getListByPrjLv2(params) {
  return request({
    url: '/maa01a/listByPrjLv2',
    method: 'get',
    params
  })
}

export function selectItemByLv2(lv2Id) {
  return request({
    url: '/maa92/selectItemByLv2',
    method: 'get',
    params: {
      lv2Id: lv2Id
    }
  })
}

export function save(params) {
  return request({
    url: '/maa01a',
    method: 'post',
    params
  })
}

export function remove(id,projectId,lv2Id) {
  return request({
    url: '/maa01a',
    method: 'delete',
    params: {
      id: id,
      projectId: projectId,
      lv2Id: lv2Id
    }
  })
}

export function exportXls(projectId) {
  return request({
    url: '/maa01a/export',
    method: 'get',
    params:{
      prjId: projectId
    }
  })
}

