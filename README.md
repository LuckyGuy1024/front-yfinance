Front End for [Reboot Investing](https://rebootinvesting.com/)
===========

This project is intended to display stock history data using backend.


Installation
------------

First of all, make sure you have [node](https://nodejs.org/en/download/) installed on your computer.

1. Use npm to run the project.
    ```sh
    npm run dev
    ```
    If you want to deploy it, use the following.
    ```sh
    npm run build
    npm run start
    ```
    
2.    You can use the following one if you have installed [python](https://www.python.org/downloads/) and [Typer](https://typer.tiangolo.com/#fastapi-of-clis) for starting backend.
    Go to the parent folder until you find docker-compose.yml and main.py file and run the following command.
        ```sh
        python main.py start-front dev
        ```
        Or
        ```sh
        python main.py start-front build
        python main.py start-front start
        ```