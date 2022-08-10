test: 
	docker-compose -f docker-compose.yml -f docker-compose.test.yml up
test-build: 
	docker-compose -f docker-compose.yml -f docker-compose.test.yml build
prod:
	docker-compose up
prod-build:
	docker-compose build
start: 
	docker-compose up -d
stop: 
	docker-compose stop
