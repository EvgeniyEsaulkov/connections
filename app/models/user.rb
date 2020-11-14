class User < ApplicationRecord
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :validatable

  validates :email, presence: true
  validates :email, length: { maximum: 255 }
  validates :email, format: { with: Regex::Email::VALIDATE }
  validates :first_name, length: { maximum: 255 }
  validates :last_name, length: { maximum: 255 }

  def name
    [first_name, last_name].join(' ').strip
  end
end
