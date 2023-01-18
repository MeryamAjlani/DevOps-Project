provider "azurerm" {
  features {}
}

terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = "3.31.0"
    }
  }
   backend "azurerm" {
    resource_group_name = "myResourceGroup"
    storage_account_name = "myressourcegroups1"
    container_name = "mystorageaccount"
    key = "cNRv5l6PGnMMgmDNikPL2cY/iIlFkoXXxloxh478YLFE8djsgTesoL5fs4ovhCmY+efobSAu7RX1+AStifpdsQ=="
  }
}