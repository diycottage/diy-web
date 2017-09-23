for file in *.html; do
	mv "$file" "${file%.html}"
done

# This is a dumb hack because I'm lazy
mv index index.html
