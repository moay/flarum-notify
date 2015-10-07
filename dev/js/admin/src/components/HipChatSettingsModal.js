import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import saveConfig from 'flarum/utils/saveConfig';

export default class HipChatSettingsModal extends Modal {
  constructor(...args) {
    super(...args);

    this.token = m.prop(app.config['notify.hipchat.token'] || '');
    this.room = m.prop(app.config['notify.hipchat.room'] || '');
  }

  className() {
    return 'HipChatSettingsModal Modal--small';
  }

  title() {
    return 'HipChat settings';
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label>HipChat token</label>
            <input className="FormControl" value={this.token()} oninput={m.withAttr('value', this.token)}/>
          </div>

          <div className="Form-group">
            <label>Room to post to (name or id)</label>
            <input className="FormControl" value={this.room()} oninput={m.withAttr('value', this.room)}/>
          </div>
          
          <hr/>

          <div className="Form-group">
            {Button.component({
              type: 'submit',
              className: 'Button Button--primary HipChatSettingsModal-save',
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
      'notify.hipchat.token': this.token(),
      'notify.hipchat.room': this.room()
    }).then(
      () => this.hide(),
      () => {
        this.loading = false;
        m.redraw();
      }
    );
  }
}
