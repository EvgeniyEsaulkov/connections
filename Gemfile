source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "2.6.5"

# the most important stuff
gem "pg"
gem "rails", "6.0.3.1"

# all other gems
gem "bootsnap", require: false
gem "jbuilder"
gem "puma"
gem "sass-rails"
gem "turbolinks"
gem "webpacker"

group :development, :test do
  gem "brakeman"
  gem "bundler-audit"
  gem "byebug"
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
