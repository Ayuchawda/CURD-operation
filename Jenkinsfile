pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    // Build the Docker image
                    sh 'docker build -t my-react-app .'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    // Remove the existing container if it exists
                    sh 'docker stop my-react-app || true && docker rm my-react-app || true'

                    // Run the new container
                    sh 'docker run -d -p 3000:80 --name my-react-app my-react-app'
                }
            }
        }
    }
}
