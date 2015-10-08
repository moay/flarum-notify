import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import LoadingIndicator from 'flarum/lib/components/LoadingIndicator';

export default class TestConnectorsModal extends Modal {
  constructor(...args) {
    super(...args);

    this.slack = {};
    this.slack.token = m.prop(app.config['notify.slack.token'] || '');
    this.slack.channel = m.prop(app.config['notify.slack.channel'] || '');

    this.hipchat = {};
    this.hipchat.token = m.prop(app.config['notify.hipchat.token'] || '');
    this.hipchat.room = m.prop(app.config['notify.hipchat.room'] || '');

    this.gitter = {};
    this.gitter.webhook = m.prop(app.config['notify.gitter.webhook'] || '');

    this.testStatus = m.prop('Preparing...');

    this.runConnectorTest();
  }

  className() {
    return 'TestConnectorsModal Modal--small';
  }

  title() {
    return 'Testing your settings';
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="statusMessage">{this.testStatus()}</div>
      </div>
    );
  }

  runConnectorTest(){
    switch(this.props.connector){
      case 'slack':
        this.runSlackTest();
        break;
      case 'hipchat':
        this.runHipChatTest();
        break;
      case 'gitter':
        this.runGitterTest();
        break;
    }
  }

  runSlackTest(){
    if(this.slack.token() === '' || this.slack.channel() === ''){
      this.testStatus('Please fill in token and channel first.');
    }
    else{
      this.testStatus('Testing...');
      m.request({method: "GET", url: "/api/notify/test/slack"})
      .then((response) => {
        if(response.success === true){
          this.testStatus('Your Slack token seems to work fine. Make sure to provide an existing channel.');
        }
        else
        {
          this.testStatus('Your Slack token is invalid.');
        }
      });
    }
  }

  runHipChatTest(){
    if(this.hipchat.token() === '' || this.hipchat.room() === ''){
      this.testStatus('Please fill in token and room first.');
    }
    else{
      this.testStatus('Testing...');
      m.request({method: "GET", url: "/api/notify/test/hipchat"})
      .then((response) => {
        if(response.success === true){
          this.testStatus('Hipchat notifications should work. A test message has been posted to your room.');
        }
        else
        {
          this.testStatus('Your token is invalid or the token cannot access your room.');
        }
      });
    }
  }

  runGitterTest(){
    if(this.gitter.webhook() === ''){
      this.testStatus('Please fill in your webhook first.');
    }
    else{
      this.testStatus('Testing...');
      m.request({method: "GET", url: "/api/notify/test/gitter"})
      .then((response) => {
        if(response.success === true){
          this.testStatus('Gitter notifications should work. A test message has been posted to your room.');
        }
        else
        {
          this.testStatus('Your webhook is invalid or Gitter could not be reached.');
        }
      });
    }
  }
}
