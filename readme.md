# flarum-slack

[![Join the chat at https://gitter.im/moay/flarum-notify](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/moay/flarum-notify?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Simple Slack notifications for Flarum.

## WORK IN PROGRESS!

This plugin isn't very advanced yet. As flarum is moving quickly and the team still changes a lot of things, we will wait for v0.1.0 and clean up things when the dust settles.

## Setup

Setup is quite simple. As there is no installer for flarum extensions yet, you will have to download the release folder and add it to your flarum extensions folder.

Upload the folder 'slack' including the vendor files to make flarum recognize the extension.

## Usage

After having uploaded the folder, go to the extensions panel and enable "Slack integration". In order to make the extension work properly, you will need to provide a token. To get one, visit [https://api.slack.com/web](https://api.slack.com/web) and create a token for your flarum forum. (Look out for a "Create token" button at the bottom of the page).

In your flarum setup, open the settings panel for the newly enabled "Slack integration" extension and paste your token there. Also provide a channel. If none is provided, '#general' will be used by default.