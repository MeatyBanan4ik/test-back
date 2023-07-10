FROM node:lts-alpine

WORKDIR /home/node/worker

COPY ./ /home/node/worker

CMD [ "yarn", "dev" ]
