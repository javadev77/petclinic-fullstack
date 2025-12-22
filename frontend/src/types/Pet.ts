import type { PetType } from './PetType'

export interface Pet {
  id: number
  name: string
  birthDate: string
  ownerId: number
  type: PetType
}
