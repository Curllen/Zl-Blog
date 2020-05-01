import {request} from "../axios/request";

const baseUrl = '/Essay'

const EssaysApi = {}

EssaysApi.All = () => {
  return request({
    url: `${baseUrl}/all`,
    method: 'get'
  })
}

EssaysApi.addEssay = essay => {
  return request({
    url: `${baseUrl}/addEssay`,
    method: 'post',
    data: essay
  })
}

EssaysApi.update = essay => {
  return request({
    url: `${baseUrl}/updateEssay`,
    method: 'post',
    data: essay
  })
}

EssaysApi.delete = id => {
  return request({
    url: `${baseUrl}/delete`,
    method: 'get',
    params: {
      id
    }
  })
}

EssaysApi.query = params => {
  return request({
    url: `${baseUrl}/query`,
    method: 'get',
    params: params
  })
}

export default EssaysApi