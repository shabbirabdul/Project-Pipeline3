# Project-Pipeline3

###Automatic deployment environment configuration: 

A playbook is created to provision infrastructure necessary to run the application. The Application used here is a JAVA  web application build using MAVEN. 

###Playbook Command:

```
ansible-playbook -i inventory playbook.yml
``` 

###Hosts File:

```
[web]
52.5.189.34
[client]
52.4.175.99 
```

###Playbook File:
```
---
- hosts: web
  user: ubuntu

  tasks:
    ##
    # Apt package installation of required software.
    #
    - name: General | Install required packages.
      action: apt pkg={{ item }} state=installed
      sudo: yes
      tags: common
      with_items:
        - unzip
        - wget
      
    - name: Download Tomcat 7.0.42
      get_url: url=http://archive.apache.org/dist/tomcat/tomcat-7/v7.0.42/bin/apache-tomcat-7.0.42.tar.gz dest=/home/apache-tomcat-7.0.42.tar.gz
      sudo: yes

    - name: Extract Tomcat
      command: chdir=/home tar -xvzf apache-tomcat-7.0.42.tar.gz creates=/home/apache-tomcat-7.0.42
      sudo: yes

    - name: Configure Tomcat server
      template: src=/home/shabbir/Downloads/apache-tomcat-7.0.59/conf/tomcat-users.xml dest=/home/apache-tomcat-7.0.42/conf/
      sudo: yes

    - name: Start Tomcat
      command: /home/apache-tomcat-7.0.42/bin/startup.sh
      sudo: yes
 
```


