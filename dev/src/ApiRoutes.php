<?php namespace moay\FlarumNotify;

use Flarum\Events\RegisterApiRoutes;

class ApiRoutes
{
    public function subscribe($events)
    {
        $events->listen(RegisterApiRoutes::class, [$this, 'addRoutes']);
    }

    /**
     * Registeres the api routes for the extension
     * @param RegisterApiRoutes $event
     */
    public function addRoutes(RegisterApiRoutes $event)
    {
        $event->get('/notify/test/{connector}', 'notify.test', 'moay\FlarumNotify\Api\ConnectorTest');
    }
}
