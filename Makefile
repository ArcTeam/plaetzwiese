# Plaetzwise Project - Makefile
# Alternative to npm scripts for easier command management

.PHONY: help dev build preview start serve clean install deploy dev-host reinstall setup

# Default target
.DEFAULT_GOAL := help

help:
	@echo "Plaetzwise Project Commands:"
	@echo ""
	@echo "Development:"
	@echo "  make dev       - Start development server (http://localhost:3001)"
	@echo "  make start     - Alias for 'make dev'"
	@echo "  make dev-host  - Start dev server accessible from network"
	@echo ""
	@echo "Build & Preview:"
	@echo "  make build     - Build for production"
	@echo "  make preview   - Preview production build"
	@echo "  make serve     - Alias for 'make preview'"
	@echo "  make deploy    - Build and preview"
	@echo ""
	@echo "Maintenance:"
	@echo "  make install   - Install dependencies"
	@echo "  make clean     - Clean build cache"
	@echo "  make reinstall - Clean all and reinstall"
	@echo "  make setup     - Complete project setup"
	@echo ""
	@echo "Alternatively, use npm scripts directly:"
	@echo "  npm run dev    - Start development"
	@echo "  npm run build  - Build for production"
	@echo "  npm run preview - Preview build"

# Development
dev:
	@echo "Starting development server..."
	npm run dev

start: dev

dev-host:
	@echo "Starting development server (network accessible)..."
	npm run dev-host

# Build & Preview
build:
	@echo "Building for production..."
	npm run build

preview:
	@echo "Previewing production build..."
	npm run preview

serve: preview

deploy:
	@echo "Building and deploying..."
	npm run deploy

# Maintenance
install:
	@echo "Installing dependencies..."
	npm install

clean:
	@echo "Cleaning build cache..."
	npm run clean

reinstall:
	@echo "Cleaning all and reinstalling..."
	npm run reinstall

setup: install
	@echo "Project setup completed!"
	@echo "Run 'make dev' to start development server"
