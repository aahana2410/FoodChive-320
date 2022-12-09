.DEFAULT_GOAL := help

help:
	@echo Available commands:
	@echo build

build:
# write .env files in server and client
	@echo JWT_SECRET=123 > server\.env
	@echo DATABASE_URL="mongodb+srv://foodchive_user:vzhfEeMmvGKtkIoh@cluster0.3fcut4h.mongodb.net/foodchive-app?retryWrites=true&w=majority" >> server\.env
	@echo NODE_ENV="development" > client\.env
	npm start
