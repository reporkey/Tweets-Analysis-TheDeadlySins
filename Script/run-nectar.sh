#!/bin/bash

# First source openrc file, which has vars to interact with the openstack api. 
. ./unimelb-comp90024-group-3-openrc.sh; ansible-playbook --ask-become-pass nectar.yaml