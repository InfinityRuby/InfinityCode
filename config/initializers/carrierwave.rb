CarrierWave.configure do |config|
  config.fog_provider = 'fog/aws'
  config.fog_credentials = {
    provider:              'AWS',                        # required
    aws_access_key_id:     ENV['aws_access_key_id'],     # required unless using use_iam_profile
    aws_secret_access_key: ENV['aws_secret_access_key'],     # required unless using use_iam_profile
    use_iam_profile:       true,                         # optional, defaults to false
    region:                ENV['region'],                  # optional, defaults to 'us-east-1'
    host:                  ENV['host'],             # optional, defaults to nil
  }
  config.fog_directory  = ENV['name_of_bucket']          # required
end
