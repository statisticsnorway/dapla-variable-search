import React, { useContext, useState } from 'react'
import { Button, Container, Divider, Form, Grid, Header, Icon, List, Modal, Segment } from 'semantic-ui-react'
import { ErrorMessage, InfoPopup, InfoText, SSB_COLORS, SSB_STYLE } from '@statisticsnorway/dapla-js-utilities'

import { ApiContext, LanguageContext } from '../utilities'
import { API } from '../configurations'
import { SETTINGS, TEST_IDS } from '../enums'

function AppSettings ({ error, loading, open, setSettingsOpen }) {
  const { language } = useContext(LanguageContext)
  const { restApi, setRestApi, setGraphqlApi } = useContext(ApiContext)

  const [apiUrl, setApiUrl] = useState(restApi)
  const [settingsEdited, setSettingsEdited] = useState(false)

  const setDefaults = () => {
    setApiUrl(process.env.REACT_APP_API)
    setRestApi(process.env.REACT_APP_API)
    setGraphqlApi(`${process.env.REACT_APP_API}${API.GRAPHQL}`)
    setSettingsEdited(false)
  }

  return (
    <Modal open={open} onClose={() => setSettingsOpen(false)} style={SSB_STYLE}>
      <Header as='h2' style={SSB_STYLE}>
        <Icon name='cog' style={{ color: SSB_COLORS.GREEN }} />
        {SETTINGS.HEADER[language]}
      </Header>
      <Modal.Content as={Segment} basic loading={loading} style={SSB_STYLE}>
        <Form size='large'>
          <Form.Input
            value={apiUrl}
            disabled={loading}
            label={SETTINGS.API[language]}
            error={!!error && !settingsEdited}
            placeholder={SETTINGS.API[language]}
            onChange={(event, { value }) => {
              setApiUrl(value)
              setSettingsEdited(true)
            }}
          />
        </Form>
        {!loading && !settingsEdited && error && <ErrorMessage error={error} language={language} />}
        <Container style={{ marginTop: '1em' }}>
          {settingsEdited && <InfoText text={SETTINGS.EDITED_VALUES[language]} />}
          <Divider hidden />
          <Grid columns='equal'>
            <Grid.Column>
              <Button
                primary
                size='large'
                disabled={loading}
                onClick={() => {
                  setRestApi(apiUrl)
                  setGraphqlApi(`${apiUrl}${API.GRAPHQL}`)
                  setSettingsEdited(false)
                }}
              >
                <Icon name='sync' style={{ paddingRight: '0.5em' }} />
                {SETTINGS.APPLY[language]}
              </Button>
            </Grid.Column>
            <Grid.Column textAlign='right'>
              <InfoPopup
                position='left center'
                text={SETTINGS.RESET_SETTINGS[language]}
                trigger={
                  <Icon
                    link
                    fitted
                    name='undo'
                    size='large'
                    onClick={() => setDefaults()}
                    style={{ color: SSB_COLORS.BLUE }}
                    data-testid={TEST_IDS.DEFAULT_SETTINGS_BUTTON}
                  />
                }
              />
            </Grid.Column>
          </Grid>
        </Container>
      </Modal.Content>
      <Container fluid textAlign='center'>
        <Divider />
        <List horizontal divided link size='small' style={{ marginTop: '3em', marginBottom: '3em' }}>
          <List.Item as='a' href={`${process.env.REACT_APP_SOURCE_URL}`} icon={{ fitted: true, name: 'github' }} />
          <List.Item content={`${SETTINGS.APP_VERSION[language]}: ${process.env.REACT_APP_VERSION}`} />
        </List>
      </Container>
    </Modal>
  )
}

export default AppSettings
