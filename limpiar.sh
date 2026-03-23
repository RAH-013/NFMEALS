#!/bin/bash
# cleanup-docker.sh
# ⚠️ ADVERTENCIA: Esto eliminará TODOS los contenedores, volúmenes y redes de Docker

echo "Deteniendo todos los contenedores..."
docker stop $(docker ps -aq) 2>/dev/null

echo "Eliminando todos los contenedores..."
docker rm $(docker ps -aq) 2>/dev/null

echo "Eliminando todos los volúmenes..."
docker volume rm $(docker volume ls -q) 2>/dev/null

echo "Eliminando todas las redes no usadas..."
docker network prune -f

echo "Eliminando contenedores de Docker Compose (si existen)..."
docker-compose down -v --remove-orphans 2>/dev/null

echo "Limpieza completa ✅"
