FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY *.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

# Указываем порт 5239
ENV ASPNETCORE_URLS=http://0.0.0.0:5239
EXPOSE 5239

ENTRYPOINT ["dotnet", "site_backend.dll"]