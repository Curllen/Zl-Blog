import {request} from "../axios/request";

const baseUrl = '/Log'

const LogsApi = {}

LogsApi.loadLogs = () => {
  return request({
    url: `${baseUrl}/getLogs`,
    method: 'get'
  })
}

export default LogsApi
