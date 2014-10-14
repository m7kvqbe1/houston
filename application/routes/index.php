<?php
// Serve initial assets
$app->get('/', 'Houston\Common\Model\CommonModel::generateAssets');