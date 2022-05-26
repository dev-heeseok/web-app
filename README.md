# Web Application

Web Application 

## Environment

Git Submodule 을 기반으로 Client/Server/Deploy 환경을 구분하여 개발을 진행할 예정이다. web-app 은 CI/CD 를 위한 repository 이다. 

### Submodule 추가

```sh
# submodule 모듈 추가

# ex. server module 추가
# >>> git submodule add ${server-url} server
git submodule add ${git-code-url} ${submodule-path-name}
```

- [Client](https://github.com/dev-heeseok/web-react)
- [Server](https://github.com/dev-heeseok/web-nodejs)
- [Deploy](https://github.com/dev-heeseok/web-app)
