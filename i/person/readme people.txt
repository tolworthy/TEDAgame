talk frames must start at multiples of 96 AND have widths of 96 or 192
	// (or any frames where changes must be pixel perfect)
		// walking is less important: 1px wrong it is less noticeable
				GIMP shift-nudge:  13 pixels at a time (at 200% magnification, or 26 at x100)

every distance must be divisible by 12.
	// to be scaled to whole numbers
		// otherwise, animations look bad
			// because they might jump a half pixel
left edge must also be scalable by 75% and 62.5% (1/1.6)
	// so, every frame left must be divisible by 96

adult: ~3568 wide, multiples of 96
teen: ~2682 wide, multiples of 72 // game sees "default75": shrinks  sprite positions to 75% 
child: ~2235 wide, multiples of 60	// game sees "default625": shrinks to 62.5% (= / 1.6)


48?


