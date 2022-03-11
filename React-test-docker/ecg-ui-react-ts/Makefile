all: hello Config_java



.PHONY: config_node
config_node:
	curl -sL https://deb.nodesource.com/setup_17.x -o nodesource_setup.sh
	sudo bash nodesource_setup.sh
	sudo apt install nodejs -y


.PHONY: install_typescript
install_typescript:
	npm install -g typescript

.PHONY: react_start
react_start: 			
#inside folder
	npm install
	
	
.PHONY: react_build
react_build:react_start  			
#inside folder
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
