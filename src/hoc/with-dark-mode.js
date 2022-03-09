import React, { useState } from 'react'
import { DarkModeHeader } from '../components'
function withDarkMode(Component) {
  return function WithDarkModeComponent(props) {
    const [mode, setMode] = useState(props.theme)
    return (
      <>
        <DarkModeHeader mode={mode} setMode={setMode} />
        <Component mode={mode} {...props} />
      </>
    )
  }
}
export default withDarkMode
