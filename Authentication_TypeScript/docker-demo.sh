#!/bin/bash

# Docker Demo Script for TypeScript Authentication App
echo "🐳 Docker Demo for TypeScript Authentication App"
echo "================================================"

# Function to check if Docker is running
check_docker() {
    if ! command -v docker &> /dev/null; then
        echo "❌ Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! docker info &> /dev/null; then
        echo "❌ Docker is not running. Please start Docker."
        exit 1
    fi
    
    echo "✅ Docker is running"
}

# Function to check if Docker Compose is available
check_docker_compose() {
    if ! command -v docker-compose &> /dev/null; then
        echo "❌ Docker Compose is not installed. Please install Docker Compose."
        exit 1
    fi
    
    echo "✅ Docker Compose is available"
}

# Function to setup environment
setup_env() {
    if [ ! -f .env ]; then
        echo "📝 Setting up environment file..."
        cp .env.docker .env
        echo "✅ Environment file created. Please edit .env with your actual values."
    else
        echo "✅ Environment file already exists"
    fi
}

# Function to build and run with Docker Compose
run_demo() {
    echo ""
    echo "🚀 Starting Docker Demo..."
    echo "=========================="
    
    # Stop any running containers
    echo "🛑 Stopping any existing containers..."
    docker-compose down
    
    # Build and start services
    echo "🏗️  Building and starting services..."
    docker-compose up --build -d
    
    # Wait for services to start
    echo "⏳ Waiting for services to start..."
    sleep 10
    
    # Check service status
    echo "📊 Service Status:"
    docker-compose ps
    
    echo ""
    echo "🎉 Docker Demo is running!"
    echo "========================="
    echo "🌐 Application URL: http://localhost:5000"
    echo "🔄 Nginx Proxy: http://localhost:80"
    echo "🗄️  MongoDB: localhost:27017"
    echo ""
    echo "📋 Useful Commands:"
    echo "   docker-compose logs -f        # View logs"
    echo "   docker-compose down           # Stop services"
    echo "   docker-compose ps             # Check status"
    echo ""
    
    # Test the application
    echo "🧪 Testing application..."
    if curl -s http://localhost:5000/ > /dev/null; then
        echo "✅ Application is responding correctly!"
    else
        echo "❌ Application is not responding. Check logs with: docker-compose logs"
    fi
}

# Function to show logs
show_logs() {
    echo "📋 Application Logs:"
    echo "==================="
    docker-compose logs auth-app
}

# Function to cleanup
cleanup() {
    echo "🧹 Cleaning up..."
    docker-compose down
    echo "✅ Cleanup completed"
}

# Main menu
show_menu() {
    echo ""
    echo "🐳 Docker Demo Menu"
    echo "=================="
    echo "1. Run Full Demo"
    echo "2. Show Logs"
    echo "3. Cleanup"
    echo "4. Exit"
    echo ""
    read -p "Choose an option (1-4): " choice
    
    case $choice in
        1)
            check_docker
            check_docker_compose
            setup_env
            run_demo
            ;;
        2)
            show_logs
            ;;
        3)
            cleanup
            ;;
        4)
            echo "👋 Goodbye!"
            exit 0
            ;;
        *)
            echo "❌ Invalid option. Please try again."
            show_menu
            ;;
    esac
}

# Start the script
clear
check_docker
check_docker_compose
show_menu
