# Project-Pipeline3

###Automatic deployment environment configuration: 

A playbook is created to provision infrastructure necessary to run the application. The Application used here is a JAVA  web application build using MAVEN. 

##Playbook Command:

```
ansible-playbook -i inventory playbook.yml
``` 

##Hosts File:

```
[web]
52.5.189.34
[client]
52.4.175.99 
```
