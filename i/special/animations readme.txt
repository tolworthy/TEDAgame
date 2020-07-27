________________________________________________________________________________________________________
ANIMATIONS

Climbing in/out of window:
Make sure EVERY house has a window at the same % position
		create queue of seperate events (change scene, animate, change scene again, speak etc)
		climb in?
				walk to next scene, say "I will wait until nobody is around"
				cut back to target scene, with no people
				target character x off screen
				manually assign the new background sprite and size
				manually move to desired position
				thereafter, use animQueue code to play the next frame each time
				hard code frame length and width
				then cut to that house and a bedroom
		climb out?
				say "I will climb out" or similar
				similar code to before // game must know house position from scene numbers
				cut to next scene and say "I don't think anybody saw me"
Climbing underground:
		make many generic backgrounds. 
		Animate as with windows
Swim from boat // if sceneType is not sea, error message instead
			make sprite off screen, 
			add beside boat (cannot be same character as boat - make "person3" in case there are already 3 boats)
			change frame and move (hard coded) until off screen
			* No next scene - rely on story code to add one (or user to click on one)
Appear (from underwater) then swim // if sceneType is not sea, error message instead
			make "appearing" sprite off screen, 
			add in middle of water
			change frame  (hard coded)
			change to swimming sprite (hard coded)
			change frame and move (hard coded) until off screen
			* No next scene - rely on story code to add one (or user to click on one)
Only create (and when the story requires them:
			Fire: etc - looping animated GIF. 
				Also create hearths / suitable backgrounds
			Falling: create CSS code to move and rotate. Frames: experient with walk-sit-climb (so ends with arms up)


________________________________________________________________________________________________________
SPRITE SHEETS

save the text (at bottom) to a file called SpriteSheet.scm

put it in chris\.gimp-2.8\scripts

then restart GIMP (or choose filters- script-fu - refresh scripts)

new menu option should appear

it is simple: just creates a fixed width line


________(START SpriteSheet.scm)_______________________________________________________________________
(define (create-sprite-sheet img drawable)
	(let * 
		(
			(anImage 0)
			(numlayers 0)
			(layers 0)
			(imgw 0)
			(idx 0)
			(layr 0)
			(xoff 0)
		)

		(set! anImage   (car (gimp-image-duplicate img)))
		(set! numlayers (car (gimp-image-get-layers anImage)))
		(set! layers    (cadr(gimp-image-get-layers anImage)))
		(set! imgw      (car (gimp-image-width anImage)))
		
		(while (< idx numlayers)
			(set! layr (aref layers (- (- numlayers 1) idx)))
			(gimp-layer-translate layr xoff 0)
			(set! xoff (+ imgw xoff))
			(set! idx (+ idx 1))
		)
		
		(gimp-image-resize-to-layers anImage)
		(gimp-image-merge-visible-layers anImage EXPAND-AS-NECESSARY)
		(gimp-display-new anImage)
	)
	
)		
		
(script-fu-register "create-sprite-sheet"
	_"<Toolbox>/Xtns/Sprite-Sheet/Create From Layers..."
    "Creates a new image from current image, then offsets each layer of new image, and finally merges all visible layers to create a spritesheet"
    "Brian.Schultheiss@airegear.com"
    "Brian.Schultheiss@airegear.com"
    "2009"
    "INDEXED* RGB* GRAY*"
    SF-IMAGE        "Image to use"          0
    SF-DRAWABLE     "Layer to use"          0
)
________(END SpriteSheet.scm)_________________________________________________________________________

