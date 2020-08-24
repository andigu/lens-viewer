# Lens Viewer

## Setup

Dependencies:
Required packages are preinstalled. For any package issues reference requirements.txt for a list of package denpendencies.

## Getting Started
In the backend folder run `./start.sh`.

The inspection tool is avaliable via http://localhost:5000/. Enter any username, but remember it as your files will only be accessible by using the same username.  

Simply upload a csv and make sure that it includes 'ra' and 'dec' columns. 

Usage is fairly simple: 1, 2, 3, 4 for a grade, and 5 for non-lens and n for next and b for back. Every 250 images or so, there seems to be some sort of caching problem, refreshing the page should resolve the issue. Allow time for the images to be retirived from the skyviewer. 
