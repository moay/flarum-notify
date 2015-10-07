import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import Switch from 'flarum/components/Switch';
import saveConfig from 'flarum/utils/saveConfig';
import Alert from 'flarum/components/Alert';

import SlackSettingsModal from 'notify/components/SlackSettingsModal';
import HipChatSettingsModal from 'notify/components/HipChatSettingsModal';

export default class NotifySettingsPage extends Component {
  constructor(...args) {
    super(...args);
    this.services = {};
    this.services.slack = m.prop(app.config['notify.services.slack'] === '1');
    this.services.hipchat = m.prop(app.config['notify.services.hipchat'] === '1');

    this.events = {};
    this.events.new_post = m.prop(app.config['notify.events.new_post'] === '1');
    this.events.new_discussion = m.prop(app.config['notify.events.new_discussion'] === '1');
    this.events.post_hidden = m.prop(app.config['notify.events.post_hidden'] === '1');
    this.events.post_deleted = m.prop(app.config['notify.events.post_deleted'] === '1');
    this.events.discussion_deleted = m.prop(app.config['notify.events.discussion_deleted'] === '1');
  }

  view(){
    return (
      <div className="NotifySettingsPage">
        <div className="container">
          <h2>Notification services</h2>
          <form onsubmit={this.onsubmit.bind(this)}>
            <fieldset className="NotifySettingsPage-services">
              <div className="helpText">
                Choose which services should be notified when there is something to notify you about.
              </div>
              <table className="NotifySettingsTable">
                <tr>
                  <td>
                    {Switch.component({
                      state: this.services.slack(),
                      children: 'Slack',
                      onchange: this.services.slack
                    })}
                  </td>
                  <td>
                    {Button.component({
                      className: 'Button NotifySettingsButton rounded',
                      icon: 'cog',
                      onclick: () => app.modal.show(new SlackSettingsModal())
                    })}
                  </td>
                </tr>
                <tr>
                  <td>
                    {Switch.component({
                      state: this.services.hipchat(),
                      children: 'HipChat',
                      onchange: this.services.hipchat
                    })}
                  </td>
                  <td>
                    {Button.component({
                      className: 'Button NotifySettingsButton rounded',
                      icon: 'cog',
                      onclick: () => app.modal.show(new HipChatSettingsModal())
                    })}
                  </td>
                </tr>
              </table>
            </fieldset>
          </form>
          <hr/>
          <h2>Notification events</h2>
          <form onsubmit={this.onsubmit.bind(this)}>
            <fieldset className="NotifySettingsPage-events">
              <div className="helpText">
                Choose which events should trigger a notification. Send notifications, when
              </div>
              <table className="NotifySettingsTable">
                <tr>
                  <td>
                    {Switch.component({
                      state: this.events.new_discussion(),
                      children: 'a new discusion was started',
                      onchange: this.events.new_discussion
                    })}
                  </td>
                </tr>
                <tr>
                  <td>
                    {Switch.component({
                      state: this.events.discussion_deleted(),
                      children: 'a discussion was deleted',
                      onchange: this.events.discussion_deleted
                    })}
                  </td>
                </tr>
                <tr>
                  <td>
                    {Switch.component({
                      state: this.events.new_post(),
                      children: 'a new post was posted',
                      onchange: this.events.new_post
                    })}
                  </td>
                </tr>
                <tr>
                  <td>
                    {Switch.component({
                      state: this.events.post_hidden(),
                      children: 'a post was hidden',
                      onchange: this.events.post_hidden
                    })}
                  </td>
                </tr>
                <tr>
                  <td>
                    {Switch.component({
                      state: this.events.post_deleted(),
                      children: 'a post was deleted',
                      onchange: this.events.post_deleted
                    })}
                  </td>
                </tr>
              </table>
            </fieldset>
            <hr/>
            <p>
              {Button.component({
                className: 'Button Button--primary',
                children: 'Save changes',
                loading: this.loading
              })}
            </p>
          </form>
        </div>
      </div>
    );
  }

  onsubmit(e) {
    e.preventDefault();

    this.loading = true;
    app.alerts.dismiss(this.successAlert);

    saveConfig({
      'notify.services.slack' : this.services.slack(),
      'notify.services.hipchat' : this.services.slack(),
      'notify.events.new_post' : this.events.new_post(),
      'notify.events.new_discussion' : this.events.new_discussion(),
      'notify.events.post_hidden' : this.events.post_hidden(),
      'notify.events.post_deleted' : this.events.post_deleted(),
      'notify.events.discussion_deleted' : this.events.discussion_deleted()
    })
    .finally(() => {
        this.loading = false;
        m.redraw();
      }
    );
  }
}
