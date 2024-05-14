import { CharacterFilter, EpisodeFilter, LocationFilter } from '../interfaces'
import generateQueryString from './generateQueryString'
import get from './get'

export interface GetResource {
  endpoint: 'character' | 'location' | 'episode' | ''
  options: number | number[] | CharacterFilter | LocationFilter | EpisodeFilter
  isIdRequired?: boolean
}

export interface CustomGetResource {
  endpoint: 'character' | 'location' | 'episode' | ''
  query: string;
}

export const getResource = async ({ endpoint, options, isIdRequired = false }: GetResource): Promise<any> => {
  const qs = generateQueryString(options, isIdRequired)

  return get(`${endpoint}/${qs}`)
}

export const getResourceByCustomQuery = async ({ endpoint, query }: CustomGetResource): Promise<any> => {
  return get(`${endpoint}/${query}`)
}

export default {getResource, getResourceByCustomQuery}