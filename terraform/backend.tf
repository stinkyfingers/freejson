terraform {
    backend "s3" {
      bucket = "remotebackend"
      key    = "freejson/terraform.tfstate"
      region = "us-west-1"
      profile = "jds"
    }
  }
