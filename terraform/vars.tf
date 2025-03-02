variable "profile" {
  type = string
  default = "jds"
}

variable "region" {
  type = string
  default = "us-west-1"
}

variable "project" {
  type = string
  default = "freejson"
}

variable "domain" {
  type = string
  default = "john-shenk.com"
}

variable "prod_domain" {
  type = string
  default = "json.ninja"
}

variable "zone_id" {
  type = string
  default = "Z3P68RXJ4VECYX"
}

variable "prod_zone_id" {
  type = string
  default = "Z02604643MUQ9N0J65UPS"
}

variable "certificate_arn" {
  type = string
  default = "arn:aws:acm:us-east-1:671958020402:certificate/fc7ab094-b641-4898-8aca-24739e555f73"
}

variable "prod_certificate_arn"  {
  type    = string
  default = "arn:aws:acm:us-east-1:671958020402:certificate/c1382d88-8574-490e-b880-1eff7822819a"
}