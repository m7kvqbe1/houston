<?php
// Serve initial assets
$app->get('/', 'DefaultModel::generateAssets');