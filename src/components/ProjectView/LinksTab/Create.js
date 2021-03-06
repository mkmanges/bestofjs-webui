import React from 'react'
import PropTypes from 'prop-types'
import LinkReduxForm from './LinkReduxForm'
import { withRouter } from 'react-router-dom'

import ProjectHeader from '../ProjectHeader'
import Tabs from '../Tabs'
import { createLink } from '../../../actions/linkActions'

const submitCreate = history => (project, auth) => {
  return function(values, dispatch) {
    return dispatch(createLink(project, values, auth, history))
  }
}

const CreateLink = ({ project, auth, history }) => {
  const onSave = submitCreate(history)
  return (
    <div>
      <ProjectHeader project={project} />
      <Tabs project={project} activePath="links" />
      <div className="project-tabs-content">
        <div className="inner">
          <h3>
            Add a link related to &quot;{project.name}&quot; project
          </h3>
          <LinkReduxForm
            project={project}
            auth={auth}
            initialValues={{ projects: [project.slug] }}
            onSave={onSave}
          />
        </div>
      </div>
    </div>
  )
}

CreateLink.propTypes = {
  project: PropTypes.object
}

export default withRouter(CreateLink)
// export default () => <p>GO!</p>
