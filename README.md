# 4-Excellence Educational Application

An educational game app for secondary schools. This application aims to restore the interest of people in non-STEM subjects, by putting student enjoyment at the heart of learning experience, whilst sharing the burden of education with teachers. 

This application allows students to create an account on the app (whilst teachers will need to have their accounts created by the database administrator). Both students and teachers can then login to access separate components of the app:
- Students can access and play a collection of educational games on non-STEM subjects. Currently available games are: KS3 History Quiz & KS3 Geography Quiz
- Students can then check their personal profile, which also holds their last score, best score and average score per game.
- Teachers can access their personal profile, from which they can create classes and assign students to classes. They can then monitor the performance of students in their classes.

This repository holds both the front-end and back-end components of the application.
- The website folder holds a static website, hosted on [Render](add a link here).
- The server folder holds the server of the application, which is hosted locally by the school, in their cloud provider of choice (e.g. [Render](add a link here)).
- The server folder also holds a database folder, which takes care of setting up a connection to a Supabase-hosted database. Schools will need to set up their own Supabase to run this.