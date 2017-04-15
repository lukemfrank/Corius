FROM node:5.1.1

# Update + remove unnecessary packages.
RUN apt-get -y update --fix-missing && apt-get -y autoremove

# Install Gulp globally.
RUN npm install -g gulp jspm

RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.1.1/dumb-init_1.1.1_amd64 && \
  chmod +x /usr/local/bin/dumb-init

# Create a place where files can be mounted.
RUN mkdir /app
WORKDIR /app/

# Add the startup script to a runnable location.
ADD docker/start-dev-container.sh /usr/local/bin/start-dev-container.sh
RUN chmod +x /usr/local/bin/start-dev-container.sh

# Set up our non-root user.
RUN useradd app
RUN mkdir /home/app
RUN chown -R app /home/app
RUN chown -R app /app
USER app

CMD ["/usr/local/bin/start-dev-container.sh"]
