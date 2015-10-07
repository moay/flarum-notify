import addNotifySettingsPage from 'notify/addNotifySettingsPage';

app.initializers.add('notify', app => {
	addNotifySettingsPage();
});
