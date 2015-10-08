import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import saveConfig from 'flarum/utils/saveConfig';

export default class GitterSettingsModal extends Modal {
  constructor(...args) {
    super(...args);

    this.webhook = m.prop(app.config['notify.gitter.webhook'] || '');
  }

  className() {
    return 'GitterSettingsModal Modal--small';
  }

  title() {
    return 'Gitter settings';
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label>Gitter webhook</label>
            <input className="FormControl" value={this.webhook()} oninput={m.withAttr('value', this.webhook)}/>
          </div>
          
          <p>In order to get your webhook url, visit the room you want to post to on <a href="https://gitter.im" target="_new">gitter.im</a>. Click on the <i>Settings icon</i> > <i>Integrations</i> > <i>Custom</i>. This will create a new webhook url for you.</p>

          <hr/>

          <div className="Form-group">
            {Button.component({
              type: 'submit',
              className: 'Button Button--primary GitterSettingsModal-save',
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
      'notify.gitter.webhook': this.webhook()
    }).then(
      () => this.hide(),
      () => {
        this.loading = false;
        m.redraw();
      }
    );
  }
}
