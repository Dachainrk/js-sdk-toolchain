import { Entity } from '@dcl/ecs'

export interface Props {
  entity: Entity
}

export type SceneInput = {
  layout: {
    parcels: string
  }
}
