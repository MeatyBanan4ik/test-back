FROM node:lts as Builder

WORKDIR /worker

COPY ./ /worker

RUN make build

################################################################################
############################## Build clear app image ###########################

FROM node:lts-alpine

COPY --from=Builder /worker /worker
WORKDIR /worker

CMD ["yarn", "start"]
