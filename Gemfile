source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "2.6.5"

# the most important stuff
gem "pg"
gem "rails", "~> 6.0.3"

# all other gems
gem "bootsnap", require: false
gem "jbuilder"
gem "puma"
gem "sass-rails"
gem "turbolinks"
gem "webpacker"

gem "graphql"

group :development, :test do
  gem "brakeman"
  gem "bundler-audit"
  gem "byebug"
  gem "factory_bot_rails"
  gem "ffaker"
  gem "rspec-rails"
  gem "rubocop", require: false
  gem "rubocop-rails", require: false
  gem "rubocop-rspec", require: false
end

group :development do
  gem "listen"
  gem "spring"
  gem "spring-watcher-listen"
  gem "web-console"
end

group :test do
  gem "database_cleaner-active_record"
  gem "simplecov", require: false
end
