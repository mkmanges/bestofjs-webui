import test from 'tape'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import {
  mount
} from 'enzyme'

import setup from '../setup.js'

// Data
import data from '../data/projects.json'
import { getInitialState } from '../../src/getInitialState'
import mapStateToProps from '../../src/containers/HomePage/mapStateToProps'
import rootReducer from '../../src/reducers'

// Components to check
import Home from '../../src/components/home/Home'
import ProjectList from '../../src/components/projects/ProjectList'
import ProjectCard from '../../src/components/projects/ProjectCard'
import populate from '../../src/helpers/populate'

setup()

function getHotProjects (state) {
  return state.githubProjects.daily
    .map(id => state.entities.projects[id])
    .slice(0, 20)
    .map(populate(state.entities.tags))
}

test('Check <ProjectList>', assert => {
  const count = 20
  const state = getInitialState(data)

  const component = mount(
    <MemoryRouter>
      <ProjectList
        projects={getHotProjects(state)}
      />
    </MemoryRouter>
  )
  assert.ok(component, 'The component should exist.')
  const foundProjects = component.find(ProjectCard)
  assert.equal(foundProjects.length, count, 'There should be N projects.')
  assert.end()
})

test('Check <Home> component', (assert) => {
  const state = getInitialState(data)
  const store = createStore(rootReducer, state)

  const props = mapStateToProps(state)

  const component = mount(
    <MemoryRouter>
      <Provider store={store}>
        <Home
          hotProjects={props.hotProjects}
          popularProjects={props.popularProjects}
          uiActions={{}}
          authActions={{}}
          popularTags={props.popularTags}
        />
      </Provider>
    </MemoryRouter>
  )

  assert.ok(component, 'The component should exist.')

  const lists = component.find(ProjectList)

  assert.equal(lists.length, 1, 'There should be 1 lists of projects.')

  assert.end()
})
