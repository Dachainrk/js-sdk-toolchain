import { memo, useCallback, useState } from 'react'
import cx from 'classnames'
import { VscQuestion as QuestionIcon } from 'react-icons/vsc'
import { AiOutlineInfoCircle as InfoIcon } from 'react-icons/ai'
import { FiAlertTriangle as WarningIcon } from 'react-icons/fi'
import { Popup } from 'decentraland-ui/dist/components/Popup/Popup'
import { Props } from './types'
import './InfoTooltip.css'

export default memo<Props>(({ text, link, trigger, type = 'info', onOpen, onClose, ...rest }) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>, data: Props['data']) => {
      setIsHovered(true)
      onOpen && onOpen(event, data)
    },
    [setIsHovered, onOpen]
  )

  const handleClose = useCallback(
    (event: React.MouseEvent<HTMLElement>, data: Props['data']) => {
      setIsHovered(false)
      onClose && onClose(event, data)
    },
    [setIsHovered, onClose]
  )

  const renderIconTrigger = useCallback(() => {
    switch (type) {
      case 'info':
        return <InfoIcon size={16} />
      case 'warning':
        return <WarningIcon size={16} />
      default:
        return <QuestionIcon size={16} />
    }
  }, [type])

  return (
    <Popup
      className="InfoTooltip"
      content={
        <>
          {text}{' '}
          {link ? (
            <a href={link} target="_blank">
              Learn more
            </a>
          ) : null}
        </>
      }
      trigger={
        <span className={cx('InfoTooltipTrigger', { hovered: isHovered })}>{trigger ?? renderIconTrigger()}</span>
      }
      position="right center"
      on="hover"
      hideOnScroll
      hoverable
      onOpen={handleOpen}
      onClose={handleClose}
      {...rest}
    />
  )
})
