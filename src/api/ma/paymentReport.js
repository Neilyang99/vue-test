import request from '@/utils/request'


export function getPaymentReport(params) {
  return request({
    url: '/maaReport/paymentReport',
    method: 'get',
    params
  })
}


