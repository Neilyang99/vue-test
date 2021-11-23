import request from '@/utils/request'


export function getMediaAnalysis(projectCode) {
  return request({
    url: '/visitorReport/getMediaAnalysis',
    method: 'get',
    params: {
      projectCode: projectCode
    }
  })
}

export function getReportAnalysis(projectCode, type) {
  return request({
    url: '/visitorReport/getReportAnalysis',
    method: 'get',
    params: {
      projectCode: projectCode,
      type: type
    }
  })
}

export function getCauseAnalysis(projectId, type) {
  return request({
    url: '/visitorReport/getCauseAnalysis',
    method: 'get',
    params: {
      projectId: projectId,
      type: type
    }
  })
}

export function getNotDeal(projectCode, type) {
  return request({
    url: '/visitorReport/getNotDealAgain',
    method: 'get',
    params: {
      projectCode: projectCode,
      type: type
    }
  })
}

export function getHouseType(projectId) {
  return request({
    url: '/visitorReport/getHouseType',
    method: 'get',
    params: {
      projectId: projectId
    }
  })
}

export function getSaleStatus(projectId) {
  return request({
    url: '/visitorReport/getSaleStatus',
    method: 'get',
    params: {
      projectId: projectId
    }
  })
}

export function getWeeklyReport(projectId,projectCode) {
  return request({
    url: '/visitorReport/getWeeklyReport',
    method: 'get',
    params: {
      projectId: projectId,
      projectCode: projectCode
    }
  })
}