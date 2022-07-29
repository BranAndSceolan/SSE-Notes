### About this configuration

The configuration is based on Vue's example build for an NGINX deployment. It reverse-proxies requests to ``/api/`` URLs to the backend.
As the server automatically redirects regular HTTP requests to HTTPS, having a valid SSL certificate is required to use the docker image.


### Adding your own SSL Certificate

For development purposes we include ``localhost.crt`` and ``localhost.key`` in the 'certs' directory. They were generated from the ``localhost.conf`` file using the command ``sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout localhost.key -out localhost.crt -config localhost.conf``.
Make sure your certificate name matches the environment variable for the server name and the folder containing it is mounted correctly, see the ``docker-compose-production.yml`` file for reference.

### Using the included SSL Certificate

The certificate is self-signed and <i>not usable for a production environment</i>, as such you need to add a custom trusted CA to your system.

For Windows 10 and 11 you can follow these instructions to import the .crt file: https://www.thewindowsclub.com/manage-trusted-root-certificates-windows