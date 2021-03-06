import React, {Component} from 'react'
import {inject, observer } from 'mobx-react'

import styles from './input.scss'

const map = {
  firstName: 'first name',
  lastName: 'last name',
  shirtSize: 'shirt size',
  diet: 'dietary restrictions',
  age: 'age',
  graduationYear: 'grad year',
  transportation: 'transportation',
  school: 'school',
  major: 'major',
  gender: 'gender',
  professionalInterest: 'professional interests',
  github: 'github username',
  linkedin: 'linkedin username (<50 chars)',
  interests: 'interests (optional)',
  isNovice: 'are you a beginner?',
  isPrivate: ' ',
  hasLightningInterest: ' ',
  phoneNumber: 'phone number',
  email: 'email',
  createPassword: 'create password (8+ chars)',
  confirmPassword: 'confirm password',
  resume: 'resume (pdf)',
  teamMember: 'add team member',
  repo: 'repo (optional)',
  description: 'describe idea (optional)',
  name: 'project name (optional)'
}

const formatOption = (str) => {
	if(str == "XL") return str;
	if(str == 'IN_STATE') return 'Driving';
	if(str == 'OUT_OF_STATE') return 'Flying';
	if(str == 'BUS_REQUESTED') return 'Bus Requested';
	if(str == "OTHER") return "I choose not to disclose";
	return str.replace(/_/g, " ").replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})
}

@inject('store') @observer
class Input extends Component {
	checkSelect = (val) => {
		if (val == 'school' && this.props.store.userData[val] == '') return true;
		if (val == 'isNovice' || val == 'isPrivate' || val == 'hasLightningInterest') return false;
		return false;
	}

	checkAgeandYear = (val) => {
		if (this.props.type == 'add-member' || this.props.type == 'member-li') return true;
		if (val == 'interests') return true;
		if (val == 'createPassword' || val == 'confirmPassword') {
            return !(this.props.store.userData[val].length < 8) && (
                this.props.store.userData['createPassword'] ===
                this.props.store.userData['confirmPassword']
            );
		}
		if (this.props.store.userData[val] == '') return false;
		if (val != 'graduationYear' && val != 'age' && val != 'email' && val != 'phoneNumber' && val != 'linkedin') return true;
		if (val == 'email') {
  			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  			return re.test(this.props.store.userData[val]);
		}
		if (val == 'graduationYear') {
			var reg = new RegExp("^[12][0-9]{3}$");
			//console.log(reg.test(this.props.store.userData[val]))
    		return reg.test(this.props.store.userData[val]);
		}
		if (val == 'age') {
			var reg = new RegExp(/^\d{1,2}$/);
			//console.log(reg.test(this.props.store.userData[val]))
    		return reg.test(this.props.store.userData[val]);
		}
		if (val == 'phoneNumber') {
			var reg = new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
			return reg.test(this.props.store.userData[val]);
		}
		if (val == 'linkedin') {
			return (this.props.store.userData[val].length < 50);
		}
	}

	onChange = (e) => {

		const that = this;
		if(this.props.type == 'project') {
			this.props.store.project[this.props.id] = e.target.value;
		}

		if(this.props.type == 'file' && this.refs.fileUpload.files[0] != undefined){
			let reader = new FileReader();
			reader.onload = function() {
				that.props.store.userData.resume = this.result
				that.props.store.isFileSelected = true
			}
			this.props.store.selectedFile = this.refs.fileUpload.files[0].name
			this.props.store.fileSize = this.refs.fileUpload.files[0].size
  		    reader.readAsArrayBuffer(this.refs.fileUpload.files[0]);
		}
		if(this.props.type == 'add-member') {
			this.props.store.teamMember  = e.target.value
		}
		else {
			this.props.store.userData[this.props.id] = e.target.value
			//console.log(this.props.store.userData[this.props.id])
		}
	}

	removeCollaborators = () => {
		this.props.store.collaborators = this.props.store.collaborators.filter((c) => (c != this.props.id));
	}

	addCollaborator = (e) => {
		//PRESSING ENTER
		if(e.keyCode == 13 && this.props.store.collaborators.length <= 8) {
			this.props.store.collaborators.push(this.props.store.teamMember)
			this.props.store.teamMember = '';
		}
	}

	getValue = () => {
		if(this.props.type == 'file') {
			return undefined;
		}
		else if(this.props.type == 'member-li') {
			return this.props.store.collaborators.filter((c)=>(c == this.props.id))[0]
		}
		else if(this.props.type == 'project') {
			return this.props.store.project[this.props.id]
		}
		else if(this.props.type == 'add-member') {
			return this.props.store.teamMember
		}
		else {
			return this.props.store.userData[this.props.id] || ''
		}
	}

	getClassName = () => {
		return this.checkAgeandYear(this.props.id) == false ? styles.red : '' && this.props.type != 'add-member'
	}

	render = () => (
		<div onClick={this.props.type == 'member-li' ? this.removeCollaborators : null} className={[styles['reg-input'], this.props.columns ? styles['user-info'] : '', this.props.type == 'member-li' ? styles['member-li'] : ''].join(' ')}>
    		{
          this.props.options.length != 0 ?
    			<select className={this.checkSelect(this.props.id) ? styles.red : ''} value={this.props.store.userData[this.props.id]} onChange={this.onChange}>
    				{this.props.options.map((option, index) => (
    				    <option key={index} value={option}> {formatOption(option)} </option>
    				))}
    			</select>
    			:
    			<input
                    placeholder={this.props.id == 'teamMember' ? 'Press enter to add team members' : this.props.placeholder}
                    className={this.getClassName()}
                    onKeyUp={this.props.type == 'add-member' ? this.addCollaborator : null }
                    disabled={this.props.type == 'member-li' ? 'disabled' : this.props.disabled || ''} id={this.props.type == 'file' ? 'file' : null }
                    accept='.pdf' ref='fileUpload' type={this.props.type}
                    onChange={this.onChange}
                    value={this.getValue()} />
    		}
    		{this.props.type == 'file' ? <label className={[styles['file-label'], !this.props.store.isFileSelected ? styles.red : ''].join(' ')} htmlFor='file'> {this.props.store.selectedFile || 'Choose a file...'} </label> : null }
    		<span> {this.props.type == 'member-li' ? 'team member' : map[this.props.id] || this.props.id} </span>
		</div>
	)
}

Input.proptypes	= {
	id: React.PropTypes.string.isRequired,
	options: React.PropTypes.array.isRequired,
	password: React.PropTypes.bool
}

/* {this.props.type == 'file' ? <label htmlFor='file'> Choose a file... </label> : null } */

export default Input
