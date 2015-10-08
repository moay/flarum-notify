<?php
// Autoloading for plugin command classes.
if (is_file(__DIR__ . '/vendor/autoload.php')) require_once __DIR__ . '/vendor/autoload.php';

use Windwalker\Filesystem\File;
use Windwalker\Filesystem\Path;
use Windwalker\Filesystem\Folder;
use Windwalker\Filesystem\Filesystem;
use Alchemy\Zippy\Zippy;

Task::register('build', function($task){

	$basepath = realpath(__DIR__ . '/..');
	$distfolder = Path::clean($basepath . '/dist');
	$pluginfolder = Path::clean($distfolder . '/notify');
	
	$task->writeln('Cleaning files out.');

	// Prepare dist folder
	if(file_exists($distfolder)){
		Filesystem::delete($distfolder);
		Folder::create($distfolder);
	}
	$task->writeln('Copying files over.');
	recursiveCopy('dev', $basepath, $distfolder);

	$task->writeln('Running composer');
	$task->exec(function($process){
		$basepath = realpath(__DIR__ . '/..');
		$distfolder = Path::clean($basepath . '/dist');
		$distfolder = str_replace(' ', '\ ', $distfolder);
	    $process->runLocally("cd ".$distfolder. '/dev' ." && composer install --prefer-dist --optimize-autoloader");
	    $process->runLocally("cd .. && cd ..");
	});

	Folder::move($distfolder . '/dev', $distfolder . '/notify');

	$task->writeln('Zipping');

	$zippy = Zippy::load();

	$zippy->create('flarum-notify.zip', $distfolder . '/notify');


	$task->writeln('Deleting copied folder');

	Folder::delete($distfolder . '/notify');
	File::move($basepath . '/flarum-notify.zip', $distfolder . '/flarum-notify.zip');

})->description("Builds a release ready package from the current project state and stores it in /dist.");

function recursiveCopy($filename, $initialfolder, $targetfolder){
	$badfiles = [
		'vendor',
		'node_modules',
		'.DS_Store',
		'sftp-config.json',
		'.git',
		'.gitignore',
		'build.sh'
	];

	foreach(Folder::items($initialfolder . '/' . $filename, false, Folder::PATH_BASENAME) as $item){
		if(!in_array($item, $badfiles)){
			if(is_dir($initialfolder . '/' . $filename . '/' . $item)){
				recursiveCopy($item, $initialfolder . '/' . $filename, $targetfolder . '/' . $filename);
			}
			else{
				File::copy($initialfolder . '/' . $filename . '/' . $item, $targetfolder . '/' . $filename . '/' . $item);
			}
		}
	}
}