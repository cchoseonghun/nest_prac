# Nest.js Practice Project

### `Nest.js cli 전역 설치`

```
npm i -g @nestjs/cli
```

### `유효성 검사 관련 라이브러리 설치`

```
npm i class-validator class-transformer @nestjs/mapped-types
```

> class-validator 이슈로 설치를 실패했다면

```
npm uninstall class-validator
npm i @nestjs/mapped-types
npm i class-validator
```

### `main.ts 수정`

```
app.useGlobalPipes(new ValidationPipe({ transform: true }));
```

### `TypeORM 설치`

```
npm i @nestjs/typeorm typeorm mysql
```

> class-validator 이슈로 설치를 실패했다면

```
npm uninstall class-validator
npm i @nestjs/typeorm typeorm mysql
npm i class-validator
```

### `환경변수`

```
npm i @nestjs/config
```