import { InMemoryTransport } from '@dcl/mini-rpc'
import { UiClient } from './client'
import { UiServer } from './server'
import { selectAssetsTab, toggleComponent, toggleGizmos, togglePanel } from '../../../redux/ui'
import { AssetsTab, PanelName } from '../../../redux/ui/types'

describe('UiRPC', () => {
  const parent = new InMemoryTransport()
  const iframe = new InMemoryTransport()

  parent.connect(iframe)
  iframe.connect(parent)

  const store = { dispatch: jest.fn() }

  const client = new UiClient(parent)
  const _server = new UiServer(iframe, store)

  afterEach(() => {
    store.dispatch.mockReset()
  })

  describe('When using the toggleComponent method of the client', () => {
    it('should send a ui/toggleComponent action in the server', async () => {
      await expect(client.toggleComponent('core::Scene', false)).resolves.not.toThrow()
      expect(store.dispatch).toHaveBeenCalledWith(toggleComponent({ component: 'core::Scene', enabled: false }))
    })
  })

  describe('When using the togglePanel method of the client', () => {
    it('should send a ui/togglePanel action in the server', async () => {
      await expect(client.togglePanel('entities', false)).resolves.not.toThrow()
      expect(store.dispatch).toHaveBeenCalledWith(togglePanel({ panel: PanelName.ENTITIES, enabled: false }))
    })
  })

  describe('When using the toggleGizmos method of the client', () => {
    it('should send a ui/toggleGizmos action in the server', async () => {
      await expect(client.toggleGizmos(false)).resolves.not.toThrow()
      expect(store.dispatch).toHaveBeenCalledWith(toggleGizmos({ enabled: false }))
    })
  })

  describe('When using the selectAssetsTab method of the client', () => {
    it('should send a ui/selectAssetsTab action in the server', async () => {
      await expect(client.selectAssetsTab('AssetsPack')).resolves.not.toThrow()
      expect(store.dispatch).toHaveBeenCalledWith(selectAssetsTab({ tab: AssetsTab.AssetsPack }))
    })
  })
})
