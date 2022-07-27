### Adding your own SSL Certificates

For development purposes we include ``localhost.crt`` and ``localhost.key`` in the 'certs' directory. They were generated from the ``localhost.conf`` file using the command ``sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout localhost.key -out localhost.crt -config localhost.conf``.
Make sure your certificate name matches the environment variable for the server name and the folder containing it is mounted correctly, see the ``docker-compose-production.yml`` file for reference.

### Using the included SSL Certificte

The certificate is self-signed, as such you need to add a custom trusted CA to your system.

For Windows 10 and 11 you can follow these instructions to import the .crt file: https://www.thewindowsclub.com/manage-trusted-root-certificates-windows