import { Engine, components } from '../../../packages/@dcl/ecs/src'
import { testComponentSerialization } from './assertion'

describe('Generated RaycastResult ProtoBuf', () => {
  it('should serialize/deserialize RaycastResult', () => {
    const newEngine = Engine()
    const RaycastResult = components.RaycastResult(newEngine)

    testComponentSerialization(RaycastResult, {
      timestamp: 12,
      origin: { x: 1, y: 2, z: 4 },
      direction: { x: 1, y: 2, z: 4 },
      hits: [
        {
          position: { x: 1, z: 2, y: 3 },
          origin: { x: 1, z: 2, y: 3 },
          meshName: '{ x: 1, z: 2, y: 3 }',
          entityId: 123,
          normalHit: { x: 1, z: 2, y: 3 },
          length: 2,
          direction: { x: 1, z: 2, y: 3 }
        }
      ]
    })

    testComponentSerialization(RaycastResult, {
      timestamp: 0,
      origin: undefined,
      direction: undefined,
      hits: []
    })
  })
})
