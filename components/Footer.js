import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import ShareButton from './ShareButton'
const StyledFooter = styled.footer`
  height: 60px;
  background-color: ${props => props.theme.white};
  display: flex;
  align-items: center;
  .bar {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    max-width: 1024px;
    padding: 0 24px;
    margin: 0 auto;
  }
  .share {
    display: flex;
    justify-content: flex-end;
    > a {
      margin-left: 12px;
    }
  }
  .copyright {
  }
`
const title = 'Shortstories. Стань лучшим автором'
function Footer() {
  const [origin, setOrigin] = useState(null)
  useEffect(() => {
    setOrigin(window.location.origin)
  }, [origin])
  return (
    <StyledFooter>
      <div className="bar">
        <div className="copyright">
          <div>
            Канал о проекте:{' '}
            <a
              href="tg:
              role="button"
              target="_blank"
              rel="noopener noreferrer"
            >
              ФЭШ
            </a>
          </div>
        </div>
        <div className="share">
          <ShareButton
            href={`https:
            title="Поделиться VK"
            icon="/static/images/icons/vk.svg"
          />
          <ShareButton
            href={`https:
            title="Поделиться в Twitter"
            icon="/static/images/icons/twitter.svg"
          />
          <ShareButton
            href={`https:
            title="Поделиться в Telegram"
            icon="/static/images/icons/telegram.svg"
          />
          <ShareButton
            href={`https:
            title="Поделиться в Facebook"
            icon="/static/images/icons/fb.svg"
          />
        </div>
      </div>
    </StyledFooter>
  )
}
export default Footer
