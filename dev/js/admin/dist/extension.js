System.register('notify/addNotifySettingsPage', ['flarum/extend', 'flarum/components/AdminNav', 'flarum/components/AdminLinkButton', 'notify/components/NotifySettingsPage'], function (_export) {
  'use strict';

  var extend, AdminNav, AdminLinkButton, NotifySettingsPage;
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumComponentsAdminNav) {
      AdminNav = _flarumComponentsAdminNav['default'];
    }, function (_flarumComponentsAdminLinkButton) {
      AdminLinkButton = _flarumComponentsAdminLinkButton['default'];
    }, function (_notifyComponentsNotifySettingsPage) {
      NotifySettingsPage = _notifyComponentsNotifySettingsPage['default'];
    }],
    execute: function () {
      _export('default', function () {

        app.routes.notify = { path: '/notify', component: NotifySettingsPage.component() };

        app.extensionSettings.notify = function () {
          return m.route(app.route('notify'));
        };

        extend(AdminNav.prototype, 'items', function (items) {
          items.add('notify', AdminLinkButton.component({
            href: app.route('notify'),
            icon: 'bell',
            children: 'Notify',
            description: 'Manage your notifications to Slack, Hipchat and Gitter.'
          }));
        });
      });
    }
  };
});;System.register('notify/main', ['notify/addNotifySettingsPage'], function (_export) {
	'use strict';

	var addNotifySettingsPage;
	return {
		setters: [function (_notifyAddNotifySettingsPage) {
			addNotifySettingsPage = _notifyAddNotifySettingsPage['default'];
		}],
		execute: function () {

			app.initializers.add('notify', function (app) {
				addNotifySettingsPage();
			});
		}
	};
});;System.register('notify/components/GitterSettingsModal', ['flarum/components/Modal', 'flarum/components/Button', 'flarum/utils/saveConfig'], function (_export) {
  'use strict';

  var Modal, Button, saveConfig, GitterSettingsModal;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  return {
    setters: [function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal['default'];
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton['default'];
    }, function (_flarumUtilsSaveConfig) {
      saveConfig = _flarumUtilsSaveConfig['default'];
    }],
    execute: function () {
      GitterSettingsModal = (function (_Modal) {
        _inherits(GitterSettingsModal, _Modal);

        function GitterSettingsModal() {
          _classCallCheck(this, GitterSettingsModal);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _get(Object.getPrototypeOf(GitterSettingsModal.prototype), 'constructor', this).apply(this, args);

          this.webhook = m.prop(app.config['notify.gitter.webhook'] || '');
        }

        _createClass(GitterSettingsModal, [{
          key: 'className',
          value: function className() {
            return 'GitterSettingsModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return 'Gitter settings';
          }
        }, {
          key: 'content',
          value: function content() {
            return m(
              'div',
              { className: 'Modal-body' },
              m(
                'div',
                { className: 'Form' },
                m(
                  'div',
                  { className: 'Form-group' },
                  m(
                    'label',
                    null,
                    'Gitter webhook'
                  ),
                  m('input', { className: 'FormControl', value: this.webhook(), oninput: m.withAttr('value', this.webhook) })
                ),
                m(
                  'p',
                  null,
                  'In order to get your webhook url, visit the room you want to post to on ',
                  m(
                    'a',
                    { href: 'https://gitter.im', target: '_new' },
                    'gitter.im'
                  ),
                  '. Click on the ',
                  m(
                    'i',
                    null,
                    'Settings icon'
                  ),
                  ' > ',
                  m(
                    'i',
                    null,
                    'Integrations'
                  ),
                  ' > ',
                  m(
                    'i',
                    null,
                    'Custom'
                  ),
                  '. This will create a new webhook url for you.'
                ),
                m('hr', null),
                m(
                  'div',
                  { className: 'Form-group' },
                  Button.component({
                    type: 'submit',
                    className: 'Button Button--primary GitterSettingsModal-save',
                    loading: this.loading,
                    children: 'Save Changes'
                  })
                )
              )
            );
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit(e) {
            var _this = this;

            e.preventDefault();

            this.loading = true;

            saveConfig({
              'notify.gitter.webhook': this.webhook()
            }).then(function () {
              return _this.hide();
            }, function () {
              _this.loading = false;
              m.redraw();
            });
          }
        }]);

        return GitterSettingsModal;
      })(Modal);

      _export('default', GitterSettingsModal);
    }
  };
});;System.register('notify/components/HipChatSettingsModal', ['flarum/components/Modal', 'flarum/components/Button', 'flarum/utils/saveConfig', 'flarum/components/Alert'], function (_export) {
  'use strict';

  var Modal, Button, saveConfig, Alert, HipChatSettingsModal;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  return {
    setters: [function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal['default'];
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton['default'];
    }, function (_flarumUtilsSaveConfig) {
      saveConfig = _flarumUtilsSaveConfig['default'];
    }, function (_flarumComponentsAlert) {
      Alert = _flarumComponentsAlert['default'];
    }],
    execute: function () {
      HipChatSettingsModal = (function (_Modal) {
        _inherits(HipChatSettingsModal, _Modal);

        function HipChatSettingsModal() {
          _classCallCheck(this, HipChatSettingsModal);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _get(Object.getPrototypeOf(HipChatSettingsModal.prototype), 'constructor', this).apply(this, args);

          this.token = m.prop(app.config['notify.hipchat.token'] || '');
          this.room = m.prop(app.config['notify.hipchat.room'] || '');
        }

        _createClass(HipChatSettingsModal, [{
          key: 'className',
          value: function className() {
            return 'HipChatSettingsModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return 'HipChat settings';
          }
        }, {
          key: 'content',
          value: function content() {
            return m(
              'div',
              { className: 'Modal-body' },
              m(
                'div',
                { className: 'Form' },
                m(
                  'div',
                  { className: 'Form-group' },
                  m(
                    'label',
                    null,
                    'HipChat token'
                  ),
                  m('input', { className: 'FormControl', value: this.token(), oninput: m.withAttr('value', this.token) })
                ),
                m(
                  'div',
                  { className: 'Form-group' },
                  m(
                    'label',
                    null,
                    'Room to post to (name or id)'
                  ),
                  m('input', { className: 'FormControl', value: this.room(), oninput: m.withAttr('value', this.room) })
                ),
                m(
                  'p',
                  null,
                  'To obtain the token, visit your the room settings over at hipchat.com (Login, click on `rooms` and select your the room you want to post to). Click on `Tokens` and create a new one. The label you provide for the token will be shown with each notification.'
                ),
                m(
                  'p',
                  null,
                  'Notify does not work with self-hosted HipChat.'
                ),
                m('hr', null),
                m(
                  'div',
                  { className: 'Form-group' },
                  Button.component({
                    type: 'submit',
                    className: 'Button Button--primary HipChatSettingsModal-save',
                    loading: this.loading,
                    children: 'Save Changes'
                  })
                )
              )
            );
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit(e) {
            var _this = this;

            e.preventDefault();
            this.loading = true;

            app.alerts.dismiss(this.testResultAlert);
            saveConfig({
              'notify.hipchat.token': this.token(),
              'notify.hipchat.room': this.room()
            }).then(function () {
              return _this.hide();
            }, function () {
              _this.loading = false;
              m.redraw();
            });
          }
        }]);

        return HipChatSettingsModal;
      })(Modal);

      _export('default', HipChatSettingsModal);
    }
  };
});;System.register('notify/components/NotifySettingsPage', ['flarum/Component', 'flarum/components/Button', 'flarum/components/Switch', 'flarum/utils/saveConfig', 'flarum/components/Alert', 'notify/components/SlackSettingsModal', 'notify/components/HipChatSettingsModal', 'notify/components/GitterSettingsModal', 'notify/components/TestConnectorsModal'], function (_export) {
  'use strict';

  var Component, Button, Switch, saveConfig, Alert, SlackSettingsModal, HipChatSettingsModal, GitterSettingsModal, TestConnectorsModal, NotifySettingsPage;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent['default'];
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton['default'];
    }, function (_flarumComponentsSwitch) {
      Switch = _flarumComponentsSwitch['default'];
    }, function (_flarumUtilsSaveConfig) {
      saveConfig = _flarumUtilsSaveConfig['default'];
    }, function (_flarumComponentsAlert) {
      Alert = _flarumComponentsAlert['default'];
    }, function (_notifyComponentsSlackSettingsModal) {
      SlackSettingsModal = _notifyComponentsSlackSettingsModal['default'];
    }, function (_notifyComponentsHipChatSettingsModal) {
      HipChatSettingsModal = _notifyComponentsHipChatSettingsModal['default'];
    }, function (_notifyComponentsGitterSettingsModal) {
      GitterSettingsModal = _notifyComponentsGitterSettingsModal['default'];
    }, function (_notifyComponentsTestConnectorsModal) {
      TestConnectorsModal = _notifyComponentsTestConnectorsModal['default'];
    }],
    execute: function () {
      NotifySettingsPage = (function (_Component) {
        _inherits(NotifySettingsPage, _Component);

        function NotifySettingsPage() {
          _classCallCheck(this, NotifySettingsPage);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _get(Object.getPrototypeOf(NotifySettingsPage.prototype), 'constructor', this).apply(this, args);
          this.services = {};
          this.services.slack = m.prop(app.config['notify.services.slack'] === '1');
          this.services.hipchat = m.prop(app.config['notify.services.hipchat'] === '1');
          this.services.gitter = m.prop(app.config['notify.services.gitter'] === '1');

          this.events = {};
          this.events.new_post = m.prop(app.config['notify.events.new_post'] === '1');
          this.events.new_discussion = m.prop(app.config['notify.events.new_discussion'] === '1');
          this.events.post_hidden = m.prop(app.config['notify.events.post_hidden'] === '1');
          this.events.post_deleted = m.prop(app.config['notify.events.post_deleted'] === '1');
          this.events.discussion_deleted = m.prop(app.config['notify.events.discussion_deleted'] === '1');
        }

        _createClass(NotifySettingsPage, [{
          key: 'view',
          value: function view() {
            return m(
              'div',
              { className: 'NotifySettingsPage' },
              m(
                'div',
                { className: 'container' },
                m(
                  'h2',
                  null,
                  'Notification services'
                ),
                m(
                  'form',
                  { onsubmit: this.onsubmit.bind(this) },
                  m(
                    'fieldset',
                    { className: 'NotifySettingsPage-services' },
                    m(
                      'div',
                      { className: 'helpText' },
                      'Choose which services should be notified when there is something to notify you about.'
                    ),
                    m(
                      'table',
                      { className: 'NotifySettingsTable' },
                      m(
                        'tr',
                        null,
                        m(
                          'td',
                          null,
                          Switch.component({
                            state: this.services.gitter(),
                            children: 'Gitter',
                            onchange: this.services.gitter
                          })
                        ),
                        m(
                          'td',
                          null,
                          Button.component({
                            className: 'Button NotifySettingsButton rounded',
                            icon: 'cog',
                            type: 'button',
                            onclick: function onclick() {
                              return app.modal.show(new GitterSettingsModal());
                            }
                          }),
                          Button.component({
                            className: 'Button NotifySettingsButton rounded texty',
                            children: 'Test',
                            type: 'button',
                            onclick: function onclick() {
                              return app.modal.show(new TestConnectorsModal({ 'connector': 'gitter' }));
                            }
                          })
                        )
                      ),
                      m(
                        'tr',
                        null,
                        m(
                          'td',
                          null,
                          Switch.component({
                            state: this.services.hipchat(),
                            children: 'HipChat',
                            onchange: this.services.hipchat
                          })
                        ),
                        m(
                          'td',
                          null,
                          Button.component({
                            className: 'Button NotifySettingsButton rounded',
                            icon: 'cog',
                            type: 'button',
                            onclick: function onclick() {
                              return app.modal.show(new HipChatSettingsModal());
                            }
                          }),
                          Button.component({
                            className: 'Button NotifySettingsButton rounded texty',
                            children: 'Test',
                            type: 'button',
                            onclick: function onclick() {
                              return app.modal.show(new TestConnectorsModal({ 'connector': 'hipchat' }));
                            }
                          })
                        )
                      ),
                      m(
                        'tr',
                        null,
                        m(
                          'td',
                          null,
                          Switch.component({
                            state: this.services.slack(),
                            children: 'Slack',
                            onchange: this.services.slack
                          })
                        ),
                        m(
                          'td',
                          null,
                          Button.component({
                            className: 'Button NotifySettingsButton rounded',
                            icon: 'cog',
                            type: 'button',
                            onclick: function onclick() {
                              return app.modal.show(new SlackSettingsModal());
                            }
                          }),
                          Button.component({
                            className: 'Button NotifySettingsButton rounded texty',
                            children: 'Test',
                            type: 'button',
                            onclick: function onclick() {
                              return app.modal.show(new TestConnectorsModal({ 'connector': 'slack' }));
                            }
                          })
                        )
                      )
                    )
                  )
                ),
                m('hr', null),
                m(
                  'h2',
                  null,
                  'Notification events'
                ),
                m(
                  'form',
                  { onsubmit: this.onsubmit.bind(this) },
                  m(
                    'fieldset',
                    { className: 'NotifySettingsPage-events' },
                    m(
                      'div',
                      { className: 'helpText' },
                      'Choose which events should trigger a notification. Send notifications, when'
                    ),
                    m(
                      'table',
                      { className: 'NotifySettingsTable' },
                      m(
                        'tr',
                        null,
                        m(
                          'td',
                          null,
                          Switch.component({
                            state: this.events.new_discussion(),
                            children: 'a new discussion was started',
                            onchange: this.events.new_discussion
                          })
                        )
                      ),
                      m(
                        'tr',
                        null,
                        m(
                          'td',
                          null,
                          Switch.component({
                            state: this.events.discussion_deleted(),
                            children: 'a discussion was deleted',
                            onchange: this.events.discussion_deleted
                          })
                        )
                      ),
                      m(
                        'tr',
                        null,
                        m(
                          'td',
                          null,
                          Switch.component({
                            state: this.events.new_post(),
                            children: 'a new post was posted',
                            onchange: this.events.new_post
                          })
                        )
                      ),
                      m(
                        'tr',
                        null,
                        m(
                          'td',
                          null,
                          Switch.component({
                            state: this.events.post_hidden(),
                            children: 'a post was hidden',
                            onchange: this.events.post_hidden
                          })
                        )
                      ),
                      m(
                        'tr',
                        null,
                        m(
                          'td',
                          null,
                          Switch.component({
                            state: this.events.post_deleted(),
                            children: 'a post was deleted',
                            onchange: this.events.post_deleted
                          })
                        )
                      )
                    )
                  ),
                  m('hr', null),
                  m(
                    'p',
                    null,
                    Button.component({
                      className: 'Button Button--primary',
                      children: 'Save changes',
                      loading: this.loading
                    })
                  )
                )
              )
            );
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit(e) {
            var _this = this;

            e.preventDefault();

            this.loading = true;
            app.alerts.dismiss(this.successAlert);

            saveConfig({
              'notify.services.slack': this.services.slack(),
              'notify.services.hipchat': this.services.hipchat(),
              'notify.services.gitter': this.services.gitter(),
              'notify.events.new_post': this.events.new_post(),
              'notify.events.new_discussion': this.events.new_discussion(),
              'notify.events.post_hidden': this.events.post_hidden(),
              'notify.events.post_deleted': this.events.post_deleted(),
              'notify.events.discussion_deleted': this.events.discussion_deleted()
            })['finally'](function () {
              _this.loading = false;
              m.redraw();
            });
          }
        }]);

        return NotifySettingsPage;
      })(Component);

      _export('default', NotifySettingsPage);
    }
  };
});;System.register('notify/components/SlackSettingsModal', ['flarum/components/Modal', 'flarum/components/Button', 'flarum/utils/saveConfig', 'flarum/components/Alert'], function (_export) {
  'use strict';

  var Modal, Button, saveConfig, Alert, SlackSettingsModal;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  return {
    setters: [function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal['default'];
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton['default'];
    }, function (_flarumUtilsSaveConfig) {
      saveConfig = _flarumUtilsSaveConfig['default'];
    }, function (_flarumComponentsAlert) {
      Alert = _flarumComponentsAlert['default'];
    }],
    execute: function () {
      SlackSettingsModal = (function (_Modal) {
        _inherits(SlackSettingsModal, _Modal);

        function SlackSettingsModal() {
          _classCallCheck(this, SlackSettingsModal);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _get(Object.getPrototypeOf(SlackSettingsModal.prototype), 'constructor', this).apply(this, args);

          this.token = m.prop(app.config['notify.slack.token'] || '');
          this.channel = m.prop(app.config['notify.slack.channel'] || '#general');
        }

        _createClass(SlackSettingsModal, [{
          key: 'className',
          value: function className() {
            return 'SlackSettingsModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return 'Slack settings';
          }
        }, {
          key: 'content',
          value: function content() {
            return m(
              'div',
              { className: 'Modal-body' },
              m(
                'div',
                { className: 'Form' },
                m(
                  'div',
                  { className: 'Form-group' },
                  m(
                    'label',
                    null,
                    'Slack token'
                  ),
                  m('input', { className: 'FormControl', value: this.token(), oninput: m.withAttr('value', this.token) })
                ),
                m(
                  'div',
                  { className: 'Form-group' },
                  m(
                    'label',
                    null,
                    'Channel to post to'
                  ),
                  m('input', { className: 'FormControl', value: this.channel(), oninput: m.withAttr('value', this.channel) })
                ),
                m(
                  'p',
                  null,
                  'In order to obtain the token, visit ',
                  m(
                    'a',
                    { href: 'https://api.slack.com/web', target: '_new' },
                    'api.slack.com/web'
                  ),
                  '.'
                ),
                m('hr', null),
                m(
                  'div',
                  { className: 'Form-group' },
                  Button.component({
                    type: 'submit',
                    className: 'Button Button--primary SlackSettingsModal-save',
                    loading: this.loading,
                    children: 'Save Changes'
                  })
                )
              )
            );
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit(e) {
            var _this = this;

            e.preventDefault();

            this.loading = true;
            app.alerts.dismiss(this.testResultAlert);

            saveConfig({
              'notify.slack.token': this.token(),
              'notify.slack.channel': this.channel()
            }).then(function () {
              return _this.hide();
            }, function () {
              _this.loading = false;
              m.redraw();
            });
          }
        }]);

        return SlackSettingsModal;
      })(Modal);

      _export('default', SlackSettingsModal);
    }
  };
});;System.register('notify/components/TestConnectorsModal', ['flarum/components/Modal', 'flarum/components/Button', 'flarum/lib/components/LoadingIndicator'], function (_export) {
  'use strict';

  var Modal, Button, LoadingIndicator, TestConnectorsModal;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  return {
    setters: [function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal['default'];
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton['default'];
    }, function (_flarumLibComponentsLoadingIndicator) {
      LoadingIndicator = _flarumLibComponentsLoadingIndicator['default'];
    }],
    execute: function () {
      TestConnectorsModal = (function (_Modal) {
        _inherits(TestConnectorsModal, _Modal);

        function TestConnectorsModal() {
          _classCallCheck(this, TestConnectorsModal);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _get(Object.getPrototypeOf(TestConnectorsModal.prototype), 'constructor', this).apply(this, args);

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

        _createClass(TestConnectorsModal, [{
          key: 'className',
          value: function className() {
            return 'TestConnectorsModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return 'Testing your settings';
          }
        }, {
          key: 'content',
          value: function content() {
            return m(
              'div',
              { className: 'Modal-body' },
              m(
                'div',
                { className: 'statusMessage' },
                this.testStatus()
              )
            );
          }
        }, {
          key: 'runConnectorTest',
          value: function runConnectorTest() {
            switch (this.props.connector) {
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
        }, {
          key: 'runSlackTest',
          value: function runSlackTest() {
            var _this = this;

            if (this.slack.token() === '' || this.slack.channel() === '') {
              this.testStatus('Please fill in token and channel first.');
            } else {
              this.testStatus('Testing...');
              m.request({ method: "GET", url: "/api/notify/test/slack" }).then(function (response) {
                if (response.success === true) {
                  _this.testStatus('Your Slack token seems to work fine. Make sure to provide an existing channel.');
                } else {
                  _this.testStatus('Your Slack token is invalid.');
                }
              });
            }
          }
        }, {
          key: 'runHipChatTest',
          value: function runHipChatTest() {
            var _this2 = this;

            if (this.hipchat.token() === '' || this.hipchat.room() === '') {
              this.testStatus('Please fill in token and room first.');
            } else {
              this.testStatus('Testing...');
              m.request({ method: "GET", url: "/api/notify/test/hipchat" }).then(function (response) {
                if (response.success === true) {
                  _this2.testStatus('Hipchat notifications should work. A test message has been posted to your room.');
                } else {
                  _this2.testStatus('Your token is invalid or the token cannot access your room.');
                }
              });
            }
          }
        }, {
          key: 'runGitterTest',
          value: function runGitterTest() {
            var _this3 = this;

            if (this.gitter.webhook() === '') {
              this.testStatus('Please fill in your webhook first.');
            } else {
              this.testStatus('Testing...');
              m.request({ method: "GET", url: "/api/notify/test/gitter" }).then(function (response) {
                if (response.success === true) {
                  _this3.testStatus('Gitter notifications should work. A test message has been posted to your room.');
                } else {
                  _this3.testStatus('Your webhook is invalid or Gitter could not be reached.');
                }
              });
            }
          }
        }]);

        return TestConnectorsModal;
      })(Modal);

      _export('default', TestConnectorsModal);
    }
  };
});