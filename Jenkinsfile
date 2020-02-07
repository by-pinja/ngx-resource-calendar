library 'jenkins-ptcs-library@feature/publishTagToNpm-custom-folder'

podTemplate(label: pod.label,
  containers: pod.templates + [
    containerTemplate(name: 'node', image: 'node:12', ttyEnabled: true, command: '/bin/sh -c', args: 'cat'),
  ]
) {
    node(pod.label) {
      stage('Checkout') {
        checkout scm
      }
      stage('Build') {
        container('node') {
          sh """
            npm ci
            npm run build:lib
            npm run build:copyfiles
          """
        }
      }
      stage('Publish tag') {
        publishTagToNpm()
      }
    }
  }