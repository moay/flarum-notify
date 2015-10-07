import { extend } from 'flarum/extend';
import AdminNav from 'flarum/components/AdminNav';
import AdminLinkButton from 'flarum/components/AdminLinkButton';

import NotifySettingsPage from 'notify/components/NotifySettingsPage';

export default function() {

  app.routes.notify = {path: '/notify', component: NotifySettingsPage.component()};

  app.extensionSettings.notify = () => m.route(app.route('notify'));

  extend(AdminNav.prototype, 'items', items => {
    items.add('notify', AdminLinkButton.component({
      href: app.route('notify'),
      icon: 'bell',
      children: 'Notify',
      description: 'Manage your notifications to Slack, Hipchat and Gitter.'
    }));
  });
}
