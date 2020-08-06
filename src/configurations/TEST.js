import { API } from './'
import { LANGUAGE } from '@statisticsnorway/dapla-js-utilities'

const errorString = 'A problem occured'

export const TEST_CONFIGURATIONS = {
  alternativeApi: 'http://localhost:9999',
  apiContext: (fn, fn2) => ({
    graphqlApi: `${process.env.REACT_APP_API}${API.GRAPHQL}`,
    restApi: process.env.REACT_APP_API,
    setRestApi: fn,
    setGraphqlApi: fn2
  }),
  errorObject: { response: { data: errorString } },
  language: LANGUAGE.LANGUAGES.NORWEGIAN.languageCode,
  otherLanguage: LANGUAGE.LANGUAGES.ENGLISH.languageCode
}
