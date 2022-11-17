.DEFAULT_GOAL := help

ifneq (,$(wildcard .env))
    -include .env
    export
endif

CURRENT_UID := $(shell id -u)
CURRENT_GID := $(shell id -g)
CURRENT_DIR := $(shell pwd)

export CURRENT_UID
export CURRENT_GID

TAG = latest
IMAGE_NAME = yape.azurecr.io/
CONTAINER_NAME = yape.azurecr.io
CONTAINER_OWNER = [maicolcrodrigoa@gmail.com]

define install_api
	@echo ${CURRENT_DIR}
endef

define install_bullqueue
	@echo ${CURRENT_DIR}
endef

######## Manage containers status (default target = all)
status: ## Show containers status, use me with: make status target=api
	docker-compose -p ${ENVIRON} -f docker-compose.${ENVIRON}.yml ps ${target}

stop: ## Stops the docker containers, use me with: make stop target=api
	docker-compose -p ${ENVIRON} -f docker-compose.${ENVIRON}.yml stop ${target}

down: ## Stops and removes the docker containers, use me with: make down target=api
	docker-compose -p ${ENVIRON} -f docker-compose.${ENVIRON}.yml down ${target}

delete: ## Delete the docker containers, use me with: make delete target=api
	docker-compose -p ${ENVIRON} -f docker-compose.${ENVIRON}.yml rm -fv ${target}

up: ## Up the docker containers, use me with: make up target=api
	$(call install_api)
	$(call install_tenancy)
	docker network create --driver bridge yape || true
	docker-compose -p ${ENVIRON} -f docker-compose.${ENVIRON}.yml up -d ${target}

logs: ## Logss the docker containers, use me with: make logs target=api
	docker-compose -p ${ENVIRON} -f docker-compose.${ENVIRON}.yml logs -f ${target}

restart: ## Restart the docker containers, use me with: make restart target=api
	docker-compose -p ${ENVIRON} -f docker-compose.${ENVIRON}.yml restart ${target}

build: ## Build the docker containers, use me with: make build target=api
	docker-compose -p ${ENVIRON} -f docker-compose.${ENVIRON}.yml build ${target}

rebuild: # Rebuild the docker containers, use me with: make rebuild
	make stop
	make delete
	make build
	make up

exec: ## Execute command in the docker container, use me with: make exec target=api cmd=ls
	docker-compose -p ${ENVIRON} -f docker-compose.${ENVIRON}.yml exec ${target} ${cmd}

nestg: ## Generate module and files nestjs use me with: make nestg cmd="service example"
	cd server-api && nest g ${cmd}

cli: ## Execute command in the docker container
	docker build . -f ./commands/Dockerfile -t "api_commands"
	docker run --rm -ti --network yape --env-file .env api_commands yarn start ${cmd}

HELP_FUN = \
    %help; while(<>){push@{$$help{$$2//'options'}},[$$1,$$3] \
    if/^([\w-_]+)\s*:.*\#\#(?:@(\w+))?\s(.*)$$/}; \
    print"$$_:\n", map"  $$_->[0]".(" "x(20-length($$_->[0])))."$$_->[1]\n",\
    @{$$help{$$_}},"\n" for keys %help; \

###### Help
.PHONY: help
help:
	@echo  'Development commands for project ${PROYECT_NAME}'
	@echo
	@echo 'Usage: make COMMAND [target=some-targets] [cms=some-commads] [revision=some-revision]'
	@echo
	@echo 'Targets:'
	@echo
	@echo '  server            API Rest'
	@echo
	@echo '  default target=all'
	@echo
	@echo '༼ つ ◕_◕ ༽つ  Commands:'
	@echo
	@perl -e '$(HELP_FUN)' $(MAKEFILE_LIST)
	@echo
