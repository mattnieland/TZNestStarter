VERSION = 0.0.60
TAG = $(or ${VERSION_TAG}, v0.0.1)
ENV = $(or ${ENVIRONMENT}, staging)

deploy-dry:
	helm upgrade --install users-service ./charts/users-service \
	--namespace $(ENV) \
	--create-namespace \
	--set image.tag=${TAG} \
	--set env.name=${ENV} \
	--values ./charts/users-service/$(ENV).yaml \
	--dry-run

deploy:
	helm upgrade --install users-service ./charts/users-service \
	--namespace $(ENV) \
	--create-namespace \
	--set image.tag=${TAG} \
	--set env.name=${ENV} \
	--values ./charts/users-service/$(ENV).yaml
