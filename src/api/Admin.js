import {request} from "../axios/request";

const baseUrl = '/Admin'

const AdminApi = {}

AdminApi.getAdminInfo = () => {
  return request({
    url: `${baseUrl}/getAdminInfo`,
    method: 'get'
  })
}

AdminApi.uploadAvatar = admin => {
  return request({
    url: `${baseUrl}/uploadImage`,
    method: 'post',
    data: admin
  })
}

AdminApi.updateInfo = admin => {
  return request({
    url: `${baseUrl}/updateInfo`,
    method: 'post',
    data: admin
  })
}

AdminApi.updatePwd = (oldPassword, password) => {
  return request({
    url: `${baseUrl}/updatePwd`,
    method: 'post',
    params: {
      oldPassword,
      password
    }
  })
}

AdminApi.login = (username, password) => {
  return request({
    url: `${baseUrl}/login`,
    method: 'get',
    params: {
      username,
      password
    }
  })
}

AdminApi.register = admin => {
  return request({
    url: `${baseUrl}/register`,
    method: 'post',
    data: admin
  })
}

export default AdminApi