<?php
// Serve initial assets
$app->get('/', 'Houston\Common\Common::generateAssets');