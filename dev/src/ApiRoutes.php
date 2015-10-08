<?php namespace moay\FlarumNotify;

use Flarum\Events\RegisterApiRoutes;

class ApiRoutes
{
    public function subscribe($events)
    {
        $events->listen(RegisterApiRoutes::class, [$this, 'addRoutes']);
    }

    public function addRoutes(RegisterApiRoutes $event)
    {
        $event->get('/notify/test/{connector}', 'notify.test', 'moay\FlarumNotify\Api\ConnectorTest');
    }
}
