CarrierWave.configure do |config|
  config.fog_provider = 'fog/aws'
  config.fog_credentials = {
    provider:              'AWS',
    aws_access_key_id:     ENV['aws_access_key_id'],
    aws_secret_access_key: ENV['aws_secret_access_key'],
    region:                ENV['region'],
    host:                  ENV['host'],
  }
  config.fog_directory  = ENV['name_of_bucket']
  config.fog_public     = false
end
