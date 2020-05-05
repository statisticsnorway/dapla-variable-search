import React, { useContext, useEffect, useState } from 'react'
import useAxios from 'axios-hooks'
import { Divider, Loader, Segment } from 'semantic-ui-react'

import { AppHome, AppMenu, AppSettings, ErrorMessage } from './components'
import { ApiContext, LanguageContext } from './utilities'
import { API } from './configurations'
import { UI } from './enums'

function App () {
  const { restApi } = useContext(ApiContext)
  const { language } = useContext(LanguageContext)

  const [apiReady, setApiReady] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const [{ loading, error }] = useAxios(`${restApi}${API.GET_HEALTH}`)

  useEffect(() => {
    if (!loading && !error) {
      setApiReady(true)
    } else {
      setApiReady(false)
    }
  }, [error, loading])

  return (
    <>
      <AppMenu setSettingsOpen={setSettingsOpen} />
      <Divider />
      <Segment basic>
        {loading ? <Loader active inline='centered' /> :
          error ? <ErrorMessage error={UI.API_ERROR_MESSAGE[language]} /> :
            apiReady && <AppHome />
        }
      </Segment>
      <AppSettings error={error} loading={loading} setSettingsOpen={setSettingsOpen} open={settingsOpen} />
    </>
  )
}

export default App
