import { ApiResponse, Endpoints } from '../interfaces'
import {getResource} from '../utils/getResource'

export const getEndpoints = (): Promise<ApiResponse<Endpoints>> => getResource({ endpoint: '', options: {} })