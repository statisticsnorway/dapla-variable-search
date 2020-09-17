import React from 'react'
import { render } from '@testing-library/react'

import { SearchResultDatasets } from '../components/search'
import { splitSearchResult } from '../utilities'
import { MODEL } from '../configurations'
import { TEST_CONFIGURATIONS } from '../configurations/TEST'
import { RESULTS } from '../enums'

import PersonSearchResult from './test-data/PersonSearchResult.json'

const { language } = TEST_CONFIGURATIONS
const { datasets } = splitSearchResult(PersonSearchResult)
const datasetName = PersonSearchResult[2].unitDataSet.name[0].languageText

const setup = filter => {
  const { getByText, queryByText } = render(
    <SearchResultDatasets datasets={datasets} datasetTypeFilter={filter} language={language} />
  )

  return { getByText, queryByText }
}

test('Renders basics', () => {
  const { getByText } = setup(MODEL.DATASET_TYPES)

  expect(getByText(datasetName)).toBeInTheDocument()
})

test('Filters correctly', () => {
  const { getByText, queryByText } = setup([MODEL.DATASET_TYPES[0]])

  expect(getByText(RESULTS.HAVE_FILTERED(0, 1)[language]))
  expect(queryByText(datasetName)).toBeNull()
})