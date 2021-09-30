(defun which-line ()
  "Print the current buffer line number and narrowed line number of point."
  (interactive)
  (let ((start (point-min))
        (end (point-max)) 
	(n (line-number-at-pos))
        (tl (if (= (point-min) (point-max))
		(count-lines (point-min) (point-max))
	      (if (= (char-before (point-max)) ?\n)
       		  (count-lines (point-min) (point-max))
		(- (count-lines (point-min) (point-max)) 1)) )))
    (if (= start 1)
	(message "Line %d of %d" n tl)
      (save-excursion
	(save-restriction
	  (widen)
	  (message "line %d (narrowed line %d) of %d"
		   (+ n (line-number-at-pos start) -1) n tl))))))

