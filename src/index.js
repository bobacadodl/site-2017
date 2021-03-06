import React, {Component} from 'react'
import ReactDom from 'react-dom'

import { Router, Route, Link, browserHistory, IndexRoute, withRouter } from 'react-router'

//stores
import { Provider } from 'mobx-react'
import RegistrationStore from './modules/registration/stores'
import LoginStore from './modules/registration/stores/loginStore'
import ResetStore from './modules/registration/stores/resetStore'
import RSVPStore from './modules/registration/stores/rsvpStore'

import App from './modules/app'
import Landing from './modules/landing'
import Registration from './modules/registration'
import Projects from './modules/projects'

//registration sub-pages
import Announcement from './modules/registration/announcement'
import UserInfo from './modules/registration/userinfo'
import Ecosystems from './modules/registration/ecosystems'
import Team from './modules/registration/team'
import Success from './modules/registration/success'

import Login from './modules/registration/login'
import Reset from './modules/registration/reset'
import RSVP from './modules/registration/rsvp'

//PDFs
const OpenSource = () => {
	window.location = 'src/assets/pdf/opensource.pdf'
	return null
}
const Exhibitor = () => {
	window.location = 'src/assets/pdf/exhibitor.pdf'
	return null
}
const Sponsor = () => {
	window.location = 'src/assets/pdf/sponsorship_2017.pdf'
	return null
}
const Hotels = () => {
	window.location = 'src/assets/pdf/hotels.pdf'
	return null
}
const Code = () => {
	window.location = 'src/assets/pdf/code_of_conduct.pdf'
	return null
}

const root = document.getElementById("app")

ReactDom.render(
	<Provider rsvpStore={RSVPStore} resetStore={ResetStore} loginStore={LoginStore} store={RegistrationStore}>
		<Router history={browserHistory}>
			<Route path='/' component={App}>
				<IndexRoute component={Landing}/>
				<Route path='opensource' component={OpenSource}/>
				<Route path='sponsor' component={Sponsor}/>
				<Route path='exhibitor' component={Exhibitor}/>
				<Route path='hotels' component={Hotels}/>
				<Route path='code' component={Code}/>
			</Route>
			<Route path='registration' component={Registration}>
				<IndexRoute component={Announcement}/>
				<Route path='1' component={Announcement}/>
				<Route path='2' component={UserInfo}/>
				<Route path='3' component={Ecosystems}/>
				<Route path='4' component={Team}/>
				<Route path='5' component={Success}/>
			</Route>
			<Route path='login' component={Login}/>
			<Route path='reset' component={Reset}/>
			<Route path='rsvp' component={RSVP}/>
			<Route path='projects' component={Projects}/>
		</Router>
	</Provider>
		, root)

/*
<Route path='registration' component={Registration}>
	<Route path='1' component={Announcement}/>
	<Route path='2' component={UserInfo}/>
	<Route path='3' component={Projects}/>
	<Route path='4' component={Team}/>
	<Route path='5' component={Success}/>
</Route>
*/
