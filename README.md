# Project-Pipeline3

###Automatic deployment environment configuration: 

A playbook is created to provision infrastructure necessary to run the application. 

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
###Inventory File

```
[web]
node0 ansible_ssh_host=ec2-52-5-254-8.compute-1.amazonaws.com ansible_ssh_user=ubuntu ansible_ssh_private_key_file=~/Downloads/ckan-local.pem

[client]
node1 ansible_ssh_host=52.5.189.34 ansible_ssh_user=ubuntu ansible_ssh_private_key_file=~/Downloads/ckan-local.pem
```

### Ansible Running

//M3P1

#Deployment of Binaries and Remote Deployment

The Application used here is a JAVA  web application built using MAVEN, Jenkins job is configured to run this MAVEN project. Afetr the build is complete, the generated artifcats are pushed to remote AWS EC-2 instances.

We have configured 2 jenkins jobs one for Production deploy which deploys on all servers and one for Canary release which deploys artifacts on subset of servers.


### Jenkins jobs

1. Production Deployment
2. Canary Deployment

Jenkins jpg.

### Deployment Configuration:

A post build step has been configured to deploy the artifacts generated after build step. The post build step undeploys and redeploys the application on Tomcat sever.

#### Production Deploy Job
..production deplou config image and 
..production deploy success image

#### Canary Deploy Job

.. canary deploy config image and canary deploy success image

# Monitor the application for Alerts/Failures

A Jenkins Site Monitoring plugin is installed to get the status of application. The plugin checks if the site is up for every 2 seconds. 

part 5 image

The Jenkins job configured also gives the status of a successful build. 

Jenkins Success Image










