import { PBMeshCollider } from '../../../packages/@dcl/ecs/src/components/generated/pb/decentraland/sdk/components/mesh_collider.gen'
import { Engine, components, ColliderLayer } from '../../../packages/@dcl/ecs/src'

describe('Generated MeshCollider ProtoBuf', () => {
  it('should serialize/deserialize MeshCollider', () => {
    const newEngine = Engine()
    const MeshCollider = components.MeshCollider(newEngine)
    const entity = newEngine.addEntity()
    const entityB = newEngine.addEntity()

    const serializeComponents: PBMeshCollider[] = [
      {
        mesh: { $case: 'cylinder', cylinder: { radiusBottom: 1, radiusTop: 2 } }
      },
      {
        mesh: { $case: 'plane', plane: {} }
      },
      {
        mesh: { $case: 'box', box: {} }
      },
      {
        mesh: { $case: 'sphere', sphere: {} }
      }
    ]

    let previousData = serializeComponents[serializeComponents.length - 1]
    for (const data of serializeComponents) {
      MeshCollider.createOrReplace(entity, data)
      MeshCollider.createOrReplace(entityB, previousData)
      previousData = data

      const buffer = MeshCollider.toBinary(entity)
      MeshCollider.updateFromBinary(entityB, buffer)

      expect(MeshCollider.get(entity)).toEqual({
        ...MeshCollider.getMutable(entityB)
      })

      expect(MeshCollider.createOrReplace(entityB)).not.toEqual({
        ...MeshCollider.getMutable(entity)
      })
    }
  })

  it('should helper creates box MeshCollider', () => {
    const newEngine = Engine()
    const entity = newEngine.addEntity()
    const MeshCollider = components.MeshCollider(newEngine)

    expect(MeshCollider.getOrNull(entity)).toBe(null)
    MeshCollider.setBox(entity)

    expect(MeshCollider.getOrNull(entity)).not.toBe(null)
  })

  it('should helper test all datas', () => {
    const newEngine = Engine()
    const entity = newEngine.addEntity()
    const MeshCollider = components.MeshCollider(newEngine)

    MeshCollider.setBox(entity, ColliderLayer.CL_PHYSICS)
    expect(MeshCollider.get(entity)).toStrictEqual({
      collisionMask: ColliderLayer.CL_PHYSICS,
      mesh: {
        $case: 'box',
        box: {}
      }
    })

    MeshCollider.setCylinder(entity, 1, 0, ColliderLayer.CL_PHYSICS)
    expect(MeshCollider.get(entity)).toStrictEqual({
      collisionMask: ColliderLayer.CL_PHYSICS,
      mesh: {
        $case: 'cylinder',
        cylinder: {
          radiusBottom: 1,
          radiusTop: 0
        }
      }
    })

    MeshCollider.setSphere(entity, ColliderLayer.CL_POINTER)
    expect(MeshCollider.get(entity)).toStrictEqual({
      collisionMask: ColliderLayer.CL_POINTER,
      mesh: {
        $case: 'sphere',
        sphere: {}
      }
    })

    MeshCollider.setPlane(entity, [ColliderLayer.CL_POINTER, ColliderLayer.CL_PHYSICS])
    expect(MeshCollider.get(entity)).toStrictEqual({
      collisionMask: ColliderLayer.CL_POINTER | ColliderLayer.CL_PHYSICS,
      mesh: {
        $case: 'plane',
        plane: {}
      }
    })
  })
})
