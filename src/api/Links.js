import {request} from "../axios/request";

const baseUrl = '/Link'

const LinksApi = {}

LinksApi.All = () => {
  return request({
    url: `${baseUrl}/all`,
    method: 'get'
  })
}

LinksApi.addLink = link => {
  return request({
    url: `${baseUrl}/addLink`,
    method: 'post',
    data: link
  })
}

LinksApi.update = link => {
  return request({
    url: `${baseUrl}/updateLink`,
    method: 'post',
    data: link
  })
}

LinksApi.delete = id => {
  return request({
    url: `${baseUrl}/delete`,
    method: 'get',
    params: {
      id
    }
  })
}

export default LinksApi