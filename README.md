# Library API

## Requirements:
1) .NET6
2) MSSQL server

## Launch guide:

1) Set up a database connection: set the value of the database connection string in the appsettings.json file (https://github.com/IlyaHrushhyov/Library-system/blob/master/LibraryAPI/appsettings.json) in the "ConnectionStrings" area.
For example,
```html
    "Connection strings": {
        "LibraryDb": "Server={your server};Database=libraryDb;Trusted_Connection=True;TrustServerCertificate=True"
      }
 ```
The string name uses "LibraryDb".

2) Run the server application (https://github.com/IlyaHrushhyov/Library-system/tree/master/LibraryAPI) - will be launched on port 7146
3) Through Swagger, a test query is made to the database using any of the observed paths to identify the database.
4) Launch an external application (https://github.com/IlyaHrushhyov/Library-system/tree/master/LibraryAPI/client) - will be launched on port 3000
5) The last step is to go to https://localhost:7146/ to access the client application.
