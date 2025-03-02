# s3
resource "aws_s3_bucket" "prod_bucket" {
  bucket = "${var.project}.${var.prod_domain}"
}

resource "aws_s3_bucket_policy" "prod_cloudfront" {
  bucket = aws_s3_bucket.prod_bucket.id
  policy = data.aws_iam_policy_document.prod_cloudfront.json
}

data "aws_iam_policy_document" "prod_cloudfront" {
  statement {
    principals {
      type        = "Service"
      identifiers = [
        "cloudfront.amazonaws.com"
      ]
    }
    actions = [
      "s3:GetObject"
    ]
    effect = "Allow"
    resources = [
      "arn:aws:s3:::${var.project}.${var.prod_domain}/*"
    ]
    condition {
      test = "StringEquals"
      variable = "AWS:SourceArn"
      values = [aws_cloudfront_distribution.prod_distribution.arn]
    }
  }
  statement {
    sid = "Cloudfront Read Access"
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.prod_distribution.arn]
    }
    actions = [
      "s3:GetObject"
    ]
    effect = "Allow"
    resources = [
      "arn:aws:s3:::${var.project}.${var.prod_domain}/*"
    ]
  }
}

resource "aws_s3_bucket_ownership_controls" "prod_s3_bucket_acl_ownership" {
  bucket = aws_s3_bucket.prod_bucket.id
  rule {
    object_ownership = "ObjectWriter"
  }
}

resource "aws_s3_bucket_public_access_block" "prod_pab" {
  bucket = aws_s3_bucket.prod_bucket.id
  block_public_acls   = true
  block_public_policy = true
}

locals {
  s3_origin_id_prod = "${var.project}-prod-origin"
}

resource "aws_cloudfront_distribution" "prod_distribution" {
  origin {
    domain_name = aws_s3_bucket.prod_bucket.bucket_domain_name
    origin_id   = local.s3_origin_id_prod
    origin_access_control_id = aws_cloudfront_origin_access_control.prod_default.id
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = [var.prod_domain]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id_prod
    trusted_signers = []

    forwarded_values {
      query_string = false
      query_string_cache_keys = []
      headers = []

      cookies {
        forward = "none"
        whitelisted_names = []
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 31536000
  }
  restrictions {
    geo_restriction {
        locations        = []
        restriction_type = "none"
    }
}

  viewer_certificate {
      acm_certificate_arn            = var.prod_certificate_arn
      cloudfront_default_certificate = false
      minimum_protocol_version       = "TLSv1.1_2016"
      ssl_support_method             = "sni-only"
  }

  custom_error_response {
    error_code = 403
    response_code = 200
    response_page_path = "/index.html"
  }
}

resource "aws_cloudfront_origin_access_control" "prod_default" {
  name                              = var.domain
  description                       = "Default Policy"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_route53_record" "prod_record" {
  zone_id = var.prod_zone_id
  name = ""
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.prod_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.prod_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}
