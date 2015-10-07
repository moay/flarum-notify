import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import saveConfig from 'flarum/utils/saveConfig';

export default class SlackSettingsModal extends Modal {
  constructor(...args) {
    super(...args);

    this.token = m.prop(app.config['notify.slack.token'] || '');
    this.channel = m.prop(app.config['notify.slack.channel'] || '#general');
  }

  className() {
    return 'SlackSettingsModal Modal--small';
  }

  title() {
    return 'Slack settings';
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label>Slack token</label>
            <input className="FormControl" value={this.token()} oninput={m.withAttr('value', this.token)}/>
          </div>

          <div className="Form-group">
            <label>Channel to post to</label>
            <input className="FormControl" value={this.channel()} oninput={m.withAttr('value', this.channel)}/>
          </div>
          
          <hr/>

          <div className="Form-group">
            {Button.component({
              type: 'submit',
              className: 'Button Button--primary SlackSettingsModal-save',
              loading: this.loading,
              children: 'Save Changes'
            })}
          </div>
        </div>
      </div>
    );
  }

  onsubmit(e) {
    e.preventDefault();

    this.loading = true;

    saveConfig({
      'notify.slack.token': this.token(),
      'notify.slack.channel': this.channel()
    }).then(
      () => this.hide(),
      () => {
        this.loading = false;
        m.redraw();
      }
    );
  }
}
