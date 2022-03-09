import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import ShareButton from './share-button'
import styles from './styles/footer.css'
const title = 'Shortstories. Стань лучшим автором'
function Footer({ className = '' }) {
  const [origin, setOrigin] = useState(null)
  useEffect(() => {
    setOrigin(window.location.origin)
  }, [origin])
  return (
    <footer className={cn(styles.footer, className)}>
      <div className={styles.bar}>
        <div className={styles.copyright}>
          <div>
            Канал о проекте:{' '}
            <a
              href="tg:
              target="_blank"
              rel="noopener noreferrer"
            >
              ФЭШ
            </a>
          </div>
        </div>
        <div className={styles.share}>
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
    </footer>
  )
}
export default Footer
