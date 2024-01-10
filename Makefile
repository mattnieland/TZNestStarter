VERSION = 0.0.65
TAG = $(or ${VERSION_TAG}, v0.0.1)
ENV = $(or ${ENVIRONMENT}, staging)

deploy-dry:
	helm upgrade --install tzneststarter ./charts/tzneststarter \
	--namespace $(ENV) \
	--create-namespace \
	--set image.tag=${TAG} \
	--set env.name=${ENV} \
	--values ./charts/tzneststarter/$(ENV).yaml \
	--dry-run

deploy:
	helm upgrade --install tzneststarter ./charts/tzneststarter \
	--namespace $(ENV) \
	--create-namespace \
	--set image.tag=${TAG} \
	--set env.name=${ENV} \
	--values ./charts/tzneststarter/$(ENV).yaml
