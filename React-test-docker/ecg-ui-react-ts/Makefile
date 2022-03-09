all: hello Config_java



.PHONY: config_node
config_node:
	curl -fsSL https://deb.nodesource.com/setup_15.x | sudo -E bash -
	sudo apt-get install -y nodejs


.PHONY: install_typescript
install_typescript:
	npm install -g typescript

.PHONY: react_build
react_start: config_node			
#inside folder
	npm install
	npm run build


.PHONY: install_angular
install_angular:
#inside folder
	npm install


.PHONY: install_docker
install_docker:
	sudo apt-get update
	sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
