import { Meteor } from "meteor/meteor"
import { Template } from 'meteor/templating';
import { Messages } from "../imports/api/messages.js"

import './main.html';

import { Accounts } from "meteor/accounts-base"

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
})

Template.chat.helpers({
  messages() {
    return Messages.find()
  },
  getUsername(userId){
    if(userId){
      const user = Meteor.users.findOne(userId);
      if(user) 
        return user.username
    }
  },
  formatDate(date){
    return date.toLocaleString()
  }
});

Template.chat.events({
  'submit #chat-form'(event, instance) {
    event.preventDefault()
    const text = event.target.text.value
    Meteor.call('messages.insert', text, (err) => {
      if (err) {
        alert(err.message)
      } else {
        event.target.reset();
      }
    })

  },
});
