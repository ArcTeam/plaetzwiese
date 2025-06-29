#!/bin/bash

# Plaetzwise Project - Utility Script
# Easy command runner for common development tasks

set -e

PROJECT_NAME="Plaetzwise Project"
PROJECT_PORT="3001"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Helper function for colored output
print_header() {
    echo -e "${CYAN}🏔️  $PROJECT_NAME${NC}"
    echo "=================================="
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Help function
show_help() {
    print_header
    echo ""
    echo "Usage: ./run.sh [command]"
    echo ""
    echo "Commands:"
    echo "  dev, start, d  - Start development server (port $PROJECT_PORT)"
    echo "  build, b       - Build for production"
    echo "  preview, p     - Preview production build"
    echo "  serve          - Alias for preview"
    echo "  deploy         - Build and preview"
    echo "  clean, c       - Clean build cache"
    echo "  install, i     - Install dependencies"
    echo "  reinstall      - Clean all and reinstall"
    echo "  status         - Show project status"
    echo "  help, h        - Show this help"
    echo ""
    echo "Examples:"
    echo "  ./run.sh dev          # Start development"
    echo "  ./run.sh build        # Build for production"
    echo "  ./run.sh status       # Check project status"
    echo ""
}

# Check if npm is available
check_npm() {
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install Node.js and npm first."
        exit 1
    fi
}

# Check if package.json exists
check_project() {
    if [ ! -f "package.json" ]; then
        print_error "package.json not found. Make sure you're in the project directory."
        exit 1
    fi
}

# Show project status
show_status() {
    print_header
    echo ""
    
    if [ -f "package.json" ]; then
        print_info "Project found: $(grep '"name"' package.json | cut -d'"' -f4)"
        print_info "Version: $(grep '"version"' package.json | cut -d'"' -f4)"
    fi
    
    if command -v node &> /dev/null; then
        print_info "Node.js: $(node --version)"
    else
        print_warning "Node.js not found"
    fi
    
    if command -v npm &> /dev/null; then
        print_info "npm: $(npm --version)"
    else
        print_warning "npm not found"
    fi
    
    if [ -d "node_modules" ]; then
        print_success "Dependencies installed"
    else
        print_warning "Dependencies not installed (run: ./run.sh install)"
    fi
    
    if [ -d "dist" ]; then
        print_info "Production build available"
    else
        print_info "No production build found"
    fi
    
    echo ""
    print_info "Development server will run on: http://localhost:$PROJECT_PORT"
}

# Main command handler
case "${1:-help}" in
    "dev"|"start"|"d")
        print_header
        print_info "Starting development server on port $PROJECT_PORT..."
        check_npm
        check_project
        npm run dev
        ;;
    "build"|"b")
        print_header
        print_info "Building for production..."
        check_npm
        check_project
        npm run build
        print_success "Build completed! Check the 'dist' folder."
        ;;
    "preview"|"serve"|"p")
        print_header
        print_info "Starting preview server..."
        check_npm
        check_project
        npm run preview
        ;;
    "deploy")
        print_header
        print_info "Building and deploying..."
        check_npm
        check_project
        npm run deploy
        ;;
    "clean"|"c")
        print_header
        print_info "Cleaning build cache..."
        check_npm
        check_project
        npm run clean
        print_success "Cache cleaned!"
        ;;
    "install"|"i")
        print_header
        print_info "Installing dependencies..."
        check_npm
        check_project
        npm install
        print_success "Dependencies installed!"
        ;;
    "reinstall")
        print_header
        print_warning "This will remove all dependencies and reinstall them."
        read -p "Are you sure? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            check_npm
            check_project
            npm run reinstall
            print_success "Dependencies reinstalled!"
        else
            print_info "Operation cancelled."
        fi
        ;;
    "status")
        show_status
        ;;
    "help"|"--help"|"-h"|"h"|"")
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        echo ""
        show_help
        exit 1
        ;;
esac
