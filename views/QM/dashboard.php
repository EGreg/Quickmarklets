<div id='dashboard'>
	<h1>
		<?php echo Q_Html::img('img/icon/70.png', 'Quickmarklets', array('class' => 'QM_logo')) ?>
		Quickmarklets
	</h1>
	<h2 class="slogan"><?php echo Q_Html::text($slogan) ?></h2>

	<div id="dashboard_user">
		<?php if ($user): ?>
			<?php echo Q::tool("Users/avatar", array('userId' => $user->id, 'icon' => true, 'short' => true)) ?>
		<?php else: ?>
			<a href="#login" class="QM_login">log in</a>
		<?php endif; ?>
		<div id="dashboard_user_contextual" class="Q_contextual" data-handler="QM.userContextual">
			<ul class="Q_listing">
				<?php if ($user): ?>
					<?php if (!$user->mobileNumber): ?>
						<li data-action="setIdentifier">set mobile number</li>
					<?php elseif (!$user->emailAddress): ?>
						<li data-action="setIdentifier">set email address</li>
					<?php endif ?>
				<?php endif ?>
				<li data-action="logout">log out</li>
			</ul>
		</div>
	</div>
</div>
