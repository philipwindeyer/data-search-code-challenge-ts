# data-search (AKA data-search-code-challenge-ts)

A small command-line app written in TypeScript, to search structured data provided in JSON files (as part of a code challenge).  
The aim of this code base is to satisfy the requirements of a code challenge.

The code challenge solution in question has also been written in Ruby [here](https://github.com/philipwindeyer/data-search-code-challenge) (although this version differs significantly and is generic in nature).

It specifically provides the ability to search for "organisations", "users" and "tickets" (provided via JSON files), and will display accompanying related data.

The app is run from the project root dir. To run locally, in can either be done with node (`node .`) or directly using the entry-point script (`bin/data-search`)

## Prerequisites

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/) - the app is built on v15 but will run on older versions also (v12 and up)

TODO Add "Installation", "Usage", "Development" (including lint/prettier, etc)
