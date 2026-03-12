# P2 – Web Interface to Interact with “Assets”

This folder contains the source code for the P2 coursework project.

The system provides a web interface that allows users to interact with spatial asset datasets. The application supports user authentication, dataset upload, and spatial data visualisation.

## Project Structure

backend/ – Node.js backend server and API routes  
frontend/ – Web interface built using HTML, CSS, and JavaScript  

## Backend

The backend handles:

• API routes for asset data  
• Database communication  
• Dataset upload functionality  

Main files:
- server.js – main server entry point
- db.js – database connection
- spatial_portal.sql – database schema

## Frontend

The frontend provides the user interface for interacting with the system.

Main pages:
- index.html – main landing page
- assets.html – view assets
- categories.html – asset categories
- add-assets.html – upload asset data

## Running the Project

Install dependencies:

npm install

Start the backend server:

node server.js

Open the frontend by opening **index.html** in a browser.
