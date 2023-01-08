# Сервис Homechecker

### Технологии

- Nuxt
- Vue
- Vuex
- Express

### Как развернуть проект

```bash
git clone git@gitlab.com:the72nd/homechecker.git
cd ./homechecker
yarn
touch .env
```

### Миграции sqlite
Пока вот так убого, потом перенесу в cli
```bash
./node_modules/.bin/sequelize db:migrate
./node_modules/.bin/sequelize db:seed:all
```

```dotenv
# .env

#NUXT
NUXT_HOST=
NUXT_PORT=

# dadata
DADATA_API_KEY=
DADATA_SECRET_KEY=

# rosreestr.net
ROSREEST_NET_API_KEY=

# CloudPayments
CLOUD_PAYMENTS_PK=
```
