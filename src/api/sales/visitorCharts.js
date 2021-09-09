import request from '@/utils/request'

export function buildingList(params) {
  return request({
    url: '/sla00/selectList',
    method: 'get',
    params
  })
}

export function getCntMotivation(projectNo){
  return request({
    url: '/visitorCharts/getCountBySla10020',
    method: 'get',
    params: {
      projectCode: projectNo
    }
  })
}

export function getCntVisitor(projectNo){
  return request({
    url: '/visitorCharts/getCountBySla10013',
    method: 'get',
    params: {
      projectCode: projectNo
    }
  })
}

export function getCntArea(projectNo){
  return request({
    url: '/visitorCharts/getCountBySla10016',
    method: 'get',
    params: {
      projectCode: projectNo
    }
  })
}

export function getCntVisitType(projectNo){
  return request({
    url: '/visitorCharts/getCountBySla10004',
    method: 'get',
    params: {
      projectCode: projectNo
    }
  })
}