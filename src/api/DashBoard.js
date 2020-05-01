import {request} from "../axios/request";

const baseUrl = '/DashBoard'

const DashBoardApi = {}

DashBoardApi.get = () => {
  return request({
    url: `${baseUrl}/DashBoard`,
    method: 'get'
  })
}

DashBoardApi.saveEssay = (essay) => {
  return request({
    url: `${baseUrl}/SaveEssay`,
    method: 'post',
    params: {
      essay: essay
    }
  })
}

export default DashBoardApi