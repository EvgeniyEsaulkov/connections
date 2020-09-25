class ApplicationMailer < ActionMailer::Base
  default from: ENV["DEVISE_MAILER_FROM"]
  layout "mailer"
end
