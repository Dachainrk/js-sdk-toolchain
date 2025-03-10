import { PBUiText } from '@dcl/ecs'

import { parseProps } from '../utils'
import { ReactEcs } from '../../react-ecs'
import { EntityPropTypes } from '../types'
import { UiLabelProps } from './types'
import { getFont, getTextAlign } from './utils'
/**
 *
 * @public
 * Label component
 *
 * A label displays text content
 *
 * @example
 * <Label value="SDK 7" uiTransform={{ margin: { left: 10 } }} />
 *
 * @category Component
 */

/* @__PURE__ */
export function Label(props: EntityPropTypes & UiLabelProps) {
  const { uiTransform, uiBackground, onMouseDown, onMouseUp, ...uiTextProps } = props

  const commonProps = parseProps({
    uiTransform,
    uiBackground,
    onMouseDown,
    onMouseUp
  })
  const { font, textAlign, ...textProps } = uiTextProps
  const uiText: PBUiText = {
    ...textProps,
    ...getFont(font),
    ...getTextAlign(textAlign)
  }

  return <entity {...commonProps} uiText={uiText} />
}
