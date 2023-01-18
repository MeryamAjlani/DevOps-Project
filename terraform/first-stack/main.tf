
data "azurerm_resource_group" "RG-dev" {
  name     = "myResourceGroup"
}

# data "terraform_remote_state" "aks" {
#   backend = "azurerm"
#   config = {
#     resource_group_name = "deployment-automation123"
#     container_name = "backendterraform"
#     storage_account_name = "backendterraform123"
#     key = "dev.terraform.tfstate"
#    }
# }

resource "azurerm_kubernetes_cluster" "app" {
  name                = "dev-dep-aut"
  location            = data.azurerm_resource_group.RG-dev.location
  resource_group_name = data.azurerm_resource_group.RG-dev.name
  dns_prefix = "devdepauto"
  sku_tier            = "Free"
  http_application_routing_enabled = true

  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = "Standard_B2s"
    enable_auto_scaling = false
  }

  identity {
    type = "SystemAssigned"
  }

  tags = {
    Environment = "Development"
  }
}
