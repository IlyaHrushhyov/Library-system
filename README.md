# LibraryAPI

## Требования:
1) .NET6
2) MSSQL Server

## Руководство по запуску:

1) Настроить соединение с БД: установить значение для строки соединения с БД в файле appsettings.json(https://github.com/IlyaHrushhyov/Library-system/blob/master/LibraryAPI/appsettings.json) в области "ConnectionStrings". 
Например,
```html
    "ConnectionStrings": {
        "LibraryDb": "Server={ваш сервер};Database=libraryDb;Trusted_Connection=True;TrustServerCertificate=True"
      }
 ```     
Название строки соединения использовать "LibraryDb".

2) Запустить backend приложение(https://github.com/IlyaHrushhyov/Library-system/tree/master/LibraryAPI) - будет запущено на 7146 порту
3) Запустить frontend приложение(https://github.com/IlyaHrushhyov/Library-system/tree/master/LibraryAPI/client) - будет запущено на 3000 порту
4) Последний шаг - перейти по https://localhost:7146/ для доступа к клиенту.
