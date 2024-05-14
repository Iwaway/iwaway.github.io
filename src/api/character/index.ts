import { ApiResponse, Character, CharacterFilter, Info } from '../interfaces'
import get from '../utils/get';
import {getResource, getResourceByCustomQuery} from '../utils/getResource'

import { QueryKey, useQuery } from '@tanstack/react-query';

const endpoint = 'character'

export const getCharacters = (filters?: CharacterFilter): Promise<ApiResponse<Info<Character[]>>> =>
  getResource({ endpoint, options: filters ?? {} })

export const getCharactersByCustomQuery = <T extends string>(query: T): Promise<ApiResponse<Info<Character[]>>> =>
  getResourceByCustomQuery({endpoint, query})

export const getCharacter = <T extends number | number[]>(
  id: T,
): Promise<ApiResponse<T extends number ? Character : Character[]>> =>
  getResource({ endpoint, options: id, isIdRequired: true })