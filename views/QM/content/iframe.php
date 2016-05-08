<div id='content'>
	
<?php echo Q::tool('Streams/related', array(
	'publisherId' => $userId,
	'streamName' => 'QM/bookmarklets',
	'relationType' => 'bookmarklets',
	'.Q_inplace_tool' => array(
		'editOnClick' => false
	)
)) ?>

</div>