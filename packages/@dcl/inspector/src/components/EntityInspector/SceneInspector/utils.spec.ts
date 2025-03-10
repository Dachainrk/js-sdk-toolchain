import { EditorComponentsTypes } from '../../../lib/sdk/components'
import { Coords } from '../../../lib/utils/layout'
import { SceneInput } from './types'
import { fromScene, getCoordinatesBetweenPoints, getInputValidation, parseParcels, toScene, toSceneAuto } from './utils'

describe('SceneInspector/utils', () => {
  describe('fromScene', () => {
    it('should convert a Scene to a SceneInput', () => {
      const scene: EditorComponentsTypes['Scene'] = {
        layout: {
          base: { x: 1, y: 1 },
          parcels: [
            { x: 1, y: 1 },
            { x: 2, y: 2 }
          ]
        }
      }

      const result = fromScene(scene)

      expect(result).toEqual({
        layout: {
          parcels: '1,1 2,2'
        }
      })
    })
  })

  describe('toScene', () => {
    it('should convert a SceneInput to a Scene', () => {
      const input: SceneInput = {
        layout: {
          parcels: '1,1 2,2'
        }
      }

      const result = toScene(input)

      expect(result).toEqual({
        layout: {
          base: { x: 1, y: 1 },
          parcels: [
            { x: 1, y: 1 },
            { x: 2, y: 2 }
          ]
        }
      })
    })
  })

  describe('toSceneAuto', () => {
    it('should convert a SceneInput to a Scene with auto-generated base and parcels', () => {
      const input: SceneInput = {
        layout: {
          parcels: '1,1 2,2'
        }
      }

      const result = toSceneAuto(input)

      expect(result).toEqual({
        layout: {
          base: { x: 1, y: 1 },
          parcels: [
            { x: 1, y: 1 },
            { x: 1, y: 2 },
            { x: 2, y: 1 },
            { x: 2, y: 2 }
          ]
        }
      })
    })
  })

  describe('parseParcels', () => {
    it('should parse a string of parcels into Coords array', () => {
      const input = '1,1 2,2 3,3'

      const result = parseParcels(input)

      expect(result).toEqual([
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 }
      ])
    })

    it('should return an empty array for invalid input', () => {
      const input = '1,1 2,2 invalid 3,3'

      const result = parseParcels(input)

      expect(result).toEqual([])
    })
  })

  describe('getInputValidation', () => {
    it('should return a validation function that checks for connected parcels', () => {
      const inputValidation = getInputValidation(false)
      const validInput: SceneInput = {
        layout: {
          parcels: '1,1 1,2'
        }
      }
      const invalidInput: SceneInput = {
        layout: {
          parcels: '1,1 2,2'
        }
      }

      const isValidValidInput = inputValidation(validInput)
      const isValidInvalidInput = inputValidation(invalidInput)

      expect(isValidValidInput).toBe(true)
      expect(isValidInvalidInput).toBe(false)
    })

    it('should return a validation function that checks for auto-generated parcels', () => {
      const inputValidation = getInputValidation(true)
      const validInput: SceneInput = {
        layout: {
          parcels: '1,1 2,2'
        }
      }
      const invalidInput: SceneInput = {
        layout: {
          parcels: '1,1 1,2 1,3'
        }
      }

      const isValidValidInput = inputValidation(validInput)
      const isValidInvalidInput = inputValidation(invalidInput)

      expect(isValidValidInput).toBe(true)
      expect(isValidInvalidInput).toBe(false)
    })
  })

  describe('getCoordinatesBetweenPoints', () => {
    it('should return an array of coordinates between two points', () => {
      const pointA: Coords = { x: 0, y: 0 }
      const pointB: Coords = { x: 2, y: 2 }

      const result = getCoordinatesBetweenPoints(pointA, pointB)

      expect(result).toEqual([
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 2, y: 0 },
        { x: 2, y: 1 },
        { x: 2, y: 2 }
      ])
    })

    it('should return an array with a single coordinate when both points are the same', () => {
      const pointA: Coords = { x: 3, y: 3 }
      const pointB: Coords = { x: 3, y: 3 }

      const result = getCoordinatesBetweenPoints(pointA, pointB)

      expect(result).toEqual([{ x: 3, y: 3 }])
    })

    it('should return the bottom-left/top-right parcel as the first & second coords', () => {
      const pointA: Coords = { x: 9, y: 7 }
      const pointB: Coords = { x: 5, y: 3 }

      const result = getCoordinatesBetweenPoints(pointA, pointB)

      expect(result[0]).toEqual({ x: 5, y: 3 })
      expect(result[result.length - 1]).toEqual({ x: 9, y: 7 })
    })
  })
})
